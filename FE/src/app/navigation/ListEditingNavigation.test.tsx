import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { createMockUserListSource, type UserListScenario } from '../../features/bookmarks/data/createMockUserListSource';
import { bookmarkArticles } from '../../features/bookmarks/data/bookmarkFixtures';
import { DEFAULT_LIST_ID } from '../../features/bookmarks/listTypes';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { SessionNavigation } from './AppNavigator';

const ids = ['medium-love', 'medium-brain', 'medium-evening'];
const title = bookmarkArticles.find(article => article.id === ids[0])?.title ?? '';
const title2 = bookmarkArticles.find(article => article.id === ids[1])?.title ?? '';
const name = '나의 관찰 목록';
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
function Probe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => capture(store), [store, capture]); return null;
}
async function setup(scenario: UserListScenario = 'normal') {
  const lists = createMockUserListSource({ delayMs: 0, managesReadingList: true, scenario });
  await lists.setList({ userId: mockUserA.id, listId: 'own', commandId: 1,
    content: { name, articleIds: ids, description: '목록 설명', isPrivate: false } });
  let auth: AuthStore | undefined;
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA} source={createMockAuthSource({ delayMs: 0 })}>
    <SessionNavigation bookmarkSource={{ ...createMockBookmarkSource({ delayMs: 0 }), lists }}
      articleSource={createMockArticleSource({ delayMs: 0 })} />
    <Probe capture={store => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(await screen.findByRole('button', { name: `${name} 열기, 저장한 기사 3개` }));
  return { user, lists, switchTo: async (id: string) => {
    if (!auth) throw new Error('Missing auth');
    const session = auth;
    await act(async () => { session.openLogout(); await session.signOut();
      session.openLogin({ kind: 'library' }); await session.signIn(id); });
  } };
}
const button = (label: string) => screen.getByRole('button', { name: label });

it('기본 읽기 목록의 반응은 실제 공급부에서 조회하며 공개 공유와 계정 간 노출을 막는다', async () => {
  const { user, switchTo } = await setup();
  await user.press(button('라이브러리로 돌아가기'));
  await user.press(button('읽기 목록 열기, 저장한 기사 0개'));
  const clap = await screen.findByRole('button', { name: /^박수 보내기, 읽기 목록/ });
  await waitFor(() => expect(clap).toBeEnabled());
  await user.press(clap);
  await waitFor(() => expect(clap).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 })));
  await user.press(button('List responses'));
  await fireEvent.changeText(screen.getByLabelText('응답 내용'), '나의 비공개 읽기 목록 응답');
  await user.press(button('응답 게시'));
  expect(await screen.findByText('나의 비공개 읽기 목록 응답')).toBeVisible();
  await user.press(button('Responses 닫기'));
  await user.press(button('Share list'));
  expect(screen.getByText('이 대상은 공유할 수 없어요. 비공개이거나 더 이상 접근할 수 없어요.')).toBeVisible();
  await switchTo(mockUserB.id);
  expect(screen.queryByText('나의 비공개 읽기 목록 응답')).toBeNull();
});

