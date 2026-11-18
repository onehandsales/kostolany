import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

import { createProfileStore, type ProfileStore } from './createProfileStore';
import { createMockProfileSource } from './data/createMockProfileSource';
import { profilePreviewScenario } from './data/profilePreview';
import type { ProfileSnapshot, ProfileSource } from './types';

const ProfileContext = createContext<ProfileStore | null>(null);
const ProfileScopeContext = createContext('unprovided');
const empty: ProfileSnapshot = { profile: null, readStatus: 'idle', isSaving: false, hasSaveError: false };
const getEmpty = () => empty;
const subscribeEmpty = () => () => undefined;
type ProfileProviderProps = { children: ReactNode; userId: string | null; sessionRevision: number; source?: ProfileSource };

export function ProfileProvider({ children, userId, sessionRevision, source }: ProfileProviderProps) {
  const [defaultSource] = useState(() => createMockProfileSource({ scenario: profilePreviewScenario }));
  const currentSource = source ?? defaultSource;
  const [scope, setScope] = useState(() => ({ source: currentSource, version: 0, stores: new Map<string, ProfileStore>() }));
  if (scope.source !== currentSource) {
    setScope({ source: currentSource, version: scope.version + 1, stores: new Map() });
    return null;
  }
  let store = userId ? scope.stores.get(userId) ?? null : null;
  if (userId && !store) {
    store = createProfileStore(currentSource, userId);
    scope.stores.set(userId, store);
  }
  // 인증 이름으로 프로필을 덮지 않으며 세션 키는 개인 편집 화면만 정리한다.
  return <ProfileScopeContext.Provider value={JSON.stringify([scope.version, userId, sessionRevision])}>
    <ProfileContext.Provider value={store}>{children}</ProfileContext.Provider>
  </ProfileScopeContext.Provider>;
}

export function useProfile() {
  const store = useContext(ProfileContext);
  const state = useSyncExternalStore(store?.subscribe ?? subscribeEmpty, store?.getSnapshot ?? getEmpty, store?.getSnapshot ?? getEmpty);
  useEffect(() => { store?.ensureLoaded(); }, [store]);
  return { state, store };
}

export function useProfileScopeKey(): string { return useContext(ProfileScopeContext); }
