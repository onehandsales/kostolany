import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import { useModeration } from '../moderation/ModerationContext';
import { articleWriter } from '../community/data/publicDirectory';
import { visibleResponses } from './responseVisibility';
import { createResponseStore, type ResponseStore } from './createResponseStore';
import { createMockResponseSource } from './data/createMockResponseSource';
import { responsePreviewScenario } from './data/responsePreview';
import type { ResponseSource, ResponseTarget } from './types';

const Context = createContext<{ store: ResponseStore; scope: string } | null>(null);
export function ResponseProvider({
  children,
  userId,
  revision,
  source,
}: {
  children: ReactNode;
  userId: string | null;
  revision: number;
  source?: ResponseSource;
}) {
  const { isBlockedForUser } = useModeration();
  const fallback = useMemo(
    () =>
      createMockResponseSource({
        scenario: responsePreviewScenario,
        canInteract: (owner, target, authorId) => {
          const writer = target.kind === 'article' ? articleWriter(target.id) : null;
          return (
            !(writer && isBlockedForUser(owner, writer.id)) &&
            !(authorId && isBlockedForUser(owner, authorId))
          );
        },
      }),
    [isBlockedForUser],
  );
  const current = source ?? fallback;
  const [cache, setCache] = useState(() => ({
    source: current,
    generation: 0,
    stores: new Map<string | null, ResponseStore>(),
  }));
  if (cache.source !== current) {
    setCache({
      source: current,
      generation: cache.generation + 1,
      stores: new Map(),
    });
    return null;
  }
  let store = cache.stores.get(userId);
  if (!store) {
    store = createResponseStore(current, userId);
    cache.stores.set(userId, store);
  }
  return (
    <Context.Provider
      value={{
        store,
        scope: JSON.stringify([cache.generation, userId, revision]),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useResponseScope() {
  return useContext(Context);
}
const noop = () => () => {};
export function useResponses(target: ResponseTarget) {
  const context = useContext(Context);
  const store = context?.store;
  const { kind, id } = target;
  const subscribe = useCallback(
    (listener: () => void) => store?.subscribe({ kind, id }, listener) ?? noop(),
    [store, kind, id],
  );
  const snapshot = useCallback(() => store?.getSnapshot({ kind, id }) ?? null, [store, kind, id]);
  const state = useSyncExternalStore(subscribe, snapshot, snapshot);
  useEffect(() => {
    store?.ensure({ kind, id });
  }, [store, kind, id]);
  return { store, state, scope: context?.scope ?? 'unavailable' };
}
export function useResponseCount(target: ResponseTarget): number | null {
  const { state } = useResponses(target);
  const moderation = useModeration();
  return state?.value
    ? visibleResponses(state.value, moderation.state?.value?.blocked).filter(
        (response) => !response.deleted && response.parentId === null,
      ).length
    : null;
}
