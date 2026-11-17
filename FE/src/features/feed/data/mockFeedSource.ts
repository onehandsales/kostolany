import type { FeedSource } from '../types';
import { feedFixtures } from './fixtures';

export type FeedScenario = 'normal' | 'empty' | 'initial-error' | 'page-error' | 'slow';

export function createMockFeedSource({
  scenario = 'normal',
  delayMs = scenario === 'slow' ? 10_000 : 250,
}: { scenario?: FeedScenario; delayMs?: number } = {}): FeedSource {
  const failedRequests = new Set<string>();

  return async ({ sort, cursor }) => {
    if (delayMs > 0) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));

    const requestKey = `${sort}:${cursor ?? 'first'}`;
    const shouldFail = (scenario === 'initial-error' && cursor === null)
      || (scenario === 'page-error' && cursor !== null);

    if (shouldFail && !failedRequests.has(requestKey)) {
      failedRequests.add(requestKey);
      throw new Error('Example feed request failed');
    }
    if (scenario === 'empty') return { items: [], nextCursor: null };

    const offset = cursor === null ? 0 : Number(cursor);
    const items = feedFixtures[sort];
    if (!Number.isInteger(offset) || offset < 0 || offset > items.length) {
      throw new Error('Invalid example cursor');
    }
    const end = offset + 2;
    return {
      items: items.slice(offset, end),
      nextCursor: end < items.length ? String(end) : null,
    };
  };
}
