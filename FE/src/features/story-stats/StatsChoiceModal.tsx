import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { formatStatsDate } from './statsDates';

type StatsChoiceModalProps = { title: string; onClose: () => void; children: ReactNode };

export function StatsChoiceModal({ title, onClose, children }: StatsChoiceModalProps) {
  const styles = useThemeStyles(createStyles);
  const insets = useSafeAreaInsets();
  const heading = useRef<View>(null);
  useEffect(() => { const frame = requestAnimationFrame(() => heading.current?.focus()); return () => cancelAnimationFrame(frame); }, []);
  return <Modal transparent animationType="none" accessibilityLabel={title} onRequestClose={onClose}>
    <View style={[styles.overlay, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
      <Pressable role="button" accessibilityLabel={`${title} 배경 닫기`} onPress={onClose} style={StyleSheet.absoluteFill} />
      <View accessibilityViewIsModal role="dialog" accessibilityLabel={title} style={styles.panel}>
        <View style={styles.header}>
          <Text role="heading" style={styles.title}>{title}</Text>
          <Pressable ref={heading} role="button" accessibilityLabel={`${title} 닫기`} onPress={onClose} style={styles.close}><AppIcon name="close" size={20} /></Pressable>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
      </View>
    </View>
  </Modal>;
}

export function StatsChoice({ label, selected, onPress, disabled = false }: {
  label: string; selected: boolean; onPress: () => void; disabled?: boolean;
}) {
  const styles = useThemeStyles(createStyles);
  return <Pressable role="radio" accessibilityLabel={label} accessibilityState={{ checked: selected, disabled }}
    aria-checked={selected} disabled={disabled} onPress={onPress} style={[styles.row, disabled && styles.disabled]}>
    <Text style={styles.text}>{label}</Text>{selected && <AppIcon name="check" size={18} />}
  </Pressable>;
}

export function StatsMonthChoices({ month, latestMonth, onSelect }: { month: string; latestMonth: string; onSelect: (month: string) => void }) {
  const styles = useThemeStyles(createStyles);
  const [year, setYear] = useState(Number(month.slice(0, 4)));
  return <>
    <View style={styles.header}>
      <IconButton icon="back" label="통계 이전 연도" disabled={year <= 1970} onPress={() => setYear(value => value - 1)} />
      <Text style={styles.title} accessibilityLiveRegion="polite">{year}</Text>
      <IconButton icon="chevron" label="통계 다음 연도" disabled={year >= Number(latestMonth.slice(0, 4))} onPress={() => setYear(value => value + 1)} />
    </View>
    {Array.from({ length: 12 }, (_, index) => {
      const value = `${year}-${String(index + 1).padStart(2, '0')}`;
      return <StatsChoice key={value} label={formatStatsDate(value, true)} selected={month === value} disabled={value > latestMonth} onPress={() => onSelect(value)} />;
    })}
  </>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  overlay: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', backgroundColor: '#00000033' },
  panel: { maxHeight: '100%', backgroundColor: colors.popup, borderRadius: 14, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, minHeight: 56 },
  title: { flex: 1, fontFamily: fonts.sans, fontWeight: '600', fontSize: 17, color: colors.text },
  close: { minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center' },
  row: { minHeight: 48, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  text: { flex: 1, fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.text },
  disabled: { opacity: 0.4 },
});
