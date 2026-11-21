import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';

import { createProfileStore, type ProfileStore } from './createProfileStore';
import { createMockProfileSource } from './data/createMockProfileSource';
import { profilePreviewScenario } from './data/profilePreview';
import type { Profile, ProfileSnapshot, ProfileSource } from './types';
import { createProfilePhotoResources, type ProfilePhotoPicker } from './profilePhoto';
import { pickProfilePhoto } from './profilePhotoPicker';
import { ReadScopeBoundary } from '../../shared/state/ReadScopeBoundary';

const ProfileContext = createContext<ProfileStore | null>(null);
const KnownProfilesContext = createContext<ReadonlyMap<string, ProfileStore>>(new Map());
const ProfileScopeContext = createContext('unprovided');
const ProfilePhotoContext = createContext<{ resources: ReturnType<typeof createProfilePhotoResources>; picker: ProfilePhotoPicker } | null>(null);
const empty: ProfileSnapshot = { profile: null, readStatus: 'idle', isSaving: false, hasSaveError: false };
const getEmpty = () => empty;
const subscribeEmpty = () => () => undefined;
type ProfileProviderProps = { children: ReactNode; userId: string | null; sessionRevision: number; source?: ProfileSource; photoPicker?: ProfilePhotoPicker };

function createProfileScope(source: ProfileSource, version: number) {
  const stores = new Map<string, ProfileStore>();
  let mounts = 0;
  return { source, version, stores, photos: createProfilePhotoResources(), activate: () => {
    mounts += 1;
    return () => {
      mounts -= 1;
      // StrictMode의 즉시 재구독은 유지하고 실제 공급부 이탈 때만 확정 사진 참조를 놓는다.
      queueMicrotask(() => { if (mounts === 0) stores.forEach(store => store.dispose()); });
    };
  } };
}

export function ProfileProvider({ children, userId, sessionRevision, source, photoPicker = pickProfilePhoto }: ProfileProviderProps) {
  const [defaultSource] = useState(() => createMockProfileSource({ scenario: profilePreviewScenario }));
  const currentSource = source ?? defaultSource;
  const [scope, setScope] = useState(() => createProfileScope(currentSource, 0));
  useEffect(() => scope.activate(), [scope]);
  if (scope.source !== currentSource) {
    setScope(createProfileScope(currentSource, scope.version + 1));
    return null;
  }
  let store = userId ? scope.stores.get(userId) ?? null : null;
  if (userId && !store) {
    store = createProfileStore(currentSource, userId, scope.photos);
    scope.stores.set(userId, store);
  }
  // 인증 이름으로 프로필을 덮지 않으며 세션 키는 개인 편집 화면만 정리한다.
  const sessionScope = JSON.stringify([scope.version, userId, sessionRevision]);
  return <ProfileScopeContext.Provider value={sessionScope}>
    <KnownProfilesContext.Provider value={scope.stores}>
      <ProfilePhotoContext.Provider value={{ resources: scope.photos, picker: photoPicker }}>
        <ProfileContext.Provider value={store}><ReadScopeBoundary store={store} scope={sessionScope} />{children}</ProfileContext.Provider>
      </ProfilePhotoContext.Provider>
    </KnownProfilesContext.Provider>
  </ProfileScopeContext.Provider>;
}

export function useProfile(): { state: ProfileSnapshot; store: ProfileStore | null } {
  const store = useContext(ProfileContext);
  const scope = useProfileScopeKey();
  const raw = useSyncExternalStore(store?.subscribe ?? subscribeEmpty, store?.getSnapshot ?? getEmpty, store?.getSnapshot ?? getEmpty);
  const state = store && store.getReadScope() !== scope
    ? { ...raw, readStatus: raw.profile ? 'ready' as const : 'idle' as const, hasSaveError: false } : raw;
  useEffect(() => { store?.ensureLoaded(); }, [store, scope]);
  return { state, store };
}

export function useProfileScopeKey(): string { return useContext(ProfileScopeContext); }
export function useProfilePhotos() {
  const context = useContext(ProfilePhotoContext);
  if (!context) throw new Error('ProfileProvider is required');
  return context;
}

// 이미 조회한 공개 표시 필드만 공유하며 다른 계정의 개인 설정이나 초안을 전달하지 않는다.
export function useKnownProfile(userId: string) {
  const store = useContext(KnownProfilesContext).get(userId);
  const snapshot = useSyncExternalStore(store?.subscribe ?? subscribeEmpty, store?.getSnapshot ?? getEmpty, store?.getSnapshot ?? getEmpty);
  return snapshot.profile ? { name: snapshot.profile.name, bio: snapshot.profile.bio, photo: snapshot.profile.photo ?? null, pronouns: snapshot.profile.pronouns ?? [] } : null;
}

// 공개 검색은 확정 프로필만 구독하며 편집 초안이나 개인 설정을 새 원본으로 만들지 않는다.
export function useKnownProfiles(): readonly Profile[] {
  const stores = useContext(KnownProfilesContext);
  const scope = useProfileScopeKey();
  const selection = useMemo(() => createKnownProfileSelection(stores, scope), [stores, scope]);
  return useSyncExternalStore(selection.subscribe, selection.getSnapshot, selection.getSnapshot);
}

function createKnownProfileSelection(stores: ReadonlyMap<string, ProfileStore>, scope: string) {
  const currentStores = [...stores.values()];
  let previous: readonly Profile[] = [];
  return {
    scope,
    subscribe: (listener: () => void) => {
      const disconnect = currentStores.map(store => store.subscribe(listener));
      return () => disconnect.forEach(unsubscribe => unsubscribe());
    },
    getSnapshot: () => {
      const next = currentStores.flatMap(store => {
        const profile = store.getSnapshot().profile;
        return profile ? [profile] : [];
      });
      if (next.length !== previous.length || next.some((profile, index) => profile !== previous[index])) previous = next;
      return previous;
    },
  };
}
