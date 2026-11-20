import { Linking, Platform } from 'react-native';
import { requireOptionalNativeModule } from 'expo-modules-core';
import type { NotificationPermissionsModule } from 'expo-notifications/build/NotificationPermissionsModule.types';
import type { NotificationChannelManager } from 'expo-notifications/build/NotificationChannelManager.types';
import type { NotificationPermission, NotificationPermissionSource } from '../onboarding/notificationPermission';

type PermissionResult = { granted: boolean; status: string; ios?: { status: number } };
export function mapNotificationPermission(result: PermissionResult): NotificationPermission {
  // iOS provisional/ephemeral도 시스템이 허용한 범위이며 원격 전송 등록과는 무관하다.
  if (result.granted || result.ios?.status === 3 || result.ios?.status === 4) return 'granted';
  if (result.status === 'denied') return 'denied';
  if (result.status === 'undetermined') return 'undetermined';
  throw new Error('Invalid OS notification permission');
}
type PermissionPort = Pick<NotificationPermissionsModule, 'getPermissionsAsync' | 'requestPermissionsAsync'>;
type ChannelPort = Pick<NotificationChannelManager, 'setNotificationChannelAsync'>;
export function createNotificationPermissionAdapter(ports: { permissions?: PermissionPort | null; channels?: ChannelPort | null } = {}): NotificationPermissionSource {
  // 이전 native binary에 모듈이 없으면 앱 시작을 깨뜨리지 않고 미지원으로 안내한다.
  const permissions = ports.permissions === undefined ? requireOptionalNativeModule<PermissionPort>('ExpoNotificationPermissionsModule') : ports.permissions;
  const channels = ports.channels === undefined && Platform.OS === 'android' ? requireOptionalNativeModule<ChannelPort>('ExpoNotificationChannelManager') : ports.channels;
  const readPermission = permissions?.getPermissionsAsync; const requestPermission = permissions?.requestPermissionsAsync;
  const createChannel = channels?.setNotificationChannelAsync;
  if (!readPermission || !requestPermission || (Platform.OS === 'android' && !createChannel))
    return { kind: 'unsupported', read: () => 'unsupported', refresh: async () => 'unsupported', request: async () => 'unsupported' };
  let current: NotificationPermission = 'undetermined'; let revision = 0; let requesting = false;
  let refreshing: { revision: number; result: Promise<NotificationPermission> } | undefined;
  const readCurrent = async () => {
    if (requesting) return current;
    if (refreshing?.revision === revision) return refreshing.result;
    const request = ++revision;
    const result = Promise.resolve().then(readPermission).then(value => {
      const next = mapNotificationPermission(value);
      if (request === revision) current = next;
      return current;
    });
    // 같은 foreground 복귀를 구독하는 화면과 공급부가 하나의 OS 조회를 공유한다.
    refreshing = { revision: request, result };
    try { return await result; }
    finally { if (refreshing?.revision === request) refreshing = undefined; }
  };
  return {
    kind: 'native', read: () => current, refresh: readCurrent, openSettings: () => Linking.openSettings(),
    async request(signal) {
      if (requesting || signal.aborted) throw new Error('Permission request unavailable');
      requesting = true; const request = ++revision;
      try {
        const before = mapNotificationPermission(await readPermission());
        if (signal.aborted) throw new Error('Cancelled permission request');
        if (before !== 'undetermined') { current = before; return current; }
        if (Platform.OS === 'android') {
          await createChannel?.('reading-preferences', { name: 'Reading updates', importance: 3 });
        }
        if (signal.aborted) throw new Error('Cancelled permission request');
        const value = mapNotificationPermission(await requestPermission(Platform.OS === 'ios' ? { allowAlert: true, allowBadge: true, allowSound: true } : {}));
        // OS 권한은 계정 이탈로 되돌릴 수 없으므로 계정 저장은 호출부의 수명 검사로 별도 보호한다.
        if (request === revision) current = value;
        return current;
      } finally { requesting = false; }
    },
  };
}
