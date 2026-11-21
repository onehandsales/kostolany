import { deferred } from '../feed/tests/helpers';

import { createReadingHistoryStore } from './createReadingHistoryStore';
import { createMockReadingHistorySource } from './data/createMockReadingHistorySource';
import type { HistoryValue, ReadingHistorySource } from './types';

const date = '2026-11-19T01:00:00.000Z';
const flush = async () => {
  for (let i = 0; i < 8; i++) await Promise.resolve();
};
it('A 재로그인 조회 뒤 이전 조회 실패는 읽음 의도·확정 이력·오류를 되돌리지 않는다', async () => {
  const old = deferred<HistoryValue>();
  const read = jest.fn<Promise<HistoryValue>, [string]>().mockReturnValueOnce(old.promise)
    .mockResolvedValue({ userId: 'A', visits: [] });
  const store = createReadingHistoryStore({ read, save: async input => input }, 'A');
  store.activate('A:1'); store.record('one', date, 'A:1'); store.deactivate('A:1');
  store.activate('A:3'); await flush();
  old.reject(new Error('old-read')); await flush();
  expect(store.getSnapshot()).toMatchObject({ status: 'ready', error: null, visits: [{ articleId: 'one', visitedAt: date }] });
  expect(read).toHaveBeenCalledTimes(2);
});
it('최초 조회 중 읽은 기사를 늦은 조회와 병합하고 다른 계정에는 노출하지 않는다', async () => {
  const read = deferred<HistoryValue>();
  const source: ReadingHistorySource = {
    read: () => read.promise,
    save: async (input) => input,
  };
  const store = createReadingHistoryStore(source, 'A');
  store.record('new', date);
  read.resolve({ userId: 'A', visits: [{ articleId: 'old', visitedAt: '2026-11-18T01:00:00.000Z' }] });
  await flush();
  expect(store.getSnapshot().visits.map((visit) => visit.articleId)).toEqual(['new', 'old']);
  expect(store.getSnapshot()).toMatchObject({ status: 'ready', isSaving: false });
  const b = createReadingHistoryStore(createMockReadingHistorySource({ delayMs: 0 }), 'B');
  b.ensure();
  await flush();
  expect(b.getSnapshot().visits).toEqual([]);
});

it('이전 저장 실패는 뒤에 읽은 기사를 지우지 않고 최신 전체 목록을 직렬 저장한다', async () => {
  const first = deferred<HistoryValue>();
  const save = jest
    .fn<ReturnType<ReadingHistorySource['save']>, Parameters<ReadingHistorySource['save']>>()
    .mockReturnValueOnce(first.promise)
    .mockImplementation(async (input) => input);
  const store = createReadingHistoryStore({ read: async (userId) => ({ userId, visits: [] }), save }, 'A');
  store.ensure();
  await flush();
  store.record('one', date);
  store.record('two', date);
  first.reject(new Error('old'));
  await flush();
  expect(store.getSnapshot()).toMatchObject({ error: null, isSaving: false });
  expect(store.getSnapshot().visits.map((visit) => visit.articleId)).toEqual(['two', 'one']);
  expect(save).toHaveBeenCalledTimes(2);
});

it.each(['read-error', 'write-error'] as const)(
  '%s에서 읽음 의도를 유지하고 재시도로 복구한다',
  async (scenario) => {
    const store = createReadingHistoryStore(createMockReadingHistorySource({ delayMs: 0, scenario }), 'A');
    store.record('one', date);
    await flush();
    expect(store.getSnapshot().error).not.toBeNull();
    expect(store.getSnapshot().visits).toEqual([{ articleId: 'one', visitedAt: date }]);
    store.retry();
    await flush();
    expect(store.getSnapshot()).toMatchObject({ status: 'ready', error: null, isSaving: false });
  },
);
