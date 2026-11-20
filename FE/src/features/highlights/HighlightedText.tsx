import { Text, type StyleProp, type TextStyle } from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import type { SelectionBlock } from './selectionDocument';
import type { Highlight } from './types';

export function HighlightedText({ block, nativeID, highlights, otherHighlight, style, onHighlight, onLayout }: {
  block: SelectionBlock; nativeID: string; highlights: readonly Highlight[]; otherHighlight?: string;
  style?: StyleProp<TextStyle>; onHighlight: (value: Highlight, y: number) => void; onLayout?: () => void;
}) {
  const { colors } = useTheme();
  const own = highlights.filter(value => value.start < block.end && value.end > block.start);
  const otherStart = otherHighlight ? block.text.indexOf(otherHighlight) : -1;
  const cuts = new Set([block.start, block.end]);
  own.forEach(value => { cuts.add(Math.max(block.start, value.start)); cuts.add(Math.min(block.end, value.end)); });
  if (otherStart >= 0 && otherHighlight) { cuts.add(block.start + otherStart); cuts.add(block.start + otherStart + otherHighlight.length); }
  const points = [...cuts].sort((a, b) => a - b);
  return <Text nativeID={nativeID} selectable style={style} onLayout={onLayout}>
    {points.slice(0, -1).map((start, index) => {
      const end = points[index + 1] ?? block.end;
      const selected = own.find(value => value.start <= start && value.end >= end);
      const other = otherHighlight && otherStart >= 0 && start >= block.start + otherStart && end <= block.start + otherStart + otherHighlight.length;
      return <Text key={start} nativeID={selected ? `${nativeID}-highlight-${start}` : undefined}
        style={selected || other ? { backgroundColor: colors.highlight } : undefined}
        onPress={selected ? event => onHighlight(selected, event.nativeEvent.pageY) : undefined} accessibilityLabel={selected ? `내 하이라이트: ${block.text.slice(start - block.start, end - block.start)}` : undefined}>
        {block.text.slice(start - block.start, end - block.start)}
      </Text>;
    })}
  </Text>;
}
