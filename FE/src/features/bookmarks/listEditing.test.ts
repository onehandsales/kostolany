import { deferred } from '../feed/tests/helpers';
import { createMockPublicListSource } from '../public-lists/data/createMockPublicListSource';
import { createPublicListStore } from '../public-lists/createPublicListStore';
import { ownedPublicListId } from '../public-lists/ownedPublicList';
import { createUserListStore } from './createUserListStore';
import { createLibraryStore } from './createLibraryStore';
import { createMockUserListSource } from './data/createMockUserListSource';
import { createMockBookmarkSource } from './data/createMockBookmarkSource';
import { bookmarkArticles } from './data/bookmarkFixtures';
import { DEFAULT_LIST_ID, type UserListSource } from './listTypes';

const ids = ['medium-brain', 'medium-love', 'medium-evening'] as const;
const flush = async () => { for (let i = 0; i < 32; i += 1) await Promise.resolve(); };
async function setup(source: UserListSource = createMockUserListSource({ delayMs: 0 }), userId = 'A') {
  const store = createUserListStore(source, userId, ids);
  await store.refreshLists();
  const created = store.createList('내 목록');
  if (!created.ok) throw new Error(created.message);
  await flush();
  for (const id of ids) { store.setArticleInList(created.listId, id, true); await flush(); }
  const entry = () => store.getSnapshot().entries.find(item => item.listId === created.listId);
  return { source, store, listId: created.listId, entry };
}

it('기사 순서와 메모는 목록 관계에 저장되고 제거 Undo가 메모와 인접 위치를 복원한다', async () => {
  const { store, listId, entry, source } = await setup();
  store.setNote(listId, ids[1], '한글 메모'); await flush();
  const other = store.createList('다른 목록'); if (!other.ok) throw new Error(other.message);
  await flush(); store.setArticleInList(other.listId, ids[1], true); await flush();
  const removal = store.removeStory(listId, ids[1]); if (!removal) throw new Error('Missing removal');
  await flush();
  expect(entry()?.content?.notes?.[ids[1]]).toBeUndefined();
  store.reorderList(listId, [ids[2], ids[0]]); await flush();
  expect(store.undoRemove(removal).ok).toBe(true); await flush();
  expect(entry()?.content?.articleIds).toEqual([ids[1], ids[2], ids[0]]);
  expect(entry()?.content?.notes?.[ids[1]]).toBe('한글 메모');
  expect((await source.fetchLists('A')).lists.find(list => list.listId === other.listId)?.notes).toBeUndefined();
  store.setNote(listId, ids[1], '  '); await flush();
  expect(entry()?.content?.notes).toEqual({});
  await store.refreshLists();
  expect(entry()?.content?.articleIds).toEqual([ids[1], ids[2], ids[0]]);
});

it('기본 읽기 목록의 순서와 메모를 같은 저장소에서 읽고 기본 목록 삭제는 거부한다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0, managesReadingList: true });
  const library = createLibraryStore(source, 'A', bookmarkArticles);
  await library.userLists.refreshLists();
  for (const id of ids) { library.readingList.setArticleSaved(id, true); await flush(); }
  library.userLists.setNote(DEFAULT_LIST_ID, ids[0], '기본 목록 메모'); await flush();
  library.userLists.reorderList(DEFAULT_LIST_ID, [...ids].reverse()); await flush();
  expect(library.readingList.getReadingListSnapshot().articles.map(article => article.id)).toEqual([...ids].reverse());
  expect(library.getSnapshot(ids[0]).isSaved).toBe(true);
  library.userLists.deleteList(DEFAULT_LIST_ID); await flush();
  expect(library.readingList.getReadingListSnapshot().articles).toHaveLength(3);
  expect(library.userLists.renameList(DEFAULT_LIST_ID, '바꾸기').ok).toBe(false);
});