it('메모 실패 초안·재시도·취소·지우기와 기사 상세 복귀 및 제거 Undo를 실제 화면에서 검증한다', async () => {
  const { user, lists } = await setup('note-error');
  await user.press(button(`Add a note, ${title}`));
  await fireEvent.changeText(screen.getByLabelText('목록 기사 메모'), '한글 메모');
  await user.press(button('메모 저장'));
  await screen.findByRole('button', { name: '메모 저장 다시 시도' });
  expect(screen.getByLabelText('목록 기사 메모')).toHaveDisplayValue('한글 메모');
  await user.press(button('메모 저장 다시 시도'));
  await waitFor(() => expect(screen.queryByLabelText('목록 기사 메모')).toBeNull());
  await user.press(button(`Edit note, ${title}`));
  await fireEvent.changeText(screen.getByLabelText('목록 기사 메모'), '취소할 초안');
  await user.press(button('목록 메모 취소'));
  expect(screen.getByText('한글 메모')).toBeVisible();
  await user.press(screen.getByRole('button', { name: new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`) }));
  await user.press(await screen.findByRole('button', { name: '저장 목록으로 돌아가기' }));
  await user.press(button(`기사 관리, ${title}`));
  await user.press(button(`이 목록에서 제거, ${title}`));
  await user.press(button('Undo'));
  await waitFor(() => expect(screen.getByText('한글 메모')).toBeVisible());
  await user.press(button(`Edit note, ${title}`));
  await fireEvent.changeText(screen.getByLabelText('목록 기사 메모'), '');
  await user.press(button('메모 저장'));
  await waitFor(() => expect(screen.queryByLabelText('목록 기사 메모')).toBeNull());
  expect((await lists.fetchLists(mockUserA.id)).lists.find(list => list.listId === 'own')?.notes).toEqual({});
}, 30000);

it('정렬 취소는 원순서를 보존하고 실패 뒤 같은 초안 재시도는 상세와 공개 목록에 반영한다', async () => {
  const { user, lists } = await setup('reorder-error');
  async function openOrder() { await user.press(button(`목록 관리, ${name}`)); await user.press(button('Reorder items')); }
  await openOrder(); await user.press(button(`순서 이동, ${title}`)); await user.press(button(`아래로 이동, ${title}`));
  await user.press(button('Cancel'));
  expect((await lists.fetchLists(mockUserA.id)).lists.find(list => list.listId === 'own')?.articleIds).toEqual(ids);
  await openOrder(); await user.press(button(`순서 이동, ${title}`)); await user.press(button(`아래로 이동, ${title}`));
  await user.press(button('목록 순서 저장')); await screen.findByRole('button', { name: '순서 저장 다시 시도' });
  await user.press(button('순서 저장 다시 시도'));
  await waitFor(() => expect(screen.queryByRole('heading', { name: 'Reorder items' })).toBeNull());
  expect((await lists.fetchLists(mockUserA.id)).lists.find(list => list.listId === 'own')?.articleIds).toEqual([ids[1], ids[0], ids[2]]);
  await user.press(button(`목록 관리, ${name}`)); await user.press(button('View list'));
  await screen.findByRole('heading', { name });
  expect(screen.getAllByRole('button', { name: /^Read / })[0]).toHaveProp('accessibilityLabel', `Read ${title2}`);
}, 30000);

it('공개 범위 확인은 확정 목표를 유지하고 취소·실패·재시도 뒤 방문자 저장과 오래된 화면을 차단한다', async () => {
  const { user, lists, switchTo } = await setup('rename-error');
  await user.press(button(`목록 관리, ${name}`)); await user.press(button('View list'));
  await screen.findByRole('heading', { name }); await switchTo(mockUserB.id);
  await user.press(await screen.findByRole('button', { name: `Save list ${name}` }));
  await screen.findByRole('button', { name: `Unsave list ${name}` });
  await switchTo(mockUserA.id);
  await user.press(button('Back from public list'));
  await user.press(await screen.findByRole('button', { name: `${name} 열기, 저장한 기사 3개` }));
  await user.press(button(`목록 관리, ${name}`)); await user.press(button('Make list private'));
  await user.press(button('Cancel'));
  expect((await lists.fetchLists(mockUserA.id)).lists.find(list => list.listId === 'own')?.isPrivate).toBe(false);
  await user.press(button(`목록 관리, ${name}`)); await user.press(button('Make list private'));
  await user.press(button('목록 비공개 확인'));
  await screen.findByText('공개 범위를 변경하지 못했어요. 다시 시도해 주세요.');
  await user.press(button('목록 비공개 확인'));
  await waitFor(() => expect(screen.queryByRole('dialog', { name: '목록 공개 범위 확인' })).toBeNull());
  expect(screen.getByText('Private')).toBeVisible(); expect(button('Share list')).toBeVisible();
  expect(screen.getByText(`${name} is now private`)).toBeVisible();
  await user.press(button('List responses'));
  await fireEvent.changeText(screen.getByLabelText('응답 내용'), '소유 목록의 응답');
  await user.press(button('응답 게시'));
  await screen.findByText('소유 목록의 응답');
  await user.press(button('Responses 닫기'));
  await user.press(button(`목록 관리, ${name}`)); await user.press(button('View list'));
  await screen.findByRole('heading', { name });
  await user.press(button(`Responses, ${name}`));
  await screen.findByText('소유 목록의 응답');
  await user.press(button('Responses 닫기'));
  await switchTo(mockUserB.id);
  await screen.findByText('This list is unavailable.');
  await user.press(button('Back from public list'));
  await user.press(screen.getByRole('tab', { name: 'Saved lists' }));
  await screen.findByText('You haven’t saved any lists yet.');
  await switchTo(mockUserA.id);
  await user.press(screen.getByRole('tab', { name: 'Your lists' }));
  expect(await screen.findByRole('button', { name: `${name} 열기, 저장한 기사 3개` })).toBeVisible();
  expect((await lists.fetchLists(mockUserA.id)).lists.some(list => list.listId === DEFAULT_LIST_ID)).toBe(true);
}, 30000);

it('같은 A 재로그인과 B 전환은 미제출 메모·시트를 버리고 확정 목록은 소유자에게만 복원한다', async () => {
  const { user, switchTo } = await setup();
  await user.press(button(`Add a note, ${title}`));
  await fireEvent.changeText(screen.getByLabelText('목록 기사 메모'), '남으면 안 되는 초안');
  await switchTo(mockUserA.id);
  expect(screen.queryByDisplayValue('남으면 안 되는 초안')).toBeNull();
  expect(screen.queryByLabelText('목록 기사 메모')).toBeNull();
  await switchTo(mockUserB.id);
  expect(screen.queryByRole('button', { name: `${name} 열기, 저장한 기사 3개` })).toBeNull();
  await switchTo(mockUserA.id);
  expect(await screen.findByRole('button', { name: `${name} 열기, 저장한 기사 3개` })).toBeVisible();
}, 30000);
