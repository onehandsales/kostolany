import { validatePublicLists, type PublicListSnapshot, type PublicListSource,
  type PublicListValue, type SavePublicListCommand } from './types';

type Intent = { saved: boolean; scope: string; revision: number };
type FailedSave = { command: SavePublicListCommand; scope: string };

export function createPublicListStore(source: PublicListSource, userId: string | null) {
  let state: PublicListSnapshot = { status: 'loading', value: null, savedIds: [], pendingIds: [],
    errors: {}, readError: false, readErrorScope: '', refreshing: false };
  let confirmed: PublicListValue | null = null;
  let started = false;
  let reading = false;
  let generation = 0;
  let sequence = 0;
  let running = false;
  let activeScope = '';
  const commandPrefix = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  const intents = new Map<string, Intent>();
  const failed = new Map<string, FailedSave>();
  const uncertain = new Set<string>();
  const listeners = new Set<() => void>();

  function publish(patch: Partial<PublicListSnapshot> = {}) {
    const saved = new Set(confirmed?.savedIds ?? []);
    for (const [id, intent] of intents) {
      if (!confirmed?.lists.some(list => list.id === id)) continue;
      if (intent.saved) saved.add(id); else saved.delete(id);
    }
    state = { ...state, ...patch, value: confirmed, savedIds: [...saved],
      pendingIds: [...intents.keys()], errors: Object.fromEntries(
        [...failed].filter(([, error]) => error.scope === activeScope).map(([id, error]) => [id, error.scope])),
    };
    listeners.forEach(listener => listener());
  }
  function accept(value: PublicListValue) {
    validatePublicLists(value, userId);
    if (confirmed && value.version < confirmed.version) return false;
    if (source.canAccess) {
      const lists = value.lists.filter(list => source.canAccess?.(userId, list.id));
      value = { ...value, lists, savedIds: value.savedIds.filter(id => lists.some(list => list.id === id)) };
    }
    // 같은 공개 ID의 소유자가 바뀐 응답은 기존 대상의 갱신으로 받아들이지 않는다.
    if (confirmed?.lists.some(previous => value.lists.some(list => list.id === previous.id
      && (list.owner.id !== previous.owner.id || list.owner.kind !== previous.owner.kind)))) {
      throw new Error('Changed list owner');
    }
    confirmed = value;
    for (const id of intents.keys()) if (!value.lists.some(list => list.id === id)) intents.delete(id);
    for (const id of failed.keys()) if (!value.lists.some(list => list.id === id)) failed.delete(id);
    return true;
  }
  async function reload() {
    if (reading) return;
    started = true;
    reading = true;
    const request = ++generation;
    publish({ refreshing: true });
    try {
      const value = await source.read(userId);
      if (request !== generation) return;
      accept(value);
      publish({ status: 'ready', readError: false });
    } catch {
      if (request === generation) publish({ status: confirmed ? 'ready' : 'error', readError: true, readErrorScope: activeScope });
    } finally {
      if (request === generation) { reading = false; publish({ refreshing: false }); }
    }
  }
  async function drain() {
    if (running || !userId) return;
    running = true;
    try {
      while (intents.size) {
        const next = intents.entries().next().value;
        if (!next) break;
        const [listId, intent] = next;
        const list = confirmed?.lists.find(item => item.id === listId);
        if (!list) { intents.delete(listId); publish(); continue; }
        const retry = failed.get(listId);
        if (confirmed?.savedIds.includes(listId) === intent.saved && !retry && !uncertain.has(listId)) {
          intents.delete(listId); publish(); continue;
        }
        const command: SavePublicListCommand = retry?.command.saved === intent.saved ? retry.command : {
          userId, listId, ownerId: list.owner.id, saved: intent.saved, commandId: `${commandPrefix}:${++sequence}`,
        };
        failed.delete(listId);
        try {
          const value = await source.save(command);
          validatePublicLists(value, userId);
          const available = value.lists.some(item => item.id === listId && item.owner.id === command.ownerId);
          if (available && value.savedIds.includes(listId) !== command.saved) throw new Error('Invalid acknowledgement');
          accept(value);
          uncertain.delete(listId);
          generation += 1;
          reading = false;
          if (intents.get(listId) === intent) intents.delete(listId);
          publish({ status: 'ready', readError: false, refreshing: false });
        } catch {
          // 응답 유실 뒤의 반대 의도는 마지막 조회값과 같아도 실제 공급부에 확정한다.
          uncertain.add(listId);
          if (intents.get(listId) === intent) {
            intents.delete(listId);
            if (intent.scope === activeScope && confirmed?.lists.some(item => item.id === listId)) {
              failed.set(listId, { command, scope: intent.scope });
            }
          }
          publish();
        }
      }
    } finally { running = false; }
  }
  function setSaved(listId: string, saved: boolean, scope: string) {
    const list = confirmed?.lists.find(item => item.id === listId);
    if (!userId || !list || list.owner.id === userId || state.readError) return;
    const previous = intents.get(listId);
    if (previous?.saved === saved) return;
    const retry = failed.get(listId);
    if (retry?.command.saved !== saved) failed.delete(listId);
    generation += 1;
    reading = false;
    intents.set(listId, { saved, scope, revision: ++sequence });
    publish({ refreshing: false });
    void drain();
  }
  return {
    userId, reload, setSaved,
    isAccessible: (listId: string) => source.canAccess?.(userId, listId) ?? true,
    refreshAccess() {
      generation += 1;
      reading = false;
      if (confirmed) accept(confirmed);
      publish();
      void reload();
    },
    getSnapshot: () => state,
    ensure: () => { if (!started) void reload(); },
    setScope(scope: string) {
      if (activeScope === scope) return;
      activeScope = scope;
      generation += 1;
      reading = false;
      failed.clear();
      publish({ readError: false, readErrorScope: '', refreshing: false, status: confirmed ? 'ready' : 'loading' });
    },
    retry(listId: string, scope: string) {
      const error = failed.get(listId);
      if (error?.scope === scope) setSaved(listId, error.command.saved, scope);
    },
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
  };
}
export type PublicListStore = ReturnType<typeof createPublicListStore>;
