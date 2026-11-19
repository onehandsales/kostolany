import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors } from '../../shared/theme/tokens';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { AppIcon } from '../../shared/ui/AppIcon';
import type { FeedArticle } from '../feed/types';
import { SearchByline } from '../search/SearchCard';
import { ArticleBookmarkControl } from './ArticleBookmarkControl';

type ListStoryCardProps = {
  article: FeedArticle;
  onOpen: (id: string) => void;
  onRemove: () => void;
  onNotice: (label: string) => void;
};

export function ListStoryCard({
  article,
  onOpen,
  onRemove,
  onNotice,
}: ListStoryCardProps) {
  const { width, fontScale } = useWindowDimensions();
  return (
    <View style={styles.card}>
      <Pressable
        role="button"
        accessibilityLabel={`Add a note, ${article.title}`}
        onPress={() => onNotice('Add a note')}
        style={styles.noteTarget}
      >
        <Text style={styles.note}>Add a note...</Text>
      </Pressable>
      <Pressable
        role="button"
        accessibilityLabel={`${article.title}, ${article.sourceName}, ${article.publishedLabel}`}
        onPress={() => onOpen(article.id)}
      >
        <SearchByline name={article.sourceName} avatar={article.reference?.avatar} />
        <View style={[styles.headline, (width < 340 || fontScale > 1.3) && styles.stack]}>
          <Text style={styles.title}>{article.title}</Text>
          {article.reference?.image && (
            <Image source={article.reference.image} style={styles.image} accessible={false} />
          )}
        </View>
      </Pressable>
      <View style={styles.actions}>
        <AppIcon name="download" size={16} color={colors.secondaryText} />
        <Text style={styles.metadata}>
          {article.readingMinutes ? `${article.readingMinutes} min read  ·  ` : ''}
          {article.publishedLabel}
        </Text>
        <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} compact />
        <ActionMenu
          label={`기사 관리, ${article.title}`}
          items={[
            { label: 'Add note', onPress: () => onNotice('Add a note') },
            {
              label: 'Remove from list',
              accessibilityLabel: `이 목록에서 제거, ${article.title}`,
              onPress: onRemove,
            },
            { label: 'Report this item', onPress: () => onNotice('Report this item') },
          ]}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  noteTarget: { minHeight: 64, justifyContent: 'center' },
  note: {
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.border,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    color: colors.secondaryText,
  },
  headline: { flexDirection: 'row', alignItems: 'flex-start', gap: 24, marginTop: 12, minHeight: 56 },
  stack: { flexDirection: 'column' },
  title: { flex: 1, fontSize: 16, lineHeight: 21, fontWeight: '700', color: colors.text },
  image: { width: 80, height: 56, borderRadius: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  metadata: { flex: 1, fontSize: 12, lineHeight: 18, color: colors.secondaryText },
});
