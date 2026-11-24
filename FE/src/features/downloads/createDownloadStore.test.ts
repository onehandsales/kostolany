import { articleFixtures } from '../article/data/fixtures';
import { createMockUserListSource } from '../bookmarks/data/createMockUserListSource';
import type { UserListContent } from '../bookmarks/listTypes';
import { createDownloadStore } from './createDownloadStore';
import { createMockDownloadSource } from './createMockDownloadSource';
import type { DownloadArticle, DownloadRequest } from './types';

const first = 'medium-love'; const second = 'medium-brain';
const initial: UserListContent = { name: '여행 목록', articleIds: [first, second], notes: { [first]: '기억할 메모' }, isPrivate: false };
function deferred<T>() { let resolve!: (value: T) => void; let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }
async function setup(scenario: 'normal' | 'partial-error' = 'normal') {
  const lists = createMockUserListSource({ delayMs: 0 });
  await lists.setList({ userId: 'A', listId: 'list', content: initial, commandId: 1, operation: 'create' });
  await lists.setList({ userId: 'B', listId: 'list', content: { ...initial, articleIds: [second], notes: {} }, commandId: 2, operation: 'create' });
  const source = createMockDownloadSource({ lists, delayMs: 0, scenario });
  const store = createDownloadStore(source, 'A'); const close = store.connect('A:1', () => true);
  return { source, store, close, lists, change: (content: UserListContent | null) => lists.setList({ userId: 'A', listId: 'list', content, commandId: 3, operation: content ? 'update' : 'delete' }) };
}

it('중복 시작을 하나로 합치고 목록 사본·메모·기사 버전을 보존하며 원본 편집은 자동 다운로드하지 않는다', async () => {
  const { source, store, close, change } = await setup();
  source.load = jest.fn(source.load);
  const pending = store.start('list'); expect(store.start('list')).toBe(pending); await pending;
  expect(source.load).toHaveBeenCalledTimes(2);
  expect(store.getSnapshot().entries[0]).toMatchObject({ phase: 'complete', snapshot: initial, outdated: false });
  expect(store.article(first)).toMatchObject({ userId: 'A', articleId: first, contentVersion: 'fixture-1' });
  await change({ ...initial, name: '수정한 긴 한국어 이름', articleIds: [second, first, 'medium-evening'] });
  expect(store.getSnapshot().entries[0]).toMatchObject({ outdated: true, snapshot: initial });
  expect(store.article('medium-evening')).toBeNull(); expect(store.article(first)).not.toBeNull();
  expect(source.load).toHaveBeenCalledTimes(2); close();
});

it('부분 실패는 완료 기사를 보존하고 재시도에서 누락 기사만 받아 중복 집계하지 않는다', async () => {
  const { source, store, close } = await setup('partial-error'); source.load = jest.fn(source.load);
  await store.start('list'); expect(store.getSnapshot().entries[0]?.phase).toBe('error');
  expect(Object.keys(store.getSnapshot().entries[0]!.items)).toEqual([first]);
  await store.start('list'); expect(store.getSnapshot().entries[0]?.phase).toBe('complete');
  expect(source.load).toHaveBeenCalledTimes(3); expect(Object.keys(store.getSnapshot().entries[0]!.items)).toHaveLength(2); close();
});

it('취소·제거 후 새 작업을 시작해도 이전 성공과 실패는 사본을 부활시키거나 새 상태를 덮지 않는다', async () => {
  const { source, store, close } = await setup(); const original = source.load;
  const old = deferred<DownloadArticle>(); let request!: DownloadRequest;
  source.load = jest.fn().mockImplementationOnce((value: DownloadRequest) => { request = value; return old.promise; }).mockImplementation(original);
  const pending = store.start('list'); store.cancel('list'); store.remove('list'); await store.start('list');
  const job = store.getSnapshot().entries[0]!.jobId;
  old.resolve({ ...request, contentVersion: 'fixture-1', article: articleFixtures.find(article => article.id === first)! }); await pending;
  expect(store.getSnapshot().entries[0]).toMatchObject({ jobId: job, phase: 'complete' });
  const failed = deferred<DownloadArticle>(); source.load = () => failed.promise;
  store.remove('list'); const lateFailure = store.start('list'); store.remove('list'); failed.reject(new Error('OLD')); await lateFailure;
  expect(store.getSnapshot().entries).toEqual([]); close();
});

