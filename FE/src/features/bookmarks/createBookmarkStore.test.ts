import { article, deferred } from '../feed/tests/helpers';
import { createBookmarkStore } from './createBookmarkStore';
import type { ArticleBookmark, BookmarkSource, ReadingList } from './types';

const userId = 'reader-a';
const articleId = 'first';
const catalog = [article(articleId), article('second')];
const flush = async () => { for (let i = 0; i < 8; i += 1) await Promise.resolve(); };

function setup() {
  const fetchReadingList = jest.fn<ReturnType<BookmarkSource['fetchReadingList']>, Parameters<BookmarkSource['fetchReadingList']>>()
    .mockResolvedValue({ userId, articleIds: [] });
  const setArticleSaved = jest.fn<ReturnType<BookmarkSource['setArticleSaved']>, Parameters<BookmarkSource['setArticleSaved']>>()
    .mockImplementation(async (input) => ({ userId: input.userId, articleId: input.articleId, saved: input.saved }));
  const store = createBookmarkStore({ fetchReadingList, setArticleSaved }, userId, catalog);
  return { store, fetchReadingList, setArticleSaved };
}

it('첫 조회 전 저장을 막고 여러 구독자의 초기 조회를 하나로 합친다', async () => {
  const { store, fetchReadingList, setArticleSaved } = setup();
  store.ensureReadingList();
  store.ensureReadingList();
  store.setArticleSaved(articleId, true);
  expect(store.getSnapshot(articleId).status).toBe('loading');
  expect(setArticleSaved).not.toHaveBeenCalled();
  await flush();
  expect(fetchReadingList).toHaveBeenCalledTimes(1);
  expect(store.getReadingListSnapshot()).toMatchObject({ status: 'ready', articles: [] });
});

it('중복 저장과 해제를 합치고 목록 수와 기사 선택을 같은 상태에서 계산한다', async () => {
  const { store, setArticleSaved } = setup();
  await store.refreshReadingList();
  store.setArticleSaved(articleId, true);
  store.setArticleSaved(articleId, true);
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: true, isPending: true });
  expect(store.getReadingListSnapshot().articles.map((item) => item.id)).toEqual([articleId]);
  await flush();
  expect(store.getReadingListSnapshot().articles).toHaveLength(1);
  store.setArticleSaved(articleId, false);
  store.setArticleSaved(articleId, false);
  expect(store.getReadingListSnapshot().articles).toEqual([]);
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: false, isPending: false });
  expect(setArticleSaved.mock.calls.map(([input]) => input.saved)).toEqual([true, false]);
});

it.each([true, false])('빠른 저장·해제 후 마지막 목표 %s를 유지하고 기사별 쓰기를 직렬 처리한다', async (target) => {
  const { store, setArticleSaved } = setup();
  const first = deferred<ArticleBookmark>();
  setArticleSaved.mockReturnValueOnce(first.promise);
  await store.refreshReadingList();
  store.setArticleSaved(articleId, true);
  store.setArticleSaved(articleId, false);
  store.setArticleSaved(articleId, target);
  expect(setArticleSaved).toHaveBeenCalledTimes(1);
  expect(store.getSnapshot(articleId).isSaved).toBe(target);
  first.resolve({ userId, articleId, saved: true });
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: target, isPending: false, error: null });
  expect(setArticleSaved.mock.calls.map(([input]) => input.saved)).toEqual(target ? [true] : [true, false]);
});

it.each([true, false])('목표 %s가 실패하면 해당 기사만 복구하고 같은 목표 재시도 연타를 합친다', async (target) => {
  const { store, fetchReadingList, setArticleSaved } = setup();
  fetchReadingList.mockResolvedValue({ userId, articleIds: target ? [] : [articleId] });
  setArticleSaved.mockRejectedValueOnce(new Error('not applied'));
  await store.refreshReadingList();
  store.setArticleSaved(articleId, target);
  store.setArticleSaved('second', true);
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: !target, error: 'write', isPending: false });
  expect(store.getSnapshot('second')).toMatchObject({ isSaved: true, error: null });
  expect(store.getReadingListSnapshot().failures).toEqual([{ articleId, title: '예시 기사 first', saved: target }]);
  const retry = deferred<ArticleBookmark>();
  setArticleSaved.mockReturnValueOnce(retry.promise);
  store.retryBookmark(articleId);
  store.retryBookmark(articleId);
  expect(setArticleSaved.mock.calls.filter(([input]) => input.articleId === articleId)).toHaveLength(2);
  retry.resolve({ userId, articleId, saved: target });
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: target, error: null, isPending: false });
  expect(store.getReadingListSnapshot().failures).toEqual([]);
});

it.each([true, false])('오래된 저장 실패는 뒤에 입력한 목표 %s와 다른 기사를 되돌리지 않는다', async (target) => {
  const { store, setArticleSaved } = setup();
  const previous = deferred<ArticleBookmark>();
  setArticleSaved.mockReturnValueOnce(previous.promise);
  await store.refreshReadingList();
  store.setArticleSaved(articleId, true);
  store.setArticleSaved(articleId, false);
  store.setArticleSaved(articleId, target);
  store.setArticleSaved('second', true);
  previous.reject(new Error('old failure'));
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: target, error: null, isPending: false });
  expect(store.getSnapshot('second').isSaved).toBe(true);
});

