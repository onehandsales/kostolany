import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../shared/theme/tokens';
import { ContentIllustration } from '../../shared/ui/ContentIllustration';
import type { FeedArticle } from '../feed/types';
import { BookmarkIcon } from './BookmarkIcon';
import { ListActions } from './ListActions';
import { DEFAULT_LIST_ID } from './listTypes';

export function LibraryListCard({ listId, name, articles, onOpen }: {
  listId: string; name: string; articles: readonly FeedArticle[]; onOpen: (listId: string) => void;
}) {
  const thumbnails = articles.filter((article) => article.thumbnail !== null).slice(0, 3);
  return <View style={styles.card}>
    <Pressable role="button" accessibilityLabel={`${name} 열기, 저장한 기사 ${articles.length}개`}
      onPress={() => onOpen(listId)} style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
      <Text style={styles.owner}>나의 라이브러리</Text>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.count}>{articles.length ? `${articles.length}개의 기사` : '저장한 기사 없음'}</Text>
    </Pressable>
    <View style={styles.actions}>
      <BookmarkIcon saved={articles.length > 0} size={20} />
      {listId !== DEFAULT_LIST_ID && <ListActions listId={listId} name={name} />}
    </View>
    {thumbnails.length > 0 && <View aria-hidden style={styles.thumbnails}>
      {thumbnails.map((article) => article.thumbnail && <View key={article.id} style={styles.thumbnail}>
        <ContentIllustration variant={article.thumbnail} width="100%" height="100%" />
      </View>)}
    </View>}
  </View>;
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 24, marginTop: 24, borderWidth: 1, borderColor: colors.border,
    borderRadius: 4, overflow: 'hidden', backgroundColor: '#fafafa' },
  link: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 8, gap: 16 },
  owner: { fontSize: 16, lineHeight: 24, color: colors.secondaryText },
  title: { fontSize: 22, lineHeight: 30, fontWeight: '700', color: colors.text },
  count: { fontSize: 14, lineHeight: 22, color: colors.secondaryText },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, minHeight: 48, marginBottom: 8 },
  thumbnails: { flexDirection: 'row', height: 104, gap: 3 },
  thumbnail: { flex: 1, overflow: 'hidden' },
  pressed: { opacity: 0.6 },
});
