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
import { BookmarkProvider } from '../bookmarks/BookmarkProvider';
import { createMockBookmarkSource } from '../bookmarks/data/createMockBookmarkSource';
import { ProfileStories } from '../profile/ProfileStories';

const images = createMockEditorImageSource();

it.each(['reader', 'profile-bookmark', 'profile-menu'])('%s의 발행 글 저장 선택 중 이탈하면 미확정 선택을 폐기하고 복귀 때 시트를 닫는다', async entry => {
  const story = record();
  const source = { ...createMockDraftSource({ delayMs: 0 }), story: jest.fn(async () => story),
    stories: jest.fn(async () => [story]), getPublishedSnapshot: () => [story] };
  const catalog = createPublishedArticleCatalog(source, images, []);
  const bookmarks = createMockBookmarkSource({ delayMs: 0, managesReadingList: true, articleExists: () => true });
  const tree = (active = true) => <AuthProvider initialUser={mockUserA}><ArticleCatalogProvider catalog={catalog}>
    <BookmarkProvider source={bookmarks} userId={mockUserA.id}><WrittenStoriesProvider value={{ source, images, sessionRevision: 0 }}>
      {entry === 'reader' ? <WrittenStoryScreen storyId={story.id} active={active} onBack={() => {}} />
        : <ProfileStories userId={mockUserA.id} visibility="public" active={active} header={<></>} footer={<></>} contentContainerStyle={{}} />}
    </WrittenStoriesProvider></BookmarkProvider></ArticleCatalogProvider></AuthProvider>;
  const view = await render(tree());
  if (entry === 'profile-menu') {
    await fireEvent.press(await screen.findByRole('button', { name: 'Story options, 읽기 허용된 제목' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Save to list' }));
  } else await fireEvent.press(await screen.findByLabelText('북마크, 읽기 허용된 제목, 저장 안 됨'));
  await fireEvent.press(await screen.findByRole('checkbox', { name: '읽기 목록' }));
  expect(screen.getByRole('heading', { name: 'Save to' })).toBeVisible();
  await view.rerender(tree(false));
  expect(screen.queryByRole('heading', { name: 'Save to' })).toBeNull();
  await view.rerender(tree());
  expect(screen.queryByRole('heading', { name: 'Save to' })).toBeNull();
  expect(screen.getByLabelText('북마크, 읽기 허용된 제목, 저장 안 됨')).toBeVisible();
});
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
  // 듣기 공급부가 없는 독립 reader에서는 도구를 표시하되 재생을 시작하지 않는다.
  expect(screen.getByRole('button', { name: 'Listen' })).toBeDisabled();
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
