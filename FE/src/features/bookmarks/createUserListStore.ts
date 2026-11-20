import {
  DEFAULT_LIST_ID,
  ListConflictError,
  UnavailableListError,
  type ListActionResult,
  type ListMetadata,
  type UserListContent,
  type UserListsSnapshot,
  type UserListSource,
  type RemovedListStory,
} from './listTypes';
import { copyListContent, hasInvalidListNotes, sameListContent as sameContent } from './listContent';
import { hasInvalidListMetadata } from './hasInvalidListMetadata';
import { normalizeListName, validateListName } from './validateListName';

type ListEntry = {
  listId: string;
  confirmed: UserListContent | null;
  desired: UserListContent | null;
  revision: number;
  intent: number;
  isPending: boolean;
  isDeleted: boolean;
  pendingArticleIds: readonly string[];
  failure: Readonly<{ name: string; target: UserListContent | null; conflict?: boolean }> | null;
  uncertain?: boolean;
  intentScope?: string;
  command?: { id: number; intent: number; operation: 'create' | 'update' | 'delete' };
};

export type UserListStore = ReturnType<typeof createUserListStore>;

export function createUserListStore(source: UserListSource, userId: string, articleIds: readonly string[]) {
  // 확정 내용과 최신 목표를 분리해 이름과 기사 소속을 하나의 목록 명령으로 직렬 처리한다.
  const entries = new Map<string, ListEntry>();
  const listeners = new Set<() => void>();
  let isLoaded = false;
  let isReading = false;
  let hasReadError = false;
  let commandId = 0;
  let scope = 'standalone';
  let readGeneration = 0;
  let removalId = 0;
  const removals = new Map<string, number>();
  const commandScope = `lists-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  let snapshot: UserListsSnapshot = {
    status: 'loading',
    isRefreshing: false,
    hasReadError: false,
    entries: [],
  };

  function publish(): void {
    snapshot = {
      status: isLoaded ? 'ready' : hasReadError ? 'error' : 'loading',
      isRefreshing: isReading,
      hasReadError,
      entries: [...entries.values()]
        .filter((entry) => !entry.isDeleted)
        .map((entry) => ({
          listId: entry.listId,
          content: entry.desired,
          confirmed: entry.confirmed,
          isPending: entry.isPending,
          failure: entry.failure,
        })),
    };
    listeners.forEach((listener) => listener());
  }

  function validateContent(content: UserListContent, isDefault = false): void {
    if (
      hasInvalidListMetadata(content) ||
      hasInvalidListNotes(content) ||
      typeof content.name !== 'string' ||
      validateListName(content.name, isDefault ? [] : ['읽기 목록', 'Reading list']) ||
      normalizeListName(content.name) !== content.name ||
      !Array.isArray(content.articleIds) ||
      content.articleIds.some((id) => !articleIds.includes(id)) ||
      new Set(content.articleIds).size !== content.articleIds.length
    )
      throw new Error('Invalid list content');
  }

  async function refreshLists(): Promise<void> {
    if (isReading) return;
    isReading = true;
    const generation = ++readGeneration;
    hasReadError = false;
    const revisions = new Map([...entries].map(([id, entry]) => [id, entry.revision]));
    publish();
    try {
      const response = await source.fetchLists(userId);
      if (generation !== readGeneration) return;
      if (response.userId !== userId || !Array.isArray(response.lists))
        throw new Error('Invalid lists response');
      const ids = new Set<string>();
      const names: string[] = source.managesReadingList ? [] : ['읽기 목록', 'Reading list'];
      for (const list of response.lists) {
        if (
          list.userId !== userId ||
          !list.listId ||
          (list.listId === DEFAULT_LIST_ID && !source.managesReadingList) ||
          ids.has(list.listId) ||
          validateListName(list.name, names)
        )
          throw new Error('Invalid list identity');
        validateContent(list, list.listId === DEFAULT_LIST_ID);
        ids.add(list.listId);
        names.push(list.name);
      }
      for (const list of response.lists) {
        const entry = entries.get(list.listId);
        // 삭제된 목록과 조회 뒤 바뀐 목록은 늦은 응답으로 되살리거나 덮어쓰지 않는다.
        if (
          entry &&
          (entry.isDeleted ||
            entry.revision !== revisions.get(list.listId) ||
            entry.isPending ||
            entry.failure)
        )
          continue;
        const content: UserListContent = {
          name: list.name,
          articleIds: [...list.articleIds],
          ...(list.description !== undefined && { description: list.description }),
          ...(list.isPrivate !== undefined && { isPrivate: list.isPrivate }),
          ...(list.notes !== undefined && { notes: { ...list.notes } }),
        };
        entries.set(list.listId, {
          listId: list.listId,
          confirmed: content,
          desired: content,
          revision: entry?.revision ?? 0,
          intent: entry?.intent ?? 0,
          isPending: false,
          isDeleted: false,
          pendingArticleIds: [],
          failure: null,
        });
      }
      for (const entry of entries.values()) {
        if (
          !ids.has(entry.listId) &&
          entry.revision === revisions.get(entry.listId) &&
          !entry.isPending &&
          !entry.failure
        ) {
          entry.confirmed = null;
          entry.desired = null;
          entry.isDeleted = true;
        }
      }
      isLoaded = true;
    } catch {
      if (generation === readGeneration) hasReadError = true;
    } finally {
      if (generation === readGeneration) { isReading = false; publish(); }
    }
  }

  async function sendNext(entry: ListEntry): Promise<void> {
    if (entry.isPending || entry.isDeleted || !isLoaded) return;
    if (sameContent(entry.desired, entry.confirmed) && !entry.uncertain) {
      if (entry.desired === null) entry.isDeleted = true;
      publish();
      return;
    }
    const content = entry.desired;
    const intent = entry.intent;
    const intentScope = entry.intentScope ?? scope;
    const command = entry.command?.intent === intent ? entry.command : {
      id: ++commandId, intent,
      operation: content === null ? 'delete' as const : entry.confirmed ? 'update' as const : 'create' as const,
    };
    entry.command = command;
    const name = content?.name ?? entry.confirmed?.name ?? '목록';
    entry.pendingArticleIds = [
      ...new Set([...(entry.confirmed?.articleIds ?? []), ...(content?.articleIds ?? [])]),
    ];
    entry.isPending = true;
    publish();
    try {
      const response = await source.setList({
        userId,
        listId: entry.listId,
        content,
        commandId: command.id, commandScope, operation: command.operation,
        expectedContent: entry.confirmed,
      });
      if (
        response.userId !== userId ||
        response.listId !== entry.listId ||
        !sameContent(response.content, content)
      ) {
        throw new Error('Invalid list write response');
      }
      if (response.content) validateContent(response.content, entry.listId === DEFAULT_LIST_ID);
      const catalog = source.getCatalog?.();
      if (response.content && catalog) {
        const current = catalog.find(list => list.userId === userId && list.listId === entry.listId);
        if (!current) throw new UnavailableListError();
        if (!sameContent(current, response.content)) throw new ListConflictError(copyListContent(current));
      }
      entry.confirmed = response.content;
      entry.uncertain = false;
      entry.revision += 1;
      entry.isPending = false;
      if (content === null) {
        entry.isDeleted = true;
        entry.desired = null;
        publish();
      } else void sendNext(entry);
    } catch (error) {
      entry.isPending = false;
      entry.revision += 1;
      if (error instanceof ListConflictError) {
        entry.confirmed = copyListContent(error.current);
        entry.desired = entry.confirmed;
        entry.uncertain = false;
        entry.failure = intentScope === scope ? { name, target: content, conflict: true } : null;
        publish();
        return;
      }
      if (error instanceof UnavailableListError) {
        entry.confirmed = null;
        entry.desired = null;
        entry.isDeleted = true;
        entry.failure = null;
        publish();
        return;
      }
      entry.uncertain = true;
      if (entry.intent !== intent) {
        void sendNext(entry);
        return;
      }
      // 최신 명령만 확정 내용으로 복구하고 실패 목표는 명시적인 재시도를 위해 보관한다.
      entry.failure = intentScope === scope ? { name, target: content } : null;
      entry.desired = entry.confirmed;
      publish();
    }
  }

  function setTarget(entry: ListEntry, target: UserListContent | null): void {
    if (entry.isDeleted || (!entry.failure && !entry.uncertain && sameContent(entry.desired, target))) return;
    if (entry.failure && !entry.failure.conflict && sameContent(entry.failure.target, target)) {
      entry.desired = target;
      entry.failure = null;
      entry.intentScope = scope;
      void sendNext(entry);
      return;
    }
    entry.intent += 1;
    entry.intentScope = scope;
    entry.revision += 1;
    entry.desired = target && copyListContent(target);
    entry.failure = null;
    if (entry.isPending) publish();
    else void sendNext(entry);
  }

  function validateName(name: string, exceptId?: string): string | null {
    const names = [
      '읽기 목록',
      'Reading list',
      ...[...entries.values()]
        .filter((entry) => !entry.isDeleted && entry.listId !== exceptId)
        .flatMap((entry) => [entry.desired?.name, entry.confirmed?.name, entry.failure?.target?.name])
        .filter((name): name is string => name !== undefined),
    ];
    return validateListName(name, names);
  }

  return {
    userId,
    getScope: () => scope,
    setScope(next: string): void {
      if (scope === next) return;
      scope = next;
      readGeneration += 1;
      isReading = false;
      hasReadError = false;
      entries.forEach(entry => { entry.failure = null; });
      publish();
    },
    connect: () => source.subscribe?.(() => {
      readGeneration += 1;
      isReading = false;
      void refreshLists();
    }) ?? (() => {}),
    getSnapshot: (): UserListsSnapshot => snapshot,
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    ensureLists(): void {
      if (!isLoaded && !hasReadError) void refreshLists();
    },
    refreshLists,
    validateName,
    createList(name: string, metadata?: ListMetadata): ListActionResult {
      if (!isLoaded) return { ok: false, message: '목록을 불러온 뒤 다시 시도해 주세요.' };
      if (metadata && hasInvalidListMetadata(metadata))
        return { ok: false, message: '설명은 280자 이내로 입력해 주세요.' };
      const normalized = normalizeListName(name);
      const duplicate = [...entries.values()].find(
        (entry) =>
          !entry.isDeleted &&
          !entry.confirmed &&
          (entry.desired?.name === normalized || entry.failure?.target?.name === normalized),
      );
      if (duplicate) {
        if (duplicate.failure) setTarget(duplicate, duplicate.failure.target);
        return { ok: true, listId: duplicate.listId };
      }
      const error = validateName(name);
      if (error) return { ok: false, message: error };
      const listId = `list-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      const entry: ListEntry = {
        listId,
        confirmed: null,
        desired: null,
        revision: 0,
        intent: 0,
        isPending: false,
        isDeleted: false,
        pendingArticleIds: [],
        failure: null,
      };
      entries.set(listId, entry);
      setTarget(entry, { name: normalized, articleIds: [], ...metadata });
      return { ok: true, listId };
    },
    renameList(listId: string, name: string, metadata?: ListMetadata): ListActionResult {
      if (listId === DEFAULT_LIST_ID) return { ok: false, message: '기본 읽기 목록의 정보는 변경할 수 없어요.' };
      const entry = entries.get(listId);
      const content = entry?.desired ?? (!entry?.confirmed ? entry?.failure?.target : null);
      if (!entry || !content || entry.isDeleted)
        return { ok: false, message: '이 목록은 더 이상 수정할 수 없어요.' };
      if (metadata && hasInvalidListMetadata(metadata))
        return { ok: false, message: '설명은 280자 이내로 입력해 주세요.' };
      const error = validateName(name, listId);
      if (error) return { ok: false, message: error };
      setTarget(entry, { ...content, ...metadata, name: normalizeListName(name) });
      return { ok: true, listId };
    },
    setArticleInList(listId: string, articleId: string, saved: boolean): void {
      const entry = entries.get(listId);
      if (!entry?.desired || entry.isDeleted || !articleIds.includes(articleId)) return;
      const ids = new Set(entry.desired.articleIds);
      if (saved) ids.add(articleId);
      else ids.delete(articleId);
      const notes = { ...entry.desired.notes };
      if (!saved) delete notes[articleId];
      removals.delete(JSON.stringify([listId, articleId]));
      setTarget(entry, { ...entry.desired, articleIds: [...ids], ...(entry.desired.notes && { notes }) });
    },
    setNote(listId: string, articleId: string, note: string): ListActionResult {
      const entry = entries.get(listId);
      if (!entry?.desired?.articleIds.includes(articleId) || entry.isDeleted)
        return { ok: false, message: '이 목록의 기사에 더 이상 메모를 저장할 수 없어요.' };
      const notes = { ...entry.desired.notes };
      if (note.trim()) notes[articleId] = note.normalize('NFC'); else delete notes[articleId];
      setTarget(entry, { ...entry.desired, notes });
      return { ok: true, listId };
    },
    reorderList(listId: string, orderedIds: readonly string[]): ListActionResult {
      const entry = entries.get(listId);
      if (!entry?.desired || entry.isDeleted) return { ok: false, message: '이 목록은 더 이상 수정할 수 없어요.' };
      const ids = entry.desired.articleIds;
      if (orderedIds.length !== ids.length || new Set(orderedIds).size !== ids.length
        || orderedIds.some(id => !ids.includes(id)))
        return { ok: false, message: '목록의 기사가 바뀌었어요. 순서를 다시 확인해 주세요.' };
      setTarget(entry, { ...entry.desired, articleIds: [...orderedIds] });
      return { ok: true, listId };
    },
    removeStory(listId: string, articleId: string): RemovedListStory | null {
      const entry = entries.get(listId);
      if (!entry?.desired || entry.isDeleted) return null;
      const content = entry.desired;
      const index = content.articleIds.indexOf(articleId);
      if (index < 0) return null;
      const removal = ++removalId;
      removals.set(JSON.stringify([listId, articleId]), removal);
      const token: RemovedListStory = { userId, scope, listId, articleId, index, removal,
        beforeId: content.articleIds[index - 1], afterId: content.articleIds[index + 1], note: content.notes?.[articleId] };
      const notes = { ...content.notes };
      delete notes[articleId];
      setTarget(entry, { ...content, articleIds: content.articleIds.filter(id => id !== articleId), notes });
      return token;
    },
    undoRemove(token: RemovedListStory): ListActionResult {
      const entry = entries.get(token.listId);
      const key = JSON.stringify([token.listId, token.articleId]);
      if (token.userId !== userId || token.scope !== scope || !entry?.desired || entry.isDeleted || removals.get(key) !== token.removal)
        return { ok: false, message: '이 제거 작업은 더 이상 되돌릴 수 없어요.' };
      if (entry.desired.articleIds.includes(token.articleId)) return { ok: true, listId: token.listId };
      const ids = [...entry.desired.articleIds];
      const after = token.afterId ? ids.indexOf(token.afterId) : -1;
      const before = token.beforeId ? ids.indexOf(token.beforeId) : -1;
      ids.splice(after >= 0 ? after : before >= 0 ? before + 1 : Math.min(token.index, ids.length), 0, token.articleId);
      const notes = { ...entry.desired.notes, ...(token.note && { [token.articleId]: token.note }) };
      setTarget(entry, { ...entry.desired, articleIds: ids, notes });
      removals.delete(key);
      return { ok: true, listId: token.listId };
    },
    deleteList(listId: string): void {
      if (listId === DEFAULT_LIST_ID) return;
      const entry = entries.get(listId);
      if (entry && !entry.isDeleted) setTarget(entry, null);
    },
    retryList(listId: string): void {
      const entry = entries.get(listId);
      if (entry?.failure && !entry.isPending && !entry.isDeleted) {
        if (entry.failure.conflict) { entry.failure = null; publish(); return; }
        entry.desired = entry.failure.target;
        entry.failure = null;
        entry.intentScope = scope;
        void sendNext(entry);
      }
    },
    hasArticleFailure(articleId: string): boolean {
      return [...entries.values()].some(
        (entry) =>
          entry.failure &&
          Boolean(entry.confirmed?.articleIds.includes(articleId)) !==
            Boolean(entry.failure.target?.articleIds.includes(articleId)),
      );
    },
    isArticlePending(articleId: string): boolean {
      // 전송 중인 명령 뒤에 추가한 기사도 최신 목표가 확정될 때까지 처리 중으로 표시한다.
      return [...entries.values()].some(
        (entry) =>
          entry.isPending &&
          (entry.pendingArticleIds.includes(articleId) || entry.desired?.articleIds.includes(articleId)),
      );
    },
  };
}
