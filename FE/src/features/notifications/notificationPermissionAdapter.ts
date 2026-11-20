import type { NotificationPermissionSource } from '../onboarding/notificationPermission';

// 웹 파일/알림 API 성공을 모바일 OS 권한으로 표현하지 않는다.
export function createNotificationPermissionAdapter(): NotificationPermissionSource {
  return { kind: 'unsupported', read: () => 'unsupported', refresh: async () => 'unsupported', request: async () => 'unsupported' };
}
