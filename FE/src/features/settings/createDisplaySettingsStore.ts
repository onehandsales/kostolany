import { defaultDisplaySettings, isDisplaySettings, type DisplaySettings, type DisplaySettingsSource, type DisplaySnapshot } from './displayTypes';

export type DisplaySettingsStore = ReturnType<typeof createDisplaySettingsStore>;

export function createDisplaySettingsStore(source: DisplaySettingsSource, owner: string) {
  let snapshot: DisplaySnapshot = {
    settings: { ...defaultDisplaySettings }, readStatus: 'idle', isSaving: false, hasSaveError: false,
  };
  const listeners = new Set<() => void>();
  let readGeneration = 0;
  let intent = 0;
  let saving = false;
  let queued = false;
  let readPatch: Partial<DisplaySettings> = {};
  const publish = (patch: Partial<DisplaySnapshot>) => {
    snapshot = { ...snapshot, ...patch };
    listeners.forEach((listener) => listener());
  };
  async function reload() {
    if (saving || snapshot.hasSaveError || snapshot.readStatus === 'loading') return;
    const generation = ++readGeneration;
    publish({ readStatus: 'loading' });
    try {
      const result = await source.read(owner);
      if (generation !== readGeneration) return;
      if (result.owner !== owner || !isDisplaySettings(result.settings)) throw new Error('표시 설정 소유자 또는 값 불일치');
      // 조회 중 직접 고른 항목은 유지하고 아직 읽지 못했던 나머지 설정만 공급부에서 채운다.
      publish({ settings: { ...result.settings, ...readPatch }, readStatus: 'ready' });
      readPatch = {};
      if (queued) void drain();
    } catch {
      if (generation === readGeneration) publish({ readStatus: 'error' });
    }
  }
  async function drain() {
    if (saving) return;
    saving = true;
    while (queued) {
      queued = false;
      const command = intent;
      const submitted = { ...snapshot.settings };
      publish({ isSaving: true, hasSaveError: false });
      try {
        const result = await source.save(owner, submitted, command);
        if (result.owner !== owner || !isDisplaySettings(result.settings)
          || Object.keys(submitted).some((key) => result.settings[key as keyof DisplaySettings] !== submitted[key as keyof DisplaySettings])) {
          throw new Error('표시 설정 저장 결과 불일치');
        }
        if (command === intent) publish({ readStatus: 'ready', hasSaveError: false });
      } catch {
        if (command === intent) publish({ hasSaveError: true });
      }
    }
    saving = false;
    publish({ isSaving: false });
  }
  function update(patch: Partial<DisplaySettings>) {
    const settings = { ...snapshot.settings, ...patch };
    if (!isDisplaySettings(settings)) return;
    if (!snapshot.hasSaveError && snapshot.readStatus === 'ready'
      && Object.keys(settings).every((key) => settings[key as keyof DisplaySettings] === snapshot.settings[key as keyof DisplaySettings])) return;
    intent += 1;
    queued = true;
    if (snapshot.readStatus !== 'ready') {
      readPatch = { ...readPatch, ...patch };
      publish({ settings, hasSaveError: false });
      if (snapshot.readStatus !== 'loading') void reload();
      return;
    }
    // 읽기가 끝난 뒤에는 새 의도를 순서대로 저장하고 중간 제출을 마지막 값으로 합친다.
    readGeneration += 1;
    publish({ settings, readStatus: 'ready', hasSaveError: false });
    void drain();
  }
  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    ensureLoaded: () => { if (snapshot.readStatus === 'idle') void reload(); },
    reload,
    update,
    retry: () => update({}),
  };
}
