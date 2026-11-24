import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import { hasMembershipBenefit } from '../membership/types';
import { useMembership } from '../membership/MembershipProvider';
import { useAuth } from '../auth/AuthProvider';
import type { UserListSource } from '../bookmarks/listTypes';
import type { ArticleSource } from '../article/types';
import { createDownloadStore, type DownloadStore } from './createDownloadStore';
import { createMockDownloadSource } from './createMockDownloadSource';
import type { DownloadSnapshot, DownloadSource } from './types';
import { useWrittenStories } from '../editor/WrittenStoriesProvider';

const empty: DownloadSnapshot = { entries: [], online: true };
const noop = () => () => {};
const DownloadContext = createContext<{ store: DownloadStore | null; scope: string; online: boolean }>({ store: null, scope: '', online: true });

export function DownloadProvider({ source, lists, children }: { source?: DownloadSource; lists?: UserListSource; children: ReactNode }) {
  const auth = useAuth();
  const membership = useMembership();
  const written = useWrittenStories();
  const drafts = written?.source; const images = written?.images;
  const makeFallback = () => ({ lists, drafts, images, source: createMockDownloadSource({ lists,
    published: drafts && images ? { source: drafts, images } : undefined }) });
  const [fallback, setFallback] = useState(makeFallback);
  const current = source ?? fallback.source;
  const [cache, setCache] = useState(() => ({ source: current, generation: 0, stores: new Map<string, DownloadStore>() }));
  const online = useSyncExternalStore(current.subscribe, current.isOnline, current.isOnline);
  // 인증 수명이 끝난 사본도 소속·원문 철회를 관찰해 제거→복구 사이의 삭제를 놓치지 않는다.
  useEffect(() => cache.source.subscribe(() => {
    for (const stored of cache.stores.values()) if (!stored.getScope()) stored.reconcile();
  }), [cache]);
  if (fallback.lists !== lists || fallback.drafts !== drafts || fallback.images !== images) { setFallback(makeFallback()); return null; }
  if (cache.source !== current) { setCache({ source: current, generation: cache.generation + 1, stores: new Map() }); return null; }
  const userId = auth.state.user?.id ?? null;
  let store = userId ? cache.stores.get(userId) ?? null : null;
  if (userId && !store) { store = createDownloadStore(current, userId); cache.stores.set(userId, store); }
  const scope = JSON.stringify([cache.generation, userId, auth.state.revision, membership?.scope]);
  return <DownloadContext.Provider value={{ store, scope, online }}>
    <DownloadSession key={scope} store={store} scope={scope} />{children}
  </DownloadContext.Provider>;
}
function DownloadSession({ store, scope }: { store: DownloadStore | null; scope: string }) {
  const auth = useAuth();
  const revision = auth.state.revision;
  const membership = useMembership();
  const allowed = !membership || membership.allows('offline');
  const membershipSource = membership?.source;
  useEffect(() => store?.connect(scope, () => auth.store.getSnapshot().revision === revision &&
    auth.store.getSnapshot().user?.id === store.userId, () => !membershipSource || hasMembershipBenefit(
      membershipSource.getSnapshot().find(item => item.userId === store.userId)?.tier ?? 'free', 'offline')),
    [auth.store, revision, scope, store, allowed, membershipSource]);
  return null;
}
export function useDownloads() {
  const context = useContext(DownloadContext);
  const getSnapshot = () => context.store?.getScope() === context.scope ? context.store.getSnapshot() : empty;
  const state = useSyncExternalStore(context.store?.subscribe ?? noop, getSnapshot, getSnapshot);
  return { ...context, state, ready: Boolean(context.store?.getScope() === context.scope) };
}
export function useDownloadArticleSource(base: ArticleSource, articleId: string): { source: ArticleSource; offline: boolean } {
  const { store, scope, online, ready } = useDownloads();
  const cached = !online && ready ? store?.article(articleId) ?? null : null;
  const source = useMemo<ArticleSource>(() => online ? base : async id => {
    if (!cached?.article || !ready || store?.getScope() !== scope || cached.articleId !== id || store.article(id) !== cached)
      throw new Error('OFFLINE_ARTICLE_UNAVAILABLE');
    return cached.article;
  }, [base, cached, online, ready, scope, store]);
  return { source, offline: !online };
}
