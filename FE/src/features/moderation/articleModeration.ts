import { articlePublication, articleWriter } from '../community/data/publicDirectory';
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
  return {
    ...context,
    blocked: (id: string) => isArticleBlocked(context.state?.value, id),
    excluded: (id: string) =>
      isArticleBlocked(context.state?.value, id) || isArticleMuted(context.state?.value, id),
  };
}
