import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';

import { createHighlightStore, type HighlightStore } from './createHighlightStore';
import { createMockHighlightSource } from './data/createMockHighlightSource';
import { highlightPreviewScenario } from './data/highlightPreview';
import type { HighlightSource } from './types';
import { ReadScopeBoundary } from '../../shared/state/ReadScopeBoundary';
import { useArticleCatalog } from '../feed/ArticleCatalog';
import { useModeration } from '../moderation/ModerationContext';
import { articleWriter } from '../community/data/publicDirectory';

const Context = createContext<{ store: HighlightStore | null; scope: string }>({ store: null, scope: 'unavailable' });
export function HighlightProvider({ children, userId, revision, source }: { children: ReactNode; userId: string | null; revision: number; source?: HighlightSource }) {
  const catalog = useArticleCatalog();
  const { isBlockedForUser } = useModeration();
  // 저장 직전의 원문 존재와 제출 계정의 차단 상태를 읽으며 발행 문서 지원을 임의로 추가하지 않는다.
  const fallback = useMemo(() => createMockHighlightSource({ scenario: highlightPreviewScenario,
    canHighlight: (owner, passage) => {
      const article = catalog?.getSnapshot().find(value => value.id === passage.articleId);
      if (catalog && (!article || article.publishedStory)) return false;
      const writer = articleWriter(passage.articleId);
      return !(writer && isBlockedForUser(owner, writer.id));
    },
  }), [catalog, isBlockedForUser]);
  const current = source ?? fallback;
  const [cache, setCache] = useState(() => ({ source: current, generation: 0, stores: new Map<string, HighlightStore>() }));
  if (cache.source !== current) { setCache({ source: current, generation: cache.generation + 1, stores: new Map() }); return null; }
  let store = userId ? cache.stores.get(userId) ?? null : null;
  if (userId && !store) { store = createHighlightStore(current, userId); cache.stores.set(userId, store); }
  const scope = JSON.stringify([cache.generation, userId, revision]);
  return <Context.Provider value={{ store, scope }}><ReadScopeBoundary store={store} scope={scope} />{children}</Context.Provider>;
}
const noop = () => () => {};
export function useHighlights() {
  const context = useContext(Context);
  const snapshot = () => context.store?.getSnapshot() ?? null;
  const raw = useSyncExternalStore(context.store?.subscribe ?? noop, snapshot, snapshot);
  const state = raw && context.store?.getReadScope() !== context.scope
    ? { ...raw, readError: false, status: raw.value ? 'ready' as const : 'loading' as const } : raw;
  useEffect(() => { context.store?.ensure(); }, [context.store, context.scope]);
  return { ...context, state };
}
