import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ContentStatus } from '../../shared/ui/ContentStatus';
import { listFormStyles } from './LibrarySheet';
import { useBookmarkStore, useUserLists } from './useBookmarks';

export function UserListFeedback({ listId, hideVisibleMembershipFailures = false }: {
  listId?: string; hideVisibleMembershipFailures?: boolean;
}) {
  const state = useUserLists();
  const store = useBookmarkStore().userLists;
  return <View>
    {state.isRefreshing && <ContentStatus message="내 목록을 불러오고 있어요" loading />}
    {state.hasReadError && <ContentStatus message="내 목록을 불러오지 못했어요" error
      actionLabel="내 목록 다시 시도" onAction={() => { void store.refreshLists(); }} />}
    {state.entries.filter((entry) => !listId || entry.listId === listId).filter((entry) => {
      const target = entry.failure?.target;
      return !(hideVisibleMembershipFailures && target && entry.content && target.name === entry.content.name
        && target.articleIds.length < entry.content.articleIds.length
        && target.articleIds.every((id) => entry.content?.articleIds.includes(id)));
    }).map((entry) => entry.failure
      ? <View key={entry.listId} style={styles.feedback}>
        <Text role="alert" style={listFormStyles.error}>{entry.failure.name} — {entry.failure.target === null
          ? '목록을 삭제하지 못해 복원했어요.' : '목록 변경을 저장하지 못했어요.'}</Text>
        <Pressable role="button" accessibilityLabel={`목록 변경 다시 시도, ${entry.failure.name}`}
          onPress={() => store.retryList(entry.listId)} style={listFormStyles.row}>
          <Text style={styles.retry}>다시 시도</Text>
        </Pressable>
      </View> : entry.isPending ? <Text key={entry.listId} aria-live="polite" style={styles.pending}>
        {entry.content ? `${entry.content.name} 변경 중` : '목록 삭제 중'}
      </Text> : null)}
  </View>;
}

const styles = StyleSheet.create({
  feedback: { marginHorizontal: 24, marginVertical: 8, padding: 16, backgroundColor: '#f7f7f7' },
  pending: { marginHorizontal: 24, marginVertical: 8, fontSize: 14, lineHeight: 22, color: '#6b6b6b' },
  retry: { fontSize: 14, lineHeight: 22, textDecorationLine: 'underline', color: '#242424' },
});
