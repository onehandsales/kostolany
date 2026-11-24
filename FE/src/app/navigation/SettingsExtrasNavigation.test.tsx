import { useEffect } from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockMembershipSource } from '../../features/membership/createMockMembershipSource';
import { createMockAccountConnectionSource } from '../../features/settings/accountConnectionSource';
import type { AppIconAdapter, DeviceIcon } from '../../features/app-icon/types';
import type { SettingsPlatform } from '../../features/settings/settingsDestinations';
import { deferred } from '../../features/feed/tests/helpers';
import { SessionNavigation } from './AppNavigator';

beforeEach(() => jest.useFakeTimers());
afterEach(async () => {
  await act(async () => jest.runOnlyPendingTimersAsync());
  jest.useRealTimers();
});
const flush = () => act(async () => jest.advanceTimersByTimeAsync(1000));
const button = (name: string | RegExp) => screen.getByRole('button', { name });
function Probe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth();
  useEffect(() => capture(store), [store, capture]);
  return null;
}
async function setup() {
  let auth: AuthStore | undefined;
  let actual: DeviceIcon = { supported: true, applied: 'wordmark-black' };
  const icons: AppIconAdapter = {
    read: jest.fn(async () => actual),
    apply: jest.fn(async (id) => {
      actual = { supported: true, applied: id };
      return actual;
    }),
  };
  const connections = createMockAccountConnectionSource({ delayMs: 10, failures: 1 });
  const platform: SettingsPlatform = {
    open: jest.fn(async () => {}),
    openAppSettings: jest.fn(async () => {}),
  };
  const membership = createMockMembershipSource({ delayMs: 10 });
  const authSource = createMockAuthSource({ delayMs: 0 });
  const tree = (adapter: AppIconAdapter) => (
    <SafeAreaProvider>
      <AuthProvider source={authSource} initialUser={mockUserA}>
        <SessionNavigation
          appIconAdapter={adapter}
          accountConnectionSource={connections}
          settingsPlatform={platform}
          membershipSource={membership}
        />
        <Probe
          capture={(value) => {
            auth = value;
          }}
        />
      </AuthProvider>
    </SafeAreaProvider>
  );
  const view = await render(tree(icons));
  await flush();
  if (!auth) throw new Error('missing auth');
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await flush();
  await user.press(button('설정 열기'));
  return {
    user,
    auth,
    icons,
    connections,
    platform,
    membership,
    replace: (adapter: AppIconAdapter) => view.rerender(tree(adapter)),
  };
}
it('설정 통계·계정·외부 페이지는 실제 경로로 열리고 원래 설정으로 복귀한다', async () => {
  const { user, platform } = await setup();
  await user.press(button('Story stats'));
  await flush();
  expect(screen.getByText('Monthly')).toBeVisible();
  await user.press(button('통계에서 프로필로 돌아가기'));
  expect(screen.getByRole('heading', { name: '설정' })).toBeVisible();
  await user.press(button('Account'));
  expect(screen.getByText(/reader.a@example.test/)).toBeVisible();
  await user.press(button('Account에서 뒤로'));
  await user.press(button('Help'));
  const open = jest.spyOn(platform, 'open');
  open.mockRejectedValueOnce(new Error('blocked'));
  await user.press(button('Help 외부 페이지 열기'));
  expect(screen.getByRole('alert')).toBeVisible();
  await user.press(button('Help 외부 페이지 열기'));
  expect(open).toHaveBeenLastCalledWith('help');
  await user.press(button('Help에서 뒤로'));
  expect(screen.getByRole('heading', { name: '설정' })).toBeVisible();
  await user.press(button('More app controls'));
  await user.press(button('기기 앱 설정 열기'));
  expect(platform.openAppSettings).toHaveBeenCalledTimes(1);
});
it('Facebook 취소·실패·재시도와 계정 복귀는 같은 연결 기준 상태를 사용한다', async () => {
  const { user, auth, connections } = await setup();
  const revision = auth.getSnapshot().revision;
  await user.press(button('Connect Facebook'));
  await user.press(button('Facebook 모의 연결'));
  await user.press(button('Facebook 선택 취소'));
  expect(connections.getSnapshot()).toEqual([]);
  await user.press(button('Facebook 모의 연결'));
  await user.press(button('Facebook 선택 확정'));
  await flush();
  expect(screen.getByRole('alert')).toBeVisible();
  await user.press(button('Facebook 선택 확정'));
  await flush();
  expect(screen.getByText('Connected (mock)')).toBeVisible();
  expect(auth.getSnapshot().revision).toBe(revision);
  await user.press(button('Facebook에서 뒤로'));
  expect(screen.getByText('Connected (mock)')).toBeVisible();
  await act(async () => {
    auth.openLogout();
    await auth.signOut();
    auth.openLogin({ kind: 'profile' });
    await auth.signIn(mockUserB.id);
  });
  await flush();
  expect(connections.getSnapshot().find((item) => item.userId === mockUserB.id)).toBeUndefined();
  expect(connections.getSnapshot()).toContainEqual({ userId: mockUserA.id, facebook: true });
});
it('아이콘 잠금 해제·선택 취소·적용 실패/재시도 후 기기 결과와 계정 자격을 구분한다', async () => {
  const { user, icons } = await setup();
  await user.press(button('Custom app icon'));
  await flush();
  expect(screen.getByRole('radio', { name: '앱 아이콘 Wordmark Black' })).toBeChecked();
  await user.press(button('앱 아이콘 Friend 잠금 해제'));
  await user.press(button('Friend 모의 선택'));
  await flush();
  await user.press(button('멤버십 성공 확인'));
  await user.press(button('멤버십 완료 후 돌아가기'));
  await user.press(screen.getByRole('radio', { name: '앱 아이콘 Friend Tier' }));
  await user.press(button('앱 아이콘 선택 취소'));
  expect(icons.apply).not.toHaveBeenCalled();
  expect(screen.getByRole('radio', { name: '앱 아이콘 Wordmark Black' })).toBeChecked();
  jest.spyOn(icons, 'apply').mockRejectedValueOnce(new Error('os-failed'));
  await user.press(screen.getByRole('radio', { name: '앱 아이콘 Wordmark White' }));
  await user.press(button('선택한 앱 아이콘 적용'));
  expect(screen.getByRole('alert')).toBeVisible();
  expect(screen.getByRole('radio', { name: '앱 아이콘 Wordmark White' })).toBeChecked();
  await user.press(button('선택한 앱 아이콘 적용'));
  expect(screen.getByText(/기기 적용: Wordmark White/)).toBeVisible();
  await user.press(button('Custom app icon에서 뒤로'));
  await user.press(button('Custom app icon'));
  await flush();
  expect(screen.getByRole('radio', { name: '앱 아이콘 Wordmark White' })).toBeChecked();
});
it('source 교체·화면 이탈 뒤 늦은 외부 실패와 미지원 아이콘은 성공으로 표시되지 않는다', async () => {
  const { user, platform, replace } = await setup();
  const pending = deferred<void>();
  platform.open = () => pending.promise;
  await user.press(button('Privacy policy'));
  await user.press(button('Privacy policy 외부 페이지 열기'));
  await user.press(button('Privacy policy에서 뒤로'));
  await act(async () => pending.reject(new Error('late')));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await replace({
    read: async () => ({ supported: false, applied: null }),
    apply: async () => {
      throw new Error('unsupported');
    },
  });
  await user.press(button('Custom app icon'));
  await flush();
  expect(screen.getByText(/OS 앱 아이콘 변경을 지원하지/)).toBeVisible();
});

