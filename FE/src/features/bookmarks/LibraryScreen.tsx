import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography } from '../../shared/theme/tokens';
import { LibraryListCard } from './LibraryListCard';
import { listFormStyles } from './LibrarySheet';
import { ListEditorSheet } from './ListEditorSheet';
import { DEFAULT_LIST_ID } from './listTypes';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useBookmarkStore, useReadingList, useUserLists } from './useBookmarks';
import { UserListFeedback } from './UserListFeedback';

export function LibraryScreen({ onOpenList }: { onOpenList: (listId: string) => void }) {
  const { state, retryReadingList, retryBookmark } = useReadingList();
  const custom = useUserLists();
  const store = useBookmarkStore();
  const [creating, setCreating] = useState(false);
  const lists = [...(state.status === 'ready' ? [{ listId: DEFAULT_LIST_ID, name: '읽기 목록', articles: state.articles }] : []),
    ...custom.entries.flatMap((entry) => entry.content ? [{ listId: entry.listId, name: entry.content.name,
      articles: store.articles.filter((article) => entry.content?.articleIds.includes(article.id)) }] : [])];
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <FlatList data={lists} keyExtractor={(list) => list.listId} contentContainerStyle={styles.content}
      ListHeaderComponent={<View>
        <View style={styles.header}>
          <Text role="heading" style={styles.title}>라이브러리</Text>
          <Pressable role="button" disabled={custom.status !== 'ready'} accessibilityState={{ disabled: custom.status !== 'ready' }}
            onPress={() => setCreating(true)} style={[listFormStyles.primary, custom.status !== 'ready' && listFormStyles.disabled]}>
            <Text style={listFormStyles.primaryText}>새 목록</Text>
          </Pressable>
        </View>
        <View style={styles.section}><Text style={styles.sectionLabel}>내 목록</Text></View>
        <ReadingListFeedback state={state} onRetry={retryReadingList} onRetryBookmark={retryBookmark} />
        <UserListFeedback />
      </View>}
      renderItem={({ item }) => <LibraryListCard {...item} onOpen={onOpenList} />} />
    {creating && <ListEditorSheet onClose={() => setCreating(false)} />}
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, width: '100%', maxWidth: 728, alignSelf: 'center', paddingBottom: 24 },
  header: { padding: 24, paddingBottom: 16, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',
    justifyContent: 'space-between', gap: 12 },
  title: { ...typography.pageTitle, color: colors.text },
  section: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border, paddingHorizontal: 24 },
  sectionLabel: { fontSize: 16, lineHeight: 24, color: colors.text, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: colors.text, alignSelf: 'flex-start' },
});
