import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { createMockNotificationSource } from './createMockNotificationSource';
import { createNotificationStore, type NotificationStore } from './createNotificationStore';
import type { NotificationSource } from './types';
import { notificationPreviewScenario } from './notificationPreview';

const Context = createContext<{ store: NotificationStore | null; scope: string }>({ store: null, scope: '' });
export function NotificationProvider({ children, source }: { children: ReactNode; source?: NotificationSource }) {
  const { state: auth } = useAuth();
  const [fallback] = useState(() => createMockNotificationSource({ scenario: notificationPreviewScenario }));
  const current = source ?? fallback;
  const [boundary, setBoundary] = useState({ source: current, generation: 0 });
  const userId = auth.user?.id ?? null;
  const store = useMemo(() => userId ? createNotificationStore(current, userId, auth.revision) : null, [current, userId, auth.revision]);
  useEffect(() => store?.activate(), [store]);
  if (boundary.source !== current) { setBoundary({ source: current, generation: boundary.generation + 1 }); return null; }
  return <Context.Provider value={{ store, scope: JSON.stringify([userId, auth.revision, boundary.generation]) }}>{children}</Context.Provider>;
}
const noop = () => () => {};
export function useNotifications() {
  const context = useContext(Context);
  const snapshot = () => context.store?.getSnapshot() ?? null;
  const state = useSyncExternalStore(context.store?.subscribe ?? noop, snapshot, snapshot);
  return { ...context, state };
}
