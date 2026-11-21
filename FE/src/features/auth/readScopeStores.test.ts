import { createHighlightStore } from '../highlights/createHighlightStore';
import { createRelationshipStore } from '../community/createRelationshipStore';
import { createRecommendationStore } from '../recommendations/createRecommendationStore';
import { createModerationStore } from '../moderation/createModerationStore';
import { deferred } from '../feed/tests/helpers';

type ReadStore = {
  setReadScope: (scope: string) => void;
  ensure: () => void;
  getSnapshot: () => { status: string; readError: boolean };
};
function race<T>(value: T, create: (read: () => Promise<T>) => ReadStore) {
  const old = deferred<T>();
  const current = deferred<T>();
  const read = jest.fn<Promise<T>, []>().mockReturnValueOnce(old.promise).mockReturnValueOnce(current.promise);
  return { old, resolve: () => current.resolve(value), read, store: create(read) };
}
const unused = async () => { throw new Error('unused mutation'); };
const cases = [
  ['highlight', () => race({ userId: 'A', version: 2, highlights: [] },
    read => createHighlightStore({ read, set: unused }, 'A'))],
  ['relationship', () => race({ userId: 'A', version: 2, relationships: [] },
    read => createRelationshipStore({ read, set: unused }, 'A'))],
  ['recommendation', () => race({ userId: 'A', version: 2, hiddenArticleIds: [] },
    read => createRecommendationStore({ read, execute: unused }, 'A'))],
  ['moderation', () => race({ userId: 'A', version: 2, muted: [], blocked: [], reports: [] },
    read => createModerationStore({ read, execute: unused }, 'A'))],
] as const;

it.each(cases)('%s의 이전 인증 조회 실패가 새 조회의 잠금·오류·결과를 바꾸지 않는다', async (_name, setup) => {
  const { old, resolve, read, store } = setup();
  store.setReadScope('A:1'); store.ensure();
  store.setReadScope(''); store.setReadScope('A:3'); store.ensure();
  expect(read).toHaveBeenCalledTimes(2);
  old.reject(new Error('old failure')); await Promise.resolve(); await Promise.resolve();
  expect(store.getSnapshot()).toMatchObject({ status: 'loading', readError: false });
  store.ensure(); expect(read).toHaveBeenCalledTimes(2);
  resolve();
  await Promise.resolve(); await Promise.resolve();
  expect(store.getSnapshot()).toMatchObject({ status: 'ready', readError: false });
});
