import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockClapSource } from '../../features/reactions/data/createMockClapSource';
import { createMockProfileSource } from '../../features/profile/data/createMockProfileSource';
import type { Profile, ProfileSource } from '../../features/profile/types';
import { SessionNavigation } from './AppNavigator';

// 가상 목록과 공급부 타이머를 검사 안에서 진행해 늦은 갱신도 act 경계로 관찰한다.
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

const initial: Profile = { userId: mockUserA.id, name: mockUserA.name, bio: '' };
const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const button = (name: string) => screen.getByRole('button', { name });
const tab = (name: string) => screen.getByRole('tab', { name });

function Probe({ onStore }: { onStore: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => onStore(store), [store, onStore]); return null;
}
async function setup(source = createMockProfileSource({ delayMs: 0 })) {
  let auth: AuthStore | undefined;
  const likes = createMockClapSource({ delayMs: 0 });
  const bookmarks = createMockBookmarkSource({ delayMs: 0 });
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA} source={createMockAuthSource({ delayMs: 0 })}>
    <SessionNavigation profileSource={source} feedSource={createMockFeedSource({ delayMs: 0 })}
      clapSource={likes} bookmarkSource={bookmarks} />
    <Probe onStore={(store) => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>);
  await screen.findByRole('button', { name: new RegExp(`^${title}`) });
  if (!auth) throw new Error('Missing auth');
  return { auth, likes, bookmarks, user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }) };
}
async function switchUser(auth: AuthStore, userId: string) {
  await act(async () => {
    auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'profile' }); await auth.signIn(userId);
  });
}

it('이름 저장은 인증 ID·revision·좋아요·북마크·목록을 보존하며 로그아웃 표시와 A→B→A 재로그인에도 일치한다', async () => {
  const { auth, user } = await setup();
  const like = () => screen.getByRole('button', { name: new RegExp(`^박수 보내기, ${title}`) });
  const bookmark = () => screen.getByRole('togglebutton', { name: new RegExp(`^북마크, ${title}`) });
  await waitFor(() => expect(like()).toBeEnabled());
  await user.press(like()); await user.press(bookmark());
  await user.press(tab('라이브러리')); await user.press(button('새 목록'));
  await fireEvent.changeText(screen.getByLabelText('목록 이름 · 필수'), '이름 변경 뒤에도 남는 목록');
  await user.press(button('목록 만들기'));
  await screen.findByRole('button', { name: '이름 변경 뒤에도 남는 목록 열기, 저장한 기사 0개' });
  await user.press(tab('프로필'));
  const revision = auth.getSnapshot().revision;
  await user.press(await screen.findByRole('button', { name: '프로필 편집' }));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '새로운 독자 이름');
  await fireEvent.changeText(screen.getByLabelText('짧은 소개'), '내 소개');
  await user.press(button('프로필 저장'));
  expect(await screen.findByText('새로운 독자 이름 · 로그인됨')).toBeVisible();
  expect(auth.getSnapshot()).toMatchObject({ user: { id: mockUserA.id }, revision });
  await user.press(button('로그아웃'));
  expect(screen.getByText('Do you really want to sign out from the Medium app?')).toHaveProp('accessibilityHint', '새로운 독자 이름 · local mock session');
  await user.press(button('로그아웃 취소'));
  await user.press(tab('홈'));
  expect(like()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 }));
  expect(bookmark()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  await user.press(tab('라이브러리'));
  expect(button('이름 변경 뒤에도 남는 목록 열기, 저장한 기사 0개')).toBeVisible();
  await user.press(tab('프로필'));
  await switchUser(auth, mockUserB.id);
  expect(await screen.findByText('예시 독자 B · 로그인됨')).toBeVisible();
  expect(screen.queryByText('내 소개', { includeHiddenElements: true })).not.toBeOnTheScreen();
  await switchUser(auth, mockUserA.id);
  expect(await screen.findByText('새로운 독자 이름 · 로그인됨')).toBeVisible();
  await user.press(tab('About'));
  expect(screen.getByText('내 소개')).toBeVisible();
  expect(screen.getByText('모의 계정: 예시 독자 A')).toBeVisible();
}, 15000);

it.each(['success', 'failure'] as const)('A 조회 중 B 전환 뒤 늦은 A %s를 버리고 재진입에서 새 프로필을 조회한다', async (outcome) => {
  const pending = deferred<Profile>();
  const base = createMockProfileSource({ delayMs: 0 });
  const source: ProfileSource = { ...base, readProfile: jest.fn().mockImplementationOnce(() => pending.promise)
    .mockImplementation(base.readProfile) };
  const { auth, user } = await setup(source);
  await user.press(tab('프로필'));
  expect(screen.getByText('프로필을 불러오는 중…')).toBeVisible();
  await switchUser(auth, mockUserB.id);
  await screen.findByText('예시 독자 B · 로그인됨');
  const revision = auth.getSnapshot().revision;
  await act(async () => { if (outcome === 'success') pending.resolve({ ...initial, name: '이전 조회 이름' }); else pending.reject(new Error('late A')); });
  expect(screen.getByText('예시 독자 B · 로그인됨')).toBeVisible();
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  expect(auth.getSnapshot()).toMatchObject({ user: { id: mockUserB.id }, revision });
  await switchUser(auth, mockUserA.id);
  expect(screen.queryByRole('button', { name: '프로필 조회 다시 시도' })).not.toBeOnTheScreen();
  expect(await screen.findByText('예시 독자 A · 로그인됨')).toBeVisible();
  expect(source.readProfile).toHaveBeenNthCalledWith(3, mockUserA.id);
});

