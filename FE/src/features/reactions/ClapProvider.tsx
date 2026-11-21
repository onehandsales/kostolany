import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';

import { usePublicListAccess } from '../public-lists/PublicListProvider';
import { useModeration } from '../moderation/ModerationContext';
import { useArticleCatalog } from '../feed/ArticleCatalog';
import { writtenStoryId } from '../editor/publishedArticle';

import { createClapStore, type ClapStore } from './createClapStore';
import { createMockClapSource } from './data/createMockClapSource';
import { clapPreviewScenario } from './data/clapPreview';
import type { ClapSource, ClapTarget } from './types';

export const ClapContext = createContext<ClapStore | null>(null);
export const ClapScopeContext = createContext('guest');
type ClapProviderProps = { children: ReactNode; userId: string | null; source?: ClapSource; revision?: number };
export function ClapProvider({ children, userId, source, revision = 0 }: ClapProviderProps) {
  const getList = usePublicListAccess()?.getListForUser;
  const { isBlockedForUser } = useModeration();
  const catalog = useArticleCatalog();
  const fallback = useMemo(() => createMockClapSource({ scenario: clapPreviewScenario,
    baselineFor: ({ userId: owner, target }) => target.kind === 'list'
      ? getList?.(owner, target.id)?.baselineClaps
      : catalog?.getSnapshot().find(article => article.id === target.id)?.publishedStory ? 0 : undefined,
    canInteract: ({ userId: owner, target }) => {
      if (target.kind === 'article' && writtenStoryId(target.id)) {
        const article = catalog?.getSnapshot().find(item => item.id === target.id);
        return Boolean(article?.publishedStory && !isBlockedForUser(owner, article.publishedStory.ownerId));
      }
      if (target.kind !== 'list' || !getList) return true;
      const list = getList(owner, target.id);
      return Boolean(list && !isBlockedForUser(owner, list.owner.id));
    },
  }), [getList, isBlockedForUser, catalog]);
  const current = source ?? fallback;
  const [scope, setScope] = useState(() => ({ source: current, stores: new Map<string, ClapStore>(), version: 0 }));
  if (scope.source !== current) { setScope({ source: current, stores: new Map(), version: scope.version + 1 }); return null; }
  let store = userId ? scope.stores.get(userId) ?? null : null;
  if (userId && !store) { store = createClapStore(current, userId); scope.stores.set(userId, store); }
  const sessionScope = JSON.stringify([scope.version, userId, revision]);
  return <ClapScopeContext.Provider value={sessionScope}>
    <ClapContext.Provider value={store}>
      <ClapSession key={sessionScope} store={store} scope={sessionScope} />
      {children}
    </ClapContext.Provider>
  </ClapScopeContext.Provider>;
}

function ClapSession({ store, scope }: { store: ClapStore | null; scope: string }) {
  useEffect(() => {
    store?.setScope(scope);
    return () => store?.setScope('');
  }, [store, scope]);
  return null;
}

export function useClaps(store: ClapStore, target: ClapTarget) {
  const scope = useContext(ClapScopeContext);
  const { kind, id } = target;
  const subscribe = useCallback((listener: () => void) => store.subscribe({ kind, id }, listener), [store, kind, id]);
  const snapshot = useCallback(() => store.getSnapshot({ kind, id }), [store, kind, id]);
  const state = useSyncExternalStore(subscribe, snapshot, snapshot);
  useEffect(() => { store.ensure({ kind, id }); }, [store, kind, id, scope]);
  return store.getScope() === scope ? state : { ...state, error: null };
}

export function useClapStore(): ClapStore | null { return useContext(ClapContext); }
