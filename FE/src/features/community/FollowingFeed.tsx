import { FlatList } from 'react-native';

import { useTopics } from '../topics/TopicProvider';
import { articleTopicIds } from '../topics/data/topicCatalog';
import { useRecommendedArticles } from '../recommendations/useRecommendedArticles';
import { mediumArticles } from '../feed/data/mediumFixtures';
import { ArticleCard } from '../feed/components/ArticleCard';
import { FeedStatus } from '../feed/components/FeedStatus';

import { useRelationships } from './RelationshipProvider';
import { articlePublication, articleWriter } from './data/publicDirectory';
import { followKey } from './types';

// 실제 추천 알고리즘 대신 팔로우한 공개 fixture 소유자의 기사만 연결한다.
export function FollowingFeed({
  onSelectArticle,
  onScrollChange,
}: {
  onSelectArticle: (id: string) => void;
  onScrollChange: (collapsed: boolean) => void;
}) {
  const { state, store } = useRelationships();
  const topics = useTopics();
  const moderation = useRecommendedArticles();
  const keys = new Set(
    state?.relationships.filter((item) => item.following).map((item) => followKey(item.target)),
  );
  const articles = mediumArticles.filter((article) => {
    if (moderation.excluded(article.id)) return false;
    const writer = articleWriter(article.id);
    const publication = articlePublication(article.id);
    return (
      (writer && keys.has(followKey(writer))) ||
      (publication && keys.has(followKey(publication))) ||
      articleTopicIds(article.id, topics.state.data ?? { topics: [], curations: [] }).some((id) =>
        keys.has(followKey({ kind: 'topic', id })),
      )
    );
  });
  return (
    <FlatList
      accessibilityLabel="Following 기사 목록"
      data={articles}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ArticleCard article={item} onSelect={onSelectArticle} />}
      onScroll={(event) => onScrollChange(event.nativeEvent.contentOffset.y > 80)}
      scrollEventThrottle={32}
      ListEmptyComponent={
        state?.status === 'loading' || topics.state.status === 'loading' ? (
          <FeedStatus loading message="팔로우한 기사를 불러오고 있어요" />
        ) : state?.readError || topics.state.status === 'error' ? (
          <FeedStatus
            error
            message="팔로우를 불러오지 못했어요"
            actionLabel="다시 시도"
            onAction={() => {
              void store?.reload();
              topics.retry();
            }}
          />
        ) : (
          <FeedStatus message="팔로우한 작가·publication·토픽의 기사가 여기에 표시돼요" />
        )
      }
    />
  );
}
