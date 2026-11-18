import type { FeedArticle } from '../feed/types';

// 로컬 예시의 경계이며 서버 API나 검색 정책을 확정하지 않는다.
export type SearchResult = { query: string; items: FeedArticle[] };
export type SearchSource = (query: string) => Promise<SearchResult>;
export type SearchState = { status: 'loading' } | { status: 'error' }
  | { status: 'ready'; items: FeedArticle[] };
