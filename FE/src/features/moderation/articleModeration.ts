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
  const blocked = (id: string) => {
    const ownerId = catalog?.getSnapshot().find(article => article.id === id)?.publishedStory?.ownerId;
    return ownerId ? Boolean(context.state?.value?.blocked.includes(ownerId)) : isArticleBlocked(context.state?.value, id);
  };
  return {
    ...context,
    blocked,
    excluded: (id: string) =>
      blocked(id) || isArticleMuted(context.state?.value, id),
  };
}
