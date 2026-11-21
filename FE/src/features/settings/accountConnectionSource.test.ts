import { createMockAccountConnectionSource } from './accountConnectionSource';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
it('취소·세션 종료와 A→B→A 역순 완료는 확정 연결을 섞지 않는다', async () => {
  const source = createMockAccountConnectionSource({ delayMs: 10 });
  const signal = new AbortController();
  const cancelled = source.setFacebook('a', true, signal.signal, () => true).catch(() => 'cancelled');
  signal.abort();
  expect(await cancelled).toBe('cancelled');
  let current = true;
  const old = source
    .setFacebook('a', true, new AbortController().signal, () => current)
    .catch(() => 'cancelled');
  current = false;
  const next = source.setFacebook('b', true, new AbortController().signal, () => true);
  await jest.runAllTimersAsync();
  await old;
  await next;
  expect(source.getSnapshot()).toEqual([{ userId: 'b', facebook: true }]);
  const first = source
    .setFacebook('a', true, new AbortController().signal, () => true)
    .catch(() => 'cancelled');
  const last = source.setFacebook('a', false, new AbortController().signal, () => true);
  await jest.runAllTimersAsync();
  await first;
  await last;
  expect(source.getSnapshot()).toContainEqual({ userId: 'a', facebook: false });
});
it('실패 후 동일 목표 재시도는 인증과 다른 계정에 영향 없이 연결을 확정한다', async () => {
  const source = createMockAccountConnectionSource({ failures: 1, delayMs: 1 });
  const first = source.setFacebook('a', true, new AbortController().signal, () => true).catch(() => 'failed');
  await jest.runAllTimersAsync();
  expect(await first).toBe('failed');
  expect(source.getSnapshot()).toEqual([]);
  const retry = source.setFacebook('a', true, new AbortController().signal, () => true);
  await jest.runAllTimersAsync();
  expect(await retry).toEqual({ userId: 'a', facebook: true });
});
