export type ProfilePhoto = Readonly<{ id: string; uri: string; width: number; height: number }>;
export type ProfilePhotoOrigin = 'camera' | 'library';
export type ProfilePhotoLease = { photo: ProfilePhoto; release: () => void };
export type ProfilePhotoPicker = (origin: ProfilePhotoOrigin, signal: AbortSignal) => Promise<ProfilePhotoLease | null>;

export class ProfilePhotoError extends Error {
  constructor(public readonly reason: 'permission' | 'unsupported' | 'invalid' | 'processing') {
    super(reason);
  }
}

export function isProfilePhoto(photo: ProfilePhoto): boolean {
  return Boolean(photo && typeof photo.id === 'string' && photo.id && typeof photo.uri === 'string'
    && /^(file:|blob:|data:image\/)/u.test(photo.uri)
    && Number.isFinite(photo.width) && photo.width > 0 && Number.isFinite(photo.height) && photo.height > 0);
}

// 편집 초안·제출 명령·확정 프로필이 가진 참조가 모두 끝나야 임시 사진을 해제한다.
export function createProfilePhotoResources() {
  const entries = new Map<string, { photo: ProfilePhoto; count: number; release: () => void }>();
  function retain(photo: ProfilePhoto | null | undefined): () => void {
    const entry = photo ? entries.get(photo.id) : undefined;
    if (!entry) return () => undefined;
    entry.count += 1;
    let released = false;
    return () => {
      if (released) return;
      released = true;
      entry.count -= 1;
      if (entry.count === 0) {
        entries.delete(entry.photo.id);
        entry.release();
      }
    };
  }
  return {
    retain,
    adopt(lease: ProfilePhotoLease): ProfilePhotoLease {
      if (!isProfilePhoto(lease.photo) || entries.has(lease.photo.id)) {
        lease.release();
        throw new ProfilePhotoError('invalid');
      }
      entries.set(lease.photo.id, { photo: lease.photo, count: 0, release: lease.release });
      return { photo: lease.photo, release: retain(lease.photo) };
    },
  };
}
export type ProfilePhotoResources = ReturnType<typeof createProfilePhotoResources>;
