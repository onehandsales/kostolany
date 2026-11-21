import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import { useModeration } from '../moderation/ModerationContext';
import { articleReportTarget, isArticleBlocked } from '../moderation/articleModeration';
import { useHasViewed } from '../reading-history/ReadingHistoryProvider';
import { SearchByline } from '../search/SearchCard';
import type { FeedArticle } from '../feed/types';

type PublicListStoryCardProps = { article: FeedArticle; onOpen: (id: string) => void };
export function PublicListStoryCard({ article, onOpen }: PublicListStoryCardProps) {
  const styles = useThemeStyles(createStyles);
  const moderation = useModeration();
  const viewed = useHasViewed(article.id);
  const { width, fontScale } = useWindowDimensions();
  if (isArticleBlocked(moderation.state?.value, article.id)) return null;
  return <View style={styles.card}>
    <Pressable role="button" accessibilityLabel={`Read ${article.title}`} onPress={() => onOpen(article.id)}>
      <SearchByline name={article.sourceName} avatar={article.reference?.avatar} verified={article.reference?.verifiedAuthor} />
      <View style={[styles.headline, (width < 340 || fontScale > 1.3) && styles.stack]}>
        <Text style={[styles.title, viewed && styles.viewed]}>{article.title}</Text>
        {article.reference?.image && <Image source={article.reference.image} style={styles.image} accessible={false} />}
      </View>
    </Pressable>
    <View style={styles.actions}>
      {article.reference?.memberOnly && <AppIcon name="star" size={16} color="#ffc017" />}
      <Text style={styles.metadata}>
        {article.readingMinutes ? `${article.readingMinutes} min read` : ''}
        {article.publishedLabel ? ` · ${article.publishedLabel}` : ''}{viewed ? ' · Viewed' : ''}
      </Text>
      <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} compact />
      <ActionMenu label={`Story options, ${article.title}`} items={[
        { label: 'Report this item', onPress: () => moderation.open({ kind: 'report',
          target: articleReportTarget(article.id), title: article.title }) },
      ]} />
    </View>
  </View>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  card: { padding: 24, paddingBottom: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  headline: { flexDirection: 'row', alignItems: 'flex-start', gap: 40, marginTop: 8 },
  stack: { flexDirection: 'column' },
  title: { flex: 1, fontFamily: fonts.sans, fontSize: 16, lineHeight: 21, fontWeight: '700', color: colors.text },
  viewed: { color: colors.secondaryText },
  image: { width: 80, height: 56, borderRadius: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  metadata: { flex: 1, minWidth: 90, fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText },
});
