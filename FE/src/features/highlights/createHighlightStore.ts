import { validHighlight, type HighlightCommand, type HighlightSnapshot, type HighlightSource, type HighlightValue } from './types';

export function createHighlightStore(source: HighlightSource, userId: string) {
  let state: HighlightSnapshot = { status: 'loading', value: null, pending: 0, readError: false };
  let generation = 0;
  let loading = false;
  let started = false;
  let readScope = '';
  let queue = Promise.resolve();
  const listeners = new Set<() => void>();
  const operations = new Map<string, { fingerprint: string; result: Promise<boolean> }>();
  const emit = (patch: Partial<HighlightSnapshot>) => { state = { ...state, ...patch }; listeners.forEach(listener => listener()); };
  const valid = (value: HighlightValue) => value.userId === userId && Number.isSafeInteger(value.version) && value.version >= 0
    && Array.isArray(value.highlights) && value.highlights.every(validHighlight)
    && new Set(value.highlights.map(item => item.id)).size === value.highlights.length;
  async function read() {
    if (loading) return;
    loading = true; started = true;
    const request = ++generation;
    emit({ status: state.value ? 'ready' : 'loading', readError: false });
    try {
      const value = await source.read(userId);
      if (request !== generation) return;
      if (!valid(value)) throw new Error('Invalid highlight result');
      if (!state.value || value.version >= state.value.version) emit({ value, status: 'ready' });
    } catch { if (request === generation) emit({ status: state.value ? 'ready' : 'error', readError: true }); }
    finally { if (request === generation) loading = false; }
  }
  function set(command: HighlightCommand): Promise<boolean> {
    if (!command.operationId || !validHighlight(command.highlight)) return Promise.resolve(false);
    const fingerprint = JSON.stringify(command);
    const existing = operations.get(command.operationId);
    if (existing) return existing.fingerprint === fingerprint ? existing.result : Promise.resolve(false);
    emit({ pending: state.pending + 1 });
    const result = queue.then(async () => {
      try {
        const value = await source.set(userId, command);
        const saved = value.highlights.find(item => item.id === command.highlight.id);
        if (!valid(value) || Boolean(saved) !== command.selected
          || (saved && saved.text !== command.highlight.text)) throw new Error('Invalid highlight mutation');
        generation += 1;
        loading = false;
        if (!state.value || value.version >= state.value.version) emit({ value, status: 'ready', readError: false });
        return true;
      } catch { operations.delete(command.operationId); return false; }
      finally { emit({ pending: state.pending - 1 }); }
    });
    operations.set(command.operationId, { fingerprint, result });
    queue = result.then(() => {});
    return result;
  }
  return { userId, getSnapshot: () => state, subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    getReadScope: () => readScope,
    setReadScope(scope: string) {
      if (readScope === scope) return;
      started = started && Boolean(state.value) && !loading && !state.readError;
      readScope = scope; generation += 1; loading = false;
      // 제출된 쓰기의 확정 수명은 유지하고 이전 인증 범위의 조회와 오류만 끝낸다.
      emit({ readError: false, status: state.value ? 'ready' : 'loading' });
    },
    ensure: () => { if (!started) void read(); }, retry: () => { void read(); }, set };
}
export type HighlightStore = ReturnType<typeof createHighlightStore>;
