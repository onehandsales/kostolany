import { Platform } from 'react-native';
import type { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import type { NativeNotificationPermissionsRequest } from 'expo-notifications/build/NotificationPermissions.types';
import type { setNotificationChannelAsync } from 'expo-notifications/build/setNotificationChannelAsync';
import { createNotificationPermissionAdapter, mapNotificationPermission } from './notificationPermissionAdapter.native';
import { deferred } from '../feed/tests/helpers';

jest.mock('expo-notifications', () => { throw new Error('자동 Push 등록이 있는 최상위 모듈을 가져오면 안 된다.'); });
const read = jest.fn<ReturnType<typeof getPermissionsAsync>, Parameters<typeof getPermissionsAsync>>();
const request = jest.fn<ReturnType<typeof requestPermissionsAsync>, [request: NativeNotificationPermissionsRequest]>();
const channel = jest.fn<ReturnType<typeof setNotificationChannelAsync>, Parameters<typeof setNotificationChannelAsync>>();
const adapter = () => createNotificationPermissionAdapter({ permissions: { getPermissionsAsync: read, requestPermissionsAsync: request }, channels: { setNotificationChannelAsync: channel } });
const result = (status: 'undetermined' | 'granted' | 'denied') => ({ status, granted: status === 'granted', expires: 'never', canAskAgain: status === 'undetermined' });
beforeEach(() => { read.mockReset(); request.mockReset(); channel.mockReset(); });

it('진입 조회는 프롬프트 없이 수행하고 사용자 요청에서만 Android 채널과 OS 권한을 요청한다', async () => {
  read.mockResolvedValue(result('undetermined') as Awaited<ReturnType<typeof getPermissionsAsync>>);
  request.mockResolvedValue(result('denied') as Awaited<ReturnType<typeof requestPermissionsAsync>>);
  const source = adapter(); expect(await source.refresh?.()).toBe('undetermined'); expect(request).not.toHaveBeenCalled();
  expect(await source.request(new AbortController().signal)).toBe('denied'); expect(request).toHaveBeenCalledTimes(1);
  expect(channel).toHaveBeenCalledTimes(Platform.OS === 'android' ? 1 : 0);
  read.mockResolvedValue(result('denied') as Awaited<ReturnType<typeof getPermissionsAsync>>);
  await source.request(new AbortController().signal); expect(request).toHaveBeenCalledTimes(1);
});

it('오래된 OS 조회는 새 허용 상태를 덮지 않고 기기 상태는 계정 취소로 초기화하지 않는다', async () => {
  const old = deferred<Awaited<ReturnType<typeof getPermissionsAsync>>>();
  read.mockImplementationOnce(() => old.promise).mockResolvedValue(result('undetermined') as Awaited<ReturnType<typeof getPermissionsAsync>>);
  request.mockResolvedValue(result('granted') as Awaited<ReturnType<typeof requestPermissionsAsync>>);
  const source = adapter(); const loading = source.refresh?.(); await Promise.resolve();
  const controller = new AbortController(); expect(await source.request(controller.signal)).toBe('granted'); controller.abort();
  old.resolve(result('denied') as Awaited<ReturnType<typeof getPermissionsAsync>>); await loading; expect(source.read()).toBe('granted');
});

it('실패·중복 요청·취소와 iOS provisional/ephemeral을 구분한다', async () => {
  const pending = deferred<Awaited<ReturnType<typeof getPermissionsAsync>>>(); read.mockImplementationOnce(() => pending.promise);
  const source = adapter(); const controller = new AbortController(); const operation = source.request(controller.signal);
  await expect(source.request(controller.signal)).rejects.toThrow(); controller.abort();
  pending.resolve(result('undetermined') as Awaited<ReturnType<typeof getPermissionsAsync>>); await expect(operation).rejects.toThrow(); expect(request).not.toHaveBeenCalled();
  read.mockRejectedValueOnce(new Error('native unavailable')); await expect(source.refresh?.()).rejects.toThrow();
  expect(mapNotificationPermission({ granted: false, status: 'undetermined', ios: { status: 3 } })).toBe('granted');
  expect(mapNotificationPermission({ granted: false, status: 'undetermined', ios: { status: 4 } })).toBe('granted');
  expect(() => mapNotificationPermission({ granted: false, status: 'invalid' })).toThrow();
});

it('native 모듈이 없는 binary는 권한 미지원이며 앱을 중단하거나 프롬프트를 열지 않는다', async () => {
  const source = createNotificationPermissionAdapter({ permissions: null, channels: null });
  expect(source.read()).toBe('unsupported'); expect(await source.request(new AbortController().signal)).toBe('unsupported'); expect(request).not.toHaveBeenCalled();
});

it('같은 앱 복귀의 동시 조회는 OS 호출을 공유하고 실패 뒤에는 새로 재시도한다', async () => {
  const pending = deferred<Awaited<ReturnType<typeof getPermissionsAsync>>>();
  read.mockReturnValueOnce(pending.promise).mockResolvedValue(result('denied') as Awaited<ReturnType<typeof getPermissionsAsync>>);
  const source = adapter(); const first = source.refresh?.(); const second = source.refresh?.();
  const settled = Promise.allSettled([first, second]); await Promise.resolve(); expect(read).toHaveBeenCalledTimes(1);
  pending.reject(new Error('lookup failure'));
  expect((await settled).map(value => value.status)).toEqual(['rejected', 'rejected']);
  expect(await source.refresh?.()).toBe('denied'); expect(read).toHaveBeenCalledTimes(2); expect(request).not.toHaveBeenCalled();
});
