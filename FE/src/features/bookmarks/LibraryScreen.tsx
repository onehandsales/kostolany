import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography } from '../../shared/theme/tokens';
import { ContentIllustration } from '../../shared/ui/ContentIllustration';
import { BookmarkIcon } from './BookmarkIcon';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useReadingList } from './useBookmarks';

export function LibraryScreen({ onOpenReadingList }: { onOpenReadingList: () => void }) {
  const { state, retryReadingList, retryBookmark } = useReadingList();
  const thumbnails = state.articles.flatMap((article) => article.thumbnail === null ? [] : [article.thumbnail]).slice(0, 3);
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}><Text role="heading" style={styles.title}>라이브러리</Text></View>
      <View style={styles.section}><Text style={styles.sectionLabel}>내 목록</Text></View>
      <ReadingListFeedback state={state} onRetry={retryReadingList} onRetryBookmark={retryBookmark} />
      {state.status === 'ready' && <View style={styles.list}>
        <Pressable role="button" accessibilityLabel={`읽기 목록 열기, 저장한 기사 ${state.articles.length}개`}
          onPress={onOpenReadingList} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
          <View style={styles.cardContent}>
            <Text style={styles.owner}>나의 라이브러리</Text>
            <Text style={styles.cardTitle}>읽기 목록</Text>
            <View style={styles.metadata}>
              <Text style={styles.count}>{state.articles.length === 0 ? '저장한 기사 없음' : `${state.articles.length}개의 기사`}</Text>
              <BookmarkIcon saved={state.articles.length > 0} size={20} />
            </View>
          </View>
          {thumbnails.length > 0 && <View aria-hidden style={styles.thumbnails}>
            {thumbnails.map((variant, index) => <View key={index} style={styles.thumbnail}>
              <ContentIllustration variant={variant} width="100%" height="100%" />
            </View>)}
          </View>}
        </Pressable>
      </View>}
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, width: '100%', maxWidth: 728, alignSelf: 'center', paddingBottom: 24 },
  header: { padding: 24, paddingBottom: 16 },
  title: { ...typography.pageTitle, color: colors.text },
  section: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border, paddingHorizontal: 24 },
  sectionLabel: { fontSize: 16, lineHeight: 24, color: colors.text, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: colors.text, alignSelf: 'flex-start' },
  list: { paddingHorizontal: 24, paddingTop: 32 },
  card: { borderWidth: 1, borderColor: colors.border, borderRadius: 4, overflow: 'hidden', backgroundColor: '#fafafa' },
  cardContent: { padding: 24, gap: 16 },
  owner: { fontSize: 16, lineHeight: 24, color: colors.secondaryText },
  cardTitle: { fontSize: 22, lineHeight: 30, fontWeight: '700', color: colors.text },
  metadata: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginTop: 8 },
  count: { fontSize: 14, lineHeight: 22, color: colors.secondaryText },
  thumbnails: { flexDirection: 'row', height: 104, gap: 3 },
  thumbnail: { flex: 1, overflow: 'hidden' },
  pressed: { opacity: 0.6 },
});
