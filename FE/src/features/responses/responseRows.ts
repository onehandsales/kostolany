import type { ReaderResponse } from './types';

export type ResponseSort = 'relevant' | 'recent';
export type ResponseRow =
  | {
      kind: 'response';
      id: string;
      response: ReaderResponse;
      depth: number;
      childCount: number;
    }
  | {
      kind: 'more';
      id: string;
      parentId: string;
      depth: number;
      remaining: number;
    };
export function responseRows(
  responses: readonly ReaderResponse[],
  sort: ResponseSort,
  userId: string | null,
  visibleReplies: Readonly<Record<string, number>>,
): ResponseRow[] {
  const children = new Map<string | null, ReaderResponse[]>();
  for (const response of responses) {
    const group = children.get(response.parentId) ?? [];
    group.push(response);
    children.set(response.parentId, group);
  }
  const roots = [...(children.get(null) ?? [])].sort((a, b) => {
    if (sort === 'relevant') {
      const ownership = Number(b.authorId === userId) - Number(a.authorId === userId);
      if (ownership) return ownership;
      if (a.relevance !== b.relevance) return b.relevance - a.relevance;
    }
    return b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id);
  });
  const rows: ResponseRow[] = [];
  const stack: (
    | { kind: 'node'; response: ReaderResponse; depth: number }
    | Extract<ResponseRow, { kind: 'more' }>
  )[] = roots.map((response) => ({ kind: 'node' as const, response, depth: 0 })).reverse();
  const seen = new Set<string>();
  while (stack.length) {
    const item = stack.pop();
    if (!item) continue;
    if (item.kind === 'more') {
      rows.push(item);
      continue;
    }
    if (seen.has(item.response.id)) continue;
    const { response, depth } = item;
    seen.add(response.id);
    const replies = (children.get(response.id) ?? [])
      .filter((child) => !child.deleted || children.has(child.id))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id));
    if (response.deleted && !replies.length) continue;
    rows.push({
      kind: 'response',
      id: response.id,
      response,
      depth,
      childCount: replies.length,
    });
    const shown = visibleReplies[response.id] ?? 1;
    if (shown > 0 && replies.length > shown)
      stack.push({
        kind: 'more',
        id: `more:${response.id}`,
        parentId: response.id,
        depth: depth + 1,
        remaining: replies.length - shown,
      });
    for (const child of replies.slice(0, shown).reverse())
      stack.push({ kind: 'node', response: child, depth: depth + 1 });
  }
  return rows;
}
