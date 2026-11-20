import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

import { createClapStore, type ClapStore } from './createClapStore';
import { createMockClapSource } from './data/createMockClapSource';
import { clapPreviewScenario } from './data/clapPreview';
import type { ClapSource, ClapTarget } from './types';

export const ClapContext = createContext<ClapStore | null>(null);
export const ClapScopeContext = createContext('guest');
type ClapProviderProps = { children: ReactNode; userId: string | null; source?: ClapSource; revision?: number };
export function ClapProvider({ children, userId, source, revision = 0 }: ClapProviderProps) {
  const [fallback] = useState(() => createMockClapSource({ scenario: clapPreviewScenario }));
  const current = source ?? fallback;
  const [scope, setScope] = useState(() => ({ source: current, stores: new Map<string, ClapStore>(), version: 0 }));
  if (scope.source !== current) { setScope({ source: current, stores: new Map(), version: scope.version + 1 }); return null; }
  let store = userId ? scope.stores.get(userId) ?? null : null;
  if (userId && !store) { store = createClapStore(current, userId); scope.stores.set(userId, store); }
  return <ClapScopeContext.Provider value={JSON.stringify([scope.version, userId, revision])}>
    <ClapContext.Provider value={store}>{children}</ClapContext.Provider>
  </ClapScopeContext.Provider>;
}

export function useClaps(store: ClapStore, target: ClapTarget) {
  const { kind, id } = target;
  const subscribe = useCallback((listener: () => void) => store.subscribe({ kind, id }, listener), [store, kind, id]);
  const snapshot = useCallback(() => store.getSnapshot({ kind, id }), [store, kind, id]);
  const state = useSyncExternalStore(subscribe, snapshot, snapshot);
  useEffect(() => { store.ensure({ kind, id }); }, [store, kind, id]);
  return state;
}

export function useClapStore(): ClapStore | null { return useContext(ClapContext); }
