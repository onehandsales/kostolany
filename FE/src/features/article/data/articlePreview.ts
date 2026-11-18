import { type ArticleScenario, createMockArticleSource } from './mockArticleSource';

// Change and reload to exercise preview states; no developer controls in the reading UI.
export const articlePreviewScenario: ArticleScenario = 'normal';
export const previewArticleSource = createMockArticleSource({ scenario: articlePreviewScenario });
