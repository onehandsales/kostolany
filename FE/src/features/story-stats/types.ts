export type StatsSort = 'latest' | 'views' | 'reads';
export type StatsCounts = { views: number; reads: number };
export type StatsDay = { date: string; views: number | null; reads: number | null };
export type StatsPeriod = { start: string; endExclusive: string; asOf: string };
export type MonthlyStats = StatsCounts & {
  userId: string;
  month: string;
  period: StatsPeriod;
  days: readonly StatsDay[];
};
export type StoryStatsRow = StatsCounts & {
  storyId: string;
  title: string;
  publishedAt: string;
  unlisted: boolean;
};
export type LifetimeStats = {
  userId: string;
  sort: StatsSort;
  asOf: string;
  firstPublishedAt: string | null;
  stories: readonly StoryStatsRow[];
};
export type StoryStatsSource = {
  getCurrentMonth: () => string;
  readMonthly: (userId: string, month: string, signal: AbortSignal) => Promise<MonthlyStats>;
  readLifetime: (userId: string, sort: StatsSort, signal: AbortSignal) => Promise<LifetimeStats>;
  subscribe: (listener: () => void) => () => void;
  getRevision: () => number;
};
