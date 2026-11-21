import { deferred } from '../feed/tests/helpers';
import { createResponseStore } from './createResponseStore';
import { createMockResponseSource } from './data/createMockResponseSource';
import { responseRows } from './responseRows';
import type { ResponseAction, ResponseSource, ResponseTarget, ResponseValue } from './types';

const target: ResponseTarget = { kind: 'article', id: 'medium-brain' };
const creation: ResponseAction = {
  kind: 'create',
  id: 'new',
  parentId: null,
  body: '내 응답',
  authorName: 'A',
};
const tick = async () => {
  for (let i = 0; i < 8; i++) await Promise.resolve();
};

it('인증 범위 교체 후 새 응답 목록을 이전 조회 실패가 덮거나 읽기 잠금을 풀지 않는다', async () => {
  const base = createMockResponseSource({ delayMs: 0 });
  const value = await base.read({ userId: 'A', target });
  const old = deferred<ResponseValue>(); const current = deferred<ResponseValue>();
  const read = jest.fn<ReturnType<ResponseSource['read']>, Parameters<ResponseSource['read']>>()
    .mockReturnValueOnce(old.promise).mockReturnValueOnce(current.promise);
  const store = createResponseStore({ ...base, read }, 'A');
  store.setReadScope('A:1'); store.ensure(target);
  store.setReadScope(''); store.setReadScope('A:3'); store.ensure(target);
  old.reject(new Error('old failure')); await tick(); store.ensure(target);
  expect(read).toHaveBeenCalledTimes(2);
  expect(store.getSnapshot(target)).toMatchObject({ readError: false, isRefreshing: true });
  current.resolve(value); await tick();
  expect(store.getSnapshot(target)).toMatchObject({ value, readError: false, isRefreshing: false });
});

it('작성·답글·수정·삭제는 중복 생성 없이 적용하고 타인의 답글과 다른 계정을 보존한다', async () => {
  const source = createMockResponseSource({ delayMs: 0 });
  const a = createResponseStore(source, 'A');
  const b = createResponseStore(source, 'B');
  await a.refresh(target);
  await b.refresh(target);
  expect(await a.execute(target, 'create', creation)).toEqual({ ok: true });
  expect(await a.execute(target, 'create', creation)).toEqual({ ok: true });
  expect(a.getSnapshot(target).value?.responses.filter((response) => response.id === 'new')).toHaveLength(1);
  expect(b.getSnapshot(target).value?.responses.some((response) => response.id === 'new')).toBe(false);
  await a.execute(target, 'reply', {
    ...creation,
    id: 'child',
    parentId: 'new',
    body: '답글',
  });
  await a.execute(target, 'edit', { kind: 'edit', id: 'new', body: '수정됨' });
  await a.execute(target, 'delete', { kind: 'delete', id: 'new' });
  const duplicate = await source.execute({
    userId: 'A',
    target,
    operationId: 'create',
    action: creation,
  });
  expect(duplicate.responses.find((response) => response.id === 'new')).toMatchObject({
    deleted: true,
    body: '',
  });
  expect(duplicate.responses.find((response) => response.id === 'child')).toMatchObject({
    deleted: false,
    body: '답글',
  });
  expect(
    await a.execute(target, 'late-edit', {
      kind: 'edit',
      id: 'new',
      body: '부활 금지',
    }),
  ).toEqual({ ok: false, error: 'removed' });
  expect(
    await a.execute(target, 'late-reply', {
      ...creation,
      id: 'late',
      parentId: 'new',
    }),
  ).toEqual({ ok: false, error: 'removed' });
  expect(await a.execute(target, 'not-own', { kind: 'delete', id: 'brain-bernie' })).toEqual({
    ok: false,
    error: 'permission',
  });
});

it.each(['success', 'failure'] as const)(
  '쓰기 이전 조회의 늦은 %s는 새 응답과 정렬을 덮지 않는다',
  async (outcome) => {
    const source = createMockResponseSource({ delayMs: 0 });
    const read = jest.spyOn(source, 'read');
    const store = createResponseStore(source, 'A');
    await store.refresh(target);
    const old = store.getSnapshot(target).value!;
    const late = deferred<ResponseValue>();
    read.mockReturnValueOnce(late.promise);
    const pending = store.refresh(target);
    await store.execute(target, 'create', creation);
    if (outcome === 'success') late.resolve(old);
    else late.reject(new Error('late'));
    await pending;
    expect(store.getSnapshot(target)).toMatchObject({
      status: 'ready',
      readError: false,
    });
    expect(responseRows(store.getSnapshot(target).value!.responses, 'recent', 'A', {})[0]?.id).toBe('new');
  },
);

it('실패한 작성의 동일 작업 재시도와 빠른 댓글 반응은 마지막 절대 목표로 끝난다', async () => {
  const source = createMockResponseSource({
    delayMs: 0,
    scenario: 'write-error',
  });
  const store = createResponseStore(source, 'A');
  await store.refresh(target);
  expect(await store.execute(target, 'create', creation)).toEqual({
    ok: false,
    error: 'unavailable',
  });
  const first = store.execute(target, 'create', creation);
  expect(store.execute(target, 'create', creation)).toBe(first);
  expect(await first).toEqual({ ok: true });
  const commands = [true, false, true].map((active, index) =>
    store.execute(target, `clap-${index}`, {
      kind: 'react',
      id: 'brain-bernie',
      active,
    }),
  );
  await Promise.all(commands);
  expect(
    store.getSnapshot(target).value?.responses.find((response) => response.id === 'brain-bernie'),
  ).toMatchObject({ baselineClaps: 1000, applauded: true });
  expect(store.getSnapshot(target).pendingIds).toEqual([]);
  expect(
    await store.execute(target, 'self', {
      kind: 'react',
      id: 'new',
      active: true,
    }),
  ).toEqual({ ok: false, error: 'permission' });
  expect(await store.execute(target, 'create', { ...creation, body: '다른 내용' })).toEqual({
    ok: false,
    error: 'invalid',
  });
});

