import { sortNotifications, validateInbox, validatePreferences, validPreference,
  type InboxResponse, type NotificationPreferences, type NotificationSource, type PreferenceChange,
  type PreferenceKey, type PreferenceResponse, type PreferenceValue } from './types';

type PendingPreference = { change: PreferenceChange; operationId: string; failed: boolean };
export type NotificationSnapshot = {
  inbox: InboxResponse | null; preferences: PreferenceResponse | null;
  inboxLoading: boolean; preferencesLoading: boolean; inboxError: boolean; preferencesError: boolean;
  edits: Partial<Record<PreferenceKey, PendingPreference>>; reading: readonly string[]; readErrors: readonly string[];
};

// 계정·인증 revision마다 새 저장소를 만들고 확정 데이터는 주입된 공급부에만 보관한다.
export function createNotificationStore(source: NotificationSource, userId: string, revision = 0) {
  let state: NotificationSnapshot = { inbox: null, preferences: null, inboxLoading: false, preferencesLoading: false,
    inboxError: false, preferencesError: false, edits: {}, reading: [], readErrors: [] };
  const listeners = new Set<() => void>();
  let lifetime = new AbortController(); let active = false; let sequence = 0; let inboxRequest = 0; let prefsRequest = 0;
  let writing = new Set<PreferenceKey>(); const readOperations = new Map<string, string>();
  const prefix = `${userId}:${revision}:${Date.now()}:${Math.random()}`;
  const operation = () => `${prefix}:${++sequence}`;
  const publish = (next: Partial<NotificationSnapshot>) => { state = { ...state, ...next }; listeners.forEach(listener => listener()); };
  function acceptPreferences(value: PreferenceResponse) {
    validatePreferences(value, userId);
    if (!state.preferences || value.version >= state.preferences.version) publish({ preferences: value });
  }
  function acceptInbox(value: InboxResponse) {
    validateInbox(value, userId);
    if (!state.inbox || value.version >= state.inbox.version) publish({ inbox: { ...value, notifications: sortNotifications(value.notifications) } });
  }
  async function loadInbox() {
    if (!active || state.inboxLoading) return;
    const id = ++inboxRequest; const signal = lifetime.signal;
    publish({ inboxLoading: true, inboxError: false });
    try {
      const value = await source.readInbox(userId, signal);
      if (signal.aborted || id !== inboxRequest) return;
      acceptInbox(value); publish({ inboxLoading: false });
    } catch {
      if (!signal.aborted && id === inboxRequest) publish({ inboxLoading: false, inboxError: true });
    }
  }
  async function loadPreferences() {
    if (!active || state.preferencesLoading) return;
    const id = ++prefsRequest; const signal = lifetime.signal;
    publish({ preferencesLoading: true, preferencesError: false });
    try {
      const value = await source.readPreferences(userId, signal);
      if (signal.aborted || id !== prefsRequest) return;
      acceptPreferences(value); publish({ preferencesLoading: false });
    } catch {
      if (!signal.aborted && id === prefsRequest) publish({ preferencesLoading: false, preferencesError: true });
    }
  }
  async function flush(key: PreferenceKey) {
    if (!active || writing.has(key)) return;
    const entry = state.edits[key]; if (!entry) return;
    const signal = lifetime.signal; const currentWrites = writing; currentWrites.add(key);
    try {
      const value = await source.savePreference(userId, entry.change, entry.operationId, signal);
      if (signal.aborted) return;
      validatePreferences(value, userId);
      if (value.preferences[key] !== entry.change.value) throw new Error('Mismatched preference result');
      prefsRequest++;
      publish({ preferencesLoading: false, preferencesError: false });
      acceptPreferences(value);
      if (state.edits[key] === entry) {
        const edits = { ...state.edits }; delete edits[key]; publish({ edits });
      }
    } catch {
      if (!signal.aborted && state.edits[key] === entry) publish({ edits: { ...state.edits, [key]: { ...entry, failed: true } } });
    } finally {
      currentWrites.delete(key);
      // 같은 항목만 직렬화하고 실행 중 바뀐 마지막 선택을 후속 명령으로 보낸다.
      if (!signal.aborted && state.edits[key] && state.edits[key] !== entry && !state.edits[key]?.failed) void flush(key);
    }
  }
  async function markRead(id: string) {
    if (!active || state.reading.includes(id) || state.inbox?.notifications.find(item => item.id === id)?.read) return;
    if (!state.inbox?.notifications.some(item => item.id === id)) return;
    const signal = lifetime.signal; const operationId = readOperations.get(id) ?? operation(); readOperations.set(id, operationId);
    publish({ reading: [...state.reading, id], readErrors: state.readErrors.filter(value => value !== id) });
    try {
      const value = await source.markRead(userId, id, operationId, signal);
      if (signal.aborted) return;
      validateInbox(value, userId);
      if (!value.notifications.find(item => item.id === id)?.read) throw new Error('Mismatched read receipt');
      inboxRequest++;
      publish({ inboxLoading: false, inboxError: false });
      acceptInbox(value); readOperations.delete(id);
    } catch {
      if (!signal.aborted) publish({ readErrors: [...state.readErrors.filter(value => value !== id), id] });
    } finally {
      if (!signal.aborted) publish({ reading: state.reading.filter(value => value !== id) });
    }
  }
  return {
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    getSnapshot: () => state,
    activate() {
      active = true; lifetime = new AbortController();
      // 재활성화한 수명에서 이전 명령의 잠금과 화면 초안이 새 요청을 막지 않게 한다.
      writing = new Set<PreferenceKey>(); readOperations.clear();
      publish({ inboxLoading: false, preferencesLoading: false, edits: {}, reading: [], readErrors: [],
        inboxError: false, preferencesError: false });
      void loadInbox(); void loadPreferences();
      return () => { active = false; lifetime.abort(); inboxRequest++; prefsRequest++; };
    },
    loadInbox, loadPreferences, markRead,
    ensureInbox() { if (!state.inbox && !state.inboxError) void loadInbox(); },
    ensurePreferences() { if (!state.preferences && !state.preferencesError) void loadPreferences(); },
    setPreference(change: PreferenceChange) {
      if (!active || !state.preferences || !validPreference(change.key, change.value)) return;
      const previous = state.edits[change.key];
      if (previous?.change.value === change.value && !previous.failed) return;
      if (!previous && state.preferences.preferences[change.key] === change.value) return;
      publish({ edits: { ...state.edits, [change.key]: { change, operationId: operation(), failed: false } } });
      void flush(change.key);
    },
    retryPreference(key: PreferenceKey) {
      const entry = state.edits[key]; if (!active || !entry?.failed || writing.has(key)) return;
      publish({ edits: { ...state.edits, [key]: { ...entry, failed: false } } }); void flush(key);
    },
  };
}
export type NotificationStore = ReturnType<typeof createNotificationStore>;
export function displayedPreference<K extends PreferenceKey>(state: NotificationSnapshot, key: K): NotificationPreferences[K] | undefined {
  return (state.edits[key]?.change.value ?? state.preferences?.preferences[key]) as NotificationPreferences[K] | undefined;
}
export function preferenceChange(key: PreferenceKey, value: PreferenceValue): PreferenceChange {
  if (!validPreference(key, value)) throw new Error('Invalid preference choice');
  return { key, value } as PreferenceChange;
}
