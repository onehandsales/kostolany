import type { ArticleSource } from '../types';
import { articleFixtures } from './fixtures';

export type ArticleScenario = 'normal' | 'initial-error' | 'slow';

export function createMockArticleSource({
  scenario = 'normal', delayMs = scenario === 'slow' ? 10_000 : 250,
}: { scenario?: ArticleScenario; delayMs?: number } = {}): ArticleSource {
  const failures = new Set<string>();
  return async (articleId) => {
    if (delayMs > 0) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
    if (scenario === 'initial-error' && !failures.has(articleId)) {
      failures.add(articleId);
      throw new Error('Example article request failed');
    }
    const article = articleFixtures.find((item) => item.id === articleId);
    if (!article) throw new Error('Unknown example article: ' + articleId);
    return article;
  };
}
