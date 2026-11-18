import type { FeedArticle } from '../feed/types';

// A local fixture boundary, not a server API/search policy.
export type SearchResult = { query: string; items: FeedArticle[] };
export type SearchSource = (query: string) => Promise<SearchResult>;
export type SearchState = { status: 'loading' } | { status: 'error' }
  | { status: 'ready'; items: FeedArticle[] };
