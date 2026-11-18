import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LibrarySheet, listFormStyles } from './LibrarySheet';
import { ListEditorSheet } from './ListEditorSheet';
import { DEFAULT_LIST_ID } from './listTypes';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useBookmarkStore, useReadingList, useUserLists } from './useBookmarks';
import { UserListFeedback } from './UserListFeedback';

export function SaveToListSheet({ articleId, articleTitle, onClose }: {
  articleId: string; articleTitle: string; onClose: () => void;
}) {
  const store = useBookmarkStore();
  const reading = useReadingList();
  const custom = useUserLists();
  const [changes, setChanges] = useState<Readonly<Record<string, boolean>>>({});
  const [creating, setCreating] = useState(false);
  const ready = reading.state.status === 'ready' && custom.status === 'ready';
  const lists = [{ listId: DEFAULT_LIST_ID, name: '읽기 목록', saved: store.readingList.getSnapshot(articleId).isSaved },
    ...custom.entries.flatMap((entry) => entry.content ? [{ listId: entry.listId,
      name: entry.content.name, saved: entry.content.articleIds.includes(articleId) }] : [])];

  function handleSave(): void {
    if (!ready) return;
    // 사용자가 직접 바꾼 행만 반영해 열린 시트의 과거 선택이 다른 화면의 변경을 지우지 않게 한다.
    for (const list of lists) {
      const changed = changes[list.listId];
      if (changed !== undefined) store.setArticleInList(list.listId, articleId, changed);
    }
    onClose();
  }

  if (creating) return <ListEditorSheet onClose={() => setCreating(false)}
    onSaved={(listId) => setChanges((previous) => ({ ...previous, [listId]: true }))} />;

  return <LibrarySheet title="저장할 목록" onClose={onClose}>
    <Text style={listFormStyles.secondary}>{articleTitle}</Text>
    <Pressable role="button" disabled={!ready} accessibilityState={{ disabled: !ready }}
      onPress={() => setCreating(true)} style={listFormStyles.row}>
      <Text style={styles.create}>새 목록 만들기</Text>
    </Pressable>
    {!ready && <>
      <ReadingListFeedback state={reading.state} onRetry={reading.retryReadingList} onRetryBookmark={reading.retryBookmark} />
      <UserListFeedback />
    </>}
    {ready && lists.map((list) => {
      const checked = changes[list.listId] ?? list.saved;
      return <Pressable key={list.listId} role="checkbox" accessibilityLabel={list.name} aria-checked={checked}
        onPress={() => setChanges((previous) => ({ ...previous, [list.listId]: !checked }))} style={styles.choice}>
        <View aria-hidden style={[styles.check, checked && styles.checked]}>
          <Text style={styles.checkText}>{checked ? '✓' : ''}</Text>
        </View>
        <Text style={styles.name}>{list.name}</Text>
      </Pressable>;
    })}
    <Pressable role="button" accessibilityLabel="저장할 목록 적용" onPress={handleSave} disabled={!ready}
      accessibilityState={{ disabled: !ready }} style={[listFormStyles.primary, !ready && listFormStyles.disabled]}>
      <Text style={listFormStyles.primaryText}>완료</Text>
    </Pressable>
  </LibrarySheet>;
}

const styles = StyleSheet.create({
  create: { fontSize: 16, lineHeight: 24, color: '#18820f' },
  choice: { minHeight: 56, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 16,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#e6e6e6' },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#6b6b6b',
    alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: '#18820f', borderColor: '#18820f' },
  checkText: { color: '#fff', fontSize: 16, lineHeight: 20 },
  name: { flex: 1, fontSize: 18, lineHeight: 28, color: '#242424' },
});
