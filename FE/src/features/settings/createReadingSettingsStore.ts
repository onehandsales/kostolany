import { isExplanationLevel, type ExplanationLevel } from '../article/explanationTypes';
import type { ReadingSettings, ReadingSettingsSnapshot, ReadingSettingsSource, SettingsSaveResult } from './types';

type SettingsCommand = {
  id: number; level: ExplanationLevel; promise: Promise<SettingsSaveResult>;
  resolve: (result: SettingsSaveResult) => void;
};

export function createReadingSettingsStore(source: ReadingSettingsSource, userId: string) {
  let snapshot: ReadingSettingsSnapshot = { settings: null, readStatus: 'idle', isSaving: false, hasSaveError: false };
  const listeners = new Set<() => void>();
  let readGeneration = 0;
  let commandId = 0;
  let activeCommand: SettingsCommand | null = null;
  let queuedCommand: SettingsCommand | null = null;
  function publish(patch: Partial<ReadingSettingsSnapshot>): void {
    snapshot = { ...snapshot, ...patch };
    listeners.forEach((listener) => listener());
  }
  function isValidResponse(settings: ReadingSettings): boolean {
    return settings?.userId === userId && isExplanationLevel(settings.defaultLevel);
  }
  async function reload(): Promise<void> {
    if (activeCommand || snapshot.readStatus === 'loading') return;
    const generation = ++readGeneration;
    publish({ readStatus: 'loading' });
    try {
      const settings = await source.fetchSettings(userId);
      if (generation !== readGeneration) return;
      if (!isValidResponse(settings)) throw new Error('Invalid settings response');
      publish({ settings: { ...settings }, readStatus: 'ready' });
    } catch {
      if (generation === readGeneration) publish({ readStatus: 'error' });
    }
  }
  async function runCommand(command: SettingsCommand): Promise<void> {
    activeCommand = command;
    let succeeded = false;
    try {
      const settings = await source.setDefaultLevel({ userId, defaultLevel: command.level, commandId: command.id });
      if (!isValidResponse(settings) || settings.defaultLevel !== command.level) throw new Error('Invalid saved settings');
      succeeded = true;
      publish({ settings: { ...settings }, readStatus: 'ready' });
    } catch {
      // 이전 실패는 대기 중인 최신 제출의 선택이나 오류 상태를 덮지 않는다.
    }
    const next = queuedCommand;
    queuedCommand = null;
    activeCommand = null;
    command.resolve({ status: next ? 'superseded' : succeeded ? 'saved' : 'failed' });
    if (next) { void runCommand(next); return; }
    publish({ isSaving: false, hasSaveError: !succeeded });
  }
  function save(level: ExplanationLevel): Promise<SettingsSaveResult> {
    if (!snapshot.settings || !isExplanationLevel(level)) return Promise.resolve({ status: 'failed' });
    const latestCommand = queuedCommand ?? activeCommand;
    if (latestCommand?.level === level) return latestCommand.promise;
    if (!activeCommand && snapshot.settings.defaultLevel === level) {
      publish({ hasSaveError: false });
      return Promise.resolve({ status: 'saved' });
    }
    // 쓰기는 과거 조회를 무효화하며 진행 중 요청 이후의 마지막 제출만 직렬로 보낸다.
    readGeneration += 1;
    let resolveCommand: SettingsCommand['resolve'] = () => undefined;
    const promise = new Promise<SettingsSaveResult>((resolve) => { resolveCommand = resolve; });
    const command = { id: ++commandId, level, promise, resolve: resolveCommand };
    publish({ isSaving: true, hasSaveError: false, readStatus: 'ready' });
    if (activeCommand) {
      queuedCommand?.resolve({ status: 'superseded' });
      queuedCommand = command;
    } else void runCommand(command);
    return promise;
  }
  return {
    getSnapshot: (): ReadingSettingsSnapshot => snapshot,
    subscribe(listener: () => void): () => void {
      listeners.add(listener); return () => { listeners.delete(listener); };
    },
    ensureLoaded: (): void => { if (snapshot.readStatus === 'idle') void reload(); },
    reload, save,
  };
}
export type ReadingSettingsStore = ReturnType<typeof createReadingSettingsStore>;
