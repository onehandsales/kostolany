import type { FeedArticle } from '../feed/types';
import type { BookmarkSnapshot, BookmarkSource, ReadingList, ReadingListSnapshot } from './types';

type BookmarkCommand = Readonly<{ id: number; intent: number; saved: boolean }>;
type BookmarkEntry = {
  article: FeedArticle;
  confirmed: boolean;
  desired: boolean;
  revision: number;
  intent: number;
  command: BookmarkCommand | null;
  failedTarget: boolean | null;
  snapshot: BookmarkSnapshot;
  listeners: Set<() => void>;
};

const loadingSnapshot: BookmarkSnapshot = { status: 'loading', isSaved: false, isPending: false, error: null };
const unknownSnapshot: BookmarkSnapshot = { status: 'error', isSaved: false, isPending: false, error: 'read' };

export type BookmarkStore = ReturnType<typeof createBookmarkStore>;

export function createBookmarkStore(source: BookmarkSource, userId: string, articles: readonly FeedArticle[]) {
  const entries = new Map<string, BookmarkEntry>(articles.map((article) => [article.id, {
    article, confirmed: false, desired: false, revision: 0, intent: 0, command: null,
    failedTarget: null, snapshot: loadingSnapshot, listeners: new Set(),
  }]));
  const listeners = new Set<() => void>();
  let isLoaded = false;
  let isReading = false;
  let hasReadError = false;
  let nextCommandId = 0;
  let listSnapshot: ReadingListSnapshot = {
    status: 'loading', isRefreshing: false, hasReadError: false, articles: [], failures: [],
  };

  function publish(changed: readonly BookmarkEntry[]): void {
    for (const entry of changed) {
      entry.snapshot = {
        status: isLoaded ? 'ready' : hasReadError ? 'error' : 'loading',
        isSaved: isLoaded && entry.desired,
        isPending: entry.command !== null,
        error: entry.failedTarget !== null ? 'write' : !isLoaded && hasReadError ? 'read' : null,
      };
    }
    listSnapshot = {
      status: isLoaded ? 'ready' : hasReadError ? 'error' : 'loading',
      isRefreshing: isReading,
      hasReadError,
      articles: [...entries.values()].filter((entry) => isLoaded && entry.desired).map((entry) => entry.article),
      failures: [...entries.values()].flatMap((entry) => entry.failedTarget === null ? [] : [{
        articleId: entry.article.id, title: entry.article.title, saved: entry.failedTarget,
      }]),
    };
    changed.forEach((entry) => entry.listeners.forEach((listener) => listener()));
    listeners.forEach((listener) => listener());
  }

  function validateList(response: ReadingList): void {
    if (response.userId !== userId || !Array.isArray(response.articleIds)
      || response.articleIds.some((id) => !entries.has(id))
      || new Set(response.articleIds).size !== response.articleIds.length) {
      throw new Error('Invalid reading list response');
    }
  }

  async function refreshReadingList(): Promise<void> {
    if (isReading) return;
    isReading = true;
    hasReadError = false;
    const revisions = new Map([...entries].map(([id, entry]) => [id, entry.revision]));
    publish([...entries.values()]);
    try {
      const response = await source.fetchReadingList(userId);
      validateList(response);
      const savedIds = new Set(response.articleIds);
      for (const [id, entry] of entries) {
        // 조회 중 바뀌거나 아직 확정되지 않은 기사는 과거 목록 응답으로 덮지 않는다.
        if (entry.revision !== revisions.get(id) || entry.command || entry.failedTarget !== null) continue;
        entry.confirmed = savedIds.has(id);
        entry.desired = entry.confirmed;
      }
      isLoaded = true;
    } catch {
      // 이미 새 쓰기로 바뀐 상태는 유지하며 조회 실패는 목록 갱신의 오류로만 알린다.
      hasReadError = true;
    } finally {
      isReading = false;
      publish([...entries.values()]);
    }
  }

  async function sendNextCommand(entry: BookmarkEntry): Promise<void> {
    if (entry.command || !isLoaded) return;
    if (entry.desired === entry.confirmed) { publish([entry]); return; }
    const command = { id: ++nextCommandId, intent: entry.intent, saved: entry.desired };
    entry.command = command;
    publish([entry]);
    try {
      const response = await source.setArticleSaved({ userId, articleId: entry.article.id,
        saved: command.saved, commandId: command.id });
      if (response.userId !== userId || response.articleId !== entry.article.id || response.saved !== command.saved) {
        throw new Error('Invalid bookmark response');
      }
      entry.confirmed = response.saved;
      entry.revision += 1;
      entry.command = null;
      void sendNextCommand(entry);
    } catch {
      entry.command = null;
      entry.revision += 1;
      if (entry.intent !== command.intent) { void sendNextCommand(entry); return; }
      entry.failedTarget = command.saved;
      entry.desired = entry.confirmed;
      publish([entry]);
    }
  }

  function setArticleSaved(articleId: string, saved: boolean): void {
    const entry = entries.get(articleId);
    if (!entry || !isLoaded || (entry.desired === saved && entry.failedTarget === null)) return;
    entry.intent += 1;
    entry.revision += 1;
    entry.desired = saved;
    entry.failedTarget = null;
    if (entry.command) publish([entry]);
    else void sendNextCommand(entry);
  }

  return {
    updateArticles(next: readonly FeedArticle[]) {
      for (const article of next) {
        const existing = entries.get(article.id);
        if (existing) existing.article = article;
        else entries.set(article.id, { article, confirmed: false, desired: false, revision: 0, intent: 0,
          command: null, failedTarget: null, snapshot: loadingSnapshot, listeners: new Set() });
      }
      publish([...entries.values()]);
    },
    getSnapshot: (articleId: string): BookmarkSnapshot => entries.get(articleId)?.snapshot ?? unknownSnapshot,
    getReadingListSnapshot: (): ReadingListSnapshot => listSnapshot,
    subscribe(articleId: string, listener: () => void): () => void {
      const entry = entries.get(articleId);
      entry?.listeners.add(listener);
      return () => { entry?.listeners.delete(listener); };
    },
    subscribeReadingList(listener: () => void): () => void {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    ensureReadingList(): void {
      if (!isLoaded && !hasReadError) void refreshReadingList();
    },
    refreshReadingList,
    setArticleSaved,
    retryBookmark(articleId: string): void {
      const entry = entries.get(articleId);
      if (!entry || entry.command) return;
      if (entry.failedTarget !== null) setArticleSaved(articleId, entry.failedTarget);
      else if (hasReadError) void refreshReadingList();
    },
  };
}
