import { articlePublication, articleWriter } from '../community/data/publicDirectory';
import { useArticleCatalog } from '../feed/ArticleCatalog';
import { useModeration } from './ModerationContext';
import { moderationKey, type ModerationValue, type ReportTarget } from './types';

export function articleReportTarget(articleId: string): ReportTarget {
  return {
    kind: 'article',
    id: articleId,
    writerId:
      articleWriter(articleId)?.id ?? (articleId === 'example-latest-rates' ? 'example-reader' : null),
  };
}
export function isArticleBlocked(value: ModerationValue | null | undefined, articleId: string): boolean {
  const writer = articleWriter(articleId);
  return Boolean(writer && value?.blocked.includes(writer.id));
}
export function isArticleMuted(value: ModerationValue | null | undefined, articleId: string): boolean {
  const writer = articleWriter(articleId);
  const publication = articlePublication(articleId);
  return Boolean(
    value?.muted.some(
      (item) =>
        (writer && moderationKey(item) === moderationKey(writer)) ||
        (publication && moderationKey(item) === moderationKey(publication)),
    ),
  );
}
export function useArticleModeration() {
  const context = useModeration();
  const catalog = useArticleCatalog();
  // 비동기 작업 완료 직후에도 다음 렌더를 기다리지 않고 확정된 접근 정책을 읽는다.
  const readValue = () => context.store ? context.store.getSnapshot().value : context.state?.value;
  const publishedOwner = (id: string) =>
    catalog?.getSnapshot().find(article => article.id === id)?.publishedStory?.ownerId;
  const blocked = (id: string) => {
    const ownerId = publishedOwner(id);
    const value = readValue();
    return ownerId ? Boolean(value?.blocked.includes(ownerId)) : isArticleBlocked(value, id);
  };
  return {
    ...context,
    blocked,
    excluded: (id: string) => {
      const ownerId = publishedOwner(id);
      const value = readValue();
      return blocked(id) || (ownerId
        ? Boolean(value?.muted.some(item => item.kind === 'writer' && item.id === ownerId))
        : isArticleMuted(value, id));
    },
  };
}
