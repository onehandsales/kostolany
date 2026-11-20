import { clapTargetKey, MAX_CLAPS, type ClapSnapshot, type ClapSource, type ClapTarget, type ClapValue } from './types';

type Command = { id: number; intent: number; mine: number; scope: string };
type Entry = {
  confirmed: ClapValue | null;
  desired: number;
  intent: number;
  generation: number;
  reading: boolean;
  command: Command | null;
  failed: number | null;
  uncertain: boolean;
  intentScope: string;
  snapshot: ClapSnapshot;
  listeners: Set<() => void>;
};
const initial: ClapSnapshot = {
  status: 'loading', mine: 0, total: null, isSaving: false, isRefreshing: false, error: null,
};
export type ClapStore = ReturnType<typeof createClapStore>;

export function createClapStore(source: ClapSource, userId: string) {
  const entries = new Map<string, Entry>();
  let commandId = 0;
  let activeScope = 'standalone';
  const commandScope = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  function entryFor(target: ClapTarget): Entry {
    const key = clapTargetKey(target);
    let entry = entries.get(key);
    if (!entry) {
      entry = { confirmed: null, desired: 0, intent: 0, generation: 0, reading: false,
        command: null, failed: null, uncertain: false, intentScope: activeScope, snapshot: initial, listeners: new Set() };
      entries.set(key, entry);
    }
    return entry;
  }
  function publish(entry: Entry, error: ClapSnapshot['error'] = null): void {
    entry.snapshot = {
      status: entry.confirmed ? 'ready' : error ? 'error' : 'loading',
      mine: entry.desired,
      total: entry.confirmed ? entry.confirmed.total - entry.confirmed.mine + entry.desired : null,
      isSaving: entry.command !== null, isRefreshing: entry.reading, error,
    };
    entry.listeners.forEach(listener => listener());
  }
  function validate(value: ClapValue, target: ClapTarget, expected?: number): void {
    if (!value || value.userId !== userId || !value.target
      || clapTargetKey(value.target) !== clapTargetKey(target)
      || !Number.isSafeInteger(value.mine) || value.mine < 0 || value.mine > MAX_CLAPS
      || !Number.isSafeInteger(value.total) || value.total < value.mine
      || value.total > Number.MAX_SAFE_INTEGER - MAX_CLAPS
      || (expected !== undefined && value.mine !== expected)) throw new Error('Invalid clap response');
  }
  async function refresh(target: ClapTarget): Promise<void> {
    const entry = entryFor(target);
    if (entry.reading || entry.command) return;
    const generation = ++entry.generation;
    entry.reading = true;
    publish(entry, entry.failed === null ? null : 'write');
    try {
      const value = await source.read({ userId, target });
      if (generation !== entry.generation) return;
      validate(value, target);
      entry.confirmed = value;
      entry.desired = value.mine;
      entry.reading = false;
      publish(entry, entry.failed === null ? null : 'write');
    } catch {
      if (generation !== entry.generation) return;
      entry.reading = false;
      publish(entry, entry.failed === null ? 'read' : 'write');
    }
  }
  async function drain(target: ClapTarget, entry: Entry): Promise<void> {
    if (entry.command || !entry.confirmed) return;
    if (entry.desired === entry.confirmed.mine && !entry.uncertain) { publish(entry); return; }
    const command = { id: ++commandId, intent: entry.intent, mine: entry.desired, scope: entry.intentScope };
    entry.command = command;
    publish(entry);
    try {
      const value = await source.save({ userId, target, mine: command.mine, commandId: `${commandScope}:${command.id}` });
      validate(value, target, command.mine);
      entry.confirmed = value;
      entry.command = null;
      entry.uncertain = false;
      void drain(target, entry);
    } catch {
      entry.command = null;
      // 응답을 잃은 쓰기는 확정값과 같은 Undo 목표도 공급부에 다시 반영한다.
      entry.uncertain = true;
      if (command.intent !== entry.intent) { void drain(target, entry); return; }
      const current = command.scope === activeScope;
      entry.failed = current ? command.mine : null;
      entry.desired = entry.confirmed.mine;
      publish(entry, current ? 'write' : null);
    }
  }
  function setCount(target: ClapTarget, mine: number): void {
    const entry = entryFor(target);
    if (!entry.confirmed || !Number.isInteger(mine) || mine < 0 || mine > MAX_CLAPS
      || (mine === entry.desired && entry.failed === null && !entry.uncertain)) return;
    entry.intent += 1;
    entry.intentScope = activeScope;
    entry.desired = mine;
    entry.failed = null;
    // 증가량 대신 개인 목표 수를 직렬 저장해 응답 재시도와 연속 입력의 이중 증가를 막는다.
    entry.generation += 1;
    entry.reading = false;
    if (entry.command) publish(entry);
    else void drain(target, entry);
  }
  return {
    userId,
    getScope: () => activeScope,
    setScope(scope: string): void {
      if (scope === activeScope) return;
      activeScope = scope;
      entries.forEach(entry => {
        entry.generation += 1;
        entry.reading = false;
        entry.failed = null;
        publish(entry);
      });
    },
    getSnapshot: (target: ClapTarget): ClapSnapshot => entries.get(clapTargetKey(target))?.snapshot ?? initial,
    subscribe(target: ClapTarget, listener: () => void): () => void {
      const entry = entryFor(target);
      entry.listeners.add(listener);
      return () => { entry.listeners.delete(listener); };
    },
    ensure(target: ClapTarget): void {
      const entry = entryFor(target);
      if (!entry.confirmed && entry.snapshot.status === 'loading') void refresh(target);
    },
    refresh,
    setCount,
    clap(target: ClapTarget): void { setCount(target, Math.min(MAX_CLAPS, entryFor(target).desired + 1)); },
    undo(target: ClapTarget): void { setCount(target, 0); },
    retry(target: ClapTarget): void {
      const entry = entryFor(target);
      if (entry.command || entry.reading) return;
      if (entry.failed !== null) setCount(target, entry.failed);
      else void refresh(target);
    },
  };
}
