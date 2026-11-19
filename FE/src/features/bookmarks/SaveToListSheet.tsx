import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';

import { LibrarySheet, listFormStyles } from './LibrarySheet';
import { ListEditorSheet } from './ListEditorSheet';
import { DEFAULT_LIST_ID } from './listTypes';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useBookmarkStore, useReadingList, useUserLists } from './useBookmarks';
import { UserListFeedback } from './UserListFeedback';

export function SaveToListSheet({
  articleId,
  articleTitle,
  onClose,
}: {
  articleId: string;
  articleTitle: string;
  onClose: () => void;
}) {
  const store = useBookmarkStore();
  const reading = useReadingList();
  const custom = useUserLists();
  const [changes, setChanges] = useState<Readonly<Record<string, boolean>>>({});
  const [creating, setCreating] = useState(false);
  const ready = reading.state.status === 'ready' && custom.status === 'ready';
  const lists = [
    { listId: DEFAULT_LIST_ID, name: '읽기 목록', saved: store.readingList.getSnapshot(articleId).isSaved },
    ...custom.entries.flatMap((entry) =>
      entry.content
        ? [
            {
              listId: entry.listId,
              name: entry.content.name,
              saved: entry.content.articleIds.includes(articleId),
            },
          ]
        : [],
    ),
  ];

  function handleSave(): void {
    if (!ready) return;
    // 사용자가 직접 바꾼 행만 반영해 열린 시트의 과거 선택이 다른 화면의 변경을 지우지 않게 한다.
    for (const list of lists) {
      const changed = changes[list.listId];
      if (changed !== undefined) store.setArticleInList(list.listId, articleId, changed);
    }
    onClose();
  }

  if (creating)
    return (
      <ListEditorSheet
        onClose={() => setCreating(false)}
        onSaved={(listId) => setChanges((previous) => ({ ...previous, [listId]: true }))}
      />
    );

  return (
    <LibrarySheet
      title="Save to"
      titleLabel="저장할 목록"
      onClose={onClose}
      hideClose
      contentStyle={styles.content}
    >
      <Pressable
        role="button"
        accessibilityLabel="새 목록 만들기"
        disabled={!ready}
        accessibilityState={{ disabled: !ready }}
        onPress={() => setCreating(true)}
        style={listFormStyles.row}
      >
        <Text style={styles.create}>Create new list...</Text>
      </Pressable>
      {!ready && (
        <>
          <ReadingListFeedback
            state={reading.state}
            onRetry={reading.retryReadingList}
            onRetryBookmark={reading.retryBookmark}
          />
          <UserListFeedback />
        </>
      )}
      {ready &&
        lists.map((list) => {
          const checked = changes[list.listId] ?? list.saved;
          return (
            <Pressable
              key={list.listId}
              role="checkbox"
              accessibilityLabel={list.name}
              aria-checked={checked}
              onPress={() => setChanges((previous) => ({ ...previous, [list.listId]: !checked }))}
              style={styles.choice}
            >
              <View aria-hidden style={[styles.check, checked && styles.checked]}>
                <Text style={styles.checkText}>{checked ? '✓' : ''}</Text>
              </View>
              <Text style={styles.name}>{list.listId === DEFAULT_LIST_ID ? 'Reading list' : list.name}</Text>
              {list.listId === DEFAULT_LIST_ID && <AppIcon name="lock" size={16} color="#aaaaaa" />}
            </Pressable>
          );
        })}
      <View style={styles.spacer} />
      <Pressable
        role="button"
        accessibilityLabel="저장할 목록 적용"
        accessibilityHint={articleTitle}
        onPress={handleSave}
        disabled={!ready}
        accessibilityState={{ disabled: !ready }}
        style={[styles.doneTarget, !ready && listFormStyles.disabled]}
      >
        <View style={styles.done}>
          <Text style={styles.doneText}>Done</Text>
        </View>
      </Pressable>
    </LibrarySheet>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 0, paddingBottom: 16, gap: 0, minHeight: 226 },
  create: { fontSize: 14, lineHeight: 20, color: '#438b2b' },
  choice: {
    minHeight: 48,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e6e6e6',
  },
  check: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#6b6b6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: '#438b2b', borderColor: '#438b2b' },
  checkText: { color: '#fff', fontSize: 14, lineHeight: 16 },
  name: { flex: 1, fontSize: 14, lineHeight: 20, color: '#242424' },
  spacer: { minHeight: 64 },
  doneTarget: { minHeight: 48, justifyContent: 'center' },
  done: {
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#438b2b',
    borderRadius: 24,
  },
  doneText: { color: colors.background, fontSize: 14, lineHeight: 20, padding: 8 },
});
