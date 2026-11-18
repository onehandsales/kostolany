// 설명 난이도만 나타내며 실제 나이나 학교 정보를 수집하지 않는다.
export const explanationLevels = ['elementary', 'middle', 'high', 'adult'] as const;
export type ExplanationLevel = typeof explanationLevels[number];
export const explanationLevelLabels: Record<ExplanationLevel, string> = {
  elementary: '초등학생', middle: '중학생', high: '고등학생', adult: '성인',
};
// 비로그인과 최초 설정의 기본안이며 사용자별 확정 설정은 별도 저장소가 소유한다.
export const defaultExplanationLevel: ExplanationLevel = 'adult';

export function isExplanationLevel(value: unknown): value is ExplanationLevel {
  return explanationLevels.some((level) => level === value);
}

export type ExplanationPreference = Readonly<{ scopeKey: string } & (
  { status: 'ready'; level: ExplanationLevel } | { status: 'loading' | 'error'; onRetry: () => Promise<void> }
)>;

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
