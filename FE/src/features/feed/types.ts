export type FeedSort = 'latest' | 'popular' | 'recommended';

export type FeedArticle = {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  publishedLabel: string;
  readingMinutes: number;
  thumbnail: 'city' | 'coins' | null;
};

// 로컬 UI 계약이며 향후 서버 API를 확정하지 않는다.
export type FeedPage = { items: FeedArticle[]; nextCursor: string | null };
export type FeedRequest = { sort: FeedSort; cursor: string | null };
export type FeedSource = (request: FeedRequest) => Promise<FeedPage>;

export const feedSortLabels: Record<FeedSort, string> = {
  latest: '최신',
  popular: '인기',
  recommended: '추천',
};
