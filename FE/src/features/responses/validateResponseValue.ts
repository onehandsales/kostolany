import { responseTargetKey, type ResponseTarget, type ResponseValue } from './types';

export function validateResponseValue(
  value: ResponseValue,
  userId: string | null,
  target: ResponseTarget,
): void {
  if (
    !value ||
    value.userId !== userId ||
    !value.target ||
    responseTargetKey(value.target) !== responseTargetKey(target) ||
    !Number.isSafeInteger(value.version) ||
    value.version < 0 ||
    !Array.isArray(value.responses) ||
    (value.uncapturedCount !== undefined &&
      (!Number.isSafeInteger(value.uncapturedCount) || value.uncapturedCount < 0 ||
        !Number.isSafeInteger(value.uncapturedCount + value.responses.length))) ||
    (value.ownerId !== undefined &&
      value.ownerId !== null &&
      (typeof value.ownerId !== 'string' || !value.ownerId.trim())) ||
    (value.discussion !== undefined && !['open', 'closed', 'hidden'].includes(value.discussion))
  )
    throw new Error('invalid');
  const byId = new Map(value.responses.map((response) => [response.id, response]));
  if (byId.size !== value.responses.length) throw new Error('invalid');
  for (const response of value.responses) {
    if (
      !response.id ||
      !response.authorId ||
      typeof response.authorName !== 'string' ||
      typeof response.body !== 'string' ||
      !Number.isFinite(Date.parse(response.createdAt)) ||
      (response.updatedAt !== null && !Number.isFinite(Date.parse(response.updatedAt))) ||
      !Number.isSafeInteger(response.baselineClaps) ||
      response.baselineClaps < 0 ||
      !Number.isFinite(response.relevance) ||
      typeof response.applauded !== 'boolean' ||
      typeof response.deleted !== 'boolean' ||
      (response.hidden !== undefined && typeof response.hidden !== 'boolean')
    )
      throw new Error('invalid');
    const visited = new Set([response.id]);
    let parentId = response.parentId;
    while (parentId !== null) {
      if (visited.has(parentId)) throw new Error('invalid');
      visited.add(parentId);
      const parent = byId.get(parentId);
      if (!parent) throw new Error('invalid');
      parentId = parent.parentId;
    }
    if (
      response.quote &&
      (response.quote.articleId !== target.id ||
        target.kind !== 'article' ||
        !response.quote.version ||
        !Number.isInteger(response.quote.start) ||
        response.quote.start < 0 ||
        !Number.isInteger(response.quote.end) ||
        response.quote.end <= response.quote.start ||
        response.quote.end - response.quote.start !== response.quote.text.length)
    )
      throw new Error('invalid');
  }
}
