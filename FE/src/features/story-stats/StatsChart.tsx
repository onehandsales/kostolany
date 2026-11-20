import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { formatStatsDate } from './statsDates';
import type { StatsDay } from './types';

type StatsChartProps = {
  days: readonly StatsDay[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onOpenDates: () => void;
};

export function StatsChart({ days, selectedDate, onSelectDate, onOpenDates }: StatsChartProps) {
  const { colors, scheme } = useTheme();
  const [width, setWidth] = useState(345);
  const top = 8; const height = 280;
  const max = Math.max(1, ...days.map(day => Math.max(day.views ?? 0, day.reads ?? 0)));
  const ceiling = max * 1.1;
  const power = 10 ** Math.floor(Math.log10(ceiling / 3));
  const step = Math.max(1, ([1, 2, 5, 10].find(value => value * power >= ceiling / 3) ?? 10) * power);
  const ticks = Array.from({ length: Math.floor(ceiling / step) + 1 }, (_, index) => index * step);
  const tickLabels = ticks.map(tick => Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 0 }).format(tick));
  const left = Math.max(16, ...tickLabels.map(label => label.length * 5.5 + 4));
  const graphWidth = Math.max(1, width - left);
  const x = (index: number) => left + graphWidth * index / Math.max(1, days.length - 1);
  const y = (value: number) => top + height - value / ceiling * height;
  const selectedIndex = days.findIndex(day => day.date === selectedDate);
  const selected = days[selectedIndex];
  const viewsColor = scheme === 'dark' ? '#86b986' : '#b3dbb1';
  const readsColor = scheme === 'dark' ? '#58b94d' : '#147d12';
  const segments: number[][] = [];
  days.forEach((day, index) => {
    if (day.views === null || day.reads === null) return;
    const last = segments[segments.length - 1];
    if (last && last[last.length - 1] === index - 1) last.push(index); else segments.push([index]);
  });
  // 미집계 날짜를 0으로 잇지 않고 알려진 날짜 구간만 선과 면으로 표시한다.
  const line = (metric: 'views' | 'reads', indices: number[]) => indices.map((index, position) =>
    `${position === 0 ? 'M' : 'L'}${x(index)},${y(days[index]?.[metric] ?? 0)}`).join(' ');
  const area = (metric: 'views' | 'reads') => segments.map(indices =>
    `${line(metric, indices)} L${x(indices[indices.length - 1] ?? 0)},${y(0)} L${x(indices[0] ?? 0)},${y(0)} Z`).join(' ');
  return <View onLayout={event => setWidth(event.nativeEvent.layout.width)}>
    <Pressable role="button" accessibilityLabel="통계 그래프 날짜 선택"
      accessibilityHint="날짜별 수치 메뉴에서도 날짜와 조회·읽음 수를 확인할 수 있어요."
      accessibilityValue={{ text: selected ? `${formatStatsDate(selected.date)}, Views ${selected.views ?? '미집계'}, Reads ${selected.reads ?? '미집계'}` : '월 전체' }}
      onAccessibilityTap={onOpenDates}
      onPress={event => {
        const location = event.nativeEvent.locationX;
        if (!Number.isFinite(location)) { onOpenDates(); return; }
        const index = Math.max(0, Math.min(days.length - 1, Math.round((location - left) / graphWidth * (days.length - 1))));
        const day = days[index]; if (day) onSelectDate(day.date);
      }}>
      <Svg width="100%" height={310} accessible={Platform.OS === 'web' ? undefined : false} aria-hidden>
        <Rect x={left} y={top} width={graphWidth} height={height} stroke={colors.border} fill="none" />
        {days.map((day, index) => <Line key={day.date} x1={x(index)} x2={x(index)} y1={top} y2={y(0)} stroke={colors.border} />)}
        {ticks.map((tick, index) => <SvgText key={tick} x={left - 4} y={y(tick) + 4} textAnchor="end" fontSize={10} fill={colors.secondaryText}>{tickLabels[index]}</SvgText>)}
        <Path d={area('views')} fill={viewsColor} fillOpacity={0.3} />
        <Path d={area('reads')} fill={readsColor} fillOpacity={0.45} />
        <Path d={segments.map(indices => line('views', indices)).join(' ')} stroke={viewsColor} strokeWidth={2} fill="none" />
        <Path d={segments.map(indices => line('reads', indices)).join(' ')} stroke={readsColor} strokeWidth={2} fill="none" />
        {days.filter((day, index) => index % 7 === 0).map(day => <SvgText key={day.date} x={x(days.indexOf(day)) + 4} y={y(0) + 16} fontSize={10} fill={colors.secondaryText}>
          {formatStatsDate(day.date).replace(/, \d{4}$/, '')}
        </SvgText>)}
        {selected && <Line x1={x(selectedIndex)} x2={x(selectedIndex)} y1={top} y2={y(0)} stroke={colors.text} />}
        {days.map((day, index) => day.views !== null && day.reads !== null &&
          (day.views > 0 || day.reads > 0 || index === days.length - 2 || index === selectedIndex || (days[index + 1]?.views ?? 0) > 0) && <StatsChartPoints key={day.date}
          x={x(index)} viewsY={y(day.views)} readsY={y(day.reads)} selected={index === selectedIndex}
          viewsColor={viewsColor} readsColor={readsColor} selectedColor={colors.text} />)}
      </Svg>
    </Pressable>
    <View style={styles.legend}>
      <Text style={[styles.label, { color: colors.text }]}><Text style={{ color: readsColor }}>● </Text>Reads</Text>
      <Text style={[styles.label, { color: colors.text }]}><Text style={{ color: viewsColor }}>● </Text>Views</Text>
    </View>
  </View>;
}

function StatsChartPoints({ x, viewsY, readsY, selected, viewsColor, readsColor, selectedColor }: {
  x: number; viewsY: number; readsY: number; selected: boolean; viewsColor: string; readsColor: string; selectedColor: string;
}) {
  return <>
    {selected && <><Circle cx={x} cy={viewsY} r={8} fill={selectedColor} fillOpacity={0.3} /><Circle cx={x} cy={readsY} r={8} fill={selectedColor} fillOpacity={0.3} /></>}
    <Circle cx={x} cy={viewsY} r={3.5} stroke={selected ? selectedColor : viewsColor} strokeWidth={2} fill={selected ? selectedColor : '#e5f0e4'} />
    <Circle cx={x} cy={readsY} r={3.5} stroke={selected ? selectedColor : readsColor} strokeWidth={2} fill={selected ? selectedColor : '#92bf88'} />
  </>;
}

const styles = StyleSheet.create({
  legend: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 23, flexWrap: 'wrap' },
  label: { fontSize: 11, lineHeight: 18 },
});
