import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { LibrarySheet, listFormStyles } from './LibrarySheet';
import { ListEditorSheet } from './ListEditorSheet';
import { useBookmarkStore, useUserLists } from './useBookmarks';

export function ListActions({ listId, name }: { listId: string; name: string }) {
  const state = useUserLists();
  const exists = state.entries.some((entry) => entry.listId === listId && entry.content);
  return exists ? <ListActionControls listId={listId} name={name} /> : null;
}

function ListActionControls({ listId, name }: { listId: string; name: string }) {
  const [mode, setMode] = useState<'menu' | 'rename' | 'delete' | null>(null);
  const store = useBookmarkStore().userLists;
  return <>
    <Pressable role="button" accessibilityLabel={`목록 관리, ${name}`} onPress={() => setMode('menu')} style={styles.more}>
      <Text aria-hidden style={styles.moreText}>⋯</Text>
    </Pressable>
    {mode === 'menu' && <LibrarySheet title="목록 관리" onClose={() => setMode(null)}>
      <Text style={listFormStyles.text}>{name}</Text>
      <Pressable role="button" onPress={() => setMode('rename')} style={listFormStyles.row}>
        <Text style={listFormStyles.text}>이름 수정</Text>
      </Pressable>
      <Pressable role="button" onPress={() => setMode('delete')} style={listFormStyles.row}>
        <Text style={styles.dangerText}>목록 삭제</Text>
      </Pressable>
    </LibrarySheet>}
    {mode === 'rename' && <ListEditorSheet listId={listId} initialName={name} onClose={() => setMode(null)} />}
    {mode === 'delete' && <LibrarySheet title="목록 삭제" onClose={() => setMode(null)}>
      <Text style={listFormStyles.text}>‘{name}’ 목록을 삭제할까요?</Text>
      <Text style={listFormStyles.text}>이 목록과 목록 안의 저장 표시만 제거돼요. 기사 원문과 좋아요, 다른 목록에 저장한 기사는 그대로 유지돼요.</Text>
      <Pressable role="button" accessibilityLabel="목록 삭제 확인" onPress={() => { store.deleteList(listId); setMode(null); }}
        style={[listFormStyles.primary, styles.danger]}>
        <Text style={listFormStyles.primaryText}>삭제</Text>
      </Pressable>
    </LibrarySheet>}
  </>;
}

const styles = StyleSheet.create({
  more: { minHeight: 48, minWidth: 48, alignItems: 'center', justifyContent: 'center' },
  moreText: { fontSize: 26, lineHeight: 32, color: '#6b6b6b' },
  danger: { backgroundColor: '#c64848' },
  dangerText: { fontSize: 16, lineHeight: 26, color: '#a52a2a' },
});
