export type RecommendationValue = Readonly<{
  userId: string;
  version: number;
  hiddenArticleIds: readonly string[];
}>;
export type RecommendationCommand = Readonly<{ operationId: string; articleId: string; hidden: boolean }>;
export type RecommendationSource = {
  read: (userId: string) => Promise<RecommendationValue>;
  execute: (
    userId: string,
    command: RecommendationCommand,
    signal?: AbortSignal,
  ) => Promise<RecommendationValue>;
};
export type RecommendationSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  value: RecommendationValue | null;
  readError: boolean;
  pending: readonly string[];
}>;
export function validateRecommendation(value: RecommendationValue, userId: string): void {
  if (
    !value ||
    value.userId !== userId ||
    !Number.isSafeInteger(value.version) ||
    value.version < 0 ||
    !Array.isArray(value.hiddenArticleIds) ||
    value.hiddenArticleIds.some((id) => typeof id !== 'string' || !id.trim()) ||
    new Set(value.hiddenArticleIds).size !== value.hiddenArticleIds.length
  )
    throw new Error('Invalid recommendation input');
}
