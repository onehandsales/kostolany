import { deferred } from '../feed/tests/helpers';

import { createRecommendationStore } from './createRecommendationStore';
import { createMockRecommendationSource } from './data/createMockRecommendationSource';
import type { RecommendationValue } from './types';

const flush = async () => {
  for (let i = 0; i < 12; i++) await Promise.resolve();
};
it('오래된 조회가 Show less 확정을 되돌리지 않고 중복 성공은 Undo 뒤에도 재적용되지 않는다', async () => {
  const base = createMockRecommendationSource({ delayMs: 0 });
  const old = deferred<RecommendationValue>();
  let reads = 0;
  const store = createRecommendationStore(
    {
      ...base,
      read: (userId) =>
        ++reads === 1 ? Promise.resolve({ userId, version: 0, hiddenArticleIds: [] }) : old.promise,
    },
    'A',
  );
  store.ensure();
  await flush();
  void store.reload();
  const command = { operationId: 'hide', articleId: 'article', hidden: true };
  expect(await store.execute(command)).toBe(true);
  old.resolve({ userId: 'A', version: 0, hiddenArticleIds: [] });
  await flush();
  expect(store.getSnapshot().value?.hiddenArticleIds).toEqual(['article']);
  await store.execute({ ...command, operationId: 'undo', hidden: false });
  await store.execute(command);
  expect(store.getSnapshot().value?.hiddenArticleIds).toEqual([]);
  expect((await base.read('A')).version).toBe(2);
});
it('취소·실패는 숨김을 확정하지 않고 재시도와 계정별 명령 키를 분리한다', async () => {
  const source = createMockRecommendationSource({ delayMs: 0, scenario: 'write-error' });
  const store = createRecommendationStore(source, 'A');
  await store.reload();
  const command = { operationId: 'same', articleId: 'one', hidden: true };
  expect(await store.execute(command)).toBe(false);
  expect(store.getSnapshot().value?.hiddenArticleIds).toEqual([]);
  expect(await store.execute(command)).toBe(true);
  const controller = new AbortController();
  controller.abort();
  expect(await store.execute({ ...command, operationId: 'cancel', hidden: false }, controller.signal)).toBe(
    false,
  );
  const b = createRecommendationStore(source, 'B');
  await b.reload();
  expect(b.getSnapshot().value?.hiddenArticleIds).toEqual([]);
  expect(await store.execute({ ...command, hidden: false })).toBe(false);
});
