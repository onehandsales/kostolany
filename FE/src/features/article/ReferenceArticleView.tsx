import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { typography, fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { AspectImage } from '../../shared/ui/AspectImage';
import { TopPopover } from '../../shared/ui/TopPopover';
import { useReturnFocus } from '../../shared/ui/useReturnFocus';

import { useRecommendations } from '../recommendations/RecommendationProvider';
import { topicByName } from '../topics/data/topicCatalog';
import { useModeration } from '../moderation/ModerationContext';
import { articleReportTarget } from '../moderation/articleModeration';
import { FollowControl } from '../community/FollowControl';
import { IdentityLink } from '../community/IdentityLink';
import { SafeWebsiteLink } from '../community/SafeWebsiteLink';
import { articleWriter, publicIdentity } from '../community/data/publicDirectory';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import { ArticleDisplayPopover } from '../settings/ArticleDisplayPopover';
import { useReaderTypography } from '../settings/useReaderTypography';
import { ClapControl, UndoClaps } from '../reactions/ClapControl';
import { ResponseButton } from '../responses/ResponseButton';
import { PassageReader } from '../highlights/PassageReader';
import { ListenControl } from '../listening/ListenControl';
import { useShareDialog } from '../sharing/SharingProvider';
import { ShareSheet } from '../sharing/ShareSheet';
import { articleShareTarget } from '../sharing/articleShareTarget';

import { articleSelectionDocument } from './articleSelectionDocument';
import { ReferenceArticleFooter } from './ReferenceArticleFooter';
import { ExplanationSection } from './ExplanationSection';
import type { ExplanationPreference, ExplanationSource } from './explanationTypes';
import type { ArticleDetail, ReferenceBlock } from './types';

type ReferenceArticleViewProps = {
  article: ArticleDetail;
  active?: boolean;
  access?: 'loading' | 'error' | 'blocked';
  onRetryAccess?: () => void;
  highlightId?: string;
  onBack: () => void;
  backLabel: string;
  explanationSource?: ExplanationSource;
  preference?: ExplanationPreference;
  onSelectArticle?: (articleId: string) => void;
};

export function ReferenceArticleView({
  article,
  active = true,
  access,
  onRetryAccess,
  highlightId,
  onBack,
  backLabel,
  explanationSource,
  preference,
  onSelectArticle,
}: ReferenceArticleViewProps) {
  const reader = useReaderTypography(18);
  const share = useShareDialog();
  const moderation = useModeration();
  const muted = moderation.state?.value?.muted.some(
    (item) => item.kind === 'writer' && item.id === articleWriter(article.id)?.id,
  );
  const writer = articleWriter(article.id);
  const identity = writer ? publicIdentity(writer) : undefined;
  const community = useCommunityNavigation();
  const recommendations = useRecommendations();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const scope = preference?.scopeKey ?? 'guest';
  const [ui, setUi] = useState<{
    scope: string;
    isMenuOpen: boolean;
    isDisplayOpen: boolean;
    isToolsOpen: boolean;
    notice: string | null;
  }>({
    scope,
    isMenuOpen: false,
    isDisplayOpen: false,
    isToolsOpen: false,
    notice: null,
  });
  const matchesScope = ui.scope === scope;
  // 더보기에서 표시 설정으로 이동해도 두 메뉴를 닫은 뒤 최초 진입 버튼으로 돌아간다.
  const openMenuWithFocus = useReturnFocus(active && matchesScope && !access && !ui.isMenuOpen && !ui.isDisplayOpen);
  if (!matchesScope)
    setUi({
      scope,
      isMenuOpen: false,
      isDisplayOpen: false,
      isToolsOpen: false,
      notice: null,
    });
  if (access && (ui.isMenuOpen || ui.isDisplayOpen || ui.notice))
    setUi((previous) => ({ ...previous, isMenuOpen: false, isDisplayOpen: false, notice: null }));
  const toolsVisible = matchesScope && ui.isToolsOpen;
  const scroll = useRef<ScrollView>(null);
  const lastScrollY = useRef(0);
  const [chromeHidden, setChromeHidden] = useState(false);
  const notice = (value: string) => setUi((previous) => ({ ...previous, scope, notice: value }));
  const reference = article.reference;
  const content = article.referenceContent;
  const document = useMemo(() => articleSelectionDocument(article), [article]);
  const paragraphTop = useRef(0);
  const blockPositions = useRef(new Map<number, number>());

  useEffect(() => {
    if (!toolsVisible) return;
    const frame = requestAnimationFrame(() => scroll.current?.scrollToEnd({ animated: true }));
    return () => cancelAnimationFrame(frame);
  }, [toolsVisible]);

  return (
    <View style={styles.screen}>
      <View
        style={[styles.header, !access && chromeHidden && styles.chromeHidden]}
        aria-hidden={!access && chromeHidden}
        accessibilityElementsHidden={!access && chromeHidden}
        importantForAccessibility={!access && chromeHidden ? 'no-hide-descendants' : 'auto'}
      >
        <IconButton icon="back" label={backLabel} onPress={onBack} color={colors.secondaryText} />
        <View style={styles.flex} />
        <ListenControl article={article} disabled={Boolean(access) || !active} />
        <IconButton
          icon="more"
          label="Story options"
          disabled={Boolean(access)}
          onPress={() => openMenuWithFocus(() => setUi((previous) => ({ ...previous, scope, isMenuOpen: true })))}
        />
      </View>
      {access && (
        <ContentStatus
          loading={access === 'loading'}
          error={access === 'error'}
          message={
            access === 'loading'
              ? '읽기 환경을 불러오고 있어요'
              : access === 'error'
                ? '차단 설정을 불러오지 못했어요.'
                : '차단한 작가의 기사예요. 작가 프로필 또는 Settings에서 차단을 해제해 주세요.'
          }
          actionLabel={access === 'error' ? '다시 시도' : undefined}
          onAction={access === 'error' ? onRetryAccess : undefined}
        />
      )}
      <ScrollView
        ref={scroll}
        accessibilityLabel="기사 본문"
        style={[styles.flex, Boolean(access) && styles.hidden]}
        accessibilityElementsHidden={Boolean(access)}
        importantForAccessibility={access ? 'no-hide-descendants' : 'auto'}
        contentContainerStyle={styles.scroll}
        scrollEventThrottle={32}
        onScroll={(event) => {
          const y = event.nativeEvent.contentOffset.y;
          const delta = y - lastScrollY.current;
          if (y < 80 || delta < -8) setChromeHidden(false);
          else if (delta > 8) setChromeHidden(true);
          lastScrollY.current = y;
        }}
      >
        <View style={styles.body}>
          {reference?.memberOnly && (
            <View style={styles.memberBadge}>
              <AppIcon name="star" size={20} color={colors.gold} />
              <Text style={styles.memberLabel}>Member-only story</Text>
            </View>
          )}
          <Text role="heading" style={[styles.title, reader.title]}>
            {article.title}
          </Text>
          {Boolean(article.subtitle) && (
            <Text style={[styles.subtitle, reader.subtitle]}>{article.subtitle}</Text>
          )}
          <Text style={styles.metadata}>
            {article.readingMinutes > 0 ? `${article.readingMinutes} min read · ` : ''}
            {content?.publishedLabel ?? article.publishedLabel}
          </Text>
          <View style={styles.author}>
            {reference?.avatar && (
              <Image source={reference.avatar} accessible={false} style={styles.authorAvatar} />
            )}
            {writer ? (
              <IdentityLink target={writer} style={styles.authorName} />
            ) : (
              <Text style={styles.authorName}>{article.sourceName}</Text>
            )}
            {writer && <FollowControl target={writer} name={identity?.name ?? article.sourceName} />}
          </View>
          {reference?.image && (
            <AspectImage
              source={reference.image}
              aspectRatio={1.5}
              accessibilityLabel={`${article.title} cover`}
              style={styles.cover}
              resizeMode="cover"
            />
          )}
          {content && <Text style={styles.caption}>{content.caption}</Text>}
          <View
            onLayout={(event) => {
              paragraphTop.current = event.nativeEvent.layout.y;
            }}
          >
            <PassageReader
              memberOnly={article.reference?.memberOnly}
              document={document}
              active={active}
              highlightId={highlightId}
              onRevealBlock={(index) =>
                scroll.current?.scrollTo({
                  y: paragraphTop.current + (blockPositions.current.get(index) ?? 0),
                  animated: false,
                })
              }
            >
              {(renderText) => (
                <View style={styles.paragraphs}>
                  {content ? (
                    content.blocks.map((block, index) => (
                      <View
                        key={index}
                        onLayout={(event) => {
                          blockPositions.current.set(index, event.nativeEvent.layout.y);
                        }}
                      >
                        {block.kind === 'text' ? (
                          renderText(
                            index,
                            [styles.paragraph, reader.body, block.bold && styles.bold],
                            reader.showHighlights ? block.highlight : undefined,
                          )
                        ) : (
                          <ReferenceDecoration block={block} />
                        )}
                      </View>
                    ))
                  ) : (
                    <>
                      {renderText(0, [styles.paragraph, reader.body])}
                      <Text style={styles.missing}>
                        The complete story is not included in the reference screenshots. This local prototype
                        shows the captured title and image.
                      </Text>
                    </>
                  )}
                </View>
              )}
            </PassageReader>
          </View>
          {content && (
            <>
              <View style={styles.topics}>
                {content.topics.map((topic) => (
                  <Pressable
                    key={topic}
                    role="button"
                    accessibilityLabel={`Topic: ${topic}`}
                    onPress={() => {
                      const found = topicByName(topic);
                      if (found) community.openTopic(found.id);
                    }}
                    style={styles.topicTarget}
                  >
                    <View style={styles.topicPill}>
                      <Text style={styles.topicText}>{topic}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
              <View style={styles.authorCard}>
                <View style={styles.authorCardTop}>
                  {reference?.avatar && (
                    <Image source={reference.avatar} style={styles.largeAvatar} accessible={false} />
                  )}
                  {writer && <FollowControl target={writer} name={identity?.name ?? article.sourceName} />}
                </View>
                {writer ? (
                  <IdentityLink
                    target={writer}
                    style={styles.authorHeading}
                  >{`Written by ${identity?.name ?? article.sourceName}`}</IdentityLink>
                ) : (
                  <Text style={styles.authorHeading}>{article.sourceName}</Text>
                )}
                <Pressable
                  role="button"
                  accessibilityLabel="Author followers and following"
                  style={{ minHeight: 48, justifyContent: 'center' }}
                  onPress={() => {
                    if (writer) community.openConnections(writer, 'following');
                  }}
                >
                  <Text style={styles.followers}>
                    {content.authorFollowers} followers · {content.authorFollowing} following
                  </Text>
                </Pressable>
                <Text style={styles.bio}>{identity?.bio ?? content.authorBio}</Text>
                {identity?.website && <SafeWebsiteLink url={identity.website} />}
              </View>
              <ReferenceArticleFooter
                active={active}
                articleId={article.id}
                onNotice={notice}
                onSelectArticle={onSelectArticle}
              />
            </>
          )}
          <View style={styles.toolsEntry}>
            <Pressable
              role="button"
              accessibilityLabel="Reading tools"
              onPress={() =>
                setUi((previous) => ({
                  ...previous,
                  scope,
                  isToolsOpen: !toolsVisible,
                }))
              }
              style={styles.responseButton}
            >
              <Text style={styles.topicText}>
                {toolsVisible ? 'Hide reading tools' : 'Reading tools · local example'}
              </Text>
            </Pressable>
          </View>
          {/* 도구를 접어도 같은 기사에서 선택한 수준은 유지하고 인증 범위가 바뀔 때만 초기화한다. */}
          <View
            style={!toolsVisible && styles.hidden}
            accessibilityElementsHidden={!toolsVisible}
            importantForAccessibility={toolsVisible ? 'auto' : 'no-hide-descendants'}
          >
            <ExplanationSection articleId={article.id} source={explanationSource} preference={preference} />
          </View>
        </View>
      </ScrollView>
      <View
        style={[styles.reactionBar, (chromeHidden || Boolean(access)) && styles.chromeHidden]}
        aria-hidden={chromeHidden || Boolean(access)}
        accessibilityElementsHidden={chromeHidden || Boolean(access)}
        importantForAccessibility={chromeHidden || access ? 'no-hide-descendants' : 'auto'}
      >
        <ClapControl target={{ kind: 'article', id: article.id }} title={article.title} size={24} />
        <ResponseButton
          active={active}
          target={{ kind: 'article', id: article.id }}
          title={article.title}
          label="Responses"
          size={24}
        />
        <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} compact iconSize={24} />
        <IconButton icon="share" label="Share story" onPress={() => share.open(articleShareTarget(article))} size={24} />
      </View>
      {!access && matchesScope && ui.isMenuOpen && (
        <TopPopover
          title="Story options"
          width={250}
          showPointer={false}
          right={8}
          top={44}
          onClose={() => setUi((previous) => ({ ...previous, isMenuOpen: false }))}
        >
          <Pressable
            role="button"
            accessibilityLabel="비슷한 기사 추천 줄이기"
            style={[styles.menuRow, styles.menuGroup]}
            onPress={() => {
              setUi((previous) => ({ ...previous, isMenuOpen: false }));
              recommendations.showLess(article.id, article.title);
            }}
          >
            <Text style={styles.menuText}>Show less like this</Text>
            <AppIcon name="minus" size={20} />
          </Pressable>
          <Pressable
            role="button"
            accessibilityLabel="기사 표시 설정"
            style={[styles.menuRow, styles.menuGroup]}
            onPress={() =>
              setUi((previous) => ({
                ...previous,
                isMenuOpen: false,
                isDisplayOpen: true,
              }))
            }
          >
            <Text style={styles.menuText}>Display settings...</Text>
          </Pressable>
          {writer && (
            <View style={styles.menuRow}>
              <FollowControl target={writer} name={identity?.name ?? article.sourceName} presentation="menu" />
            </View>
          )}
          {writer && (
            <Pressable
              role="button"
              accessibilityLabel={muted ? 'Unmute author' : 'Mute author'}
              style={styles.menuRow}
              onPress={() => {
                setUi((previous) => ({ ...previous, isMenuOpen: false }));
                moderation.open({
                  kind: 'confirm',
                  action: { kind: 'mute', target: writer, active: !muted },
                  title: muted ? 'Unmute author' : 'Mute author',
                  description: muted
                    ? 'Allow this author in your recommendations again?'
                    : 'Hide this author from recommendations? Following and saved stories stay unchanged.',
                  success: muted ? 'Author unmuted' : 'Author muted',
                });
              }}
            >
              <Text style={styles.menuText}>{muted ? 'Unmute author' : 'Mute author'}</Text>
            </Pressable>
          )}
          <Pressable
            role="button"
            accessibilityLabel="Report story..."
            style={styles.menuRow}
            onPress={() => {
              setUi((previous) => ({ ...previous, isMenuOpen: false }));
              moderation.open({
                kind: 'report',
                target: articleReportTarget(article.id),
                title: article.title,
              });
            }}
          >
            <Text style={[styles.menuText, { color: colors.destructive }]}>Report story...</Text>
          </Pressable>
          <UndoClaps
            target={{ kind: 'article', id: article.id }}
            onDone={() => setUi((previous) => ({ ...previous, isMenuOpen: false }))}
          />
        </TopPopover>
      )}
      {!access && matchesScope && ui.isDisplayOpen && (
        <ArticleDisplayPopover onClose={() => setUi((previous) => ({ ...previous, isDisplayOpen: false }))} />
      )}
      {share.target && <ShareSheet target={share.target} available={!access && active} onClose={share.close} />}
      <ReferenceNotice
        title={matchesScope ? ui.notice : null}
        onClose={() => setUi((previous) => ({ ...previous, notice: null }))}
      />
    </View>
  );
}

function ReferenceDecoration({ block }: { block: Exclude<ReferenceBlock, { kind: 'text' }> }) {
  const styles = useThemeStyles(createStyles);
  if (block.kind === 'divider')
    return (
      <Text aria-hidden style={styles.divider}>
        · · ·
      </Text>
    );
  if (block.kind === 'missing') return <Text style={styles.missing}>[Uncaptured paragraphs omitted]</Text>;
  return (
    <View>
      <AspectImage
        source={block.source}
        accessibilityLabel={block.description}
        aspectRatio={block.aspectRatio}
        resizeMode="contain"
      />
      <Text style={[styles.caption, styles.inlineCaption]}>{block.caption}</Text>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    chromeHidden: {
      display: 'none',
      height: 0,
      minHeight: 0,
      paddingVertical: 0,
      overflow: 'hidden',
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
    screen: { flex: 1 },
    flex: { flex: 1 },
    header: {
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 4,
      paddingRight: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    scroll: { paddingHorizontal: 24, paddingTop: 27, paddingBottom: 32 },
    body: { width: '100%', maxWidth: 680, alignSelf: 'center' },
    memberBadge: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderWidth: 1,
      borderColor: colors.input,
      borderRadius: 8,
      paddingHorizontal: 12,
      minHeight: 32,
    },
    memberLabel: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.secondaryText,
    },
    title: {
      fontFamily: fonts.sans,
      fontSize: 32,
      lineHeight: 38,
      fontWeight: '700',
      letterSpacing: -0.6,
      color: colors.text,
      marginTop: 16,
    },
    subtitle: {
      fontFamily: fonts.sans,
      fontSize: 18,
      lineHeight: 26,
      color: colors.secondaryText,
      marginTop: 16,
    },
    metadata: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.secondaryText,
      marginTop: 24,
    },
    author: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 12,
      minHeight: 48,
      marginTop: 6,
    },
    authorAvatar: { width: 32, height: 32, borderRadius: 16 },
    authorName: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 24,
      color: colors.text,
      flexShrink: 1,
    },
    followTarget: { minHeight: 48, minWidth: 64, justifyContent: 'center' },
    follow: {
      minHeight: 32,
      paddingHorizontal: 12,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.text,
      alignItems: 'center',
      justifyContent: 'center',
    },
    followText: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
    cover: { marginTop: 24 },
    caption: {
      fontFamily: fonts.sans,
      fontSize: 12,
      lineHeight: 18,
      color: colors.secondaryText,
      textAlign: 'center',
      marginTop: 16,
    },
    inlineCaption: { fontSize: 18, lineHeight: 26 },
    paragraphs: { gap: 28, marginTop: 32 },
    paragraph: { ...typography.storyBody, fontSize: 18, color: colors.text },
    bold: { fontWeight: '700' },
    highlight: { backgroundColor: colors.highlight },
    divider: {
      color: colors.secondaryText,
      fontFamily: fonts.sans,
      fontSize: 24,
      lineHeight: 32,
      textAlign: 'center',
    },
    missing: { ...typography.caption, color: colors.secondaryText },
    topics: { marginTop: 48, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    topicTarget: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
    topicPill: {
      backgroundColor: colors.input,
      borderRadius: 24,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    topicText: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
    authorCard: { marginTop: 56, gap: 12 },
    authorCardTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 8,
    },
    largeAvatar: { width: 64, height: 64, borderRadius: 32 },
    authorHeading: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '700',
      color: colors.text,
    },
    followers: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.secondaryText,
    },
    authorLink: { minHeight: 48, paddingVertical: 16 },
    bio: { ...typography.body, color: colors.text },
    responseButton: {
      minHeight: 48,
      justifyContent: 'center',
      alignSelf: 'flex-start',
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 24,
    },
    toolsEntry: { marginVertical: 32 },
    hidden: { display: 'none' },
    menuRow: {
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    menuGroup: {
      borderBottomWidth: 8,
      borderBottomColor: colors.divider,
      minHeight: 56,
    },
    menuText: {
      fontFamily: fonts.sans,
      fontSize: 17,
      lineHeight: 22,
      color: colors.text,
    },
    reactionBar: {
      minHeight: 48,
      paddingHorizontal: 24,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    responseControl: {
      minHeight: 48,
      minWidth: 48,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    reactionCount: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
  });
