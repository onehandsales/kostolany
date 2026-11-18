import { deferred } from '../feed/tests/helpers';
import { createAuthStore } from './createAuthStore';
import { createMockAuthSource } from './data/createMockAuthSource';
import { mockUserA, mockUserB } from './data/mockUsers';
import type { AuthSource } from './types';

const context = { kind: 'bookmark', articleId: 'example-latest-rates' } as const;
const success = { status: 'success', user: mockUserA } as const;
const mockSource = () => createMockAuthSource({ delayMs: 0, slowDelayMs: 0 });

it('최초 비로그인에서 진입 맥락을 보존하고 중복 열기는 첫 맥락을 바꾸지 않는다', () => {
  const store = createAuthStore(mockSource());
  expect(store.getSnapshot()).toEqual({ user: null, dialog: null, revision: 0 });
  store.openLogout(); expect(store.getSnapshot().dialog).toBeNull();
  store.openLogin(context); store.openLogin({ kind: 'profile' });
  expect(store.getSnapshot().dialog).toMatchObject({ context });
  store.closeDialog(); expect(store.getSnapshot().user).toBeNull();
});

it('같은 처리 중 로그인 제출은 하나의 요청만 만들고 성공한 사용자만 확정한다', async () => {
  const response = deferred<Awaited<ReturnType<AuthSource['signIn']>>>();
  const signIn = jest.fn(() => response.promise);
  const store = createAuthStore({ ...mockSource(), signIn });
  store.openLogin(context);
  const first = store.signIn(mockUserA.id);
  await store.signIn(mockUserB.id);
  expect(signIn).toHaveBeenCalledTimes(1);
  expect(store.getSnapshot()).toMatchObject({ user: null, dialog: { status: 'pending', userId: mockUserA.id } });
  response.resolve(success); await first;
  expect(store.getSnapshot()).toEqual({ user: mockUserA, dialog: null, revision: 1 });
  store.openLogin(context); await store.signIn(mockUserB.id);
  expect(store.getSnapshot().user).toEqual(mockUserA); expect(signIn).toHaveBeenCalledTimes(1);
});

it('공급자의 사용자 취소는 오류나 인증 변경 없이 원래 맥락을 닫는다', async () => {
  const store = createAuthStore(mockSource()); store.openLogin(context);
  await store.signIn(mockUserA.id, 'cancel');
  expect(store.getSnapshot()).toEqual({ user: null, dialog: null, revision: 0 });
});

it('로그인 실패는 비로그인을 유지하고 재시도는 같은 사용자로 성공한다', async () => {
  const store = createAuthStore(mockSource()); store.openLogin(context);
  await store.signIn(mockUserB.id, 'failure');
  expect(store.getSnapshot()).toMatchObject({ user: null, dialog: { status: 'error', userId: mockUserB.id, context } });
  await store.retry();
  expect(store.getSnapshot()).toMatchObject({ user: mockUserB, dialog: null });
});

it.each(['success', 'failure'] as const)('닫힌 로그인에서 늦은 %s는 다시 로그인시키거나 오류를 열지 않는다', async (outcome) => {
  const response = deferred<Awaited<ReturnType<AuthSource['signIn']>>>();
  const store = createAuthStore({ ...mockSource(), signIn: () => response.promise });
  store.openLogin(context); const request = store.signIn(mockUserA.id); store.closeDialog();
  if (outcome === 'success') response.resolve(success); else response.reject(new Error('old'));
  await request;
  expect(store.getSnapshot()).toEqual({ user: null, dialog: null, revision: 0 });
});

it.each(['success', 'failure'] as const)('이전 로그인 %s는 새 B 세션과 로그아웃 후 비로그인 상태를 바꾸지 않는다', async (outcome) => {
  const response = deferred<Awaited<ReturnType<AuthSource['signIn']>>>();
  const source = mockSource();
  const signIn = jest.fn(source.signIn).mockReturnValueOnce(response.promise);
  const store = createAuthStore({ ...source, signIn });
  store.openLogin(context); const first = store.signIn(mockUserA.id); store.closeDialog();
  store.openLogin({ kind: 'library' }); await store.signIn(mockUserB.id);
  expect(store.getSnapshot().user).toEqual(mockUserB);
  store.openLogout(); await store.signOut();
  if (outcome === 'success') response.resolve(success); else response.reject(new Error('old'));
  await first;
  expect(store.getSnapshot()).toEqual({ user: null, dialog: null, revision: 2 });
});

