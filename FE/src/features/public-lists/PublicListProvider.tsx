import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore,
  type ReactNode } from 'react';

import { useAuth } from '../auth/AuthProvider';
import { createPublicListStore, type PublicListStore } from './createPublicListStore';
import { createMockPublicListSource } from './data/createMockPublicListSource';
import { publicListPreviewScenario } from './data/publicListPreview';
import type { PublicList, PublicListSource } from './types';
import type { UserListSource } from '../bookmarks/listTypes';

type PublicListContextValue = {
  store: PublicListStore;
  scope: string;
  getListForUser: (userId: string | null, listId: string) => PublicList | undefined;
};
const Context = createContext<PublicListContextValue | null>(null);
type PublicListProviderProps = { source?: PublicListSource; userLists?: UserListSource; children: ReactNode };

export function PublicListProvider({ source, userLists, children }: PublicListProviderProps) {
  const auth = useAuth();
  const [fallback, setFallback] = useState(() => ({ userLists,
    source: createMockPublicListSource({ scenario: publicListPreviewScenario, userLists }) }));
  const current = source ?? fallback.source;
  const [cache, setCache] = useState(() => ({ source: current, generation: 0,
    stores: new Map<string | null, PublicListStore>() }));
  const getListForUser = useCallback((userId: string | null, listId: string) => {
    if (cache.source.canAccess && !cache.source.canAccess(userId, listId)) return undefined;
    const snapshot = cache.stores.get(userId)?.getSnapshot();
    return snapshot?.readError ? undefined : snapshot?.value?.lists.find(list => list.id === listId);
  }, [cache]);
  if (fallback.userLists !== userLists) {
    setFallback({ userLists, source: createMockPublicListSource({ scenario: publicListPreviewScenario, userLists }) });
    return null;
  }
  if (cache.source !== current) {
    setCache({ source: current, generation: cache.generation + 1, stores: new Map() });
    return null;
  }
  const userId = auth.state.user?.id ?? null;
  let store = cache.stores.get(userId);
  if (!store) { store = createPublicListStore(current, userId); cache.stores.set(userId, store); }
  const scope = JSON.stringify([cache.generation, userId, auth.state.revision]);
  return <Context.Provider value={{ store, scope, getListForUser }}>
    <PublicListSession key={scope} store={store} scope={scope} source={current} />
    {children}
  </Context.Provider>;
}
function PublicListSession({ store, scope, source }: {
  store: PublicListStore; scope: string; source: PublicListSource;
}) {
  useEffect(() => {
    store.setScope(scope);
    void store.reload();
    const unsubscribe = source.subscribe?.(store.refreshAccess);
    return () => { unsubscribe?.(); store.setScope(''); };
  }, [store, scope, source]);
  return null;
}
export const usePublicListAccess = () => useContext(Context);
const noop = () => () => {};
export function usePublicLists() {
  const context = useContext(Context);
  const snapshot = () => context?.store.getSnapshot() ?? null;
  const state = useSyncExternalStore(context?.store.subscribe ?? noop, snapshot, snapshot);
  const lists = state?.value?.lists.filter(list => context?.store.isAccessible(list.id)) ?? [];
  const savedIds = state?.savedIds.filter(id => lists.some(list => list.id === id)) ?? [];
  return { ...context, state: state ? { ...state, savedIds,
    value: state.value ? { ...state.value, lists,
      savedIds: state.value.savedIds.filter(id => lists.some(list => list.id === id)) } : null,
    readError: state.readError && state.readErrorScope === context?.scope } : null };
}
