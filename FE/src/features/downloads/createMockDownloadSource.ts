import { articleFixtures } from '../article/data/fixtures';
import type { ArticleDetail } from '../article/types';
import type { UserListSource } from '../bookmarks/listTypes';
import type { DownloadSource } from './types';

export function createMockDownloadSource({ lists, delayMs = 450, scenario = 'normal' }: {
  lists?: UserListSource; delayMs?: number; scenario?: 'normal' | 'partial-error';
}): DownloadSource & { setOnline: (online: boolean) => void; replaceArticle: (article: ArticleDetail | null, id: string) => void } {
  const articles = new Map(articleFixtures.map(article => [article.id, { article, version: 1 }]));
  const versions = new Map(articleFixtures.map(article => [article.id, 1]));
  const failures = new Set<string>();
  const listeners = new Set<() => void>();
  let online = true;
  const notify = () => listeners.forEach(listener => listener());
  return {
    getLists: () => lists?.getCatalog?.() ?? [],
    getVersion: id => articles.has(id) ? `fixture-${articles.get(id)!.version}` : null,
    isOnline: () => online,
    subscribe(listener) {
      listeners.add(listener); const close = lists?.subscribe?.(listener);
      return () => { listeners.delete(listener); close?.(); };
    },
    async load(request, signal) {
      const permitted = () => lists?.getCatalog?.().some(list => list.userId === request.userId &&
        list.listId === request.listId && list.articleIds.includes(request.articleId));
      if (!permitted()) throw new Error('DOWNLOAD_FORBIDDEN');
      if (delayMs) await new Promise(resolve => setTimeout(resolve, delayMs));
      if (signal.aborted) throw new Error('DOWNLOAD_CANCELLED');
      if (!online) throw new Error('DOWNLOAD_OFFLINE');
      if (!permitted()) throw new Error('DOWNLOAD_FORBIDDEN');
      const list = lists?.getCatalog?.().find(item => item.userId === request.userId && item.listId === request.listId);
      const key = JSON.stringify([request.userId, request.listId, request.articleId]);
      if (scenario === 'partial-error' && list?.articleIds[1] === request.articleId && !failures.has(key)) {
        failures.add(key); throw new Error('DOWNLOAD_FAILED');
      }
      const value = articles.get(request.articleId);
      if (!value) throw new Error('DOWNLOAD_ARTICLE_UNAVAILABLE');
      return { ...request, contentVersion: `fixture-${value.version}`, article: value.article };
    },
    setOnline(value) { online = value; notify(); },
    replaceArticle(article, id) {
      if (article && article.id !== id) throw new Error('DOWNLOAD_ARTICLE_ID_MISMATCH');
      const version = (versions.get(id) ?? 0) + 1; versions.set(id, version);
      if (article) articles.set(id, { article, version });
      else articles.delete(id);
      notify();
    },
  };
}
