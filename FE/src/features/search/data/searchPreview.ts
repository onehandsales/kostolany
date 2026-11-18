import { createMockSearchSource, type SearchScenario } from './mockSearchSource';

// Local preview only. Change this constant and fully reload to reset failure history.
export const searchPreviewScenario: SearchScenario = 'normal';
export const previewSearchSource = createMockSearchSource({ scenario: searchPreviewScenario });
