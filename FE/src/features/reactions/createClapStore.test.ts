import { deferred } from '../feed/tests/helpers';
import { createClapStore } from './createClapStore';
import { createMockClapSource } from './data/createMockClapSource';
import { clapTargetKey, type ClapSource, type ClapTarget, type ClapValue } from './types';

const target: ClapTarget = { kind: 'article', id: 'medium-brain' };
const initial: ClapValue = { userId: 'A', target, mine: 0, total: 18000 };
const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
function setup() {
  const read = jest.fn<ReturnType<ClapSource['read']>, Parameters<ClapSource['read']>>(async () => initial);
  const save = jest.fn<ReturnType<ClapSource['save']>, Parameters<ClapSource['save']>>(async command =>
    ({ ...initial, mine: command.mine, total: 18000 + command.mine }));
  return { read, save, store: createClapStore({ read, save }, 'A') };
}

it.each(['success', 'failure'] as const)('연속 박수와 Undo 도중 이전 %s가 마지막 목표를 덮지 않는다', async outcome => {
  const { store, save } = setup();
  await store.refresh(target);
  const first = deferred<ClapValue>();
  save.mockReturnValueOnce(first.promise);
  for (let i = 0; i < 16; i++) store.clap(target);
  expect(store.getSnapshot(target)).toMatchObject({ mine: 16, total: 18016 });
  expect(save).toHaveBeenCalledTimes(1);
  store.undo(target);
  store.clap(target);
  store.clap(target);
  if (outcome === 'success') first.resolve({ ...initial, mine: 1, total: 18001 });
  else first.reject(new Error('old write'));
  await flush();
  expect(store.getSnapshot(target)).toMatchObject({ mine: 2, total: 18002, isSaving: false, error: null });
  expect(save.mock.calls.map(([command]) => command.mine)).toEqual([1, 2]);
});

it('50회 경계에서 더 증가하지 않고 전체 취소 후 다시 박수할 수 있다', async () => {
  const source = createMockClapSource({ delayMs: 0 });
  const store = createClapStore(source, 'A');
  await store.refresh(target);
  for (let i = 0; i < 60; i++) store.clap(target);
  await flush();
  expect(store.getSnapshot(target)).toMatchObject({ mine: 50, total: 18050 });
  store.undo(target);
  await flush();
  expect(store.getSnapshot(target)).toMatchObject({ mine: 0, total: 18000 });
  store.clap(target);
  await flush();
  expect(store.getSnapshot(target).mine).toBe(1);
});

it('실패 후 재시도 연타는 같은 개인 목표를 한 번 저장하고 다른 계정·대상과 섞이지 않는다', async () => {
  const list: ClapTarget = { kind: 'list', id: target.id };
  const source = createMockClapSource({ delayMs: 0, scenario: 'write-error',
    baselines: { [clapTargetKey(target)]: 18000, [clapTargetKey(list)]: 98 } });
  const a = createClapStore(source, 'A');
  const b = createClapStore(source, 'B');
  await a.refresh(target); await a.refresh(list); await b.refresh(target);
  a.setCount(target, 16);
  await flush();
  expect(a.getSnapshot(target)).toMatchObject({ mine: 0, error: 'write' });
  a.retry(target); a.retry(target);
  await flush();
  expect(a.getSnapshot(target)).toMatchObject({ mine: 16, total: 18016, error: null });
  expect(a.getSnapshot(list)).toMatchObject({ mine: 0, total: 98 });
  expect(b.getSnapshot(target)).toMatchObject({ mine: 0, total: 18000 });
});

it.each(['success', 'failure'] as const)('쓰기 전 조회의 늦은 %s가 새 박수를 지우지 않는다', async outcome => {
  const { store, read } = setup();
  await store.refresh(target);
  const pending = deferred<ClapValue>();
  read.mockReturnValueOnce(pending.promise);
  const refresh = store.refresh(target);
  store.setCount(target, 3);
  await flush();
  if (outcome === 'success') pending.resolve(initial); else pending.reject(new Error('old read'));
  await refresh;
  expect(store.getSnapshot(target)).toMatchObject({ mine: 3, total: 18003, error: null });
});

it('잘못된 소유자·목표 응답과 동기 예외는 오류로 노출하고 재시도한다', async () => {
  const { store, read, save } = setup();
  read.mockResolvedValueOnce({ ...initial, userId: 'B' });
  await store.refresh(target);
  expect(store.getSnapshot(target).status).toBe('error');
  store.retry(target); await flush();
  save.mockResolvedValueOnce({ ...initial, mine: 2, total: 18002 });
  store.clap(target); await flush();
  expect(store.getSnapshot(target)).toMatchObject({ mine: 0, error: 'write' });
  store.retry(target); await flush();
  expect(store.getSnapshot(target).mine).toBe(1);
  save.mockImplementationOnce(() => { throw new Error('sync'); });
  store.clap(target); await flush();
  expect(store.getSnapshot(target)).toMatchObject({ mine: 1, error: 'write' });
});

it('같은 명령의 늦은 재전송이 Undo를 되돌리지 않고 새 저장소의 명령도 처리한다', async () => {
  const source = createMockClapSource({ delayMs: 0 });
  const command = { userId: 'A', target, mine: 1, commandId: 'first' };
  await source.save(command);
  await source.save({ ...command, mine: 0, commandId: 'undo' });
  expect(await source.save(command)).toMatchObject({ mine: 0, total: 18000 });
  await expect(source.save({ ...command, mine: 2 })).rejects.toThrow('Conflicting clap command');
  const store = createClapStore(source, 'A');
  await store.refresh(target);
  store.clap(target); await flush();
  expect(store.getSnapshot(target)).toMatchObject({ mine: 1, error: null });
});
