import { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type TextStyle,
} from 'react-native';

import { useThemeStyles, useTheme } from '../../../shared/theme/ThemeProvider';
import { typography, fonts, type ThemeColors } from '../../../shared/theme/tokens';
import { AppIcon } from '../../../shared/ui/AppIcon';
import { IconButton } from '../../../shared/ui/IconButton';

import { useRecommendations } from '../../recommendations/RecommendationProvider';
import { articleWriter, articlePublication, publicIdentity } from '../../community/data/publicDirectory';
import { useArticleModeration, articleReportTarget } from '../../moderation/articleModeration';
import { ArticleByline } from '../../community/IdentityLink';
import { ArticleBookmarkControl } from '../../bookmarks/ArticleBookmarkControl';
import { LibrarySheet } from '../../bookmarks/LibrarySheet';
import { ClapControl } from '../../reactions/ClapControl';
import { ResponseButton } from '../../responses/ResponseButton';
import { useHasViewed } from '../../reading-history/ReadingHistoryProvider';
import type { FeedArticle } from '../types';

type ReferenceArticleCardProps = {
  article: FeedArticle;
  onSelect: (id: string) => void;
  variant?: 'home' | 'search' | 'profile';
  first?: boolean;
  recommendationFeedback?: boolean;
  onRemoveHistory?: () => void;
};
const balancedTitle: TextStyle & { textWrap: 'balance' } = {
  textWrap: 'balance',
};

