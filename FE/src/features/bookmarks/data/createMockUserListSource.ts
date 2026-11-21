import { DEFAULT_LIST_ID, ListConflictError, UnavailableListError, type UserList, type UserListSource } from '../listTypes';
import { hasInvalidListMetadata } from '../hasInvalidListMetadata';
import { normalizeListName, validateListName } from '../validateListName';
import { bookmarkArticles } from './bookmarkFixtures';
import { copyListContent, hasInvalidListNotes, sameListContent } from '../listContent';

export type UserListScenario =
  | 'normal'
  | 'lists-read-error'
  | 'create-error'
  | 'rename-error'
  | 'delete-error'
  | 'add-error'
  | 'list-remove-error'
  | 'note-error'
  | 'reorder-error'
  | 'slow';

export function createMockUserListSource({
  scenario = 'normal',
  delayMs = scenario === 'slow' ? 1800 : 350,
  managesReadingList = false,
  articleExists = (id: string) => bookmarkArticles.some(article => article.id === id),
}: {
  scenario?: UserListScenario;
  delayMs?: number;
  managesReadingList?: boolean;
  articleExists?: (id: string) => boolean;
} = {}): UserListSource {
  const listsByUser = new Map<string, Map<string, UserList>>();
  const deletedByUser = new Map<string, Set<string>>();
  const failedRequests = new Set<string>();
  const applied = new Map<string, string>();
  const listeners = new Set<() => void>();
  function getLists(userId: string): Map<string, UserList> {
    if (!userId.trim()) throw new Error('Invalid mock user');
    let lists = listsByUser.get(userId);
    if (!lists) {
      lists = new Map();
      if (managesReadingList) lists.set(DEFAULT_LIST_ID,
        { userId, listId: DEFAULT_LIST_ID, name: '읽기 목록', articleIds: [], isPrivate: true });
      listsByUser.set(userId, lists);
    }
    return lists;
  }
  async function waitForResponse(): Promise<void> {
    if (delayMs > 0) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
  }
  function failOnce(key: string): void {
    if (failedRequests.has(key)) return;
    failedRequests.add(key);
    throw new Error('Mock list request failed before applying');
  }
  return {
    managesReadingList,
    getCatalog: () => [...listsByUser.values()].flatMap(lists => [...lists.values()]
      .map(list => ({ ...copyListContent(list), userId: list.userId, listId: list.listId }))),
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    async fetchLists(userId) {
      const lists = [...getLists(userId).values()].map((list) => ({
        ...copyListContent(list), userId: list.userId, listId: list.listId,
      }));
      await waitForResponse();
      if (scenario === 'lists-read-error') failOnce(JSON.stringify([userId, 'read']));
      return { userId, lists };
    },
    async setList({ userId, listId, content, commandId, commandScope, operation, expectedContent }) {
      const lists = getLists(userId);
      const isDefault = listId === DEFAULT_LIST_ID;
      if (!listId || (isDefault && (!managesReadingList || !content
        || content.name !== '읽기 목록' || content.isPrivate !== true))) throw new Error('Protected list');
      await waitForResponse();
      const previous = lists.get(listId);
      const key = JSON.stringify([userId, commandScope, commandId]);
      const fingerprint = JSON.stringify([listId, content]);
      const replay = commandScope ? applied.get(key) : undefined;
      if (replay !== undefined) {
        if (replay !== fingerprint) throw new Error('Conflicting list command');
        if (content && !previous) throw new UnavailableListError();
        if (content && previous && !sameListContent(content, previous)) throw new ListConflictError(copyListContent(previous));
        return { userId, listId, content: content && copyListContent(content) };
      }
      if (operation === 'update' && !previous) throw new UnavailableListError();
      if (operation === 'create' && previous) throw new ListConflictError(copyListContent(previous));
      if (operation === 'update' && expectedContent !== undefined && previous
        && !sameListContent(expectedContent, previous)) throw new ListConflictError(copyListContent(previous));
      const failureScenario =
        content === null
          ? 'delete-error'
          : !previous
            ? 'create-error'
            : previous.name !== content.name ||
                previous.description !== content.description ||
                previous.isPrivate !== content.isPrivate
              ? 'rename-error'
              : JSON.stringify(content.notes ?? {}) !== JSON.stringify(previous.notes ?? {})
                && content.articleIds.length === previous.articleIds.length
                ? 'note-error'
              : content.articleIds.length === previous.articleIds.length
                && content.articleIds.every(id => previous.articleIds.includes(id))
                && content.articleIds.some((id, index) => id !== previous.articleIds[index])
                ? 'reorder-error'
              : content.articleIds.some((id) => !previous.articleIds.includes(id))
                ? 'add-error'
                : 'list-remove-error';
      if (scenario === failureScenario) failOnce(JSON.stringify([userId, listId, failureScenario]));
      if (content === null) {
        lists.delete(listId);
        const deleted = deletedByUser.get(userId) ?? new Set<string>();
        deleted.add(listId);
        deletedByUser.set(userId, deleted);
      } else {
        if (deletedByUser.get(userId)?.has(listId)) throw new UnavailableListError();
        const names = [
          ...(isDefault ? [] : ['읽기 목록', 'Reading list']),
          ...[...lists.values()].filter((list) => list.listId !== listId).map((list) => list.name),
        ];
        if (
          hasInvalidListMetadata(content) ||
          hasInvalidListNotes(content) ||
          validateListName(content.name, names) ||
          normalizeListName(content.name) !== content.name ||
          content.articleIds.some((id) => !articleExists(id)) ||
          new Set(content.articleIds).size !== content.articleIds.length
        )
          throw new Error('Invalid list');
        lists.set(listId, { ...copyListContent(content), userId, listId });
      }
      if (commandScope) applied.set(key, fingerprint);
      listeners.forEach(listener => listener());
      return { userId, listId, content: content && copyListContent(content) };
    },
  };
}
