import { defaultDisplaySettings, isDisplaySettings, type DisplaySettings, type DisplaySettingsSource } from '../displayTypes';

type MockDisplayOptions = { delayMs?: number; failReadOnce?: boolean; failSaveOnce?: boolean };

export function createMockDisplaySettingsSource(options: MockDisplayOptions = {}): DisplaySettingsSource {
  const values = new Map<string, DisplaySettings>();
  const failures = new Set<string>();
  const delay = () => options.delayMs === 0 ? Promise.resolve() : new Promise<void>((resolve) => setTimeout(resolve, options.delayMs ?? 150));
  function failOnce(key: string, enabled?: boolean) {
    if (!enabled || failures.has(key)) return;
    failures.add(key);
    throw new Error('표시 설정 모의 실패');
  }
  return {
    async read(owner) {
      await delay();
      failOnce(`read:${owner}`, options.failReadOnce);
      return { owner, settings: { ...(values.get(owner) ?? defaultDisplaySettings) } };
    },
    async save(owner, settings) {
      await delay();
      failOnce(`save:${owner}`, options.failSaveOnce);
      if (!isDisplaySettings(settings)) throw new Error('잘못된 표시 설정');
      values.set(owner, { ...settings });
      return { owner, settings: { ...settings } };
    },
  };
}
