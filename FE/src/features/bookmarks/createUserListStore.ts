import { DEFAULT_LIST_ID, type ListActionResult, type UserListContent, type UserListsSnapshot,
  type UserListSource } from './listTypes';
import { normalizeListName, validateListName } from './validateListName';

type ListEntry = {
  listId: string; confirmed: UserListContent | null; desired: UserListContent | null;
  revision: number; intent: number; isPending: boolean; isDeleted: boolean;
  pendingArticleIds: readonly string[];
  failure: Readonly<{ name: string; target: UserListContent | null }> | null;
};

function sameContent(left: UserListContent | null, right: UserListContent | null): boolean {
  return left === right || (left !== null && right !== null && left.name === right.name
    && left.articleIds.length === right.articleIds.length && left.articleIds.every((id) => right.articleIds.includes(id)));
}

export type UserListStore = ReturnType<typeof createUserListStore>;

export function createUserListStore(source: UserListSource, userId: string, articleIds: readonly string[]) {
  // 확정 내용과 최신 목표를 분리해 이름과 기사 소속을 하나의 목록 명령으로 직렬 처리한다.
  const entries = new Map<string, ListEntry>();
  const listeners = new Set<() => void>();
  let isLoaded = false;
  let isReading = false;
  let hasReadError = false;
  let commandId = 0;
  let snapshot: UserListsSnapshot = { status: 'loading', isRefreshing: false, hasReadError: false, entries: [] };

  function publish(): void {
    snapshot = { status: isLoaded ? 'ready' : hasReadError ? 'error' : 'loading', isRefreshing: isReading, hasReadError,
      entries: [...entries.values()].filter((entry) => !entry.isDeleted).map((entry) => ({
        listId: entry.listId, content: entry.desired, isPending: entry.isPending, failure: entry.failure,
      })) };
    listeners.forEach((listener) => listener());
  }

  function validateContent(content: UserListContent): void {
    if (typeof content.name !== 'string' || validateListName(content.name, ['읽기 목록'])
      || normalizeListName(content.name) !== content.name || !Array.isArray(content.articleIds)
      || content.articleIds.some((id) => !articleIds.includes(id))
      || new Set(content.articleIds).size !== content.articleIds.length) throw new Error('Invalid list content');
  }

  async function refreshLists(): Promise<void> {
    if (isReading) return;
    isReading = true; hasReadError = false;
    const revisions = new Map([...entries].map(([id, entry]) => [id, entry.revision]));
    publish();
    try {
      const response = await source.fetchLists(userId);
      if (response.userId !== userId || !Array.isArray(response.lists)) throw new Error('Invalid lists response');
      const ids = new Set<string>();
      const names: string[] = ['읽기 목록'];
      for (const list of response.lists) {
        if (list.userId !== userId || !list.listId || list.listId === DEFAULT_LIST_ID || ids.has(list.listId)
          || validateListName(list.name, names)) throw new Error('Invalid list identity');
        validateContent(list); ids.add(list.listId); names.push(list.name);
      }
      for (const list of response.lists) {
        const entry = entries.get(list.listId);
        // 삭제된 목록과 조회 뒤 바뀐 목록은 늦은 응답으로 되살리거나 덮어쓰지 않는다.
        if (entry && (entry.isDeleted || entry.revision !== revisions.get(list.listId)
          || entry.isPending || entry.failure)) continue;
        const content = { name: list.name, articleIds: [...list.articleIds] };
        entries.set(list.listId, { listId: list.listId, confirmed: content, desired: content,
          revision: entry?.revision ?? 0, intent: entry?.intent ?? 0, isPending: false, isDeleted: false,
          pendingArticleIds: [], failure: null });
      }
      for (const entry of entries.values()) {
        if (!ids.has(entry.listId) && entry.revision === revisions.get(entry.listId) && !entry.isPending && !entry.failure) {
          entry.confirmed = null; entry.desired = null; entry.isDeleted = true;
        }
      }
      isLoaded = true;
    } catch { hasReadError = true; }
    finally { isReading = false; publish(); }
  }

  async function sendNext(entry: ListEntry): Promise<void> {
    if (entry.isPending || entry.isDeleted || !isLoaded) return;
    if (sameContent(entry.desired, entry.confirmed)) {
      if (entry.desired === null) entry.isDeleted = true;
      publish(); return;
    }
    const content = entry.desired;
    const intent = entry.intent;
    const name = content?.name ?? entry.confirmed?.name ?? '목록';
    entry.pendingArticleIds = [...new Set([...(entry.confirmed?.articleIds ?? []), ...(content?.articleIds ?? [])])];
    entry.isPending = true; publish();
    try {
      const response = await source.setList({ userId, listId: entry.listId, content, commandId: ++commandId });
      if (response.userId !== userId || response.listId !== entry.listId || !sameContent(response.content, content)) {
        throw new Error('Invalid list write response');
      }
      if (response.content) validateContent(response.content);
      entry.confirmed = response.content; entry.revision += 1; entry.isPending = false;
      if (content === null) { entry.isDeleted = true; entry.desired = null; publish(); }
      else void sendNext(entry);
    } catch {
      entry.isPending = false; entry.revision += 1;
      if (entry.intent !== intent) { void sendNext(entry); return; }
      // 최신 명령만 확정 내용으로 복구하고 실패 목표는 명시적인 재시도를 위해 보관한다.
      entry.failure = { name, target: content }; entry.desired = entry.confirmed; publish();
    }
  }

  function setTarget(entry: ListEntry, target: UserListContent | null): void {
    if (entry.isDeleted || (!entry.failure && sameContent(entry.desired, target))) return;
    entry.intent += 1; entry.revision += 1; entry.desired = target; entry.failure = null;
    if (entry.isPending) publish();
    else void sendNext(entry);
  }

  function validateName(name: string, exceptId?: string): string | null {
    const names = ['읽기 목록', ...[...entries.values()].filter((entry) => !entry.isDeleted && entry.listId !== exceptId)
      .flatMap((entry) => [entry.desired?.name, entry.confirmed?.name, entry.failure?.target?.name])
      .filter((name): name is string => name !== undefined)];
    return validateListName(name, names);
  }

  return {
    getSnapshot: (): UserListsSnapshot => snapshot,
    subscribe(listener: () => void): () => void { listeners.add(listener); return () => { listeners.delete(listener); }; },
    ensureLists(): void { if (!isLoaded && !hasReadError) void refreshLists(); },
    refreshLists,
    validateName,
    createList(name: string): ListActionResult {
      if (!isLoaded) return { ok: false, message: '목록을 불러온 뒤 다시 시도해 주세요.' };
      const normalized = normalizeListName(name);
      const duplicate = [...entries.values()].find((entry) => !entry.isDeleted && !entry.confirmed
        && (entry.desired?.name === normalized || entry.failure?.target?.name === normalized));
      if (duplicate) {
        if (duplicate.failure) setTarget(duplicate, duplicate.failure.target);
        return { ok: true, listId: duplicate.listId };
      }
      const error = validateName(name);
      if (error) return { ok: false, message: error };
      const listId = `list-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      const entry: ListEntry = { listId, confirmed: null, desired: null, revision: 0, intent: 0,
        isPending: false, isDeleted: false, pendingArticleIds: [], failure: null };
      entries.set(listId, entry); setTarget(entry, { name: normalized, articleIds: [] });
      return { ok: true, listId };
    },
    renameList(listId: string, name: string): ListActionResult {
      const entry = entries.get(listId);
      const content = entry?.desired ?? (!entry?.confirmed ? entry?.failure?.target : null);
      if (!entry || !content || entry.isDeleted) return { ok: false, message: '이 목록은 더 이상 수정할 수 없어요.' };
      const error = validateName(name, listId);
      if (error) return { ok: false, message: error };
      setTarget(entry, { ...content, name: normalizeListName(name) });
      return { ok: true, listId };
    },
    setArticleInList(listId: string, articleId: string, saved: boolean): void {
      const entry = entries.get(listId);
      if (!entry?.desired || entry.isDeleted || !articleIds.includes(articleId)) return;
      const ids = new Set(entry.desired.articleIds);
      if (saved) ids.add(articleId); else ids.delete(articleId);
      setTarget(entry, { ...entry.desired, articleIds: [...ids] });
    },
    deleteList(listId: string): void {
      const entry = entries.get(listId);
      if (entry && !entry.isDeleted) setTarget(entry, null);
    },
    retryList(listId: string): void {
      const entry = entries.get(listId);
      if (entry?.failure && !entry.isPending && !entry.isDeleted) setTarget(entry, entry.failure.target);
    },
    hasArticleFailure(articleId: string): boolean {
      return [...entries.values()].some((entry) => entry.failure
        && Boolean(entry.confirmed?.articleIds.includes(articleId)) !== Boolean(entry.failure.target?.articleIds.includes(articleId)));
    },
    isArticlePending(articleId: string): boolean {
      // 전송 중인 명령 뒤에 추가한 기사도 최신 목표가 확정될 때까지 처리 중으로 표시한다.
      return [...entries.values()].some((entry) => entry.isPending
        && (entry.pendingArticleIds.includes(articleId) || entry.desired?.articleIds.includes(articleId)));
    },
  };
}
