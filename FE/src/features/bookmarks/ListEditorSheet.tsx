import { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View, type TextInput } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { FormTextInput } from '../../shared/ui/FormTextInput';

import { LibrarySheet, listFormStyles as createListFormStyles } from './LibrarySheet';
import { MAX_LIST_NAME_LENGTH } from './listTypes';
import { useBookmarkStore, useUserLists } from './useBookmarks';
import { normalizeListName } from './validateListName';

type ListEditorSheetProps = {
  listId?: string;
  initialName?: string;
  onClose: () => void;
  onSaved?: (listId: string) => void;
};

export function ListEditorSheet({
  listId,
  initialName = '',
  onClose,
  onSaved,
}: ListEditorSheetProps) {
  const styles = useThemeStyles(createStyles);
  const listFormStyles = useThemeStyles(createListFormStyles);
  const store = useBookmarkStore().userLists;
  const state = useUserLists();
  const initial = state.entries.find((item) => item.listId === listId)?.content;
  const [description, setDescription] = useState(initial?.description ?? '');
  const [isPrivate, setPrivate] = useState(initial?.isPrivate ?? false);
  const [name, setName] = useState(initialName);
  const [submittedId, setSubmittedId] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const completed = useRef(false);
  const input = useRef<TextInput>(null);
  const entry = state.entries.find((entry) => entry.listId === (submittedId ?? listId));
  const pending = Boolean(submittedId && entry?.isPending);
  const validation =
    store.validateName(name, submittedId ?? listId) ??
    ([...description.normalize('NFC')].length > 280 ? '설명은 280자 이내로 입력해 주세요.' : null);
  const title = listId ? '목록 이름 수정' : '새 목록 만들기';

  useEffect(() => {
    if (completed.current) return;
    if (submittedId && entry?.content && !entry.isPending && !entry.failure) {
      completed.current = true;
      onSaved?.(submittedId);
      onClose();
    } else if (listId && state.status === 'ready' && !entry?.content) {
      completed.current = true;
      onClose();
    }
  }, [entry, submittedId, listId, state.status, onClose, onSaved]);

  function handleSubmit(): void {
    if (pending) return;
    if (validation) {
      setError(validation);
      return;
    }
    const targetId = submittedId ?? listId;
    const result = targetId
      ? store.renameList(targetId, name, { description: description.normalize('NFC'), isPrivate })
      : store.createList(name, { description: description.normalize('NFC'), isPrivate });
    if (!result.ok) {
      setError(result.message);
      return;
    }
    Keyboard.dismiss();
    setError(null);
    setSubmittedId(result.listId);
  }

  // 모달이 열린 뒤 입력에 포커스를 줘 닫을 때 원래 버튼으로 돌아갈 수 있게 한다.
  return (
    <LibrarySheet
      title={listId ? 'Edit list info' : 'Create new list'}
      titleLabel={title}
      onClose={onClose}
      onShow={() => input.current?.focus()}
      expanded
      closeLabel={pending ? '닫기' : '취소'}
      closeText={pending ? 'Close' : 'Cancel'}
      contentStyle={styles.content}
    >
      <View style={styles.field}>
        <Text style={styles.label}>List name</Text>
        <FormTextInput
          ref={input}
          accessibilityLabel="목록 이름 · 필수"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setError(null);
          }}
          editable={!pending}
          placeholder="Add a name"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="done"
          submitBehavior="blurAndSubmit"
        />
        <Text style={styles.counter}>
          {[...normalizeListName(name)].length} / {MAX_LIST_NAME_LENGTH}
        </Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Description (optional)</Text>
        <FormTextInput
          accessibilityLabel="목록 설명"
          value={description}
          onChangeText={setDescription}
          editable={!pending}
          placeholder="Add a description"
          multiline
          numberOfLines={1}
        />
        <Text style={styles.counter}>{[...description.normalize('NFC')].length} / 280</Text>
      </View>
      <View style={styles.privacy}>
        <View style={styles.flex}>
          <Text style={styles.label}>Private</Text>
          <Text style={styles.hint}>Only you can see the list</Text>
        </View>
        <Pressable
          role="switch"
          accessibilityLabel="Private"
          aria-checked={isPrivate}
          aria-disabled={pending}
          accessibilityState={{ checked: isPrivate, disabled: pending }}
          disabled={pending}
          onPress={() => setPrivate(!isPrivate)}
          style={styles.switchTarget}
        >
          <View style={[styles.track, isPrivate && styles.privateTrack]}>
            <View style={[styles.thumb, isPrivate && styles.privateThumb]} />
          </View>
        </Pressable>
      </View>
      {(error || (name.length > 0 && validation)) && (
        <Text role="alert" style={listFormStyles.error}>
          {error ?? validation}
        </Text>
      )}
      {entry?.failure && (
        <Text role="alert" style={listFormStyles.error}>
          목록을 저장하지 못했어요. 입력한 이름을 확인하고 다시 시도해 주세요.
        </Text>
      )}
      {pending && (
        <Text aria-live="polite" style={listFormStyles.secondary}>
          저장 중이에요. 닫아도 저장은 계속돼요.
        </Text>
      )}
      <Pressable
        role="button"
        accessibilityLabel={
          entry?.failure ? '목록 저장 다시 시도' : listId ? '목록 이름 저장' : '목록 만들기'
        }
        disabled={pending || Boolean(validation)}
        accessibilityState={{ disabled: pending || Boolean(validation), busy: pending }}
        onPress={handleSubmit}
        style={[styles.submitTarget, (pending || Boolean(validation)) && listFormStyles.disabled]}
      >
        <View style={styles.submitSurface}>
          <Text style={styles.submitText}>
            {pending ? 'Saving…' : entry?.failure ? 'Retry' : listId ? 'Save' : 'Create'}
          </Text>
        </View>
      </Pressable>
    </LibrarySheet>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  content: { paddingTop: 24, gap: 19 },
  field: { gap: 2 },
  label: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
  counter: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText, textAlign: 'right' },
  submitTarget: { minHeight: 48, justifyContent: 'center' },
  submitSurface: { minHeight: 38, padding: 8, backgroundColor: colors.green, borderRadius: 24, justifyContent: 'center' },
  submitText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.onAccent, textAlign: 'center' },
  switchTarget: { minHeight: 48, minWidth: 52, justifyContent: 'center' },
  track: { width: 52, height: 32, borderRadius: 16, backgroundColor: colors.segment, padding: 2 },
  privateTrack: { backgroundColor: colors.green },
  thumb: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#ffffff' },
  privateThumb: { alignSelf: 'flex-end' },
  privacy: { flexDirection: 'row', alignItems: 'center', minHeight: 48, gap: 16, marginBottom: 4 },
  flex: { flex: 1 },
  hint: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.secondaryText },
});