it.each(['success', 'failure'] as const)('A→취소→A 재요청 중 이전 %s는 새 시도의 처리를 끝내지 않는다', async (outcome) => {
  const older = deferred<Awaited<ReturnType<AuthSource['signIn']>>>();
  const current = deferred<Awaited<ReturnType<AuthSource['signIn']>>>();
  const signIn = jest.fn().mockReturnValueOnce(older.promise).mockReturnValueOnce(current.promise);
  const store = createAuthStore({ ...mockSource(), signIn });
  store.openLogin(context); const first = store.signIn(mockUserA.id); store.closeDialog();
  store.openLogin(context); const next = store.signIn(mockUserA.id);
  if (outcome === 'success') older.resolve(success); else older.reject(new Error('old'));
  await first; expect(store.getSnapshot().dialog?.status).toBe('pending');
  current.resolve(success); await next; expect(store.getSnapshot().user).toEqual(mockUserA);
});

it('다른 사용자의 인증 응답은 실패로 처리하고 선택한 ID를 보존한다', async () => {
  const store = createAuthStore({ ...mockSource(), signIn: async () => ({ status: 'success', user: mockUserB }) });
  store.openLogin(context); await store.signIn(mockUserA.id);
  expect(store.getSnapshot()).toMatchObject({ user: null, dialog: { status: 'error', userId: mockUserA.id } });
});

it('로그아웃 확인 전 취소는 요청하지 않고 실패 후 재시도에서만 세션을 해제한다', async () => {
  const source = mockSource(); const signOut = jest.fn(source.signOut);
  const store = createAuthStore({ ...source, signOut }, mockUserA);
  store.openLogout(); store.closeDialog(); expect(signOut).not.toHaveBeenCalled();
  store.openLogout(); await store.signOut('failure');
  expect(store.getSnapshot()).toMatchObject({ user: mockUserA, dialog: { kind: 'logout', status: 'error' } });
  await store.retry();
  expect(store.getSnapshot()).toEqual({ user: null, dialog: null, revision: 1 });
});

it('로그아웃 처리 중 중복 확인을 막고 확정 전에는 기존 사용자 상태를 유지한다', async () => {
  const response = deferred<void>(); const signOut = jest.fn(() => response.promise);
  const store = createAuthStore({ ...mockSource(), signOut }, mockUserA);
  store.openLogout(); const request = store.signOut(); await store.signOut();
  expect(signOut).toHaveBeenCalledTimes(1); expect(store.getSnapshot().user).toEqual(mockUserA);
  response.resolve(); await request; expect(store.getSnapshot().user).toBeNull();
});

it.each(['success', 'failure'] as const)('취소한 로그아웃의 늦은 %s는 이후 B 로그인에 영향을 주지 않는다', async (outcome) => {
  const response = deferred<void>(); const source = mockSource();
  const signOut = jest.fn(source.signOut).mockReturnValueOnce(response.promise);
  const store = createAuthStore({ ...source, signOut }, mockUserA);
  store.openLogout(); const first = store.signOut(); store.closeDialog();
  expect(store.getSnapshot()).toMatchObject({ user: mockUserA, dialog: null });
  store.openLogout(); await store.signOut(); store.openLogin(context); await store.signIn(mockUserB.id);
  if (outcome === 'success') response.resolve(); else response.reject(new Error('old'));
  await first; expect(store.getSnapshot()).toMatchObject({ user: mockUserB, dialog: null });
});

it('앱 공급부를 새로 만들면 이전 인증 응답과 세션을 이어받지 않는다', async () => {
  const response = deferred<Awaited<ReturnType<AuthSource['signIn']>>>();
  const previous = createAuthStore({ ...mockSource(), signIn: () => response.promise });
  previous.openLogin(context); const request = previous.signIn(mockUserA.id);
  const current = createAuthStore(mockSource()); response.resolve(success); await request;
  expect(current.getSnapshot()).toEqual({ user: null, dialog: null, revision: 0 });
});
