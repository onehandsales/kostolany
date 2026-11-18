// Reading difficulty only: no age, user profile or server preference is collected.
export const explanationLevels = ['elementary', 'middle', 'high', 'adult'] as const;
export type ExplanationLevel = typeof explanationLevels[number];
export const explanationLevelLabels: Record<ExplanationLevel, string> = {
  elementary: '초등학생', middle: '중학생', high: '고등학생', adult: '성인',
};
// UI default for each detail visit, not a persisted product/account policy.
export const defaultExplanationLevel: ExplanationLevel = 'adult';

export type ExplanationRequest = { articleId: string; level: ExplanationLevel };
export type ArticleExplanation = ExplanationRequest & {
  paragraphs: readonly string[];
  example: string;
};
export type ExplanationSource = (request: ExplanationRequest) => Promise<ArticleExplanation>;
export type ExplanationState =
  | { status: 'loading' }
  | { status: 'ready'; explanation: ArticleExplanation }
  | { status: 'error' };
