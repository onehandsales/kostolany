// 수신 계정·이벤트·목적지와 화면 표시 문자열을 분리한다.
export type NotificationTarget =
  | { kind: 'writer'; id: string }
  | { kind: 'article'; id: string }
  | { kind: 'list'; id: string; ownerId: string }
  | { kind: 'response'; articleId: string; responseId: string };
export type ReaderNotification = Readonly<{
  id: string; eventId: string; recipientId: string; actorId: string; actorName: string;
  kind: 'follow' | 'list-story' | 'clap' | 'response' | 'mention';
  subject: string; target: NotificationTarget; occurredAt: string; read: boolean;
}>;
export type TailoredChoice = 'tailored' | 'all' | 'off';
export type DigestFrequency = 'daily' | 'weekly' | 'off';
export type NotificationPreferences = {
  digestPush: boolean; topStory: boolean; editors: boolean; featured: boolean; applause: boolean; saves: boolean;
  writers: TailoredChoice; claps: TailoredChoice; highlights: TailoredChoice; responses: TailoredChoice; mentions: TailoredChoice;
  emailEnabled: boolean; emailDigest: boolean; emailWriters: boolean; emailSocial: boolean;
  digestFrequency: DigestFrequency; emailFrequency: DigestFrequency;
};
export type PreferenceKey = keyof NotificationPreferences;
export type PreferenceValue = NotificationPreferences[PreferenceKey];
export type PreferenceChange = { [K in PreferenceKey]: { key: K; value: NotificationPreferences[K] } }[PreferenceKey];
export type PreferenceResponse = { userId: string; version: number; preferences: NotificationPreferences };
export type InboxResponse = { userId: string; version: number; notifications: readonly ReaderNotification[] };
export type NotificationSource = {
  readInbox: (userId: string, signal: AbortSignal) => Promise<InboxResponse>;
  readPreferences: (userId: string, signal: AbortSignal) => Promise<PreferenceResponse>;
  savePreference: (userId: string, change: PreferenceChange, operationId: string, signal: AbortSignal) => Promise<PreferenceResponse>;
  markRead: (userId: string, notificationId: string, operationId: string, signal: AbortSignal) => Promise<InboxResponse>;
};
export const defaultNotificationPreferences: NotificationPreferences = {
  digestPush: true, topStory: true, editors: true, featured: true, applause: true, saves: true,
  writers: 'tailored', claps: 'tailored', highlights: 'tailored', responses: 'tailored', mentions: 'tailored',
  emailEnabled: true, emailDigest: true, emailWriters: true, emailSocial: true,
  digestFrequency: 'daily', emailFrequency: 'daily',
};
export const preferenceKeys = Object.keys(defaultNotificationPreferences) as PreferenceKey[];
export function validPreference(key: PreferenceKey, value: PreferenceValue): boolean {
  const original = defaultNotificationPreferences[key];
  return typeof original === 'boolean' ? typeof value === 'boolean'
    : original === 'tailored' ? ['tailored', 'all', 'off'].includes(String(value))
      : ['daily', 'weekly', 'off'].includes(String(value));
}
export function validatePreferences(value: PreferenceResponse, userId: string): void {
  if (!value || value.userId !== userId || !Number.isSafeInteger(value.version) || value.version < 0
    || !value.preferences || preferenceKeys.some(key => !validPreference(key, value.preferences[key])))
    throw new Error('Invalid notification preferences');
}
export function validNotificationTarget(target: NotificationTarget): boolean {
  if (!target) return false;
  const id = (value: string) => typeof value === 'string' && Boolean(value.trim());
  switch (target.kind) {
    case 'writer': case 'article': return id(target.id);
    case 'list': return id(target.id) && id(target.ownerId);
    case 'response': return id(target.articleId) && id(target.responseId);
    default: return false;
  }
}
export function validateInbox(value: InboxResponse, userId: string): void {
  if (!value || value.userId !== userId || !Number.isSafeInteger(value.version) || value.version < 0
    || !Array.isArray(value.notifications)) throw new Error('Invalid inbox');
  const ids = new Set<string>(); const events = new Set<string>();
  for (const item of value.notifications) {
    if (!item || item.recipientId !== userId || !item.id || !item.eventId || ids.has(item.id) || events.has(item.eventId)
      || !item.actorId || !item.actorName || typeof item.subject !== 'string' || typeof item.read !== 'boolean'
      || !['follow', 'list-story', 'clap', 'response', 'mention'].includes(item.kind)
      || !/Z$/.test(item.occurredAt) || !Number.isFinite(Date.parse(item.occurredAt))) throw new Error('Invalid notification');
    // 잘못된 목적지는 행을 남겨 복구 안내하며 민감한 대상 내용은 조회하지 않는다.
    ids.add(item.id); events.add(item.eventId);
  }
}
export function sortNotifications(items: readonly ReaderNotification[]): ReaderNotification[] {
  return [...items].sort((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt) || a.id.localeCompare(b.id, 'en'));
}
// 시계는 호출부가 주입하며 하루가 지난 이벤트는 UTC 달력 날짜로 표시한다.
export function notificationTime(occurredAt: string, now: number): string {
  const elapsed = Math.max(0, now - Date.parse(occurredAt));
  if (elapsed < 60_000) return 'Just now';
  if (elapsed < 3_600_000) return `${Math.floor(elapsed / 60_000)}m ago`;
  if (elapsed < 86_400_000) return `${Math.floor(elapsed / 3_600_000)}h ago`;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(occurredAt));
}