it('목록 삭제와 기사 제거는 해당 사본만 철회하고 Undo는 제거한 사본을 자동 복원하지 않는다', async () => {
  const { source, lists, store, close, change } = await setup();
  await lists.setList({ userId: 'A', listId: 'other', content: { ...initial, name: '다른 목록', articleIds: [first] }, commandId: 4, operation: 'create' });
  await store.start('list'); await store.start('other');
  await change({ ...initial, articleIds: [second], notes: {} });
  expect(store.getSnapshot().entries.find(entry => entry.listId === 'list')?.items[first]).toBeUndefined();
  expect(store.article(first)?.listId).toBe('other');
  await change(initial);
  expect(store.getSnapshot().entries.find(entry => entry.listId === 'list')).toMatchObject({ outdated: true });
  expect(store.getSnapshot().entries.find(entry => entry.listId === 'list')?.items[first]).toBeUndefined();
  store.remove('other'); expect(store.article(first)).toBeNull(); expect(source.getVersion(first)).toBe('fixture-1');
  const delayed = deferred<DownloadArticle>(); const original = source.load;
  store.remove('list'); source.load = () => delayed.promise; const pending = store.start('list');
  await change(null); delayed.resolve(await original({ userId: 'A', listId: 'other', articleId: first, jobId: 'old' }, new AbortController().signal)); await pending;
  expect(store.getSnapshot().entries).toEqual([]); await store.start('list'); expect(store.getSnapshot().entries).toEqual([]); close();
});

it('A 요청 중 계정 수명을 종료하면 B와 같은 A 재로그인에 늦은 응답·오류가 노출되지 않는다', async () => {
  const { source, store, close } = await setup(); const old = deferred<DownloadArticle>(); const original = source.load;
  source.load = jest.fn().mockReturnValueOnce(old.promise).mockImplementation(original);
  const pending = store.start('list'); close();
  const b = createDownloadStore(source, 'B'); const closeB = b.connect('B:2', () => true); await b.start('list');
  expect(b.article(first)).toBeNull(); expect(b.article(second)?.userId).toBe('B'); closeB();
  const closeAgain = store.connect('A:3', () => true); await store.start('list');
  old.reject(new Error('OLD_A')); await pending;
  expect(store.getSnapshot().entries[0]?.phase).toBe('complete'); closeAgain();
  const closeSame = store.connect('A:4', () => true); expect(store.article(first)?.userId).toBe('A'); closeSame();
});

it('응답 소유자가 틀리면 적용하지 않고 실제 인증 경계가 바뀌면 정리 전 응답도 폐기한다', async () => {
  const { source, store, close } = await setup(); const original = source.load;
  source.load = async (request, signal) => ({ ...await original(request, signal), userId: 'B' });
  await store.start('list'); expect(store.getSnapshot().entries[0]?.phase).toBe('error'); expect(store.article(first)).toBeNull(); close();
  let authorized = true; const disconnect = store.connect('A:2', () => authorized);
  const deferredResult = deferred<DownloadArticle>(); source.load = () => deferredResult.promise;
  const pending = store.start('list'); const jobId = store.getSnapshot().entries[0]!.jobId; authorized = false;
  deferredResult.resolve(await original({ userId: 'A', listId: 'list', articleId: first, jobId }, new AbortController().signal)); await pending;
  expect(Object.keys(store.getSnapshot().entries[0]!.items)).toHaveLength(0); disconnect();
});

it('오프라인은 메모리 사본만 이용하며 원문 버전 변경·삭제와 새 저장소 수명은 따로 처리한다', async () => {
  const { source, store, close } = await setup(); await store.start('list'); source.setOnline(false);
  expect(store.getSnapshot().online).toBe(false); expect(store.article(first)).not.toBeNull();
  const article = articleFixtures.find(item => item.id === first)!;
  source.replaceArticle({ ...article, title: '새 원문' }, first);
  expect(store.getSnapshot().entries[0]?.outdated).toBe(true); expect(store.article(first)?.article?.title).toBe(article.title);
  source.replaceArticle(null, first); expect(store.article(first)).toBeNull();
  source.replaceArticle(article, first); expect(source.getVersion(first)).toBe('fixture-4'); expect(store.article(first)).toBeNull(); close();
  const restarted = createDownloadStore(source, 'A'); const stop = restarted.connect('A:1', () => true);
  expect(restarted.article(second)).toBeNull(); await restarted.start('list'); expect(restarted.getSnapshot().entries[0]?.phase).toBe('error'); stop();
});

it('원본 공급부도 다른 소유자와 목록에 없는 기사 요청을 거절한다', async () => {
  const { source, close } = await setup();
  await expect(source.load({ userId: 'B', listId: 'list', articleId: first, jobId: 'x' }, new AbortController().signal)).rejects.toThrow('DOWNLOAD_FORBIDDEN');
  close();
});

it('멤버 권한 철회는 사본 접근·새 다운로드를 막고 사본 삭제는 허용한다', async () => {
  const { source, store, close } = await setup(); close();
  let permitted = true; const disconnect = store.connect('A:member', () => true, () => permitted);
  await store.start('list'); expect(store.article(first)).not.toBeNull();
  permitted = false; expect(store.article(first)).toBeNull();
  store.remove('list'); expect(store.getSnapshot().entries).toEqual([]);
  source.load = jest.fn(source.load); await store.start('list'); expect(source.load).not.toHaveBeenCalled();
  permitted = true; await store.start('list'); expect(store.article(first)).not.toBeNull(); disconnect();
});