it('소유자 편집 확정과 비공개 및 삭제가 방문자의 공개 목록과 전체 저장에 연결된다', async () => {
  const { source, store, listId } = await setup();
  const publicSource = createMockPublicListSource({ delayMs: 0, userLists: source });
  const visitor = createPublicListStore(publicSource, 'B');
  const disconnect = publicSource.subscribe?.(visitor.refreshAccess);
  await visitor.reload();
  const publicId = ownedPublicListId('A', listId);
  const list = visitor.getSnapshot().value?.lists.find(item => item.id === publicId);
  if (!list) throw new Error('Missing public list');
  visitor.setSaved(publicId, true, 'B'); await flush();
  store.renameList(listId, '수정한 목록', { description: '공개 설명' }); await flush();
  store.setNote(listId, ids[0], '공개 목록 메모'); await flush();
  store.reorderList(listId, [...ids].reverse()); await flush();
  expect(visitor.getSnapshot().value?.lists.find(item => item.id === publicId)).toMatchObject({
    title: '수정한 목록', description: '공개 설명', notes: { [ids[0]]: '공개 목록 메모' }, articleIds: [...ids].reverse(),
  });
  expect(visitor.getSnapshot().savedIds).toContain(publicId);
  store.renameList(listId, '수정한 목록', { isPrivate: true }); await flush();
  expect(publicSource.canAccess?.('B', publicId)).toBe(false);
  expect(visitor.getSnapshot().savedIds).not.toContain(publicId);
  store.renameList(listId, '수정한 목록', { isPrivate: false }); await flush();
  expect(visitor.getSnapshot().savedIds).not.toContain(publicId);
  store.deleteList(listId); await flush();
  expect(publicSource.canAccess?.('A', publicId)).toBe(false);
  disconnect?.();
});

it('응답을 잃은 생성의 재시도는 같은 명령을 사용하고 삭제 의도는 실제 원본에도 남지 않는다', async () => {
  const source = createMockUserListSource({ delayMs: 0 });
  const gate = deferred<void>();
  let first = true;
  const write = jest.fn<ReturnType<UserListSource['setList']>, Parameters<UserListSource['setList']>>().mockImplementation(async input => {
    const value = await source.setList(input);
    if (first) { first = false; await gate.promise; throw new Error('Lost acknowledgement'); }
    return value;
  });
  const store = createUserListStore({ ...source, setList: write }, 'A', ids);
  await store.refreshLists();
  const created = store.createList('불확실한 생성'); if (!created.ok) throw new Error(created.message);
  await flush(); store.deleteList(created.listId); gate.resolve(); await flush();
  expect((await source.fetchLists('A')).lists).toEqual([]);
  expect(store.getSnapshot().entries).toEqual([]);
  expect(write).toHaveBeenCalledTimes(2);
});

it('메모 적용 응답 유실 뒤 같은 명령 재시도는 중복 변경 알림 없이 확정한다', async () => {
  const real = createMockUserListSource({ delayMs: 0 });
  let fail = false;
  const write = jest.fn<ReturnType<UserListSource['setList']>, Parameters<UserListSource['setList']>>().mockImplementation(async input => {
    const result = await real.setList(input);
    if (fail) { fail = false; throw new Error('Lost acknowledgement'); }
    return result;
  });
  const { store, listId, entry } = await setup({ ...real, setList: write });
  const changed = jest.fn(); const stop = real.subscribe?.(changed);
  fail = true; store.setNote(listId, ids[0], '유실된 응답'); await flush();
  expect(entry()?.failure).not.toBeNull();
  const command = write.mock.calls.at(-1)?.[0];
  store.retryList(listId); store.retryList(listId); await flush();
  expect(write.mock.calls.at(-1)?.[0]).toEqual(command);
  expect(entry()?.confirmed?.notes?.[ids[0]]).toBe('유실된 응답');
  expect(changed).toHaveBeenCalledTimes(1); stop?.();
});

