import { useEffect } from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';
import { AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { createMockMembershipSource } from '../../features/membership/createMockMembershipSource';
import type { MembershipSource } from '../../features/membership/types';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import type { ShareAdapter } from '../../features/sharing/types';
import { SessionNavigation } from './AppNavigator';

const originalAppState = AppState.currentState;
beforeEach(() => {
  jest.useFakeTimers();
  AppState.currentState = 'active';
});
afterEach(async () => {
  await act(async () => jest.runOnlyPendingTimersAsync());
  jest.useRealTimers();
  AppState.currentState = originalAppState;
});
const flush = () => act(async () => jest.advanceTimersByTimeAsync(1000));
const button = (name: string | RegExp) => screen.getByRole('button', { name });
function AuthProbe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth();
  useEffect(() => capture(store), [capture, store]);
  return null;
}
async function setup(source = createMockMembershipSource({ records: [], delayMs: 10 })) {
  let auth: AuthStore | undefined;
  const authSource = createMockAuthSource({ delayMs: 0 });
  const adapter: ShareAdapter = {
    copy: jest.fn(async () => {}),
    share: async () => 'cancelled',
    capture: async () => ({ uri: '', release() {} }),
    saveImage: async () => 'download',
    openSettings: async () => {},
  };
  const tree = (membershipSource: MembershipSource) => (
    <SafeAreaProvider>
      <AuthProvider initialUser={mockUserA} source={authSource}>
        <SessionNavigation
          membershipSource={membershipSource}
          shareAdapter={adapter}
          articleSource={createMockArticleSource({ delayMs: 0 })}
          feedSource={createMockFeedSource({
            delayMs: 0,
            catalog: {
              latest: mediumArticles.filter((a) => a.id === 'medium-brain'),
              popular: [],
              recommended: [],
            },
          })}
        />
        <AuthProbe
          capture={(store) => {
            auth = store;
          }}
        />
      </AuthProvider>
    </SafeAreaProvider>
  );
  const result = await render(tree(source));
  await flush();
  if (!auth) throw new Error('auth missing');
  return {
    auth,
    adapter,
    source,
    user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }),
    replace: async (next: MembershipSource) => {
      await result.rerender(tree(next));
      await flush();
    },
  };
}
async function settings(user: ReturnType<typeof userEvent.setup>) {
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await flush();
  await user.press(button('설정 열기'));
}
async function finish(user: ReturnType<typeof userEvent.setup>) {
  await flush();
  expect(screen.queryByRole('radio', { name: 'Pay monthly' })).toBeNull();
  expect(screen.queryByRole('button', { name: '멤버십 닫기' })).toBeNull();
  await user.press(button('멤버십 성공 확인'));
  await user.press(button('멤버십 완료 후 돌아가기'));
}

it('설정에서 선택 취소·실패·재시도·성공 후 같은 계정과 원래 화면으로 복귀한다', async () => {
  const { auth, user, source } = await setup(
    createMockMembershipSource({ records: [], delayMs: 20, scenario: 'fail-once' }),
  );
  const revision = auth.getSnapshot().revision;
  await settings(user);
  await user.press(button('Membership and payment'));
  await user.press(screen.getByRole('radio', { name: 'Pay annually' }));
  await user.press(button('멤버십 닫기'));
  expect(source.getSnapshot()).toEqual([]);
  await user.press(button('Membership and payment'));
  expect(screen.getByRole('radio', { name: 'Pay monthly' })).toBeChecked();
  await user.press(screen.getByRole('radio', { name: 'Pay annually' }));
  await user.press(button('Member 모의 선택'));
  await flush();
  expect(screen.getByRole('alert')).toHaveTextContent(/다시 시도/);
  expect(screen.getByRole('radio', { name: 'Pay annually' })).toBeChecked();
  await user.press(button('Member 모의 선택'));
  await finish(user);
  expect(screen.getByRole('heading', { name: '설정' })).toBeVisible();
  expect(screen.getByLabelText('현재 멤버십 상태')).toHaveTextContent(/member/);
  expect(auth.getSnapshot()).toMatchObject({ user: { id: mockUserA.id }, revision });
  await user.press(button('Membership and payment'));
  await user.press(screen.getByRole('radio', { name: 'Pay annually' }));
  expect(button('Member 모의 선택')).toBeDisabled();
});

it('무료 계정의 Listen→구독→같은 기사와 Friend 링크→업그레이드는 같은 권한을 사용한다', async () => {
  const { user, source, adapter } = await setup();
  await user.press(button(/^ChatGPT Is Poisoning/));
  await flush();
  await user.press(button('Listen'));
  expect(screen.queryByLabelText('오디오 플레이어')).toBeNull();
  await user.press(button('Member 모의 선택'));
  await finish(user);
  expect(screen.getByRole('heading', { name: /^ChatGPT Is Poisoning/ })).toBeVisible();
  await user.press(button('Listen'));
  await flush();
  expect(button(/^플레이어 확장:/)).toBeVisible();
  await user.press(button('Share story'));
  await user.press(button('Friend Link...'));
  await user.press(button('Friend 멤버십 보기'));
  await user.press(button('Friend 모의 선택'));
  await finish(user);
  await user.press(button('Friend Link...'));
  expect(adapter.copy).toHaveBeenCalledWith(
    'https://kostolany.invalid/article/medium-brain?preview=friend',
    expect.any(AbortSignal),
  );
  expect(source.getSnapshot()[0]?.tier).toBe('friend');
});

it('A 적용 중 B 전환·같은 A 재로그인·source 교체는 이전 시트와 미확정 권한을 복원하지 않는다', async () => {
  const source = createMockMembershipSource({ records: [], delayMs: 8000 });
  const { auth, user, replace } = await setup(source);
  await settings(user);
  await user.press(button('Become a Friend of Medium'));
  await user.press(button('Friend 모의 선택'));
  async function switchTo(id: string) {
    await act(async () => {
      auth.openLogout();
      await auth.signOut();
      auth.openLogin({ kind: 'profile' });
      await auth.signIn(id);
    });
    await flush();
  }
  await switchTo(mockUserB.id);
  await act(async () => jest.advanceTimersByTimeAsync(8000));
  expect(source.getSnapshot()).toEqual([]);
  expect(screen.queryByLabelText('멤버십 플랜')).toBeNull();
  await switchTo(mockUserA.id);
  await settings(user);
  await user.press(button('Membership and payment'));
  expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.getByRole('radio', { name: 'Pay monthly' })).toBeChecked();
  await switchTo(mockUserA.id);
  expect(screen.queryByLabelText('멤버십 플랜')).toBeNull();
  await settings(user);
  await user.press(button('Membership and payment'));
  await replace(createMockMembershipSource());
  expect(screen.queryByLabelText('멤버십 플랜')).toBeNull();
  await replace(source);
  expect(screen.queryByLabelText('멤버십 플랜')).toBeNull();
});
