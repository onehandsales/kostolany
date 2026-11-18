import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors } from '../../shared/theme/tokens';
import { ContentIllustration } from '../../shared/ui/ContentIllustration';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import type { FeedArticle } from '../feed/types';
import { ArticleLikeControl } from '../likes/ArticleLikeControl';

export function SearchByline({ name }: { name: string }) {
  return <View style={styles.byline}>
    <View aria-hidden style={styles.avatar}><Text allowFontScaling={false} style={styles.initial}>K</Text></View>
    <Text style={styles.source}>{name}</Text>
  </View>;
}

type SearchCardProps = { article: FeedArticle; first?: boolean; onSelect: (articleId: string) => void; footer?: ReactNode };

export function SearchCard({ article, first = false, onSelect, footer }: SearchCardProps) {
  const { fontScale } = useWindowDimensions();
  return (
    <View style={[styles.card, first && styles.firstCard]}>
      <Pressable role="button" accessibilityLabel={`${article.title}, ${article.sourceName}, ${article.publishedLabel}`}
        onPress={() => onSelect(article.id)} style={({ pressed }) => [pressed && styles.pressed]}>
        <SearchByline name={article.sourceName} />
        <View style={[styles.headline, fontScale > 1.3 && styles.stacked]}>
          <Text style={[styles.title, fontScale > 1.3 && styles.fullTitle]}>{article.title}</Text>
          {article.thumbnail !== null && <View style={styles.thumbnail}>
            <ContentIllustration variant={article.thumbnail} width={80} height={64} />
          </View>}
        </View>
        <Text style={styles.summary}>{article.summary}</Text>
        <Text style={styles.metadata}>{article.publishedLabel} · {article.readingMinutes}분 읽기</Text>
      </Pressable>
      <View style={styles.reaction}>
        <View style={styles.like}><ArticleLikeControl articleId={article.id} articleTitle={article.title} /></View>
        <View style={styles.bookmark}><ArticleBookmarkControl articleId={article.id} articleTitle={article.title} /></View>
      </View>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 32,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  firstCard: { paddingTop: 16 },
  reaction: { marginTop: 8, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 },
  like: { flex: 1 },
  bookmark: { maxWidth: '48%' },
  pressed: { opacity: 0.6 },
  byline: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 20, height: 20, borderRadius: 4, backgroundColor: colors.text, alignItems: 'center', justifyContent: 'center' },
  initial: { fontSize: 12, lineHeight: 16, color: colors.background, fontWeight: '700' },
  source: { fontSize: 13, lineHeight: 20, color: colors.text, flexShrink: 1 },
  headline: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, marginTop: 16 },
  stacked: { flexDirection: 'column' },
  title: { fontSize: 20, lineHeight: 26, fontWeight: '700', color: colors.text, flex: 1 },
  // 큰 글자의 세로 배치에서도 웹 flex 축약으로 제목 높이가 사라지지 않게 한다.
  fullTitle: { flexGrow: 0, flexShrink: 0, flexBasis: 'auto', width: '100%' },
  thumbnail: { width: 80, height: 54, overflow: 'hidden', justifyContent: 'center' },
  summary: { fontSize: 16, lineHeight: 23, color: colors.secondaryText, marginTop: 4 },
  metadata: { fontSize: 13, lineHeight: 20, color: colors.secondaryText, marginTop: 20 },
});
