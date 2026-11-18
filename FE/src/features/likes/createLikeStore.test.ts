import { deferred } from '../feed/tests/helpers';
import { createLikeStore } from './createLikeStore';
import type { ArticleLike, LikeSource } from './types';

const articleId = 'article-a';
const userId = 'reader-a';
const initial: ArticleLike = { articleId, userId, isLiked: false, count: 0 };
const liked: ArticleLike = { ...initial, isLiked: true, count: 1 };
const flush = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };

function setup() {
  const fetchArticleLike = jest.fn<ReturnType<LikeSource['fetchArticleLike']>, Parameters<LikeSource['fetchArticleLike']>>()
    .mockResolvedValue(initial);
  const setArticleLiked = jest.fn<ReturnType<LikeSource['setArticleLiked']>, Parameters<LikeSource['setArticleLiked']>>()
    .mockImplementation(async (input) => ({ ...initial, articleId: input.articleId, isLiked: input.liked, count: Number(input.liked) }));
  const store = createLikeStore({ fetchArticleLike, setArticleLiked }, userId);
  return { store, fetchArticleLike, setArticleLiked };
}

it('등록과 해제 시 낙관적 수치와 확정 수치가 중복 증가하거나 음수가 되지 않는다', async () => {
  const { store, setArticleLiked } = setup();
  await store.refreshArticleLike(articleId);
  store.setArticleLiked(articleId, true);
  store.setArticleLiked(articleId, true);
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: true, count: 1, isPending: true });
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: true, count: 1, isPending: false });
  store.setArticleLiked(articleId, false);
  store.setArticleLiked(articleId, false);
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: false, count: 0, isPending: false });
  expect(setArticleLiked.mock.calls.map(([input]) => input.liked)).toEqual([true, false]);
});

it.each([true, false])('빠른 등록·해제 후 마지막 목표 %s만 유지하고 같은 기사 요청은 직렬화한다', async (lastTarget) => {
  const { store, setArticleLiked } = setup();
  const first = deferred<ArticleLike>();
  setArticleLiked.mockReturnValueOnce(first.promise);
  await store.refreshArticleLike(articleId);
  store.setArticleLiked(articleId, true);
  store.setArticleLiked(articleId, false);
  store.setArticleLiked(articleId, lastTarget);
  expect(setArticleLiked).toHaveBeenCalledTimes(1);
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: lastTarget, count: lastTarget ? 1 : 0, isPending: true });
  first.resolve(liked);
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: lastTarget, count: lastTarget ? 1 : 0, isPending: false });
  expect(setArticleLiked.mock.calls.map(([input]) => input.liked)).toEqual(lastTarget ? [true] : [true, false]);
});

it.each([true, false])('최신 목표 %s의 변경이 실패하면 확정 상태로 복구하고 재시도 연타를 합친다', async (target) => {
  const { store, fetchArticleLike, setArticleLiked } = setup();
  fetchArticleLike.mockResolvedValue(target ? initial : liked);
  setArticleLiked.mockRejectedValueOnce(new Error('not applied'));
  await store.refreshArticleLike(articleId);
  store.setArticleLiked(articleId, target);
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: !target, count: target ? 0 : 1, isPending: false, error: 'write' });
  const retry = deferred<ArticleLike>();
  setArticleLiked.mockReturnValueOnce(retry.promise);
  store.retryArticleLike(articleId);
  store.retryArticleLike(articleId);
  expect(setArticleLiked.mock.calls.map(([input]) => input.liked)).toEqual([target, target]);
  retry.resolve(target ? liked : initial);
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: target, count: target ? 1 : 0, error: null, isPending: false });
});

it.each([true, false])('오래된 쓰기 실패는 뒤에 입력한 목표 %s를 롤백하지 않는다', async (lastTarget) => {
  const { store, setArticleLiked } = setup();
  const previous = deferred<ArticleLike>();
  setArticleLiked.mockReturnValueOnce(previous.promise);
  await store.refreshArticleLike(articleId);
  store.setArticleLiked(articleId, true);
  store.setArticleLiked(articleId, false);
  store.setArticleLiked(articleId, lastTarget);
  previous.reject(new Error('old failure'));
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: lastTarget, count: lastTarget ? 1 : 0, error: null, isPending: false });
  expect(setArticleLiked).toHaveBeenCalledTimes(lastTarget ? 2 : 1);
});

