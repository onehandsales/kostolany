import { feedFixtures } from '../../feed/data/fixtures';
import type { SearchSource } from '../types';

export const searchTopics = ['금리', '환율', '물가', '주택', '현금', '심리', '뉴스'];
export const exploreArticles = feedFixtures.popular;
const catalog = [...feedFixtures.latest, ...feedFixtures.popular, ...feedFixtures.recommended];

export function normalizeQuery(query: string): string {
  return query.normalize('NFC').trim().replace(/\s+/gu, ' ').toLowerCase();
}

export type SearchScenario = 'normal' | 'initial-error' | 'slow' | 'out-of-order';

export function createMockSearchSource({ scenario = 'normal', delayMs }: {
  scenario?: SearchScenario; delayMs?: number;
} = {}): SearchSource {
  const failedQueries = new Set<string>();
  return async (input) => {
    const query = normalizeQuery(input);
    if (!query) return { query, items: [] };
    const delay = delayMs ?? (scenario === 'slow' ? 10_000
      : scenario === 'out-of-order' && query === '금리' ? 1_200 : 200);
    if (delay > 0) await new Promise<void>((resolve) => setTimeout(resolve, delay));
    if (scenario === 'initial-error' && !failedQueries.has(query)) {
      failedQueries.add(query);
      throw new Error('Example search failed');
    }
    const terms = query.split(' ');
    // Literal AND substring matching; preserve fixture order, no inferred ranking.
    const items = catalog.filter((article) => {
      const text = normalizeQuery(`${article.title} ${article.summary} ${article.sourceName}`);
      return terms.every((term) => text.includes(term));
    });
    return { query, items };
  };
}
