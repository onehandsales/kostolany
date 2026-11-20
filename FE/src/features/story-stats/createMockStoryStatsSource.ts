import type { DraftSource } from '../editor/draftSource';
import { validPublishedStory, type PublishedStory } from '../editor/publishing';
import { DAY_MS, monthBounds, parseStatsDate } from './statsDates';
import { compareStatsRows, validCounts } from './statsValidation';
import type { StatsCounts, StoryStatsSource } from './types';

export type StatsMeasurement = StatsCounts & { date: string; userId: string; storyId: string };
type MockStoryStatsOptions = {
  now?: () => Date;
  measurements?: readonly StatsMeasurement[];
  monthlyFailures?: number;
  lifetimeFailures?: number;
};

export function createMockStoryStatsSource(stories: DraftSource, options: MockStoryStatsOptions = {}): StoryStatsSource {
  const now = options.now ?? (() => new Date());
  const measurements = (options.measurements ?? []).map(value => ({ ...value }));
  const keys = new Set<string>();
  for (const value of measurements) {
    parseStatsDate(value.date);
    const key = JSON.stringify([value.userId, value.storyId, value.date]);
    if (!value.userId || !value.storyId || !validCounts(value) || keys.has(key)) throw new Error('invalid-stats-fixture');
    keys.add(key);
  }
  let monthlyFailures = options.monthlyFailures ?? 0;
  let lifetimeFailures = options.lifetimeFailures ?? 0;

  async function readOwnedStories(userId: string, signal: AbortSignal): Promise<PublishedStory[]> {
    if (!userId || signal.aborted) throw new Error('stats-cancelled');
    const [publicStories, unlistedStories] = await Promise.all([
      stories.stories(userId, signal, 'public', userId),
      stories.stories(userId, signal, 'unlisted', userId),
    ]);
    const rows = [...publicStories, ...unlistedStories];
    if (signal.aborted) throw new Error('stats-cancelled');
    if (rows.some(story => !validPublishedStory(story) || story.userId !== userId) ||
      publicStories.some(story => story.publishing.unlisted) ||
      unlistedStories.some(story => !story.publishing.unlisted) ||
      new Set(rows.map(story => story.id)).size !== rows.length) throw new Error('invalid-stats-owner');
    return rows;
  }

  function eligibleMeasurements(userId: string, owned: PublishedStory[], asOf: string) {
    const published = new Map(owned.filter(story => Date.parse(story.publishedAt) <= Date.parse(asOf))
      .map(story => [story.id, story.publishedAt]));
    return measurements.filter(value => {
      const publishedAt = published.get(value.storyId);
      return value.userId === userId && publishedAt !== undefined &&
        value.date >= new Date(publishedAt).toISOString().slice(0, 10) && value.date <= asOf.slice(0, 10);
    });
  }

  return {
    getCurrentMonth: () => now().toISOString().slice(0, 7),
    subscribe: stories.subscribe,
    getRevision: stories.getRevision,
    async readMonthly(userId, month, signal) {
      const bounds = monthBounds(month);
      const owned = await readOwnedStories(userId, signal);
      if (monthlyFailures-- > 0) throw new Error('monthly-stats-failed');
      const asOf = now().toISOString();
      const end = Math.min(bounds.end, Math.floor(Date.parse(asOf) / DAY_MS) * DAY_MS + DAY_MS);
      if (end <= bounds.start) throw new Error('future-stats-month');
      const days = Array.from({ length: (end - bounds.start) / DAY_MS }, (_, index) => ({
        date: new Date(bounds.start + index * DAY_MS).toISOString().slice(0, 10), views: 0, reads: 0,
      }));
      const byDate = new Map(days.map(day => [day.date, day]));
      for (const value of eligibleMeasurements(userId, owned, asOf)) {
        const day = byDate.get(value.date);
        if (day) { day.views += value.views; day.reads += value.reads; }
      }
      // 기록이 없는 발행 글은 모의 집계 0이며 실제 읽기 행동을 수집하거나 증가시키지 않는다.
      const counts = { views: days.reduce((sum, day) => sum + day.views, 0), reads: days.reduce((sum, day) => sum + day.reads, 0) };
      if (!validCounts(counts)) throw new Error('stats-count-overflow');
      return { userId, month, period: { start: new Date(bounds.start).toISOString(), endExclusive: new Date(end).toISOString(), asOf }, days, ...counts };
    },
    async readLifetime(userId, sort, signal) {
      if (!['latest', 'views', 'reads'].includes(sort)) throw new Error('invalid-stats-sort');
      const owned = await readOwnedStories(userId, signal);
      if (lifetimeFailures-- > 0) throw new Error('lifetime-stats-failed');
      const asOf = now().toISOString();
      const values = eligibleMeasurements(userId, owned, asOf);
      const rows = owned.filter(story => Date.parse(story.publishedAt) <= Date.parse(asOf)).map(story => {
        const counts = values.filter(value => value.storyId === story.id);
        return { storyId: story.id, title: story.document.title, publishedAt: story.publishedAt, unlisted: story.publishing.unlisted,
          views: counts.reduce((sum, value) => sum + value.views, 0), reads: counts.reduce((sum, value) => sum + value.reads, 0) };
      }).sort((a, b) => compareStatsRows(a, b, sort));
      if (rows.some(row => !validCounts(row))) throw new Error('stats-count-overflow');
      return { userId, sort, asOf, stories: rows, firstPublishedAt: rows.reduce<string | null>((first, row) =>
        first === null || Date.parse(row.publishedAt) < Date.parse(first) ? row.publishedAt : first, null) };
    },
  };
}
