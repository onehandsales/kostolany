import {
  responseTargetKey,
  type ResponseAction,
  type ResponseResult,
  type ResponseSnapshot,
  type ResponseSource,
  type ResponseTarget,
} from './types';
import { validateResponseValue } from './validateResponseValue';

type Entry = {
  state: ResponseSnapshot;
  epoch: number;
  reading: boolean;
  needsRead: boolean;
  tail: Promise<void>;
  operations: Map<string, { fingerprint: string; promise: Promise<ResponseResult> }>;
  listeners: Set<() => void>;
};
const initial: ResponseSnapshot = {
  status: 'loading',
  value: null,
  pendingIds: [],
  isRefreshing: false,
  readError: false,
};
export type ResponseStore = ReturnType<typeof createResponseStore>;
export function createResponseStore(source: ResponseSource, userId: string | null) {
  const entries = new Map<string, Entry>();
  let readScope = '';
  function entryFor(target: ResponseTarget): Entry {
    const key = responseTargetKey(target);
    let entry = entries.get(key);
    if (!entry) {
      entry = {
        state: initial,
        epoch: 0,
        reading: false,
        needsRead: true,
        tail: Promise.resolve(),
        operations: new Map(),
        listeners: new Set(),
      };
      entries.set(key, entry);
    }
    return entry;
  }
  function publish(entry: Entry, patch: Partial<ResponseSnapshot>): void {
    entry.state = { ...entry.state, ...patch };
    entry.listeners.forEach((listener) => listener());
  }
  async function refresh(target: ResponseTarget): Promise<void> {
    const entry = entryFor(target);
    if (entry.reading || entry.state.pendingIds.length) return;
    const epoch = ++entry.epoch;
    entry.reading = true;
    publish(entry, {
      isRefreshing: true,
      readError: false,
      status: entry.state.value ? 'ready' : 'loading',
    });
    try {
      const value = await source.read({ userId, target });
      if (epoch !== entry.epoch) return;
      validateResponseValue(value, userId, target);
      if (value.version < (entry.state.value?.version ?? 0)) throw new Error('invalid');
      entry.reading = false;
      entry.needsRead = false;
      publish(entry, { value, status: 'ready', isRefreshing: false });
    } catch {
      if (epoch !== entry.epoch) return;
      entry.reading = false;
      publish(entry, {
        status: entry.state.value ? 'ready' : 'error',
        isRefreshing: false,
        readError: true,
      });
    }
  }
  function execute(
    target: ResponseTarget,
    operationId: string,
    action: ResponseAction,
    signal?: AbortSignal,
  ): Promise<ResponseResult> {
    const entry = entryFor(target);
    if (!userId) return Promise.resolve({ ok: false, error: 'permission' });
    if (!entry.state.value || !operationId) return Promise.resolve({ ok: false, error: 'invalid' });
    const fingerprint = JSON.stringify(action);
    const previous = entry.operations.get(operationId);
    if (previous)
      return previous.fingerprint === fingerprint
        ? previous.promise
        : Promise.resolve({ ok: false, error: 'invalid' });
    entry.epoch += 1;
    entry.reading = false;
    publish(entry, {
      pendingIds: [...entry.state.pendingIds, action.id],
      isRefreshing: false,
      readError: false,
    });
    // 모든 댓글 명령은 대상별 순서대로 처리하고 같은 작업 ID의 재전송은 한 번만 적용한다.
    const promise = entry.tail.then(async (): Promise<ResponseResult> => {
      try {
        if (signal?.aborted) throw new Error('unavailable');
        const value = await source.execute({ userId, target, operationId, action }, signal);
        validateResponseValue(value, userId, target);
        if (value.version < (entry.state.value?.version ?? 0)) throw new Error('invalid');
        if (action.kind === 'discussion') {
          if (value.ownerId !== userId || value.discussion !== action.value) throw new Error('invalid');
        } else {
          const changed = value.responses.find((response) => response.id === action.id);
          if (
            !changed ||
            (action.kind === 'hide' && (value.ownerId !== userId || changed.hidden !== action.hidden)) ||
            (action.kind !== 'react' && action.kind !== 'hide' && changed.authorId !== userId) ||
            (action.kind === 'delete' && !changed.deleted) ||
            (action.kind === 'create' && changed.parentId !== action.parentId) ||
            ((action.kind === 'create' || action.kind === 'edit') &&
              !changed.deleted &&
              changed.body !== action.body.trim()) ||
            (action.kind === 'react' && !changed.deleted && changed.applauded !== action.active)
          )
            throw new Error('invalid');
        }
        publish(entry, { value, status: 'ready' });
        return { ok: true };
      } catch (error) {
        entry.operations.delete(operationId);
        const message = error instanceof Error ? error.message : '';
        return {
          ok: false,
          error:
            message === 'permission' || message === 'removed' || message === 'invalid'
              ? message
              : 'unavailable',
        };
      } finally {
        const pendingIds = [...entry.state.pendingIds];
        pendingIds.splice(pendingIds.indexOf(action.id), 1);
        publish(entry, { pendingIds });
      }
    });
    entry.operations.set(operationId, { fingerprint, promise });
    entry.tail = promise.then(() => {});
    return promise;
  }
  return {
    userId,
    getReadScope: () => readScope,
    setReadScope(scope: string) {
      if (readScope === scope) return;
      readScope = scope;
      entries.forEach(entry => {
        entry.epoch += 1; entry.reading = false; entry.needsRead = true;
        publish(entry, { readError: false, isRefreshing: false, status: entry.state.value ? 'ready' : 'loading' });
      });
    },
    execute,
    refresh,
    getSnapshot: (target: ResponseTarget): ResponseSnapshot =>
      entries.get(responseTargetKey(target))?.state ?? initial,
    ensure(target: ResponseTarget): void {
      const entry = entryFor(target);
      if (entry.state.status === 'loading' || entry.needsRead && !entry.state.readError) void refresh(target);
    },
    subscribe(target: ResponseTarget, listener: () => void): () => void {
      const entry = entryFor(target);
      entry.listeners.add(listener);
      return () => {
        entry.listeners.delete(listener);
      };
    },
  };
}
