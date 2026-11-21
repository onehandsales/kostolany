import { areProfileFieldsEqual, normalizeProfileFields, validateProfileFields } from './profileValidation';
import type { Profile, ProfileFields, ProfileSnapshot, ProfileSource, SaveResult } from './types';
import type { ProfilePhotoResources } from './profilePhoto';

type Command = { id: number; scope: string; fields: ProfileFields; promise: Promise<SaveResult>; resolve: (result: SaveResult) => void; release: () => void };

export function createProfileStore(source: ProfileSource, userId: string, photos?: ProfilePhotoResources) {
  let snapshot: ProfileSnapshot = { profile: null, readStatus: 'idle', isSaving: false, hasSaveError: false };
  const listeners = new Set<() => void>();
  let readGeneration = 0;
  let readScope = '';
  let commandId = 0;
  let active: Command | null = null;
  let queued: Command | null = null;
  let releasePhoto = () => {};
  let disposed = false;
  const commit = (profile: Profile) => {
    if (disposed) return;
    const releasePrevious = releasePhoto;
    releasePhoto = photos?.retain(profile.photo) ?? (() => {});
    publish({ profile: { userId: profile.userId, ...normalizeProfileFields(profile) }, readStatus: 'ready' });
    releasePrevious();
  };
  const publish = (patch: Partial<ProfileSnapshot>) => {
    snapshot = { ...snapshot, ...patch };
    listeners.forEach((listener) => listener());
  };
  const isValid = (profile: Profile): boolean => profile?.userId === userId
    && typeof profile.name === 'string' && typeof profile.bio === 'string'
    && !validateProfileFields(profile) && areProfileFieldsEqual(profile, normalizeProfileFields(profile));

  async function reload() {
    if (disposed || active || snapshot.readStatus === 'loading') return;
    const generation = ++readGeneration;
    publish({ readStatus: 'loading' });
    try {
      const profile = await source.readProfile(userId);
      if (generation !== readGeneration) return;
      if (!isValid(profile)) throw new Error('Invalid profile response');
      commit(profile);
    } catch {
      if (generation === readGeneration) publish({ readStatus: 'error' });
    }
  }

  async function run(command: Command) {
    active = command;
    let succeeded = false;
    try {
      const profile = await source.saveProfile({ userId, commandId: command.id, fields: command.fields });
      if (!isValid(profile) || !areProfileFieldsEqual(profile, command.fields)) throw new Error('Invalid saved profile');
      succeeded = true;
      commit(profile);
    } catch {
      // 이전 실패는 대기 중인 최신 목표나 다른 사용자의 저장소를 되돌리지 않는다.
    }
    const next = queued;
    queued = null;
    active = null;
    command.release();
    command.resolve({ status: next ? 'superseded' : succeeded ? 'saved' : 'failed' });
    if (next) { void run(next); return; }
    publish({ isSaving: false, hasSaveError: !succeeded && command.scope === readScope });
  }

  function save(fields: ProfileFields): Promise<SaveResult> {
    if (disposed || !snapshot.profile || validateProfileFields(fields)) return Promise.resolve({ status: 'failed' });
    const normalized = normalizeProfileFields(fields);
    const latest = queued ?? active;
    if (latest && areProfileFieldsEqual(latest.fields, normalized)) return latest.promise;
    if (!active && areProfileFieldsEqual(snapshot.profile, normalized)) {
      publish({ hasSaveError: false });
      return Promise.resolve({ status: 'saved' });
    }
    // 제출은 조회를 무효화하고 사용자별 직렬 명령의 마지막 목표만 대기시킨다.
    readGeneration += 1;
    const id = ++commandId;
    let resolveCommand: (result: SaveResult) => void = () => undefined;
    const promise = new Promise<SaveResult>((resolve) => { resolveCommand = resolve; });
    const command: Command = { id, scope: readScope, fields: normalized, promise, resolve: resolveCommand, release: photos?.retain(normalized.photo) ?? (() => {}) };
    publish({ isSaving: true, hasSaveError: false, readStatus: 'ready' });
    if (active) {
      queued?.resolve({ status: 'superseded' });
      queued?.release();
      queued = command;
    } else void run(command);
    return promise;
  }

  return {
    getSnapshot: () => snapshot,
    getReadScope: () => readScope,
    setReadScope(scope: string) {
      if (readScope === scope) return;
      readScope = scope; readGeneration += 1;
      publish({ readStatus: snapshot.profile ? 'ready' : 'idle', hasSaveError: false });
    },
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    ensureLoaded: () => { if (snapshot.readStatus === 'idle') void reload(); },
    reload, save,
    dispose: () => {
      disposed = true;
      readGeneration += 1;
      releasePhoto();
      queued?.release();
      queued?.resolve({ status: 'superseded' });
      queued = null;
      listeners.clear();
    },
  };
}
export type ProfileStore = ReturnType<typeof createProfileStore>;
