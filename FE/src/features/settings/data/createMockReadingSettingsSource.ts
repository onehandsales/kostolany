import { defaultExplanationLevel, isExplanationLevel } from '../../article/explanationTypes';
import type { ReadingSettings, ReadingSettingsSource } from '../types';
import type { SettingsPreviewScenario } from './settingsPreview';

type MockReadingSettingsOptions = { delayMs?: number; scenario?: SettingsPreviewScenario };

export function createMockReadingSettingsSource({ delayMs = 350, scenario = 'normal' }: MockReadingSettingsOptions = {}): ReadingSettingsSource {
  const settingsByUserId = new Map<string, ReadingSettings>(['example-reader', 'example-reader-b']
    .map((userId) => [userId, { userId, defaultLevel: defaultExplanationLevel }]));
  const failures = new Set<string>();
  async function waitForOperation(userId: string, operation: 'read' | 'save'): Promise<void> {
    if (!settingsByUserId.has(userId)) throw new Error('Unknown mock user');
    const delay = scenario === 'slow' ? 4000 : delayMs;
    if (delay > 0) await new Promise<void>((resolve) => setTimeout(resolve, delay));
    const key = JSON.stringify([userId, operation]);
    if (scenario === `${operation}-error` && !failures.has(key)) {
      failures.add(key);
      throw new Error('Mock settings operation failed before applying');
    }
  }
  return {
    async fetchSettings(userId) {
      await waitForOperation(userId, 'read');
      const settings = settingsByUserId.get(userId);
      if (!settings) throw new Error('Unknown mock user');
      return { ...settings };
    },
    async setDefaultLevel({ userId, defaultLevel, commandId }) {
      if (!isExplanationLevel(defaultLevel) || !Number.isSafeInteger(commandId) || commandId < 1) {
        throw new Error('Invalid settings command');
      }
      await waitForOperation(userId, 'save');
      const settings = { userId, defaultLevel };
      settingsByUserId.set(userId, settings);
      return { ...settings };
    },
  };
}
