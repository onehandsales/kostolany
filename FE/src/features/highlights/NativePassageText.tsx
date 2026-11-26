import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  AppState, BackHandler, Platform, StyleSheet, Text, TextInput, useWindowDimensions, View,
  type GestureResponderEvent, type StyleProp, type TextStyle, type TextProps,
} from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { HighlightSpans, type PassageTextAction, type PassageTextContent } from './HighlightedText';
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
  selecting?: boolean;
  role?: TextProps['role'];
  actions?: readonly PassageTextAction[];
  onHighlight?: (highlight: Highlight, y: number) => void;
};

// 원문 문단의 위치에서 OS 선택 범위를 받고 별도 편집 문서나 저장 상태를 만들지 않는다.
export function NativePassageText({
  document, index, style, highlights, otherHighlight, initialHeightDp,
  menu, initialSelection, onSelect, onClose, renderContent, selecting = true, actions = [], onHighlight, role,
}: NativePassageTextProps) {
  const { colors } = useTheme();
  const dimensions = useWindowDimensions();
  const block = document.blocks[index];
  const root = useRef<View>(null);
  const input = useRef<TextInput>(null);
  const isActive = useRef(true);
  const acceptsSelection = useRef(selecting);
  const revision = useRef(0);
  const [inputRevision, setInputRevision] = useState(0);
  const nativeRange = useRef(initialSelection);
  const touch = useRef<{ startedAt: number; x: number; y: number; moved: boolean; selecting: boolean } | null>(null);
  const tapFrame = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const close = useRef(onClose);
  useLayoutEffect(() => { close.current = onClose; }, [onClose]);
  const [contentHeightDp, setContentHeightDp] = useState(Math.max(1,
    initialHeightDp ?? StyleSheet.flatten(style)?.lineHeight ?? 30));
  const [selection, setSelection] = useState(initialSelection);
  const [wasSelecting, setWasSelecting] = useState(selecting);
  if (wasSelecting !== selecting) {
    setWasSelecting(selecting);
    if (!selecting) setSelection({ start: 0, end: 0 });
  }
  const [textLines, setTextLines] = useState<readonly MeasuredTextLine[]>([]);
  const [anchor, setAnchor] = useState<SelectionPosition | null>(null);
  useEffect(() => {
    isActive.current = true;
    return () => { isActive.current = false; if (tapFrame.current !== null) cancelAnimationFrame(tapFrame.current); };
  }, []);
  useEffect(() => {
    if (!selecting) return;
    const back = BackHandler.addEventListener('hardwareBackPress', () => { close.current(); return true; });
    const appState = AppState.addEventListener('change', next => { if (next !== 'active') close.current(); });
    return () => { back.remove(); appState.remove(); };
  }, [selecting]);
  useEffect(() => {
    if (!selecting) {
      acceptsSelection.current = false;
      input.current?.blur();
    }
  }, [selecting]);
  useEffect(() => {
    if (!block || !selecting) return;
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
  }, [block, selecting, selection.start, selection.end, textLines, contentHeightDp,
    dimensions.width, dimensions.height, dimensions.fontScale]);

  function discardChangedText(text: string) {
    if (!block || text === block.text || !isActive.current) return;
    // 편집 이벤트가 발생하면 선택 입력을 닫아 원문과 강조를 함께 복원하고 뒤따르는 선택 이벤트를 버린다.
    acceptsSelection.current = false;
    revision.current += 1;
    setInputRevision(revision.current);
    setSelection({ start: 0, end: 0 });
    onClose();
  }
  function selectLocalRange(range: { start: number; end: number }) {
    if (!block || !isActive.current || inputRevision !== revision.current) return;
    if (!Number.isSafeInteger(range.start) || !Number.isSafeInteger(range.end)
      || range.start < 0 || range.end < range.start || range.end > block.text.length) {
      onSelect(null); return;
    }
    setSelection(current => current.start === range.start && current.end === range.end ? current : range);
    nativeRange.current = range;
    if (selecting && range.start === range.end) {
      acceptsSelection.current = false;
      onClose(); return;
    }
    if (acceptsSelection.current || selecting) onSelect(passageAt(document, block.start + range.start, block.start + range.end));
  }
  function startTouch(event: GestureResponderEvent) {
    // 선택 문단 안의 손잡이 조작을 바깥 터치로 처리하지 않는다.
    if (selecting) event.stopPropagation();
    acceptsSelection.current = true;
    if (tapFrame.current !== null) cancelAnimationFrame(tapFrame.current);
    touch.current = { startedAt: Date.now(), x: event.nativeEvent.pageX, y: event.nativeEvent.pageY, moved: false, selecting };
  }
  function moveTouch(event: GestureResponderEvent) {
    const gesture = touch.current;
    if (gesture && Math.hypot(event.nativeEvent.pageX - gesture.x, event.nativeEvent.pageY - gesture.y) > 8) gesture.moved = true;
  }
  function endTouch() {
    const gesture = touch.current; touch.current = null;
    if (!gesture || gesture.moved || gesture.selecting || Date.now() - gesture.startedAt >= 350) return;
    // Android 입력의 실제 커서 위치로 짧은 탭만 연결하고 길게 누르기와 드래그는 OS 선택에 맡긴다.
    tapFrame.current = requestAnimationFrame(() => {
      tapFrame.current = null;
      if (!isActive.current || inputRevision !== revision.current || nativeRange.current.start !== nativeRange.current.end) return;
      const offset = nativeRange.current.start;
      const highlight = block && highlights.find(value => value.start <= block.start + offset && value.end > block.start + offset);
      if (highlight && onHighlight) onHighlight(highlight, gesture.y);
      else actions.find(action => action.start <= offset && action.end > offset)?.onPress();
    });
  }
  if (!block) return null;
  const own = highlights.filter(value => value.start < block.end && value.end > block.start);
  const accessibleActions = [
    ...own.map((highlight, i) => ({ name: `highlight-${i}`, label: `내 하이라이트: ${block.text.slice(Math.max(0, highlight.start - block.start), highlight.end - block.start)}`,
      press: () => root.current?.measureInWindow((_x, y) => onHighlight?.(highlight, y)) })),
    ...actions.filter(action => !own.some(highlight => highlight.start <= block.start + action.start && highlight.end >= block.start + action.end))
      .map((action, i) => ({ name: `link-${i}`, label: action.label, press: action.onPress })),
  ];
  return <View ref={root} collapsable={false}>
    <TextInput key={inputRevision} ref={input} role={role} accessibilityLabel={selecting ? '본문 안 문구 선택' : block.text}
      accessibilityHint="선택 핸들로 범위를 조절한 뒤 선택 메뉴에서 행동을 선택하세요."
      accessibilityActions={selecting ? [{ name: 'dismissSelection', label: '문구 선택 해제' }] : accessibleActions.map(({ name, label }) => ({ name, label }))}
      onAccessibilityEscape={selecting ? onClose : undefined}
      onAccessibilityAction={event => {
        if (selecting && event.nativeEvent.actionName === 'dismissSelection') onClose();
        else accessibleActions.find(action => action.name === event.nativeEvent.actionName)?.press();
      }}
      autoFocus={selecting && Platform.OS !== 'android'} multiline readOnly={Platform.OS !== 'android'} showSoftInputOnFocus={false} contextMenuHidden={Platform.OS !== 'android'}
      caretHidden onFocus={() => { acceptsSelection.current = true; }}
      onTouchStart={startTouch} onTouchMove={moveTouch} onTouchEnd={endTouch} onTouchCancel={() => { touch.current = null; }}
      autoCorrect={false} autoCapitalize="none" autoComplete="off" disableFullscreenUI
      scrollEnabled={false} underlineColorAndroid="transparent" selection={selection} selectionColor={colors.green}
      onContentSizeChange={event => setContentHeightDp(Math.max(1, event.nativeEvent.contentSize.height))}
      onChangeText={discardChangedText} onSelectionChange={event => selectLocalRange(event.nativeEvent.selection)}
      style={[style, styles.input, { color: colors.text, height: contentHeightDp }]}>
      <Text><HighlightSpans block={block} highlights={highlights} otherHighlight={otherHighlight}
        renderContent={renderContent} interactive={!selecting} onHighlight={selecting ? undefined : onHighlight} /></Text>
    </TextInput>
    <View pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants"
      style={styles.measurement}>
      <Text style={[style, styles.measurementText]} onTextLayout={event => setTextLines(event.nativeEvent.lines)}>
        {renderContent ? renderContent(0, block.text.length, false) : block.text}
      </Text>
    </View>
    {selecting && <NativeSelectionMenu anchor={anchor} onClose={onClose}>{menu}</NativeSelectionMenu>}
  </View>;
}

const styles = StyleSheet.create({
  input: { padding: 0, textAlignVertical: 'top', includeFontPadding: false },
  measurement: { position: 'absolute', top: 0, left: 0, right: 0, opacity: 0 },
  measurementText: { padding: 0, includeFontPadding: false },
});
