import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

import { defaultExplanationLevel, type ExplanationPreference } from '../article/explanationTypes';
import { createReadingSettingsStore, type ReadingSettingsStore } from './createReadingSettingsStore';
import { createMockReadingSettingsSource } from './data/createMockReadingSettingsSource';
import { settingsPreviewScenario } from './data/settingsPreview';
import type { ReadingSettingsSnapshot, ReadingSettingsSource } from './types';
import { ReadScopeBoundary } from '../../shared/state/ReadScopeBoundary';

const SettingsContext = createContext<ReadingSettingsStore | null>(null);
const SettingsScopeContext = createContext('unprovided');
const empty: ReadingSettingsSnapshot = { settings: null, readStatus: 'idle', isSaving: false, hasSaveError: false };
const getEmpty = () => empty;
const subscribeEmpty = () => () => undefined;
type ReadingSettingsProviderProps = {
  children: ReactNode; userId: string | null; sessionRevision: number; source?: ReadingSettingsSource;
};

export function ReadingSettingsProvider({ children, userId, sessionRevision, source }: ReadingSettingsProviderProps) {
  const [defaultSource] = useState(() => createMockReadingSettingsSource({ scenario: settingsPreviewScenario }));
  const currentSource = source ?? defaultSource;
  const [scope, setScope] = useState(() => ({ source: currentSource, version: 0, stores: new Map<string, ReadingSettingsStore>() }));
  if (scope.source !== currentSource) {
    setScope({ source: currentSource, version: scope.version + 1, stores: new Map() });
    return null;
  }
  let store = userId ? scope.stores.get(userId) ?? null : null;
  if (userId && !store) {
    store = createReadingSettingsStore(currentSource, userId);
    scope.stores.set(userId, store);
  }
  // 이름과 설정 값은 세션 키에 넣지 않아 개인 저장소와 공개 읽기 화면을 초기화하지 않는다.
  const sessionScope = JSON.stringify([scope.version, userId, sessionRevision]);
  return <SettingsScopeContext.Provider value={sessionScope}>
    <SettingsContext.Provider value={store}><ReadScopeBoundary store={store} scope={sessionScope} />{children}</SettingsContext.Provider>
  </SettingsScopeContext.Provider>;
}

export function useReadingSettings(): { state: ReadingSettingsSnapshot; store: ReadingSettingsStore | null } {
  const store = useContext(SettingsContext);
  const scope = useSettingsScopeKey();
  const raw = useSyncExternalStore(store?.subscribe ?? subscribeEmpty, store?.getSnapshot ?? getEmpty, store?.getSnapshot ?? getEmpty);
  const state = store && store.getReadScope() !== scope
    ? { ...raw, readStatus: raw.settings ? 'ready' as const : 'idle' as const, hasSaveError: false } : raw;
  useEffect(() => { store?.ensureLoaded(); }, [store, scope]);
  return { state, store };
}
export function useSettingsScopeKey(): string { return useContext(SettingsScopeContext); }

export function useExplanationPreference(): ExplanationPreference {
  const { state, store } = useReadingSettings();
  const scopeKey = useSettingsScopeKey();
  if (!store) return { scopeKey, status: 'ready', level: defaultExplanationLevel };
  if (state.settings) return { scopeKey, status: 'ready', level: state.settings.defaultLevel };
  return { scopeKey, status: state.readStatus === 'error' ? 'error' : 'loading', onRetry: store.reload };
}