it.each(['success', 'failure'] as const)('A 저장·미제출 초안 중 B 전환 뒤 늦은 A %s는 B 편집과 인증을 건드리지 않는다', async (outcome) => {
  const pending = deferred<Profile>();
  const base = createMockProfileSource({ delayMs: 0 });
  const source: ProfileSource = { ...base, saveProfile: () => pending.promise };
  const { auth, user } = await setup(source);
  await user.press(tab('프로필')); await user.press(await screen.findByRole('button', { name: '프로필 편집' }));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), 'A 제출 이름');
  await user.press(button('프로필 저장'));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), 'A 미제출 비밀');
  await switchUser(auth, mockUserB.id);
  expect(screen.queryByDisplayValue('A 미제출 비밀', { includeHiddenElements: true })).not.toBeOnTheScreen();
  await user.press(await screen.findByRole('button', { name: '프로필 편집' }));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), 'B의 초안');
  const revision = auth.getSnapshot().revision;
  await act(async () => {
    if (outcome === 'success') pending.resolve({ ...initial, name: 'A 제출 이름' }); else pending.reject(new Error('late A'));
  });
  expect(screen.getByLabelText('이름 · 필수')).toHaveDisplayValue('B의 초안');
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  expect(auth.getSnapshot()).toMatchObject({ user: { id: mockUserB.id }, revision });
  await switchUser(auth, mockUserA.id);
  expect(screen.queryByLabelText('이름 · 필수')).not.toBeOnTheScreen();
  expect(await screen.findByText(`${outcome === 'success' ? 'A 제출 이름' : mockUserA.name} · 로그인됨`)).toBeVisible();
});

it('같은 A로 즉시 재로그인해도 편집 초안과 열린 모달은 재사용하지 않는다', async () => {
  const { auth, user } = await setup();
  await user.press(tab('프로필')); await user.press(await screen.findByRole('button', { name: '프로필 편집' }));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '이전 세션의 초안');
  await switchUser(auth, mockUserA.id);
  expect(screen.queryByLabelText('이름 · 필수')).not.toBeOnTheScreen();
  await user.press(button('프로필 편집'));
  expect(screen.getByLabelText('이름 · 필수')).toHaveDisplayValue(mockUserA.name);
});

it('프로필 Lists에서 읽기 목록과 기사로 이동해 원래 목록에 복귀하고 Settings 편집 이름을 공유한다', async () => {
  const { auth, user } = await setup();
  const bookmark = () => screen.getByRole('togglebutton', { name: new RegExp(`^북마크, ${title}`) });
  await waitFor(() => expect(bookmark()).toBeEnabled());
  await user.press(bookmark());
  await user.press(tab('프로필'));
  await user.press(tab('Lists'));
  await user.press(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' }));
  await user.press(await screen.findByRole('button', { name: new RegExp(`^${title}`) }));
  expect(await screen.findByRole('heading', { name: title })).toBeVisible();
  await user.press(button('읽기 목록으로 돌아가기'));
  expect(screen.getByRole('heading', { name: '읽기 목록' })).toBeVisible();
  await user.press(button('프로필로 돌아가기'));
  expect(tab('Lists')).toBeSelected();
  await user.press(button('설정 열기'));
  const revision = auth.getSnapshot().revision;
  await user.press(button('설정에서 프로필 편집'));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), 'Settings에서 수정한 이름');
  await fireEvent.changeText(screen.getByLabelText('짧은 소개'), '동일한 프로필 저장소');
  await user.press(button('프로필 저장'));
  expect(screen.getByRole('heading', { name: '설정' })).toBeVisible();
  await user.press(button('프로필로 돌아가기'));
  expect(screen.getByRole('heading', { name: 'Settings에서 수정한 이름' })).toBeVisible();
  await user.press(tab('About'));
  expect(screen.getByText('동일한 프로필 저장소')).toBeVisible();
  expect(auth.getSnapshot()).toMatchObject({ user: { id: mockUserA.id }, revision });
}, 15000);

it('프로필 목록에서 기사를 읽는 동안 B로 전환하면 이전 목록 대신 새 프로필로 돌아가며 A 소유권을 보존한다', async () => {
  const { auth, user } = await setup();
  const bookmark = () => screen.getByRole('togglebutton', { name: new RegExp(`^북마크, ${title}`) });
  await waitFor(() => expect(bookmark()).toBeEnabled());
  await user.press(bookmark());
  await user.press(tab('프로필'));
  await user.press(tab('Lists'));
  await user.press(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' }));
  await user.press(await screen.findByRole('button', { name: new RegExp(`^${title}`) }));
  await screen.findByRole('heading', { name: title });
  await switchUser(auth, mockUserB.id);
  expect(screen.queryByRole('button', { name: '읽기 목록으로 돌아가기' })).not.toBeOnTheScreen();
  await user.press(button('프로필로 돌아가기'));
  expect(await screen.findByRole('heading', { name: mockUserB.name })).toBeVisible();
  await user.press(tab('Lists'));
  expect(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 0개' })).toBeVisible();
  await switchUser(auth, mockUserA.id);
  await user.press(tab('Lists'));
  expect(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' })).toBeVisible();
}, 15000);
