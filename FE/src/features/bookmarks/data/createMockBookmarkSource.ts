import type { BookmarkSource } from '../types';
import { bookmarkArticles } from './bookmarkFixtures';
import { createMockUserListSource } from './createMockUserListSource';
import { userListPreviewScenario } from './userListPreview';
import { DEFAULT_LIST_ID } from '../listTypes';

export type BookmarkScenario = 'normal' | 'read-error' | 'save-error' | 'remove-error' | 'slow';

export function createMockBookmarkSource({ scenario = 'normal', delayMs = scenario === 'slow' ? 1800 : 350,
  managesReadingList = false, articleExists = (id: string) => bookmarkArticles.some(article => article.id === id) }: {
  scenario?: BookmarkScenario; delayMs?: number; managesReadingList?: boolean; articleExists?: (id: string) => boolean;
} = {}): BookmarkSource {
  const savedByUser = new Map<string, Set<string>>();
  const failedRequests = new Set<string>();
  const lists = createMockUserListSource({ scenario: userListPreviewScenario !== 'normal' ? userListPreviewScenario
    : managesReadingList && scenario === 'read-error' ? 'lists-read-error'
    : managesReadingList && scenario === 'save-error' ? 'add-error'
    : managesReadingList && scenario === 'remove-error' ? 'list-remove-error' : 'normal', managesReadingList,
    delayMs: userListPreviewScenario === 'slow' ? 1800 : delayMs, articleExists });
  const writes = new Map<string, Promise<unknown>>();

  function getSaved(userId: string): Set<string> {
    if (!userId.trim()) throw new Error('Invalid mock user');
    let saved = savedByUser.get(userId);
    if (!saved) { saved = new Set(); savedByUser.set(userId, saved); }
    return saved;
  }

  async function waitForResponse(): Promise<void> {
    if (delayMs > 0) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
  }

  function failOnce(key: string): void {
    if (failedRequests.has(key)) return;
    failedRequests.add(key);
    throw new Error('Mock bookmark request failed before applying');
  }

  return {
    lists,
    async fetchReadingList(userId) {
      if (managesReadingList) {
        const response = await lists.fetchLists(userId);
        return { userId, articleIds: response.lists.find(list => list.listId === DEFAULT_LIST_ID)?.articleIds ?? [] };
      }
      const snapshot = { userId, articleIds: [...getSaved(userId)] };
      await waitForResponse();
      if (scenario === 'read-error') failOnce(JSON.stringify([userId, 'read']));
      return snapshot;
    },
    async setArticleSaved(input) {
      if (managesReadingList) {
        const write = (writes.get(input.userId) ?? Promise.resolve()).catch(() => {}).then(async () => {
          const current = (await lists.fetchLists(input.userId)).lists.find(list => list.listId === DEFAULT_LIST_ID);
          if (!current || !articleExists(input.articleId)) throw new Error('Unknown mock article');
          const ids = new Set(current.articleIds);
          if (input.saved) ids.add(input.articleId); else ids.delete(input.articleId);
          const notes = { ...current.notes }; if (!input.saved) delete notes[input.articleId];
          await lists.setList({ userId: input.userId, listId: DEFAULT_LIST_ID, commandId: input.commandId,
            operation: 'update', expectedContent: current, content: { ...current, articleIds: [...ids], notes } });
          return { userId: input.userId, articleId: input.articleId, saved: input.saved };
        });
        writes.set(input.userId, write);
        return write;
      }
      const saved = getSaved(input.userId);
      if (!articleExists(input.articleId)) throw new Error('Unknown mock article');
      await waitForResponse();
      if ((scenario === 'save-error' && input.saved) || (scenario === 'remove-error' && !input.saved)) {
        failOnce(JSON.stringify([input.userId, input.articleId, input.saved]));
      }
      if (input.saved) saved.add(input.articleId);
      else saved.delete(input.articleId);
      return { userId: input.userId, articleId: input.articleId, saved: input.saved };
    },
  };
}
