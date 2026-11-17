import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '../../shared/theme/tokens';
import { ArticleCard } from './components/ArticleCard';
import { FeedSortTabs } from './components/FeedSortTabs';
import { FeedStatus } from './components/FeedStatus';
import { previewFeedSource } from './data/feedPreview';
import { type FeedSort, type FeedSource, feedSortLabels } from './types';
import { useFeed } from './useFeed';

type HomeFeedProps = { source?: FeedSource; onSelectArticle?: (articleId: string) => void };

function showDetailPending() {
  Alert.alert('기사 상세 준비 중', '읽기 화면을 준비하고 있어요.');
}

export function HomeFeedScreen({ source = previewFeedSource, onSelectArticle = showDetailPending }: HomeFeedProps) {
  const [sort, setSort] = useState<FeedSort>('latest');

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.header}>
        <Text role="heading" style={styles.title}>홈</Text>
        <Text style={styles.previewLabel}>예시 콘텐츠</Text>
      </View>
      <FeedSortTabs selected={sort} onSelect={setSort} />
      {/* A new sort starts a new list/scroll session; old responses cannot replace it. */}
      <FeedResults key={sort} sort={sort} source={source} onSelectArticle={onSelectArticle} />
    </SafeAreaView>
  );
}

function FeedResults({ sort, source, onSelectArticle }: {
  sort: FeedSort; source: FeedSource; onSelectArticle: (articleId: string) => void;
}) {
  const feed = useFeed(sort, source);

  const empty = feed.status === 'loading'
    ? <FeedStatus message="기사를 불러오고 있어요" loading />
    : feed.status === 'error'
      ? <FeedStatus message="기사를 불러오지 못했어요" error actionLabel="다시 시도" onAction={feed.retry} />
      : <FeedStatus message="아직 표시할 기사가 없어요" />;

  return (
    <FlatList
      accessibilityLabel={`${feedSortLabels[sort]} 기사 목록`}
      data={feed.articles}
      keyExtractor={(article) => article.id}
      renderItem={({ item }) => <ArticleCard article={item} onSelect={onSelectArticle} />}
      ItemSeparatorComponent={ArticleSeparator}
      ListEmptyComponent={empty}
      ListFooterComponent={<FeedFooter feed={feed} />}
      contentContainerStyle={styles.list}
    />
  );
}

function FeedFooter({ feed }: { feed: ReturnType<typeof useFeed> }) {
  if (feed.status !== 'ready' || feed.articles.length === 0) return null;
  if (feed.moreStatus === 'loading') {
    return <FeedStatus message="다음 기사를 불러오고 있어요" loading />;
  }
  if (feed.moreStatus === 'error') {
    return <FeedStatus message="다음 기사를 불러오지 못했어요" error
      actionLabel="추가 불러오기 다시 시도" onAction={feed.loadMore} />;
  }
  if (feed.nextCursor === null) return <FeedStatus message="모든 기사를 확인했어요" />;
  return <FeedStatus message="더 많은 이야기를 읽어보세요" actionLabel="기사 더 보기" onAction={feed.loadMore} />;
}

function ArticleSeparator() { return <View style={styles.separator} />; }

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.page, gap: spacing.small },
  title: { ...typography.pageTitle, color: colors.text },
  previewLabel: { ...typography.caption, color: colors.secondaryText },
  list: { flexGrow: 1, paddingBottom: spacing.small },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
});
