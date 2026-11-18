import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors } from '../../shared/theme/tokens';
import { ContentIllustration } from '../../shared/ui/ContentIllustration';
import type { FeedArticle } from '../feed/types';

export function SearchByline({ name }: { name: string }) {
  return <View style={styles.byline}>
    <View aria-hidden style={styles.avatar}><Text allowFontScaling={false} style={styles.initial}>K</Text></View>
    <Text style={styles.source}>{name}</Text>
  </View>;
}

export function SearchCard({ article, first = false, onSelect }: { article: FeedArticle; first?: boolean; onSelect: (id: string) => void }) {
  const { fontScale } = useWindowDimensions();
  return (
    <Pressable role="button" accessibilityLabel={`${article.title}, ${article.sourceName}, ${article.publishedLabel}`}
      onPress={() => onSelect(article.id)} style={({ pressed }) => [styles.card, first && styles.firstCard, pressed && styles.pressed]}>
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
  );
}

const styles = StyleSheet.create({
  card: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 32,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  firstCard: { paddingTop: 16 },
  pressed: { opacity: 0.6 },
  byline: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: { width: 20, height: 20, borderRadius: 4, backgroundColor: colors.text, alignItems: 'center', justifyContent: 'center' },
  initial: { fontSize: 12, lineHeight: 16, color: colors.background, fontWeight: '700' },
  source: { fontSize: 13, lineHeight: 20, color: colors.text, flexShrink: 1 },
  headline: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, marginTop: 16 },
  stacked: { flexDirection: 'column' },
  title: { fontSize: 20, lineHeight: 26, fontWeight: '700', color: colors.text, flex: 1 },
  fullTitle: { flex: 0, width: '100%' },
  thumbnail: { width: 80, height: 54, overflow: 'hidden', justifyContent: 'center' },
  summary: { fontSize: 16, lineHeight: 23, color: colors.secondaryText, marginTop: 4 },
  metadata: { fontSize: 13, lineHeight: 20, color: colors.secondaryText, marginTop: 20 },
});
