import type { ExplanationLevel } from '../article/explanationTypes';

export type ReadingSettings = Readonly<{ userId: string; defaultLevel: ExplanationLevel }>;
export type ReadingSettingsSource = {
  fetchSettings: (userId: string) => Promise<ReadingSettings>;
  setDefaultLevel: (input: ReadingSettings & { commandId: number }) => Promise<ReadingSettings>;
};
export type ReadingSettingsSnapshot = Readonly<{
  settings: ReadingSettings | null;
  readStatus: 'idle' | 'loading' | 'ready' | 'error';
  isSaving: boolean;
  hasSaveError: boolean;
}>;
export type SettingsSaveResult = { status: 'saved' | 'superseded' | 'failed' };
