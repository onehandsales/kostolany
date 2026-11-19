import type { ThemeMode } from '../../shared/theme/ThemeProvider';

export type DisplaySettings = {
  appTheme: ThemeMode;
  readerTheme: ThemeMode;
  fontScale: number;
  fontFamily: 'default' | 'serif' | 'sans';
  showHighlights: boolean;
};
export type DisplaySettingsSource = {
  read: (owner: string) => Promise<{ owner: string; settings: DisplaySettings }>;
  save: (owner: string, settings: DisplaySettings, command: number) => Promise<{ owner: string; settings: DisplaySettings }>;
};
export type DisplaySnapshot = {
  settings: DisplaySettings;
  readStatus: 'idle' | 'loading' | 'ready' | 'error';
  isSaving: boolean;
  hasSaveError: boolean;
};
export const defaultDisplaySettings: DisplaySettings = {
  appTheme: 'system', readerTheme: 'system', fontScale: 100, fontFamily: 'default', showHighlights: true,
};

export function isDisplaySettings(value: DisplaySettings): boolean {
  return ['system', 'light', 'dark'].includes(value.appTheme)
    && ['system', 'light', 'dark'].includes(value.readerTheme)
    && Number.isInteger(value.fontScale) && value.fontScale >= 80 && value.fontScale <= 200
    && value.fontScale % 20 === 0 && ['default', 'serif', 'sans'].includes(value.fontFamily)
    && typeof value.showHighlights === 'boolean';
}
