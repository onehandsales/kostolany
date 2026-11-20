import { createResponseStore } from './createResponseStore';
import { createMockResponseSource } from './data/createMockResponseSource';
import { visibleResponses } from './responseVisibility';
import type { ResponseTarget } from './types';

const target: ResponseTarget = { kind: 'article', id: 'example-latest-rates' };
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
