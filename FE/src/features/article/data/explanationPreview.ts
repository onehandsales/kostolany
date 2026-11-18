import { type ExplanationScenario, createMockExplanationSource } from './mockExplanationSource';

// 개발용 예시 선택이며 새로고침하면 실패 이력이 초기화된다.
export const explanationPreviewScenario: ExplanationScenario = 'normal';
export const previewExplanationSource = createMockExplanationSource({ scenario: explanationPreviewScenario });