it.each(['success', 'failure'] as const)('쓰기 전 조회의 늦은 %s가 새 저장과 목록을 덮지 않는다', async (outcome) => {
  const { store, fetchReadingList } = setup();
  await store.refreshReadingList();
  const previous = deferred<ReadingList>();
  fetchReadingList.mockReturnValueOnce(previous.promise);
  const request = store.refreshReadingList();
  store.setArticleSaved(articleId, true);
  await flush();
  if (outcome === 'success') previous.resolve({ userId, articleIds: [] });
  else previous.reject(new Error('old read failure'));
  await request;
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: true, isPending: false, error: null });
  expect(store.getReadingListSnapshot().articles.map((item) => item.id)).toEqual([articleId]);
});

it('진행 중 쓰기를 포함한 목록 조회가 먼저 끝나도 최신 해제 의도를 보존한다', async () => {
  const { store, fetchReadingList, setArticleSaved } = setup();
  await store.refreshReadingList();
  const write = deferred<ArticleBookmark>();
  setArticleSaved.mockReturnValueOnce(write.promise);
  store.setArticleSaved(articleId, true);
  fetchReadingList.mockResolvedValue({ userId, articleIds: [] });
  await store.refreshReadingList();
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: true, isPending: true });
  store.setArticleSaved(articleId, false);
  write.resolve({ userId, articleId, saved: true });
  await flush();
  expect(store.getReadingListSnapshot().articles).toEqual([]);
});

it('읽기 실패를 빈 목록과 구분하고 재시도로 저장된 기사를 복원한다', async () => {
  const { store, fetchReadingList } = setup();
  fetchReadingList.mockRejectedValueOnce(new Error('read failure')).mockResolvedValue({ userId, articleIds: [articleId] });
  await store.refreshReadingList();
  expect(store.getReadingListSnapshot()).toMatchObject({ status: 'error', hasReadError: true });
  expect(store.getSnapshot(articleId)).toMatchObject({ status: 'error', error: 'read' });
  store.retryBookmark(articleId);
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ status: 'ready', isSaved: true, error: null });
});

it.each([
  { userId: 'wrong-user', articleIds: [] },
  { userId, articleIds: ['missing'] },
  { userId, articleIds: [articleId, articleId] },
])('잘못된 목록 응답 %j를 성공이나 빈 상태로 숨기지 않는다', async (response) => {
  const { store, fetchReadingList } = setup();
  fetchReadingList.mockResolvedValue(response);
  await store.refreshReadingList();
  expect(store.getReadingListSnapshot().status).toBe('error');
});

it.each([
  { userId: 'wrong-user', articleId, saved: true },
  { userId, articleId: 'second', saved: true },
  { userId, articleId, saved: false },
])('잘못된 쓰기 응답 %j를 확정하지 않고 실패로 복구한다', async (response) => {
  const { store, setArticleSaved } = setup();
  await store.refreshReadingList();
  setArticleSaved.mockResolvedValue(response);
  store.setArticleSaved(articleId, true);
  await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: false, error: 'write', isPending: false });
});

it('동기 조회·쓰기 예외도 재시도 가능한 상태로 처리한다', async () => {
  const { store, fetchReadingList, setArticleSaved } = setup();
  fetchReadingList.mockImplementationOnce(() => { throw new Error('sync read'); });
  await store.refreshReadingList();
  expect(store.getReadingListSnapshot().status).toBe('error');
  await store.refreshReadingList();
  setArticleSaved.mockImplementationOnce(() => { throw new Error('sync write'); });
  store.setArticleSaved(articleId, true);
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: false, error: 'write', isPending: false });
});

it('화면 구독이 종료된 뒤에도 저장을 완료하고 재진입 때 재조회 없이 유지한다', async () => {
  const { store, setArticleSaved, fetchReadingList } = setup();
  await store.refreshReadingList();
  const write = deferred<ArticleBookmark>();
  setArticleSaved.mockReturnValueOnce(write.promise);
  const listener = jest.fn();
  const unsubscribe = store.subscribe(articleId, listener);
  store.setArticleSaved(articleId, true);
  unsubscribe();
  listener.mockClear();
  write.resolve({ userId, articleId, saved: true });
  await flush();
  store.ensureReadingList();
  expect(listener).not.toHaveBeenCalled();
  expect(fetchReadingList).toHaveBeenCalledTimes(1);
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: true, isPending: false });
});

it('수정한 기사 구독자와 목록만 알리고 변경 없는 스냅샷은 유지한다', async () => {
  const { store } = setup();
  await store.refreshReadingList();
  const other = jest.fn();
  const list = jest.fn();
  const unchanged = store.getSnapshot('second');
  store.subscribe('second', other);
  const unsubscribe = store.subscribeReadingList(list);
  store.setArticleSaved(articleId, true);
  await flush();
  expect(other).not.toHaveBeenCalled();
  expect(list).toHaveBeenCalled();
  expect(store.getSnapshot('second')).toBe(unchanged);
  unsubscribe();
  list.mockClear();
  store.setArticleSaved(articleId, false);
  await flush();
  expect(list).not.toHaveBeenCalled();
});
