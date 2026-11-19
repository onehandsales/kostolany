import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { ActionMenu } from '../../shared/ui/ActionMenu';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { LibrarySheet, listFormStyles } from './LibrarySheet';
import { ListEditorSheet } from './ListEditorSheet';
import { useBookmarkStore, useUserLists } from './useBookmarks';

type ListActionsProps = { listId: string; name: string };

export function ListActions({ listId, name }: ListActionsProps) {
  const state = useUserLists();
  const selected = state.entries.find((entry) => entry.listId === listId && entry.content);
  return selected?.content ? (
    <ListActionControls listId={listId} name={name} isPrivate={selected.content.isPrivate ?? false} />
  ) : null;
}

function ListActionControls({
  listId,
  name,
  isPrivate,
}: {
  listId: string;
  name: string;
  isPrivate: boolean;
}) {
  const [mode, setMode] = useState<'rename' | 'delete' | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const store = useBookmarkStore().userLists;
  return (
    <>
      <ActionMenu
        label={`목록 관리, ${name}`}
        items={[
          { label: 'Edit list info', accessibilityLabel: '이름 수정', onPress: () => setMode('rename') },
          {
            label: isPrivate ? 'Make list public' : 'Make list private',
            onPress: () => {
              store.renameList(listId, name, { isPrivate: !isPrivate });
            },
          },
          { label: 'Reorder items', onPress: () => setNotice('Reorder items') },
          {
            label: 'Delete list',
            accessibilityLabel: '목록 삭제',
            destructive: true,
            onPress: () => setMode('delete'),
          },
        ]}
      />
      {mode === 'rename' && (
        <ListEditorSheet listId={listId} initialName={name} onClose={() => setMode(null)} />
      )}
      {mode === 'delete' && (
        <LibrarySheet
          title="Delete list"
          titleLabel="목록 삭제"
          closeText="×"
          onClose={() => setMode(null)}
          contentStyle={styles.content}
        >
          <Text style={styles.description}>
            Deleting this list will remove it from Your library. If others have saved this list, it will also
            be deleted and removed from their library. Deleting this list will not delete any stories in it.
          </Text>
          <Pressable
            role="button"
            accessibilityLabel="목록 삭제 확인"
            onPress={() => {
              store.deleteList(listId);
              setMode(null);
            }}
            style={[listFormStyles.primary, styles.danger]}
          >
            <Text style={listFormStyles.primaryText}>Delete</Text>
          </Pressable>
        </LibrarySheet>
      )}
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </>
  );
}
const styles = StyleSheet.create({
  content: { gap: 24, paddingTop: 0, paddingBottom: 16 },
  description: { fontSize: 14, lineHeight: 18, color: '#242424', textAlign: 'center' },
  local: { fontSize: 12, lineHeight: 18, color: '#6b6b6b', textAlign: 'center' },
  danger: { backgroundColor: '#c64848' },
});
