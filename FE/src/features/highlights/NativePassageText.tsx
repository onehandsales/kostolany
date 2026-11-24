import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  BackHandler, Platform, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View,
  type StyleProp, type TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { HighlightSpans } from './HighlightedText';
import { passageAt, type SelectionDocument } from './selectionDocument';
import type { Highlight, Passage } from './types';

type NativePassageTextProps = {
  document: SelectionDocument;
  index: number;
  style?: StyleProp<TextStyle>;
  highlights: readonly Highlight[];
  otherHighlight?: string;
  initialHeightDp?: number;
  children: ReactNode;
  menu: ReactNode;
  initialSelection: { start: number; end: number };
  onSelect: (passage: Passage | null) => void;
  onClose: () => void;
};

// 원문 문단의 위치에서 OS 선택 범위를 받고 별도 편집 문서나 저장 상태를 만들지 않는다.
export function NativePassageText({
  document, index, style, highlights, otherHighlight, initialHeightDp,
  children, menu, initialSelection, onSelect, onClose,
}: NativePassageTextProps) {
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const block = document.blocks[index];
  const isActive = useRef(true);
  const close = useRef(onClose);
  useLayoutEffect(() => { close.current = onClose; }, [onClose]);
  const [contentHeightDp, setContentHeightDp] = useState(Math.max(48, initialHeightDp ?? 48));
  const [selection, setSelection] = useState(initialSelection);
  useEffect(() => {
    isActive.current = true;
    const back = BackHandler.addEventListener('hardwareBackPress', () => { close.current(); return true; });
    return () => { isActive.current = false; back.remove(); };
  }, []);
  function discardChangedText(text: string) {
    if (!block || text === block.text || !isActive.current) return;
    // 편집 이벤트가 발생하면 선택 입력을 닫아 원문과 강조를 함께 복원하고 뒤따르는 선택 이벤트를 버린다.
    isActive.current = false;
    onClose();
  }
  function selectLocalRange(range: { start: number; end: number }) {
    if (!block || !isActive.current) return;
    if (!Number.isSafeInteger(range.start) || !Number.isSafeInteger(range.end)
      || range.start < 0 || range.end < range.start || range.end > block.text.length) {
      onSelect(null); return;
    }
    setSelection(current => current.start === range.start && current.end === range.end ? current : range);
    onSelect(passageAt(document, block.start + range.start, block.start + range.end));
  }
  if (!block) return null;
  return <View>
    {/* 부모 영역 밖의 버튼은 native 터치를 받지 못하므로 범위 좌표 연결 전에는 본문 흐름 안에 메뉴를 둔다. */}
    {menu && <ScrollView keyboardShouldPersistTaps="always"
      style={{ maxHeight: Math.max(48, height - insets.top - insets.bottom - 16) }}>{menu}</ScrollView>}
    <TextInput accessibilityLabel="본문 안 문구 선택"
      accessibilityHint="선택 핸들로 범위를 조절한 뒤 선택 메뉴에서 행동을 선택하세요."
      autoFocus multiline readOnly={Platform.OS !== 'android'} showSoftInputOnFocus={false} contextMenuHidden
      autoCorrect={false} autoCapitalize="none" autoComplete="off" disableFullscreenUI
      scrollEnabled={false} underlineColorAndroid="transparent" selection={selection} selectionColor={colors.green}
      onContentSizeChange={event => setContentHeightDp(Math.max(48, event.nativeEvent.contentSize.height))}
      onChangeText={discardChangedText}
      onSelectionChange={event => selectLocalRange(event.nativeEvent.selection)}
      style={[style, styles.input, { color: colors.text, height: contentHeightDp }]}>
      <Text><HighlightSpans block={block} highlights={highlights} otherHighlight={otherHighlight} /></Text>
    </TextInput>
    {children}
  </View>;
}

const styles = StyleSheet.create({
  input: { minHeight: 48, padding: 0, textAlignVertical: 'top' },
});
