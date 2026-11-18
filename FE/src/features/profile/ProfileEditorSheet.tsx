import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ProfileStore } from './createProfileStore';
import { profileStyles as styles } from './profileStyles';
import { areProfileFieldsEqual, countProfileCharacters, normalizeProfileFields, validateProfileFields } from './profileValidation';
import type { Profile, ProfileFields } from './types';

type ProfileEditorSheetProps = { initialProfile: Profile; store: ProfileStore; onClose: () => void };

export function ProfileEditorSheet({ initialProfile, store, onClose }: ProfileEditorSheetProps) {
  const [fields, setFields] = useState<ProfileFields>({ name: initialProfile.name, bio: initialProfile.bio });
  const [error, setError] = useState<string | null>(null);
  const [hasSaveError, setHasSaveError] = useState(false);
  const [pendingFields, setPendingFields] = useState<ProfileFields | null>(null);
  const [notice, setNotice] = useState('');
  const nameInput = useRef<TextInput>(null);
  const draftVersion = useRef(0);
  const submission = useRef(0);
  const pending = useRef<ProfileFields | null>(null);
  const isMounted = useRef(true);
  useEffect(() => { isMounted.current = true; return () => { isMounted.current = false; }; }, []);
  const isDuplicate = pendingFields !== null && areProfileFieldsEqual(pendingFields, normalizeProfileFields(fields));

  const change = (key: keyof ProfileFields, value: string) => {
    draftVersion.current += 1;
    setFields((previous) => ({ ...previous, [key]: value }));
    setError(null);
    setNotice('');
  };
  const save = async () => {
    const validation = validateProfileFields(fields);
    if (validation) { setError(validation); return; }
    const normalized = normalizeProfileFields(fields);
    if (pending.current && areProfileFieldsEqual(pending.current, normalized)) return;
    const id = ++submission.current;
    const version = draftVersion.current;
    pending.current = normalized;
    setPendingFields(normalized);
    setHasSaveError(false);
    setError(null);
    setNotice('');
    const result = await store.save(normalized);
    if (!isMounted.current || id !== submission.current) return;
    pending.current = null;
    setPendingFields(null);
    if (result.status === 'failed') {
      setHasSaveError(true);
      setError('저장하지 못했어요. 입력은 그대로예요. 수정한 뒤 다시 시도할 수 있어요.');
    } else if (result.status === 'saved' && version === draftVersion.current) onClose();
    else setNotice('제출한 내용은 처리됐어요. 추가로 입력한 내용은 저장을 눌러 주세요.');
  };

  return <Modal transparent animationType="fade" accessibilityLabel="프로필 편집" onRequestClose={onClose}
    onShow={() => nameInput.current?.focus()}>
    <SafeAreaView style={styles.backdrop}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboard}>
        <View accessibilityViewIsModal style={styles.sheet}>
          <View style={styles.header}>
            <Pressable role="button" accessibilityLabel="프로필 편집 닫기" onPress={onClose} style={styles.headerAction}>
              <Text style={styles.buttonText}>닫기</Text>
            </Pressable>
            <Text role="heading" style={styles.editorTitle}>프로필 편집</Text>
            <Pressable role="button" accessibilityLabel={hasSaveError ? '프로필 저장 다시 시도' : '프로필 저장'}
              disabled={isDuplicate} accessibilityState={{ disabled: isDuplicate, busy: pendingFields !== null }}
              onPress={() => { void save(); }} style={[styles.headerAction, styles.saveAction, isDuplicate && styles.disabled]}>
              <Text style={styles.link}>{hasSaveError ? '다시 시도' : isDuplicate ? '저장 중' : pendingFields ? '추가 저장' : '저장'}</Text>
            </Pressable>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>
            <View style={styles.group}>
              <Text style={styles.label}>이름 *</Text>
              <TextInput ref={nameInput} accessibilityLabel="이름 · 필수" accessibilityHint="50자까지 입력할 수 있어요."
                value={fields.name} onChangeText={(value) => change('name', value)} style={styles.input}
                submitBehavior="blurAndSubmit" returnKeyType="done" />
              <Text style={[styles.counter, countProfileCharacters(fields.name) > 50 && styles.error]}>
                {countProfileCharacters(fields.name)} / 50
              </Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.label}>짧은 소개</Text>
              <TextInput accessibilityLabel="짧은 소개" accessibilityHint="선택 입력이며 160자까지 입력할 수 있어요."
                value={fields.bio} onChangeText={(value) => change('bio', value)} style={[styles.input, styles.bioInput]}
                multiline submitBehavior="newline" />
              <Text style={[styles.counter, countProfileCharacters(fields.bio) > 160 && styles.error]}>
                {countProfileCharacters(fields.bio)} / 160
              </Text>
            </View>
            {error && <Text role="alert" style={styles.error}>{error}</Text>}
            {!!notice && <Text aria-live="polite" style={styles.secondary}>{notice}</Text>}
            <Text aria-live="polite" style={styles.secondary}>{pendingFields
              ? '저장 중에도 수정할 수 있어요. 추가 변경은 저장을 다시 눌러 주세요.'
              : '이름은 필수이고 소개는 비워 둘 수 있어요. 조합형 이모지는 여러 글자로 셀 수 있어요.'}</Text>
            <Text style={styles.secondary}>닫으면 아직 제출하지 않은 입력은 사라져요. 이미 제출한 저장은 계속돼요.</Text>
            <Pressable role="button" accessibilityLabel="프로필 편집 취소" onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>취소</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </Modal>;
}
