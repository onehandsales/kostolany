import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

import { createAuthStore, type AuthStore } from './createAuthStore';
import { createMockAuthSource } from './data/createMockAuthSource';
import type { AuthSnapshot, AuthSource, AuthUser } from './types';

const AuthContext = createContext<AuthStore | null>(null);

type AuthProviderProps = {
  children: ReactNode; source?: AuthSource; initialUser?: AuthUser | null;
};

export function AuthProvider({ children, source, initialUser = null }: AuthProviderProps) {
  const [fallback] = useState(createMockAuthSource); const current = source ?? fallback;
  const [boundary, setBoundary] = useState(() => ({ source: current, store: createAuthStore(current, initialUser) }));
  useEffect(() => () => boundary.store.cancelPending(), [boundary.store]);
  if (boundary.source !== current) {
    const previous = boundary.store.getSnapshot(); boundary.store.invalidate();
    setBoundary({ source: current, store: createAuthStore(current, previous.user, previous.revision + 1) }); return null;
  }
  return <AuthContext.Provider value={boundary.store}>{children}</AuthContext.Provider>;
}

export function useAuth(): { state: AuthSnapshot; store: AuthStore } {
  const store = useContext(AuthContext);
  if (!store) throw new Error('AuthProvider is required');
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return { state, store };
}
