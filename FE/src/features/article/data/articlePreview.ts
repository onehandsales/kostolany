import { type ArticleScenario, createMockArticleSource } from './mockArticleSource';

// 시나리오를 바꾸고 새로고침해 상태를 재현하며 읽기 화면에 개발 도구를 노출하지 않는다.
export const articlePreviewScenario: ArticleScenario = 'normal';
export const previewArticleSource = createMockArticleSource({ scenario: articlePreviewScenario });
