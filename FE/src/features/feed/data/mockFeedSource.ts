import type { FeedArticle, FeedSort, FeedSource } from '../types';
import { feedFixtures } from './fixtures';

export type FeedScenario = 'normal' | 'empty' | 'initial-error' | 'page-error' | 'slow';

export function createMockFeedSource({
  scenario = 'normal',
  delayMs = scenario === 'slow' ? 10_000 : 250,
  catalog = feedFixtures,
  pageSize = 2,
}: {
  scenario?: FeedScenario;
  delayMs?: number;
  catalog?: Record<FeedSort, FeedArticle[]>;
  pageSize?: number;
} = {}): FeedSource {
  if (!Number.isInteger(pageSize) || pageSize < 1) throw new Error('Invalid mock page size');
  const failedRequests = new Set<string>();

  return async ({ sort, cursor }) => {
    if (delayMs > 0) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));

    const requestKey = `${sort}:${cursor ?? 'first'}`;
    const shouldFail =
      (scenario === 'initial-error' && cursor === null) || (scenario === 'page-error' && cursor !== null);

    if (shouldFail && !failedRequests.has(requestKey)) {
      failedRequests.add(requestKey);
      throw new Error('Example feed request failed');
    }
    if (scenario === 'empty') return { items: [], nextCursor: null };

    const offset = cursor === null ? 0 : Number(cursor);
    const items = catalog[sort];
    if (!Number.isInteger(offset) || offset < 0 || offset > items.length) {
      throw new Error('Invalid example cursor');
    }
    const end = offset + pageSize;
    return {
      items: items.slice(offset, end),
      nextCursor: end < items.length ? String(end) : null,
    };
  };
}
