import { createMockDraftSource } from '../editor/draftSource';
import { emptyEditor } from '../editor/editorModel';
import { emptyPublishOptions } from '../editor/publishing';
import { createMockStoryStatsSource } from './createMockStoryStatsSource';
import { DAY_MS, formatStatsDate, monthBounds, parseStatsDate } from './statsDates';
import { validateLifetimeStats, validateMonthlyStats } from './statsValidation';

const signal = () => new AbortController().signal;
beforeEach(() => { jest.useFakeTimers(); jest.setSystemTime(new Date('2024-02-01T00:00:00Z')); });
afterEach(() => jest.useRealTimers());

async function publish(source: ReturnType<typeof createMockDraftSource>, userId: string, title: string, unlisted = false) {
  const draftId = source.newId(userId);
  const document = { ...emptyEditor().document, title, body: '통계 검증 본문' };
  const publishing = { ...emptyPublishOptions(), unlisted };
  await source.save({ userId, draftId, document, publishing, operationId: `save-${draftId}` }, signal());
  return source.publish({ userId, draftId, document, publishing, authorName: '작성자', operationId: `publish-${draftId}` }, signal());
}

it('UTC 월·연도·윤년 경계는 로컬 시간대와 분리하고 잘못된 날짜를 거절한다', () => {
  expect(monthBounds('2024-02')).toEqual({ start: Date.parse('2024-02-01T00:00:00Z'), end: Date.parse('2024-03-01T00:00:00Z') });
  expect((monthBounds('2023-02').end - monthBounds('2023-02').start) / DAY_MS).toBe(28);
  expect(monthBounds('2024-12').end).toBe(Date.parse('2025-01-01T00:00:00Z'));
  expect(formatStatsDate('2024-02-29')).toBe('Feb 29, 2024');
  expect(formatStatsDate('2024-03-01T00:30:00+09:00')).toBe('Feb 29, 2024');
  expect(formatStatsDate('2024-12-31T23:30:00-09:00')).toBe('Jan 1, 2025');
  expect(() => parseStatsDate('2023-02-29')).toThrow();
  expect(() => monthBounds('2024-13')).toThrow();
});

it('실제 발행 결과의 공개·Unlisted만 집계하고 초안·다른 계정·기간 밖 값을 제외한다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  const a = await publish(drafts, 'A', '공개');
  const b = await publish(drafts, 'A', '링크', true);
  const other = await publish(drafts, 'B', '다른 사용자');
  const draftId = drafts.newId('A');
  await drafts.save({ userId: 'A', draftId, document: emptyEditor().document, operationId: 'draft-only' }, signal());
  const source = createMockStoryStatsSource(drafts, {
    now: () => new Date('2024-03-01T00:30:00+09:00'),
    measurements: [
      { userId: 'A', storyId: a.id, date: '2024-02-01', views: 11, reads: 2 },
      { userId: 'A', storyId: b.id, date: '2024-02-29', views: 5, reads: 4 },
      { userId: 'A', storyId: a.id, date: '2024-03-01', views: 100, reads: 90 },
      { userId: 'B', storyId: other.id, date: '2024-02-29', views: 99, reads: 40 },
      { userId: 'A', storyId: draftId, date: '2024-02-29', views: 50, reads: 30 },
    ],
  });
  expect(source.getCurrentMonth()).toBe('2024-02');
  const month = validateMonthlyStats(await source.readMonthly('A', '2024-02', signal()), 'A', '2024-02');
  expect(month).toMatchObject({ views: 16, reads: 6, period: { endExclusive: '2024-03-01T00:00:00.000Z' } });
  expect(month.days).toHaveLength(29);
  expect(month.days[1]).toEqual({ date: '2024-02-02', views: 0, reads: 0 });
  const lifetime = validateLifetimeStats(await source.readLifetime('A', 'views', signal()), 'A', 'views');
  expect(lifetime.stories.map(row => row.storyId)).toEqual([a.id, b.id]);
  expect(lifetime.stories.map(row => row.views)).toEqual([11, 5]);
  expect((await source.readLifetime('A', 'reads', signal())).stories.map(row => row.storyId)).toEqual([b.id, a.id]);
  expect((await source.readMonthly('A', '2024-01', signal())).views).toBe(0);
  await expect(source.readMonthly('A', '2024-03', signal())).rejects.toThrow('future-stats-month');
});

