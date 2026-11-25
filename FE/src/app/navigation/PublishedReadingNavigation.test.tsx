import { act, fireEvent, render, screen, userEvent, waitFor, within } from '@testing-library/react-native';
import { AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './AppNavigator';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockDraftSource } from '../../features/editor/draftSource';
import { changeBody, emptyEditor } from '../../features/editor/editorModel';
import { emptyPublishOptions } from '../../features/editor/publishing';
import { publishedArticleId } from '../../features/editor/publishedArticle';
import { createMockListeningSource } from '../../features/listening/createMockListeningSource';
import { createMockResponseSource } from '../../features/responses/data/createMockResponseSource';
import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import * as moderationContext from '../../features/moderation/ModerationContext';
import * as articleModeration from '../../features/moderation/articleModeration';
import * as authContext from '../../features/auth/AuthProvider';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';

const initialAppState = AppState.currentState;
beforeEach(() => { jest.useFakeTimers(); AppState.currentState = 'active'; });
afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); AppState.currentState = initialAppState; });
const button = (name: string) => screen.getByRole('button', { name });
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(800); });

async function setup(unlisted = false, author = mockUserA) {
  const drafts = createMockDraftSource({ delayMs: 0 });
  const title = '발행 글 읽기 도구';
  const command = { userId: author.id, draftId: drafts.newId(author.id), authorName: author.name,
    publishing: { ...emptyPublishOptions(), unlisted }, operationId: 'publish-reading',
    document: { ...changeBody(emptyEditor(), '한글 😀와 링크\n두 번째 문단').document, title,
      marks: [{ kind: 'bold' as const, start: 0, end: 2 }, { kind: 'link' as const, start: 7, end: 9, url: 'https://example.com' }] } };
  await drafts.save(command, new AbortController().signal);
  const story = await drafts.publish(command, new AbortController().signal);
  const responses = createMockResponseSource({ delayMs: 0, scenario: 'write-error' });
  const listening = createMockListeningSource({ delayMs: 0 });
  const moderation = createMockModerationSource({ delay: 0 });
  const authSource = createMockAuthSource({ delayMs: 0 });
  const linkSource = { initial: async () => `https://kostolany.invalid/written/${encodeURIComponent(story.id)}`, subscribe: () => () => {} };
  const tree = (source = drafts) => <SafeAreaProvider><AppNavigator initialUser={mockUserA} draftSource={source}
    authSource={authSource} responseSource={responses} listeningSource={listening} moderationSource={moderation} linkSource={linkSource} /></SafeAreaProvider>;
  const view = await render(tree());
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await screen.findByRole('heading', { name: title }); await flush();
  async function select() {
    await fireEvent(screen.getByText('한글 😀와 링크'), 'longPress');
    await fireEvent(screen.getByLabelText('본문 안 문구 선택'), 'selectionChange', { nativeEvent: { selection: { start: 0, end: 5 } } });
  }
  return { user, view, tree, title, story, responses, select, moderation };
}

it.each([false, true])('Unlisted=%s 발행 글의 강조를 Library에서 다시 열고 서식을 보존한 구절 응답을 재시도한다', async unlisted => {
  const { user, title, story, responses, select } = await setup(unlisted, unlisted ? mockUserB : mockUserA);
  expect(screen.getByText('한글')).toHaveStyle({ fontWeight: '700' });
  expect(screen.getByRole('link', { name: '링크' })).toBeVisible();
  await select();
  await user.press(button('Highlight')); await flush();
  expect(await screen.findByLabelText('내 하이라이트: 한글 😀')).toBeVisible();
  expect(screen.getByText('한글')).toHaveStyle({ fontWeight: '700' });
  await user.press(button('작성 글 뒤로'));
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('tab', { name: 'Highlighted' }));
  await user.press(await screen.findByRole('button', { name: `하이라이트 원문: ${title}` })); await flush();
  await fireEvent.press(await screen.findByLabelText('내 하이라이트: 한글 😀'), { nativeEvent: { pageY: 300 } });
  await user.press(button('Respond to passage'));
  const responsesPanel = () => within(screen.getByLabelText('Responses 패널'));
  expect(responsesPanel().getByText('한글 😀')).toBeVisible();
  await fireEvent.changeText(screen.getByLabelText('응답 내용'), '발행 문구에 대한 응답');
  await user.press(button('응답 게시')); await flush();
  expect(responsesPanel().getByText(/저장하지 못했어요/)).toBeVisible();
  await user.press(button('응답 게시')); await flush();
  await responsesPanel().findByRole('heading', { name: 'Responses (1)' });
  await user.press(button('Responses 닫기'));
  await fireEvent.press(screen.getByLabelText('내 하이라이트: 한글 😀'), { nativeEvent: { pageY: 300 } });
  await user.press(button('Remove highlight')); await flush();
  expect(screen.queryByLabelText('내 하이라이트: 한글 😀')).toBeNull();
  await fireEvent(screen.getByText('한글 😀와 링크'), 'longPress');
  await fireEvent(screen.getByLabelText('본문 안 문구 선택'), 'selectionChange', { nativeEvent: { selection: { start: 7, end: 9 } } });
  await user.press(button('Highlight')); await flush();
  expect(screen.queryByRole('link', { name: '링크' })).toBeNull();
  await fireEvent.press(screen.getByLabelText('내 하이라이트: 링크'), { nativeEvent: { pageY: 300 } });
  await user.press(button('Remove highlight')); await flush();
  expect(screen.getByRole('link', { name: '링크' })).toBeVisible();
  const read = responses.read({ userId: mockUserA.id, target: { kind: 'article', id: publishedArticleId(story.id) } });
  await flush();
  expect((await read).responses.find(response => response.authorId === mockUserA.id)?.quote?.text).toBe('한글 😀');
}, 30000);

