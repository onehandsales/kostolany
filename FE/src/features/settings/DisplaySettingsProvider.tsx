import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

import { ThemeProvider } from '../../shared/theme/ThemeProvider';
import { createDisplaySettingsStore, type DisplaySettingsStore } from './createDisplaySettingsStore';
import { createMockDisplaySettingsSource } from './data/createMockDisplaySettingsSource';
import { displayPreviewScenario } from './data/displayPreview';
import { defaultDisplaySettings, type DisplaySettingsSource, type DisplaySnapshot } from './displayTypes';

const Context = createContext<DisplaySettingsStore | null>(null);
const empty: DisplaySnapshot = { settings: defaultDisplaySettings, readStatus: 'ready', isSaving: false, hasSaveError: false };
const getEmpty = () => empty;
const subscribeEmpty = () => () => undefined;
type DisplaySettingsProviderProps = { children: ReactNode; userId: string | null; source?: DisplaySettingsSource };
type DisplayThemeProps = { children: ReactNode };
type ReaderThemeProps = { children: ReactNode };

export function DisplaySettingsProvider({ children, userId, source }: DisplaySettingsProviderProps) {
  const [defaultSource] = useState(() => createMockDisplaySettingsSource({
    delayMs: displayPreviewScenario === 'slow' ? 4000 : 150,
    failReadOnce: displayPreviewScenario === 'read-error',
    failSaveOnce: displayPreviewScenario === 'save-error',
  }));
  const currentSource = source ?? defaultSource;
  const [scope, setScope] = useState(() => ({ source: currentSource, stores: new Map<string, DisplaySettingsStore>() }));
  if (scope.source !== currentSource) {
    setScope({ source: currentSource, stores: new Map() });
    return null;
  }
  const owner = JSON.stringify(userId);
  let store = scope.stores.get(owner);
  if (!store) {
    store = createDisplaySettingsStore(currentSource, owner);
    scope.stores.set(owner, store);
  }
  return <Context.Provider value={store}><DisplayTheme>{children}</DisplayTheme></Context.Provider>;
}

function DisplayTheme({ children }: DisplayThemeProps) {
  const { state } = useDisplaySettings();
  return <ThemeProvider mode={state.settings.appTheme}>{children}</ThemeProvider>;
}

export function ReaderTheme({ children }: ReaderThemeProps) {
  const { state } = useDisplaySettings();
  // 기사 System은 앱의 유효 테마를 따르는 모의 정책이며 원본의 전역 영향은 아직 확인되지 않았다.
  return <ThemeProvider mode={state.settings.readerTheme === 'system' ? state.settings.appTheme : state.settings.readerTheme}>{children}</ThemeProvider>;
}

export function useDisplaySettings() {
  const store = useContext(Context);
  const state = useSyncExternalStore(store?.subscribe ?? subscribeEmpty, store?.getSnapshot ?? getEmpty, store?.getSnapshot ?? getEmpty);
  useEffect(() => { store?.ensureLoaded(); }, [store]);
  return { state, store };
}
