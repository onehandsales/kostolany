import { Text, type LayoutChangeEvent, type StyleProp, type TextStyle } from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import type { SelectionBlock } from './selectionDocument';
import type { Highlight } from './types';
import type { ReactNode } from 'react';

export type PassageTextContent = (start: number, end: number, interactive: boolean) => ReactNode;

export function HighlightedText({ block, nativeID, highlights, otherHighlight, style, onHighlight, onLayout, onSelect, renderContent, role }: {
  block: SelectionBlock; nativeID: string; highlights: readonly Highlight[]; otherHighlight?: string;
  style?: StyleProp<TextStyle>; onHighlight: (value: Highlight, y: number) => void; onLayout?: (event: LayoutChangeEvent) => void; onSelect?: () => void;
  renderContent?: PassageTextContent; role?: 'heading';
}) {
  return <Text nativeID={nativeID} role={role} selectable={!onSelect} style={style} onLayout={onLayout} onLongPress={onSelect}
    accessibilityActions={onSelect ? [{ name: 'selectPassage', label: '본문 문구 선택' }] : undefined}
    onAccessibilityAction={event => { if (event.nativeEvent.actionName === 'selectPassage') onSelect?.(); }}>
    <HighlightSpans block={block} highlights={highlights} otherHighlight={otherHighlight}
      nativeID={nativeID} onHighlight={onHighlight} renderContent={renderContent} />
  </Text>;
}

// 읽기 본문과 선택 입력이 같은 경계와 색을 사용하되 선택 입력에는 구간별 누르기 동작을 넣지 않는다.
export function HighlightSpans({ block, highlights, otherHighlight, nativeID, onHighlight, renderContent, interactive = true }: {
  block: SelectionBlock; highlights: readonly Highlight[]; otherHighlight?: string; nativeID?: string;
  onHighlight?: (value: Highlight, y: number) => void;
  renderContent?: PassageTextContent; interactive?: boolean;
}) {
  const { colors } = useTheme();
  const own = highlights.filter(value => value.start < block.end && value.end > block.start);
  const otherStart = otherHighlight ? block.text.indexOf(otherHighlight) : -1;
  const cuts = new Set([block.start, block.end]);
  own.forEach(value => { cuts.add(Math.max(block.start, value.start)); cuts.add(Math.min(block.end, value.end)); });
  if (otherStart >= 0 && otherHighlight) { cuts.add(block.start + otherStart); cuts.add(block.start + otherStart + otherHighlight.length); }
  const points = [...cuts].sort((a, b) => a - b);
  return <>
    {points.slice(0, -1).map((start, index) => {
      const end = points[index + 1] ?? block.end;
      const selected = own.find(value => value.start <= start && value.end >= end);
      const other = otherHighlight && otherStart >= 0 && start >= block.start + otherStart && end <= block.start + otherStart + otherHighlight.length;
      return <Text key={start} nativeID={selected && nativeID ? `${nativeID}-highlight-${start}` : undefined}
        style={selected ? { backgroundColor: colors.ownHighlight } : other ? { backgroundColor: colors.highlight } : undefined}
        onPress={selected && onHighlight ? event => onHighlight(selected, event.nativeEvent.pageY) : undefined}
        accessibilityLabel={selected && onHighlight ? `내 하이라이트: ${block.text.slice(start - block.start, end - block.start)}` : undefined}>
        {renderContent ? renderContent(start - block.start, end - block.start, interactive && !(selected && onHighlight))
          : block.text.slice(start - block.start, end - block.start)}
      </Text>;
    })}
  </>;
}
