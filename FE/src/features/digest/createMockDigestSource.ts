import type { Digest, DigestSource } from './types';

// June 12/8은 원본 카드 구성이고 나머지 호의 기사와 June 7의 빈 상태는 자체 모의 자료다.
export const digestFixtures: readonly Digest[] = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2].map((day, index) => {
  const date = new Date(Date.UTC(2025, 5, day)).toISOString().slice(0, 10);
  return { id: `digest-${date}`, date, publishedAt: `${date}T08:00:00Z`,
    articleIds: day === 8 ? ['medium-goodbye-notion', 'medium-digest-alex'] :
      day === 7 ? [] : index % 2 ? ['medium-brain', 'medium-evening'] : ['medium-love', 'medium-jeremiah'] };
});

export function createMockDigestSource({ delayMs = 180, scenario = 'normal', initial = digestFixtures }: {
  delayMs?: number; scenario?: 'normal' | 'catalog-error' | 'detail-error' | 'empty'; initial?: readonly Digest[];
} = {}): DigestSource & { replaceIssues: (issues: readonly Digest[]) => void } {
  let issues = scenario === 'empty' ? [] : initial.map(issue => ({ ...issue, articleIds: [...issue.articleIds] }));
  const listeners = new Set<() => void>();
  const failures = new Set<string>();
  async function wait(key: string, fails: boolean) {
    if (delayMs) await new Promise(resolve => setTimeout(resolve, delayMs));
    if (fails && !failures.has(key)) { failures.add(key); throw new Error('DIGEST_READ_FAILED'); }
  }
  return {
    async fetchIssues(userId) {
      await wait(`${userId}:catalog`, scenario === 'catalog-error');
      return { userId, issues: issues.map(({ id, date, publishedAt }) => ({ id, date, publishedAt })) };
    },
    async fetchDigest(userId, issueId) {
      await wait(`${userId}:${issueId}`, scenario === 'detail-error');
      const digest = issues.find(issue => issue.id === issueId);
      if (!digest) throw new Error('DIGEST_UNAVAILABLE');
      return { userId, digest: { ...digest, articleIds: [...digest.articleIds] } };
    },
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    replaceIssues(next) { issues = next.map(issue => ({ ...issue, articleIds: [...issue.articleIds] })); listeners.forEach(listener => listener()); },
  };
}
