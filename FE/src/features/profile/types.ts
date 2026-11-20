import type { ProfilePhoto } from './profilePhoto';

// 이전 공급부의 선택 필드 생략은 사진 없음과 빈 대명사로 해석한다.
export type ProfileFields = Readonly<{ name: string; bio: string; photo?: ProfilePhoto | null; pronouns?: readonly string[] }>;
export type Profile = ProfileFields & Readonly<{ userId: string }>;
export type ProfileSource = {
  readProfile: (userId: string) => Promise<Profile>;
  saveProfile: (input: { userId: string; commandId: number; fields: ProfileFields }) => Promise<Profile>;
};
export type ProfileSnapshot = Readonly<{
  profile: Profile | null;
  readStatus: 'idle' | 'loading' | 'ready' | 'error';
  isSaving: boolean;
  hasSaveError: boolean;
}>;
export type SaveResult = { status: 'saved' | 'superseded' | 'failed' };
