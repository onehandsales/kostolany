import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  AppState, BackHandler, Platform, StyleSheet, Text, TextInput, useWindowDimensions, View,
  type StyleProp, type TextStyle,
} from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { HighlightSpans, type PassageTextContent } from './HighlightedText';
import { NativeSelectionMenu } from './SelectionMenuHost';
import { selectionLinePosition, type MeasuredTextLine } from './selectionLinePosition';
import { passageAt, type SelectionDocument } from './selectionDocument';
import type { SelectionPosition } from './selectionBridge.types';
import type { Highlight, Passage } from './types';

type NativePassageTextProps = {
  document: SelectionDocument; index: number; style?: StyleProp<TextStyle>;
  highlights: readonly Highlight[]; otherHighlight?: string; initialHeightDp?: number;
  menu: ReactNode; initialSelection: { start: number; end: number };
  onSelect: (passage: Passage | null) => void; onClose: () => void; renderContent?: PassageTextContent;
};

// 원문 문단의 위치에서 OS 선택 범위를 받고 별도 편집 문서나 저장 상태를 만들지 않는다.
export function NativePassageText({
  document, index, style, highlights, otherHighlight, initialHeightDp,
  menu, initialSelection, onSelect, onClose, renderContent,
}: NativePassageTextProps) {
  const { colors } = useTheme();
  const dimensions = useWindowDimensions();
  const block = document.blocks[index];
  const root = useRef<View>(null);
  const isActive = useRef(true);
  const close = useRef(onClose);
  useLayoutEffect(() => { close.current = onClose; }, [onClose]);
  const [contentHeightDp, setContentHeightDp] = useState(Math.max(1,
    initialHeightDp ?? StyleSheet.flatten(style)?.lineHeight ?? 30));
  const [selection, setSelection] = useState(initialSelection);
  const [textLines, setTextLines] = useState<readonly MeasuredTextLine[]>([]);
  const [anchor, setAnchor] = useState<SelectionPosition | null>(null);
  useEffect(() => {
    isActive.current = true;
    const back = BackHandler.addEventListener('hardwareBackPress', () => { close.current(); return true; });
    const appState = AppState.addEventListener('change', next => { if (next !== 'active') close.current(); });
    return () => { isActive.current = false; back.remove(); appState.remove(); };
  }, []);
  useEffect(() => {
    if (!block) return;
    let alive = true;
    let measuring = false;
    const lines = selectionLinePosition(block.text, selection.start, selection.end, textLines);
    const measure = () => {
      if (measuring || !root.current) return;
      measuring = true;
      root.current.measureInWindow((x, y, width, height) => {
        measuring = false;
        if (!alive || !isActive.current || ![x, y, width, height].every(Number.isFinite) || width <= 0 || height <= 0) return;
        const next = lines ? { x: x + lines.x, y: y + lines.y, width: lines.width, height: lines.height }
          : { x, y, width, height };
        setAnchor(previous => previous?.x === next.x && previous.y === next.y
          && previous.width === next.width && previous.height === next.height ? previous : next);
      });
    };
    let timer: ReturnType<typeof setTimeout> | undefined;
    // 선택 중에만 스크롤에 따른 문단 이동을 추적하고 선택 해제 때 측정 예약을 끝낸다.
    const track = () => {
      if (!alive) return;
      measure();
      timer = setTimeout(track, 120);
    };
    track();
    return () => { alive = false; clearTimeout(timer); };
  }, [block, selection.start, selection.end, textLines, contentHeightDp,
    dimensions.width, dimensions.height, dimensions.fontScale]);

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
  return <View ref={root} collapsable={false}>
    <TextInput accessibilityLabel="본문 안 문구 선택"
      accessibilityHint="선택 핸들로 범위를 조절한 뒤 선택 메뉴에서 행동을 선택하세요."
      autoFocus multiline readOnly={Platform.OS !== 'android'} showSoftInputOnFocus={false} contextMenuHidden
      autoCorrect={false} autoCapitalize="none" autoComplete="off" disableFullscreenUI
      scrollEnabled={false} underlineColorAndroid="transparent" selection={selection} selectionColor={colors.green}
      onContentSizeChange={event => setContentHeightDp(Math.max(1, event.nativeEvent.contentSize.height))}
      onChangeText={discardChangedText} onSelectionChange={event => selectLocalRange(event.nativeEvent.selection)}
      style={[style, styles.input, { color: colors.text, height: contentHeightDp }]}>
      <Text><HighlightSpans block={block} highlights={highlights} otherHighlight={otherHighlight}
        renderContent={renderContent} interactive={false} /></Text>
    </TextInput>
    <View pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants"
      style={styles.measurement}>
      <Text style={[style, styles.measurementText]} onTextLayout={event => setTextLines(event.nativeEvent.lines)}>
        {renderContent ? renderContent(0, block.text.length, false) : block.text}
      </Text>
    </View>
    <NativeSelectionMenu anchor={anchor} onClose={onClose}>{menu}</NativeSelectionMenu>
  </View>;
}

const styles = StyleSheet.create({
  input: { padding: 0, textAlignVertical: 'top', includeFontPadding: false },
  measurement: { position: 'absolute', top: 0, left: 0, right: 0, opacity: 0 },
  measurementText: { padding: 0, includeFontPadding: false },
});
