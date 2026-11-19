import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { WriteButton } from '../../shared/ui/WriteButton';
import { ArticleCard } from './components/ArticleCard';
import { FeedSortTabs } from './components/FeedSortTabs';
import { FeedStatus } from './components/FeedStatus';
import { previewFeedSource } from './data/feedPreview';
import { type FeedSort, type FeedSource, feedSortLabels } from './types';
import { useFeed } from './useFeed';

type HomeFeedScreenProps = { source?: FeedSource; onSelectArticle: (articleId: string) => void };

export function HomeFeedScreen({ source = previewFeedSource, onSelectArticle }: HomeFeedScreenProps) {
  const [sort, setSort] = useState<FeedSort>('latest');
  const [notice, setNotice] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      {!collapsed && (
        <View style={styles.header}>
          <Text role="heading" accessibilityLabel="홈" style={styles.title}>
            Home
          </Text>
          <IconButton
            icon="bell"
            label="Notifications"
            onPress={() => setNotice('Notifications')}
            color={colors.secondaryText}
            style={styles.notification}
          />
        </View>
      )}
      <FeedSortTabs
        selected={sort}
        onSelect={(next) => {
          setSort(next);
          setCollapsed(false);
        }}
      />
      {/* 정렬 변경은 목록과 스크롤 수명을 새로 시작하며 이전 응답을 적용하지 않는다. */}
      <FeedResults
        key={sort}
        sort={sort}
        source={source}
        onSelectArticle={onSelectArticle}
        onScrollChange={setCollapsed}
      />
      <WriteButton />
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </SafeAreaView>
  );
}

function FeedResults({
  sort,
  source,
  onSelectArticle,
  onScrollChange,
}: {
  sort: FeedSort;
  source: FeedSource;
  onSelectArticle: (articleId: string) => void;
  onScrollChange: (collapsed: boolean) => void;
}) {
  const feed = useFeed(sort, source);
  const [notice, setNotice] = useState<string | null>(null);

  const empty =
    feed.status === 'loading' ? (
      <FeedStatus message="기사를 불러오고 있어요" loading />
    ) : feed.status === 'error' ? (
      <FeedStatus message="기사를 불러오지 못했어요" error actionLabel="다시 시도" onAction={feed.retry} />
    ) : sort === 'recommended' ? (
      <View style={styles.emptyFeatured}>
        <Text style={styles.emptyTitle}>No featured stories</Text>
        <Text style={styles.emptyText}>Featured stories from publications you follow will appear here.</Text>
        <Pressable
          role="button"
          onPress={() => setNotice('Recommended publications')}
          style={styles.publications}
        >
          <Text style={styles.emptyText}>View recommended publications</Text>
        </Pressable>
      </View>
    ) : (
      <FeedStatus message="아직 표시할 기사가 없어요" />
    );

  return (
    <>
      <FlatList
        accessibilityLabel={`${feedSortLabels[sort]} 기사 목록`}
        data={feed.articles}
        onScroll={(event) => onScrollChange(event.nativeEvent.contentOffset.y > 80)}
        scrollEventThrottle={32}
        onEndReached={feed.loadMore}
        onEndReachedThreshold={0.2}
        keyExtractor={(article) => article.id}
        renderItem={({ item }) => <ArticleCard article={item} onSelect={onSelectArticle} />}
        ItemSeparatorComponent={ArticleSeparator}
        ListEmptyComponent={empty}
        ListFooterComponent={<FeedFooter feed={feed} />}
        contentContainerStyle={styles.list}
      />
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </>
  );
}

function FeedFooter({ feed }: { feed: ReturnType<typeof useFeed> }) {
  if (feed.status !== 'ready' || feed.articles.length === 0) return null;
  if (feed.moreStatus === 'loading') {
    return <FeedStatus message="다음 기사를 불러오고 있어요" loading />;
  }
  if (feed.moreStatus === 'error') {
    return (
      <FeedStatus
        message="다음 기사를 불러오지 못했어요"
        error
        actionLabel="추가 불러오기 다시 시도"
        onAction={feed.loadMore}
      />
    );
  }
  if (feed.nextCursor === null) return <FeedStatus message="모든 기사를 확인했어요" />;
  return (
    <FeedStatus message="더 많은 이야기를 읽어보세요" actionLabel="기사 더 보기" onAction={feed.loadMore} />
  );
}

function ArticleSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.page,
    paddingVertical: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { ...typography.pageTitle, color: colors.text },
  notification: { marginRight: -10 },
  list: { flexGrow: 1, paddingBottom: spacing.small },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  emptyFeatured: { margin: 24, padding: 24, backgroundColor: colors.surface, alignItems: 'center', gap: 8 },
  emptyTitle: { ...typography.caption, fontWeight: '600', color: colors.text },
  emptyText: { ...typography.caption, textAlign: 'center', color: colors.text },
  publications: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 24,
    justifyContent: 'center',
    marginTop: 8,
  },
});
