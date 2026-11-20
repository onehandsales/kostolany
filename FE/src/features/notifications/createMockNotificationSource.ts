import { notificationFixtures } from './notificationFixtures';
import { defaultNotificationPreferences, validateInbox, validatePreferences, validPreference,
  type InboxResponse, type NotificationSource, type PreferenceResponse, type ReaderNotification } from './types';

export type NotificationScenario = 'normal' | 'empty' | 'read-error' | 'save-error' | 'slow';
export function createMockNotificationSource({ delayMs = 100, scenario = 'normal', seed = notificationFixtures }: {
  delayMs?: number; scenario?: NotificationScenario; seed?: (userId: string) => readonly ReaderNotification[];
} = {}): NotificationSource & { receive: (userId: string, event: ReaderNotification) => void } {
  const inboxes = new Map<string, InboxResponse>(); const preferences = new Map<string, PreferenceResponse>();
  const operations = new Map<string, string>(); const failures = new Set<string>();
  const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));
  function inbox(userId: string) {
    let value = inboxes.get(userId);
    if (!value) {
      value = { userId, version: 0, notifications: scenario === 'empty' ? [] : seed(userId) };
      validateInbox(value, userId); inboxes.set(userId, clone(value));
    }
    return inboxes.get(userId)!;
  }
  function prefs(userId: string) {
    let value = preferences.get(userId);
    if (!value) { value = { userId, version: 0, preferences: { ...defaultNotificationPreferences } }; preferences.set(userId, value); }
    return value;
  }
  async function wait(signal: AbortSignal, key: string, writing = false) {
    if (signal.aborted) throw new Error('Cancelled notification request');
    await new Promise<void>(resolve => setTimeout(resolve, scenario === 'slow' ? 2000 : delayMs));
    if (signal.aborted) throw new Error('Cancelled notification request');
    if (((scenario === 'read-error' && !writing) || (scenario === 'save-error' && writing)) && !failures.has(key)) {
      failures.add(key); throw new Error('Mock notification failure');
    }
  }
  function duplicate(userId: string, operationId: string, payload: string): boolean {
    const key = JSON.stringify([userId, operationId]); const previous = operations.get(key);
    if (previous && previous !== payload) throw new Error('Reused notification operation');
    if (previous) return true;
    operations.set(key, payload); return false;
  }
  return {
    async readInbox(userId, signal) { const result = clone(inbox(userId)); await wait(signal, `${userId}:inbox`); return result; },
    async readPreferences(userId, signal) { const result = clone(prefs(userId)); await wait(signal, `${userId}:preferences`); return result; },
    async savePreference(userId, change, operationId, signal) {
      if (!validPreference(change.key, change.value)) throw new Error('Invalid preference command');
      await wait(signal, `${userId}:${change.key}`, true);
      const value = prefs(userId);
      if (!duplicate(userId, operationId, JSON.stringify(change))) {
        const next = { ...value, version: value.version + 1, preferences: { ...value.preferences, [change.key]: change.value } };
        validatePreferences(next, userId); preferences.set(userId, next);
      }
      return clone(prefs(userId));
    },
    async markRead(userId, id, operationId, signal) {
      await wait(signal, `${userId}:read:${id}`, true);
      const value = inbox(userId);
      if (!value.notifications.some(item => item.id === id)) throw new Error('Missing notification');
      if (!duplicate(userId, operationId, JSON.stringify(['read', id]))) inboxes.set(userId, {
        ...value, version: value.version + 1, notifications: value.notifications.map(item => item.id === id ? { ...item, read: true } : item),
      });
      return clone(inbox(userId));
    },
    receive(userId, event) {
      const value = inbox(userId);
      // 재조회·계정 복귀는 이벤트를 만들지 않으며 같은 수신자와 이벤트는 한 번만 수록한다.
      if (value.notifications.some(item => item.eventId === event.eventId)) return;
      const next = { userId, version: value.version + 1, notifications: [...value.notifications, event] };
      validateInbox(next, userId); inboxes.set(userId, clone(next));
    },
  };
}
