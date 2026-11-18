import { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { LibrarySheet, listFormStyles } from './LibrarySheet';
import { MAX_LIST_NAME_LENGTH } from './listTypes';
import { useBookmarkStore, useUserLists } from './useBookmarks';
import { normalizeListName } from './validateListName';

export function ListEditorSheet({ listId, initialName = '', onClose, onSaved }: {
  listId?: string; initialName?: string; onClose: () => void; onSaved?: (listId: string) => void;
}) {
  const store = useBookmarkStore().userLists;
  const state = useUserLists();
  const [name, setName] = useState(initialName);
  const [submittedId, setSubmittedId] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const completed = useRef(false);
  const input = useRef<TextInput>(null);
  const entry = state.entries.find((entry) => entry.listId === (submittedId ?? listId));
  const pending = Boolean(submittedId && entry?.isPending);
  const validation = store.validateName(name, submittedId ?? listId);
  const title = listId ? '목록 이름 수정' : '새 목록 만들기';

  useEffect(() => {
    if (completed.current) return;
    if (submittedId && entry?.content && !entry.isPending && !entry.failure) {
      completed.current = true; onSaved?.(submittedId); onClose();
    } else if (listId && state.status === 'ready' && !entry?.content) {
      completed.current = true; onClose();
    }
  }, [entry, submittedId, listId, state.status, onClose, onSaved]);

  function handleSubmit(): void {
    if (pending) return;
    if (validation) { setError(validation); return; }
    const targetId = submittedId ?? listId;
    const result = targetId ? store.renameList(targetId, name) : store.createList(name);
    if (!result.ok) { setError(result.message); return; }
    Keyboard.dismiss(); setError(null); setSubmittedId(result.listId);
  }

  // 모달이 열린 뒤 입력에 포커스를 줘 닫을 때 원래 버튼으로 돌아갈 수 있게 한다.
  return <LibrarySheet title={title} onClose={onClose} onShow={() => input.current?.focus()}
    expanded closeLabel={pending ? '닫기' : '취소'}>
    <View style={styles.field}>
      <Text nativeID="list-name-label" style={listFormStyles.text}>목록 이름 · 필수</Text>
      <TextInput ref={input} accessibilityLabel="목록 이름" aria-labelledby="list-name-label"
        value={name} onChangeText={(value) => { setName(value); setError(null); }} editable={!pending}
        placeholder="이름을 입력해 주세요" style={styles.input} autoCorrect={false} autoCapitalize="none"
        returnKeyType="done" submitBehavior="blurAndSubmit" />
      <Text style={styles.counter}>{[...normalizeListName(name)].length} / {MAX_LIST_NAME_LENGTH}</Text>
    </View>
    <Text style={listFormStyles.secondary}>나만의 목록에 다시 읽고 싶은 기사를 모아보세요.</Text>
    {(error || (name.length > 0 && validation)) && <Text role="alert" style={listFormStyles.error}>{error ?? validation}</Text>}
    {entry?.failure && <Text role="alert" style={listFormStyles.error}>목록을 저장하지 못했어요. 입력한 이름을 확인하고 다시 시도해 주세요.</Text>}
    {pending && <Text aria-live="polite" style={listFormStyles.secondary}>저장 중이에요. 닫아도 저장은 계속돼요.</Text>}
    <Pressable role="button" accessibilityLabel={entry?.failure ? '목록 저장 다시 시도' : listId ? '목록 이름 저장' : '목록 만들기'}
      disabled={pending || Boolean(validation)} accessibilityState={{ disabled: pending || Boolean(validation), busy: pending }}
      onPress={handleSubmit} style={[listFormStyles.primary, (pending || Boolean(validation)) && listFormStyles.disabled]}>
      <Text style={listFormStyles.primaryText}>{pending ? '저장 중' : entry?.failure ? '다시 시도' : listId ? '저장' : '만들기'}</Text>
    </Pressable>
  </LibrarySheet>;
}

const styles = StyleSheet.create({
  field: { gap: 12 },
  input: { minHeight: 48, paddingHorizontal: 16, paddingVertical: 12, fontSize: 18, lineHeight: 28,
    backgroundColor: '#f2f2f2', borderRadius: 4, color: '#242424' },
  counter: { fontSize: 14, lineHeight: 22, color: '#6b6b6b', textAlign: 'right' },
});
