import type { NotificationScenario } from './createMockNotificationSource';

// 장애 검증 때만 바꾸고 작업 종료 전에 normal로 복원한다.
export const notificationPreviewScenario: NotificationScenario = 'normal';
