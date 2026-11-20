import type { ReaderResponse, ResponseValue } from './types';

export function visibleResponses(
  value: ResponseValue | null | undefined,
  blocked: readonly string[] = [],
): readonly ReaderResponse[] {
  if (!value || value.discussion === 'hidden') return [];
  const byId = new Map(value.responses.map((item) => [item.id, item]));
  const unavailable = new Set(
    value.responses
      .filter((item) => item.hidden || (value.ownerId === value.userId && blocked.includes(item.authorId)))
      .map((item) => item.id),
  );
  // 숨긴 부모의 답글은 따로 노출하지 않지만 원본 데이터와 삭제되지 않은 자식 관계는 보존한다.
  return value.responses.filter((item) => {
    let current: ReaderResponse | undefined = item;
    const visited = new Set<string>();
    while (current) {
      if (unavailable.has(current.id) || visited.has(current.id)) return false;
      visited.add(current.id);
      current = current.parentId ? byId.get(current.parentId) : undefined;
    }
    return true;
  });
}
