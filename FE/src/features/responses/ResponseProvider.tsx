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
import { usePublicListAccess } from '../public-lists/PublicListProvider';
import { articleWriter } from '../community/data/publicDirectory';
import { useArticleCatalog } from '../feed/ArticleCatalog';
import { writtenStoryId } from '../editor/publishedArticle';
import { getResponseCount } from './responseVisibility';
import { createResponseStore, type ResponseStore } from './createResponseStore';
import { createMockResponseSource } from './data/createMockResponseSource';
import { responsePreviewScenario, responsePreviewUncapturedCount } from './data/responsePreview';
import type { ResponseSource, ResponseTarget } from './types';
import { ReadScopeBoundary } from '../../shared/state/ReadScopeBoundary';

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
  const getList = usePublicListAccess()?.getListForUser;
  const catalog = useArticleCatalog();
  const fallback = useMemo(
    () =>
      createMockResponseSource({
        scenario: responsePreviewScenario,
        uncapturedCountFor: responsePreviewUncapturedCount,
        ownerFor: (target, reader) => target.kind === 'list'
          ? getList?.(reader, target.id)?.owner.id ?? null
          : catalog?.getSnapshot().find(article => article.id === target.id)?.publishedStory?.ownerId
            ?? (target.id === 'example-latest-rates' ? 'example-reader' : null),
        canRead: (reader, target) => {
          if (target.kind === 'article' && writtenStoryId(target.id)) {
            const story = catalog?.getSnapshot().find(article => article.id === target.id)?.publishedStory;
            return Boolean(story && (!reader || !isBlockedForUser(reader, story.ownerId)));
          }
          if (target.kind !== 'list' || !getList) return true;
          const list = getList(reader, target.id);
          return Boolean(list && (!reader || !isBlockedForUser(reader, list.owner.id)));
        },
        canInteract: (owner, target, authorId) => {
          if (target.kind === 'article' && writtenStoryId(target.id)) {
            const story = catalog?.getSnapshot().find(article => article.id === target.id)?.publishedStory;
            return Boolean(story && !isBlockedForUser(owner, story.ownerId)
              && !(authorId && isBlockedForUser(owner, authorId)));
          }
          const writer = target.kind === 'article' ? articleWriter(target.id) : null;
          return (
            !(writer && isBlockedForUser(owner, writer.id)) &&
            !(authorId && isBlockedForUser(owner, authorId))
          );
        },
      }),
    [isBlockedForUser, getList, catalog],
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
  const scope = JSON.stringify([cache.generation, userId, revision]);
  return (
    <Context.Provider
      value={{
        store,
        scope,
      }}
    >
      <ReadScopeBoundary store={store} scope={scope} />
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
  const raw = useSyncExternalStore(subscribe, snapshot, snapshot);
  const state = raw && store?.getReadScope() !== context?.scope
    ? { ...raw, readError: false, status: raw.value ? 'ready' as const : 'loading' as const } : raw;
  useEffect(() => {
    store?.ensure({ kind, id });
  }, [store, kind, id, context?.scope]);
  return { store, state, scope: context?.scope ?? 'unavailable' };
}
export function useResponseCount(target: ResponseTarget): number | null {
  const { state } = useResponses(target);
  const moderation = useModeration();
  return state?.value
    ? getResponseCount(state.value, moderation.state?.value?.blocked)
    : null;
}
