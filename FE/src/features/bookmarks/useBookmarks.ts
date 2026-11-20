import { useCallback, useContext, useEffect, useSyncExternalStore } from 'react';

import { BookmarkScopeContext, BookmarkStoreContext } from './BookmarkProvider';
import type { LibraryStore } from './createLibraryStore';
import { DEFAULT_LIST_ID, type UserListsSnapshot } from './listTypes';
import type { BookmarkSnapshot, ReadingListSnapshot } from './types';

export function useBookmarkScopeKey(): string { return useContext(BookmarkScopeContext); }

export function useHasLibraryList(listId: string | undefined): boolean {
  const store = useContext(BookmarkStoreContext);
  const subscribe = useCallback((listener: () => void) => store?.userLists.subscribe(listener) ?? (() => {}), [store]);
  const getSnapshot = useCallback(() => !!store && (listId === DEFAULT_LIST_ID
    || store.userLists.getSnapshot().entries.some((entry) => entry.listId === listId && entry.content !== null)), [store, listId]);
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useBookmarkStore(): LibraryStore {
  const store = useContext(BookmarkStoreContext);
  if (!store) throw new Error('BookmarkProvider is required');
  useEffect(() => { store.ensureReadingList(); }, [store]);
  return store;
}

export function useArticleBookmark(articleId: string): {
  state: BookmarkSnapshot; toggleBookmark: () => void; retryBookmark: () => void;
} {
  const store = useBookmarkStore();
  const subscribe = useCallback((listener: () => void) => store.subscribe(articleId, listener), [store, articleId]);
  const getSnapshot = useCallback(() => store.getSnapshot(articleId), [store, articleId]);
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { state,
    toggleBookmark: () => store.readingList.setArticleSaved(articleId, !store.readingList.getSnapshot(articleId).isSaved),
    retryBookmark: () => store.retryBookmark(articleId) };
}

export function useReadingList(): {
  state: ReadingListSnapshot; retryReadingList: () => void; retryBookmark: (articleId: string) => void;
} {
  const store = useBookmarkStore().readingList;
  const state = useSyncExternalStore(store.subscribeReadingList, store.getReadingListSnapshot, store.getReadingListSnapshot);
  return { state, retryReadingList: () => { void store.refreshReadingList(); }, retryBookmark: store.retryBookmark };
}

export function useUserLists(): UserListsSnapshot {
  const store = useBookmarkStore().userLists;
  const scope = useBookmarkScopeKey();
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return store.getScope() === scope ? snapshot : { ...snapshot, hasReadError: false,
    entries: snapshot.entries.map(entry => ({ ...entry, failure: null })) };
}
