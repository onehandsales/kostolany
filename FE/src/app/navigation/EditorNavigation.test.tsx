import { useEffect } from 'react';
import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import type { AuthUser } from '../../features/auth/types';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { createMockUserListSource } from '../../features/bookmarks/data/createMockUserListSource';
import type { Profile } from '../../features/profile/types';
import type { ReadingSettings } from '../../features/settings/types';
import { SessionNavigation } from './AppNavigator';

beforeEach(() => jest.useFakeTimers()); afterEach(() => jest.useRealTimers());
function Probe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => capture(store), [capture, store]); return null;
}
const button = (name: string) => screen.getByRole('button', { name });
async function setup(initialUser: AuthUser | null = mockUserA, sources: React.ComponentProps<typeof SessionNavigation> = {}) {
  let auth!: AuthStore; const source = createMockAuthSource({ delayMs: 0 });
  const tree = (next = sources) => <SafeAreaProvider><AuthProvider initialUser={initialUser} source={source}>
    <SessionNavigation {...next} /><Probe capture={store => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>;
  const view = await render(tree());
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const open = () => user.press(button('Write a story'));
  return { user, open, view, replace: (next: React.ComponentProps<typeof SessionNavigation>) => view.rerender(tree(next)), auth: () => auth, switchTo: async (id: string) => {
    await act(async () => { auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'write' }); await auth.signIn(id); });
  } };
}
async function inputBody(text: string) {
  const body = screen.getByLabelText('글 본문');
  await fireEvent(body, 'focus'); await fireEvent.changeText(body, text); return body;
}

it('비로그인 글쓰기의 닫기·취소·실패·재시도 후 원래 홈에서 다시 눌러 편집기를 연다', async () => {
  const { user, open, auth } = await setup(null);
  await open(); await user.press(button('로그인 닫기')); expect(button('Write a story')).toBeVisible();
  await open(); await act(async () => { await auth().signIn(mockUserA.id, 'cancel'); });
  expect(screen.queryByLabelText('글 제목')).toBeNull();
  await open(); await act(async () => { await auth().signIn(mockUserA.id, 'failure'); });
  await screen.findByText('로그인하지 못했어요. 선택한 독자로 다시 시도해 주세요.');
  await user.press(button('로그인 다시 시도')); expect(screen.queryByLabelText('글 제목')).toBeNull();
  await open(); expect(screen.getByLabelText('글 제목')).toBeVisible(); await user.press(button('편집기 닫기'));
  expect(button('Write a story')).toBeVisible();
}, 30000);

