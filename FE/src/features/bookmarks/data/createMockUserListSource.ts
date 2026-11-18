import { DEFAULT_LIST_ID, type UserList, type UserListSource } from '../listTypes';
import { normalizeListName, validateListName } from '../validateListName';
import { bookmarkArticles } from './bookmarkFixtures';

export type UserListScenario = 'normal' | 'lists-read-error' | 'create-error' | 'rename-error'
  | 'delete-error' | 'add-error' | 'list-remove-error' | 'slow';

export function createMockUserListSource({ scenario = 'normal', delayMs = scenario === 'slow' ? 1800 : 350 }: {
  scenario?: UserListScenario; delayMs?: number;
} = {}): UserListSource {
  const listsByUser = new Map<string, Map<string, UserList>>();
  const deletedByUser = new Map<string, Set<string>>();
  const failedRequests = new Set<string>();
  const articleIds = new Set(bookmarkArticles.map((article) => article.id));
  function getLists(userId: string): Map<string, UserList> {
    if (!userId.trim()) throw new Error('Invalid mock user');
    let lists = listsByUser.get(userId);
    if (!lists) { lists = new Map(); listsByUser.set(userId, lists); }
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
    async fetchLists(userId) {
      const lists = [...getLists(userId).values()].map((list) => ({ ...list, articleIds: [...list.articleIds] }));
      await waitForResponse();
      if (scenario === 'lists-read-error') failOnce(JSON.stringify([userId, 'read']));
      return { userId, lists };
    },
    async setList({ userId, listId, content }) {
      const lists = getLists(userId);
      if (!listId || listId === DEFAULT_LIST_ID) throw new Error('Protected list');
      await waitForResponse();
      const previous = lists.get(listId);
      const operation = content === null ? 'delete-error' : !previous ? 'create-error'
        : previous.name !== content.name ? 'rename-error'
          : content.articleIds.some((id) => !previous.articleIds.includes(id)) ? 'add-error' : 'list-remove-error';
      if (scenario === operation) failOnce(JSON.stringify([userId, listId, operation]));
      if (content === null) {
        lists.delete(listId);
        const deleted = deletedByUser.get(userId) ?? new Set<string>();
        deleted.add(listId); deletedByUser.set(userId, deleted);
      } else {
        if (deletedByUser.get(userId)?.has(listId)) throw new Error('Deleted list cannot be recreated');
        const names = ['읽기 목록', ...[...lists.values()].filter((list) => list.listId !== listId).map((list) => list.name)];
        if (validateListName(content.name, names) || normalizeListName(content.name) !== content.name
          || content.articleIds.some((id) => !articleIds.has(id))
          || new Set(content.articleIds).size !== content.articleIds.length) throw new Error('Invalid list');
        lists.set(listId, { userId, listId, name: content.name, articleIds: [...content.articleIds] });
      }
      return { userId, listId, content: content && { ...content, articleIds: [...content.articleIds] } };
    },
  };
}
