import type { FeedArticle } from '../feed/types';
import type { UserListStore } from './createUserListStore';
import { DEFAULT_LIST_ID } from './listTypes';
import type { BookmarkSnapshot, ReadingListSnapshot } from './types';

// 기본 읽기 목록도 같은 목록 저장소에서 파생해 메모와 순서의 원본을 나누지 않는다.
export function createManagedReadingList(store: UserListStore, articles: readonly FeedArticle[]) {
  const unavailable: BookmarkSnapshot = { status: 'error', isSaved: false, isPending: false, error: 'read' };
  const snapshots = new Map<string, BookmarkSnapshot>();
  const listeners = new Set<() => void>();
  let snapshot: ReadingListSnapshot;
  function update() {
    const state = store.getSnapshot();
    const entry = state.entries.find(item => item.listId === DEFAULT_LIST_ID);
    const ids = entry?.content?.articleIds ?? [];
    const target = entry?.failure?.target?.articleIds ?? [];
    const failedIds = entry?.failure
      ? articles.filter(article => ids.includes(article.id) !== target.includes(article.id)) : [];
    for (const article of articles) {
      const previous = snapshots.get(article.id);
      const next: BookmarkSnapshot = { status: state.status, isSaved: ids.includes(article.id),
        isPending: Boolean(entry?.isPending), error: failedIds.includes(article) ? 'write' : state.status === 'error' ? 'read' : null };
      if (!previous || previous.status !== next.status || previous.isSaved !== next.isSaved
        || previous.isPending !== next.isPending || previous.error !== next.error) snapshots.set(article.id, next);
    }
    snapshot = { status: state.status, isRefreshing: state.isRefreshing, hasReadError: state.hasReadError,
      articles: ids.flatMap(id => articles.find(article => article.id === id) ?? []),
      failures: failedIds.map(article => ({ articleId: article.id, title: article.title, saved: target.includes(article.id) })) };
    listeners.forEach(listener => listener());
  }
  store.subscribe(update);
  update();
  const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
  return {
    updateArticles(next: readonly FeedArticle[]) { articles = next; update(); },
    getSnapshot: (id: string): BookmarkSnapshot => snapshots.get(id)
      ?? unavailable,
    getReadingListSnapshot: () => snapshot,
    subscribe: (_id: string, listener: () => void) => subscribe(listener),
    subscribeReadingList: subscribe,
    ensureReadingList: store.ensureLists,
    refreshReadingList: store.refreshLists,
    setArticleSaved: (id: string, saved: boolean) => store.setArticleInList(DEFAULT_LIST_ID, id, saved),
    retryBookmark: () => {
      if (store.getSnapshot().hasReadError) void store.refreshLists();
      else store.retryList(DEFAULT_LIST_ID);
    },
  };
}
