import { visibleResponses } from '../responseVisibility';
import {
  RESPONSE_MAX_LENGTH,
  responseTargetKey,
  type ReaderResponse,
  type ResponseSource,
  type ResponseTarget,
  type ResponseValue,
} from '../types';
import { validateResponseValue } from '../validateResponseValue';
import { responseFixtures } from './responseFixtures';

export type ResponseScenario = 'normal' | 'read-error' | 'write-error' | 'slow' | 'long';
export function createMockResponseSource({
  scenario = 'normal',
  delayMs = scenario === 'slow' ? 3000 : 150,
  initial = responseFixtures,
  uncapturedCountFor = () => 0,
  now = () => new Date().toISOString(),
  ownerFor = (target: ResponseTarget) =>
    target.kind === 'article' && target.id === 'example-latest-rates' ? 'example-reader' : null,
  canInteract = () => true,
  canRead = () => true,
}: {
  scenario?: ResponseScenario;
  delayMs?: number;
  initial?: (target: ResponseTarget) => readonly ReaderResponse[];
  uncapturedCountFor?: (target: ResponseTarget) => number;
  now?: () => string;
  ownerFor?: (target: ResponseTarget, userId: string | null) => string | null;
  canInteract?: (userId: string, target: ResponseTarget, responseAuthorId?: string) => boolean;
  canRead?: (userId: string | null, target: ResponseTarget) => boolean;
} = {}): ResponseSource {
  const values = new Map<string, ResponseValue>();
  const applied = new Map<string, string>();
  const failures = new Set<string>();
  const keyFor = (userId: string | null, target: ResponseTarget) =>
    JSON.stringify([userId, responseTargetKey(target)]);
  const copy = (value: ResponseValue): ResponseValue => ({
    ...value,
    target: { ...value.target },
    responses: value.responses.map((response) => ({
      ...response,
      ...(response.quote ? { quote: { ...response.quote } } : {}),
    })),
  });
  function valueFor(userId: string | null, target: ResponseTarget): ResponseValue {
    if (!target.id.trim()) throw new Error('invalid');
    const key = keyFor(userId, target);
    let value = values.get(key);
    if (!value) {
      const responses: readonly ReaderResponse[] =
        scenario === 'long'
          ? Array.from({ length: 300 }, (_, index) => ({
              id: `long-response-${index}`,
              parentId: null,
              authorId: `fixture-reader-${index}`,
              authorName: `긴 목록 예시 독자 ${index + 1}`,
              body: `긴 한국어 댓글 ${index + 1}. ${'댓글을 읽고 답글을 남기는 긴 목록 검증용 예시 문장입니다. '.repeat(12)}`,
              createdAt: new Date(Date.UTC(2025, 0, 1, 0, index)).toISOString(),
              updatedAt: null,
              relevance: 300 - index,
              baselineClaps: 0,
              applauded: false,
              deleted: false,
            }))
          : initial(target);
      value = {
        userId,
        target,
        version: 0,
        responses,
        ownerId: ownerFor(target, userId),
        discussion: 'open',
        uncapturedCount: uncapturedCountFor(target),
      };
      validateResponseValue(value, userId, target);
      values.set(key, value);
    }
    return value;
  }
  async function wait(key: string, fail: boolean): Promise<void> {
    if (delayMs) await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
    if (fail && !failures.has(key)) {
      failures.add(key);
      throw new Error('unavailable');
    }
  }
  function validateBody(body: string): void {
    if (!body.trim() || body.length > RESPONSE_MAX_LENGTH) throw new Error('invalid');
  }
  return {
    async read({ userId, target }) {
      if (!canRead(userId, target)) throw new Error('permission');
      const value = copy(valueFor(userId, target));
      await wait(`read:${keyFor(userId, target)}`, scenario === 'read-error');
      if (!canRead(userId, target)) throw new Error('permission');
      return value;
    },
    async execute(command, signal) {
      if (!command.userId.trim()) throw new Error('permission');
      if (!command.operationId.trim()) throw new Error('invalid');
      const key = keyFor(command.userId, command.target);
      const operationKey = JSON.stringify([key, command.operationId]);
      const fingerprint = JSON.stringify(command.action);
      await wait(`write:${key}`, scenario === 'write-error');
      if (!canRead(command.userId, command.target)) throw new Error('permission');
      if (signal?.aborted) throw new Error('unavailable');
      const value = valueFor(command.userId, command.target);
      const previous = applied.get(operationKey);
      if (previous !== undefined) {
        if (previous !== fingerprint) throw new Error('invalid');
        return copy(value);
      }
      const action = command.action;
      const existing = value.responses.find((response) => response.id === action.id);
      let responses = [...value.responses];
      let discussion = value.discussion ?? 'open';
      if (
        action.kind !== 'hide' &&
        action.kind !== 'discussion' &&
        !canInteract(command.userId, command.target, existing?.authorId)
      )
        throw new Error('permission');
      if (action.kind === 'discussion') {
        if (value.ownerId !== command.userId) throw new Error('permission');
        if (!['open', 'closed', 'hidden'].includes(action.value)) throw new Error('invalid');
        discussion = action.value;
      } else if (action.kind === 'hide') {
        if (value.ownerId !== command.userId) throw new Error('permission');
        if (!existing || existing.deleted) throw new Error('removed');
        if (typeof action.hidden !== 'boolean') throw new Error('invalid');
        responses = responses.map((item) =>
          item.id === action.id ? { ...item, hidden: action.hidden } : item,
        );
      } else {
        if ((action.kind === 'create' || action.kind === 'edit') && discussion !== 'open')
          throw new Error('permission');
        if (action.kind === 'create') {
          validateBody(action.body);
          if (!action.id || existing || !action.authorName.trim()) throw new Error('invalid');
          // 소유자에게 숨겨지는 상위 스레드까지 답글 확정 직전에 바뀐 차단 권한을 검사한다.
          if (action.parentId) {
            const byId = new Map(value.responses.map(response => [response.id, response]));
            let parent = byId.get(action.parentId);
            while (parent) {
              if (!canInteract(command.userId, command.target, parent.authorId)) throw new Error('permission');
              parent = value.ownerId === command.userId && parent.parentId ? byId.get(parent.parentId) : undefined;
            }
          }
          if (
            action.parentId &&
            !visibleResponses(value).some(
              (response) => response.id === action.parentId && !response.deleted && !response.hidden,
            )
          )
            throw new Error('removed');
          responses.push({
            id: action.id,
            parentId: action.parentId,
            authorId: command.userId,
            authorName: action.authorName,
            body: action.body.trim(),
            createdAt: now(),
            updatedAt: null,
            relevance: 0,
            baselineClaps: 0,
            applauded: false,
            deleted: false,
            ...(action.quote ? { quote: action.quote } : {}),
          });
        } else {
          if (!existing || existing.deleted || existing.hidden) throw new Error('removed');
          if (action.kind !== 'react' && existing.authorId !== command.userId) throw new Error('permission');
          if (action.kind === 'react' && existing.authorId === command.userId) throw new Error('permission');
          if (action.kind === 'edit') validateBody(action.body);
          responses = responses.map((response) =>
            response.id !== action.id
              ? response
              : action.kind === 'delete'
                ? {
                    ...response,
                    body: '',
                    deleted: true,
                    applauded: false,
                    quote: undefined,
                  }
                : action.kind === 'edit'
                  ? {
                      ...response,
                      body: action.body.trim(),
                      updatedAt: now(),
                      dateLabel: undefined,
                    }
                  : { ...response, applauded: action.active },
          );
        }
      }
      // 삭제는 부모 자리만 남겨 타인의 답글을 보존하며 이미 삭제된 부모에 새 답글을 붙이지 않는다.
      const next: ResponseValue = {
        ...value,
        responses,
        discussion,
        version: value.version + 1,
      };
      validateResponseValue(next, command.userId, command.target);
      values.set(key, next);
      applied.set(operationKey, fingerprint);
      return copy(next);
    },
  };
}
