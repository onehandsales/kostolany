import { act, fireEvent, render, screen, userEvent, waitFor, within } from '@testing-library/react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import { publicListFixtures } from '../../features/public-lists/data/publicListFixtures';
import { createMockPublicListSource } from '../../features/public-lists/data/createMockPublicListSource';
import { createMockResponseSource } from '../../features/responses/data/createMockResponseSource';
import { createMockClapSource } from '../../features/reactions/data/createMockClapSource';
import { AppNavigator, SessionNavigation } from './AppNavigator';

const title = 'The power of a morning routine';
const listId = 'public-morning-routine';
const articleTitle = 'Nobody Wants a 20-Step 5 AM Morning Routine. They Want One That Works.';
const target = { kind: 'list' as const, id: listId };
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const setupUser = () => userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
async function openList(user: ReturnType<typeof setupUser>) {
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(screen.getByRole('button', { name: 'Open topic Life' }));
  await user.press(await screen.findByRole('button', { name: 'Open topic Self Improvement' }));
  await user.press(await screen.findByRole('button', { name: `See the full list ${title}` }));
  await screen.findByRole('heading', { name: title });
}

it('공개 목록 소유자에게 자기 저장·자기 팔로우·자기 신고를 제공하지 않는다', async () => {
  const user = setupUser();
  await render(<SafeAreaProvider><AppNavigator initialUser={{ id: 'medium-staff', name: '목록 소유자' }}
    publicListSource={createMockPublicListSource({ delayMs: 0 })} /></SafeAreaProvider>);
  await openList(user);
  expect(screen.getByText('Your public list')).toBeVisible();
  expect(screen.queryByRole('button', { name: `Save list ${title}` })).toBeNull();
  expect(screen.queryByRole('button', { name: 'Follow Medium Staff' })).toBeNull();
  await user.press(screen.getByRole('button', { name: `List options, ${title}` }));
  expect(screen.queryByRole('button', { name: 'Report list' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Share list' })).toBeVisible();
});

it('공개 목록 저장·기사 북마크·Saved lists·목록 박수·해제와 기사 복귀가 실제 navigation에서 분리된다', async () => {
  const source = createMockPublicListSource({ delayMs: 0, scenario: 'write-error' });
  const claps = createMockClapSource({ delayMs: 0 });
  const user = setupUser();
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} publicListSource={source}
    clapSource={claps} articleSource={createMockArticleSource({ delayMs: 0 })} /></SafeAreaProvider>);
  await openList(user);
  await user.press(screen.getByRole('button', { name: `Save list ${title}` }));
  await user.press(await screen.findByRole('button', { name: `Retry saving list ${title}` }));
  await screen.findByRole('button', { name: `Unsave list ${title}` });
  await user.press(screen.getByRole('button', { name: `Read ${articleTitle}` }));
  await user.press(await screen.findByLabelText(`북마크, ${articleTitle}, 저장 안 됨`));
  await user.press(screen.getByRole('checkbox', { name: '읽기 목록' }));
  await user.press(screen.getByRole('button', { name: '저장할 목록 적용' }));
  await screen.findByLabelText(`북마크, ${articleTitle}, 저장됨`);
  await user.press(screen.getByRole('button', { name: '공개 목록으로 돌아가기' }));
  await user.press(screen.getByRole('button', { name: `박수 보내기, ${title}` }));
  await screen.findByRole('button', { name: `박수 목록, ${title}, 99회` });
  expect((await claps.read({ userId: mockUserA.id, target: { kind: 'article', id: 'medium-working-morning' } })).mine).toBe(0);
  await user.press(screen.getByRole('button', { name: `박수 목록, ${title}, 99회` }));
  await user.press(screen.getByRole('button', { name: '내 박수 모두 취소' }));
  await screen.findByRole('button', { name: `박수 목록, ${title}, 98회` });
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('tab', { name: 'Saved lists' }));
  await user.press(await screen.findByRole('button', { name: `Open saved list ${title}` }));
  await user.press(screen.getByRole('button', { name: `Unsave list ${title}` }));
  await screen.findByRole('button', { name: `Save list ${title}` });
  await user.press(screen.getByRole('button', { name: `Read ${articleTitle}` }));
  expect(await screen.findByLabelText(`북마크, ${articleTitle}, 저장됨`)).toBeVisible();
  await user.press(screen.getByRole('button', { name: '공개 목록으로 돌아가기' }));
  await user.press(screen.getByRole('button', { name: 'Back from public list' }));
  await screen.findByText('You haven’t saved any lists yet.');
}, 30000);

