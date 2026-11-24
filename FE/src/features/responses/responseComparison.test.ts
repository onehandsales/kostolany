import { createResponseStore } from './createResponseStore';
import { createMockResponseSource } from './data/createMockResponseSource';
import { createResponseComparisonCounts } from './data/responsePreview';
import { getResponseCount } from './responseVisibility';
import type { ResponseAction, ResponseTarget } from './types';

const target: ResponseTarget = { kind: 'article', id: 'medium-rules' };
const counts = createResponseComparisonCounts('?parityResponses=reference-v1', true);
const creation: ResponseAction = {
  kind: 'create', id: 'new', parentId: null, body: '직접 작성한 응답', authorName: 'A',
};

it('명시적인 개발 비교 요청만 정확한 집계를 공급하고 반올림 수치와 다른 대상은 추정하지 않는다', () => {
  expect(counts(target)).toBe(272);
  expect(counts({ kind: 'article', id: 'medium-goodbye-notion' })).toBe(17);
  expect(counts({ kind: 'article', id: 'medium-love' })).toBe(0);
  expect(counts({ kind: 'article', id: 'toString' })).toBe(0);
  expect(counts({ kind: 'list', id: target.id })).toBe(0);
  expect(createResponseComparisonCounts('', true)(target)).toBe(0);
  expect(createResponseComparisonCounts('?parityResponses=reference-v2', true)(target)).toBe(0);
  expect(createResponseComparisonCounts('?parityResponses=reference-v1', false)(target)).toBe(0);
});

it('미수록 집계는 가짜 본문 없이 작성과 삭제에 반영되며 실패 재시도와 계정을 분리한다', async () => {
  const source = createMockResponseSource({ delayMs: 0, scenario: 'write-error', uncapturedCountFor: counts });
  const store = createResponseStore(source, 'A');
  await store.refresh(target);
  const current = () => store.getSnapshot(target).value;
  expect(current()?.responses).toEqual([]);
  expect(getResponseCount(current())).toBe(272);
  expect(await store.execute(target, 'create', creation)).toEqual({ ok: false, error: 'unavailable' });
  expect(getResponseCount(current())).toBe(272);
  await store.execute(target, 'create', creation);
  await store.execute(target, 'create', creation);
  expect(current()?.responses).toHaveLength(1);
  expect(getResponseCount(current())).toBe(273);
  await store.execute(target, 'reply', { ...creation, id: 'reply', parentId: 'new' });
  await store.execute(target, 'edit', { kind: 'edit', id: 'new', body: '수정한 응답' });
  expect(getResponseCount(current())).toBe(273);
  expect(getResponseCount({ ...current()!, userId: 'B', ownerId: 'B' }, ['A'])).toBe(272);
  expect(getResponseCount(await source.read({ userId: 'B', target }))).toBe(272);
  expect(getResponseCount(await source.read({ userId: 'A', target: { kind: 'list', id: target.id } }))).toBe(0);
  await store.execute(target, 'delete', { kind: 'delete', id: 'new' });
  expect(getResponseCount(current())).toBe(272);
  expect(current()?.responses.find(item => item.id === 'reply')?.deleted).toBe(false);
  expect(getResponseCount(await source.read({ userId: 'A', target }))).toBe(272);
  expect(getResponseCount({ ...current()!, discussion: 'hidden' })).toBe(0);
  expect(getResponseCount(await createMockResponseSource({ delayMs: 0 }).read({ userId: 'A', target }))).toBe(0);
});

it.each([-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])('잘못된 비교 집계 %s를 저장하지 않는다', async uncapturedCount => {
  const source = createMockResponseSource({ delayMs: 0, uncapturedCountFor: () => uncapturedCount });
  await expect(source.read({ userId: 'A', target })).rejects.toThrow('invalid');
});

it('안전한 정수 범위를 넘는 작성은 거부하고 기존 집계를 보존한다', async () => {
  const source = createMockResponseSource({ delayMs: 0, uncapturedCountFor: () => Number.MAX_SAFE_INTEGER });
  await expect(source.execute({ userId: 'A', target, operationId: 'overflow', action: creation })).rejects.toThrow('invalid');
  const value = await source.read({ userId: 'A', target });
  expect(value.responses).toEqual([]);
  expect(getResponseCount(value)).toBe(Number.MAX_SAFE_INTEGER);
});
