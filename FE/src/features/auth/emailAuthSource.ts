import { mockUserA, mockUserB } from './data/mockUsers';

export const emailFixtures = [
  { userId: mockUserA.id, name: mockUserA.name, email: 'reader.a@example.test' },
  { userId: mockUserB.id, name: mockUserB.name, email: 'reader.b@example.test' },
] as const;
export type EmailChallenge = { id: string; attemptId: string; userId: string; email: string; expiresAt: number; mockCode: string };
export type EmailRequest = { attemptId: string; email: string; name: string; joining: boolean };
export type EmailAuthSource = {
  begin: () => string;
  cancel: (attemptId: string) => void;
  request: (input: EmailRequest, signal: AbortSignal) => Promise<EmailChallenge>;
  verify: (input: { attemptId: string; challengeId: string; code: string }, signal: AbortSignal) => Promise<string>;
};
export function createMockEmailAuthSource(options: { delayMs?: number; lifetimeMs?: number; requestFailures?: number; verifyFailures?: number; now?: () => number } = {}): EmailAuthSource {
  let sequence = 0; let challengeSequence = 0; let requestFailures = options.requestFailures ?? 0; let verifyFailures = options.verifyFailures ?? 0;
  const now = options.now ?? Date.now; const attempts = new Map<string, { generation: number; challenge: EmailChallenge | null }>();
  async function wait(signal: AbortSignal) {
    if (signal.aborted) throw new Error('cancelled');
    if (options.delayMs !== 0) await new Promise<void>((resolve, reject) => {
      const abort = () => { clearTimeout(timer); reject(new Error('cancelled')); };
      const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, options.delayMs ?? 250);
      signal.addEventListener('abort', abort, { once: true });
    });
    if (signal.aborted) throw new Error('cancelled');
  }
  return {
    begin() { const id = `email-attempt-${++sequence}`; attempts.set(id, { generation: 0, challenge: null }); return id; },
    cancel(attemptId) { attempts.delete(attemptId); },
    async request(input, signal) {
      const attempt = attempts.get(input.attemptId); if (!attempt) throw new Error('cancelled');
      const generation = ++attempt.generation; attempt.challenge = null;
      const fixture = emailFixtures.find(item => item.email === input.email.trim().toLowerCase());
      if (!fixture || input.joining && fixture.name !== input.name.trim()) throw new Error('fixture-required');
      await wait(signal);
      if (attempts.get(input.attemptId) !== attempt || attempt.generation !== generation) throw new Error('cancelled');
      if (requestFailures-- > 0) throw new Error('request-failed');
      const number = ++challengeSequence;
      const challenge: EmailChallenge = { id: `challenge-${number}`, attemptId: input.attemptId, userId: fixture.userId, email: fixture.email,
        expiresAt: now() + (options.lifetimeMs ?? 300000), mockCode: String(123455 + number).padStart(6, '0') };
      attempt.challenge = challenge; return { ...challenge };
    },
    async verify(input, signal) {
      await wait(signal);
      const challenge = attempts.get(input.attemptId)?.challenge;
      if (!challenge || challenge.id !== input.challengeId) throw new Error('expired-code');
      if (now() >= challenge.expiresAt) throw new Error('expired-code');
      if (!/^\d{6}$/u.test(input.code) || input.code !== challenge.mockCode) throw new Error('invalid-code');
      if (verifyFailures-- > 0) throw new Error('verify-failed');
      // 공통 세션 확정에 실패한 재시도도 같은 challenge로 검증하고 성공 시 화면 수명이 시도를 폐기한다.
      return challenge.userId;
    },
  };
}
