import { useCallback, useContext, useEffect, useSyncExternalStore } from 'react';

import { BookmarkStoreContext } from './BookmarkProvider';
import type { BookmarkStore } from './createBookmarkStore';
import type { BookmarkSnapshot, ReadingListSnapshot } from './types';

function useBookmarkStore(): BookmarkStore {
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
    toggleBookmark: () => store.setArticleSaved(articleId, !store.getSnapshot(articleId).isSaved),
    retryBookmark: () => store.retryBookmark(articleId) };
}

export function useReadingList(): {
  state: ReadingListSnapshot; retryReadingList: () => void; retryBookmark: (articleId: string) => void;
} {
  const store = useBookmarkStore();
  const state = useSyncExternalStore(store.subscribeReadingList, store.getReadingListSnapshot, store.getReadingListSnapshot);
  return { state, retryReadingList: () => { void store.refreshReadingList(); }, retryBookmark: store.retryBookmark };
}
