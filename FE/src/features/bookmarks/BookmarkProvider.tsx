import { createContext, useState, type ReactNode } from 'react';

import type { FeedArticle } from '../feed/types';
import { createLibraryStore, type LibraryStore } from './createLibraryStore';
import { bookmarkArticles, MOCK_BOOKMARK_USER_ID } from './data/bookmarkFixtures';
import { bookmarkPreviewScenario } from './data/bookmarkPreview';
import { createMockBookmarkSource } from './data/createMockBookmarkSource';
import type { BookmarkSource } from './types';

export const BookmarkStoreContext = createContext<LibraryStore | null>(null);
export const BookmarkScopeContext = createContext('unprovided');

type BookmarkProviderProps = {
  children: ReactNode; source?: BookmarkSource; userId?: string | null; articles?: readonly FeedArticle[];
  sessionRevision?: number;
};

export function BookmarkProvider({ children, source, userId = MOCK_BOOKMARK_USER_ID,
  articles = bookmarkArticles, sessionRevision = 0 }: BookmarkProviderProps) {
  const [defaultSource] = useState(() => createMockBookmarkSource({ scenario: bookmarkPreviewScenario }));
  const currentSource = source ?? defaultSource;
  const [scope, setScope] = useState(() => ({ source: currentSource, articles, version: 0,
    getStore: createUserStores(currentSource, articles) }));
  // 저장소 수명은 최적화 캐시가 아닌 상태로 소유하며 범위가 바뀐 렌더에서는 이전 화면을 제외한다.
  if (scope.source !== currentSource || scope.articles !== articles) {
    setScope({ source: currentSource, articles, version: scope.version + 1,
      getStore: createUserStores(currentSource, articles) });
    return null;
  }
  const store = userId ? scope.getStore(userId) : null;
  // 공개 화면은 유지하고 개인 화면과 시트만 이 범위 키를 사용해 이전 입력을 정리한다.
  return <BookmarkScopeContext.Provider value={JSON.stringify([scope.version, userId, sessionRevision])}>
    <BookmarkStoreContext.Provider value={store}>{children}</BookmarkStoreContext.Provider>
  </BookmarkScopeContext.Provider>;
}

function createUserStores(source: BookmarkSource, articles: readonly FeedArticle[]): (userId: string) => LibraryStore {
  const stores = new Map<string, LibraryStore>();
  return (userId) => {
    // 같은 사용자로 돌아와도 진행 중인 쓰기와 확정 상태의 소유자를 유지한다.
    const existing = stores.get(userId);
    if (existing) return existing;
    const created = createLibraryStore(source, userId, articles);
    stores.set(userId, created);
    return created;
  };
}