it('발행 글의 선택·응답 초안·재생은 계정 전환과 같은 계정 재로그인에 닫고 개인 강조만 복원한다', async () => {
  const useOriginalAuth = authContext.useAuth;
  let observed: ReturnType<typeof useOriginalAuth> | undefined;
  jest.spyOn(authContext, 'useAuth').mockImplementation(function useObservedAuth() {
    const value = useOriginalAuth(); observed = value; return value;
  });
  const { user, title, select } = await setup();
  await select(); await user.press(button('Highlight')); await flush();
  await user.press(button('Listen')); await flush();
  await fireEvent.press(screen.getByLabelText('내 하이라이트: 한글 😀'), { nativeEvent: { pageY: 300 } });
  await user.press(button('Respond to passage'));
  await fireEvent.changeText(screen.getByLabelText('응답 내용'), '이전 계정 초안');
  async function switchTo(userId: string) {
    const store = observed?.store;
    if (!store) throw new Error('missing-auth');
    await act(async () => {
      store.openLogout(); await store.signOut(); store.openLogin({ kind: 'profile' }); await store.signIn(userId);
    });
    await flush();
  }
  await switchTo(mockUserB.id);
  expect(screen.queryByDisplayValue('이전 계정 초안', { includeHiddenElements: true })).toBeNull();
  expect(screen.queryByLabelText('내 하이라이트: 한글 😀')).toBeNull();
  expect(screen.queryByRole('button', { name: `플레이어 확장: ${title}`, includeHiddenElements: true })).toBeNull();
  await switchTo(mockUserA.id);
  expect(screen.getByLabelText('내 하이라이트: 한글 😀')).toBeVisible();
  await select(); await switchTo(mockUserA.id);
  expect(screen.queryByLabelText('본문 안 문구 선택')).toBeNull();
  expect(screen.getByLabelText('내 하이라이트: 한글 😀')).toBeVisible();
}, 30000);

it('발행 글 듣기→View story는 같은 화면을 중복 쌓지 않고 작성자 차단 후 플레이어와 선택 도구를 닫는다', async () => {
  const useOriginalModeration = moderationContext.useModeration;
  let observed: ReturnType<typeof useOriginalModeration> | undefined;
  jest.spyOn(moderationContext, 'useModeration').mockImplementation(function useObservedModeration() {
    const value = useOriginalModeration(); observed = value; return value;
  });
  const { user, title, select } = await setup(true, mockUserB);
  await user.press(button('Listen')); await flush();
  await user.press(button(`플레이어 확장: ${title}`));
  await user.press(button('플레이어 더보기'));
  await user.press(button('View story'));
  expect(screen.getAllByRole('heading', { name: title, includeHiddenElements: true })).toHaveLength(1);
  await select();
  await act(async () => {
    const pending = observed?.store?.execute({ operationId: 'block-author',
      action: { kind: 'block', writerId: mockUserB.id, active: true } });
    await jest.advanceTimersByTimeAsync(800); await pending;
  });
  await waitFor(() => expect(screen.queryByLabelText('본문 안 문구 선택')).toBeNull());
  expect(screen.queryByRole('button', { name: `플레이어 확장: ${title}`, includeHiddenElements: true })).toBeNull();
}, 30000);

it('발행 공급부 교체로 글이 철회되면 재생 중인 본문·플레이어를 제거한다', async () => {
  const { user, view, tree, title } = await setup();
  await user.press(button('Listen')); await flush();
  expect(button(`플레이어 확장: ${title}`)).toBeVisible();
  await view.rerender(tree(createMockDraftSource({ delayMs: 0 }))); await flush();
  expect(screen.queryByRole('heading', { name: title })).toBeNull();
  expect(screen.queryByRole('button', { name: `플레이어 확장: ${title}`, includeHiddenElements: true })).toBeNull();
}, 30000);

it('발행 글의 듣기 메뉴에서 작성자를 음소거하면 추천에서 제외하고 원문 접근은 유지한다', async () => {
  const useOriginalModeration = articleModeration.useArticleModeration;
  let observed: ReturnType<typeof useOriginalModeration> | undefined;
  jest.spyOn(articleModeration, 'useArticleModeration').mockImplementation(function useObservedModeration() {
    const value = useOriginalModeration(); observed = value; return value;
  });
  const { user, title, story } = await setup(false, mockUserB);
  const articleId = publishedArticleId(story.id);
  expect(observed?.excluded(articleId)).toBe(false);
  await user.press(button('Listen')); await flush();
  await user.press(button(`플레이어 확장: ${title}`));
  await user.press(button('플레이어 더보기'));
  await user.press(button('Mute author')); await flush();
  await user.press(button('Confirm Mute author')); await flush();
  expect(observed?.excluded(articleId)).toBe(true);
  expect(observed?.blocked(articleId)).toBe(false);
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
  await user.press(button(`플레이어 확장: ${title}`));
  await user.press(button('플레이어 더보기'));
  await user.press(button('Unmute author')); await flush();
  await user.press(button('Confirm Unmute author')); await flush();
  expect(observed?.excluded(articleId)).toBe(false);
}, 30000);
