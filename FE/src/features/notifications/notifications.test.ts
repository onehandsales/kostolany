import { createNotificationStore, displayedPreference } from './createNotificationStore';
import { createMockNotificationSource } from './createMockNotificationSource';
import { notificationFixtures } from './notificationFixtures';
import { defaultNotificationPreferences, notificationTime, sortNotifications, type InboxResponse, type NotificationSource, type PreferenceResponse } from './types';
import { deferred } from '../feed/tests/helpers';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const signal = () => new AbortController().signal;
const tick = async () => { await jest.advanceTimersByTimeAsync(300); };
const preferences = (version = 0): PreferenceResponse => ({ userId: 'a', version, preferences: { ...defaultNotificationPreferences } });

it('같은 수신자·이벤트는 재처리해도 한 행이며 조회·계정 복귀는 새 이벤트를 만들지 않는다', async () => {
  const source = createMockNotificationSource({ delayMs: 0, seed: () => [] });
  const item = { ...notificationFixtures('example-reader')[0]!, recipientId: 'a' };
  source.receive('a', item); source.receive('a', { ...item, id: 'duplicate-id' });
  const first = source.readInbox('a', signal()); await tick(); expect((await first).notifications).toEqual([item]);
  const b = source.readInbox('b', signal()); await tick(); expect((await b).notifications).toEqual([]);
  const again = source.readInbox('a', signal()); await tick(); expect((await again).notifications).toHaveLength(1);
  expect(() => source.receive('a', { ...item, id: 'wrong', eventId: 'different', recipientId: 'b' })).toThrow();
});

it('토글 On→Off→On과 다른 항목 변경은 항목별 직렬화하며 마지막 의도와 확정값을 구분한다', async () => {
  const first = deferred<PreferenceResponse>(); const base = createMockNotificationSource({ delayMs: 0 });
  const save = jest.fn<ReturnType<NotificationSource['savePreference']>, Parameters<NotificationSource['savePreference']>>().mockImplementationOnce(() => first.promise).mockImplementation(base.savePreference);
  const store = createNotificationStore({ ...base, savePreference: save }, 'a'); const stop = store.activate(); await tick();
  store.setPreference({ key: 'topStory', value: false }); store.setPreference({ key: 'topStory', value: true });
  store.setPreference({ key: 'editors', value: false }); await tick();
  expect(displayedPreference(store.getSnapshot(), 'topStory')).toBe(true);
  expect(store.getSnapshot().preferences?.preferences.editors).toBe(false);
  first.resolve({ ...preferences(1), preferences: { ...defaultNotificationPreferences, topStory: false } }); await tick();
  expect(save.mock.calls.filter(call => call[1].key === 'topStory').map(call => call[1].value)).toEqual([false, true]);
  expect(store.getSnapshot().edits).toEqual({}); expect(store.getSnapshot().preferences?.preferences.topStory).toBe(true);
  expect(store.getSnapshot().preferences?.preferences.editors).toBe(false); stop();
});

it('실패한 필드만 선택을 보존하고 같은 명령으로 재시도하며 중복 Save를 만들지 않는다', async () => {
  const base = createMockNotificationSource({ delayMs: 0, scenario: 'save-error' });
  const save = jest.fn(base.savePreference); const store = createNotificationStore({ ...base, savePreference: save }, 'a'); const stop = store.activate(); await tick();
  store.setPreference({ key: 'writers', value: 'off' }); store.setPreference({ key: 'writers', value: 'off' }); await tick();
  expect(save).toHaveBeenCalledTimes(1); expect(store.getSnapshot().edits.writers?.failed).toBe(true);
  expect(store.getSnapshot().preferences?.preferences.writers).toBe('tailored'); expect(displayedPreference(store.getSnapshot(), 'writers')).toBe('off');
  expect(store.getSnapshot().preferences?.preferences.emailWriters).toBe(true);
  store.retryPreference('writers'); store.retryPreference('writers'); await tick();
  expect(save).toHaveBeenCalledTimes(2); expect(save.mock.calls[0]![2]).toBe(save.mock.calls[1]![2]);
  expect(store.getSnapshot().edits).toEqual({}); stop();
});

