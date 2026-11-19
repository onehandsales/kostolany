import { createMockFeedSource, type FeedScenario } from './mockFeedSource';
import { mediumFeedFixtures } from './mediumFixtures';

// 시나리오를 바꿔 새로고침으로 상태를 재현하며 제품 화면에 개발 도구를 노출하지 않는다.
export const feedPreviewScenario: FeedScenario = 'normal';
export const previewFeedSource = createMockFeedSource({
  scenario: feedPreviewScenario,
  catalog: mediumFeedFixtures,
  pageSize: 3,
});
