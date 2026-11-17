import { createMockFeedSource, type FeedScenario } from './mockFeedSource';

// Change this value and reload the app to reproduce a documented preview state.
// Keep these developer controls out of the product UI.
export const feedPreviewScenario: FeedScenario = 'normal';
export const previewFeedSource = createMockFeedSource({ scenario: feedPreviewScenario });
