import type { FeedArticle } from '../feed/types';
import { createBookmarkStore } from './createBookmarkStore';
import { createUserListStore } from './createUserListStore';
import { createManagedReadingList } from './createManagedReadingList';
import { createMockUserListSource } from './data/createMockUserListSource';
import { DEFAULT_LIST_ID } from './listTypes';
import type { BookmarkSnapshot, BookmarkSource } from './types';

export type LibraryStore = ReturnType<typeof createLibraryStore>;

export function createLibraryStore(source: BookmarkSource, userId: string, articles: readonly FeedArticle[]) {
  const userLists = createUserListStore(source.lists ?? createMockUserListSource({ delayMs: 0 }),
    userId, articles.map((article) => article.id));
  const readingList = source.lists?.managesReadingList
    ? createManagedReadingList(userLists, articles) : createBookmarkStore(source, userId, articles);
  const listeners = new Map<string, Set<() => void>>();
  const snapshots = new Map<string, BookmarkSnapshot>();

  function updateSnapshots(): void {
    // 기사 선택은 기본 목록과 사용자 목록의 합집합에서 파생하며 별도 저장 원본을 만들지 않는다.
    const lists = userLists.getSnapshot();
    for (const article of articles) {
      const base = readingList.getSnapshot(article.id);
      const previous = snapshots.get(article.id);
      const selected = lists.entries.filter((entry) => entry.listId !== DEFAULT_LIST_ID && entry.content?.articleIds.includes(article.id));
      const next: BookmarkSnapshot = {
        status: base.status !== 'ready' ? base.status : lists.status,
        isSaved: base.isSaved || selected.length > 0,
        isPending: base.isPending || userLists.isArticlePending(article.id),
        error: base.error ?? (lists.status === 'error' ? 'read' : userLists.hasArticleFailure(article.id) ? 'write' : null),
      };
      if (previous && previous.status === next.status && previous.isSaved === next.isSaved
        && previous.isPending === next.isPending && previous.error === next.error) continue;
      snapshots.set(article.id, next);
      listeners.get(article.id)?.forEach((listener) => listener());
    }
  }
  readingList.subscribeReadingList(updateSnapshots);
  userLists.subscribe(updateSnapshots);
  updateSnapshots();

  return {
    readingList, userLists, articles,
    getSnapshot: (articleId: string): BookmarkSnapshot => snapshots.get(articleId) ?? readingList.getSnapshot(articleId),
    subscribe(articleId: string, listener: () => void): () => void {
      const subscribers = listeners.get(articleId) ?? new Set();
      subscribers.add(listener); listeners.set(articleId, subscribers);
      return () => { subscribers.delete(listener); };
    },
    ensureReadingList(): void { readingList.ensureReadingList(); userLists.ensureLists(); },
    hasCustomMembership(articleId: string): boolean {
      return userLists.getSnapshot().entries.some((entry) => entry.listId !== DEFAULT_LIST_ID && entry.content?.articleIds.includes(articleId));
    },
    setArticleInList(listId: string, articleId: string, saved: boolean): void {
      if (listId === DEFAULT_LIST_ID) readingList.setArticleSaved(articleId, saved);
      else userLists.setArticleInList(listId, articleId, saved);
    },
    retryBookmark(articleId: string): void {
      readingList.retryBookmark(articleId);
      const lists = userLists.getSnapshot();
      if (lists.hasReadError) void userLists.refreshLists();
      for (const entry of lists.entries) {
        if (entry.failure && (entry.content?.articleIds.includes(articleId)
          || entry.failure.target?.articleIds.includes(articleId))) userLists.retryList(entry.listId);
      }
    },
  };
}
