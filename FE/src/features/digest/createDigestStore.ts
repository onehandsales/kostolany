import type { DigestSource, DigestSnapshot } from './types';

export function createDigestStore(source: DigestSource, userId: string) {
  let state: DigestSnapshot = { issues: [], selectedId: null, catalogStatus: 'loading', status: 'loading', digest: null };
  let catalogRevision = 0;
  let detailRevision = 0;
  let active = false;
  const listeners = new Set<() => void>();
  function publish(next: Partial<DigestSnapshot>) {
    state = { ...state, ...next }; listeners.forEach(listener => listener());
  }
  async function select(id: string) {
    if (!active || state.catalogStatus !== 'ready' || !state.issues.some(issue => issue.id === id)) return;
    const revision = ++detailRevision;
    publish({ selectedId: id, digest: null, status: 'loading' });
    try {
      const result = await source.fetchDigest(userId, id);
      if (!active || revision !== detailRevision) return;
      const issue = state.issues.find(entry => entry.id === id);
      if (result.userId !== userId || result.digest.id !== id || result.digest.date !== issue?.date)
        throw new Error('DIGEST_IDENTITY_MISMATCH');
      publish({ digest: result.digest, status: 'ready' });
    } catch {
      if (active && revision === detailRevision) publish({ status: 'error' });
    }
  }
  async function refresh() {
    if (!active) return;
    const revision = ++catalogRevision;
    // 원본 갱신 신호 이후에는 이전 상세 응답을 더 이상 표시할 권한이 없다.
    ++detailRevision;
    publish({ catalogStatus: 'loading', digest: null, status: 'loading' });
    try {
      const result = await source.fetchIssues(userId);
      if (!active || revision !== catalogRevision) return;
      if (result.userId !== userId || new Set(result.issues.map(issue => issue.id)).size !== result.issues.length ||
        result.issues.some(issue => !/^\d{4}-\d{2}-\d{2}$/.test(issue.date) || !Number.isFinite(Date.parse(issue.date)) ||
          new Date(issue.date).toISOString().slice(0, 10) !== issue.date || !Number.isFinite(Date.parse(issue.publishedAt))))
        throw new Error('DIGEST_CATALOG_MISMATCH');
      const issues = [...result.issues].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, 10);
      const selectedId = issues.find(issue => issue.id === state.selectedId)?.id ?? issues[0]?.id ?? null;
      publish({ issues, selectedId, catalogStatus: 'ready', digest: null, status: selectedId ? 'loading' : 'ready' });
      if (selectedId) await select(selectedId);
    } catch {
      if (active && revision === catalogRevision) publish({ catalogStatus: 'error', status: 'error', digest: null });
    }
  }
  return {
    getSnapshot: () => state,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    connect() {
      active = true;
      const unsubscribe = source.subscribe?.(() => { void refresh(); });
      void refresh();
      return () => { active = false; ++catalogRevision; ++detailRevision; unsubscribe?.(); };
    },
    select,
    refresh,
    retry: () => state.catalogStatus === 'error' || !state.selectedId ? refresh() : select(state.selectedId),
  };
}
