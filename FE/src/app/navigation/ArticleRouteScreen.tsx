import { ArticleDetailScreen } from '../../features/article/ArticleDetailScreen';
import type { ExplanationSource } from '../../features/article/explanationTypes';
import type { ArticleSource } from '../../features/article/types';
import { useAuth } from '../../features/auth/AuthProvider';
import { DEFAULT_LIST_ID } from '../../features/bookmarks/listTypes';
import { useHasLibraryList } from '../../features/bookmarks/useBookmarks';
import { useExplanationPreference } from '../../features/settings/ReadingSettingsProvider';
import { useDownloadArticleSource } from '../../features/downloads/DownloadProvider';
import { previewArticleSource } from '../../features/article/data/articlePreview';
import { writtenStoryId } from '../../features/editor/publishedArticle';
import { WrittenStoryScreen } from '../../features/editor/WrittenStoryScreen';
import { PolicyArticleScreen } from '../../features/responses/PolicyArticleScreen';
import { mediumPolicyArticle } from '../../features/feed/data/mediumPolicyArticle';

export type ArticleRouteParams = {
  articleId: string;
  origin: 'Home' | 'Explore' | 'Library' | 'Profile' | 'Author' | 'Topic' | 'History' | 'PublicList' | 'Digest' | 'Notifications';
  listId?: string;
  highlightId?: string;
  ownerUserId?: string;
  sessionRevision?: number;
};

type ArticleRouteScreenProps = {
  params: ArticleRouteParams;
  source?: ArticleSource;
  explanationSource?: ExplanationSource;
  onBack: () => void;
  onSelectArticle?: (articleId: string) => void;
  isFocused?: boolean;
};

export function ArticleRouteScreen(props: ArticleRouteScreenProps) {
  if (props.params.articleId === mediumPolicyArticle.id) return <PolicyArticleScreen onBack={props.onBack} active={props.isFocused} />;
  const storyId = writtenStoryId(props.params.articleId);
  return storyId ? <WrittenStoryScreen storyId={storyId} onBack={props.onBack} /> : <FeedArticleRouteScreen {...props} />;
}

function FeedArticleRouteScreen({
  params,
  source,
  explanationSource,
  onBack,
  onSelectArticle,
  isFocused = true,
}: ArticleRouteScreenProps) {
  const { state } = useAuth();
  const preference = useExplanationPreference();
  const hasList = useHasLibraryList(params.listId);
  const download = useDownloadArticleSource(source ?? previewArticleSource, params.articleId);
  // 과거 계정이나 삭제된 목록의 식별자로 새 개인 화면을 열지 않고 남아 있는 경로로만 복귀한다.
  const canReturnToList =
    params.ownerUserId === state.user?.id && params.sessionRevision === state.revision && hasList;
  const backLabel =
    params.origin === 'Notifications' ? '알림으로 돌아가기' : params.origin === 'Library' || params.origin === 'Profile'
      ? canReturnToList
        ? params.listId === DEFAULT_LIST_ID
          ? '읽기 목록으로 돌아가기'
          : '저장 목록으로 돌아가기'
        : params.origin === 'Profile'
          ? '프로필로 돌아가기'
          : '라이브러리로 돌아가기'
      : params.origin === 'Digest'
        ? 'Digest로 돌아가기'
      : params.origin === 'PublicList'
        ? '공개 목록으로 돌아가기'
      : params.origin === 'History'
        ? '읽기 이력으로 돌아가기'
        : params.origin === 'Topic'
          ? '토픽으로 돌아가기'
          : params.origin === 'Author'
            ? '작가 프로필로 돌아가기'
            : params.origin === 'Explore'
              ? '탐색으로 돌아가기'
              : '홈으로 돌아가기';
  return (
    <ArticleDetailScreen
      articleId={params.articleId}
      source={download.source}
      offline={download.offline}
      onBack={onBack}
      backLabel={backLabel}
      explanationSource={explanationSource}
      preference={preference}
      onSelectArticle={onSelectArticle}
      isFocused={isFocused}
      sessionRevision={state.revision}
      highlightId={
        params.ownerUserId === state.user?.id && params.sessionRevision === state.revision
          ? params.highlightId
          : undefined
      }
    />
  );
}
