import { useEffect } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { colors, sizes, typography } from '../../shared/theme/tokens';
import { SearchCard } from '../search/SearchCard';
import { ListActions } from './ListActions';
import { DEFAULT_LIST_ID } from './listTypes';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useBookmarkStore, useReadingList, useUserLists } from './useBookmarks';
import { UserListFeedback } from './UserListFeedback';

export function ReadingListScreen({ listId = DEFAULT_LIST_ID, onBack, onBrowseArticles, onSelectArticle }: {
  listId?: string;
  onBack: () => void; onBrowseArticles: () => void; onSelectArticle: (articleId: string) => void;
}) {
  const { state, retryReadingList, retryBookmark } = useReadingList();
  const custom = useUserLists();
  const store = useBookmarkStore();
  const isDefault = listId === DEFAULT_LIST_ID;
  const selected = custom.entries.find((entry) => entry.listId === listId);
  const articles = isDefault ? state.articles : store.articles.filter((article) => selected?.content?.articleIds.includes(article.id));
  const status = isDefault ? state.status : custom.status;
  const name = isDefault ? '읽기 목록' : selected?.content?.name ?? '';
  useEffect(() => {
    if (!isDefault && custom.status === 'ready' && !selected?.content) onBack();
  }, [isDefault, custom.status, selected?.content, onBack]);
  if (!isDefault && custom.status === 'ready' && !selected?.content) return null;
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <View style={styles.header}>
      <Pressable role="button" accessibilityLabel="라이브러리로 돌아가기" onPress={onBack} style={styles.back}>
        <Svg width={24} height={24} viewBox="0 0 24 24" aria-hidden accessible={Platform.OS === 'web' ? undefined : false}>
          <Path d="M15 4 7 12 15 20" fill="none" stroke={colors.secondaryText} strokeWidth={2} />
        </Svg>
      </Pressable>
      {!isDefault && <ListActions listId={listId} name={name} />}
    </View>
    <FlatList accessibilityLabel="저장한 기사 목록" data={articles} keyExtractor={(article) => article.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={<View>
        <View style={styles.intro}>
          <Text style={styles.owner}>나의 라이브러리</Text>
          <Text role="heading" style={styles.title}>{name}</Text>
          {status === 'ready' && <Text style={styles.count}>{articles.length}개의 기사</Text>}
        </View>
        {isDefault ? <ReadingListFeedback state={state} onRetry={retryReadingList}
          onRetryBookmark={retryBookmark} showSavedFailures={false} />
          : <UserListFeedback listId={listId} hideVisibleMembershipFailures />}
      </View>}
      ListEmptyComponent={status === 'ready' ? <View style={styles.empty}>
        <Text style={styles.emptyTitle}>아직 저장한 기사가 없어요.</Text>
        <Text style={styles.emptyDescription}>{isDefault ? '다시 읽고 싶은 기사의 북마크를 눌러 이 목록에 모아보세요.'
          : '기사의 저장할 목록 메뉴에서 이 목록을 선택해 보세요.'}</Text>
        <Pressable role="button" onPress={onBrowseArticles} style={({ pressed }) => [styles.browse, pressed && styles.pressed]}>
          <Text style={styles.browseText}>기사 둘러보기</Text>
        </Pressable>
      </View> : null}
      renderItem={({ item }) => <SearchCard article={item} onSelect={onSelectArticle}
        footer={<Pressable role="button" accessibilityLabel={`이 목록에서 제거, ${item.title}`}
          onPress={() => store.setArticleInList(listId, item.id, false)} style={styles.remove}>
          <Text style={styles.removeText}>이 목록에서 제거</Text>
        </Pressable>} />} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { minHeight: 56, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' },
  remove: { minHeight: 48, minWidth: 48, alignSelf: 'flex-end', justifyContent: 'center', marginTop: 8 },
  removeText: { fontSize: 14, lineHeight: 22, color: colors.secondaryText, textDecorationLine: 'underline' },
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
