import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { passageAt, type SelectionDocument } from './selectionDocument';
import type { Passage } from './types';

export function NativePassagePicker({ document, onSelect, onClose }: { document: SelectionDocument; onSelect: (passage: Passage) => void; onClose: () => void }) {
  const { colors } = useTheme();
  const input = useRef<TextInput>(null);
  const restoration = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const restoring = useRef(false);
  useEffect(() => () => { if (restoration.current !== null) cancelAnimationFrame(restoration.current); }, []);
  const [selection, setSelection] = useState<Passage | null>(null);
  return <Modal animationType="slide" onRequestClose={onClose}>
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}><IconButton icon="close" label="문구 선택 취소" onPress={onClose} /><Text role="heading" style={{ color: colors.text }}>Select a passage</Text></View>
      <Text style={[styles.hint, { color: colors.secondaryText }]}>길게 눌러 범위를 선택한 뒤 Done을 눌러 주세요.</Text>
      <TextInput ref={input} accessibilityLabel="선택할 원문" multiline readOnly={Platform.OS !== 'android'} showSoftInputOnFocus={false} value={document.text}
        autoCorrect={false} autoCapitalize="none" onChangeText={() => {
          // Android의 읽기 전용은 입력 전체를 비활성화하므로 선택은 허용하고 편집 이벤트만 원문으로 복구한다.
          restoring.current = true; setSelection(null); input.current?.setNativeProps({ text: document.text });
          if (restoration.current !== null) cancelAnimationFrame(restoration.current);
          restoration.current = requestAnimationFrame(() => { restoring.current = false; restoration.current = null; });
        }}
        selectionColor={colors.green} onSelectionChange={event => { if (!restoring.current) setSelection(passageAt(document, event.nativeEvent.selection.start, event.nativeEvent.selection.end)); }}
        style={[styles.text, { color: colors.text }]} />
      <Pressable role="button" accessibilityLabel="문구 선택 Done" disabled={!selection} accessibilityState={{ disabled: !selection }}
        style={styles.done} onPress={() => { if (selection) onSelect(selection); }}><Text style={{ color: selection ? colors.green : colors.secondaryText }}>Done</Text></Pressable>
    </SafeAreaView>
  </Modal>;
}
const styles = StyleSheet.create({ header: { flexDirection: 'row', alignItems: 'center', minHeight: 48 },
  hint: { padding: 24 }, text: { flex: 1, marginHorizontal: 24, fontFamily: fonts.serif, fontSize: 20, lineHeight: 30, textAlignVertical: 'top' },
  done: { minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center' } });
