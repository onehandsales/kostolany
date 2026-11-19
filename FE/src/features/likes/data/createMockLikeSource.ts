import { mediumArticles } from '../../feed/data/mediumFixtures';
import type { ArticleLike, LikeIdentity, LikeSource } from '../types';

export const MOCK_READER_ID = 'example-reader';
export type LikeScenario = 'normal' | 'write-error' | 'unlike-error' | 'read-error' | 'slow';

// 수치는 다른 모의 독자의 반응을 나타내는 화면용 기본안이다.
export const initialLikeCounts: Readonly<Record<string, number>> = {
  ...Object.fromEntries(mediumArticles.map((article) => [article.id, article.reference?.applause ?? 0])),
  'example-latest-rates': 24,
  'example-latest-exchange': 0,
  'example-latest-housing': 8,
  'example-latest-prices': 16,
  'example-popular-cash': 128,
  'example-popular-market': 96,
  'example-popular-debt': 42,
  'example-recommended-psychology': 32,
  'example-recommended-news': 12,
  'example-recommended-time': 6,
};

export function createMockLikeSource({
  scenario = 'normal',
  delayMs = scenario === 'slow' ? 1800 : 350,
}: {
  scenario?: LikeScenario;
  delayMs?: number;
} = {}): LikeSource {
  const likesByUser = new Map<string, Map<string, ArticleLike>>();
  const failedRequests = new Set<string>();

  function getArticleLike(identity: LikeIdentity): ArticleLike {
    const count = initialLikeCounts[identity.articleId];
    if (count === undefined || !identity.userId.trim()) throw new Error('Unknown mock like identity');
    return (
      likesByUser.get(identity.userId)?.get(identity.articleId) ?? { ...identity, isLiked: false, count }
    );
  }

  async function waitForResponse(): Promise<void> {
    if (delayMs > 0) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
  }

  function failOnce(key: string): void {
    if (!failedRequests.has(key)) {
      failedRequests.add(key);
      throw new Error('Mock like request failed before applying');
    }
  }

  return {
    async fetchArticleLike(identity) {
      const snapshot = getArticleLike(identity);
      await waitForResponse();
      if (scenario === 'read-error') failOnce(JSON.stringify(['read', identity.userId, identity.articleId]));
      return snapshot;
    },
    async setArticleLiked(input) {
      getArticleLike(input);
      await waitForResponse();
      if (scenario === 'write-error' || (scenario === 'unlike-error' && !input.liked)) {
        failOnce(JSON.stringify(['write', input.userId, input.articleId]));
      }
      const previous = getArticleLike(input);
      const next = {
        ...previous,
        isLiked: input.liked,
        count: previous.count + Number(input.liked) - Number(previous.isLiked),
      };
      const likes = likesByUser.get(input.userId) ?? new Map<string, ArticleLike>();
      likes.set(input.articleId, next);
      likesByUser.set(input.userId, likes);
      return next;
    },
  };
}
