import { useEffect, useRef, useState } from 'react';
import { Platform, Text, TextInput, View, type TextStyle } from 'react-native';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { changeBody, lines, segments, type EditorValue, type TextSelection, type BlockKind } from './editorModel';

export type RichBodyProps = { value: EditorValue; onChange: (value: EditorValue) => void; onSelect: (selection: TextSelection) => void;
  onFocus: () => void; onBlur: () => void; onComposing: (value: boolean) => void; focusRequest: number; dismissRequest: number;
  label?: string; minHeight?: number; isActive?: boolean };
export function RichBody({ value, onChange, onSelect, onFocus, onBlur, focusRequest, dismissRequest, label = '글 본문', minHeight = 300, isActive = true }: RichBodyProps) {
  const input = useRef<TextInput>(null); const previousRequest = useRef(focusRequest);
  const [contentHeight, setContentHeight] = useState(30); const { colors } = useTheme();
  const blockLines = lines(value.document);
  const isQuoteOnly = blockLines.every(line => line.kind === 'quote');
  const isCenteredOnly = blockLines.every(line => ['pullquote', 'divider'].includes(line.kind));
  useEffect(() => {
    if (previousRequest.current !== focusRequest) { previousRequest.current = focusRequest; if (isActive) input.current?.focus(); }
  }, [focusRequest, isActive]);
  useEffect(() => { if (dismissRequest) input.current?.blur(); }, [dismissRequest]);
  function getBlockStyle(kind: BlockKind): TextStyle {
    return { fontFamily: ['heading', 'subheading'].includes(kind) ? fonts.sans : kind === 'code' ? Platform.OS === 'ios' ? 'Menlo' : 'monospace' : fonts.serif,
      fontSize: kind === 'heading' ? 28 : 18,
      lineHeight: kind === 'heading' ? 36 : kind === 'subheading' ? 24 : 30,
      fontWeight: kind === 'heading' ? '700' : '400',
      fontStyle: ['quote', 'pullquote'].includes(kind) ? 'italic' : 'normal',
      // Android의 문단 정렬은 입력 전체에 적용되므로 혼합 문단의 정렬은 iOS에만 전달한다.
      textAlign: Platform.OS === 'ios' && ['pullquote', 'divider'].includes(kind) ? 'center' : undefined,
      letterSpacing: kind === 'divider' ? 6 : undefined,
      backgroundColor: kind === 'code' ? colors.surface : 'transparent',
      color: ['subheading', 'divider'].includes(kind) ? colors.secondaryText : colors.text };
  }
  return <View>
    {/* 인용선은 입력창의 최소 높이가 아니라 실제 본문 높이를 따르며 터치와 접근성 탐색을 가로채지 않는다. */}
    {isQuoteOnly && <View pointerEvents="none" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants"
      style={{ position: 'absolute', top: 0, left: -18, width: 3, height: contentHeight, backgroundColor: colors.text }} />}
    <TextInput ref={input} multiline accessibilityLabel={label}
    placeholderTextColor={colors.secondaryText} selection={value.selection} scrollEnabled={false} textAlignVertical="top"
    underlineColorAndroid="transparent" onFocus={onFocus} onBlur={onBlur}
    onChangeText={text => onChange(changeBody(value, text))}
    onSelectionChange={event => onSelect(event.nativeEvent.selection)}
    onContentSizeChange={event => setContentHeight(Math.max(30, event.nativeEvent.contentSize.height))}
    // 인용문만 있는 구간의 여백을 바꾸고 입력을 분할하지 않아 기존 선택 범위를 보존한다.
    style={[
      { height: Math.max(minHeight, contentHeight), minHeight, fontFamily: fonts.serif, fontSize: 18, lineHeight: 30, padding: 0, color: colors.text },
      isQuoteOnly && { paddingLeft: 27, marginLeft: -18 },
      isCenteredOnly && { textAlign: 'center' },
    ]}>
    <Text>{blockLines.map(line => <Text key={line.index} style={getBlockStyle(line.kind)}>
      {segments(value.document, line.start, line.end).map(part => <Text key={part.start} style={{
        fontWeight: part.formats.some(format => format.kind === 'bold') ? '700' : undefined,
        fontStyle: part.formats.some(format => format.kind === 'italic') ? 'italic' : undefined,
        color: part.mention || part.formats.some(format => format.kind === 'link') ? colors.green : undefined,
        textDecorationLine: part.formats.some(format => format.kind === 'link') ? 'underline' : 'none',
      }}>{part.text}</Text>)}{line.index < value.document.blocks.length - 1 ? '\n' : ''}
    </Text>)}</Text>
    </TextInput>
  </View>;
}
