import { createMockSearchSource, type SearchScenario } from './mockSearchSource';

// 로컬 미리보기 전용이며 상수 변경 후 전체 새로고침하면 실패 이력이 초기화된다.
export const searchPreviewScenario: SearchScenario = 'normal';
export const previewSearchSource = createMockSearchSource({ scenario: searchPreviewScenario });
