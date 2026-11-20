import { waitForOnboarding } from './onboardingSource';

export type NotificationPermission = 'undetermined' | 'granted' | 'denied' | 'unsupported';
export type NotificationPermissionSource = {
  kind?: 'mock' | 'native' | 'unsupported';
  read: () => NotificationPermission;
  refresh?: () => Promise<NotificationPermission>;
  openSettings?: () => Promise<void>;
  request: (signal: AbortSignal) => Promise<NotificationPermission>;
};
export function createMockNotificationPermission(options: {
  initial?: NotificationPermission;
  outcome?: 'granted' | 'denied';
  failures?: number;
  delayMs?: number;
} = {}): NotificationPermissionSource {
  let permission = options.initial ?? 'undetermined';
  let failures = options.failures ?? 0;
  return {
    read: () => permission,
    async request(signal) {
      if (permission !== 'undetermined') return permission;
      await waitForOnboarding(options.delayMs ?? 160, signal);
      if (failures-- > 0) throw new Error('permission-failed');
      permission = options.outcome ?? 'granted';
      return permission;
    },
  };
}
