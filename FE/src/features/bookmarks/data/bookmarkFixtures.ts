import { feedFixtures } from '../../feed/data/fixtures';
import type { FeedArticle } from '../../feed/types';

// 현재 예시 기사만 제공하며 목록 순서는 저장 시각이 아닌 고정 콘텐츠 순서다.
export const bookmarkArticles: readonly FeedArticle[] = [...new Map(
  [...feedFixtures.latest, ...feedFixtures.popular, ...feedFixtures.recommended]
    .map((article) => [article.id, article]),
).values()];

export const MOCK_BOOKMARK_USER_ID = 'example-reader';
