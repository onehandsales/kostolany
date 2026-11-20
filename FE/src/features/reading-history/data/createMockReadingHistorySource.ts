import type { ReadingHistorySource, ReadingVisit } from '../types';

export function createMockReadingHistorySource({
  delayMs = 120,
  scenario = 'normal',
}: {
  delayMs?: number;
  scenario?: 'normal' | 'read-error' | 'write-error' | 'remove-error' | 'slow';
} = {}): ReadingHistorySource {
  const users = new Map<string, readonly ReadingVisit[]>();
  const failures = new Set<string>();
  const applied = new Map<string, { fingerprint: string; visits: readonly ReadingVisit[] }>();
  async function wait(key: string, fail: boolean): Promise<void> {
    const delay = scenario === 'slow' ? 4000 : delayMs;
    if (delay > 0) await new Promise<void>((resolve) => setTimeout(resolve, delay));
    if (fail && !failures.has(key)) {
      failures.add(key);
      throw new Error('Mock history failure');
    }
  }
  return {
    async read(userId) {
      const visits = users.get(userId) ?? [];
      await wait(`read:${userId}`, scenario === 'read-error');
      return { userId, visits };
    },
    async save({ userId, visits, commandId }) {
      const key = `${userId}:${commandId}`;
      const fingerprint = JSON.stringify(visits);
      if (applied.has(key)) {
        if (applied.get(key)?.fingerprint !== fingerprint) throw new Error('Invalid history operation');
        return { userId, visits: applied.get(key)?.visits ?? [] };
      }
      await wait(
        `save:${userId}`,
        scenario === 'write-error' ||
          (scenario === 'remove-error' && visits.length < (users.get(userId)?.length ?? 0)),
      );
      const next = visits.map((visit) => ({ ...visit }));
      users.set(userId, next);
      applied.set(key, { fingerprint, visits: next });
      return { userId, visits: next };
    },
  };
}
