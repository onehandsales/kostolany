import { ArticleDetailScreen } from '../../features/article/ArticleDetailScreen';
import type { ArticleSource } from '../../features/article/types';
import { useAuth } from '../../features/auth/AuthProvider';
import { DEFAULT_LIST_ID } from '../../features/bookmarks/listTypes';
import { useHasLibraryList } from '../../features/bookmarks/useBookmarks';

export type ArticleRouteParams = {
  articleId: string; origin: 'Home' | 'Explore' | 'Library'; listId?: string;
  ownerUserId?: string; sessionRevision?: number;
};

export function ArticleRouteScreen({ params, source, onBack }: {
  params: ArticleRouteParams; source?: ArticleSource; onBack: () => void;
}) {
  const { state } = useAuth();
  const hasList = useHasLibraryList(params.listId);
  // 과거 계정이나 삭제된 목록의 식별자로 새 개인 화면을 열지 않고 남아 있는 경로로만 복귀한다.
  const canReturnToList = params.ownerUserId === state.user?.id && params.sessionRevision === state.revision && hasList;
  const backLabel = params.origin === 'Library'
    ? canReturnToList ? params.listId === DEFAULT_LIST_ID ? '읽기 목록으로 돌아가기' : '저장 목록으로 돌아가기'
      : '라이브러리로 돌아가기'
    : params.origin === 'Explore' ? '탐색으로 돌아가기' : '홈으로 돌아가기';
  return <ArticleDetailScreen articleId={params.articleId} source={source} onBack={onBack} backLabel={backLabel} />;
}
