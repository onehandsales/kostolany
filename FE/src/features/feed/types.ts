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

// Local UI contract only; this does not define a future server API.
export type FeedPage = { items: FeedArticle[]; nextCursor: string | null };
export type FeedRequest = { sort: FeedSort; cursor: string | null };
export type FeedSource = (request: FeedRequest) => Promise<FeedPage>;

export const feedSortLabels: Record<FeedSort, string> = {
  latest: '최신',
  popular: '인기',
  recommended: '추천',
};
