import { useCallback, useContext, useEffect, useSyncExternalStore } from 'react';

import { BookmarkStoreContext } from './BookmarkProvider';
import type { LibraryStore } from './createLibraryStore';
import type { UserListsSnapshot } from './listTypes';
import type { BookmarkSnapshot, ReadingListSnapshot } from './types';

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
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
