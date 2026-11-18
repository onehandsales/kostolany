import { deferred } from '../feed/tests/helpers';
import { createLibraryStore } from './createLibraryStore';
import { bookmarkArticles } from './data/bookmarkFixtures';
import { createMockBookmarkSource } from './data/createMockBookmarkSource';
import { DEFAULT_LIST_ID, type UserListSource } from './listTypes';

const articleId = 'example-latest-rates';
const flush = async () => { for (let i = 0; i < 12; i += 1) await Promise.resolve(); };

it('북마크는 모든 목록의 합집합이며 한 목록 제거·삭제가 다른 목록을 지우지 않는다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0 });
  const store = createLibraryStore(source, 'reader-a', bookmarkArticles);
  store.ensureReadingList(); await flush();
  const first = store.userLists.createList('경제'); const second = store.userLists.createList('다시 읽기');
  if (!first.ok || !second.ok) throw new Error('Creation failed');
  await flush();
  store.setArticleInList(DEFAULT_LIST_ID, articleId, true);
  store.setArticleInList(first.listId, articleId, true); store.setArticleInList(second.listId, articleId, true); await flush();
  store.setArticleInList(DEFAULT_LIST_ID, articleId, false); await flush();
  expect(store.readingList.getReadingListSnapshot().articles).toEqual([]);
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: true, isPending: false });
  store.userLists.deleteList(first.listId); await flush();
  expect(store.getSnapshot(articleId).isSaved).toBe(true);
  store.setArticleInList(second.listId, articleId, false); await flush();
  expect(store.getSnapshot(articleId).isSaved).toBe(false);
  expect(store.articles).toEqual(bookmarkArticles);
});

it.each(['success', 'failure'] as const)('사용자 A의 늦은 목록 %s가 사용자 B의 동일 기사 상태를 바꾸지 않는다', async (outcome) => {
  const source = createMockBookmarkSource({ delayMs: 0 });
  if (!source.lists) throw new Error('Missing list source');
  const pending = deferred<Awaited<ReturnType<UserListSource['setList']>>>();
  const setList = jest.fn(source.lists.setList);
  const injected = { ...source, lists: { ...source.lists, setList } };
  const first = createLibraryStore(injected, 'reader-a', bookmarkArticles);
  const second = createLibraryStore(injected, 'reader-b', bookmarkArticles);
  first.ensureReadingList(); second.ensureReadingList(); await flush();
  const created = first.userLists.createList('개인 목록'); if (!created.ok) throw new Error(created.message); await flush();
  setList.mockReturnValueOnce(pending.promise);
  first.setArticleInList(created.listId, articleId, true);
  expect(first.getSnapshot(articleId)).toMatchObject({ isSaved: true, isPending: true });
  expect(second.getSnapshot(articleId).isSaved).toBe(false);
  if (outcome === 'success') pending.resolve({ userId: 'reader-a', listId: created.listId,
    content: { name: '개인 목록', articleIds: [articleId] } });
  else pending.reject(new Error('old failure'));
  await flush(); expect(second.getSnapshot(articleId)).toMatchObject({ isSaved: false, isPending: false, error: null });
  expect(second.userLists.getSnapshot().entries).toEqual([]);
});

it('사용자 목록 해제 중에도 처리 상태를 표시하고 실패한 목표를 다시 보낸다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0 });
  if (!source.lists) throw new Error('Missing source');
  const setList = jest.fn(source.lists.setList);
  const store = createLibraryStore({ ...source, lists: { ...source.lists, setList } }, 'reader-a', bookmarkArticles);
  store.ensureReadingList(); await flush();
  const result = store.userLists.createList('경제'); if (!result.ok) throw new Error(result.message); await flush();
  store.setArticleInList(result.listId, articleId, true); await flush();
  const pending = deferred<Awaited<ReturnType<UserListSource['setList']>>>(); setList.mockReturnValueOnce(pending.promise);
  store.setArticleInList(result.listId, articleId, false);
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: false, isPending: true });
  pending.reject(new Error('failed remove')); await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: true, error: 'write' });
  store.retryBookmark(articleId); await flush();
  expect(store.getSnapshot(articleId)).toMatchObject({ isSaved: false, error: null });
});
