import { createPublicListStore } from './createPublicListStore';
import { createMockPublicListSource } from './data/createMockPublicListSource';
import { publicListFixtures } from './data/publicListFixtures';
import { validatePublicLists, type PublicListSource, type PublicListValue, type SavePublicListCommand } from './types';
import { deferred } from '../feed/tests/helpers';

const id = 'public-morning-routine';
const userId = 'reader-a';
const scope = 'session-a';
const base = (): PublicListValue => ({ userId, version: 0, lists: publicListFixtures, savedIds: [] });
const flush = async () => { for (let i = 0; i < 12; i += 1) await Promise.resolve(); };

it('권한 알림은 열린 목록을 즉시 숨기고 진행 중이던 이전 조회도 무효화한다', async () => {
  const source = createMockPublicListSource({ delayMs: 0 });
  const late = deferred<PublicListValue>();
  let reads = 0;
  const store = createPublicListStore({ ...source, read: owner => ++reads === 2 ? late.promise : source.read(owner) }, userId);
  store.setScope(scope);
  await store.reload();
  const stop = source.subscribe?.(store.refreshAccess);
  const old = store.reload();
  source.setVisibility(id, 'private');
  expect(store.getSnapshot().value?.lists.some(list => list.id === id)).toBe(false);
  late.resolve(base());
  await old;
  await flush();
  expect(store.getSnapshot().value?.lists.some(list => list.id === id)).toBe(false);
  stop?.();
});

it('저장 중 해제와 다시 저장을 직렬 처리하고 다른 목록의 마지막 의도를 보존한다', async () => {
  const first = deferred<PublicListValue>();
  const source = createMockPublicListSource({ delayMs: 0 });
  const commands: SavePublicListCommand[] = [];
  const wrapped: PublicListSource = { ...source, save: async command => {
    commands.push(command);
    if (commands.length === 1) await first.promise;
    return source.save(command);
  } };
  const store = createPublicListStore(wrapped, userId);
  store.setScope(scope);
  await store.reload();
  store.setSaved(id, true, scope);
  store.setSaved(id, false, scope);
  store.setSaved('public-aaa-ai', true, scope);
  expect(store.getSnapshot().savedIds).toEqual(['public-aaa-ai']);
  first.resolve(base());
  await flush();
  expect(commands.map(command => [command.listId, command.saved])).toEqual([
    [id, true], [id, false], ['public-aaa-ai', true],
  ]);
  expect(store.getSnapshot().savedIds).toEqual(['public-aaa-ai']);
  expect(store.getSnapshot().pendingIds).toEqual([]);
});

it('저장 적용 뒤 응답을 잃어도 같은 명령 재시도로 저장 관계가 한 번만 생긴다', async () => {
  const source = createMockPublicListSource({ delayMs: 0 });
  const commands: SavePublicListCommand[] = [];
  const store = createPublicListStore({ ...source, save: async command => {
    commands.push(command);
    const result = await source.save(command);
    if (commands.length === 1) throw new Error('Lost acknowledgement');
    return result;
  } }, userId);
  store.setScope(scope);
  await store.reload();
  store.setSaved(id, true, scope);
  await flush();
  expect(store.getSnapshot().savedIds).toEqual([]);
  expect(store.getSnapshot().errors[id]).toBe(scope);
  store.retry(id, scope);
  store.retry(id, scope);
  await flush();
  expect(commands).toHaveLength(2);
  expect(commands[1]?.commandId).toBe(commands[0]?.commandId);
  expect(store.getSnapshot().savedIds).toEqual([id]);
  expect((await source.read(userId)).version).toBe(1);
});

it('쓰기 전에 시작한 조회의 늦은 성공과 실패가 새 저장을 덮지 않는다', async () => {
  for (const fail of [false, true]) {
    const pending = deferred<PublicListValue>();
    const source = createMockPublicListSource({ delayMs: 0 });
    let reads = 0;
    const store = createPublicListStore({ ...source, read: owner => ++reads === 2 ? pending.promise : source.read(owner) }, userId);
    store.setScope(scope);
    await store.reload();
    const reload = store.reload();
    store.setSaved(id, true, scope);
    await flush();
    if (fail) pending.reject(new Error('Old read')); else pending.resolve(base());
    await reload;
    expect(store.getSnapshot().savedIds).toEqual([id]);
    expect(store.getSnapshot().readError).toBe(false);
  }
});

it('목록 접근이 제거된 뒤 늦은 저장 성공이 목록과 저장 관계를 부활시키지 않는다', async () => {
  const pending = deferred<PublicListValue>();
  let latest = base();
  const store = createPublicListStore({ read: async () => latest, save: () => pending.promise }, userId);
  store.setScope(scope);
  await store.reload();
  store.setSaved(id, true, scope);
  latest = { ...base(), version: 5, lists: [], savedIds: [] };
  await store.reload();
  pending.resolve({ ...base(), version: 1, savedIds: [id] });
  await flush();
  expect(store.getSnapshot().value?.lists).toEqual([]);
  expect(store.getSnapshot().savedIds).toEqual([]);
  expect(store.getSnapshot().pendingIds).toEqual([]);
});

