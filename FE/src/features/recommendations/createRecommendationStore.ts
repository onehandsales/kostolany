import {
  validateRecommendation,
  type RecommendationCommand,
  type RecommendationSnapshot,
  type RecommendationSource,
} from './types';

export function createRecommendationStore(source: RecommendationSource, userId: string) {
  let state: RecommendationSnapshot = { status: 'loading', value: null, readError: false, pending: [] };
  let started = false;
  let reading = false;
  let generation = 0;
  let queue = Promise.resolve();
  const operations = new Map<string, { fingerprint: string; promise: Promise<boolean> }>();
  const listeners = new Set<() => void>();
  function publish(patch: Partial<RecommendationSnapshot>) {
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
  }
  async function reload() {
    if (reading) return;
    reading = true;
    started = true;
    const request = ++generation;
    publish({ status: state.value ? 'ready' : 'loading', readError: false });
    try {
      const value = await source.read(userId);
      if (request !== generation) return;
      validateRecommendation(value, userId);
      if (value.version < (state.value?.version ?? 0)) throw new Error('Old input');
      publish({ value, status: 'ready' });
    } catch {
      if (request === generation) publish({ status: state.value ? 'ready' : 'error', readError: true });
    } finally {
      reading = false;
    }
  }
  function execute(command: RecommendationCommand, signal?: AbortSignal): Promise<boolean> {
    if (
      !state.value ||
      !command.operationId?.trim() ||
      !command.articleId?.trim() ||
      typeof command.hidden !== 'boolean'
    )
      return Promise.resolve(false);
    const fingerprint = JSON.stringify(command);
    const previous = operations.get(command.operationId);
    if (previous) return previous.fingerprint === fingerprint ? previous.promise : Promise.resolve(false);
    publish({ pending: [...state.pending, command.operationId] });
    const promise = queue.then(async () => {
      try {
        if (signal?.aborted) throw new Error('Cancelled');
        const value = await source.execute(userId, command, signal);
        validateRecommendation(value, userId);
        if (
          value.version < (state.value?.version ?? 0) ||
          value.hiddenArticleIds.includes(command.articleId) !== command.hidden
        )
          throw new Error('Invalid acknowledgement');
        generation += 1;
        publish({ value, status: 'ready', readError: false });
        return true;
      } catch {
        operations.delete(command.operationId);
        return false;
      } finally {
        publish({ pending: state.pending.filter((id) => id !== command.operationId) });
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
export type RecommendationStore = ReturnType<typeof createRecommendationStore>;
