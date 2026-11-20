import { mediumArticles } from '../../feed/data/mediumFixtures';

// 보관 화면의 축약 수치는 비교용 기준값이며 실제 서비스의 정확 집계가 아니다.
export const articleClapCounts: Readonly<Record<string, number>> = {
  ...Object.fromEntries(mediumArticles.map(article => [article.id, article.reference?.applause ?? 0])),
  'example-latest-rates': 24, 'example-latest-exchange': 0, 'example-latest-housing': 8,
  'example-latest-prices': 16, 'example-popular-cash': 128, 'example-popular-market': 96,
  'example-popular-debt': 42, 'example-recommended-psychology': 32,
  'example-recommended-news': 12, 'example-recommended-time': 6,
};