it.each(['success', 'failure'] as const)('쓰기 이전 조회의 늦은 %s는 최신 성공을 덮지 않는다', async (result) => {
  const { store, fetchArticleLike } = setup();
  await store.refreshArticleLike(articleId);
  const oldRead = deferred<ArticleLike>();
  fetchArticleLike.mockReturnValueOnce(oldRead.promise);
  const refresh = store.refreshArticleLike(articleId);
  store.setArticleLiked(articleId, true);
  await flush();
  if (result === 'success') oldRead.resolve(initial);
  else oldRead.reject(new Error('old read failure'));
  await refresh;
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: true, count: 1, error: null, isRefreshing: false });
});

it('최초 조회와 재시도는 중복되지 않으며 동기 예외 후 다시 조회할 수 있다', async () => {
  const { store, fetchArticleLike, setArticleLiked } = setup();
  fetchArticleLike.mockImplementationOnce(() => { throw new Error('sync read'); });
  store.ensureArticleLike(articleId);
  store.setArticleLiked(articleId, true);
  expect(store.getSnapshot(articleId)).toMatchObject({ status: 'error', count: null, error: 'read' });
  expect(setArticleLiked).not.toHaveBeenCalled();
  store.retryArticleLike(articleId);
  store.retryArticleLike(articleId);
  store.ensureArticleLike(articleId);
  await flush();
  expect(fetchArticleLike).toHaveBeenCalledTimes(2);
  expect(store.getSnapshot(articleId)).toMatchObject({ status: 'ready', count: 0, error: null });
});

it.each([
  { ...liked, articleId: 'wrong' }, { ...liked, userId: 'wrong' },
  { ...liked, count: -1 }, { ...liked, count: 0 }, { ...liked, count: 1.5 },
])('잘못된 조회 응답 %j는 반응으로 표시하지 않는다', async (response) => {
  const { store, fetchArticleLike } = setup();
  fetchArticleLike.mockResolvedValue(response);
  await store.refreshArticleLike(articleId);
  expect(store.getSnapshot(articleId)).toMatchObject({ status: 'error', count: null });
});

it('동기 변경 실패와 잘못된 변경 응답에서도 수치와 처리 중 상태를 복구한다', async () => {
  const { store, setArticleLiked } = setup();
  await store.refreshArticleLike(articleId);
  setArticleLiked.mockImplementationOnce(() => { throw new Error('sync write'); }).mockResolvedValueOnce(initial);
  store.setArticleLiked(articleId, true);
  expect(store.getSnapshot(articleId)).toMatchObject({ count: 0, error: 'write', isPending: false });
  store.retryArticleLike(articleId);
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ count: 0, error: 'write', isPending: false });
});

it('한 기사 처리 중 다른 기사를 변경할 수 있고 구독 종료 후 재진입해도 공유 상태를 유지한다', async () => {
  const { store, fetchArticleLike, setArticleLiked } = setup();
  const pending = deferred<ArticleLike>();
  const listener = jest.fn();
  const unsubscribe = store.subscribe(articleId, listener);
  fetchArticleLike.mockImplementation(async (identity) => ({ ...initial, ...identity }));
  await store.refreshArticleLike(articleId);
  await store.refreshArticleLike('article-b');
  setArticleLiked.mockReturnValueOnce(pending.promise);
  store.setArticleLiked(articleId, true);
  store.setArticleLiked('article-b', true);
  unsubscribe();
  listener.mockClear();
  await flush();
  expect(store.getSnapshot('article-b')).toMatchObject({ isLiked: true, isPending: false });
  pending.resolve(liked);
  await flush();
  expect(listener).not.toHaveBeenCalled();
  store.ensureArticleLike(articleId);
  expect(fetchArticleLike).toHaveBeenCalledTimes(2);
  expect(store.getSnapshot(articleId)).toMatchObject({ isLiked: true, count: 1, isPending: false });
});
