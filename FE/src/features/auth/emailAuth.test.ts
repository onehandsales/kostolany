import { createAuthStore } from './createAuthStore';
import { createMockAuthSource } from './data/createMockAuthSource';
import { mockUserA, mockUserB } from './data/mockUsers';
import { createEmailAttempt } from './createEmailAttempt';
import { createMockEmailAuthSource, emailFixtures } from './emailAuthSource';

const signal = () => new AbortController().signal;
it('이메일 fixture와 이름·코드 형식·만료를 검사하고 재전송은 이전 challenge와 코드를 무효화한다', async () => {
  let time = 1000; const source = createMockEmailAuthSource({ delayMs: 0, now: () => time, lifetimeMs: 100 }); const attemptId = source.begin();
  const request = { attemptId, email: emailFixtures[0].email, name: mockUserA.name, joining: true };
  await expect(source.request({ ...request, email: 'not-a-fixture' }, signal())).rejects.toThrow('fixture-required');
  await expect(source.request({ ...request, name: '다른 이름' }, signal())).rejects.toThrow('fixture-required');
  const first = await source.request(request, signal());
  await expect(source.verify({ attemptId, challengeId: first.id, code: '12345' }, signal())).rejects.toThrow('invalid-code');
  await expect(source.verify({ attemptId, challengeId: first.id, code: '000000' }, signal())).rejects.toThrow('invalid-code');
  time += 100; await expect(source.verify({ attemptId, challengeId: first.id, code: first.mockCode }, signal())).rejects.toThrow('expired-code');
  const second = await source.request(request, signal()); expect(second.mockCode).not.toBe(first.mockCode);
  await expect(source.verify({ attemptId, challengeId: first.id, code: first.mockCode }, signal())).rejects.toThrow('expired-code');
  await expect(source.verify({ attemptId, challengeId: second.id, code: first.mockCode }, signal())).rejects.toThrow('invalid-code');
  expect(await source.verify({ attemptId, challengeId: second.id, code: second.mockCode }, signal())).toBe(mockUserA.id);
  source.cancel(attemptId); await expect(source.verify({ attemptId, challengeId: second.id, code: second.mockCode }, signal())).rejects.toThrow('expired-code');
});
it('요청·검증 실패 뒤 입력을 유지하고 중복 제출을 막으며 같은 코드 재시도로 공통 세션만 확정한다', async () => {
  const source = createMockEmailAuthSource({ delayMs: 0, requestFailures: 1, verifyFailures: 1 }); const request = jest.fn(source.request); const verify = jest.fn(source.verify);
  const auth = createAuthStore(createMockAuthSource({ delayMs: 0 })); auth.openLogin({ kind: 'write' });
  const attempt = createEmailAttempt({ ...source, request, verify }, auth, false); const close = attempt.activate(); attempt.input('email', emailFixtures[1].email);
  await attempt.request(); expect(attempt.getSnapshot().error).toBe('request-failed'); expect(attempt.getSnapshot().email).toBe(emailFixtures[1].email);
  const first = attempt.request(); await attempt.request(); await first; expect(request).toHaveBeenCalledTimes(2);
  const code = attempt.getSnapshot().challenge!.mockCode; attempt.input('code', code); await attempt.verify(); expect(attempt.getSnapshot().code).toBe(code); expect(attempt.getSnapshot().error).toBe('verify-failed');
  await attempt.verify('failure'); expect(attempt.getSnapshot().error).toBe('sign-in-failed'); expect(auth.getSnapshot().user).toBeNull();
  const retry = attempt.verify(); await attempt.verify(); await retry; expect(verify).toHaveBeenCalledTimes(3); expect(auth.getSnapshot().user).toEqual(mockUserB); expect(auth.getSnapshot().dialog).toBeNull(); close();
});
it('코드 검증 중 뒤로·이메일 변경·닫기·같은 계정 재로그인 뒤 늦은 응답은 인증을 완료하지 않는다', async () => {
  const base = createMockEmailAuthSource({ delayMs: 0 }); let release!: (id: string) => void;
  const auth = createAuthStore(createMockAuthSource({ delayMs: 0 })); auth.openLogin({ kind: 'write' });
  const attempt = createEmailAttempt({ ...base, verify: () => new Promise(resolve => { release = resolve; }) }, auth, false); const close = attempt.activate();
  attempt.input('email', emailFixtures[0].email); await attempt.request(); attempt.input('code', attempt.getSnapshot().challenge!.mockCode); const old = attempt.verify();
  attempt.back(); attempt.input('email', emailFixtures[1].email); release(mockUserA.id); await old; expect(auth.getSnapshot().user).toBeNull(); expect(attempt.getSnapshot().email).toBe(emailFixtures[1].email);
  await attempt.request(); attempt.input('code', attempt.getSnapshot().challenge!.mockCode); const cancelled = attempt.verify(); auth.closeDialog();
  auth.openLogin({ kind: 'profile' }); await auth.signIn(mockUserA.id); auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'write' });
  release(mockUserB.id); await cancelled; expect(auth.getSnapshot().user).toBeNull(); close();
});
it('재전송 응답 역전과 취소·해제 뒤 완료는 최신 challenge를 바꾸거나 살아나게 하지 않는다', async () => {
  jest.useFakeTimers();
  try {
    const source = createMockEmailAuthSource({ delayMs: 100 }); const attemptId = source.begin(); const input = { attemptId, email: emailFixtures[0].email, name: '', joining: false };
    const first = source.request(input, signal()); const rejected = expect(first).rejects.toThrow('cancelled'); const second = source.request(input, signal());
    await jest.runAllTimersAsync(); await rejected; const challenge = await second; expect(await (async () => { const task = source.verify({ attemptId, challengeId: challenge.id, code: challenge.mockCode }, signal()); await jest.runAllTimersAsync(); return task; })()).toBe(mockUserA.id);
    const pending = source.request(input, signal()); const check = expect(pending).rejects.toThrow('cancelled'); source.cancel(attemptId); await jest.runAllTimersAsync(); await check;
  } finally { jest.useRealTimers(); }
});
it('다른 계정의 challenge와 늦은 요청 실패는 현재 이메일 선택이나 새 시도를 확정하지 않는다', async () => {
  const base = createMockEmailAuthSource({ delayMs: 0 });
  const auth = createAuthStore(createMockAuthSource({ delayMs: 0 })); auth.openLogin({ kind: 'profile' });
  const source = { ...base, request: async (...args: Parameters<typeof base.request>) => ({ ...await base.request(...args), userId: mockUserB.id }) };
  const attempt = createEmailAttempt(source, auth, false); const close = attempt.activate(); attempt.input('email', emailFixtures[0].email); await attempt.request();
  expect(attempt.getSnapshot().error).toBe('request-failed'); expect(attempt.getSnapshot().challenge).toBeNull(); expect(auth.getSnapshot().user).toBeNull(); close();
  let reject!: (error: Error) => void;
  const delayed = createEmailAttempt({ ...base, request: () => new Promise((_resolve, fail) => { reject = fail; }) }, auth, false); const stop = delayed.activate(); delayed.input('email', emailFixtures[0].email); const request = delayed.request(); delayed.back(); delayed.input('email', emailFixtures[1].email); reject(new Error('old'));
  await request; expect(delayed.getSnapshot()).toMatchObject({ email: emailFixtures[1].email, error: null, busy: false }); stop();
});
