import { createResponseStore } from './createResponseStore';
import { createMockResponseSource } from './data/createMockResponseSource';
import { visibleResponses } from './responseVisibility';
import type { ResponseTarget } from './types';

const target: ResponseTarget = { kind: 'article', id: 'example-latest-rates' };

it.each(['parent', 'ancestor'] as const)('답글 전송 중 %s 작성자를 차단하면 소유자에게 숨겨진 스레드의 확정을 거부하고 재시도한다', async blockedLevel => {
  jest.useFakeTimers();
  try {
    let blocked = false;
    const source = createMockResponseSource({ delayMs: 100, canInteract: (_user, _target, authorId) => !blocked || authorId !== 'example-reader-b' });
    if (blockedLevel === 'ancestor') {
      const seeding = source.execute({ userId: 'example-reader', target, operationId: 'seed-child', action: {
        kind: 'create', id: 'child', parentId: 'mock-owner-response', body: '기존 하위 답글', authorName: 'A',
      } });
      await jest.advanceTimersByTimeAsync(100); await seeding;
    }
    const reading = source.read({ userId: 'example-reader', target });
    await jest.advanceTimersByTimeAsync(100);
    const before = await reading;
    const command = { userId: 'example-reader', target, operationId: 'reply-after-block', action: {
      kind: 'create' as const, id: 'new-reply', parentId: blockedLevel === 'parent' ? 'mock-owner-response' : 'child', body: '전송 중 답글', authorName: 'A',
    } };
    const result = source.execute(command).then(
      () => ({ status: 'saved' as const }),
      (error: unknown) => ({ status: 'failed' as const, error }),
    );
    blocked = true;
    await jest.advanceTimersByTimeAsync(100);
    expect(await result).toEqual({ status: 'failed', error: new Error('permission') });
    const checking = source.read({ userId: 'example-reader', target });
    await jest.advanceTimersByTimeAsync(100);
    expect(await checking).toEqual(before);
    blocked = false;
    const retry = source.execute(command);
    await jest.advanceTimersByTimeAsync(100);
    expect((await retry).responses.find(item => item.id === 'new-reply')?.body).toBe('전송 중 답글');
  } finally { jest.useRealTimers(); }
});
it('소유자가 아닌 독자에게 보이는 하위 답글은 상위 작성자 차단만으로 제한하지 않는다', async () => {
  let blocked = false;
  const source = createMockResponseSource({ delayMs: 0, canInteract: (_user, _target, authorId) => !blocked || authorId !== 'example-reader-b' });
  const userId = 'reader-c';
  await source.execute({ userId, target, operationId: 'seed-child', action: {
    kind: 'create', id: 'child', parentId: 'mock-owner-response', body: '보이는 하위 답글', authorName: 'C',
  } });
  blocked = true;
  expect(visibleResponses(await source.read({ userId, target }), ['example-reader-b']).some(item => item.id === 'child')).toBe(true);
  const result = await source.execute({ userId, target, operationId: 'reply-child', action: {
    kind: 'create', id: 'reply', parentId: 'child', body: '허용된 하위 답글', authorName: 'C',
  } });
  expect(result.responses.find(item => item.id === 'reply')?.body).toBe('허용된 하위 답글');
});
it('명시한 mock 소유자만 응답 숨김·복구와 토론 종료를 바꾸고 원문·박수를 보존한다', async () => {
  const source = createMockResponseSource({ delayMs: 0 });
  const owner = createResponseStore(source, 'example-reader');
  const other = createResponseStore(source, 'example-reader-b');
  await owner.refresh(target);
  await other.refresh(target);
  expect(
    await other.execute(target, 'denied', { kind: 'hide', id: 'mock-owner-response', hidden: true }),
  ).toEqual({ ok: false, error: 'permission' });
  await owner.execute(target, 'clap', { kind: 'react', id: 'mock-owner-response', active: true });
  await owner.execute(target, 'hide', { kind: 'hide', id: 'mock-owner-response', hidden: true });
  expect(visibleResponses(owner.getSnapshot(target).value)).toEqual([]);
  await owner.execute(target, 'show', { kind: 'hide', id: 'mock-owner-response', hidden: false });
  expect(visibleResponses(owner.getSnapshot(target).value)[0]).toMatchObject({
    applauded: true,
    deleted: false,
  });
  await owner.execute(target, 'write', {
    kind: 'create',
    id: 'own',
    parentId: null,
    body: '내 답변',
    authorName: 'A',
  });
  await owner.execute(target, 'close', { kind: 'discussion', id: 'discussion', value: 'closed' });
  expect(await owner.execute(target, 'edit', { kind: 'edit', id: 'own', body: '새 내용' })).toEqual({
    ok: false,
    error: 'permission',
  });
  expect(visibleResponses(owner.getSnapshot(target).value)).toHaveLength(2);
  await owner.execute(target, 'hide-all', { kind: 'discussion', id: 'discussion', value: 'hidden' });
  expect(visibleResponses(owner.getSnapshot(target).value)).toEqual([]);
  await owner.execute(target, 'open', { kind: 'discussion', id: 'discussion', value: 'open' });
  expect(visibleResponses(owner.getSnapshot(target).value)).toHaveLength(2);
  expect(other.getSnapshot(target).value?.discussion).toBe('open');
});
it('숨긴 부모의 답글과 차단한 작성자의 응답은 표시하지 않고 취소된 늦은 숨김은 되살아나지 않는다', async () => {
  const source = createMockResponseSource({ delayMs: 0 });
  const store = createResponseStore(source, 'example-reader');
  await store.refresh(target);
  await store.execute(target, 'reply', {
    kind: 'create',
    id: 'child',
    parentId: 'mock-owner-response',
    body: '답글',
    authorName: 'A',
  });
  expect(visibleResponses(store.getSnapshot(target).value, ['example-reader-b'])).toEqual([]);
  const aborted = new AbortController();
  aborted.abort();
  expect(
    await store.execute(
      target,
      'cancelled',
      { kind: 'hide', id: 'mock-owner-response', hidden: true },
      aborted.signal,
    ),
  ).toEqual({ ok: false, error: 'unavailable' });
  expect(visibleResponses(store.getSnapshot(target).value)).toHaveLength(2);
  await store.execute(target, 'hide', { kind: 'hide', id: 'mock-owner-response', hidden: true });
  expect(visibleResponses(store.getSnapshot(target).value)).toHaveLength(0);
  expect(store.getSnapshot(target).value?.responses).toHaveLength(2);
  expect(
    await store.execute(target, 'hidden-child-reply', {
      kind: 'create',
      id: 'grandchild',
      parentId: 'child',
      body: '숨긴 답글',
      authorName: 'A',
    }),
  ).toEqual({ ok: false, error: 'removed' });
});

it('차단된 반응 권한과 소유자 관리 권한을 분리해 숨김·복구를 계속 허용한다', async () => {
  const source = createMockResponseSource({ delayMs: 0, canInteract: () => false });
  const store = createResponseStore(source, 'example-reader');
  await store.refresh(target);
  expect(
    await store.execute(target, 'reaction', { kind: 'react', id: 'mock-owner-response', active: true }),
  ).toEqual({ ok: false, error: 'permission' });
  expect(
    await store.execute(target, 'hide', { kind: 'hide', id: 'mock-owner-response', hidden: true }),
  ).toEqual({ ok: true });
  expect(
    await store.execute(target, 'show', { kind: 'hide', id: 'mock-owner-response', hidden: false }),
  ).toEqual({ ok: true });
});
