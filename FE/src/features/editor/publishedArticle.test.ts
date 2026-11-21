import { createLibraryStore } from '../bookmarks/createLibraryStore';
import { createMockBookmarkSource } from '../bookmarks/data/createMockBookmarkSource';
import { bookmarkArticles } from '../bookmarks/data/bookmarkFixtures';
import { DEFAULT_LIST_ID } from '../bookmarks/listTypes';
import { createMockDraftSource } from './draftSource';
import { changeBody, emptyEditor } from './editorModel';
import { createMockEditorImageSource } from './imageSource';
import { emptyPublishOptions } from './publishing';
import { createPublishedArticleCatalog, publishedArticleId, writtenStoryId } from './publishedArticle';

const flush = async () => { for (let index = 0; index < 20; index++) await Promise.resolve(); };
it('기존 목록을 유지한 채 새 발행 글을 같은 카탈로그에 추가하고 계정·다중 목록·원본 문서를 분리한다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  const catalog = createPublishedArticleCatalog(drafts, createMockEditorImageSource(), bookmarkArticles);
  const source = createMockBookmarkSource({ delayMs: 0, managesReadingList: true,
    articleExists: id => catalog.getSnapshot().some(article => article.id === id) });
  const a = createLibraryStore(source, 'a', catalog); const b = createLibraryStore(source, 'b', catalog);
  const closeA = a.connectCatalog(); const closeB = b.connectCatalog();
  a.ensureReadingList(); b.ensureReadingList(); await flush();
  a.setArticleInList(DEFAULT_LIST_ID, 'medium-love', true); await flush();
  const document = { ...changeBody(emptyEditor(), '직접 작성한 본문').document, title: '새 발행 글' };
  const command = { userId: 'a', draftId: drafts.newId('a'), document, operationId: 'publish',
    publishing: { ...emptyPublishOptions(), unlisted: true }, authorName: 'A' };
  const before = catalog.getSnapshot(); const changed = jest.fn(); const disconnect = catalog.subscribe(changed);
  await drafts.save(command, new AbortController().signal);
  expect(catalog.getSnapshot()).toBe(before); expect(changed).not.toHaveBeenCalled();
  const story = await drafts.publish(command, new AbortController().signal);
  const id = publishedArticleId(story.id);
  expect(changed).toHaveBeenCalledTimes(1); expect(catalog.getSnapshot()).toBe(catalog.getSnapshot());
  expect(a.getSnapshot('medium-love').isSaved).toBe(true);
  a.setArticleInList(DEFAULT_LIST_ID, id, true);
  const extra = a.userLists.createList('다른 목록'); if (!extra.ok) throw new Error(extra.message);
  await flush(); a.setArticleInList(extra.listId, id, true); await flush();
  a.setArticleInList(DEFAULT_LIST_ID, id, false); await flush();
  expect(a.getSnapshot(id).isSaved).toBe(true); expect(b.getSnapshot(id).isSaved).toBe(false);
  a.userLists.deleteList(extra.listId); await flush();
  expect(a.getSnapshot(id).isSaved).toBe(false);
  expect(await drafts.story(story.id, new AbortController().signal)).toMatchObject({ document, userId: 'a' });
  expect(await drafts.publicStories?.(new AbortController().signal)).toEqual([]);
  expect(writtenStoryId(id)).toBe(story.id); expect(writtenStoryId('written:%')).toBeNull();
  expect(writtenStoryId('medium-love')).toBeNull();
  disconnect(); closeA(); closeB();
});
