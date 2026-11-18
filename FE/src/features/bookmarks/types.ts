import type { FeedArticle } from '../feed/types';

export type BookmarkIdentity = Readonly<{ userId: string; articleId: string }>;
export type ArticleBookmark = BookmarkIdentity & Readonly<{ saved: boolean }>;
export type ReadingList = Readonly<{ userId: string; articleIds: readonly string[] }>;

// 모의 변경 실패는 반영 전 실패이며 실제 서버의 결과 불명 상태를 뜻하지 않는다.
export type BookmarkSource = Readonly<{
  fetchReadingList: (userId: string) => Promise<ReadingList>;
  setArticleSaved: (input: ArticleBookmark & Readonly<{ commandId: number }>) => Promise<ArticleBookmark>;
}>;

export type BookmarkSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  isSaved: boolean;
  isPending: boolean;
  error: 'read' | 'write' | null;
}>;

export type ReadingListSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  isRefreshing: boolean;
  hasReadError: boolean;
  articles: readonly FeedArticle[];
  failures: readonly Readonly<{ articleId: string; title: string; saved: boolean }>[];
}>;