export function ReferenceArticleCard({
  article,
  onSelect,
  variant = 'home',
  recommendationFeedback = variant === 'home',
  first = false,
  onRemoveHistory,
}: ReferenceArticleCardProps) {
  const moderation = useArticleModeration();
  const recommendations = useRecommendations();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const [menuScope, setMenuScope] = useState<string | null>(null);
  const isMenuOpen = menuScope === recommendations.scope;
  if (menuScope !== null && menuScope !== recommendations.scope) setMenuScope(null);
  const { fontScale, width } = useWindowDimensions();
  const stacked = fontScale > 1.3 || width < 340;
  const reference = article.reference;
  const viewed = useHasViewed(article.id) && !onRemoveHistory;
  const summary = <Text numberOfLines={variant === 'profile' ? 2 : undefined} style={styles.summary}>{article.summary}</Text>;
  return (
    <View
      style={[
        styles.card,
        variant === 'home' ? styles.home : styles.search,
        variant === 'profile' && styles.profile,
        first && styles.first,
      ]}
    >
      {variant !== 'profile' && <ArticleByline articleId={article.id} fallback={article.sourceName} />}
      <Pressable
        role="button"
        accessibilityLabel={`${article.title}. ${article.sourceName}. ${article.publishedLabel}`}
        onPress={() => onSelect(article.id)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.headline,
            variant === 'profile' && styles.profileHeadline,
            stacked && styles.stacked,
          ]}
        >
          <View style={[styles.copy, stacked && styles.stackedCopy]}>
          <Text
            textBreakStrategy={reference?.balancedHeadline ? 'balanced' : 'highQuality'}
            style={[
              styles.title,
              viewed && { color: colors.secondaryText },
              reference?.balancedHeadline && Platform.OS === 'web' && balancedTitle,
              stacked && styles.stackedTitle,
            ]}
          >
            {article.title}
          </Text>
          {!stacked && summary}
          </View>
          {reference?.image && (
            <Image source={reference.image} style={styles.image} resizeMode="cover" accessible={false} />
          )}
        </View>
        {stacked && summary}
      </Pressable>
      <View style={styles.metadata}>
        <View style={styles.counts}>
          {reference?.memberOnly && (
            <View style={styles.star}>
              <AppIcon name="star" color={colors.gold} size={16} />
            </View>
          )}
          <Text style={styles.date}>{article.publishedLabel}</Text>
          <ClapControl target={{ kind: 'article', id: article.id }} title={article.title} />
          <ResponseButton target={{ kind: 'article', id: article.id }} title={article.title} size={14} />
        </View>
        <View style={styles.actions}>
          {onRemoveHistory ? (
            <IconButton
              icon="trash"
              label={`Remove from history, ${article.title}`}
              onPress={onRemoveHistory}
            />
          ) : recommendationFeedback ? (
            <IconButton
              icon="minus"
              label={`Show less like this, ${article.title}`}
              color={colors.secondaryText}
              onPress={() => recommendations.showLess(article.id, article.title)}
              size={20}
            />
          ) : (
            <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} compact />
          )}
          <IconButton
            icon="more"
            label={`More, ${article.title}`}
            onPress={() => setMenuScope(recommendations.scope)}
            color={colors.secondaryText}
            size={18}
          />
        </View>
      </View>
      {viewed && (
        <Text accessibilityLabel={`읽음, ${article.title}`} style={styles.date}>
          Viewed
        </Text>
      )}
      {isMenuOpen && (
        <LibrarySheet title="Story actions" onClose={() => setMenuScope(null)} closeLabel="Close">
          <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} />
          <Pressable
            role="button"
            accessibilityLabel={`Show less like this, ${article.title}`}
            style={{ minHeight: 48, padding: 16 }}
            onPress={() => {
              setMenuScope(null);
              recommendations.showLess(article.id, article.title);
            }}
          >
            <Text style={{ color: colors.text }}>Show less like this</Text>
          </Pressable>
          {[articleWriter(article.id), articlePublication(article.id)]
            .flatMap((target) => (target ? [target] : []))
            .map((target) => (
              <Pressable
                key={`${target.kind}:${target.id}`}
                role="button"
                accessibilityLabel={`Mute ${publicIdentity(target)?.name ?? target.id}`}
                style={{ minHeight: 48, padding: 16 }}
                onPress={() => {
                  setMenuScope(null);
                  moderation.open({
                    kind: 'confirm',
                    action: { kind: 'mute', target, active: true },
                    title: `Mute ${publicIdentity(target)?.name ?? target.id}?`,
                    description: 'Their stories will be removed from recommendations.',
                    success: 'Muted',
                  });
                }}
              >
                <Text style={{ color: colors.text }}>Mute {publicIdentity(target)?.name ?? target.id}</Text>
              </Pressable>
            ))}

          <Pressable
            role="button"
            accessibilityLabel={`Report story, ${article.title}`}
            style={{ minHeight: 48, padding: 16 }}
            onPress={() => {
              setMenuScope(null);
              moderation.open({
                kind: 'report',
                target: articleReportTarget(article.id),
                title: article.title,
              });
            }}
          >
            <Text style={{ color: colors.destructive }}>Report story</Text>
          </Pressable>
        </LibrarySheet>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      paddingHorizontal: 24,
      paddingTop: 32,
      paddingBottom: 24,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.divider,
    },
    profile: { paddingBottom: 16 },
    profileHeadline: { marginTop: 4 },
    home: { borderBottomWidth: 0, paddingBottom: 23 },
    search: { paddingBottom: 22 },
    first: { paddingTop: 14 },
    pressed: { opacity: 0.6 },
    byline: {
      minHeight: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    avatar: { width: 20, height: 20, borderRadius: 10 },
    publication: { borderRadius: 2 },
    source: { ...typography.caption, color: colors.text, flexShrink: 1 },
    headline: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 24,
      marginTop: 16,
    },
    copy: { flex: 1 },
    stackedCopy: { flexGrow: 0, flexShrink: 0, flexBasis: 'auto', width: '100%' },
    title: { ...typography.storyTitle, flexShrink: 1, color: colors.text },
    image: { width: 80, height: 54, borderRadius: 2 },
    stacked: { flexDirection: 'column' },
    stackedTitle: {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      width: '100%',
    },
    summary: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 21,
      color: colors.secondaryText,
      marginTop: 6,
    },
    star: { width: 24 },
    metadata: {
      marginTop: 6,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    counts: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      columnGap: 8,
    },
    date: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 18,
      color: colors.secondaryText,
    },
    comment: {
      minHeight: 48,
      minWidth: 48,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    actions: { flexDirection: 'row', alignItems: 'center', marginRight: -12 },
  });
