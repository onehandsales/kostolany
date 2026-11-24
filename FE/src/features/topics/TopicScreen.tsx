import { useState, type ReactNode } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { useShareDialog } from '../sharing/SharingProvider';
import { ShareSheet } from '../sharing/ShareSheet';

import { FollowControl } from '../community/FollowControl';
import { IdentityLink, ArticleByline } from '../community/IdentityLink';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { mediumArticles } from '../feed/data/mediumFixtures';
import { useRecommendedArticles } from '../recommendations/useRecommendedArticles';
import { articleReportTarget } from '../moderation/articleModeration';
import { useModeration } from '../moderation/ModerationContext';
import { usePublicLists } from '../public-lists/PublicListProvider';

import { useTopics } from './TopicProvider';
import type { Curation } from './types';

export function TopicScreen({
  topicId,
  onBack,
  onSelectArticle,
  footer,
  active = true,
}: {
  topicId: string;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
  footer?: ReactNode;
  active?: boolean;
}) {
  return (
    <TopicContent
      key={topicId}
      topicId={topicId}
      onBack={onBack}
      onSelectArticle={onSelectArticle}
      footer={footer}
      active={active}
    />
  );
}
function TopicContent({
  topicId,
  onBack,
  onSelectArticle,
  footer,
  active,
}: {
  topicId: string;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
  footer?: ReactNode;
  active: boolean;
}) {
  const { state, retry } = useTopics();
  const styles = useThemeStyles(createStyles);
  const navigation = useCommunityNavigation();
  const moderation = useRecommendedArticles();
  const [collapsed, setCollapsed] = useState(false);
  const share = useShareDialog(state.data ?? undefined, active);
  const topic = state.data?.topics.find((item) => item.id === topicId);
  const articles =
    topic?.stories.flatMap((id) => {
      const article = mediumArticles.find((item) => item.id === id);
      return article && !moderation.excluded(id) ? [article] : [];
    }) ?? [];
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.toolbar}>
        <IconButton icon="back" label="Back from topic" onPress={onBack} />
        <Text style={styles.toolbarTitle}>{collapsed ? topic?.name : 'Topic'}</Text>
        <IconButton
          icon="share"
          label={`Share topic ${topic?.name ?? topicId}`}
          onPress={() => { if (topic) share.open({ kind: 'topic', id: topic.id, title: topic.name,
            subtitle: 'Explore stories about this topic', authorName: 'Medium', visibility: 'public' }); }}
        />
      </View>
      {moderation.store && (!moderation.state?.value || moderation.state.readError) ?
        <ContentStatus loading={!moderation.state?.readError} error={moderation.state?.readError}
          message={moderation.state?.readError ? '개인 표시 설정을 불러오지 못했어요' : '개인 표시 설정을 확인하고 있어요'}
          actionLabel={moderation.state?.readError ? '개인 표시 설정 다시 시도' : undefined}
          onAction={() => { void moderation.store?.reload(); }} /> : state.status === 'loading' ? (
        <ContentStatus message="Loading topic…" loading />
      ) : state.status === 'error' ? (
        <ContentStatus message="Couldn’t load topics." error actionLabel="Retry topics" onAction={retry} />
      ) : !topic ? (
        <ContentStatus message="Topic unavailable" />
      ) : (
        <FlatList
          accessibilityLabel={`${topic.name} topic contents`}
          data={articles}
          keyExtractor={(item) => item.id}
          onScroll={(event) => setCollapsed(event.nativeEvent.contentOffset.y > 260)}
          scrollEventThrottle={32}
          ListHeaderComponent={
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chips}
              >
                {state.data?.topics
                  .filter((item) => item.id === topic.id || topic.related.includes(item.id))
                  .map((item) => (
                    <Pressable
                      key={item.id}
                      role="button"
                      accessibilityLabel={`Open topic ${item.name}`}
                      accessibilityState={{ selected: item.id === topic.id }}
                      style={styles.chipTarget}
                      onPress={() => {
                        if (item.id !== topic.id) navigation.openTopic(item.id);
                      }}
                    >
                      <View style={[styles.chip, item.id === topic.id && styles.selectedChip]}>
                        <Text style={styles.chipText}>{item.name}</Text>
                      </View>
                    </Pressable>
                  ))}
              </ScrollView>
              <View style={styles.header}>
                <Text role="heading" style={styles.name}>
                  {topic.name}
                </Text>
                <Text style={[styles.counts, styles.topicCounts]}>
                  {topic.followers ? `${topic.followers} followers` : '— followers'}
                  {'  ·  '}
                  {topic.storyCount ? `${topic.storyCount} Stories` : '— Stories'}
                </Text>
                <View style={styles.follow}>
                  <FollowControl target={{ kind: 'topic', id: topic.id }} name={topic.name} topicStyle />
                </View>
              </View>
              <Text role="heading" style={styles.recommended}>
                Recommended stories
              </Text>
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.story}>
              <Pressable
                role="button"
                accessibilityLabel={`Read ${item.title}`}
                onPress={() => onSelectArticle(item.id)}
              >
                {item.reference?.image && (
                  <View style={styles.cover}>
                    <Image
                      source={item.reference.image}
                      style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
                      accessible={false}
                    />
                  </View>
                )}
              </Pressable>
              <ArticleByline articleId={item.id} fallback={item.sourceName} />
              <Pressable
                role="button"
                accessibilityLabel={`Open story ${item.title}`}
                onPress={() => onSelectArticle(item.id)}
                style={styles.storyTitleTarget}
              >
                <Text style={styles.storyTitle}>{item.title}</Text>
              </Pressable>
              {Boolean(item.summary) && <Text style={styles.summary}>{item.summary}</Text>}
            </View>
          )}
          ListEmptyComponent={<ContentStatus message="No stories available for this topic." />}
          ListFooterComponent={
            <>
              {topic.curations.map((id) => {
                const curation = state.data?.curations.find((item) => item.id === id);
                return curation ? (
                  <CurationPreview key={id} curation={curation} onSelectArticle={onSelectArticle} />
                ) : null;
              })}
              {topic.curations.length > 0 && <View style={styles.sectionEnd} />}
            </>
          }
        />
      )}
      {footer}
      {share.target && <ShareSheet target={share.target} available={Boolean(topic) && state.status === 'ready'} onClose={share.close} />}
    </SafeAreaView>
  );
}
function CurationPreview({
  curation,
  onSelectArticle,
}: {
  curation: Curation;
  onSelectArticle: (id: string) => void;
}) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const navigation = useCommunityNavigation();
  const moderation = useRecommendedArticles();
  const { open } = useModeration();
  const publicLists = usePublicLists();
  const list = publicLists.state?.value?.lists.find(item => item.id === curation.listId
    && item.owner.id === curation.curatorId);
  if (publicLists.state?.readError) return <ContentStatus message="Couldn’t load the curated list." error
    actionLabel="Retry curated list" onAction={() => { void publicLists.store?.reload(); }} />;
  if (!publicLists.state?.value) return <ContentStatus message="Loading curated list…" loading />;
  // 상세 화면과 같은 차단 경계를 미리보기에도 적용한다.
  if (!list || (list.owner.kind === 'writer' && moderation.state?.value?.blocked.includes(list.owner.id)))
    return <ContentStatus message="This curated list is unavailable." />;
  const articles = curation.previewStories.flatMap((id) => {
    const article = mediumArticles.find((item) => item.id === id);
    return article && !moderation.excluded(id) ? [article] : [];
  });
  return (
    <View style={styles.curation}>
      <Text role="heading" style={styles.curationTitle}>
        {curation.title}
      </Text>
      <View style={styles.curator}>
        <Text style={styles.counts}>List curated by </Text>
        <IdentityLink target={{ kind: 'writer', id: curation.curatorId }} style={styles.curatorName} />
      </View>
      <ScrollView
        horizontal
        accessibilityLabel={`${curation.title} preview carousel`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {articles.map((article) => (
          <View key={article.id} style={styles.preview}>
            <View style={styles.previewContent}>
              <Pressable
                role="button"
                accessibilityLabel={`Preview story ${article.title}`}
                onPress={() => onSelectArticle(article.id)}
              >
                <View style={styles.previewImage}>
                  <Image
                    source={article.reference?.image}
                    accessible={false}
                    style={[styles.previewImage, { width: curation.partialImageWidths?.[article.id] ?? 240 }]}
                  />
                </View>
              </Pressable>
              <ArticleByline articleId={article.id} fallback={article.sourceName} />
              <Pressable
                role="button"
                accessibilityLabel={`Preview title ${article.title}`}
                onPress={() => onSelectArticle(article.id)}
                style={styles.storyTitleTarget}
              >
                <Text numberOfLines={2} style={styles.storyTitle}>
                  {article.title}
                </Text>
              </Pressable>
              <Text numberOfLines={2} style={styles.summary}>
                {article.summary}
              </Text>
            </View>
            <View style={styles.meta}>
              {article.reference?.memberOnly && <AppIcon name="star" size={16} color={colors.gold} />}
              <Text style={styles.counts}>{article.publishedLabel}</Text>
              <View style={styles.grow} />
              <IconButton
                icon="more"
                label={`Curation story options ${article.title}`}
                onPress={() =>
                  open({ kind: 'report', target: articleReportTarget(article.id), title: article.title })
                }
              />
            </View>
          </View>
        ))}
        {!articles.length && <Text style={styles.summary}>No preview stories available.</Text>}
      </ScrollView>
      <Pressable
        role="button"
        accessibilityLabel={`See the full list ${curation.title}`}
        style={styles.listTarget}
        onPress={() => navigation.openPublicList(list.id, list.owner.id)}
      >
        <View style={styles.listPill}>
          <Text style={styles.chipText}>See the full list</Text>
        </View>
      </Pressable>
    </View>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    toolbar: {
      minHeight: 48,
      paddingHorizontal: 8,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    toolbarTitle: {
      flex: 1,
      textAlign: 'center',
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 22,
      color: colors.text,
    },
    chips: { paddingHorizontal: 24, paddingTop: 16, gap: 8 },
    chipTarget: { minHeight: 48, justifyContent: 'center' },
    chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      minHeight: 38,
      minWidth: 82,
      alignItems: 'center',
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'transparent',
      backgroundColor: colors.input,
      justifyContent: 'center',
    },
    selectedChip: { borderColor: colors.text },
    chipText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
    header: {
      alignItems: 'center',
      paddingTop: 30,
      paddingBottom: 46,
      paddingHorizontal: 24,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    name: {
      fontFamily: fonts.sans,
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
    },
    counts: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText },
    topicCounts: { marginTop: 12 },
    follow: { marginTop: 20 },
    recommended: {
      marginHorizontal: 24,
      marginTop: 40,
      marginBottom: 40,
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '600',
      color: colors.text,
    },
    story: { paddingHorizontal: 24, paddingBottom: 40, gap: 16 },
    cover: { width: '100%', aspectRatio: 345 / 162, borderRadius: 2, overflow: 'hidden' },
    storyTitleTarget: { minHeight: 48, justifyContent: 'center' },
    storyTitle: {
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 26,
      fontWeight: '700',
      color: colors.text,
    },
    summary: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.secondaryText },
    curation: {
      paddingTop: 40,
      paddingBottom: 52,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    curationTitle: {
      marginHorizontal: 24,
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 26,
      fontWeight: '600',
      color: colors.text,
    },
    curator: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      paddingHorizontal: 24,
      marginTop: -10,
      marginBottom: 24,
    },
    curatorName: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.text },
    sectionEnd: { height: 35 },
    carousel: { paddingHorizontal: 24, gap: 32 },
    preview: { width: 240 },
    previewContent: { gap: 16 },
    previewImage: { width: 240, height: 120 },
    byline: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.text },
    meta: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
    grow: { flex: 1 },
    listTarget: {
      minHeight: 48,
      justifyContent: 'center',
      alignSelf: 'flex-start',
      marginLeft: 24,
      marginTop: 56,
    },
    listPill: {
      minHeight: 38,
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 24,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
  });
