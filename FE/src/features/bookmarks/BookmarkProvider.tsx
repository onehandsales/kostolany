import { createContext, useMemo, type ReactNode } from 'react';

import type { FeedArticle } from '../feed/types';
import { createBookmarkStore, type BookmarkStore } from './createBookmarkStore';
import { bookmarkArticles, MOCK_BOOKMARK_USER_ID } from './data/bookmarkFixtures';
import { bookmarkPreviewScenario } from './data/bookmarkPreview';
import { createMockBookmarkSource } from './data/createMockBookmarkSource';
import type { BookmarkSource } from './types';

export const BookmarkStoreContext = createContext<BookmarkStore | null>(null);

type BookmarkProviderProps = {
  children: ReactNode; source?: BookmarkSource; userId?: string; articles?: readonly FeedArticle[];
};

export function BookmarkProvider({ children, source, userId = MOCK_BOOKMARK_USER_ID,
  articles = bookmarkArticles }: BookmarkProviderProps) {
  const defaultSource = useMemo(() => createMockBookmarkSource({ scenario: bookmarkPreviewScenario }), []);
  const getStore = useMemo(() => createUserStores(source ?? defaultSource, articles), [source, defaultSource, articles]);
  return <BookmarkStoreContext.Provider value={getStore(userId)}>{children}</BookmarkStoreContext.Provider>;
}

function createUserStores(source: BookmarkSource, articles: readonly FeedArticle[]): (userId: string) => BookmarkStore {
  const stores = new Map<string, BookmarkStore>();
  return (userId) => {
    // 같은 사용자로 돌아와도 진행 중인 쓰기와 확정 상태의 소유자를 유지한다.
    const existing = stores.get(userId);
    if (existing) return existing;
    const created = createBookmarkStore(source, userId, articles);
    stores.set(userId, created);
    return created;
  };
}