it.each(['success', 'failure'] as const)('오래된 조회 %s가 새 저장값과 읽음 확정 상태를 덮지 않는다', async outcome => {
  const base = createMockNotificationSource({ delayMs: 0 }); const old = deferred<PreferenceResponse>(); const oldInbox = deferred<InboxResponse>();
  const read = jest.fn(base.readPreferences); const readInbox = jest.fn(base.readInbox);
  const store = createNotificationStore({ ...base, readPreferences: read, readInbox }, 'example-reader'); const stop = store.activate(); await tick();
  const original = store.getSnapshot(); read.mockImplementationOnce(() => old.promise); readInbox.mockImplementationOnce(() => oldInbox.promise);
  void store.loadPreferences(); void store.loadInbox(); store.setPreference({ key: 'digestPush', value: false }); void store.markRead('notice-follow'); await tick();
  if (outcome === 'success') { old.resolve(original.preferences!); oldInbox.resolve(original.inbox!); }
  else { old.reject(new Error('late')); oldInbox.reject(new Error('late')); }
  await tick(); expect(store.getSnapshot().preferences?.preferences.digestPush).toBe(false);
  expect(store.getSnapshot().preferencesError).toBe(false); expect(store.getSnapshot().inboxError).toBe(false);
  expect(store.getSnapshot().inbox?.notifications.find(item => item.id === 'notice-follow')?.read).toBe(true); stop();
});

it.each(['success', 'failure'] as const)('이탈한 A의 늦은 %s와 미저장 선택은 B 및 같은 A 새 저장소에 노출하지 않는다', async outcome => {
  const base = createMockNotificationSource({ delayMs: 0 }); const late = deferred<PreferenceResponse>();
  const a = createNotificationStore({ ...base, savePreference: () => late.promise }, 'a'); const dispose = a.activate(); await tick();
  a.setPreference({ key: 'mentions', value: 'off' }); dispose();
  const b = createNotificationStore(base, 'b'); const stopB = b.activate(); await tick();
  if (outcome === 'success') late.resolve({ ...preferences(2), preferences: { ...defaultNotificationPreferences, mentions: 'off' } });
  else late.reject(new Error('late A')); await tick();
  expect(b.getSnapshot().preferences?.userId).toBe('b'); expect(b.getSnapshot().edits).toEqual({});
  const nextA = createNotificationStore(base, 'a'); const stopA = nextA.activate(); await tick();
  expect(displayedPreference(nextA.getSnapshot(), 'mentions')).toBe('tailored'); expect(nextA.getSnapshot().edits).toEqual({}); stopA(); stopB();
});

it('잘못된 소유자와 변경 결과·동기 예외는 성공으로 취급하지 않고 초안 및 재시도를 유지한다', async () => {
  const base = createMockNotificationSource({ delayMs: 0 });
  const save = jest.fn<ReturnType<NotificationSource['savePreference']>, Parameters<NotificationSource['savePreference']>>()
    .mockImplementationOnce(() => { throw new Error('sync'); })
    .mockResolvedValueOnce({ ...preferences(), userId: 'b' })
    .mockResolvedValueOnce(preferences()).mockImplementation(base.savePreference);
  const store = createNotificationStore({ ...base, savePreference: save }, 'a'); const stop = store.activate(); await tick();
  store.setPreference({ key: 'emailEnabled', value: false }); await tick();
  for (let i = 0; i < 3; i++) { expect(store.getSnapshot().edits.emailEnabled?.failed).toBe(true); store.retryPreference('emailEnabled'); await tick(); }
  expect(store.getSnapshot().preferences?.preferences.emailEnabled).toBe(false); stop();
});

