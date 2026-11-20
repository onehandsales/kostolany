import type { AuthStore } from '../auth/createAuthStore';
import { validOnboarding, type NotificationChoice, type OnboardingCommand, type OnboardingRecord,
  type OnboardingSource, type OnboardingStep } from './onboardingSource';

type OnboardingSnapshot = {
  status: 'idle' | 'loading' | 'ready' | 'error';
  record: OnboardingRecord | null;
  isOpen: boolean;
  busy: boolean;
  error: string | null;
};
export function createOnboardingSession(source: OnboardingSource, auth: AuthStore, userId: string) {
  const revision = auth.getSnapshot().revision;
  const signup = auth.getSessionEntry()?.joining === true;
  const prefix = `${revision}:${Date.now().toString(36)}:${Math.random().toString(36).slice(2)}`;
  let state: OnboardingSnapshot = { status: 'loading', record: null, isOpen: signup, busy: false, error: null };
  let controller = new AbortController();
  let active = false;
  let sequence = 0;
  let pending: OnboardingCommand | null = null;
  const listeners = new Set<() => void>();
  const valid = () => active && !controller.signal.aborted && auth.getSnapshot().user?.id === userId
    && auth.getSnapshot().revision === revision;
  function publish(patch: Partial<OnboardingSnapshot>) {
    state = { ...state, ...patch };
    listeners.forEach(listener => listener());
  }
  async function load(forceOpen = false) {
    if (!valid() || state.busy) return;
    const operation = ++sequence;
    publish({ status: 'loading', error: null });
    try {
      const record = await source.read(userId, controller.signal);
      if (!valid() || operation !== sequence) return;
      if (!validOnboarding(record, userId) || record.version < (state.record?.version ?? 0)) throw new Error('invalid-record');
      publish({ status: 'ready', record, isOpen: record.accountKind === 'new' && record.step !== 'complete'
        && (forceOpen || record.started || signup) });
    } catch {
      if (valid() && operation === sequence) publish({ status: 'error', error: 'read-failed', isOpen: forceOpen || signup });
    }
  }
  async function save(step: OnboardingStep, notificationChoice?: NotificationChoice): Promise<boolean> {
    if (!valid() || state.busy || !state.record) return false;
    if (state.error === 'response-lost' && pending
      && (pending.step !== step || pending.notificationChoice !== notificationChoice)) return false;
    const current = state.record;
    const command = pending?.step === step && pending.notificationChoice === notificationChoice ? pending : {
      operationId: `${prefix}:${++sequence}`, expectedVersion: current.version, step, notificationChoice,
    };
    pending = command;
    const operation = ++sequence;
    publish({ busy: true, error: null });
    try {
      const record = await source.save(userId, command, controller.signal);
      if (!valid() || operation !== sequence) return false;
      if (!validOnboarding(record, userId) || record.version < current.version || record.step !== step) {
        throw new Error('invalid-record');
      }
      pending = null;
      publish({ record, status: 'ready', busy: false, isOpen: record.step !== 'complete' });
      return true;
    } catch (error) {
      if (valid() && operation === sequence) publish({ busy: false,
        error: error instanceof Error && error.message === 'response-lost' ? 'response-lost' : 'save-failed' });
      return false;
    }
  }
  return {
    scope: prefix,
    getSnapshot: () => state,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    activate() {
      active = true;
      if (controller.signal.aborted) controller = new AbortController();
      const unsubscribe = auth.subscribe(() => { if (!valid()) { active = false; controller.abort(); sequence++; } });
      void load();
      return () => { active = false; controller.abort(); sequence++; unsubscribe(); };
    },
    isCurrent: valid,
    save,
    retry: () => pending ? save(pending.step, pending.notificationChoice) : Promise.resolve(false),
    reload: () => load(state.isOpen),
    open() { if (valid()) { publish({ isOpen: true }); void load(true); } },
    close() { if (valid()) { controller.abort(); controller = new AbortController(); sequence++;
      pending = null; publish({ status: state.record ? 'ready' : 'idle', isOpen: false, busy: false, error: null }); } },
  };
}
export type OnboardingSession = ReturnType<typeof createOnboardingSession>;
