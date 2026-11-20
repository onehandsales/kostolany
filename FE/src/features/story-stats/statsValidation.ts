import { DAY_MS, monthBounds, parseStatsDate } from './statsDates';
import type { LifetimeStats, MonthlyStats, StatsCounts, StatsSort, StoryStatsRow } from './types';

export function validCounts(value: StatsCounts): boolean {
  return Number.isSafeInteger(value.views) && value.views >= 0 &&
    Number.isSafeInteger(value.reads) && value.reads >= 0;
}

export function compareStatsRows(a: StoryStatsRow, b: StoryStatsRow, sort: StatsSort): number {
  const metric = sort === 'latest' ? 0 : b[sort] - a[sort];
  return metric || Date.parse(b.publishedAt) - Date.parse(a.publishedAt) ||
    (a.storyId < b.storyId ? -1 : a.storyId > b.storyId ? 1 : 0);
}

export function validateMonthlyStats(value: MonthlyStats, userId: string, month: string): MonthlyStats {
  const bounds = monthBounds(month);
  const asOf = Date.parse(value.period.asOf);
  const lastDay = Math.floor(asOf / DAY_MS) * DAY_MS + DAY_MS;
  const end = Math.min(bounds.end, lastDay);
  if (value.userId !== userId || value.month !== month || !Number.isFinite(asOf) ||
    value.period.start !== new Date(bounds.start).toISOString() ||
    value.period.endExclusive !== new Date(end).toISOString() || !validCounts(value) ||
    !Array.isArray(value.days) || value.days.length !== (end - bounds.start) / DAY_MS || !value.days.length) {
    throw new Error('invalid-monthly-stats');
  }
  let views = 0; let reads = 0;
  value.days.forEach((day, index) => {
    const missing = day.views === null && day.reads === null;
    if (parseStatsDate(day.date) !== bounds.start + index * DAY_MS ||
      !missing && (day.views === null || day.reads === null || !validCounts({ views: day.views, reads: day.reads }))) {
      throw new Error('invalid-stats-day');
    }
    views += day.views ?? 0; reads += day.reads ?? 0;
  });
  if (views !== value.views || reads !== value.reads) throw new Error('invalid-stats-total');
  return value;
}

export function validateLifetimeStats(value: LifetimeStats, userId: string, sort: StatsSort): LifetimeStats {
  const asOf = Date.parse(value.asOf);
  if (value.userId !== userId || value.sort !== sort || !Number.isFinite(asOf) || !Array.isArray(value.stories) ||
    new Set(value.stories.map(row => row.storyId)).size !== value.stories.length) {
    throw new Error('invalid-lifetime-stats');
  }
  value.stories.forEach((row, index) => {
    const previous = value.stories[index - 1];
    if (!row.storyId || !row.title.trim() || typeof row.unlisted !== 'boolean' || !validCounts(row) ||
      !Number.isFinite(Date.parse(row.publishedAt)) || Date.parse(row.publishedAt) > asOf ||
      previous && compareStatsRows(previous, row, sort) > 0) throw new Error('invalid-story-stats');
  });
  const first = value.stories.reduce<string | null>((date, row) =>
    date === null || Date.parse(row.publishedAt) < Date.parse(date) ? row.publishedAt : date, null);
  if (first !== value.firstPublishedAt) throw new Error('invalid-lifetime-period');
  return value;
}