it('목록 응답 실패 후 입력을 유지하고 작성·편집·삭제 결과가 기사 응답과 섞이지 않는다', async () => {
  const source = createMockResponseSource({ delayMs: 0, scenario: 'write-error' });
  const user = setupUser();
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} responseSource={source}
    publicListSource={createMockPublicListSource({ delayMs: 0 })} /></SafeAreaProvider>);
  await openList(user);
  await user.press(screen.getByRole('button', { name: `Responses, ${title}` }));
  const panel = () => within(screen.getByLabelText('Responses 패널', { exact: true }));
  await panel().findByRole('heading', { name: 'Responses (0)' });
  await fireEvent.changeText(panel().getByLabelText('응답 내용'), '목록에 남기는 응답');
  await user.press(panel().getByRole('button', { name: '응답 게시' }));
  await panel().findByText(/저장하지 못했어요/);
  expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue('목록에 남기는 응답');
  await user.press(panel().getByRole('button', { name: '응답 게시' }));
  await panel().findByRole('heading', { name: 'Responses (1)' });
  const own = (await source.read({ userId: mockUserA.id, target })).responses[0];
  if (!own) throw new Error('Missing response');
  await user.press(panel().getByRole('button', { name: /response options$/ }));
  await user.press(screen.getByRole('button', { name: `Edit response, ${own.id}` }));
  await fireEvent.changeText(panel().getByLabelText('응답 내용'), '수정한 목록 응답');
  await user.press(panel().getByRole('button', { name: '응답 수정 저장' }));
  await panel().findByText('수정한 목록 응답');
  await user.press(panel().getByRole('button', { name: /response options$/ }));
  await user.press(screen.getByRole('button', { name: `Delete response, ${own.id}` }));
  await user.press(panel().getByRole('button', { name: '응답 삭제 취소' }));
  expect(panel().getByText('수정한 목록 응답')).toBeVisible();
  await user.press(panel().getByRole('button', { name: /response options$/ }));
  await user.press(screen.getByRole('button', { name: `Delete response, ${own.id}` }));
  await user.press(panel().getByRole('button', { name: '응답 삭제 확인' }));
  await panel().findByRole('heading', { name: 'Responses (0)' });
  expect((await source.read({ userId: mockUserA.id, target: { kind: 'article', id: listId } })).responses).toEqual([]);
}, 30000);

function AuthProbe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth();
  useEffect(() => capture(store), [store, capture]);
  return null;
}
it('A와 B 전환 및 같은 A 재로그인이 개인 초안을 지우고 A의 목록 저장과 응답은 유지한다', async () => {
  let auth: AuthStore | undefined;
  const source = createMockPublicListSource({ delayMs: 0 });
  const user = setupUser();
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA} source={createMockAuthSource({ delayMs: 0 })}>
    <SessionNavigation publicListSource={source} />
    <AuthProbe capture={store => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>);
  const session = auth;
  if (!session) throw new Error('Missing auth');
  async function switchTo(userId: string) {
    await act(async () => { session?.openLogout(); await session?.signOut();
      session?.openLogin({ kind: 'library' }); await session?.signIn(userId); });
  }
  await openList(user);
  await user.press(screen.getByRole('button', { name: `Save list ${title}` }));
  await screen.findByRole('button', { name: `Unsave list ${title}` });
  await user.press(screen.getByRole('button', { name: `Responses, ${title}` }));
  await screen.findByRole('heading', { name: 'Responses (0)' });
  await fireEvent.changeText(screen.getByLabelText('응답 내용'), 'A 확정 응답');
  await user.press(screen.getByRole('button', { name: '응답 게시' }));
  await screen.findByRole('heading', { name: 'Responses (1)' });
  await fireEvent.changeText(screen.getByLabelText('응답 내용'), 'A 미제출 초안');
  await switchTo(mockUserB.id);
  expect(screen.queryByDisplayValue('A 미제출 초안')).toBeNull();
  await screen.findByRole('button', { name: `Save list ${title}` });
  await user.press(screen.getByRole('button', { name: `Responses, ${title}` }));
  await screen.findByRole('heading', { name: 'Responses (0)' });
  expect(screen.queryByText('A 확정 응답')).toBeNull();
  await switchTo(mockUserA.id);
  await screen.findByRole('button', { name: `Unsave list ${title}` });
  await user.press(screen.getByRole('button', { name: `Responses, ${title}` }));
  await screen.findByRole('heading', { name: 'Responses (1)' });
  expect(screen.getByText('A 확정 응답')).toBeVisible();
  await fireEvent.changeText(screen.getByLabelText('응답 내용'), '같은 A 이전 초안');
  await switchTo(mockUserA.id);
  expect(screen.queryByDisplayValue('같은 A 이전 초안')).toBeNull();
  expect(screen.queryByLabelText('Responses 패널', { exact: true })).toBeNull();
}, 30000);