it('이전 인증 수명의 늦은 실패는 같은 계정 재로그인 오류로 노출되지 않는다', async () => {
  const pending = deferred<PublicListValue>();
  const store = createPublicListStore({ read: async () => base(), save: () => pending.promise }, userId);
  store.setScope(scope);
  await store.reload();
  store.setSaved(id, true, scope);
  store.setScope('');
  store.setScope('session-a-again');
  pending.reject(new Error('Old failure'));
  await flush();
  expect(store.getSnapshot().savedIds).toEqual([]);
  expect(store.getSnapshot().errors).toEqual({});
});

it('다른 계정과 같은 ID의 다른 소유자 응답 및 중복 목록 ID를 거부한다', async () => {
  const store = createPublicListStore({ read: async () => ({ ...base(), userId: 'other' }), save: async () => base() }, userId);
  await store.reload();
  expect(store.getSnapshot().status).toBe('error');
  expect(store.getSnapshot().value).toBeNull();
  expect(() => validatePublicLists({ ...base(), lists: [...publicListFixtures, ...publicListFixtures] }, userId)).toThrow();
  let value = base();
  const ownerStore = createPublicListStore({ read: async () => value, save: async () => value }, userId);
  await ownerStore.reload();
  value = { ...base(), version: 1, lists: publicListFixtures.map(list => ({ ...list, owner: { kind: 'writer', id: 'imposter' } })) };
  await ownerStore.reload();
  expect(ownerStore.getSnapshot().readError).toBe(true);
  expect(ownerStore.getSnapshot().value?.lists[0]?.owner.id).toBe('medium-staff');
});

it('비공개 전환은 방문자 저장을 제거하고 삭제 뒤 공개 전환도 과거 저장을 되살리지 않는다', async () => {
  const source = createMockPublicListSource({ delayMs: 0 });
  const command = { userId, listId: id, ownerId: 'medium-staff', saved: true, commandId: 'save-1' };
  await source.save(command);
  source.setVisibility(id, 'private');
  expect((await source.read(userId)).savedIds).toEqual([]);
  expect((await source.read(userId)).lists.some(list => list.id === id)).toBe(false);
  expect((await source.read('medium-staff')).lists.some(list => list.id === id)).toBe(true);
  await expect(source.save({ ...command, commandId: 'save-2' })).rejects.toThrow();
  source.setVisibility(id, 'deleted');
  expect((await source.read('medium-staff')).lists.some(list => list.id === id)).toBe(false);
  source.setVisibility(id, 'public');
  expect((await source.read(userId)).savedIds).toEqual([]);
  expect((await source.read('reader-b')).savedIds).toEqual([]);
});

it('소유자 자기 저장과 같은 명령 ID의 다른 목표를 거부한다', async () => {
  const source = createMockPublicListSource({ delayMs: 0 });
  const command = { userId, listId: id, ownerId: 'medium-staff', saved: true, commandId: 'same' };
  await source.save(command);
  await expect(source.save({ ...command, saved: false })).rejects.toThrow('invalid');
  await expect(source.save({ ...command, userId: 'medium-staff' })).rejects.toThrow();
  await expect(source.save({ ...command, ownerId: 'wrong' })).rejects.toThrow();
});

it('저장 응답을 잃는 동안 해제를 눌러도 마지막 해제 명령을 실제 공급부에 반영한다', async () => {
  const gate = deferred<PublicListValue>();
  const source = createMockPublicListSource({ delayMs: 0 });
  let calls = 0;
  const store = createPublicListStore({ ...source, save: async command => {
    const value = await source.save(command);
    if (++calls === 1) { await gate.promise; throw new Error('Lost response'); }
    return value;
  } }, userId);
  store.setScope(scope);
  await store.reload();
  store.setSaved(id, true, scope);
  store.setSaved(id, false, scope);
  gate.resolve(base());
  await flush();
  expect(calls).toBe(2);
  expect((await source.read(userId)).savedIds).toEqual([]);
  expect(store.getSnapshot().savedIds).toEqual([]);
});

it('조회 동기 예외와 변경 실패는 오류로 남기고 재시도 뒤 정확한 상태를 복원한다', async () => {
  let fail = true;
  const source = createMockPublicListSource({ delayMs: 0, scenario: 'write-error' });
  const store = createPublicListStore({ ...source, read: owner => {
    if (fail) { fail = false; throw new Error('Synchronous failure'); }
    return source.read(owner);
  } }, userId);
  store.setScope(scope);
  await store.reload();
  expect(store.getSnapshot().status).toBe('error');
  await store.reload();
  store.setSaved(id, true, scope);
  await flush();
  expect(store.getSnapshot().errors[id]).toBe(scope);
  store.retry(id, scope);
  await flush();
  expect(store.getSnapshot().savedIds).toEqual([id]);
});
