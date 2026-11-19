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

import { colors, typography } from '../../../shared/theme/tokens';
import { AppIcon } from '../../../shared/ui/AppIcon';
import { IconButton } from '../../../shared/ui/IconButton';
import { ReferenceNotice } from '../../../shared/ui/ReferenceNotice';
import { ArticleBookmarkControl } from '../../bookmarks/ArticleBookmarkControl';
import { LibrarySheet } from '../../bookmarks/LibrarySheet';
import { ArticleLikeControl } from '../../likes/ArticleLikeControl';
import type { FeedArticle } from '../types';

type ReferenceArticleCardProps = {
  article: FeedArticle;
  onSelect: (id: string) => void;
  variant?: 'home' | 'search';
  first?: boolean;
};
const balancedTitle: TextStyle & { textWrap: 'balance' } = { textWrap: 'balance' };

export function ReferenceArticleCard({
  article,
  onSelect,
  variant = 'home',
  first = false,
}: ReferenceArticleCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const { fontScale, width } = useWindowDimensions();
  const stacked = fontScale > 1.3 || width < 340;
  const reference = article.reference;
  return (
    <View style={[styles.card, first && styles.first]}>
      <Pressable
        role="button"
        accessibilityLabel={`${article.title}. ${article.sourceName}. ${article.publishedLabel}`}
        onPress={() => onSelect(article.id)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.byline}>
          {reference?.avatar && (
            <Image
              source={reference.avatar}
              style={[styles.avatar, article.sourceName.startsWith('In ') && styles.publication]}
              accessible={false}
            />
          )}
          <Text style={styles.source}>{article.sourceName}</Text>
        </View>
        <View style={[styles.headline, stacked && styles.stacked]}>
          <Text
            textBreakStrategy={reference?.balancedHeadline ? 'balanced' : 'highQuality'}
            style={[
              styles.title,
              reference?.balancedHeadline && Platform.OS === 'web' && balancedTitle,
              stacked && styles.stackedTitle,
            ]}
          >
            {article.title}
          </Text>
          {reference?.image && (
            <Image source={reference.image} style={styles.image} resizeMode="cover" accessible={false} />
          )}
        </View>
        <Text
          style={[
            styles.summary,
            Boolean(reference?.image) &&
              !stacked &&
              (variant === 'search' ? styles.searchSummary : styles.summaryWithImage),
          ]}
        >
          {article.summary}
        </Text>
      </Pressable>
      <View style={styles.metadata}>
        <View style={styles.counts}>
          {reference?.memberOnly && (
            <View style={styles.star}>
              <AppIcon name="star" color={colors.gold} size={16} />
            </View>
          )}
          <Text style={styles.date}>{article.publishedLabel}</Text>
          <ArticleLikeControl articleId={article.id} articleTitle={article.title} compact />
          <Pressable
            role="button"
            accessibilityLabel={`Responses, ${article.title}`}
            onPress={() => setNotice('Responses')}
            style={styles.comment}
          >
            <AppIcon name="comment" size={14} color={colors.secondaryText} />
            <Text style={styles.date}>{reference?.responses}</Text>
          </Pressable>
        </View>
        <View style={styles.actions}>
          {variant === 'home' ? (
            <IconButton
              icon="minus"
              label={`Show less like this, ${article.title}`}
              color={colors.secondaryText}
              onPress={() => setNotice('Refine recommendations')}
              size={20}
            />
          ) : (
            <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} compact />
          )}
          <IconButton
            icon="more"
            label={`More, ${article.title}`}
            onPress={() => setIsMenuOpen(true)}
            color={colors.secondaryText}
            size={18}
          />
        </View>
      </View>
      {isMenuOpen && (
        <LibrarySheet title="Story actions" onClose={() => setIsMenuOpen(false)} closeLabel="Close">
          <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} />
        </LibrarySheet>
      )}
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  first: { paddingTop: 16 },
  pressed: { opacity: 0.6 },
  byline: { minHeight: 20, flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 20, height: 20, borderRadius: 10 },
  publication: { borderRadius: 2 },
  source: { ...typography.caption, color: colors.text, flexShrink: 1 },
  headline: { flexDirection: 'row', alignItems: 'flex-start', gap: 24, marginTop: 16 },
  title: { ...typography.storyTitle, flex: 1, color: colors.text },
  image: { width: 80, height: 54, borderRadius: 2 },
  stacked: { flexDirection: 'column' },
  stackedTitle: { flexGrow: 0, flexShrink: 0, flexBasis: 'auto', width: '100%' },
  summary: { fontSize: 16, lineHeight: 21, color: colors.secondaryText, marginTop: 6 },
  summaryWithImage: { marginRight: 96 },
  searchSummary: { marginRight: 84 },
  star: { width: 24 },
  metadata: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counts: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 8 },
  date: { fontSize: 12, lineHeight: 18, color: colors.secondaryText },
  comment: { minHeight: 48, minWidth: 48, flexDirection: 'row', alignItems: 'center', gap: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', marginRight: -12 },
});
