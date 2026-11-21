import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';

import type { FeedArticle } from './types';

export type ArticleCatalog = {
  getSnapshot: () => readonly FeedArticle[];
  subscribe: (listener: () => void) => () => void;
};

export function staticArticleCatalog(articles: readonly FeedArticle[]): ArticleCatalog {
  return { getSnapshot: () => articles, subscribe: () => () => {} };
}

const Context = createContext<ArticleCatalog | null>(null);
export function ArticleCatalogProvider({ catalog, children }: { catalog: ArticleCatalog; children: ReactNode }) {
  return <Context.Provider value={catalog}>{children}</Context.Provider>;
}
export const useArticleCatalog = () => useContext(Context);

const noSubscribe = () => () => {};
export function useCatalogArticles(fallback: readonly FeedArticle[]) {
  const catalog = useArticleCatalog();
  const getSnapshot = () => catalog?.getSnapshot() ?? fallback;
  return useSyncExternalStore(catalog?.subscribe ?? noSubscribe, getSnapshot, getSnapshot);
}
