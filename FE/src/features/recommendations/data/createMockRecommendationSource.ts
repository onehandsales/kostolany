import type { RecommendationSource, RecommendationValue } from '../types';

export function createMockRecommendationSource({
  delayMs = 120,
  scenario = 'normal',
}: {
  delayMs?: number;
  scenario?: 'normal' | 'read-error' | 'write-error' | 'slow';
} = {}): RecommendationSource {
  const users = new Map<string, RecommendationValue>();
  const applied = new Map<string, string>();
  const failed = new Set<string>();
  const readCurrent = (userId: string): RecommendationValue =>
    users.get(userId) ?? { userId, version: 0, hiddenArticleIds: [] };
  async function wait(key: string, fail: boolean) {
    await new Promise<void>((resolve) => setTimeout(resolve, scenario === 'slow' ? 3500 : delayMs));
    if (fail && !failed.has(key)) {
      failed.add(key);
      throw new Error('Mock recommendation failure');
    }
  }
  return {
    async read(userId) {
      const value = readCurrent(userId);
      await wait(`read:${userId}`, scenario === 'read-error');
      return value;
    },
    async execute(userId, command, signal) {
      if (
        !userId.trim() ||
        !command.operationId?.trim() ||
        !command.articleId?.trim() ||
        typeof command.hidden !== 'boolean'
      )
        throw new Error('Invalid command');
      await wait(`write:${userId}`, scenario === 'write-error');
      if (signal?.aborted) throw new Error('Cancelled');
      const key = `${userId}:${command.operationId}`;
      const fingerprint = JSON.stringify([command.articleId, command.hidden]);
      if (applied.has(key)) {
        if (applied.get(key) !== fingerprint) throw new Error('Duplicate operation mismatch');
        return readCurrent(userId);
      }
      const old = readCurrent(userId);
      const ids = new Set(old.hiddenArticleIds);
      if (command.hidden) ids.add(command.articleId);
      else ids.delete(command.articleId);
      const next = { userId, version: old.version + 1, hiddenArticleIds: [...ids] };
      users.set(userId, next);
      applied.set(key, fingerprint);
      return next;
    },
  };
}