it('현재 월은 오늘 UTC까지 포함하고 새 발행은 0으로 반영하며 동률은 ID로 안정 정렬한다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  const source = createMockStoryStatsSource(drafts, { now: () => new Date('2024-02-13T12:00:00Z') });
  expect((await source.readLifetime('A', 'latest', signal())).stories).toEqual([]);
  const notify = jest.fn(); const unsubscribe = source.subscribe(notify);
  const first = await publish(drafts, 'A', '첫 글'); const second = await publish(drafts, 'A', '둘째');
  expect(notify).toHaveBeenCalled();
  const rows = (await source.readLifetime('A', 'latest', signal())).stories;
  expect(rows.map(row => row.storyId)).toEqual([first.id, second.id]);
  expect(rows.every(row => row.views === 0 && row.reads === 0)).toBe(true);
  const month = await source.readMonthly('A', '2024-02', signal());
  expect(month.days).toHaveLength(13); expect(month.period.endExclusive).toBe('2024-02-14T00:00:00.000Z');
  unsubscribe();
});

it('부분 실패는 다른 집계를 바꾸지 않고 재시도로 복구하며 취소·소유자 오염을 거절한다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  const story = await publish(drafts, 'B', 'B 글');
  const source = createMockStoryStatsSource(drafts, { monthlyFailures: 1 });
  await expect(source.readMonthly('A', '2024-02', signal())).rejects.toThrow('monthly-stats-failed');
  expect((await source.readLifetime('A', 'latest', signal())).stories).toEqual([]);
  expect((await source.readMonthly('A', '2024-02', signal())).views).toBe(0);
  const abort = new AbortController(); abort.abort();
  await expect(source.readMonthly('A', '2024-02', abort.signal)).rejects.toThrow();
  const foreign = createMockStoryStatsSource({ ...drafts, stories: async () => [story] });
  await expect(foreign.readLifetime('A', 'latest', signal())).rejects.toThrow('invalid-stats-owner');
});

it('누락 날짜·잘못된 합계·소유자·정렬·음수·중복 수치는 정상 0으로 숨기지 않는다', async () => {
  const source = createMockStoryStatsSource(createMockDraftSource({ delayMs: 0 }));
  const month = await source.readMonthly('A', '2024-02', signal());
  expect(() => validateMonthlyStats({ ...month, days: [] }, 'A', '2024-02')).toThrow();
  const unreported = { ...month, days: [{ date: '2024-02-01', views: null, reads: null }] };
  expect(validateMonthlyStats(unreported, 'A', '2024-02').days[0]?.views).toBeNull();
  expect(() => validateMonthlyStats({ ...month, days: [{ date: '2024-02-01', views: null, reads: 0 }] }, 'A', '2024-02')).toThrow();
  expect(() => validateMonthlyStats({ ...month, views: 1 }, 'A', '2024-02')).toThrow();
  expect(() => validateMonthlyStats(month, 'B', '2024-02')).toThrow();
  expect(() => createMockStoryStatsSource(createMockDraftSource(), { measurements: [{ userId: 'A', storyId: 'x', date: '2024-02-01', views: -1, reads: 0 }] })).toThrow();
  const lifetime = await source.readLifetime('A', 'latest', signal());
  expect(() => validateLifetimeStats(lifetime, 'A', 'views')).toThrow();
  expect(() => validateLifetimeStats({ ...lifetime, firstPublishedAt: '2024-02-01T00:00:00Z' }, 'A', 'latest')).toThrow();
});

it('같은 UTC 날짜의 미래 발행은 월간·누적에서 함께 제외하고 안전 정수 합계 초과를 거절한다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  jest.setSystemTime(new Date('2024-02-01T20:00:00Z'));
  const story = await publish(drafts, 'A', '미래 시각의 글');
  const measurements = [{ userId: 'A', storyId: story.id, date: '2024-02-01', views: Number.MAX_SAFE_INTEGER, reads: 0 },
    { userId: 'A', storyId: story.id, date: '2024-02-02', views: 1, reads: 0 }];
  const before = createMockStoryStatsSource(drafts, { now: () => new Date('2024-02-01T10:00:00Z'), measurements });
  expect((await before.readMonthly('A', '2024-02', signal())).views).toBe(0);
  expect((await before.readLifetime('A', 'latest', signal())).stories).toEqual([]);
  const overflow = createMockStoryStatsSource(drafts, { now: () => new Date('2024-02-02T22:00:00Z'), measurements });
  await expect(overflow.readMonthly('A', '2024-02', signal())).rejects.toThrow('stats-count-overflow');
  await expect(overflow.readLifetime('A', 'latest', signal())).rejects.toThrow('stats-count-overflow');
});
