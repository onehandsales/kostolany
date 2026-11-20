import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { FormTextInput } from '../../shared/ui/FormTextInput';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { RichDocumentBody } from './RichDocumentBody';
import { ImagePickerSheet } from './ImagePickerSheet';
import { createMockEditorImageSource, type EditorImageSource } from './imageSource';
import { useImageInsertion } from './useImageInsertion';
import { emptyEditor, insertDivider, safeLink, selectedLines, selectText, setBlock, toggleFormat, type BlockKind, type EditorValue } from './editorModel';

export function EditorDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const styles = useThemeStyles(createStyles);
  return <Modal transparent onRequestClose={onClose} animationType="none">
    <SafeAreaView role="dialog" accessibilityLabel={title} style={styles.backdrop} accessibilityViewIsModal>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.dialogAvoid}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.dialog}>
          <Text role="heading" style={styles.dialogTitle}>{title}</Text>{children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </Modal>;
}
export function EditorExitDialog({ onCancel, onDiscard }: { onCancel: () => void; onDiscard: () => void }) {
  const styles = useThemeStyles(createStyles);
  return <EditorDialog title="작성 중인 내용을 버릴까요?" onClose={onCancel}>
    <Text style={styles.dialogText}>현재 내용은 이 화면에만 있어요. 나가면 저장되지 않아요.</Text>
    <Pressable role="button" accessibilityLabel="계속 작성" style={styles.action} onPress={onCancel}><Text style={styles.green}>Keep writing</Text></Pressable>
    <Pressable role="button" accessibilityLabel="내용 버리고 닫기" style={styles.action} onPress={onDiscard}><Text style={styles.danger}>Discard</Text></Pressable>
  </EditorDialog>;
}
export function StoryEditorScreen({ onClose, onDirtyChange, imageSource }: { onClose: () => void; onDirtyChange: (dirty: boolean) => void; imageSource?: EditorImageSource }) {
  const styles = useThemeStyles(createStyles); const { colors } = useTheme();
  const [value, setValue] = useState(emptyEditor);
  const [defaultImages] = useState(createMockEditorImageSource);
  const images = imageSource ?? defaultImages;
  const insertion = useImageInsertion(value, images, setValue);
  const [imagePicker, setImagePicker] = useState(false);
  const [titleHeight, setTitleHeight] = useState(48);
  const [bodyTarget, setBodyTarget] = useState(false); const [focused, setFocused] = useState(false);
  const [composing, setComposing] = useState(false); const [focusRequest, requestFocus] = useState(0);
  const [dismissRequest, requestDismiss] = useState(0);
  const [link, setLink] = useState<{ url: string; value: EditorValue } | null>(null);
  const wasLinkOpen = useRef(false);
  const [error, setError] = useState<string | null>(null); const [notice, setNotice] = useState<string | null>(null);
  const dirty = Boolean(value.document.title || value.document.body);
  useEffect(() => onDirtyChange(dirty), [dirty, onDirtyChange]);
  useEffect(() => {
    if (link) { wasLinkOpen.current = true; return; }
    if (!wasLinkOpen.current) return;
    wasLinkOpen.current = false;
    // 모달을 닫은 Escape가 복구한 본문의 포커스까지 해제하지 않도록 다음 프레임에 복원한다.
    const frame = requestAnimationFrame(() => requestFocus(current => current + 1));
    return () => cancelAnimationFrame(frame);
  }, [link]);
  const selected = selectedLines(value); const block = selected[0]?.kind ?? 'paragraph';
  const enabled = bodyTarget && !composing;
  function apply(next: EditorValue) { setValue(next); if (!link) requestFocus(current => current + 1); }
  function cycle(kinds: BlockKind[]) { const index = kinds.indexOf(block); apply(setBlock(value, kinds[index < 0 ? 1 : (index + 1) % kinds.length]!)); }
  function closeLink() { setLink(null); setError(null); }
  function saveLink() {
    if (!link) return; const url = safeLink(link.url);
    if (!url) { setError('http 또는 https 주소를 입력해 주세요.'); return; }
    const old = link.value.typing.find(format => format.kind === 'link');
    const withoutOld = old ? toggleFormat(link.value, old) : link.value;
    apply(toggleFormat(withoutOld, { kind: 'link', url })); closeLink();
  }
  const tool = (label: string, text: string, onPress: () => void, active = false, disabled = !enabled) => {
    const selected = bodyTarget ? active : label === '헤더 서식';
    return <Pressable key={label} role="button" accessibilityLabel={label} aria-pressed={selected} accessibilityState={{ selected, disabled }} disabled={disabled}
      onPressIn={event => event.preventDefault()} onPress={onPress} style={styles.tool}>
      <Text style={[styles.toolText, selected && styles.green, disabled && styles.dim]}>{text}</Text>
    </Pressable>;
  };
  return <SafeAreaView style={styles.screen}>
    <View style={styles.header}>
      <Pressable role="button" accessibilityLabel="편집기 닫기" style={styles.headerAction} onPress={onClose}><Text style={styles.headerText}>Close</Text></Pressable>
      <View style={styles.headerRight}>
        <Pressable role="button" accessibilityLabel="편집기 더보기" style={styles.tool} onPress={() => setNotice('Draft options')}><Text style={styles.toolText}>···</Text></Pressable>
        <Pressable role="button" accessibilityLabel="Next" style={styles.headerAction} onPress={() => setNotice('Story preview')}><Text style={styles.green}>Next</Text></Pressable>
      </View>
    </View>
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.flex} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive" contentContainerStyle={styles.content}>
        <TextInput multiline autoFocus accessibilityLabel="글 제목" placeholderTextColor={colors.secondaryText}
          value={value.document.title} onChangeText={title => setValue(current => ({ ...current, document: { ...current.document, title, version: current.document.version + 1 } }))}
          onContentSizeChange={event => setTitleHeight(Math.max(48, event.nativeEvent.contentSize.height))} scrollEnabled={false}
          onFocus={() => { setBodyTarget(false); setFocused(false); }} style={[styles.title, { height: titleHeight }]} />
        <RichDocumentBody source={images} value={value} onChange={setValue} onSelect={selection => setValue(current => selectText(current, selection))}
          onFocus={() => { setBodyTarget(true); setFocused(true); }} onBlur={() => setFocused(false)} onComposing={setComposing} focusRequest={focusRequest} dismissRequest={dismissRequest} />
        {insertion.pending && <View style={{ borderWidth: 3, borderColor: colors.green, marginVertical: 24 }}>
          <Image source={images.resolve(insertion.pending.asset.assetId)} accessibilityLabel={insertion.pending.asset.description}
            style={{ width: '100%', height: 'auto', aspectRatio: insertion.pending.asset.width / insertion.pending.asset.height, opacity: 0.4 }} />
          <Pressable role="button" accessibilityLabel="이미지 삽입 취소" style={[styles.tool, { position: 'absolute', right: 0, top: 0 }]} onPress={insertion.cancel}><Text style={styles.toolText}>×</Text></Pressable>
          {insertion.pending.status === 'loading' ? <ActivityIndicator accessibilityLabel="이미지 삽입 중" /> : <>
            <Text role="alert" style={styles.danger}>이미지를 삽입하지 못했어요.</Text>
            <Pressable role="button" accessibilityLabel="이미지 삽입 다시 시도" onPress={insertion.retry} style={styles.action}><Text style={styles.green}>Try again</Text></Pressable>
          </>}
        </View>}
      </ScrollView>
      {bodyTarget && (focused || value.selection.start !== value.selection.end) && <View style={styles.inlineTools}>
        {tool('굵게', 'B', () => apply(toggleFormat(value, { kind: 'bold' })), value.typing.some(format => format.kind === 'bold'))}
        {tool('기울임', 'I', () => apply(toggleFormat(value, { kind: 'italic' })), value.typing.some(format => format.kind === 'italic'))}
        {tool('링크', '↗', () => { setError(null); setLink({ url: value.typing.find(format => format.kind === 'link')?.url ?? '', value }); }, value.typing.some(format => format.kind === 'link'), !enabled || value.selection.start === value.selection.end)}
        {tool('키보드 닫기', '⌄', () => { Keyboard.dismiss(); requestDismiss(current => current + 1); setFocused(false); }, false, false)}
      </View>}
      <ScrollView horizontal keyboardShouldPersistTaps="always" showsHorizontalScrollIndicator={false} style={styles.toolbar} contentContainerStyle={styles.tools}>
        {tool('헤더 서식', 'Tᴛ', () => cycle(['paragraph', 'heading', 'subheading']), ['heading', 'subheading'].includes(block))}
        {tool('인용 서식', '❝', () => cycle(['paragraph', 'quote', 'pullquote']), ['quote', 'pullquote'].includes(block))}
        {tool('목록 서식', '☷', () => cycle(['paragraph', 'bullet', 'numbered']), ['bullet', 'numbered'].includes(block))}
        {tool('구분선 삽입', '⋯', () => apply(insertDivider(value)))}
        {tool('멘션 안내', '@', () => setNotice('Mentions'), false, false)}
        {tool('코드 블록', '{}', () => apply(setBlock(value, block === 'code' ? 'paragraph' : 'code')), block === 'code')}
        {tool('이미지 삽입', '▧', () => { Keyboard.dismiss(); requestDismiss(current => current + 1); setFocused(false); insertion.cancel(); setImagePicker(true); }, false, composing)}
      </ScrollView>
    </KeyboardAvoidingView>
    {link && <EditorDialog title="링크" onClose={closeLink}>
      <FormTextInput autoFocus accessibilityLabel="링크 주소" value={link.url} onChangeText={url => setLink(current => current && { ...current, url })}
        autoCapitalize="none" autoCorrect={false} keyboardType="url" returnKeyType="done" onSubmitEditing={saveLink} style={styles.url} placeholder="https://example.com" placeholderTextColor={colors.secondaryText} />
      {error && <Text role="alert" style={styles.danger}>{error}</Text>}
      <View style={styles.linkActions}>
        <Pressable role="button" accessibilityLabel="링크 취소" onPress={closeLink} style={styles.action}><Text style={styles.dialogText}>Cancel</Text></Pressable>
        <Pressable role="button" accessibilityLabel="링크 적용" onPress={saveLink} style={styles.action}><Text style={styles.green}>Done</Text></Pressable>
      </View>
      {link.value.typing.some(format => format.kind === 'link') && <Pressable role="button" accessibilityLabel="링크 제거" style={styles.action} onPress={() => {
        apply(toggleFormat(link.value, link.value.typing.find(format => format.kind === 'link')!)); closeLink();
      }}><Text style={styles.dialogText}>Remove link</Text></Pressable>}
    </EditorDialog>}
    <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    {imagePicker && <ImagePickerSheet source={images} onClose={() => setImagePicker(false)} onSelect={(asset, origin) => {
      setImagePicker(false); insertion.select(asset, origin);
    }} />}
  </SafeAreaView>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, flex: { flex: 1, minHeight: 0 },
  header: { minHeight: 48, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  headerRight: { flexDirection: 'row' }, headerAction: { minHeight: 48, minWidth: 48, justifyContent: 'center', alignItems: 'center' },
  headerText: { fontFamily: fonts.sans, fontSize: 14, color: colors.text }, green: { color: colors.green, fontFamily: fonts.sans, fontSize: 16 },
  content: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 30 },
  title: { fontFamily: fonts.sans, fontSize: 32, lineHeight: 38, fontWeight: '700', color: colors.text, padding: 0, marginBottom: 11, minHeight: 48, outlineStyle: 'solid', outlineWidth: 0 },
  toolbar: { flexGrow: 0, flexShrink: 0, height: 50, minHeight: 50, borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border }, tools: { paddingHorizontal: 9, minHeight: 48, alignItems: 'center' },
  tool: { minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center' }, toolText: { fontFamily: fonts.sans, fontSize: 20, color: colors.secondaryText }, dim: { opacity: 0.45 },
  inlineTools: { flexDirection: 'row', flexShrink: 0, justifyContent: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  backdrop: { flex: 1, backgroundColor: '#00000044', justifyContent: 'center', padding: 24 }, dialogAvoid: { maxHeight: '90%', width: '100%', maxWidth: 480, alignSelf: 'center' },
  dialog: { padding: 24, backgroundColor: colors.background, gap: 16, borderRadius: 12 }, dialogTitle: { fontFamily: fonts.sans, fontSize: 22, color: colors.text, fontWeight: '600' },
  dialogText: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24, color: colors.text }, action: { minHeight: 48, minWidth: 48, justifyContent: 'center', alignItems: 'center' },
  danger: { color: colors.destructive, fontSize: 16, lineHeight: 24 }, url: { minHeight: 48, padding: 12, fontSize: 16, color: colors.text, borderWidth: 1, borderColor: colors.border }, linkActions: { flexDirection: 'row', justifyContent: 'space-between' },
});
