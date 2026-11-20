import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

import { createProfileStore, type ProfileStore } from './createProfileStore';
import { createMockProfileSource } from './data/createMockProfileSource';
import { profilePreviewScenario } from './data/profilePreview';
import type { ProfileSnapshot, ProfileSource } from './types';

const ProfileContext = createContext<ProfileStore | null>(null);
const KnownProfilesContext = createContext<ReadonlyMap<string, ProfileStore>>(new Map());
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
    <KnownProfilesContext.Provider value={scope.stores}>
      <ProfileContext.Provider value={store}>{children}</ProfileContext.Provider>
    </KnownProfilesContext.Provider>
  </ProfileScopeContext.Provider>;
}

export function useProfile(): { state: ProfileSnapshot; store: ProfileStore | null } {
  const store = useContext(ProfileContext);
  const state = useSyncExternalStore(store?.subscribe ?? subscribeEmpty, store?.getSnapshot ?? getEmpty, store?.getSnapshot ?? getEmpty);
  useEffect(() => { store?.ensureLoaded(); }, [store]);
  return { state, store };
}

export function useProfileScopeKey(): string { return useContext(ProfileScopeContext); }

// 이미 조회한 공개 표시 필드만 공유하며 다른 계정의 개인 설정이나 초안을 전달하지 않는다.
export function useKnownProfile(userId: string) {
  const store = useContext(KnownProfilesContext).get(userId);
  const snapshot = useSyncExternalStore(store?.subscribe ?? subscribeEmpty, store?.getSnapshot ?? getEmpty, store?.getSnapshot ?? getEmpty);
  return snapshot.profile ? { name: snapshot.profile.name, bio: snapshot.profile.bio } : null;
}
