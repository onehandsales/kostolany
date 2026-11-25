import { act, render } from '@testing-library/react-native';

import { ArticleCatalogProvider, type ArticleCatalog } from '../feed/ArticleCatalog';
import type { FeedArticle } from '../feed/types';
import { ModerationContext } from '../moderation/ModerationContext';
import { HighlightProvider, useHighlights } from './HighlightProvider';
import type { HighlightStore } from './createHighlightStore';
import { highlightId, type Highlight } from './types';
import { createMockDraftSource } from '../editor/draftSource';
import { createMockEditorImageSource } from '../editor/imageSource';
import { changeBody, emptyEditor } from '../editor/editorModel';
import { emptyPublishOptions, type PublishedStory } from '../editor/publishing';
import { WrittenStoriesProvider } from '../editor/WrittenStoriesProvider';
import { createPublishedArticleCatalog } from '../editor/publishedArticle';
import { publishedSelectionDocument } from '../editor/publishedSelection';
import { passageAt } from './selectionDocument';

beforeEach(() => jest.useFakeTimers());
afterEach(() => { jest.clearAllTimers(); jest.useRealTimers(); });

it('기본 공급부는 저장 중 차단·원문 제거·원문 없는 발행 메타데이터를 막고 기존 개인 강조 제거는 허용한다', async () => {
  const article: FeedArticle = { id: 'medium-titans', title: '기사', summary: '', sourceName: '작가', publishedLabel: '', readingMinutes: 1, thumbnail: null };
  let articles: readonly FeedArticle[] = [article];
  const catalog: ArticleCatalog = { getSnapshot: () => articles, subscribe: () => () => {} };
  const blocked = new Set<string>();
  let current: HighlightStore | null = null;
  function Probe() { current = useHighlights().store; return null; }
  const moderation = { store: null, scope: 'test', open: () => {},
    isBlockedForUser: (owner: string, writer: string) => blocked.has(`${owner}:${writer}`) };
  const tree = (owner: string, revision: number) => <ArticleCatalogProvider catalog={catalog}>
    <ModerationContext.Provider value={moderation}><HighlightProvider userId={owner} revision={revision}>
      <Probe />
    </HighlightProvider></ModerationContext.Provider>
  </ArticleCatalogProvider>;
  const view = await render(tree('A', 1));
  await act(async () => { await jest.advanceTimersByTimeAsync(150); });
  const storeA = current!;
  const passage = { articleId: article.id, version: 'v1', start: 0, end: 2, text: '문구' };
  const highlight: Highlight = { ...passage, id: highlightId(passage), title: '기사', author: '작가', createdAt: '2026-01-01T00:00:00Z' };
  let result: Promise<boolean>;
  await act(async () => { result = storeA.set({ operationId: 'blocked', highlight, selected: true }); });
  blocked.add('A:fedeminozzi');
  await view.rerender(tree('B', 2));
  await act(async () => { await jest.advanceTimersByTimeAsync(150); });
  expect(await result!).toBe(false);
  expect(current!.getSnapshot().value?.highlights).toEqual([]);
  blocked.clear();
  await view.rerender(tree('A', 3));
  expect(current).toBe(storeA);
  await act(async () => {
    result = storeA.set({ operationId: 'retry', highlight, selected: true });
    await jest.advanceTimersByTimeAsync(150);
  });
  expect(await result!).toBe(true);
  await act(async () => { result = storeA.set({ operationId: 'missing', highlight, selected: true }); });
  articles = [];
  await act(async () => { await jest.advanceTimersByTimeAsync(150); });
  expect(await result!).toBe(false);
  await act(async () => {
    result = storeA.set({ operationId: 'remove', highlight, selected: false });
    await jest.advanceTimersByTimeAsync(150);
  });
  expect(await result!).toBe(true);
  for (const ownerId of ['A', 'B']) for (const unlisted of [false, true]) {
    articles = [{ ...article, publishedStory: { id: article.id, ownerId, unlisted } }];
    await act(async () => {
      result = storeA.set({ operationId: `published-${ownerId}-${unlisted}`, highlight, selected: true });
      await jest.advanceTimersByTimeAsync(150);
    });
    expect(await result!).toBe(false);
  }
  expect(storeA.getSnapshot().value?.highlights).toEqual([]);
});

it('발행 원문이 있는 Public·Unlisted는 허용하고 저장 중 본문 변경·차단·철회는 거절한다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  const command = { userId: 'writer', draftId: drafts.newId('writer'), authorName: '작가', operationId: 'publish',
    publishing: emptyPublishOptions(), document: { ...changeBody(emptyEditor(), '유효한 원문').document, title: '발행 제목' } };
  await drafts.save(command, new AbortController().signal);
  const story = await drafts.publish(command, new AbortController().signal);
  let stories: readonly PublishedStory[] = [story];
  const source = { ...drafts, getPublishedSnapshot: () => stories };
  const images = createMockEditorImageSource();
  const catalog = createPublishedArticleCatalog(source, images, []);
  let blocked = false;
  let current: HighlightStore | null = null;
  function Probe() { current = useHighlights().store; return null; }
  await render(<ArticleCatalogProvider catalog={catalog}>
    <WrittenStoriesProvider value={{ source, images, sessionRevision: 1 }}>
      <ModerationContext.Provider value={{ store: null, scope: 'test', open: () => {}, isBlockedForUser: () => blocked }}>
        <HighlightProvider userId="reader" revision={1}><Probe /></HighlightProvider>
      </ModerationContext.Provider>
    </WrittenStoriesProvider>
  </ArticleCatalogProvider>);
  await act(async () => { await jest.advanceTimersByTimeAsync(150); });
  const store = current!;
  const passage = passageAt(publishedSelectionDocument(story), 0, 3)!;
  const highlight: Highlight = { ...passage, id: highlightId(passage), title: '발행 제목', author: '작가', createdAt: '2026-11-25T00:00:00Z' };
  async function save(operationId: string, duringWrite: () => void = () => {}) {
    let result: Promise<boolean> | undefined;
    await act(async () => { result = store.set({ operationId, highlight, selected: true }); });
    duringWrite();
    await act(async () => { await jest.advanceTimersByTimeAsync(150); });
    return result;
  }
  expect(await save('public')).toBe(true);
  stories = [{ ...story, publishing: { ...story.publishing, unlisted: true } }];
  expect(await save('unlisted')).toBe(true);
  expect(await save('changed', () => {
    stories = [{ ...story, document: { ...story.document, body: '변경된 원문' } }];
  })).toBe(false);
  stories = [story];
  expect(await save('blocked', () => { blocked = true; })).toBe(false);
  blocked = false;
  expect(await save('removed', () => { stories = []; })).toBe(false);
  expect(store.getSnapshot().value?.highlights).toEqual([highlight]);
});
