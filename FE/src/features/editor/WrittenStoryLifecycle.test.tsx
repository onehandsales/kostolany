import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA, mockUserB } from '../auth/data/mockUsers';
import { ArticleCatalogProvider } from '../feed/ArticleCatalog';
import { deferred } from '../feed/tests/helpers';
import { ReadingHistoryProvider } from '../reading-history/ReadingHistoryProvider';
import { createMockReadingHistorySource } from '../reading-history/data/createMockReadingHistorySource';
import { createMockDraftSource } from './draftSource';
import { changeBody, emptyEditor } from './editorModel';
import { createMockEditorImageSource } from './imageSource';
import { createPublishedArticleCatalog, publishedArticleId } from './publishedArticle';
import { emptyPublishOptions, type PublishedStory } from './publishing';
import { WrittenStoriesProvider } from './WrittenStoriesProvider';
import { WrittenStoryScreen } from './WrittenStoryScreen';

const images = createMockEditorImageSource();
function record(owner = mockUserA.id, unlisted = false): PublishedStory {
  return { id: 'story', draftId: 'draft', userId: owner, authorName: 'Writer',
    document: { ...changeBody(emptyEditor(), '읽기 허용된 본문').document, title: '읽기 허용된 제목' },
    publishing: { ...emptyPublishOptions(), unlisted }, publishedAt: '2025-06-13T00:00:00Z' };
}

it.each([[mockUserA.id, false], [mockUserA.id, true], [mockUserB.id, false], [mockUserB.id, true]] as const)('소유자 %s Unlisted %s의 링크 방문은 기록하고 접근 철회는 열린 본문과 설정을 제거한다', async (owner, unlisted) => {
  const story = record(owner, unlisted); let available = true; let revision = 0;
  const listeners = new Set<() => void>(); let snapshot: readonly PublishedStory[] = [story];
  const source = { ...createMockDraftSource({ delayMs: 0 }), story: jest.fn(async () => available ? story : null),
    getRevision: () => revision, getPublishedSnapshot: () => snapshot,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; } };
  const catalog = createPublishedArticleCatalog(source, images, []);
  const history = createMockReadingHistorySource({ delayMs: 0 }); const save = jest.spyOn(history, 'save');
  await render(<AuthProvider initialUser={mockUserA}><ArticleCatalogProvider catalog={catalog}>
    <WrittenStoriesProvider value={{ source, images, sessionRevision: 0 }}>
      <ReadingHistoryProvider userId={mockUserA.id} source={history}><WrittenStoryScreen storyId="story" onBack={() => {}} /></ReadingHistoryProvider>
    </WrittenStoriesProvider></ArticleCatalogProvider></AuthProvider>);
  await screen.findByText('읽기 허용된 본문');
  await waitFor(() => expect(save).toHaveBeenCalled());
  expect((await history.read(mockUserA.id)).visits.map(item => item.articleId)).toEqual([publishedArticleId('story')]);
  await fireEvent.press(screen.getByRole('button', { name: 'Story options, 읽기 허용된 제목' }));
  await fireEvent.press(screen.getByRole('button', { name: '발행 글 표시 설정' }));
  const before = save.mock.calls.length;
  await act(async () => { available = false; snapshot = []; revision++; listeners.forEach(listener => listener()); });
  await screen.findByText('이 글을 찾을 수 없어요.');
  expect(screen.queryByText('읽기 허용된 본문')).toBeNull();
  expect(screen.queryByRole('button', { name: '글자 크기 키우기' })).toBeNull();
  expect(save).toHaveBeenCalledTimes(before);
  await act(async () => { available = true; snapshot = [story]; revision++; listeners.forEach(listener => listener()); });
  await screen.findByText('읽기 허용된 본문');
  expect(screen.queryByRole('button', { name: '글자 크기 키우기' })).toBeNull();
});

it('문서 A→B→A와 포커스 이탈 뒤의 늦은 응답을 버리고 현재 조회 실패는 재시도한다', async () => {
  const old = deferred<PublishedStory | null>(); const blur = deferred<PublishedStory | null>();
  const a = record(); const b = { ...record(), id: 'other', document: { ...record().document, title: 'B 제목', body: 'B 본문' } };
  const source = { ...createMockDraftSource({ delayMs: 0 }), story: jest.fn()
    .mockReturnValueOnce(old.promise).mockResolvedValueOnce(b).mockResolvedValueOnce(a)
    .mockReturnValueOnce(blur.promise).mockRejectedValueOnce(new Error('current')).mockResolvedValue(a) };
  const tree = (id = 'story', active = true) => <AuthProvider initialUser={mockUserA}><WrittenStoriesProvider value={{ source, images, sessionRevision: 0 }}><WrittenStoryScreen storyId={id} active={active} onBack={() => {}} /></WrittenStoriesProvider></AuthProvider>;
  const view = await render(tree()); await view.rerender(tree('other')); await screen.findByText('B 본문');
  await view.rerender(tree()); await screen.findByText('읽기 허용된 본문');
  await act(async () => old.reject(new Error('old A'))); expect(screen.queryByRole('alert')).toBeNull();
  await view.rerender(tree('other')); await view.rerender(tree('other', false));
  await act(async () => blur.resolve(b)); expect(screen.queryByText('B 본문')).toBeNull();
  await view.rerender(tree()); await screen.findByRole('button', { name: '작성 글 다시 불러오기' });
  await fireEvent.press(screen.getByRole('button', { name: '작성 글 다시 불러오기' })); await screen.findByText('읽기 허용된 본문');
});
