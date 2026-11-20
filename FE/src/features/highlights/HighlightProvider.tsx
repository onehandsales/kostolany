import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

import { createHighlightStore, type HighlightStore } from './createHighlightStore';
import { createMockHighlightSource } from './data/createMockHighlightSource';
import { highlightPreviewScenario } from './data/highlightPreview';
import type { HighlightSource } from './types';

const Context = createContext<{ store: HighlightStore | null; scope: string }>({ store: null, scope: 'unavailable' });
export function HighlightProvider({ children, userId, revision, source }: { children: ReactNode; userId: string | null; revision: number; source?: HighlightSource }) {
  const [fallback] = useState(() => createMockHighlightSource({ scenario: highlightPreviewScenario }));
  const current = source ?? fallback;
  const [cache, setCache] = useState(() => ({ source: current, generation: 0, stores: new Map<string, HighlightStore>() }));
  if (cache.source !== current) { setCache({ source: current, generation: cache.generation + 1, stores: new Map() }); return null; }
  let store = userId ? cache.stores.get(userId) ?? null : null;
  if (userId && !store) { store = createHighlightStore(current, userId); cache.stores.set(userId, store); }
  return <Context.Provider value={{ store, scope: JSON.stringify([cache.generation, userId, revision]) }}>{children}</Context.Provider>;
}
const noop = () => () => {};
export function useHighlights() {
  const context = useContext(Context);
  const snapshot = () => context.store?.getSnapshot() ?? null;
  const state = useSyncExternalStore(context.store?.subscribe ?? noop, snapshot, snapshot);
  useEffect(() => { context.store?.ensure(); }, [context.store]);
  return { ...context, state };
}
