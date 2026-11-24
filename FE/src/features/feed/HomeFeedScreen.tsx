import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { spacing, typography, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { WriteButton } from '../../shared/ui/WriteButton';

import { useCommunityNavigation } from '../community/CommunityNavigation';
import { useRecommendedArticles } from '../recommendations/useRecommendedArticles';
import { useModeration } from '../moderation/ModerationContext';
import { useNotifications } from '../notifications/NotificationProvider';
import { FollowingFeed } from '../community/FollowingFeed';

import { ArticleCard } from './components/ArticleCard';
import { FeedSortTabs } from './components/FeedSortTabs';
import { FeedStatus } from './components/FeedStatus';
import { previewFeedSource } from './data/feedPreview';
import { type FeedSort, type FeedSource, feedSortLabels } from './types';
import { useFeed } from './useFeed';

type HomeFeedScreenProps = {
  source?: FeedSource;
  onSelectArticle: (articleId: string) => void;
};

export function HomeFeedScreen({ source = previewFeedSource, onSelectArticle }: HomeFeedScreenProps) {
  const community = useCommunityNavigation();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const notifications = useNotifications();
  const privacy = useModeration();
  const privacyPending = privacy.store && (!privacy.state?.value || privacy.state.readError);
  useEffect(() => { notifications.store?.ensureInbox(); }, [notifications.store]);
  const unread = Boolean(notifications.state?.inbox?.notifications.some(item => !item.read));
  const [sort, setSort] = useState<FeedSort>('latest');
  const [collapsed, setCollapsed] = useState(false);
  const [featuredEmpty, setFeaturedEmpty] = useState(false);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      {!collapsed && (
        <View style={styles.header}>
          <Text role="heading" accessibilityLabel="홈" style={styles.title}>
            Home
          </Text>
          <View style={styles.notification}>
            <IconButton
              icon="bell"
              label="Notifications"
              onPress={() => community.openNotifications?.()}
              color={colors.secondaryText}
              hint={unread ? 'Unread notifications' : undefined}
            />
            {unread && <View pointerEvents="none" aria-hidden style={styles.notificationDot} />}
          </View>
        </View>
      )}
      <FeedSortTabs
        selected={sort}
        featuredEmpty={featuredEmpty}
        onSelect={(next) => {
          setSort(next);
          if (next !== sort) setFeaturedEmpty(false);
          setCollapsed(false);
        }}
      />
      {/* 정렬 변경은 목록과 스크롤 수명을 새로 시작하며 이전 응답을 적용하지 않는다. */}
      {privacyPending && <FeedStatus loading={!privacy.state?.readError} error={privacy.state?.readError}
        message={privacy.state?.readError ? '개인 표시 설정을 불러오지 못했어요' : '개인 표시 설정을 확인하고 있어요'}
        actionLabel={privacy.state?.readError ? '개인 표시 설정 다시 시도' : undefined}
        onAction={() => { void privacy.store?.reload(); }} />}
      {/* 공개 조회 수명을 유지하면서 미확인 개인 정책 동안 카드 접근을 가린다. */}
      <View aria-hidden={Boolean(privacyPending)} style={[styles.feed, privacyPending ? { display: 'none' } : undefined]}>
      {sort === 'popular' && source === previewFeedSource ? (
        !privacyPending && <FollowingFeed onSelectArticle={onSelectArticle} onScrollChange={setCollapsed} />
      ) : (
        <FeedResults
          key={sort}
          sort={sort}
          source={source}
          onSelectArticle={onSelectArticle}
          onScrollChange={setCollapsed}
          onFeaturedEmpty={setFeaturedEmpty}
          privacyPending={Boolean(privacyPending)}
        />
      )}
      </View>
      <WriteButton onPress={community.openWrite} />
    </SafeAreaView>
  );
}

function FeedResults({
  sort,
  source,
  onSelectArticle,
  onScrollChange,
  onFeaturedEmpty,
  privacyPending,
}: {
  sort: FeedSort;
  source: FeedSource;
  onSelectArticle: (articleId: string) => void;
  onScrollChange: (collapsed: boolean) => void;
  onFeaturedEmpty: (empty: boolean) => void;
  privacyPending: boolean;
}) {
  const styles = useThemeStyles(createStyles);
  const navigation = useCommunityNavigation();
  const feed = useFeed(sort, source);
  const moderation = useRecommendedArticles();
  const visibleArticles = feed.articles.filter(article => !moderation.excluded(article.id));
  // 빈/채워진 원본 상태를 구분하는 mock 표시이며 Medium의 배지 소멸 시점을 추론하지 않는다.
  useEffect(() => {
    if (sort === 'recommended') onFeaturedEmpty(feed.status === 'ready' && visibleArticles.length === 0);
  }, [sort, feed.status, visibleArticles.length, onFeaturedEmpty]);

  // 조회 캐시는 유지하고 포털로 열린 카드 메뉴·시트까지 함께 폐기한다.
  if (privacyPending) return null;

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
          onPress={() => navigation.openDiscovery('publication')}
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
        data={visibleArticles}
        onScroll={(event) => onScrollChange(event.nativeEvent.contentOffset.y > 80)}
        scrollEventThrottle={32}
        onEndReached={feed.loadMore}
        onEndReachedThreshold={0.2}
        keyExtractor={(article) => article.id}
        renderItem={({ item }) => <ArticleCard article={item} onSelect={onSelectArticle} recommendationFeedback={sort === 'latest'} />}
        ItemSeparatorComponent={ArticleSeparator}
        ListEmptyComponent={empty}
        ListFooterComponent={<FeedFooter feed={feed} />}
        contentContainerStyle={styles.list}
      />
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
  const styles = useThemeStyles(createStyles);
  return <View style={styles.separator} />;
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingHorizontal: spacing.page,
      paddingVertical: spacing.medium,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: { ...typography.pageTitle, color: colors.text },
    feed: { flex: 1 },
    notification: { marginRight: -10 },
    notificationDot: { position: 'absolute', width: 10, height: 10, borderRadius: 5, top: 9, right: 9,
      backgroundColor: colors.green, borderWidth: 1, borderColor: colors.background },
    list: { flexGrow: 1, paddingBottom: spacing.small },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.divider,
    },
    emptyFeatured: {
      margin: 24,
      padding: 24,
      backgroundColor: colors.surface,
      alignItems: 'center',
      gap: 8,
    },
    emptyTitle: {
      ...typography.caption,
      fontWeight: '600',
      color: colors.text,
    },
    emptyText: {
      ...typography.caption,
      textAlign: 'center',
      color: colors.text,
    },
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