it('읽음 실패·중복 요청·재시도는 같은 알림만 변경하고 이미 확정한 A 데이터는 재로그인 때 남는다', async () => {
  const base = createMockNotificationSource({ delayMs: 0, scenario: 'save-error' }); const mark = jest.fn(base.markRead);
  const store = createNotificationStore({ ...base, markRead: mark }, 'example-reader'); const stop = store.activate(); await tick();
  void store.markRead('notice-follow'); void store.markRead('notice-follow'); await tick();
  expect(mark).toHaveBeenCalledTimes(1); expect(store.getSnapshot().readErrors).toEqual(['notice-follow']);
  void store.markRead('notice-follow'); await tick(); expect(store.getSnapshot().readErrors).toEqual([]); stop();
  const next = createNotificationStore(base, 'example-reader'); const dispose = next.activate(); await tick();
  expect(next.getSnapshot().inbox?.notifications.find(item => item.id === 'notice-follow')?.read).toBe(true);
  expect(next.getSnapshot().inbox?.notifications.find(item => item.id === 'notice-list')?.read).toBe(false); dispose();
});

it('UTC 연도·윤일·미래 시각과 같은 발생 시각은 시간 문구 및 ID 정렬이 안정적이다', () => {
  expect(notificationTime('2024-02-29T23:30:00Z', Date.parse('2024-03-02T00:00:00Z'))).toBe('Feb 29, 2024');
  expect(notificationTime('2024-12-31T23:59:00Z', Date.parse('2025-01-01T00:01:00Z'))).toBe('2m ago');
  expect(notificationTime('2027-01-01T00:00:00Z', Date.parse('2026-01-01T00:00:00Z'))).toBe('Just now');
  const item = notificationFixtures('example-reader')[0]!;
  expect(sortNotifications([{ ...item, id: 'b' }, { ...item, id: 'a' }]).map(value => value.id)).toEqual(['a', 'b']);
});

it('같은 저장소 재활성화는 이전 쓰기·읽음 잠금을 버리고 늦은 완료가 새 명령을 해제하지 않는다', async () => {
  const base = createMockNotificationSource({ delayMs: 0 });
  const oldSave = deferred<PreferenceResponse>(); const oldRead = deferred<InboxResponse>();
  const currentSave = deferred<PreferenceResponse>();
  const save = jest.fn(base.savePreference).mockImplementationOnce(() => oldSave.promise)
    .mockImplementationOnce(() => currentSave.promise);
  const mark = jest.fn(base.markRead).mockImplementationOnce(() => oldRead.promise);
  const store = createNotificationStore({ ...base, savePreference: save, markRead: mark }, 'example-reader');
  const stop = store.activate(); await tick();
  store.setPreference({ key: 'topStory', value: false }); void store.markRead('notice-follow'); stop();
  const stopAgain = store.activate(); await tick();
  expect(store.getSnapshot().edits).toEqual({}); expect(store.getSnapshot().reading).toEqual([]);
  store.setPreference({ key: 'topStory', value: false }); void store.markRead('notice-follow'); await tick();
  expect(save).toHaveBeenCalledTimes(2); expect(mark).toHaveBeenCalledTimes(2);
  oldSave.reject(new Error('old failure')); oldRead.reject(new Error('old read failure')); await tick();
  store.setPreference({ key: 'topStory', value: true });
  expect(save).toHaveBeenCalledTimes(2);
  currentSave.resolve({ userId: 'example-reader', version: 1, preferences: { ...defaultNotificationPreferences, topStory: false } });
  await tick(); expect(save).toHaveBeenCalledTimes(3);
  expect(displayedPreference(store.getSnapshot(), 'topStory')).toBe(true);
  expect(store.getSnapshot().edits).toEqual({}); expect(store.getSnapshot().readErrors).toEqual([]); stopAgain();
});
