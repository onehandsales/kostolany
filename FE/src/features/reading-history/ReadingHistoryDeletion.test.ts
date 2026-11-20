import { deferred } from '../feed/tests/helpers';

import { createReadingHistoryStore } from './createReadingHistoryStore';
import { createMockReadingHistorySource } from './data/createMockReadingHistorySource';
import type { HistoryValue, ReadingHistorySource } from './types';

const visit = (articleId: string) => ({ articleId, visitedAt: '2026-11-20T01:00:00.000Z' });
const flush = async () => {
  for (let i = 0; i < 12; i++) await Promise.resolve();
};
it('느린 최초 조회보다 개별 삭제와 전체 삭제 뒤 새 방문의 순서가 우선한다', async () => {
  const read = deferred<HistoryValue>();
  const source: ReadingHistorySource = { read: () => read.promise, save: async (input) => input };
  const single = createReadingHistoryStore(source, 'A');
  single.ensure();
  single.remove('old');
  const all = createReadingHistoryStore(source, 'A');
  all.ensure();
  all.record('before');
  all.clear();
  all.record('after', visit('after').visitedAt);
  read.resolve({ userId: 'A', visits: [visit('old'), visit('other')] });
  await flush();
  expect(single.getSnapshot().visits).toEqual([visit('other')]);
  expect(all.getSnapshot().visits).toEqual([visit('after')]);
});
it('늦은 저장 성공은 삭제를 부활시키지 않고 실패 재시도는 같은 명령 ID를 사용한다', async () => {
  const oldSave = deferred<HistoryValue>();
  const save = jest
    .fn<ReturnType<ReadingHistorySource['save']>, Parameters<ReadingHistorySource['save']>>()
    .mockReturnValueOnce(oldSave.promise)
    .mockRejectedValueOnce(new Error('delete failed'))
    .mockImplementation(async (input) => input);
  const store = createReadingHistoryStore({ read: async (userId) => ({ userId, visits: [] }), save }, 'A');
  store.ensure();
  await flush();
  store.activate('session2');
  store.record('one', visit('one').visitedAt, 'session1');
  store.clear('session2');
  oldSave.resolve({ userId: 'A', visits: [visit('one')] });
  await flush();
  expect(store.getSnapshot()).toMatchObject({ visits: [], error: 'write', errorScope: 'session2' });
  store.retry('session2');
  await flush();
  expect(store.getSnapshot()).toMatchObject({ visits: [], error: null });
  expect(save.mock.calls[1]?.[0].commandId).toBe(save.mock.calls[2]?.[0].commandId);
});
it('이력 명령 중복은 새 방문을 지우지 않으며 다른 계정 이력과 독립이다', async () => {
  const source = createMockReadingHistorySource({ delayMs: 0 });
  const old = { userId: 'A', commandId: 1, visits: [] };
  await source.save(old);
  await source.save({ userId: 'A', commandId: 2, visits: [visit('new')] });
  await source.save(old);
  expect((await source.read('A')).visits).toEqual([visit('new')]);
  expect((await source.read('B')).visits).toEqual([]);
  await expect(source.save({ ...old, visits: [visit('mismatch')] })).rejects.toThrow();
});

it('세션을 떠난 실패는 확정 이력을 복구하고 늦은 성공은 원래 사용자에게만 남긴다', async () => {
  const first = deferred<HistoryValue>();
  const store = createReadingHistoryStore(
    { read: async (userId) => ({ userId, visits: [visit('saved')] }), save: () => first.promise },
    'A',
  );
  store.activate('A1');
  store.ensure();
  await flush();
  store.clear('A1');
  store.deactivate('A1');
  store.activate('A2');
  first.reject(new Error('late failure'));
  await flush();
  expect(store.getSnapshot()).toMatchObject({ visits: [visit('saved')], error: null, isSaving: false });
  const second = deferred<HistoryValue>();
  const success = createReadingHistoryStore(
    { read: async (userId) => ({ userId, visits: [visit('saved')] }), save: () => second.promise },
    'A',
  );
  success.activate('A1');
  success.ensure();
  await flush();
  success.clear('A1');
  success.deactivate('A1');
  second.resolve({ userId: 'A', visits: [] });
  await flush();
  success.activate('A2');
  expect(success.getSnapshot()).toMatchObject({ visits: [], error: null });
});
