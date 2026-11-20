import { createMockClapSource } from '../reactions/data/createMockClapSource';
import { clapTargetKey } from '../reactions/types';
import { createMockResponseSource } from '../responses/data/createMockResponseSource';
import type { ReaderResponse } from '../responses/types';

it('공개 공급부의 목록 기준 수치를 사용해 미리보기용 새 목록도 로그인 전후 같은 기준을 갖는다', async () => {
  const source = createMockClapSource({ delayMs: 0,
    baselineFor: identity => identity.target.kind === 'list' && identity.target.id === 'new-list' ? 7 : undefined });
  expect(await source.read({ userId: 'a', target: { kind: 'list', id: 'new-list' } })).toMatchObject({ total: 7, mine: 0 });
  expect(await source.save({ userId: 'a', target: { kind: 'list', id: 'new-list' }, mine: 1, commandId: 'first' }))
    .toMatchObject({ total: 8, mine: 1 });
});

it('동일 문자열 ID의 목록과 기사 박수는 분리되고 목록의 50회 한도와 해제가 적용된다', async () => {
  const article = { kind: 'article' as const, id: 'same' };
  const list = { kind: 'list' as const, id: 'same' };
  const source = createMockClapSource({ delayMs: 0, baselines: {
    [clapTargetKey(article)]: 7, [clapTargetKey(list)]: 98,
  } });
  await source.save({ userId: 'a', target: list, mine: 50, commandId: 'first' });
  expect(await source.read({ userId: 'a', target: article })).toMatchObject({ mine: 0, total: 7 });
  expect(await source.read({ userId: 'a', target: list })).toMatchObject({ mine: 50, total: 148 });
  await expect(source.save({ userId: 'a', target: list, mine: 51, commandId: 'over' })).rejects.toThrow();
  await source.save({ userId: 'a', target: list, mine: 0, commandId: 'undo' });
  expect(await source.read({ userId: 'a', target: list })).toMatchObject({ mine: 0, total: 98 });
});

it('목록 소유자의 응답 관리 권한과 방문자의 편집·관리 금지를 대상별로 유지한다', async () => {
  const target = { kind: 'list' as const, id: 'list' };
  const response: ReaderResponse = { id: 'other', parentId: null, authorId: 'writer', authorName: '다른 독자',
    body: '권한 검사용 응답', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: null,
    relevance: 0, baselineClaps: 0, applauded: false, deleted: false };
  const source = createMockResponseSource({ delayMs: 0, initial: () => [response],
    ownerFor: current => current.kind === 'list' ? 'owner' : null });
  await expect(source.execute({ userId: 'visitor', target, operationId: 'edit',
    action: { kind: 'edit', id: 'other', body: '수정 시도' } })).rejects.toThrow('permission');
  await expect(source.execute({ userId: 'visitor', target, operationId: 'hide',
    action: { kind: 'hide', id: 'other', hidden: true } })).rejects.toThrow('permission');
  expect(await source.execute({ userId: 'owner', target, operationId: 'hide',
    action: { kind: 'hide', id: 'other', hidden: true } })).toMatchObject({ responses: [{ hidden: true }] });
  await expect(source.execute({ userId: 'owner', target: { kind: 'article', id: 'list' }, operationId: 'hide',
    action: { kind: 'hide', id: 'other', hidden: true } })).rejects.toThrow('permission');
});

it('박수와 응답 대기 중 목록 접근이 취소되면 늦은 쓰기를 거부한다', async () => {
  jest.useFakeTimers();
  try {
    let permitted = true;
    const target = { kind: 'list' as const, id: 'public-morning-routine' };
    const claps = createMockClapSource({ delayMs: 20, canInteract: () => permitted });
    const responses = createMockResponseSource({ delayMs: 20, canRead: () => permitted });
    const savingClaps = claps.save({ userId: 'a', target, mine: 1, commandId: 'first' });
    const savingResponse = responses.execute({ userId: 'a', target, operationId: 'first', action: {
      kind: 'create', id: 'response', parentId: null, authorName: '독자', body: '저장되면 안 되는 응답',
    } });
    const results = Promise.allSettled([savingClaps, savingResponse]);
    permitted = false;
    await jest.advanceTimersByTimeAsync(20);
    expect((await results).map(result => result.status)).toEqual(['rejected', 'rejected']);
    permitted = true;
    const reading = responses.read({ userId: 'a', target });
    await jest.advanceTimersByTimeAsync(20);
    expect((await reading).responses).toEqual([]);
  } finally { jest.useRealTimers(); }
});
