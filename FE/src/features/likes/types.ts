export type ArticleLike = Readonly<{
  articleId: string;
  userId: string;
  isLiked: boolean;
  count: number;
}>;

export type LikeIdentity = Readonly<{ articleId: string; userId: string }>;
export type SetArticleLikeInput = LikeIdentity & Readonly<{ liked: boolean; commandId: number }>;

// 모의 공급부의 변경 실패는 반영 전 실패이며 실제 API의 결과 불명 상태와 구분한다.
export type LikeSource = Readonly<{
  fetchArticleLike: (identity: LikeIdentity) => Promise<ArticleLike>;
  setArticleLiked: (input: SetArticleLikeInput) => Promise<ArticleLike>;
}>;

export type LikeSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  isLiked: boolean;
  count: number | null;
  isPending: boolean;
  isRefreshing: boolean;
  error: 'read' | 'write' | null;
}>;
