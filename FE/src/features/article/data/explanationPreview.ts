import { type ExplanationScenario, createMockExplanationSource } from './mockExplanationSource';

// Development-only fixture selection; reload to reset the failure history.
export const explanationPreviewScenario: ExplanationScenario = 'normal';
export const previewExplanationSource = createMockExplanationSource({ scenario: explanationPreviewScenario });
