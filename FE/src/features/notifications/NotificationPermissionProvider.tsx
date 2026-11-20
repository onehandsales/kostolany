import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { AppState } from 'react-native';
import type { NotificationPermissionSource } from '../onboarding/notificationPermission';
import { createNotificationPermissionAdapter } from './notificationPermissionAdapter';

const Context = createContext<NotificationPermissionSource | null>(null);
export function NotificationPermissionProvider({ children, source }: { children: ReactNode; source?: NotificationPermissionSource }) {
  const [fallback] = useState(createNotificationPermissionAdapter);
  const current = source ?? fallback;
  // 앱 복귀 시 조회만 수행하며 화면 진입과 계정 변경은 OS 프롬프트를 발생시키지 않는다.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') void Promise.resolve().then(() => current.refresh?.()).catch(() => {});
    });
    return () => subscription.remove();
  }, [current]);
  return <Context.Provider value={current}>{children}</Context.Provider>;
}
export const useNotificationPermission = () => useContext(Context);
