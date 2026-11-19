import { deferred } from '../feed/tests/helpers';
import { createUserListStore } from './createUserListStore';
import { DEFAULT_LIST_ID, type UserListSource } from './listTypes';
import { normalizeListName, validateListName } from './validateListName';

type WriteResponse = Awaited<ReturnType<UserListSource['setList']>>;
type ReadResponse = Awaited<ReturnType<UserListSource['fetchLists']>>;
const userId = 'reader-a';
const flush = async () => { for (let i = 0; i < 12; i += 1) await Promise.resolve(); };

function setup() {
  const fetchLists = jest.fn<ReturnType<UserListSource['fetchLists']>, Parameters<UserListSource['fetchLists']>>()
    .mockResolvedValue({ userId, lists: [] });
  const setList = jest.fn<ReturnType<UserListSource['setList']>, Parameters<UserListSource['setList']>>()
    .mockImplementation(async ({ userId, listId, content }) => ({ userId, listId, content }));
  const store = createUserListStore({ fetchLists, setList }, userId, ['first', 'second']);
  const content = (id: string) => store.getSnapshot().entries.find((entry) => entry.listId === id)?.content;
  async function create(name = '경제 뉴스') {
    const result = store.createList(name);
    if (!result.ok) throw new Error(result.message);
    await flush();
    return result.listId;
  }
  return { store, fetchLists, setList, content, create };
}

it('제출용 이름만 정규화하고 빈 값·60 코드 포인트 경계·중복을 구분한다', () => {
  expect(normalizeListName('  경제\n  뉴스  ')).toBe('경제 뉴스');
  expect(validateListName(' \n ', [])).toMatch(/입력/);
  expect(validateListName('😀'.repeat(60), [])).toBeNull();
  expect(validateListName('가'.repeat(61), [])).toMatch(/60/);
  expect(validateListName('  ECONOMY ', ['Economy'])).toMatch(/같은 이름/);
  expect(normalizeListName('가')).toBe('가');
});

it('조회 전 생성을 막고 중복 조회를 합치며 실패 후 재시도한다', async () => {
  const { store, fetchLists, setList } = setup();
  const pending = deferred<ReadResponse>();
  fetchLists.mockReturnValueOnce(pending.promise);
  store.ensureLists(); store.ensureLists();
  expect(store.createList('경제').ok).toBe(false);
  expect(setList).not.toHaveBeenCalled();
  pending.reject(new Error('read failed')); await flush();
  expect(store.getSnapshot()).toMatchObject({ status: 'error', entries: [] });
  await store.refreshLists();
  expect(store.getSnapshot().status).toBe('ready');
  expect(fetchLists).toHaveBeenCalledTimes(2);
});

it('생성 연타는 하나의 ID·명령으로 합치고 확정 뒤 중복 이름은 거부한다', async () => {
  const { store, setList } = setup();
  await store.refreshLists();
  const pending = deferred<WriteResponse>(); setList.mockReturnValueOnce(pending.promise);
  const first = store.createList('경제 뉴스');
  expect(store.createList('  경제  뉴스 ')).toEqual(first);
  expect(setList).toHaveBeenCalledTimes(1);
  const input = setList.mock.calls[0]?.[0];
  if (!input) throw new Error('Missing command');
  pending.resolve(input); await flush();
  expect(store.createList('경제 뉴스').ok).toBe(false);
  expect(store.getSnapshot().entries).toHaveLength(1);
});

it.each(['success', 'failure'] as const)('빠른 이름 수정 중 이전 %s 뒤에도 마지막 이름과 ID를 유지한다', async (outcome) => {
  const { store, setList, create, content } = setup(); await store.refreshLists();
  const id = await create();
  const pending = deferred<WriteResponse>(); setList.mockReturnValueOnce(pending.promise);
  store.renameList(id, '중간 이름'); store.renameList(id, '마지막 이름');
  expect(content(id)?.name).toBe('마지막 이름');
  expect(setList).toHaveBeenCalledTimes(2);
  if (outcome === 'success') pending.resolve({ userId, listId: id, content: { name: '중간 이름', articleIds: [] } });
  else pending.reject(new Error('old rename'));
  await flush();
  expect(content(id)).toEqual({ name: '마지막 이름', articleIds: [] });
  expect(store.getSnapshot().entries[0]).toMatchObject({ listId: id, isPending: false, failure: null });
});

it.each([true, false])('기사 추가·제거 연속 입력의 마지막 목표 %s를 중복 없이 반영한다', async (target) => {
  const { store, setList, create, content } = setup(); await store.refreshLists();
  const id = await create();
  const pending = deferred<WriteResponse>(); setList.mockReturnValueOnce(pending.promise);
  store.setArticleInList(id, 'first', true); store.setArticleInList(id, 'first', false);
  store.setArticleInList(id, 'first', target); store.setArticleInList(id, 'first', target);
  expect(setList).toHaveBeenCalledTimes(2);
  pending.resolve({ userId, listId: id, content: { name: '경제 뉴스', articleIds: ['first'] } }); await flush();
  expect(content(id)?.articleIds).toEqual(target ? ['first'] : []);
  expect(store.isArticlePending('first')).toBe(false);
});

