import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { AppState } from 'react-native';
import { useAuth } from '../auth/AuthProvider';
import { appIconAdapter } from '../app-icon/appIconAdapter';
import { createAppIconStore, type AppIconStore } from '../app-icon/createAppIconStore';
import type { AppIconAdapter } from '../app-icon/types';
import { createMockAccountConnectionSource, type AccountConnectionSource } from './accountConnectionSource';
import { settingsPlatform } from './settingsPlatform';
import type { SettingsPlatform } from './settingsDestinations';

const Context = createContext<{
  icons: AppIconStore;
  connections: AccountConnectionSource;
  platform: SettingsPlatform;
  scope: string;
  userId: string | null;
} | null>(null);
export function SettingsServicesProvider({
  icons = appIconAdapter,
  connections,
  platform = settingsPlatform,
  children,
}: {
  icons?: AppIconAdapter;
  connections?: AccountConnectionSource;
  platform?: SettingsPlatform;
  children: ReactNode;
}) {
  const [fallback] = useState(createMockAccountConnectionSource);
  const source = connections ?? fallback;
  const auth = useAuth();
  const iconStore = useMemo(() => createAppIconStore(icons), [icons]);
  const [boundary, setBoundary] = useState({ icons, source, platform, generation: 0 });
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      if (status === 'active') void iconStore.refresh();
    });
    return () => subscription.remove();
  }, [iconStore]);
  if (boundary.icons !== icons || boundary.source !== source || boundary.platform !== platform) {
    setBoundary({ icons, source, platform, generation: boundary.generation + 1 });
    return null;
  }
  return (
    <Context.Provider
      value={{
        userId: auth.state.user?.id ?? null,
        icons: iconStore,
        connections: source,
        platform,
        scope: JSON.stringify([auth.state.user?.id, auth.state.revision, boundary.generation]),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useSettingsServices() {
  const context = useContext(Context);
  if (!context) throw new Error('SettingsServicesProvider is required');
  return context;
}

const emptyConnections: readonly import('./accountConnectionSource').AccountConnection[] = [];
const noSubscribe = () => () => {};
export function useAccountFacebook(): boolean {
  const context = useContext(Context);
  const records = useSyncExternalStore(
    context?.connections.subscribe ?? noSubscribe,
    context?.connections.getSnapshot ?? (() => emptyConnections),
    context?.connections.getSnapshot ?? (() => emptyConnections),
  );
  return records.find((record) => record.userId === context?.userId)?.facebook ?? false;
}
