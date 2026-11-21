import { publicListFixtures } from './publicListFixtures';
import type { PublicList, PublicListSource, PublicListValue, SavePublicListCommand } from '../types';
import { DEFAULT_LIST_ID, type UserListSource } from '../../bookmarks/listTypes';
import { toPublicList } from '../ownedPublicList';

export type PublicListScenario = 'normal' | 'read-error' | 'write-error' | 'slow' | 'empty' | 'long';
type CreateMockPublicListSourceOptions = {
  scenario?: PublicListScenario;
  delayMs?: number;
  lists?: readonly PublicList[];
  initialSaved?: Readonly<Record<string, readonly string[]>>;
  userLists?: UserListSource;
};

export function createMockPublicListSource({
  scenario = 'normal', delayMs = scenario === 'slow' ? 4000 : 150,
  lists = publicListFixtures, initialSaved = {}, userLists,
}: CreateMockPublicListSourceOptions = {}) {
  const catalog = scenario === 'empty' ? [] : scenario === 'long'
    ? lists.flatMap(list => Array.from({ length: 150 }, (_, index) => ({ ...list,
      id: `long-list-${list.id}-${index}`, title: `긴 한국어 공개 목록 ${index + 1} ${'아침을 준비하는 이야기 '.repeat(5)}` })))
    : lists;
  const values = new Map(Object.entries(initialSaved).map(([id, saved]) => [id, new Set(saved)]));
  const hidden = new Map<string, 'private' | 'deleted'>();
  const applied = new Map<string, string>();
  const failures = new Set<string>();
  const listeners = new Set<() => void>();
  let disconnectCatalog: (() => void) | undefined;
  let version = 0;
  const currentCatalog = () => [...catalog, ...(userLists?.getCatalog?.() ?? [])
    .filter(list => list.listId !== DEFAULT_LIST_ID).map(toPublicList)];
  function catalogChanged() {
    const current = currentCatalog();
    values.forEach(saved => saved.forEach(id => {
      if (!current.some(list => list.id === id && !list.isPrivate && !hidden.has(id))) saved.delete(id);
    }));
    version += 1;
    listeners.forEach(listener => listener());
  }
  function savedFor(userId: string) {
    let saved = values.get(userId);
    if (!saved) {
      saved = new Set(initialSaved[userId] ?? (scenario === 'long' ? catalog.map(list => list.id) : []));
      values.set(userId, saved);
    }
    return saved;
  }
  function accessible(userId: string | null, list: PublicList) {
    const visibility = hidden.get(list.id) ?? (list.isPrivate ? 'private' : undefined);
    return !visibility || (visibility === 'private' && list.owner.id === userId);
  }
  function snapshot(userId: string | null): PublicListValue {
    const visible = currentCatalog().filter(list => accessible(userId, list));
    return { userId, version, lists: visible.map(list => ({ ...list, isPrivate: hidden.get(list.id) === 'private' || Boolean(list.isPrivate), owner: { ...list.owner }, articleIds: [...list.articleIds],
      ...(list.notes && { notes: { ...list.notes } }) })),
      savedIds: userId ? [...savedFor(userId)].filter(id => visible.some(list => list.id === id)) : [] };
  }
  async function wait(key: string, fail: boolean) {
    if (delayMs) await new Promise<void>(resolve => setTimeout(resolve, delayMs));
    if (fail && !failures.has(key)) { failures.add(key); throw new Error('unavailable'); }
  }
  const source: PublicListSource = {
    canAccess(userId, listId) {
      const list = currentCatalog().find(item => item.id === listId);
      return Boolean(list && accessible(userId, list));
    },
    subscribe(listener) {
      if (listeners.size === 0) disconnectCatalog = userLists?.subscribe?.(catalogChanged);
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (!listeners.size) { disconnectCatalog?.(); disconnectCatalog = undefined; }
      };
    },
    async read(userId) {
      await wait(`read:${userId}`, scenario === 'read-error');
      return snapshot(userId);
    },
    async save(command: SavePublicListCommand) {
      if (!command.userId.trim() || !command.commandId.trim() || typeof command.saved !== 'boolean') {
        throw new Error('invalid');
      }
      await wait(`save:${command.userId}:${command.listId}`, scenario === 'write-error');
      const list = currentCatalog().find(item => item.id === command.listId && item.owner.id === command.ownerId);
      if (!list || !accessible(command.userId, list) || list.owner.id === command.userId) {
        throw new Error('unavailable');
      }
      const key = JSON.stringify([command.userId, command.commandId]);
      const fingerprint = JSON.stringify([command.listId, command.ownerId, command.saved]);
      const previous = applied.get(key);
      if (previous !== undefined && previous !== fingerprint) throw new Error('invalid');
      if (previous === undefined) {
        const saved = savedFor(command.userId);
        if (command.saved) saved.add(command.listId); else saved.delete(command.listId);
        applied.set(key, fingerprint);
        version += 1;
      }
      return snapshot(command.userId);
    },
  };
  return { ...source,
    // 편집 화면을 추가하지 않고 접근 권한 변경과 진행 중 요청을 검증하는 공급부 경계다.
    setVisibility(listId: string, visibility: 'public' | 'private' | 'deleted') {
      if (visibility === 'public') hidden.delete(listId); else hidden.set(listId, visibility);
      if (visibility !== 'public') values.forEach(saved => saved.delete(listId));
      version += 1;
      listeners.forEach(listener => listener());
    },
  };
}