it('기사로 이동한 사이 비공개가 된 목록은 복귀 때 숨기고 Saved lists에서도 제거된다', async () => {
  const source = createMockPublicListSource({ delayMs: 0 });
  const user = setupUser();
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} publicListSource={source}
    articleSource={createMockArticleSource({ delayMs: 0 })} /></SafeAreaProvider>);
  await openList(user);
  await user.press(screen.getByRole('button', { name: `Save list ${title}` }));
  await screen.findByRole('button', { name: `Unsave list ${title}` });
  await user.press(screen.getByRole('button', { name: `Read ${articleTitle}` }));
  await act(async () => source.setVisibility(listId, 'private'));
  await user.press(await screen.findByRole('button', { name: '공개 목록으로 돌아가기' }));
  await screen.findByText('This list is unavailable.');
  expect(screen.queryByRole('button', { name: `Responses, ${title}` })).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Back from public list' }));
  await screen.findByText('This curated list is unavailable.');
  expect(screen.queryByRole('button', { name: `See the full list ${title}` })).toBeNull();
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('tab', { name: 'Saved lists' }));
  await waitFor(() => expect(screen.queryByRole('button', { name: `Open saved list ${title}` })).toBeNull());
});

it('소유자 프로필에서 목록과 기사로 이동한 뒤 돌아오며 삭제된 목록 카드는 남지 않는다', async () => {
  const source = createMockPublicListSource({ delayMs: 0 });
  const user = setupUser();
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} publicListSource={source}
    articleSource={createMockArticleSource({ delayMs: 0 })} /></SafeAreaProvider>);
  await openList(user);
  await user.press(screen.getByRole('button', { name: 'Open Medium Staff profile' }));
  await user.press(await screen.findByRole('tab', { name: 'Lists' }));
  await user.press(await screen.findByRole('button', { name: `Open list ${title}` }));
  await user.press(await screen.findByRole('button', { name: `Read ${articleTitle}` }));
  await user.press(await screen.findByRole('button', { name: '공개 목록으로 돌아가기' }));
  await user.press(screen.getByRole('button', { name: 'Back from public list' }));
  await user.press(await screen.findByRole('button', { name: `Open list ${title}` }));
  await act(async () => source.setVisibility(listId, 'deleted'));
  await user.press(await screen.findByRole('button', { name: 'Back from public list' }));
  await screen.findByText('No captured public lists');
  expect(screen.queryByRole('button', { name: `Open list ${title}` })).toBeNull();
});

// 모달 뒤의 기사 진입을 직접 발생시켜 실제 스택 이탈·뒤로 복귀 수명을 검증한다.
it('공개 목록의 응답·저장·메뉴 초안은 기사 이동 후 복원하지 않는다', async () => {
  const user = setupUser();
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA}
    publicListSource={createMockPublicListSource({ delayMs: 0 })} /></SafeAreaProvider>);
  await openList(user);
  const leave = async () => {
    await fireEvent.press(screen.getByRole('button', { name: `Read ${articleTitle}`, includeHiddenElements: true }));
    await fireEvent.press(await screen.findByRole('button', { name: '공개 목록으로 돌아가기', includeHiddenElements: true }));
  };
  await user.press(screen.getByRole('button', { name: `Responses, ${title}` }));
  await fireEvent.changeText(screen.getByLabelText('응답 내용'), '폐기할 공개 목록 응답');
  await leave();
  expect(screen.queryByLabelText('Responses 패널', { exact: true })).toBeNull();
  await user.press(screen.getByRole('button', { name: `Responses, ${title}` }));
  expect(screen.getByLabelText('응답 내용')).toHaveDisplayValue('');
  await user.press(screen.getByRole('button', { name: 'Responses 닫기' }));
  await user.press(await screen.findByLabelText(`북마크, ${articleTitle}, 저장 안 됨`));
  await user.press(screen.getByRole('checkbox', { name: '읽기 목록' }));
  await leave();
  expect(screen.queryByRole('heading', { name: 'Save to' })).toBeNull();
  expect(screen.getByLabelText(`북마크, ${articleTitle}, 저장 안 됨`)).toBeVisible();
  await user.press(screen.getByRole('button', { name: `List options, ${title}` }));
  await leave();
  expect(screen.queryByRole('button', { name: 'Report list' })).toBeNull();
  await user.press(screen.getByRole('button', { name: `박수 목록, ${title}, 98회` }));
  await leave();
  expect(screen.queryByRole('heading', { name: 'Claps' })).toBeNull();
}, 20000);

it('차단된 기사의 카드와 해당 메모를 함께 숨기고 다른 기사는 유지한다', async () => {
  const privacy = createMockModerationSource({ delay: 0 });
  await privacy.execute(mockUserA.id, { operationId: 'block-list-writer',
    action: { kind: 'block', writerId: 'darius', active: true } });
  const source = createMockPublicListSource({ delayMs: 0, lists: publicListFixtures.map(list => ({ ...list,
    notes: { 'medium-morning-routine': '차단 기사에 연결된 메모' } })) });
  const user = setupUser();
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} moderationSource={privacy}
    publicListSource={source} /></SafeAreaProvider>);
  await openList(user);
  expect(screen.queryByText('차단 기사에 연결된 메모')).toBeNull();
  expect(screen.queryByRole('button', { name: 'Read A Morning Routine for People Who Don’t Want to Wake Up Early' })).toBeNull();
  expect(screen.getByRole('button', { name: `Read ${articleTitle}` })).toBeVisible();
});