it.each(['success', 'failure'] as const)('아이콘 적용 중 탭 이탈·복귀 후 늦은 %s는 이전 결과 안내를 열지 않는다', async outcome => {
  const { user, icons } = await setup();
  await user.press(button('Custom app icon')); await flush();
  await user.press(button('앱 아이콘 Friend 잠금 해제'));
  await user.press(button('Friend 모의 선택')); await flush();
  await user.press(button('멤버십 성공 확인')); await user.press(button('멤버십 완료 후 돌아가기'));
  const pending = deferred<DeviceIcon>();
  jest.spyOn(icons, 'apply').mockImplementation(() => pending.promise);
  await user.press(screen.getByRole('radio', { name: '앱 아이콘 Friend Tier' }));
  await user.press(button('선택한 앱 아이콘 적용'));
  await user.press(screen.getByRole('tab', { name: '홈' }));
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  expect(screen.getByRole('heading', { name: 'Custom app icon' })).toBeVisible();
  await act(async () => { if (outcome === 'success') pending.resolve({ supported: true, applied: 'friend' });
    else pending.reject(new Error('old-device-request')); });
  expect(screen.queryByText(/기기가 아이콘 변경을 확인/)).toBeNull();
  expect(screen.queryByText(/적용을 확인하지 못했어요/)).toBeNull();
  expect(screen.getByText(`기기 적용: ${outcome === 'success' ? 'Friend Tier' : 'Wordmark Black'}`)).toBeVisible();
});

it('연결 저장 중 A→B→A와 같은 계정 재로그인은 이전 확인·오류·미확정 연결을 되살리지 않는다', async () => {
  const { user, auth, connections } = await setup();
  const delayed = deferred<void>();
  const original = connections.setFacebook;
  connections.setFacebook = async (...args) => {
    await delayed.promise;
    return original(...args);
  };
  await user.press(button('Connect Facebook'));
  await user.press(button('Facebook 모의 연결'));
  await user.press(button('Facebook 선택 확정'));
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
  await act(async () => delayed.resolve());
  await flush();
  expect(connections.getSnapshot()).toEqual([]);
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await switchTo(mockUserA.id);
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await flush();
  await user.press(button('설정 열기'));
  await user.press(button('Connect Facebook'));
  expect(screen.queryByRole('button', { name: 'Facebook 선택 확정' })).not.toBeOnTheScreen();
  await user.press(button('Facebook 모의 연결'));
  await switchTo(mockUserA.id);
  expect(screen.queryByRole('button', { name: 'Facebook 선택 확정' })).not.toBeOnTheScreen();
});
