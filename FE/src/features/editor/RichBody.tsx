import { useEffect, useRef, useState } from 'react';
import { Platform, Text, TextInput, type TextStyle } from 'react-native';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { changeBody, lines, segments, type EditorValue, type TextSelection, type BlockKind } from './editorModel';

export type RichBodyProps = { value: EditorValue; onChange: (value: EditorValue) => void; onSelect: (selection: TextSelection) => void;
  onFocus: () => void; onBlur: () => void; onComposing: (value: boolean) => void; focusRequest: number; dismissRequest: number;
  label?: string; minHeight?: number; isActive?: boolean };
export function RichBody({ value, onChange, onSelect, onFocus, onBlur, focusRequest, dismissRequest, label = '글 본문', minHeight = 300, isActive = true }: RichBodyProps) {
  const input = useRef<TextInput>(null); const previousRequest = useRef(focusRequest);
  const [height, setHeight] = useState(minHeight); const { colors } = useTheme();
  useEffect(() => {
    if (previousRequest.current !== focusRequest) { previousRequest.current = focusRequest; if (isActive) input.current?.focus(); }
  }, [focusRequest, isActive]);
  useEffect(() => { if (dismissRequest) input.current?.blur(); }, [dismissRequest]);
  function blockStyle(kind: BlockKind): TextStyle {
    return { fontFamily: ['heading', 'subheading'].includes(kind) ? fonts.sans : kind === 'code' ? Platform.OS === 'ios' ? 'Menlo' : 'monospace' : fonts.serif,
      fontSize: kind === 'heading' ? 28 : kind === 'subheading' ? 23 : 20,
      lineHeight: kind === 'heading' ? 36 : 30,
      fontWeight: ['heading', 'subheading'].includes(kind) ? '700' : '400',
      fontStyle: ['quote', 'pullquote'].includes(kind) ? 'italic' : 'normal',
      backgroundColor: kind === 'code' ? colors.surface : 'transparent', color: colors.text };
  }
  return <TextInput ref={input} multiline accessibilityLabel={label}
    placeholderTextColor={colors.secondaryText} selection={value.selection} scrollEnabled={false} textAlignVertical="top"
    underlineColorAndroid="transparent" onFocus={onFocus} onBlur={onBlur}
    onChangeText={text => onChange(changeBody(value, text))}
    onSelectionChange={event => onSelect(event.nativeEvent.selection)}
    onContentSizeChange={event => setHeight(Math.max(minHeight, event.nativeEvent.contentSize.height))}
    style={{ height, minHeight, fontFamily: fonts.serif, fontSize: 20, lineHeight: 30, padding: 0, color: colors.text }}>
    <Text>{lines(value.document).map(line => <Text key={line.index} style={blockStyle(line.kind)}>
      {segments(value.document, line.start, line.end).map(part => <Text key={part.start} style={{
        fontWeight: part.formats.some(format => format.kind === 'bold') ? '700' : undefined,
        fontStyle: part.formats.some(format => format.kind === 'italic') ? 'italic' : undefined,
        color: part.mention || part.formats.some(format => format.kind === 'link') ? colors.green : undefined,
        textDecorationLine: part.formats.some(format => format.kind === 'link') ? 'underline' : 'none',
      }}>{part.text}</Text>)}{line.index < value.document.blocks.length - 1 ? '\n' : ''}
    </Text>)}</Text>
  </TextInput>;
}
