import { useEffect } from 'react';
import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { createMockUserListSource } from '../../features/bookmarks/data/createMockUserListSource';
import { createMockDownloadSource } from '../../features/downloads/createMockDownloadSource';
import { createMockDraftSource } from '../../features/editor/draftSource';
import { emptyEditor } from '../../features/editor/editorModel';
import { createMockEditorImageSource } from '../../features/editor/imageSource';
import { publishedArticleId } from '../../features/editor/publishedArticle';
import { emptyPublishOptions } from '../../features/editor/publishing';
import { SessionNavigation } from './AppNavigator';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const button = (name: string | RegExp) => screen.getByRole('button', { name });
function Probe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => capture(store), [capture, store]); return null;
}
async function setup(useDefault = false) {
  const drafts = createMockDraftSource({ delayMs: 0 }); const images = createMockEditorImageSource({ delayMs: 0 });
  const command = { userId: mockUserA.id, draftId: drafts.newId(mockUserA.id), authorName: mockUserA.name, operationId: 'publish', publishing: emptyPublishOptions(),
    document: { ...emptyEditor().document, version: 1, title: '다운로드한 발행 문서', body: '\uFFFC\n본문과 이미지 사본', blocks: ['paragraph' as const, 'paragraph' as const],
      images: [{ id: 'sunset', assetId: 'local-sunset', offset: 0, source: 'unsplash' as const, description: '보관한 노을', credit: 'Local fixture', width: 240, height: 168 }] } };
  await drafts.save(command, new AbortController().signal); const story = await drafts.publish(command, new AbortController().signal);
  const id = publishedArticleId(story.id);
  const lists = createMockUserListSource({ delayMs: 0, managesReadingList: true, articleExists: articleId => ['medium-love', id].includes(articleId) });
  await lists.setList({ userId: mockUserA.id, listId: 'mixed', content: { name: '혼합 목록', articleIds: ['medium-love', id], isPrivate: false }, operation: 'create', commandId: 1 });
  const bookmarks = { ...createMockBookmarkSource({ delayMs: 0 }), lists };
  const downloads = createMockDownloadSource({ lists, published: { source: drafts, images }, delayMs: 0 });
  const authSource = createMockAuthSource({ delayMs: 0 }); let auth!: AuthStore;
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA} source={authSource}>
    <SessionNavigation bookmarkSource={bookmarks} draftSource={drafts} editorImageSource={images} downloadSource={useDefault ? undefined : downloads} />
    <Probe capture={store => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const open = async () => {
    await user.press(screen.getByRole('tab', { name: '라이브러리' }));
    await user.press(await screen.findByRole('button', { name: '혼합 목록 열기, 저장한 기사 2개' }));
  };
  await open();
  const switchTo = async (userId: string) => act(async () => {
    auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'library' }); await auth.signIn(userId);
  });
  return { user, downloads, drafts, lists, open, switchTo, id, title: story.document.title };
}

it('기본 DownloadProvider도 발행 카탈로그와 연결되어 혼합 목록의 실제 완료 아이콘을 표시한다', async () => {
  const { user, title } = await setup(true);
  await user.press(button('Download list')); await screen.findByRole('button', { name: '다운로드 제거' });
  expect(screen.getByLabelText(`다운로드됨, ${title}`)).toBeVisible();
  await user.press(button('라이브러리로 돌아가기')); expect(button('다운로드 제거')).toBeVisible();
}, 30000);