it('다른 소유자의 같은 목록 ID는 분리되고 방문자의 update 명령과 삭제 후 늦은 수정은 거부한다', async () => {
  const source = createMockUserListSource({ delayMs: 0 });
  const content = { name: '동명 목록', articleIds: [ids[0]] };
  await source.setList({ userId: 'A', listId: 'same', content, commandId: 1, operation: 'create' });
  await expect(source.setList({ userId: 'B', listId: 'same', content, commandId: 1, operation: 'update' })).rejects.toThrow();
  await source.setList({ userId: 'B', listId: 'same', content, commandId: 2, operation: 'create' });
  expect(ownedPublicListId('A', 'same')).not.toBe(ownedPublicListId('B', 'same'));
  await source.setList({ userId: 'A', listId: 'same', content: null, commandId: 3, operation: 'delete' });
  await expect(source.setList({ userId: 'A', listId: 'same', content, commandId: 4, operation: 'update' })).rejects.toThrow();
  expect((await source.fetchLists('B')).lists).toHaveLength(1);
});

it('삭제된 기사에 열린 정렬 초안을 제출해도 기사를 부활시키지 않고 오래된 Undo도 거부한다', async () => {
  const { store, listId, entry } = await setup();
  const token = store.removeStory(listId, ids[0]); if (!token) throw new Error('Missing token');
  await flush();
  expect(store.reorderList(listId, [...ids].reverse()).ok).toBe(false);
  expect(entry()?.content?.articleIds).toEqual(ids.slice(1));
  store.setScope('new-login');
  expect(store.undoRemove(token).ok).toBe(false);
  store.deleteList(listId); await flush();
  expect(store.undoRemove(token).ok).toBe(false);
});

it('이전 인증 수명의 메모 실패와 조회는 재로그인의 오류와 확정 내용을 덮지 않는다', async () => {
  const real = createMockUserListSource({ delayMs: 0 });
  const gate = deferred<void>();
  let delay = false;
  const { store, listId, entry } = await setup({ ...real, setList: async input => {
    if (delay) { await gate.promise; throw new Error('Late A failure'); }
    return real.setList(input);
  } });
  store.setScope('A:first'); delay = true;
  store.setNote(listId, ids[0], '폐기할 초안');
  store.setScope(''); store.setScope('A:second');
  gate.resolve(); await flush();
  expect(entry()?.failure).toBeNull();
  expect(entry()?.confirmed?.notes?.[ids[0]]).toBeUndefined();
});

it('메모 전송 중 원본에서 제거한 기사는 늦은 저장과 재시도로 부활하지 않는다', async () => {
  const real = createMockUserListSource({ delayMs: 0 });
  const gate = deferred<void>(); let delay = false;
  const { store, listId, entry } = await setup({ ...real, setList: async input => {
    if (delay) await gate.promise;
    return real.setList(input);
  } });
  delay = true; store.setNote(listId, ids[0], '늦은 메모'); await flush();
  const current = (await real.fetchLists('A')).lists.find(list => list.listId === listId);
  if (!current) throw new Error('Missing list');
  await real.setList({ userId: 'A', listId, content: { ...current, articleIds: ids.slice(1) }, commandId: 88 });
  gate.resolve(); await flush();
  expect(entry()?.failure?.conflict).toBe(true);
  expect(entry()?.content?.articleIds).toEqual(ids.slice(1));
  store.retryList(listId); await flush();
  expect(store.setNote(listId, ids[0], '재시도').ok).toBe(false);
  expect((await real.fetchLists('A')).lists[0]?.articleIds).toEqual(ids.slice(1));
});

it('생성 성공 응답 유실 뒤 같은 입력 제출은 같은 ID와 명령으로 확정한다', async () => {
  const real = createMockUserListSource({ delayMs: 0 }); let first = true;
  const write = jest.fn(async (input: Parameters<UserListSource['setList']>[0]) => {
    const result = await real.setList(input);
    if (first) { first = false; throw new Error('Lost acknowledgement'); }
    return result;
  });
  const store = createUserListStore({ ...real, setList: write }, 'A', ids);
  await store.refreshLists(); const created = store.createList('응답 유실'); await flush();
  expect(store.createList('응답 유실')).toEqual(created); await flush();
  expect(write.mock.calls[1]?.[0]).toEqual(write.mock.calls[0]?.[0]);
  expect((await real.fetchLists('A')).lists).toHaveLength(1);
  expect(store.getSnapshot().entries[0]?.failure).toBeNull();
});

