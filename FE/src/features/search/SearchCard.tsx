import type { ReactNode } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ImageSourcePropType,
} from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { ContentIllustration } from '../../shared/ui/ContentIllustration';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import type { FeedArticle } from '../feed/types';
import { ReferenceArticleCard } from '../feed/components/ReferenceArticleCard';
import { ArticleLikeControl } from '../likes/ArticleLikeControl';

type SearchBylineProps = { name: string; avatar?: ImageSourcePropType; emphasized?: boolean; verified?: boolean };

export function SearchByline({ name, avatar, emphasized = false, verified = false }: SearchBylineProps) {
  const styles = useThemeStyles(createStyles);
  const publication = /^In (.+) by (.+)$/.exec(name);
  return (
    <View style={styles.byline}>
      {avatar ? (
        <Image source={avatar} style={[styles.photo, publication && styles.publication]} accessible={false} />
      ) : (
        <View aria-hidden style={styles.avatar}>
          <Text style={styles.initial}>K</Text>
        </View>
      )}
      <Text style={styles.source} accessibilityLabel={verified ? `${name}, Verified` : undefined}>
        {emphasized && publication ? (
          <>In <Text style={styles.emphasis}>{publication[1]}</Text> by <Text style={styles.emphasis}>{publication[2]}</Text></>
        ) : <Text style={emphasized && styles.emphasis}>{name}</Text>}
      </Text>
      {verified && <AppIcon name="verified" size={14} />}
    </View>
  );
}

type SearchCardProps = {
  article: FeedArticle;
  first?: boolean;
  onSelect: (articleId: string) => void;
  footer?: ReactNode;
};

export function SearchCard({ article, first = false, onSelect, footer }: SearchCardProps) {
  const styles = useThemeStyles(createStyles);
  const { fontScale } = useWindowDimensions();
  if (article.reference)
    return (
      <View>
        <ReferenceArticleCard article={article} onSelect={onSelect} variant="search" first={first} />
        {footer}
      </View>
    );
  return (
    <View style={[styles.card, first && styles.firstCard]}>
      <Pressable
        role="button"
        accessibilityLabel={`${article.title}, ${article.sourceName}, ${article.publishedLabel}`}
        onPress={() => onSelect(article.id)}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <SearchByline name={article.sourceName} />
        <View style={[styles.headline, fontScale > 1.3 && styles.stacked]}>
          <Text style={[styles.title, fontScale > 1.3 && styles.fullTitle]}>{article.title}</Text>
          {article.thumbnail !== null && (
            <View style={styles.thumbnail}>
              <ContentIllustration variant={article.thumbnail} width={80} height={64} />
            </View>
          )}
        </View>
        <Text style={styles.summary}>{article.summary}</Text>
        <Text style={styles.metadata}>
          {article.publishedLabel} · {article.readingMinutes}분 읽기
        </Text>
      </Pressable>
      <View style={styles.reaction}>
        <View style={styles.like}>
          <ArticleLikeControl articleId={article.id} articleTitle={article.title} />
        </View>
        <View style={styles.bookmark}>
          <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} />
        </View>
      </View>
      {footer}
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  firstCard: { paddingTop: 16 },
  reaction: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  like: { flex: 1 },
  bookmark: { maxWidth: '48%' },
  pressed: { opacity: 0.6 },
  byline: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: { width: 20, height: 20, borderRadius: 10 },
  publication: { borderRadius: 2 },
  emphasis: { fontWeight: '600' },
  initial: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 16, color: colors.onInverse, fontWeight: '700' },
  source: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.text, flexShrink: 1 },
  headline: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, marginTop: 16 },
  stacked: { flexDirection: 'column' },
  title: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 26, fontWeight: '700', color: colors.text, flex: 1 },
  // 큰 글자의 세로 배치에서도 웹 flex 축약으로 제목 높이가 사라지지 않게 한다.
  fullTitle: { flexGrow: 0, flexShrink: 0, flexBasis: 'auto', width: '100%' },
  thumbnail: { width: 80, height: 54, overflow: 'hidden', justifyContent: 'center' },
  summary: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 23, color: colors.secondaryText, marginTop: 4 },
  metadata: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText, marginTop: 20 },
});
