import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from 'react';

import { createAuthStore, type AuthStore } from './createAuthStore';
import { createMockAuthSource } from './data/createMockAuthSource';
import type { AuthSnapshot, AuthSource, AuthUser } from './types';

const AuthContext = createContext<AuthStore | null>(null);

type AuthProviderProps = {
  children: ReactNode; source?: AuthSource; initialUser?: AuthUser | null;
};

export function AuthProvider({ children, source, initialUser = null }: AuthProviderProps) {
  // 초기 사용자와 공급부는 앱 실행 단위로 고정하며 사용자 변경은 인증 명령으로만 처리한다.
  const [store] = useState(() => createAuthStore(source ?? createMockAuthSource(), initialUser));
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}

export function useAuth(): { state: AuthSnapshot; store: AuthStore } {
  const store = useContext(AuthContext);
  if (!store) throw new Error('AuthProvider is required');
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return { state, store };
}