it('목록에서 읽은 발행 글의 프로필 카드도 응답·저장 초안을 탭 이탈 뒤 복원하지 않는다', async () => {
  const { user, title } = await setup();
  await user.press(button(new RegExp(`^${title},`)));
  const clap = await screen.findByRole('button', { name: new RegExp(`^박수 보내기, ${title}`) });
  await waitFor(() => expect(clap).toBeEnabled()); await user.press(clap);
  await user.press(button('작성 글 뒤로')); await user.press(screen.getByRole('tab', { name: '프로필' }));
  await user.press(await screen.findByRole('button', { name: `Responses, ${title}` }));
  await fireEvent.changeText(screen.getByLabelText('응답 내용'), '프로필 응답 초안');
  const leave = async () => {
    await fireEvent.press(screen.getByRole('tab', { name: '홈', includeHiddenElements: true }));
    await user.press(screen.getByRole('tab', { name: '프로필' }));
  };
  await leave(); expect(screen.queryByLabelText('응답 내용')).toBeNull();
  await user.press(button(`Responses, ${title}`)); expect(screen.getByLabelText('응답 내용')).toHaveDisplayValue('');
  await user.press(button('Responses 닫기'));
  await user.press(button(`Story options, ${title}`)); await user.press(button('Save to list'));
  await user.press(screen.getByRole('checkbox', { name: '혼합 목록' }));
  expect(screen.getByRole('heading', { name: 'Save to' })).toBeVisible();
  await leave(); expect(screen.queryByRole('heading', { name: 'Save to' })).toBeNull();
  expect(screen.getByLabelText(`북마크, ${title}, 저장됨`)).toBeVisible();
}, 30000);

it('A가 비활성인 동안 기사 제거와 Undo가 확정되면 A 복귀에도 이전 다운로드 사본은 복원하지 않는다', async () => {
  const { user, lists, open, switchTo, id, title } = await setup(true);
  await user.press(button('Download list')); await screen.findByRole('button', { name: '다운로드 제거' });
  await switchTo(mockUserB.id);
  await act(async () => {
    await lists.setList({ userId: mockUserA.id, listId: 'mixed', operation: 'update', commandId: 2,
      content: { name: '혼합 목록', articleIds: ['medium-love'], isPrivate: false } });
    await lists.setList({ userId: mockUserA.id, listId: 'mixed', operation: 'update', commandId: 3,
      content: { name: '혼합 목록', articleIds: ['medium-love', id], isPrivate: false } });
  });
  await switchTo(mockUserA.id); await open();
  expect(screen.queryByLabelText(`다운로드됨, ${title}`)).toBeNull();
  expect(screen.getByLabelText(`다운로드 안 됨, ${title}`)).toBeVisible();
  expect(button('다운로드 재시도')).toBeVisible();
  await user.press(button('다운로드 재시도'));
  expect(await screen.findByLabelText(`다운로드됨, ${title}`)).toBeVisible();
}, 30000);

it('발행 사본 본문·이미지는 원문 재조회 없이 열리고 A/B/A 격리 및 열린 마지막 사본 철회가 실제 navigation에 반영된다', async () => {
  const { user, downloads, drafts, lists, open, switchTo, title } = await setup();
  await user.press(button('Download list')); await screen.findByRole('button', { name: '다운로드 제거' });
  const read = jest.spyOn(drafts, 'story'); read.mockClear();
  await act(async () => downloads.setOnline(false));
  await user.press(button(new RegExp(`^${title},`)));
  await screen.findByText('Offline · Downloaded copy');
  expect(screen.getByText('본문과 이미지 사본')).toBeVisible();
  expect(screen.getByLabelText('보관한 노을')).toBeVisible(); expect(read).not.toHaveBeenCalled();
  await user.press(button('작성 글 뒤로')); await switchTo(mockUserB.id);
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  expect(screen.queryByRole('button', { name: '혼합 목록 열기, 저장한 기사 2개' })).toBeNull();
  for (const id of [mockUserA.id, mockUserA.id]) {
    await switchTo(id); await open(); expect(screen.getByLabelText(`다운로드됨, ${title}`)).toBeVisible();
    await user.press(button('라이브러리로 돌아가기'));
  }
  await open(); await user.press(button(new RegExp(`^${title},`))); await screen.findByText('Offline · Downloaded copy');
  await act(async () => { await lists.setList({ userId: mockUserA.id, listId: 'mixed', content: null, operation: 'delete', commandId: 2 }); });
  await screen.findByText('오프라인에서 이용할 수 있는 사본이 없어요. 연결 후 다시 시도해 주세요.');
  expect(screen.queryByText('본문과 이미지 사본')).toBeNull(); expect(screen.queryByLabelText('보관한 노을')).toBeNull();
  await user.press(button('작성 글 뒤로'));
  expect(screen.queryByRole('heading', { name: '혼합 목록' })).toBeNull();
  await act(async () => downloads.setOnline(true));
}, 30000);
