// Local reading-screen data, not a backend API contract.
export type ArticleDetail = {
  id: string;
  title: string;
  subtitle: string;
  sourceName: string;
  publishedLabel: string;
  readingMinutes: number;
  image: { variant: 'city' | 'coins'; description: string; caption: string } | null;
  facts: readonly string[];
  interpretation: readonly string[];
};

export type ArticleSource = (articleId: string) => Promise<ArticleDetail>;

export type ArticleLoadState =
  | { status: 'loading' }
  | { status: 'ready'; article: ArticleDetail }
  | { status: 'error' };
