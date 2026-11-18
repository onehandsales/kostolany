export type ProfileFields = Readonly<{ name: string; bio: string }>;
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
