import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { colors, sizes, typography } from '../../shared/theme/tokens';
import { SearchCard } from '../search/SearchCard';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useReadingList } from './useBookmarks';

export function ReadingListScreen({ onBack, onBrowseArticles, onSelectArticle }: {
  onBack: () => void; onBrowseArticles: () => void; onSelectArticle: (articleId: string) => void;
}) {
  const { state, retryReadingList, retryBookmark } = useReadingList();
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <View style={styles.header}>
      <Pressable role="button" accessibilityLabel="라이브러리로 돌아가기" onPress={onBack} style={styles.back}>
        <Svg width={24} height={24} viewBox="0 0 24 24" aria-hidden accessible={Platform.OS === 'web' ? undefined : false}>
          <Path d="M15 4 7 12 15 20" fill="none" stroke={colors.secondaryText} strokeWidth={2} />
        </Svg>
      </Pressable>
    </View>
    <FlatList accessibilityLabel="저장한 기사 목록" data={state.articles} keyExtractor={(article) => article.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={<View>
        <View style={styles.intro}>
          <Text style={styles.owner}>나의 라이브러리</Text>
          <Text role="heading" style={styles.title}>읽기 목록</Text>
          {state.status === 'ready' && <Text style={styles.count}>{state.articles.length}개의 기사</Text>}
        </View>
        <ReadingListFeedback state={state} onRetry={retryReadingList} onRetryBookmark={retryBookmark} showSavedFailures={false} />
      </View>}
      ListEmptyComponent={state.status === 'ready' ? <View style={styles.empty}>
        <Text style={styles.emptyTitle}>아직 저장한 기사가 없어요.</Text>
        <Text style={styles.emptyDescription}>다시 읽고 싶은 기사의 북마크를 눌러 이 목록에 모아보세요.</Text>
        <Pressable role="button" onPress={onBrowseArticles} style={({ pressed }) => [styles.browse, pressed && styles.pressed]}>
          <Text style={styles.browseText}>기사 둘러보기</Text>
        </Pressable>
      </View> : null}
      renderItem={({ item }) => <SearchCard article={item} onSelect={onSelectArticle} />} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { minHeight: 56, paddingHorizontal: 16 },
  back: { width: sizes.minimumTouchTarget, minHeight: sizes.minimumTouchTarget, alignItems: 'center', justifyContent: 'center' },
  content: { flexGrow: 1, width: '100%', maxWidth: 728, alignSelf: 'center', paddingBottom: 24 },
  intro: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 16, gap: 16,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  owner: { fontSize: 16, lineHeight: 24, color: colors.secondaryText },
  title: { ...typography.pageTitle, color: colors.text },
  count: { fontSize: 14, lineHeight: 22, color: colors.secondaryText },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32,
    paddingVertical: 64, gap: 16, backgroundColor: '#fafafa' },
  emptyTitle: { fontSize: 20, lineHeight: 28, fontWeight: '600', color: colors.text, textAlign: 'center' },
  emptyDescription: { fontSize: 16, lineHeight: 26, color: colors.secondaryText, textAlign: 'center' },
  browse: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget,
    backgroundColor: '#18820f', borderRadius: 28, marginTop: 16, paddingVertical: 12, paddingHorizontal: 32 },
  browseText: { fontSize: 16, lineHeight: 24, color: colors.background, textAlign: 'center' },
  pressed: { opacity: 0.6 },
});
