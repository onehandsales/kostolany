import { createAuthStore } from '../auth/createAuthStore';
import { createMockAuthSource } from '../auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../auth/data/mockUsers';
import { deferred } from '../feed/tests/helpers';
import { createOnboardingSession } from './createOnboardingSession';
import { createMockNotificationPermission } from './notificationPermission';
import { createMockOnboardingSource, type OnboardingRecord, type OnboardingSource } from './onboardingSource';

const signal = () => new AbortController().signal;
async function signed(joining = true) {
  const auth = createAuthStore(createMockAuthSource({ delayMs: 0 }));
  auth.openLogin({ kind: 'write' });
  await auth.signIn(mockUserA.id, 'success', 'Google', joining);
  return auth;
}
async function loaded(source: OnboardingSource, joining = true) {
  const auth = await signed(joining);
  const session = createOnboardingSession(source, auth, mockUserA.id);
  const dispose = session.activate();
  await session.reload();
  return { auth, session, dispose };
}
it('계정별 신규 fixture와 단계 버전을 검사하고 응답 유실 재시도와 완료 후 재요청은 중복 저장하지 않는다', async () => {
  const source = createMockOnboardingSource({ delayMs: 0, lostResponses: 1 });
  expect((await source.read(mockUserB.id, signal())).accountKind).toBe('existing');
  await expect(source.save(mockUserB.id, { operationId: 'start', expectedVersion: 0, step: 'interests' }, signal())).rejects.toThrow();
  const command = { operationId: 'start', expectedVersion: 0, step: 'interests' as const };
  await expect(source.save(mockUserA.id, command, signal())).rejects.toThrow('response-lost');
  expect(await source.save(mockUserA.id, command, signal())).toMatchObject({ version: 1, step: 'interests', started: true });
  await expect(source.save(mockUserA.id, { ...command, step: 'welcome' }, signal())).rejects.toThrow('conflicting-operation');
  await expect(source.save(mockUserA.id, { ...command, operationId: 'old' }, signal())).rejects.toThrow('invalid-transition');
  let version = 1;
  for (const step of ['following', 'notifications', 'membership', 'complete'] as const) {
    await source.save(mockUserA.id, { operationId: step, expectedVersion: version++, step,
      ...(step === 'membership' ? { notificationChoice: 'skipped' as const } : {}) }, signal());
  }
  expect(await source.save(mockUserA.id, { operationId: 'complete', expectedVersion: 4, step: 'complete' }, signal())).toMatchObject({ version: 5 });
  await expect(source.save(mockUserA.id, { operationId: 'revive', expectedVersion: 5, step: 'welcome' }, signal())).rejects.toThrow();
  expect((await source.read(mockUserB.id, signal())).version).toBe(0);
});
it('가입의 신규 계정만 자동 진입하고 중단한 확정 단계는 재로그인에서 재개하되 완료 후 반복하지 않는다', async () => {
  const source = createMockOnboardingSource({ delayMs: 0, showWelcome: false, showMembership: false });
  const normal = await loaded(source, false);
  expect(normal.session.getSnapshot().isOpen).toBe(false); normal.dispose();
  const { auth, session, dispose } = await loaded(source);
  expect(session.getSnapshot()).toMatchObject({ isOpen: true, record: { step: 'interests' } });
  await session.save('following'); session.close(); dispose();
  auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'profile' }); await auth.signIn(mockUserA.id);
  const resumed = createOnboardingSession(source, auth, mockUserA.id); const stop = resumed.activate(); await resumed.reload();
  expect(resumed.getSnapshot()).toMatchObject({ isOpen: true, record: { step: 'following' } });
  await resumed.save('notifications'); await resumed.save('complete', 'skipped');
  expect(resumed.getSnapshot().isOpen).toBe(false); stop();
  const done = await loaded(source); expect(done.session.getSnapshot().isOpen).toBe(false); done.dispose();
});
it('저장 실패·중복 제출·응답 유실은 같은 의도를 재시도한다', async () => {
  const base = createMockOnboardingSource({ delayMs: 0, saveFailures: 1, lostResponses: 1 });
  const save = jest.fn(base.save); const { session, dispose } = await loaded({ ...base, save });
  const first = session.save('interests'); await session.save('following'); await first;
  expect(save).toHaveBeenCalledTimes(1); expect(session.getSnapshot().error).toBe('save-failed');
  await session.retry(); expect(session.getSnapshot().error).toBe('response-lost');
  expect(await session.save('welcome')).toBe(false); await session.retry();
  expect(session.getSnapshot()).toMatchObject({ record: { step: 'interests', version: 1 }, error: null });
  expect(save.mock.calls.map(call => call[1].operationId)).toEqual([save.mock.calls[0]![1].operationId,
    save.mock.calls[0]![1].operationId, save.mock.calls[0]![1].operationId]);
  dispose();
});
it('조회 실패는 복구하고 잘못된 사용자 응답과 종료·다른 계정 로그인 뒤 늦은 성공을 격리한다', async () => {
  const source = createMockOnboardingSource({ delayMs: 0 }); const auth = await signed();
  const late = deferred<OnboardingRecord>();
  const read = jest.fn(source.read).mockReturnValueOnce(late.promise);
  const session = createOnboardingSession({ ...source, read }, auth, mockUserA.id); const dispose = session.activate();
  session.close(); late.resolve(await source.read(mockUserA.id, signal())); await Promise.resolve();
  expect(session.getSnapshot().isOpen).toBe(false); await session.reload();
  const old = deferred<OnboardingRecord>(); const next = createOnboardingSession({ ...source, save: () => old.promise }, auth, mockUserA.id);
  const stop = next.activate(); await next.reload(); const saving = next.save('interests');
  auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'profile' }); await auth.signIn(mockUserB.id);
  old.resolve({ ...await source.read(mockUserA.id, signal()), step: 'interests', version: 1 }); await saving;
  expect(next.getSnapshot().record?.step).toBe('welcome'); expect(auth.getSnapshot().user?.id).toBe(mockUserB.id);
  stop(); dispose();
  const wrong = await loaded({ ...source, read: async () => source.read(mockUserB.id, signal()) });
  expect(wrong.session.getSnapshot().status).toBe('error'); wrong.dispose();
  const recovery = await loaded(createMockOnboardingSource({ delayMs: 0, readFailures: 2 }));
  expect(recovery.session.getSnapshot().status).toBe('error'); await recovery.session.reload();
  expect(recovery.session.getSnapshot().status).toBe('ready'); recovery.dispose();
});
it('모의 알림 권한은 계정과 별도 수명이며 거절·이미 결정됨·실패·취소를 구분한다', async () => {
  const source = createMockNotificationPermission({ delayMs: 0, failures: 1, outcome: 'denied' });
  await expect(source.request(signal())).rejects.toThrow('permission-failed');
  expect(source.read()).toBe('undetermined'); expect(await source.request(signal())).toBe('denied');
  expect(await source.request(signal())).toBe('denied');
  const cancelled = new AbortController(); cancelled.abort();
  await expect(createMockNotificationPermission({ delayMs: 0 }).request(cancelled.signal)).rejects.toThrow('cancelled');
  expect(createMockNotificationPermission({ initial: 'granted' }).read()).toBe('granted');
});
it('저장 뒤 오래된 조회는 새 단계를 덮지 않고 같은 계정 재로그인과 이탈 뒤 늦은 실패는 무시한다', async () => {
  const base = createMockOnboardingSource({ delayMs: 0 }); const read = jest.fn(base.read);
  const { auth, session, dispose } = await loaded({ ...base, read });
  const initial = await base.read(mockUserA.id, signal()); const oldRead = deferred<OnboardingRecord>();
  read.mockReturnValueOnce(oldRead.promise); const loading = session.reload();
  await session.save('interests'); oldRead.resolve(initial); await loading;
  expect(session.getSnapshot().record?.step).toBe('interests');
  read.mockResolvedValueOnce(initial); await session.reload();
  expect(session.getSnapshot()).toMatchObject({ status: 'error', record: { version: 1 } });
  await session.reload();
  const late = deferred<OnboardingRecord>(); const other = createOnboardingSession({ ...base, save: () => late.promise }, auth, mockUserA.id);
  const stop = other.activate(); await other.reload(); const pending = other.save('following');
  auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'profile' }); await auth.signIn(mockUserA.id);
  late.reject(new Error('old-failure')); await pending;
  expect(other.getSnapshot().error).toBeNull(); expect(other.isCurrent()).toBe(false);
  stop(); dispose();
});
it('정상 로그인에서 수동 재개한 조회 실패는 화면을 유지하고 닫은 뒤 확정 단계를 다시 읽는다', async () => {
  const base = createMockOnboardingSource({ delayMs: 0, lostResponses: 1 }); const read = jest.fn(base.read);
  const { session, dispose } = await loaded({ ...base, read }, false);
  read.mockRejectedValueOnce(new Error('read-failed')); session.open(); await Promise.resolve(); await Promise.resolve();
  expect(session.getSnapshot()).toMatchObject({ isOpen: true, status: 'error' });
  await session.reload(); expect(session.getSnapshot().isOpen).toBe(true);
  await session.save('interests'); session.close(); session.open(); await session.reload();
  expect(session.getSnapshot()).toMatchObject({ record: { step: 'interests', version: 1 }, isOpen: true });
  dispose();
});
