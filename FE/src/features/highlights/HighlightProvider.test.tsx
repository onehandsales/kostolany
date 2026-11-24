import { act, render } from '@testing-library/react-native';

import { ArticleCatalogProvider, type ArticleCatalog } from '../feed/ArticleCatalog';
import type { FeedArticle } from '../feed/types';
import { ModerationContext } from '../moderation/ModerationContext';
import { HighlightProvider, useHighlights } from './HighlightProvider';
import type { HighlightStore } from './createHighlightStore';
import { highlightId, type Highlight } from './types';

beforeEach(() => jest.useFakeTimers());
afterEach(() => { jest.clearAllTimers(); jest.useRealTimers(); });

it('기본 공급부는 저장 중 차단·원문 제거·발행 문서를 막고 기존 개인 강조 제거는 허용한다', async () => {
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
