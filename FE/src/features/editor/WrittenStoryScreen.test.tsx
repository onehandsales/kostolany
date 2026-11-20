import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { createMockDraftSource } from './draftSource';
import { createMockEditorImageSource } from './imageSource';
import { changeBody, emptyEditor } from './editorModel';
import { emptyPublishOptions, type PublishedStory } from './publishing';
import { WrittenStoriesProvider } from './WrittenStoriesProvider';
import { WrittenStoryScreen } from './WrittenStoryScreen';

it('다른 ID·잘못된 문서 응답은 본문 대신 재시도를 보여주며 공급부 교체 뒤 늦은 성공을 버린다', async () => {
  const record: PublishedStory = { id: 'story', draftId: 'draft', userId: 'a', authorName: 'A', document: { ...changeBody(emptyEditor(), '실제 문서').document, title: '작성한 글' }, publishing: emptyPublishOptions(), publishedAt: '2026-11-20T00:00:00Z' };
  const story = jest.fn().mockResolvedValueOnce({ ...record, id: 'other' }).mockResolvedValueOnce({ ...record, document: { ...record.document, blocks: [] } }).mockResolvedValue(record);
  const source = { ...createMockDraftSource({ delayMs: 0 }), story }; const images = createMockEditorImageSource();
  const tree = (next = source) => <WrittenStoriesProvider value={{ source: next, images, sessionRevision: 0 }}><WrittenStoryScreen storyId="story" onBack={() => {}} /></WrittenStoriesProvider>;
  const view = await render(tree()); await fireEvent.press(await screen.findByRole('button', { name: '작성 글 다시 불러오기' })); await screen.findByText('글을 불러오지 못했어요.');
  await fireEvent.press(screen.getByRole('button', { name: '작성 글 다시 불러오기' })); await screen.findByText('실제 문서');
  let release!: (value: PublishedStory) => void;
  await view.rerender(tree({ ...source, story: jest.fn(() => new Promise(resolve => { release = resolve; })) }));
  await view.rerender(tree({ ...source, story: jest.fn(async () => null) })); await screen.findByText('이 글을 찾을 수 없어요.');
  await act(async () => release(record)); expect(screen.queryByText('실제 문서')).toBeNull();
});
