// 읽기 화면의 로컬 데이터 계약이며 백엔드 API 계약을 확정하지 않는다.
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
