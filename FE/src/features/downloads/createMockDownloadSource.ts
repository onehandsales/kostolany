import { articleFixtures } from '../article/data/fixtures';
import type { ArticleDetail } from '../article/types';
import type { UserListSource } from '../bookmarks/listTypes';
import type { DownloadSource } from './types';
import { publishedArticleId, writtenStoryId } from '../editor/publishedArticle';
import { validPublishedStory } from '../editor/publishing';
import { copyPublishedDownload, publishedDownloadFingerprint, matchesPublishedDownloadVersion, type PublishedDownloadSource } from './publishedDownload';

export function createMockDownloadSource({ lists, published, delayMs = 450, scenario = 'normal' }: {
  lists?: UserListSource; published?: PublishedDownloadSource; delayMs?: number; scenario?: 'normal' | 'partial-error';
}): DownloadSource & { setOnline: (online: boolean) => void; replaceArticle: (article: ArticleDetail | null, id: string) => void } {
  const articles = new Map(articleFixtures.map(article => [article.id, { article, version: 1 }]));
  const versions = new Map(articleFixtures.map(article => [article.id, 1]));
  const failures = new Set<string>();
  const listeners = new Set<() => void>();
  let online = true;
  const notify = () => listeners.forEach(listener => listener());
  const denied = new Map<string, number>();
  const publishedVersions = new Map<string, { fingerprint: string | null; generation: number }>();
  // 비로그인 중에도 앱의 source 구독으로 삭제→동일 본문 복구의 세대를 보존한다.
  function syncPublished() {
    const current = new Map((published?.source.getPublishedSnapshot() ?? []).filter(validPublishedStory)
      .map(story => [publishedArticleId(story.id), publishedDownloadFingerprint(story)]));
    const ids = new Set([...publishedVersions.keys(), ...current.keys()]);
    for (const id of ids) {
      const fingerprint = current.get(id) ?? null; const previous = publishedVersions.get(id);
      if (!previous || previous.fingerprint !== fingerprint) publishedVersions.set(id, { fingerprint, generation: (previous?.generation ?? 0) + 1 });
    }
  }
  const getVersion = (id: string): string | null => {
    if (!writtenStoryId(id)) return articles.has(id) ? `fixture-${articles.get(id)!.version}` : null;
    syncPublished(); const version = publishedVersions.get(id);
    if (denied.get(id) === published?.source.getRevision()) return null;
    return version?.fingerprint ? `${version.fingerprint}#${version.generation}` : null;
  };
  syncPublished();
  return {
    getLists: () => lists?.getCatalog?.() ?? [],
    getVersion,
    isOnline: () => online,
    subscribe(listener) {
      listeners.add(listener); const close = lists?.subscribe?.(listener);
      const closePublished = published?.source.subscribe(() => { syncPublished(); listener(); });
      return () => { listeners.delete(listener); close?.(); closePublished?.(); };
    },
    async load(request, signal) {
      const permitted = () => lists?.getCatalog?.().some(list => list.userId === request.userId &&
        list.listId === request.listId && list.articleIds.includes(request.articleId));
      if (!permitted()) throw new Error('DOWNLOAD_FORBIDDEN');
      const expectedVersion = getVersion(request.articleId);
      if (delayMs) await new Promise(resolve => setTimeout(resolve, delayMs));
      if (signal.aborted) throw new Error('DOWNLOAD_CANCELLED');
      if (!online) throw new Error('DOWNLOAD_OFFLINE');
      if (!permitted()) throw new Error('DOWNLOAD_FORBIDDEN');
      const list = lists?.getCatalog?.().find(item => item.userId === request.userId && item.listId === request.listId);
      const key = JSON.stringify([request.userId, request.listId, request.articleId]);
      if (scenario === 'partial-error' && list?.articleIds[1] === request.articleId && !failures.has(key)) {
        failures.add(key); throw new Error('DOWNLOAD_FAILED');
      }
      const storyId = writtenStoryId(request.articleId);
      if (storyId) {
        if (!published || !expectedVersion) throw new Error('DOWNLOAD_ARTICLE_UNAVAILABLE');
        const revision = published.source.getRevision();
        const story = await published.source.story(storyId, signal);
        if (signal.aborted) throw new Error('DOWNLOAD_CANCELLED');
        if (!online || !permitted()) throw new Error('DOWNLOAD_FORBIDDEN');
        if (!story) {
          // 실제 읽기에서 철회된 접근은 같은 source revision의 다른 사본에도 적용한다.
          if (published.source.getRevision() === revision) {
            denied.set(request.articleId, revision);
            const previous = publishedVersions.get(request.articleId);
            if (previous) publishedVersions.set(request.articleId, { ...previous, generation: previous.generation + 1 });
            notify();
          }
          throw new Error('DOWNLOAD_ARTICLE_UNAVAILABLE');
        }
        if (!validPublishedStory(story) || story.id !== storyId || !matchesPublishedDownloadVersion(expectedVersion, story) || getVersion(request.articleId) !== expectedVersion)
          throw new Error('DOWNLOAD_VERSION_CHANGED');
        return { ...request, contentVersion: expectedVersion, article: null, published: copyPublishedDownload(story, published.images) };
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
