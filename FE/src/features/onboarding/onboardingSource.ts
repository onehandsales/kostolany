export type OnboardingStep = 'welcome' | 'interests' | 'following' | 'notifications' | 'membership' | 'complete';
export type NotificationChoice = 'enabled' | 'denied' | 'skipped';
export type OnboardingRecord = Readonly<{
  userId: string;
  version: number;
  accountKind: 'new' | 'existing';
  started: boolean;
  step: OnboardingStep;
  showWelcome: boolean;
  showMembership: boolean;
  notificationChoice: NotificationChoice | null;
}>;
export type OnboardingCommand = Readonly<{
  operationId: string;
  expectedVersion: number;
  step: OnboardingStep;
  notificationChoice?: NotificationChoice;
}>;
export type OnboardingSource = {
  read: (userId: string, signal: AbortSignal) => Promise<OnboardingRecord>;
  save: (userId: string, command: OnboardingCommand, signal: AbortSignal) => Promise<OnboardingRecord>;
};
export const onboardingSteps: readonly OnboardingStep[] = [
  'welcome', 'interests', 'following', 'notifications', 'membership', 'complete',
];
export function validOnboarding(value: OnboardingRecord, userId: string): boolean {
  return Boolean(value && value.userId === userId && Number.isSafeInteger(value.version) && value.version >= 0
    && ['new', 'existing'].includes(value.accountKind) && typeof value.started === 'boolean'
    && typeof value.showWelcome === 'boolean' && typeof value.showMembership === 'boolean'
    && onboardingSteps.includes(value.step)
    && (value.notificationChoice === null || ['enabled', 'denied', 'skipped'].includes(value.notificationChoice)));
}
export async function waitForOnboarding(delayMs: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) throw new Error('cancelled');
  if (delayMs > 0) await new Promise<void>((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(new Error('cancelled')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, delayMs);
    signal.addEventListener('abort', abort, { once: true });
  });
  if (signal.aborted) throw new Error('cancelled');
}
export function createMockOnboardingSource(options: {
  delayMs?: number;
  readFailures?: number;
  saveFailures?: number;
  lostResponses?: number;
  newUserIds?: readonly string[];
  showWelcome?: boolean;
  showMembership?: boolean;
} = {}): OnboardingSource {
  const records = new Map<string, OnboardingRecord>();
  const receipts = new Map<string, string>();
  let readFailures = options.readFailures ?? 0;
  let saveFailures = options.saveFailures ?? 0;
  let lostResponses = options.lostResponses ?? 0;
  function record(userId: string): OnboardingRecord {
    if (!userId) throw new Error('invalid-owner');
    return records.get(userId) ?? {
      userId, version: 0, accountKind: (options.newUserIds ?? ['example-reader']).includes(userId) ? 'new' : 'existing',
      started: false, step: options.showWelcome === false ? 'interests' : 'welcome',
      showWelcome: options.showWelcome !== false, showMembership: options.showMembership !== false,
      notificationChoice: null,
    };
  }
  return {
    async read(userId, signal) {
      await waitForOnboarding(options.delayMs ?? 120, signal);
      if (readFailures-- > 0) throw new Error('read-failed');
      return { ...record(userId) };
    },
    async save(userId, command, signal) {
      await waitForOnboarding(options.delayMs ?? 120, signal);
      const current = record(userId);
      const key = JSON.stringify([userId, command.operationId]);
      const fingerprint = JSON.stringify(command);
      const receipt = receipts.get(key);
      if (receipt !== undefined) {
        if (receipt !== fingerprint) throw new Error('conflicting-operation');
        return { ...current };
      }
      if (!command.operationId || current.accountKind !== 'new' || current.step === 'complete'
        || current.version !== command.expectedVersion || !onboardingSteps.includes(command.step)
        || command.notificationChoice !== undefined && !['enabled', 'denied', 'skipped'].includes(command.notificationChoice)) {
        throw new Error('invalid-transition');
      }
      const allowed: Record<OnboardingStep, readonly OnboardingStep[]> = {
        welcome: ['welcome', 'interests'], interests: current.showWelcome ? ['welcome', 'interests', 'following'] : ['interests', 'following'],
        following: ['interests', 'following', 'notifications'],
        notifications: ['following', 'notifications', current.showMembership ? 'membership' : 'complete'],
        membership: ['notifications', 'membership', 'complete'], complete: [],
      };
      if (!allowed[current.step].includes(command.step)) throw new Error('invalid-transition');
      if (current.step === 'notifications' && ['membership', 'complete'].includes(command.step)
        && !command.notificationChoice) throw new Error('invalid-notification-choice');
      if (saveFailures-- > 0) throw new Error('save-failed');
      const next = { ...current, version: current.version + 1, started: true, step: command.step,
        notificationChoice: command.notificationChoice ?? current.notificationChoice };
      records.set(userId, next);
      receipts.set(key, fingerprint);
      // 응답 유실 뒤 같은 명령을 재시도하면 이미 확정된 단계를 중복 반영하지 않는다.
      if (lostResponses-- > 0) throw new Error('response-lost');
      return { ...next };
    },
  };
}
