import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors, typography } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import { LibrarySheet } from '../bookmarks/LibrarySheet';
import { ArticleLikeControl } from '../likes/ArticleLikeControl';
import { ReferenceArticleFooter } from './ReferenceArticleFooter';
import { ExplanationSection } from './ExplanationSection';
import type { ExplanationPreference, ExplanationSource } from './explanationTypes';
import type { ArticleDetail, ReferenceBlock } from './types';

type ReferenceArticleViewProps = {
  article: ArticleDetail;
  onBack: () => void;
  backLabel: string;
  explanationSource?: ExplanationSource;
  preference?: ExplanationPreference;
};

export function ReferenceArticleView({
  article,
  onBack,
  backLabel,
  explanationSource,
  preference,
}: ReferenceArticleViewProps) {
  const { width } = useWindowDimensions();
  const scope = preference?.scopeKey ?? 'guest';
  const [ui, setUi] = useState<{
    scope: string;
    isMenuOpen: boolean;
    isToolsOpen: boolean;
    notice: string | null;
  }>({
    scope,
    isMenuOpen: false,
    isToolsOpen: false,
    notice: null,
  });
  const matchesScope = ui.scope === scope;
  if (!matchesScope) setUi({ scope, isMenuOpen: false, isToolsOpen: false, notice: null });
  const toolsVisible = matchesScope && ui.isToolsOpen;
  const scroll = useRef<ScrollView>(null);
  const notice = (value: string) => setUi((previous) => ({ ...previous, scope, notice: value }));
  const reference = article.reference;
  const content = article.referenceContent;

  useEffect(() => {
    if (!toolsVisible) return;
    const frame = requestAnimationFrame(() => scroll.current?.scrollToEnd({ animated: true }));
    return () => cancelAnimationFrame(frame);
  }, [toolsVisible]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <IconButton icon="back" label={backLabel} onPress={onBack} color={colors.secondaryText} />
        <View style={styles.flex} />
        <IconButton icon="play" label="Listen" onPress={() => notice('Listen')} style={styles.listen} />
        <IconButton
          icon="more"
          label="Story options"
          onPress={() => setUi((previous) => ({ ...previous, scope, isMenuOpen: true }))}
        />
      </View>
      <ScrollView
        ref={scroll}
        accessibilityLabel="기사 본문"
        style={styles.flex}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.body}>
          {reference?.memberOnly && (
            <View style={styles.memberBadge}>
              <AppIcon name="star" size={20} color={colors.gold} />
              <Text style={styles.memberLabel}>Member-only story</Text>
            </View>
          )}
          <Text role="heading" style={styles.title}>
            {article.title}
          </Text>
          {Boolean(article.subtitle) && <Text style={styles.subtitle}>{article.subtitle}</Text>}
          <Text style={styles.metadata}>
            {article.readingMinutes > 0 ? `${article.readingMinutes} min read · ` : ''}
            {content?.publishedLabel ?? article.publishedLabel}
          </Text>
          <View style={styles.author}>
            {reference?.avatar && (
              <Image source={reference.avatar} accessible={false} style={styles.authorAvatar} />
            )}
            <Text style={styles.authorName}>{article.sourceName}</Text>
            <FollowButton onPress={() => notice(`Follow ${article.sourceName}`)} />
          </View>
          {reference?.image && (
            <Image
              source={reference.image}
              accessibilityLabel={`${article.title} cover`}
              style={[styles.cover, { height: Math.min(width - 48, 680) / 1.5 }]}
              resizeMode="cover"
            />
          )}
          {content && <Text style={styles.caption}>{content.caption}</Text>}
          <View style={styles.paragraphs}>
            {content ? (
              content.blocks.map((block, index) => <ReferenceParagraph key={index} block={block} />)
            ) : (
              <>
                <Text style={styles.paragraph}>{article.subtitle || article.title}</Text>
                <Text style={styles.missing}>
                  The complete story is not included in the reference screenshots. This local prototype shows
                  the captured title and image.
                </Text>
              </>
            )}
          </View>
          {content && (
            <>
              <View style={styles.topics}>
                {content.topics.map((topic) => (
                  <Pressable
                    key={topic}
                    role="button"
                    accessibilityLabel={`Topic: ${topic}`}
                    onPress={() => notice(topic)}
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
                  <FollowButton onPress={() => notice(`Follow ${article.sourceName}`)} />
                </View>
                <Text role="heading" style={styles.authorHeading}>
                  Written by {article.sourceName}
                </Text>
                <Text style={styles.followers}>
                  {content.authorFollowers} followers · {content.authorFollowing} following
                </Text>
                <Pressable
                  role="button"
                  accessibilityLabel="Author website"
                  onPress={() => notice('Author website')}
                  style={styles.authorLink}
                >
                  <Text style={styles.bio}>{content.authorBio}</Text>
                </Pressable>
              </View>
              <ReferenceArticleFooter onNotice={notice} />
            </>
          )}
          <View style={styles.toolsEntry}>
            <Pressable
              role="button"
              accessibilityLabel="Reading tools"
              onPress={() => setUi((previous) => ({ ...previous, scope, isToolsOpen: !toolsVisible }))}
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
      <View style={styles.reactionBar}>
        <ArticleLikeControl articleId={article.id} articleTitle={article.title} compact iconSize={24} />
        <Pressable
          role="button"
          accessibilityLabel="Responses"
          onPress={() => notice('Responses')}
          style={styles.responseControl}
        >
          <AppIcon name="comment" size={24} />
          <Text style={styles.reactionCount}>{reference?.responses}</Text>
        </Pressable>
        <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} compact iconSize={24} />
        <IconButton icon="share" label="Share story" onPress={() => notice('Share story')} size={24} />
      </View>
      {matchesScope && ui.isMenuOpen && (
        <LibrarySheet
          title="Story options"
          closeLabel="Close"
          onClose={() => setUi((previous) => ({ ...previous, isMenuOpen: false }))}
        >
          <Pressable
            role="button"
            accessibilityLabel="Open reading tools"
            onPress={() =>
              setUi((previous) => ({ ...previous, scope, isMenuOpen: false, isToolsOpen: true }))
            }
            style={styles.menuRow}
          >
            <Text style={styles.topicText}>Reading tools · local example</Text>
          </Pressable>
          <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} />
        </LibrarySheet>
      )}
      <ReferenceNotice
        title={matchesScope ? ui.notice : null}
        onClose={() => setUi((previous) => ({ ...previous, notice: null }))}
      />
    </View>
  );
}

function FollowButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable role="button" accessibilityLabel="Follow author" onPress={onPress} style={styles.followTarget}>
      <View style={styles.follow}>
        <Text style={styles.followText}>Follow</Text>
      </View>
    </Pressable>
  );
}

function ReferenceParagraph({ block }: { block: ReferenceBlock }) {
  if (block.kind === 'divider')
    return (
      <Text aria-hidden style={styles.divider}>
        · · ·
      </Text>
    );
  if (block.kind === 'missing') return <Text style={styles.missing}>[Uncaptured paragraphs omitted]</Text>;
  const start = block.highlight ? block.text.indexOf(block.highlight) : -1;
  return (
    <Text selectable style={[styles.paragraph, block.bold && styles.bold]}>
      {start < 0 || !block.highlight ? (
        block.text
      ) : (
        <>
          {block.text.slice(0, start)}
          <Text style={styles.highlight}>{block.highlight}</Text>
          {block.text.slice(start + block.highlight.length)}
        </>
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
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
  listen: { alignItems: 'flex-end', paddingRight: 4 },
  scroll: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 32 },
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
  memberLabel: { fontSize: 14, lineHeight: 20, color: colors.secondaryText },
  title: { fontSize: 32, lineHeight: 38, fontWeight: '700', color: colors.text, marginTop: 16 },
  subtitle: { fontSize: 18, lineHeight: 26, color: colors.secondaryText, marginTop: 16 },
  metadata: { fontSize: 14, lineHeight: 20, color: colors.secondaryText, marginTop: 24 },
  author: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
    marginTop: 6,
  },
  authorAvatar: { width: 32, height: 32, borderRadius: 16 },
  authorName: { fontSize: 16, lineHeight: 24, color: colors.text, flexShrink: 1 },
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
  followText: { fontSize: 14, lineHeight: 20, color: colors.text },
  cover: { width: '100%', aspectRatio: 1.5, marginTop: 24 },
  caption: { fontSize: 12, lineHeight: 18, color: colors.secondaryText, textAlign: 'center', marginTop: 16 },
  paragraphs: { gap: 28, marginTop: 32 },
  paragraph: { ...typography.storyBody, fontSize: 18, color: colors.text },
  bold: { fontWeight: '700' },
  highlight: { backgroundColor: '#e8f3e8' },
  divider: { color: '#777777', fontSize: 24, lineHeight: 32, textAlign: 'center' },
  missing: { ...typography.caption, color: colors.secondaryText },
  topics: { marginTop: 48, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  topicTarget: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
  topicPill: { backgroundColor: colors.input, borderRadius: 24, paddingHorizontal: 14, paddingVertical: 8 },
  topicText: { fontSize: 14, lineHeight: 20, color: colors.text },
  authorCard: { marginTop: 56, gap: 12 },
  authorCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  largeAvatar: { width: 64, height: 64, borderRadius: 32 },
  authorHeading: { fontSize: 16, lineHeight: 24, fontWeight: '700', color: colors.text },
  followers: { fontSize: 14, lineHeight: 20, color: colors.secondaryText },
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
  menuRow: { minHeight: 48, justifyContent: 'center' },
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
  responseControl: { minHeight: 48, minWidth: 48, flexDirection: 'row', alignItems: 'center', gap: 8 },
  reactionCount: { fontSize: 14, lineHeight: 20, color: colors.text },
});
