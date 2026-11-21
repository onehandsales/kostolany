import {
  validateModerationValue,
  moderationKey,
  validModerationAction,
  type ModerationCommand,
  type ModerationResult,
  type ModerationSnapshot,
  type ModerationSource,
} from './types';

export function createModerationStore(source: ModerationSource, userId: string) {
  let state: ModerationSnapshot = {
    status: 'loading',
    value: null,
    readError: false,
    pending: [],
  };
  let generation = 0;
  let started = false;
  let readScope = '';
  let reading = false;
  let queue = Promise.resolve();
  const listeners = new Set<() => void>();
  const operations = new Map<string, { fingerprint: string; promise: Promise<ModerationResult> }>();
  function publish(patch: Partial<ModerationSnapshot>) {
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
  }
  async function reload() {
    if (reading) return;
    started = true;
    reading = true;
    const request = ++generation;
    publish({ readError: false, status: state.value ? 'ready' : 'loading' });
    try {
      const value = await source.read(userId);
      if (request !== generation) return;
      validateModerationValue(value, userId);
      if (value.version < (state.value?.version ?? 0)) throw new Error('invalid');
      publish({ value, status: 'ready', readError: false });
    } catch {
      if (request === generation) publish({ readError: true, status: state.value ? 'ready' : 'error' });
    } finally {
      if (request === generation) reading = false;
    }
  }
  function execute(command: ModerationCommand, signal?: AbortSignal): Promise<ModerationResult> {
    if (!state.value || !command.operationId || !validModerationAction(command.action))
      return Promise.resolve({ ok: false, error: 'invalid' });
    const fingerprint = JSON.stringify(command.action);
    const previous = operations.get(command.operationId);
    if (previous)
      return previous.fingerprint === fingerprint
        ? previous.promise
        : Promise.resolve({ ok: false, error: 'invalid' });
    publish({ pending: [...state.pending, command.operationId] });
    const promise = queue.then(async (): Promise<ModerationResult> => {
      try {
        if (signal?.aborted) throw new Error('cancelled');
        const value = await source.execute(userId, command, signal);
        validateModerationValue(value, userId);
        if (value.version < (state.value?.version ?? 0)) throw new Error('invalid');
        const action = command.action;
        if (
          action.kind === 'mute' &&
          value.muted.some((item) => moderationKey(item) === moderationKey(action.target)) !== action.active
        )
          throw new Error('invalid');
        if (action.kind === 'block' && value.blocked.includes(action.writerId) !== action.active)
          throw new Error('invalid');
        if (
          action.kind === 'report' &&
          !value.reports.some(
            (item) =>
              item.operationId === command.operationId &&
              JSON.stringify(item.target) === JSON.stringify(action.target) &&
              item.reason === action.reason &&
              item.details === action.details.trim() &&
              item.blockedWriterId === (action.alsoBlock ? action.target.writerId : null),
          )
        )
          throw new Error('invalid');
        if (
          action.kind === 'report' &&
          action.alsoBlock &&
          action.target.writerId &&
          !state.value?.reports.some((item) => item.operationId === command.operationId) &&
          !value.blocked.includes(action.target.writerId)
        )
          throw new Error('invalid');
        generation += 1;
        reading = false;
        publish({ value, status: 'ready', readError: false });
        return { ok: true };
      } catch (error) {
        operations.delete(command.operationId);
        const message = error instanceof Error ? error.message : '';
        return {
          ok: false,
          error:
            message === 'invalid' || message === 'permission' || message === 'cancelled'
              ? message
              : 'unavailable',
        };
      } finally {
        publish({
          pending: state.pending.filter((id) => id !== command.operationId),
        });
      }
    });
    operations.set(command.operationId, { fingerprint, promise });
    queue = promise.then(() => {});
    return promise;
  }
  return {
    userId,
    reload,
    execute,
    getSnapshot: () => state,
    getReadScope: () => readScope,
    setReadScope(scope: string) {
      if (readScope === scope) return;
      started = started && Boolean(state.value) && !reading && !state.readError;
      readScope = scope; generation += 1; reading = false;
      publish({ readError: false, status: state.value ? 'ready' : 'loading' });
    },
    ensure: () => {
      if (!started) void reload();
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
export type ModerationStore = ReturnType<typeof createModerationStore>;
