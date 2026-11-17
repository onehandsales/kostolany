import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors, spacing, typography } from '../../../shared/theme/tokens';
import type { FeedArticle } from '../types';
import { FeedThumbnail } from './FeedThumbnail';

export function ArticleCard({ article, onSelect }: {
  article: FeedArticle;
  onSelect: (articleId: string) => void;
}) {
  const { width, fontScale } = useWindowDimensions();
  const stacked = width < 360 || fontScale > 1.3;

  return (
    <Pressable
      role="button"
      aria-label={`${article.title}. ${article.sourceName}. ${article.publishedLabel}. ${article.readingMinutes}분 읽기`}
      onPress={() => onSelect(article.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.source}>{article.sourceName}</Text>
      <View style={[styles.body, stacked && styles.stacked]}>
        <View style={[styles.text, stacked && styles.stackedText]}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.summary}>{article.summary}</Text>
        </View>
        {article.thumbnail && <FeedThumbnail variant={article.thumbnail} />}
      </View>
      <Text style={styles.metadata}>{article.publishedLabel} · {article.readingMinutes}분 읽기</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { paddingHorizontal: spacing.page, paddingVertical: spacing.section, gap: spacing.medium },
  source: { ...typography.caption, color: colors.text },
  body: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.medium },
  stacked: { flexDirection: 'column' },
  text: { flex: 1, gap: spacing.small },
  stackedText: { flex: 0, width: '100%' },
  title: { ...typography.sectionTitle, color: colors.text },
  summary: { ...typography.body, color: colors.secondaryText },
  metadata: { ...typography.caption, color: colors.secondaryText },
  pressed: { opacity: 0.6 },
});
