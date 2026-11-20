import { createRelationshipStore } from './createRelationshipStore';
import { createMockRelationshipSource } from './data/createMockRelationshipSource';
import { safeWebsite } from './SafeWebsiteLink';
import type { Relationship, RelationshipSource, RelationshipValue } from './types';

const writer: Relationship = { target: { kind: 'writer', id: 'jordan' }, following: true, email: false };
const publication: Relationship = {
  target: { kind: 'publication', id: 'medium-blog' },
  following: true,
  email: false,
};

it('팔로우가 지연되는 동안 차단되면 늦은 팔로우를 거부하고 해제 명령은 허용한다', async () => {
  jest.useFakeTimers();
  try {
    let blocked = false;
    const source = createMockRelationshipSource({ delay: 100, canFollow: () => !blocked });
    const pending = source.set('A', { operationId: 'follow', relationship: writer }).catch((error) => error);
    blocked = true;
    await jest.advanceTimersByTimeAsync(100);
    expect(await pending).toEqual(new Error('permission'));
    const unfollow = source.set('A', {
      operationId: 'unfollow',
      relationship: { ...writer, following: false },
    });
    await jest.advanceTimersByTimeAsync(100);
    expect((await unfollow).relationships[0]?.following).toBe(false);
  } finally {
    jest.useRealTimers();
  }
});
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

it('이메일과 팔로우의 빠른 마지막 선택을 직렬 저장하고 오래된 실패가 최신 상태를 지우지 않는다', async () => {
  const first = deferred<RelationshipValue>();
  let call = 0;
  let version = 0;
  const source: RelationshipSource = {
    read: async (userId) => ({ userId, version: 0, relationships: [] }),
    set: async (userId, command) => {
      call += 1;
      if (call === 1) return first.promise;
      return { userId, version: ++version, relationships: [command.relationship] };
    },
  };
  const store = createRelationshipStore(source, 'A');
  await store.reload();
  const follow = store.set(writer);
  await Promise.resolve();
  const email = store.set({ ...writer, email: true });
  const unfollow = store.set({ ...writer, following: false });
  expect(store.getSnapshot().relationships[0]?.following).toBe(false);
  first.reject(new Error('late failure'));
  expect(await follow).toBe(false);
  expect(await email).toBe(true);
  expect(await unfollow).toBe(true);
  expect(store.getSnapshot()).toMatchObject({
    pending: [],
    errors: [],
    relationships: [{ following: false, email: false }],
  });
  expect(call).toBe(3);
});

it.each(['success', 'failure'])('갱신 조회의 늦은 %s 응답은 새 관계를 덮지 않는다', async (result) => {
  const old = deferred<RelationshipValue>();
  let reads = 0;
  const source: RelationshipSource = {
    read: async (userId) => (++reads === 1 ? { userId, version: 0, relationships: [] } : old.promise),
    set: async (userId, command) => ({ userId, version: 1, relationships: [command.relationship] }),
  };
  const store = createRelationshipStore(source, 'A');
  await store.reload();
  const reading = store.reload();
  await store.set(writer);
  if (result === 'success') old.resolve({ userId: 'A', version: 0, relationships: [] });
  else old.reject(new Error('old failure'));
  await reading;
  expect(store.getSnapshot()).toMatchObject({ readError: false, relationships: [{ following: true }] });
});

it('실패한 이메일만 재시도하고 publication·다른 계정과 중복 명령을 격리한다', async () => {
  const source = createMockRelationshipSource({ delay: 0, scenario: 'email-error' });
  const store = createRelationshipStore(source, 'A');
  await store.reload();
  await store.set(writer);
  await store.set(publication);
  expect(await store.set({ ...writer, email: true })).toBe(false);
  expect(store.getSnapshot().relationships).toEqual([writer, publication]);
  expect(await store.retry('writer:jordan')).toBe(true);
  expect(store.getSnapshot().relationships.find((item) => item.target.kind === 'writer')?.email).toBe(true);
  expect((await source.read('B')).relationships).toEqual([]);
  await source.set('B', { operationId: 'follow', relationship: writer });
  await source.set('B', { operationId: 'remove', relationship: { ...writer, following: false } });
  const oldDuplicate = await source.set('B', { operationId: 'follow', relationship: writer });
  expect(oldDuplicate.relationships[0]?.following).toBe(false);
  await expect(source.set('B', { operationId: 'follow', relationship: publication })).rejects.toThrow(
    'Conflicting',
  );
});

it('다른 사용자 결과·publication 이메일과 위험한 외부 링크를 거부한다', async () => {
  const source: RelationshipSource = {
    read: async (userId) => ({ userId, version: 0, relationships: [] }),
    set: async (_userId, command) => ({ userId: 'B', version: 1, relationships: [command.relationship] }),
  };
  const store = createRelationshipStore(source, 'A');
  await store.reload();
  expect(await store.set(writer)).toBe(false);
  expect(store.getSnapshot().relationships).toEqual([]);
  expect(await store.set({ ...publication, email: true })).toBe(false);
  expect(safeWebsite('https://jordangibbs.xyz')).toBe('https://jordangibbs.xyz/');
  for (const url of [
    'javascript:alert(1)',
    'file:///tmp/x',
    'http://example.com',
    'https://name:secret@example.com',
    'not a URL',
  ])
    expect(safeWebsite(url)).toBeNull();
});
