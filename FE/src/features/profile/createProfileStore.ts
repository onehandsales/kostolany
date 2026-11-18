import { areProfileFieldsEqual, normalizeProfileFields, validateProfileFields } from './profileValidation';
import type { Profile, ProfileFields, ProfileSnapshot, ProfileSource, SaveResult } from './types';

type Command = { id: number; fields: ProfileFields; promise: Promise<SaveResult>; resolve: (result: SaveResult) => void };

export function createProfileStore(source: ProfileSource, userId: string) {
  let snapshot: ProfileSnapshot = { profile: null, readStatus: 'idle', isSaving: false, hasSaveError: false };
  const listeners = new Set<() => void>();
  let readGeneration = 0;
  let commandId = 0;
  let active: Command | null = null;
  let queued: Command | null = null;
  const publish = (patch: Partial<ProfileSnapshot>) => {
    snapshot = { ...snapshot, ...patch };
    listeners.forEach((listener) => listener());
  };
  const isValid = (profile: Profile): boolean => profile?.userId === userId
    && typeof profile.name === 'string' && typeof profile.bio === 'string'
    && !validateProfileFields(profile) && areProfileFieldsEqual(profile, normalizeProfileFields(profile));

  async function reload() {
    if (active || snapshot.readStatus === 'loading') return;
    const generation = ++readGeneration;
    publish({ readStatus: 'loading' });
    try {
      const profile = await source.readProfile(userId);
      if (generation !== readGeneration) return;
      if (!isValid(profile)) throw new Error('Invalid profile response');
      publish({ profile: { ...profile }, readStatus: 'ready' });
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
      publish({ profile: { ...profile }, readStatus: 'ready' });
    } catch {
      // 이전 실패는 대기 중인 최신 목표나 다른 사용자의 저장소를 되돌리지 않는다.
    }
    const next = queued;
    queued = null;
    active = null;
    command.resolve({ status: next ? 'superseded' : succeeded ? 'saved' : 'failed' });
    if (next) { void run(next); return; }
    publish({ isSaving: false, hasSaveError: !succeeded });
  }

  function save(fields: ProfileFields): Promise<SaveResult> {
    if (!snapshot.profile || validateProfileFields(fields)) return Promise.resolve({ status: 'failed' });
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
    const command: Command = { id, fields: normalized, promise, resolve: resolveCommand };
    publish({ isSaving: true, hasSaveError: false, readStatus: 'ready' });
    if (active) {
      queued?.resolve({ status: 'superseded' });
      queued = command;
    } else void run(command);
    return promise;
  }

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    ensureLoaded: () => { if (snapshot.readStatus === 'idle') void reload(); },
    reload, save,
  };
}
export type ProfileStore = ReturnType<typeof createProfileStore>;