it('이전 변경 실패 후 대기 중 삭제를 처리하며 동일 ID의 목록 응답과 섞지 않는다', async () => {
  const source = createMockResponseSource({ delayMs: 0 });
  const execute = jest.spyOn(source, 'execute');
  const store = createResponseStore(source, 'A');
  await store.refresh(target);
  const list = { kind: 'list' as const, id: target.id };
  await store.refresh(list);
  await store.execute(target, 'create', creation);
  const late = deferred<ResponseValue>();
  execute.mockReturnValueOnce(late.promise);
  const editing = store.execute(target, 'edit', {
    kind: 'edit',
    id: 'new',
    body: '늦은 수정',
  });
  const deleting = store.execute(target, 'delete', {
    kind: 'delete',
    id: 'new',
  });
  await tick();
  expect(store.getSnapshot(target).pendingIds).toEqual(['new', 'new']);
  late.reject(new Error('failure'));
  await editing;
  await deleting;
  expect(store.getSnapshot(target).value?.responses.find((response) => response.id === 'new')?.deleted).toBe(
    true,
  );
  expect(store.getSnapshot(list).value?.responses).toEqual([]);
});

it('다른 소유자·중복 ID·순환 부모 응답을 거부하고 조회 재시도로 복구한다', async () => {
  const source = createMockResponseSource({ delayMs: 0 });
  const original = await source.read({ userId: 'A', target });
  const read = jest
    .fn<ReturnType<ResponseSource['read']>, Parameters<ResponseSource['read']>>()
    .mockResolvedValueOnce({ ...original, userId: 'B' })
    .mockResolvedValueOnce({
      ...original,
      responses: [original.responses[0]!, original.responses[0]!],
    })
    .mockResolvedValueOnce({
      ...original,
      responses: original.responses.map((response) =>
        response.id === 'brain-bernie' ? { ...response, parentId: 'brain-radu' } : response,
      ),
    })
    .mockResolvedValue(original);
  const store = createResponseStore({ ...source, read }, 'A');
  for (let index = 0; index < 3; index++) {
    await store.refresh(target);
    expect(store.getSnapshot(target)).toMatchObject({
      status: 'error',
      value: null,
    });
  }
  await store.refresh(target);
  expect(store.getSnapshot(target).status).toBe('ready');
  const guest = createResponseStore(source, null);
  await guest.refresh(target);
  expect(await guest.execute(target, 'guest', creation)).toEqual({
    ok: false,
    error: 'permission',
  });
});

it('부모 삭제는 타인 답글을 보존하고 더보기는 표시된 하위 스레드 뒤에 놓인다', async () => {
  const base = await createMockResponseSource({ delayMs: 0 }).read({
    userId: 'A',
    target,
  });
  const first = base.responses[0]!;
  const responses = [
    { ...first, id: 'parent', authorId: 'A', baselineClaps: 0 },
    {
      ...first,
      id: 'child1',
      authorId: 'B',
      parentId: 'parent',
      createdAt: '2025-06-01T00:00:00Z',
    },
    {
      ...first,
      id: 'child2',
      authorId: 'B',
      parentId: 'parent',
      createdAt: '2025-06-02T00:00:00Z',
    },
    { ...first, id: 'nested', authorId: 'C', parentId: 'child2' },
  ];
  expect(responseRows(responses, 'relevant', 'A', {}).map((row) => row.id)).toEqual([
    'parent',
    'child2',
    'nested',
    'more:parent',
  ]);
  expect(responseRows(responses, 'relevant', 'A', { parent: 0 }).map((row) => row.id)).toEqual(['parent']);
  const source = createMockResponseSource({
    delayMs: 0,
    initial: () => responses,
  });
  const store = createResponseStore(source, 'A');
  await store.refresh(target);
  await store.execute(target, 'delete', { kind: 'delete', id: 'parent' });
  expect(
    store
      .getSnapshot(target)
      .value?.responses.filter((response) => response.authorId !== 'A')
      .every((response) => !response.deleted),
  ).toBe(true);
});

it('명령 대상이 누락된 성공 응답을 저장 완료로 처리하지 않고 같은 작업을 재시도한다', async () => {
  const source = createMockResponseSource({ delayMs: 0 });
  const old = await source.read({ userId: 'A', target });
  const execute = jest.spyOn(source, 'execute').mockResolvedValueOnce({ ...old, version: 1 });
  const store = createResponseStore(source, 'A');
  await store.refresh(target);
  expect(await store.execute(target, 'create', creation)).toEqual({
    ok: false,
    error: 'invalid',
  });
  expect(store.getSnapshot(target).value?.version).toBe(0);
  expect(await store.execute(target, 'create', creation)).toEqual({ ok: true });
  expect(execute).toHaveBeenCalledTimes(2);
  expect(store.getSnapshot(target).value?.responses.filter((response) => response.id === 'new')).toHaveLength(
    1,
  );
});
