import { normalizeQuery } from './data/mockSearchSource';

export const searchCategories = ['Stories', 'People', 'Publications', 'Topics', 'Lists'] as const;
export type SearchCategory = (typeof searchCategories)[number];
export const SEARCH_PAGE_SIZE = 8;

// 미수록 정렬을 추측하지 않고 기준 목록의 순서와 첫 번째 식별자를 유지한다.
export function searchCatalog<T>(
  items: readonly T[],
  query: string,
  key: (item: T) => string,
  text: (item: T) => string,
): T[] {
  const terms = normalizeQuery(query).split(' ').filter(Boolean);
  if (!terms.length) return [];
  const seen = new Set<string>();
  return items.filter((item) => {
    const id = key(item);
    if (seen.has(id)) return false;
    seen.add(id);
    const value = normalizeQuery(text(item));
    return terms.every((term) => value.includes(term));
  });
}
