import type { BookmarkSource } from '../types';
import { bookmarkArticles } from './bookmarkFixtures';

export type BookmarkScenario = 'normal' | 'read-error' | 'save-error' | 'remove-error' | 'slow';

export function createMockBookmarkSource({ scenario = 'normal', delayMs = scenario === 'slow' ? 1800 : 350 }: {
  scenario?: BookmarkScenario; delayMs?: number;
} = {}): BookmarkSource {
  const savedByUser = new Map<string, Set<string>>();
  const failedRequests = new Set<string>();
  const articleIds = new Set(bookmarkArticles.map((article) => article.id));

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
    async fetchReadingList(userId) {
      const snapshot = { userId, articleIds: [...getSaved(userId)] };
      await waitForResponse();
      if (scenario === 'read-error') failOnce(JSON.stringify([userId, 'read']));
      return snapshot;
    },
    async setArticleSaved(input) {
      const saved = getSaved(input.userId);
      if (!articleIds.has(input.articleId)) throw new Error('Unknown mock article');
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
