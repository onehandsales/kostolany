import { copyListContent, sameListContent } from '../bookmarks/listContent';
import type { UserList } from '../bookmarks/listTypes';
import type { DownloadEntry, DownloadSnapshot, DownloadSource } from './types';

export type DownloadStore = ReturnType<typeof createDownloadStore>;
export function createDownloadStore(source: DownloadSource, userId: string) {
  let state: DownloadSnapshot = { entries: [], online: source.isOnline() };
  let scope = '';
  let sequence = 0;
  let canUse = () => false;
  const jobs = new Map<string, { id: string; controller: AbortController; promise: Promise<void> }>();
  const listeners = new Set<() => void>();
  const listFor = (id: string) => source.getLists().find(list => list.userId === userId && list.listId === id);
  const entryFor = (id: string) => state.entries.find(entry => entry.listId === id);
  function publish(entries = state.entries) {
    state = { entries, online: source.isOnline() }; listeners.forEach(listener => listener());
  }
  function put(entry: DownloadEntry) {
    publish([...state.entries.filter(item => item.listId !== entry.listId), entry]);
  }
  function abort(id: string) { jobs.get(id)?.controller.abort(); jobs.delete(id); }
  function remove(id: string) { abort(id); publish(state.entries.filter(entry => entry.listId !== id)); }
  function cancel(id: string) {
    abort(id); const entry = entryFor(id);
    if (entry) put({ ...entry, phase: 'cancelled' });
  }
  function reconcile() {
    const entries = state.entries.flatMap(entry => {
      const current = listFor(entry.listId);
      if (!current) { abort(entry.listId); return []; }
      const changed = !sameListContent(current, entry.snapshot);
      const changedVersion = Object.values(entry.items).some(item => source.getVersion(item.articleId) !== item.contentVersion);
      if ((changed || changedVersion) && jobs.has(entry.listId)) abort(entry.listId);
      // 철회된 소속과 사라진 원문은 사본의 가용성에서도 즉시 제외한다.
      const items = Object.fromEntries(Object.entries(entry.items).filter(([id]) => current.articleIds.includes(id) && source.getVersion(id)));
      const missingCopy = entry.phase === 'complete' && current.articleIds.some(id => !items[id]);
      return [{ ...entry, items, outdated: changed || changedVersion || missingCopy,
        phase: (changed || changedVersion) && entry.phase === 'downloading' ? 'cancelled' as const : entry.phase }];
    });
    publish(entries);
  }
  function start(listId: string): Promise<void> {
    if (!scope || !canUse()) return Promise.resolve();
    const pending = jobs.get(listId); if (pending) return pending.promise;
    const current = listFor(listId); if (!current || !current.articleIds.length) return Promise.resolve();
    const previous = entryFor(listId);
    if (previous?.phase === 'complete' && !previous.outdated) return Promise.resolve();
    const snapshot: UserList = { ...copyListContent(current), userId, listId };
    const jobScope = scope;
    const id = JSON.stringify([userId, scope, ++sequence]);
    const controller = new AbortController();
    const items = previous && sameListContent(previous.snapshot, snapshot)
      ? Object.fromEntries(Object.entries(previous.items).filter(([articleId, item]) => source.getVersion(articleId) === item.contentVersion)) : {};
    const job = { id, controller, promise: Promise.resolve() };
    jobs.set(listId, job);
    put({ listId, jobId: id, snapshot, items, phase: 'downloading', outdated: false });
    const valid = () => scope === jobScope && canUse() && jobs.get(listId) === job && !controller.signal.aborted;
    job.promise = (async () => {
      try {
        for (const articleId of snapshot.articleIds) {
          if (!valid()) return;
          if (entryFor(listId)?.items[articleId]) continue;
          const result = await source.load({ userId, listId, articleId, jobId: id }, controller.signal);
          if (!valid()) return;
          const latest = listFor(listId);
          if (!latest || !sameListContent(latest, snapshot)) { reconcile(); return; }
          if (result.userId !== userId || result.listId !== listId || result.articleId !== articleId ||
            result.jobId !== id || result.article.id !== articleId || !result.contentVersion || source.getVersion(articleId) !== result.contentVersion)
            throw new Error('DOWNLOAD_RESPONSE_MISMATCH');
          const entry = entryFor(listId)!;
          put({ ...entry, items: { ...entry.items, [articleId]: { ...result, received: ++sequence } } });
        }
        if (valid()) { const entry = entryFor(listId)!; jobs.delete(listId); put({ ...entry, phase: 'complete' }); }
      } catch {
        if (valid()) { jobs.delete(listId); put({ ...entryFor(listId)!, phase: 'error' }); }
      }
    })();
    return job.promise;
  }
  return {
    userId,
    getScope: () => scope,
    getSnapshot: () => state,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    connect(nextScope: string, authorized: () => boolean) {
      scope = nextScope; canUse = authorized; reconcile();
      const unsubscribe = source.subscribe(reconcile);
      return () => {
        scope = ''; canUse = () => false; unsubscribe();
        for (const id of [...jobs.keys()]) cancel(id);
        publish(state.entries.map(entry => entry.phase === 'error' ? { ...entry, phase: 'cancelled' } : entry));
      };
    },
    start,
    cancel: (id: string) => { if (scope && canUse()) cancel(id); },
    remove: (id: string) => { if (scope && canUse()) remove(id); },
    article(id: string) {
      if (!scope || !canUse() || !source.getVersion(id)) return null;
      const candidates = state.entries.flatMap(entry => listFor(entry.listId)?.articleIds.includes(id) && entry.items[id] ? [entry.items[id]!] : []);
      return candidates.sort((a, b) => b.received - a.received)[0] ?? null;
    },
  };
}
