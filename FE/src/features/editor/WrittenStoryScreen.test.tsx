import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { createMockDraftSource } from './draftSource';
import { createMockEditorImageSource } from './imageSource';
import { changeBody, emptyEditor } from './editorModel';
import { emptyPublishOptions, type PublishedStory } from './publishing';
import { WrittenStoriesProvider } from './WrittenStoriesProvider';
import { WrittenStoryScreen } from './WrittenStoryScreen';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { SharingProvider } from '../sharing/SharingProvider';
import type { ShareAdapter } from '../sharing/types';

it('다른 ID·잘못된 문서 응답은 본문 대신 재시도를 보여주며 공급부 교체 뒤 늦은 성공을 버린다', async () => {
  const record: PublishedStory = { id: 'story', draftId: 'draft', userId: 'a', authorName: 'A', document: { ...changeBody(emptyEditor(), '실제 문서').document, title: '작성한 글' }, publishing: emptyPublishOptions(), publishedAt: '2026-11-20T00:00:00Z' };
  const story = jest.fn().mockResolvedValueOnce({ ...record, id: 'other' }).mockResolvedValueOnce({ ...record, document: { ...record.document, blocks: [] } }).mockResolvedValue(record);
  const source = { ...createMockDraftSource({ delayMs: 0 }), story }; const images = createMockEditorImageSource();
  const tree = (next = source) => <AuthProvider><WrittenStoriesProvider value={{ source: next, images, sessionRevision: 0 }}><WrittenStoryScreen storyId="story" onBack={() => {}} /></WrittenStoriesProvider></AuthProvider>;
  const view = await render(tree()); await fireEvent.press(await screen.findByRole('button', { name: '작성 글 다시 불러오기' })); await screen.findByText('글을 불러오지 못했어요.');
  await fireEvent.press(screen.getByRole('button', { name: '작성 글 다시 불러오기' })); await screen.findByText('실제 문서');
  let release!: (value: PublishedStory) => void;
  await view.rerender(tree({ ...source, story: jest.fn(() => new Promise(resolve => { release = resolve; })) }));
  await view.rerender(tree({ ...source, story: jest.fn(async () => null) })); await screen.findByText('이 글을 찾을 수 없어요.');
  await act(async () => release(record)); expect(screen.queryByText('실제 문서')).toBeNull();
});

it('발행한 Unlisted 글은 자기 ID의 링크를 공유하고 source·adapter A→B→A 뒤 이전 시트를 부활시키지 않는다', async () => {
  const record: PublishedStory = { id: 'published-one', draftId: 'draft', userId: mockUserA.id, authorName: mockUserA.name,
    document: { ...changeBody(emptyEditor(), '발행 본문').document, title: '내 Unlisted 글' },
    publishing: { ...emptyPublishOptions(), unlisted: true }, publishedAt: '2026-11-21T00:00:00Z' };
  const source = { ...createMockDraftSource({ delayMs: 0 }), story: jest.fn(async () => record) };
  const other = { ...source, story: jest.fn(async () => null) }; const images = createMockEditorImageSource();
  const adapter: ShareAdapter = { copy: jest.fn(async () => {}), share: async () => 'cancelled', capture: async () => ({ uri: 'file:///card.png', release: () => {} }), saveImage: async () => 'library', openSettings: async () => {} };
  const tree = (next: ReturnType<typeof createMockDraftSource> = source, current = adapter) => <AuthProvider initialUser={mockUserA}><SharingProvider adapter={current}><WrittenStoriesProvider value={{ source: next, images, sessionRevision: 0 }}><WrittenStoryScreen storyId={record.id} ownerId={mockUserA.id} onBack={() => {}} /></WrittenStoriesProvider></SharingProvider></AuthProvider>;
  const view = await render(tree()); await fireEvent.press(await screen.findByRole('button', { name: 'Share story' }));
  expect(screen.getByText(/Unlisted 글은 링크로 접근하는 대상/)).toBeVisible();
  await fireEvent.press(screen.getByRole('button', { name: 'Copy link' }));
  expect(adapter.copy).toHaveBeenLastCalledWith('https://kostolany.invalid/article/published-one', expect.any(AbortSignal));
  await view.rerender(tree(other)); await screen.findByText('이 글을 찾을 수 없어요.');
  await view.rerender(tree()); await screen.findByText('발행 본문');
  expect(screen.queryByRole('heading', { name: 'Share' })).toBeNull();
  await fireEvent.press(screen.getByRole('button', { name: 'Share story' }));
  await view.rerender(tree(source, { ...adapter })); await view.rerender(tree());
  expect(screen.queryByRole('heading', { name: 'Share' })).toBeNull();
});