it('서로 다른 목록의 동일 기사는 독립적이며 한 목록 실패가 다른 확정을 되돌리지 않는다', async () => {
  const { store, setList, create, content } = setup(); await store.refreshLists();
  const first = await create('첫 목록'); const second = await create('둘째 목록');
  const pending = deferred<WriteResponse>(); setList.mockReturnValueOnce(pending.promise);
  store.setArticleInList(first, 'first', true); store.setArticleInList(second, 'first', true); await flush();
  pending.reject(new Error('first failure')); await flush();
  expect(content(first)?.articleIds).toEqual([]);
  expect(content(second)?.articleIds).toEqual(['first']);
  store.retryList(first); store.retryList(first); await flush();
  expect(content(first)?.articleIds).toEqual(['first']);
  expect(setList).toHaveBeenCalledTimes(5);
});

it.each(['rename-success', 'rename-failure', 'add-success', 'add-failure'])('%s 처리 중 삭제하면 앞선 요청 뒤 삭제하고 늦은 결과로 복원하지 않는다', async (mode) => {
  const { store, setList, create, content } = setup(); await store.refreshLists();
  const id = await create();
  const pending = deferred<WriteResponse>(); setList.mockReturnValueOnce(pending.promise);
  if (mode.startsWith('rename')) store.renameList(id, '바뀐 이름'); else store.setArticleInList(id, 'first', true);
  const input = setList.mock.calls[1]?.[0]; if (!input) throw new Error('Missing command');
  store.deleteList(id); store.renameList(id, '되살리기'); store.setArticleInList(id, 'second', true);
  expect(content(id)).toBeNull(); expect(setList).toHaveBeenCalledTimes(2);
  if (mode.endsWith('success')) pending.resolve(input); else pending.reject(new Error('old write'));
  await flush();
  expect(setList.mock.calls[2]?.[0].content).toBeNull();
  expect(store.getSnapshot().entries).toEqual([]);
  expect(store.renameList(id, '복원').ok).toBe(false);
});

it('삭제 실패는 해당 목록과 기사만 복원하고 재시도는 삭제 목표를 유지한다', async () => {
  const { store, setList, create, content } = setup(); await store.refreshLists();
  const id = await create(); const other = await create('다른 목록');
  store.setArticleInList(id, 'first', true); await flush();
  setList.mockRejectedValueOnce(new Error('delete failure'));
  store.deleteList(id); await flush();
  expect(content(id)?.articleIds).toEqual(['first']);
  expect(store.getSnapshot().entries.find((entry) => entry.listId === id)?.failure?.target).toBeNull();
  store.retryList(id); await flush();
  expect(content(id)).toBeUndefined(); expect(content(other)?.name).toBe('다른 목록');
});

it('생성 실패 후 이름을 고쳐 재시도해도 같은 ID를 사용한다', async () => {
  const { store, setList, content } = setup(); await store.refreshLists();
  setList.mockRejectedValueOnce(new Error('create failure'));
  const result = store.createList('이전 이름'); if (!result.ok) throw new Error(result.message);
  await flush();
  expect(content(result.listId)).toBeNull();
  expect(store.renameList(result.listId, '수정한 이름').ok).toBe(true); await flush();
  expect(content(result.listId)?.name).toBe('수정한 이름');
  expect(setList.mock.calls.map(([input]) => input.listId)).toEqual([result.listId, result.listId]);
});

it('생성 중 삭제 의도 뒤 생성이 실패하면 유령 목록이나 재시도 오류를 남기지 않는다', async () => {
  const { store, setList } = setup(); await store.refreshLists();
  const pending = deferred<WriteResponse>(); setList.mockReturnValueOnce(pending.promise);
  const result = store.createList('임시 목록'); if (!result.ok) throw new Error(result.message);
  store.deleteList(result.listId); pending.reject(new Error('create failure')); await flush();
  expect(store.getSnapshot().entries).toEqual([]);
  expect(setList).toHaveBeenCalledTimes(1);
});

it('늦은 빈 조회가 생성·수정을 지우지 않고 늦은 항목 조회도 삭제를 되돌리지 않는다', async () => {
  const { store, fetchLists, create, content } = setup(); await store.refreshLists();
  const oldEmpty = deferred<ReadResponse>(); fetchLists.mockReturnValueOnce(oldEmpty.promise);
  const refreshing = store.refreshLists(); const id = await create();
  oldEmpty.resolve({ userId, lists: [] }); await refreshing;
  expect(content(id)?.name).toBe('경제 뉴스');
  const oldList = deferred<ReadResponse>(); fetchLists.mockReturnValueOnce(oldList.promise);
  const nextRead = store.refreshLists(); store.deleteList(id); await flush();
  oldList.resolve({ userId, lists: [{ userId, listId: id, name: '경제 뉴스', articleIds: [] }] }); await nextRead;
  expect(store.getSnapshot().entries).toEqual([]);
});

