import { createModerationStore } from './createModerationStore';
import { createMockModerationSource } from './data/createMockModerationSource';
import type { ModerationCommand, ModerationSource, ModerationValue } from './types';

const report: ModerationCommand = {
  operationId: 'report',
  action: {
    kind: 'report',
    target: { kind: 'writer', id: 'jordan', writerId: 'jordan' },
    reason: 'Spam',
    details: '예시 설명',
    alsoBlock: true,
  },
};
const mute: ModerationCommand = {
  operationId: 'mute',
  action: { kind: 'mute', target: { kind: 'writer', id: 'jordan' }, active: true },
};
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
it('신고와 선택적 차단을 원자적으로 재시도하고 중복 완료·다른 계정·음소거와 분리한다', async () => {
  const source = createMockModerationSource({ delay: 0, scenario: 'write-error' });
  const store = createModerationStore(source, 'A');
  await store.reload();
  expect(await store.execute(report)).toEqual({ ok: false, error: 'unavailable' });
  expect(store.getSnapshot().value).toMatchObject({ reports: [], blocked: [] });
  const first = store.execute(report);
  const duplicate = store.execute(report);
  expect(first).toBe(duplicate);
  expect(await first).toEqual({ ok: true });
  await store.execute(mute);
  expect(store.getSnapshot().value).toMatchObject({
    blocked: ['jordan'],
    muted: [mute.action.kind === 'mute' ? mute.action.target : null],
  });
  expect(store.getSnapshot().value?.reports).toHaveLength(1);
  await store.execute({
    operationId: 'unblock',
    action: { kind: 'block', writerId: 'jordan', active: false },
  });
  expect((await source.execute('A', report)).blocked).toEqual([]);
  expect((await source.read('B')).reports).toEqual([]);
  expect(store.getSnapshot().value?.muted).toHaveLength(1);
  await expect(source.execute('A', { ...report, action: mute.action })).rejects.toThrow('invalid');
});
it.each(['success', 'failure'])(
  '늦은 조회 %s가 새 차단을 덮지 않고 직렬 마지막 해제가 유지된다',
  async (outcome) => {
    const source = createMockModerationSource({ delay: 0 });
    const old = deferred<ModerationValue>();
    const store = createModerationStore(source, 'A');
    await store.reload();
    jest.spyOn(source, 'read').mockImplementationOnce(() => old.promise);
    const reading = store.reload();
    const first = store.execute(report);
    const last = store.execute({
      operationId: 'last',
      action: { kind: 'block', writerId: 'jordan', active: false },
    });
    await first;
    await last;
    if (outcome === 'success') old.resolve({ userId: 'A', version: 0, muted: [], blocked: [], reports: [] });
    else old.reject(new Error('late'));
    await reading;
    expect(store.getSnapshot()).toMatchObject({ readError: false, pending: [], value: { blocked: [] } });
    expect(store.getSnapshot().value?.reports).toHaveLength(1);
  },
);
it('전송 중 취소와 큐 대기 취소는 신고·차단을 남기지 않고 같은 ID 재시도는 가능하다', async () => {
  jest.useFakeTimers();
  try {
    const source = createMockModerationSource({ delay: 100 });
    const store = createModerationStore(source, 'A');
    const reading = store.reload();
    await jest.advanceTimersByTimeAsync(100);
    await reading;
    const controller = new AbortController();
    const pending = store.execute(report, controller.signal);
    await jest.advanceTimersByTimeAsync(50);
    controller.abort();
    await jest.advanceTimersByTimeAsync(100);
    expect(await pending).toEqual({ ok: false, error: 'cancelled' });
    expect(store.getSnapshot().value?.reports).toEqual([]);
    const again = store.execute(report);
    await jest.advanceTimersByTimeAsync(100);
    expect(await again).toEqual({ ok: true });
    expect(store.getSnapshot().value?.reports).toHaveLength(1);
  } finally {
    jest.useRealTimers();
  }
});
it('잘못된 사용자 응답·자기 신고·미선택/과도한 설명을 저장하지 않는다', async () => {
  const source = createMockModerationSource({ delay: 0 });
  const store = createModerationStore(source, 'A');
  await store.reload();
  await expect(source.execute('jordan', report)).rejects.toThrow('permission');
  const invalid: ModerationSource = {
    ...source,
    execute: async () => ({ userId: 'B', version: 1, muted: [], blocked: [], reports: [] }),
  };
  const wrong = createModerationStore(invalid, 'A');
  await wrong.reload();
  expect(await wrong.execute(mute)).toEqual({ ok: false, error: 'invalid' });
  if (report.action.kind === 'report')
    expect(
      await store.execute({ ...report, action: { ...report.action, details: '가'.repeat(2001) } }),
    ).toEqual({ ok: false, error: 'invalid' });
  expect(wrong.getSnapshot().value?.muted).toEqual([]);
});

it('접수만 성공하고 선택적 차단이 누락된 잘못된 확인 응답은 확정하지 않는다', async () => {
  const base = createMockModerationSource({ delay: 0 });
  const source: ModerationSource = {
    ...base,
    execute: async (userId, command) => ({ ...(await base.execute(userId, command)), blocked: [] }),
  };
  const store = createModerationStore(source, 'A');
  await store.reload();
  expect(await store.execute(report)).toEqual({ ok: false, error: 'invalid' });
  expect(store.getSnapshot().value?.reports).toEqual([]);
});
