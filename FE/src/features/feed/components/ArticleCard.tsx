import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors, spacing, typography } from '../../../shared/theme/tokens';
import { ArticleBookmarkControl } from '../../bookmarks/ArticleBookmarkControl';
import { ArticleLikeControl } from '../../likes/ArticleLikeControl';
import type { FeedArticle } from '../types';
import { FeedThumbnail } from './FeedThumbnail';
import { ReferenceArticleCard } from './ReferenceArticleCard';

type ArticleCardProps = {
  article: FeedArticle;
  onSelect: (articleId: string) => void;
};

export function ArticleCard({ article, onSelect }: ArticleCardProps) {
  const { width, fontScale } = useWindowDimensions();
  const stacked = width < 360 || fontScale > 1.3;

  if (article.reference) return <ReferenceArticleCard article={article} onSelect={onSelect} />;

  return (
    <View style={styles.card}>
      <Pressable
        role="button"
        aria-label={`${article.title}. ${article.sourceName}. ${article.publishedLabel}. ${article.readingMinutes}분 읽기`}
        onPress={() => onSelect(article.id)}
        style={({ pressed }) => [styles.link, pressed && styles.pressed]}
      >
        <Text style={styles.source}>{article.sourceName}</Text>
        <View style={[styles.body, stacked && styles.stacked]}>
          <View style={[styles.text, stacked && styles.stackedText]}>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.summary}>{article.summary}</Text>
          </View>
          {article.thumbnail && <FeedThumbnail variant={article.thumbnail} />}
        </View>
        <Text style={styles.metadata}>
          {article.publishedLabel} · {article.readingMinutes}분 읽기
        </Text>
      </Pressable>
      <View style={styles.actions}>
        <View style={styles.like}>
          <ArticleLikeControl articleId={article.id} articleTitle={article.title} />
        </View>
        <View style={styles.bookmark}>
          <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingHorizontal: spacing.page, paddingVertical: spacing.section, gap: spacing.medium },
  actions: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 },
  like: { flex: 1 },
  bookmark: { maxWidth: '48%' },
  link: { gap: spacing.medium },
  source: { ...typography.caption, color: colors.text },
  body: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.medium },
  stacked: { flexDirection: 'column' },
  text: { flex: 1, gap: spacing.small },
  // 웹의 flex: 0은 높이를 0으로 잡으므로 세로 배치에서는 내용의 높이를 그대로 사용한다.
  stackedText: { flexGrow: 0, flexShrink: 0, flexBasis: 'auto', width: '100%' },
  title: { ...typography.sectionTitle, color: colors.text },
  summary: { ...typography.body, color: colors.secondaryText },
  metadata: { ...typography.caption, color: colors.secondaryText },
  pressed: { opacity: 0.6 },
});