it('기본 북마크 계약과 관리 목록 계약은 메모와 순서를 포함한 같은 원본을 사용한다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0, managesReadingList: true });
  await Promise.all(ids.map((articleId, commandId) => source.setArticleSaved({ userId: 'A', articleId, commandId, saved: true })));
  const lists = source.lists; if (!lists) throw new Error('Missing source');
  const current = (await lists.fetchLists('A')).lists[0]; if (!current) throw new Error('Missing default');
  await lists.setList({ userId: 'A', listId: DEFAULT_LIST_ID, commandId: 10,
    content: { ...current, articleIds: [...ids].reverse(), notes: { [ids[0]]: '독립 메모' } } });
  expect((await source.fetchReadingList('A')).articleIds).toEqual([...ids].reverse());
  await source.setArticleSaved({ userId: 'A', articleId: ids[0], saved: false, commandId: 11 });
  expect((await lists.fetchLists('A')).lists[0]?.notes).toEqual({});
});

it('저장 성공 응답을 기다리는 사이 삭제한 목록은 늦은 성공으로 되살아나지 않는다', async () => {
  const real = createMockUserListSource({ delayMs: 0 }); const gate = deferred<void>(); let delay = false;
  const { store, listId } = await setup({ ...real, setList: async input => {
    const result = await real.setList(input); if (delay) await gate.promise; return result;
  } });
  delay = true; store.setNote(listId, ids[0], '늦은 성공'); await flush();
  await real.setList({ userId: 'A', listId, content: null, commandId: 900 });
  gate.resolve(); await flush();
  expect(store.getSnapshot().entries).toEqual([]);
  expect((await real.fetchLists('A')).lists).toEqual([]);
});


it('대기 중 연속 메모·순서 쓰기는 최신 의도와 각 확정 시각을 함께 유지한다', async () => {
  let clock = 1000;
  const real = createMockUserListSource({ delayMs: 0, now: () => clock });
  const { store, source, listId, entry } = await setup(real);
  expect(entry()?.confirmed?.updatedAt).toBe(1000);
  clock = 6000;
  store.setNote(listId, ids[0], '첫 메모');
  store.reorderList(listId, [...ids].reverse());
  store.setNote(listId, ids[0], '최종 메모');
  await flush();
  expect(entry()?.content).toMatchObject({ updatedAt: 6000, articleIds: [...ids].reverse(), notes: { [ids[0]]: '최종 메모' } });
  expect(entry()?.content).toEqual(entry()?.confirmed);
  clock = 9000;
  store.reorderList(listId, [...ids].reverse()); await flush();
  await store.refreshLists();
  expect(entry()?.content?.updatedAt).toBe(6000);
  expect((await source.fetchLists('A')).lists.find(list => list.listId === listId)?.updatedAt).toBe(6000);
});

it('내용이 다시 같아진 뒤 도착한 성공 응답은 현재 카탈로그 시각을 되돌리지 않는다', async () => {
  let clock = 1000; let delay = false;
  const real = createMockUserListSource({ delayMs: 0, now: () => clock });
  const gate = deferred<void>();
  const { store, listId, entry } = await setup({ ...real, setList: async input => {
    const result = await real.setList(input); if (delay) await gate.promise; return result;
  } });
  clock = 2000; delay = true; store.setNote(listId, ids[0], 'A'); await flush();
  const content = real.getCatalog?.().find(list => list.listId === listId);
  if (!content) throw new Error('Missing list');
  clock = 3000;
  await real.setList({ userId: 'A', listId, commandId: 901, content: { ...content, notes: { [ids[0]]: 'B' } } });
  clock = 4000;
  await real.setList({ userId: 'A', listId, commandId: 902, content });
  gate.resolve(); await flush();
  expect(entry()?.confirmed?.updatedAt).toBe(4000);
  expect(entry()?.content?.notes?.[ids[0]]).toBe('A');
  expect(entry()?.failure).toBeNull();
});
