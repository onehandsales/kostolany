import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { FormTextInput } from '../../shared/ui/FormTextInput';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfilePhotoMenu } from './ProfilePhotoMenu';
import { PronounsEditor } from './PronounsEditor';
import { useProfilePhotoSelection } from './useProfilePhotoSelection';
import type { ProfileStore } from './createProfileStore';
import { profileStyles as createStyles } from './profileStyles';
import {
  areProfileFieldsEqual,
  countProfileCharacters,
  normalizeProfileFields,
  validateProfileFields,
} from './profileValidation';
import type { Profile, ProfileFields } from './types';

type ProfileEditorSheetProps = { initialProfile: Profile; store: ProfileStore; onClose: () => void };

export function ProfileEditorSheet({ initialProfile, store, onClose }: ProfileEditorSheetProps) {
  const visual = useThemeStyles(createVisual);
  const styles = useThemeStyles(createStyles);
  const [child, setChild] = useState<'photo' | 'pronouns' | null>(null);
  const [fields, setFields] = useState<ProfileFields>(() => normalizeProfileFields(initialProfile));
  const [initialPhoto] = useState(initialProfile.photo);
  const photoButton = useRef<View>(null);
  const pronounsButton = useRef<View>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSaveError, setHasSaveError] = useState(false);
  const [pendingFields, setPendingFields] = useState<ProfileFields | null>(null);
  const [notice, setNotice] = useState('');
  const nameInput = useRef<TextInput>(null);
  const draftVersion = useRef(0);
  const submission = useRef(0);
  const pending = useRef<ProfileFields | null>(null);
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const isDuplicate =
    pendingFields !== null && areProfileFieldsEqual(pendingFields, normalizeProfileFields(fields));

  const change = <Key extends keyof ProfileFields>(key: Key, value: ProfileFields[Key]) => {
    draftVersion.current += 1;
    setFields((previous) => ({ ...previous, [key]: value }));
    setError(null);
    setNotice('');
  };
  const photoSelection = useProfilePhotoSelection(initialPhoto, photo => change('photo', photo));
  const openChild = (next: 'photo' | 'pronouns') => {
    // 자식 편집에 진입한 뒤 이전 저장 응답이 새 선택 화면을 닫지 않게 한다.
    draftVersion.current += 1;
    setChild(next);
  };
  const closeChild = () => {
    if (child === 'photo') photoSelection.cancel();
    const target = child === 'photo' ? photoButton : pronounsButton;
    setChild(null);
    requestAnimationFrame(() => target.current?.focus());
  };
  const save = async () => {
    const validation = validateProfileFields(fields);
    if (validation) {
      setError(validation);
      return;
    }
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

  return (
    <Modal
      transparent
      animationType="fade"
      accessibilityLabel="프로필 편집 창"
      onRequestClose={child ? closeChild : onClose}
      onShow={() => nameInput.current?.focus()}
    >
      <SafeAreaView style={styles.backdrop}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboard}>
          <View accessibilityViewIsModal aria-hidden={child === 'photo'} pointerEvents={child === 'photo' ? 'none' : 'auto'} style={[styles.sheet, visual.sheet]}>
            {child === 'pronouns' ? <PronounsEditor initial={fields.pronouns ?? []} onCancel={closeChild} onDone={values => { change('pronouns', values); closeChild(); }} /> : <>
            <View style={[styles.header, visual.header]}>
              <Pressable
                role="button"
                accessibilityLabel="프로필 편집 닫기"
                onPress={onClose}
                style={[styles.headerAction, visual.headerAction, visual.close]}
              >
                <AppIcon name="close" size={20} />
              </Pressable>
              <Text role="heading" style={[styles.editorTitle, visual.title]}>
                Edit profile
              </Text>
              <Pressable
                role="button"
                accessibilityLabel={hasSaveError ? '프로필 저장 다시 시도' : '프로필 저장'}
                disabled={isDuplicate}
                accessibilityState={{ disabled: isDuplicate, busy: pendingFields !== null }}
                onPress={() => {
                  void save();
                }}
                style={[styles.headerAction, visual.headerAction, visual.saveAction, isDuplicate && styles.disabled]}
              >
                <Text style={[styles.link, visual.save]}>
                  {hasSaveError ? 'Retry' : isDuplicate ? 'Saving…' : pendingFields ? 'Save again' : 'Save'}
                </Text>
              </Pressable>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[styles.page, visual.content]}
            >
              <View style={visual.photoRow}>
                <ProfileAvatar photo={fields.photo ?? null} size={56} />
                <Pressable
                  ref={photoButton}
                  role="button"
                  accessibilityLabel="프로필 사진 변경"
                  onPress={() => { Keyboard.dismiss(); openChild('photo'); }}
                  style={visual.updatePhoto}
                >
                  <Text style={visual.photoLink}>Update photo</Text>
                </Pressable>
              </View>
              <View style={visual.field}>
                <Text style={visual.label}>Name*</Text>
                <FormTextInput
                  ref={nameInput}
                  accessibilityLabel="이름 · 필수"
                  accessibilityHint="50자까지 입력할 수 있어요."
                  value={fields.name}
                  onChangeText={(value) => change('name', value)}
                  submitBehavior="blurAndSubmit"
                  returnKeyType="done"
                />
                <Text
                  style={[
                    styles.counter,
                    visual.counter,
                    countProfileCharacters(fields.name) > 50 && styles.error,
                  ]}
                >
                  {countProfileCharacters(fields.name)} / 50
                </Text>
              </View>
              <View style={visual.field}>
                <Text style={visual.label}>Pronouns</Text>
                <Pressable
                  ref={pronounsButton}
                  role="button"
                  accessibilityLabel="Add pronouns"
                  onPress={() => openChild('pronouns')}
                  style={visual.inputTarget}
                >
                  <View style={[visual.inputSurface, visual.pronouns]}>
                    {(fields.pronouns ?? []).map(value => <Text key={value} style={visual.pronoun}>{value}</Text>)}
                    <Text style={visual.placeholder}>Add...</Text>
                  </View>
                </Pressable>
                <Text style={[styles.counter, visual.counter]}>{fields.pronouns?.length ?? 0} / 4</Text>
              </View>
              <View style={visual.field}>
                <Text style={visual.label}>Short bio</Text>
                <FormTextInput
                  accessibilityLabel="짧은 소개"
                  accessibilityHint="선택 입력이며 160자까지 입력할 수 있어요."
                  value={fields.bio}
                  onChangeText={(value) => change('bio', value)}
                  multiline
                  numberOfLines={1}
                  submitBehavior="newline"
                />
                <Text
                  style={[
                    styles.counter,
                    visual.counter,
                    countProfileCharacters(fields.bio) > 160 && styles.error,
                  ]}
                >
                  {countProfileCharacters(fields.bio)} / 160
                </Text>
              </View>
              {error && (
                <Text role="alert" style={styles.error}>
                  {error}
                </Text>
              )}
              {!!notice && (
                <Text aria-live="polite" style={styles.secondary}>
                  {notice}
                </Text>
              )}
              <View
                accessibilityLabel="About Page information"
                style={visual.about}
              >
                <Text style={visual.label}>About Page</Text>
                <Text style={visual.aboutText}>
                  Visit medium.com/me/about from a desktop web browser to personalize your About Page and
                  paint more of a vivid portrait of yourself than your ‘Short bio.’
                </Text>
              </View>
              <View style={visual.localInfo}>
                <Text aria-live="polite" style={styles.secondary}>
                  {pendingFields
                    ? '저장 중에도 수정할 수 있어요. 추가 변경은 저장을 다시 눌러 주세요.'
                    : '이름은 필수이고 소개는 비워 둘 수 있어요. 조합형 이모지는 여러 글자로 셀 수 있어요.'}
                </Text>
                <Text style={styles.secondary}>
                  닫으면 아직 제출하지 않은 입력은 사라져요. 이미 제출한 저장은 계속돼요.
                </Text>
                <Pressable
                  role="button"
                  accessibilityLabel="프로필 편집 취소"
                  onPress={onClose}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>
            </ScrollView>
            </>}
          </View>
        </KeyboardAvoidingView>
        {child === 'photo' && <ProfilePhotoMenu busy={photoSelection.busy} error={photoSelection.error} onClose={closeChild} onSelect={origin => {
          void photoSelection.select(origin).then(selected => { if (selected && isMounted.current) { setChild(null); requestAnimationFrame(() => photoButton.current?.focus()); } });
        }} />}
      </SafeAreaView>
    </Modal>
  );
}

const createVisual = (colors: ThemeColors) => StyleSheet.create({
  sheet: { height: '98.7%', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  header: {
    minHeight: 54,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '600' },
  headerAction: { width: 72, paddingHorizontal: 0 },
  close: { alignItems: 'flex-start', paddingLeft: 10 },
  saveAction: { alignItems: 'flex-end', paddingRight: 24 },
  save: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20 },
  content: { gap: 8 },
  photoRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  updatePhoto: { minHeight: 48, justifyContent: 'center' },
  photoLink: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, textDecorationLine: 'underline', color: colors.text },
  field: { gap: 2 },
  label: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
  inputTarget: { minHeight: 48, justifyContent: 'center' },
  inputSurface: {
    minHeight: 38,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: colors.input,
    borderRadius: 4,
    justifyContent: 'center',
  },
  placeholder: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.secondaryText },
  pronouns: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  pronoun: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.text, backgroundColor: colors.background, paddingHorizontal: 6, borderRadius: 3 },
  counter: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20 },
  about: {
    marginTop: 34,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 36,
    gap: 8,
  },
  aboutText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText },
  localInfo: { marginTop: 120, gap: 16 },
});