it('늦은 프로필·기본 설정과 다른 기능의 공급부 교체는 편집 수명을 유지하고 앱 재구성은 초안을 폐기한다', async () => {
  let profile!: (value: Profile) => void; let settings!: (value: ReadingSettings) => void;
  const profileSource = { readProfile: () => new Promise<Profile>(resolve => { profile = resolve; }), saveProfile: jest.fn() };
  const settingsSource = { fetchSettings: () => new Promise<ReadingSettings>(resolve => { settings = resolve; }), setDefaultLevel: jest.fn() };
  const { user, open, auth, replace, view } = await setup(mockUserA, { profileSource, settingsSource });
  const revision = auth().getSnapshot().revision;
  await user.press(screen.getByRole('tab', { name: '프로필' })); await user.press(button('설정 열기'));
  await user.press(screen.getByRole('tab', { name: '홈' }));
  await open(); await fireEvent.changeText(screen.getByLabelText('글 제목'), '조회 중에도 유지'); await inputBody('유지할 본문');
  await act(async () => {
    profile({ userId: mockUserA.id, name: '다른 표시 이름', bio: '소개' }); settings({ userId: mockUserA.id, defaultLevel: 'elementary' });
  });
  expect(auth().getSnapshot().revision).toBe(revision); expect(screen.getByLabelText('글 제목')).toHaveDisplayValue('조회 중에도 유지');
  await user.press(button('편집기 더보기'));
  await replace({ bookmarkSource: { ...createMockBookmarkSource({ delayMs: 0 }), lists: createMockUserListSource({ delayMs: 0, managesReadingList: true }) } });
  expect(button('Drafts')).toBeVisible(); await user.press(button('작성 메뉴 닫기'));
  expect(screen.getByLabelText('글 제목')).toHaveDisplayValue('조회 중에도 유지'); await inputBody('다시 만든 초안');
  await view.unmount(); const next = await setup(); await next.open(); expect(screen.queryByText('다시 만든 초안')).toBeNull();
}, 30000);
it('제목·본문·선택 서식과 링크 취소·유효성 오류·적용을 보존하고 저장 뒤 새 편집기는 비운다', async () => {
  const { user, open } = await setup(); await open();
  await fireEvent.changeText(screen.getByLabelText('글 제목'), '긴 한국어 제목'); await inputBody('첫 문장\n둘째 문장');
  await fireEvent(screen.getByLabelText('글 본문'), 'selectionChange', { nativeEvent: { selection: { start: 0, end: 4 } } });
  await user.press(button('굵게')); expect(button('굵게')).toHaveProp('accessibilityState', { selected: true, disabled: false });
  await user.press(button('헤더 서식')); expect(button('헤더 서식')).toHaveProp('accessibilityState', { selected: true, disabled: false });
  await user.press(button('인용 서식')); expect(button('인용 서식')).toHaveProp('accessibilityState', { selected: true, disabled: false });
  await fireEvent(screen.getByLabelText('글 제목'), 'focus');
  expect(button('헤더 서식')).toBeSelected(); expect(button('헤더 서식')).toBeDisabled(); expect(button('인용 서식')).not.toBeSelected();
  await fireEvent(screen.getByLabelText('글 본문'), 'focus'); expect(button('인용 서식')).toBeSelected();
  await user.press(button('링크')); await fireEvent.changeText(screen.getByLabelText('링크 주소'), 'https://example.com');
  await user.press(button('링크 취소')); expect(button('링크')).toHaveProp('accessibilityState', { selected: false, disabled: false });
  await user.press(button('링크')); await fireEvent.changeText(screen.getByLabelText('링크 주소'), 'javascript:alert(1)');
  await user.press(button('링크 적용')); expect(screen.getByRole('alert')).toHaveTextContent('http 또는 https 주소를 입력해 주세요.');
  expect(screen.getByLabelText('링크 주소')).toHaveDisplayValue('javascript:alert(1)');
  await fireEvent.changeText(screen.getByLabelText('링크 주소'), 'example.com'); await user.press(button('링크 적용'));
  expect(button('링크')).toHaveProp('accessibilityState', { selected: true, disabled: false });
  await user.press(button('편집기 닫기')); await screen.findByRole('button', { name: 'Write a story' }); await open();
  expect(screen.getByLabelText('글 제목')).toHaveDisplayValue(''); expect(screen.queryByText('첫 문장')).toBeNull();
}, 30000);
it('검색과 프로필의 실제 글쓰기 진입은 각각 원래 탭으로 돌아오며 후속 안내는 내용에 영향을 주지 않는다', async () => {
  const { user, open } = await setup();
  await user.press(screen.getByRole('tab', { name: '탐색' })); await open(); await user.press(button('편집기 닫기'));
  expect(screen.getByRole('tab', { name: '탐색', selected: true })).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '프로필' })); await open(); await inputBody('보존할 본문');
  await user.press(button('Next')); await user.press(button('Got it')); expect(screen.getByText('보존할 본문')).toBeVisible();
  await user.press(button('편집기 닫기')); await screen.findByRole('button', { name: 'Write a story' });
  expect(screen.getByRole('tab', { name: '프로필', selected: true })).toBeVisible();
}, 30000);
it('A·B·A와 같은 A 재로그인은 작성 내용·링크 초안·오류를 즉시 폐기한다', async () => {
  const { user, open, switchTo } = await setup();
  await open(); await fireEvent.changeText(screen.getByLabelText('글 제목'), 'A 비공개 초안'); await inputBody('A 본문');
  await fireEvent(screen.getByLabelText('글 본문'), 'selectionChange', { nativeEvent: { selection: { start: 0, end: 1 } } });
  await user.press(button('링크')); await fireEvent.changeText(screen.getByLabelText('링크 주소'), '잘못된 주소'); await user.press(button('링크 적용'));
  await switchTo(mockUserB.id); expect(screen.queryByLabelText('링크 주소')).toBeNull(); expect(screen.queryByLabelText('글 제목')).toBeNull();
  await open(); expect(screen.getByLabelText('글 제목')).toHaveDisplayValue(''); await inputBody('B 본문');
  await switchTo(mockUserA.id); await open(); expect(screen.queryByText('A 본문')).toBeNull(); expect(screen.queryByText('B 본문')).toBeNull();
  await inputBody('같은 A 이전 초안'); await switchTo(mockUserA.id); await open(); expect(screen.queryByText('같은 A 이전 초안')).toBeNull();
}, 30000);