it('늦은 조회 실패와 구독 해제 후에도 확정된 쓰기를 유지한다', async () => {
  const { store, fetchLists, create, content } = setup(); await store.refreshLists();
  const listener = jest.fn(); const unsubscribe = store.subscribe(listener);
  const old = deferred<ReadResponse>(); fetchLists.mockReturnValueOnce(old.promise);
  const read = store.refreshLists(); unsubscribe(); const id = await create();
  old.reject(new Error('old read')); await read;
  expect(content(id)?.name).toBe('경제 뉴스');
  expect(store.getSnapshot()).toMatchObject({ status: 'ready', hasReadError: true });
  expect(listener).toHaveBeenCalledTimes(1);
  expect(store.getSnapshot()).toBe(store.getSnapshot());
});

it.each(['user', 'duplicate-id', 'duplicate-name', 'default-id', 'article', 'name'])('잘못된 목록 응답 %s를 빈 성공으로 숨기지 않는다', async (kind) => {
  const { store, fetchLists } = setup();
  const list = { userId, listId: 'list-a', name: '경제', articleIds: ['first'] };
  const lists = kind === 'duplicate-id' ? [list, list] : kind === 'duplicate-name' ? [list, { ...list, listId: 'list-b' }]
    : [{ ...list, listId: kind === 'default-id' ? DEFAULT_LIST_ID : list.listId,
      articleIds: kind === 'article' ? ['unknown'] : list.articleIds, name: kind === 'name' ? ' ' : list.name }];
  fetchLists.mockResolvedValue({ userId: kind === 'user' ? 'other' : userId, lists });
  await store.refreshLists(); expect(store.getSnapshot()).toMatchObject({ status: 'error', entries: [] });
});

it.each(['user', 'id', 'content'])('쓰기 응답의 잘못된 %s를 거부하고 원래 목표로 재시도한다', async (kind) => {
  const { store, setList, create, content } = setup(); await store.refreshLists(); const id = await create();
  setList.mockImplementationOnce(async (input) => ({ userId: kind === 'user' ? 'other' : userId,
    listId: kind === 'id' ? 'other' : id, content: kind === 'content' ? null : input.content }));
  store.renameList(id, '새 이름'); await flush(); expect(content(id)?.name).toBe('경제 뉴스');
  store.retryList(id); await flush(); expect(content(id)?.name).toBe('새 이름');
});

it('기본 목록·없는 기사·중복 이름 변경을 거부하고 동기 예외도 복구한다', async () => {
  const { store, setList, create, content } = setup(); await store.refreshLists(); const id = await create();
  expect(store.renameList(DEFAULT_LIST_ID, '변경').ok).toBe(false);
  store.deleteList(DEFAULT_LIST_ID); store.setArticleInList(id, 'unknown', true);
  expect(store.renameList(id, ' 읽기  목록 ').ok).toBe(false);
  expect(content(id)?.articleIds).toEqual([]);
  setList.mockImplementationOnce(() => { throw new Error('sync'); });
  store.renameList(id, '새 이름'); await flush();
  expect(content(id)?.name).toBe('경제 뉴스');
  store.retryList(id); await flush(); expect(content(id)?.name).toBe('새 이름');
});

it('설명과 Private를 이름·소속 변경과 함께 보존하고 초과 설명은 제출하지 않는다', async () => {
  const { store, content, setList } = setup(); await store.refreshLists();
  expect(store.createList('Reading list').ok).toBe(false);
  expect(store.createList('긴 설명', { description: '😀'.repeat(281) }).ok).toBe(false);
  const created = store.createList('설명 있는 목록', { description: '😀'.repeat(280), isPrivate: true });
  if (!created.ok) throw new Error(created.message); await flush();
  store.setArticleInList(created.listId, 'first', true); await flush();
  store.renameList(created.listId, '변경된 이름'); await flush();
  expect(content(created.listId)).toEqual({ name: '변경된 이름', description: '😀'.repeat(280), isPrivate: true, articleIds: ['first'] });
  store.renameList(created.listId, '변경된 이름', { description: '', isPrivate: false }); await flush();
  expect(content(created.listId)).toMatchObject({ description: '', isPrivate: false, articleIds: ['first'] });
  expect(setList).toHaveBeenCalledTimes(4);
});

it('설명 저장 중 삭제한 목록은 늦은 저장 응답으로 되살아나지 않는다', async () => {
  const { store, content, setList, create } = setup(); await store.refreshLists(); const id = await create();
  const pending = deferred<WriteResponse>(); setList.mockReturnValueOnce(pending.promise);
  store.renameList(id, '경제 뉴스', { description: '저장 중', isPrivate: true });
  const command = setList.mock.calls[1]![0]; store.deleteList(id); expect(content(id)).toBeNull();
  pending.resolve(command); await flush(); expect(store.getSnapshot().entries).toEqual([]);
  expect(setList.mock.calls[2]?.[0].content).toBeNull();
});
