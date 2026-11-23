import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme, useThemeStyles, type ThemeMode } from '../../shared/theme/ThemeProvider';
import { fonts, sizes, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { TopPopover } from '../../shared/ui/TopPopover';
import { ToggleSwitch } from '../../shared/ui/ToggleSwitch';
import { DisplaySettingsFeedback } from './DisplaySettingsFeedback';
import { useDisplaySettings } from './DisplaySettingsProvider';
import type { DisplaySettings } from './displayTypes';

type ArticleDisplayPopoverProps = { onClose: () => void };
const themes: { value: ThemeMode; label: string }[] = [{ value: 'system', label: 'System default' }, { value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }];
// 펼친 글꼴 목록은 미수록이므로 대체 글꼴 세 가지를 모의 선택지로 제공한다.
const families: { value: DisplaySettings['fontFamily']; label: string }[] = [{ value: 'default', label: 'Default' }, { value: 'serif', label: 'Serif' }, { value: 'sans', label: 'Sans serif' }];

export function ArticleDisplayPopover({ onClose }: ArticleDisplayPopoverProps) {
  const styles = useThemeStyles(createStyles);
  const { scheme, colors } = useTheme();
  const { state, store } = useDisplaySettings();
  const [picker, setPicker] = useState<'font' | 'theme' | null>(null);
  const [pickerTop, setPickerTop] = useState(148);
  const fontAnchor = useRef<View>(null);
  const themeAnchor = useRef<View>(null);
  const measurement = useRef(0);
  const insets = useSafeAreaInsets();
  useEffect(() => () => { measurement.current++; }, []);
  const closePicker = () => { measurement.current++; setPicker(null); };
  function openPicker(kind: 'font' | 'theme') {
    if (picker === kind) { closePicker(); return; }
    const request = ++measurement.current;
    setPicker(kind); setPickerTop(kind === 'theme' ? 205 : 148);
    // 큰 글자로 행 높이가 달라져도 실제 선택 행 아래에 하위 메뉴를 배치한다.
    (kind === 'theme' ? themeAnchor : fontAnchor).current?.measureInWindow((_x, y, _width, height) => {
      if (request === measurement.current && height > 0) setPickerTop(Math.max(0, y + height - insets.top - 4));
    });
  }
  const settings = state.settings;
  const family = families.find((item) => item.value === settings.fontFamily)?.label ?? 'Default';
  const appearance = settings.readerTheme === 'system' ? `System default (${scheme === 'dark' ? 'Dark' : 'Light'})` : settings.readerTheme === 'dark' ? 'Dark' : 'Light';
  return <TopPopover title="기사 표시 설정" onClose={onClose}>
    <View style={styles.scaleRow}>
      <Pressable role="button" accessibilityLabel="글자 크기 줄이기" disabled={settings.fontScale <= 80} accessibilityState={{ disabled: settings.fontScale <= 80 }} style={styles.scaleButton} onPress={() => store?.update({ fontScale: settings.fontScale - 20 })}><Text style={styles.smallA}>A</Text></Pressable>
      <View style={styles.scaleValue}><Text accessibilityLabel="글자 크기" accessibilityValue={{ text: `${settings.fontScale}%` }} style={styles.percentage}>{settings.fontScale}%</Text></View>
      <Pressable role="button" accessibilityLabel="글자 크기 키우기" disabled={settings.fontScale >= 200} accessibilityState={{ disabled: settings.fontScale >= 200 }} style={styles.scaleButton} onPress={() => store?.update({ fontScale: settings.fontScale + 20 })}><Text style={styles.largeA}>A</Text></Pressable>
    </View>
    <Pressable ref={fontAnchor} role="button" accessibilityLabel="글꼴 선택 열기" accessibilityState={{ expanded: picker === 'font' }} onPress={() => openPicker('font')} style={styles.row}>
      <Text style={styles.label}>Font family</Text><View style={styles.selection}><Text style={styles.value}>{family}</Text><AppIcon name="select" size={14} color={colors.saveGreen} /></View>
    </Pressable>
    <Pressable ref={themeAnchor} role="button" accessibilityLabel="기사 테마 선택 열기" accessibilityState={{ expanded: picker === 'theme' }} onPress={() => openPicker('theme')} style={styles.row}>
      <Text style={styles.label}>Appearance</Text><View style={styles.selection}><Text style={styles.value}>{appearance}</Text><AppIcon name="select" size={14} color={colors.saveGreen} /></View>
    </Pressable>
    <View style={styles.row}>
      <Text style={styles.label}>Highlights from others</Text>
      <ToggleSwitch label="타인 하이라이트 표시" value={settings.showHighlights} onChange={(showHighlights) => store?.update({ showHighlights })} />
    </View>
    <DisplaySettingsFeedback />
    {picker && <TopPopover title={picker === 'theme' ? '기사 테마 선택' : '글꼴 선택'} onClose={closePicker} width={250} top={pickerTop} right={27} showPointer={false}>
      {picker === 'theme' ? themes.map((item) => <Pressable key={item.value} role="radio" accessibilityLabel={`기사 테마: ${item.label}`} aria-checked={settings.readerTheme === item.value} accessibilityState={{ checked: settings.readerTheme === item.value }} style={styles.choice} onPress={() => { store?.update({ readerTheme: item.value }); closePicker(); }}>
        <View style={styles.check}>{settings.readerTheme === item.value && <AppIcon name="check" size={18} />}</View><Text style={styles.choiceText}>{item.label}</Text>
      </Pressable>) : families.map((item) => <Pressable key={item.value} role="radio" accessibilityLabel={`글꼴: ${item.label}`} aria-checked={settings.fontFamily === item.value} accessibilityState={{ checked: settings.fontFamily === item.value }} style={styles.choice} onPress={() => { store?.update({ fontFamily: item.value }); closePicker(); }}>
        <View style={styles.check}>{settings.fontFamily === item.value && <AppIcon name="check" size={18} />}</View><Text style={styles.choiceText}>{item.label}</Text>
      </Pressable>)}
    </TopPopover>}
  </TopPopover>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  scaleRow: { minHeight: 56, flexDirection: 'row', alignItems: 'stretch', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider },
  scaleButton: { flex: 1, minHeight: 56, minWidth: sizes.minimumTouchTarget, alignItems: 'center', justifyContent: 'center' },
  scaleValue: { flex: 1, justifyContent: 'center', borderLeftWidth: StyleSheet.hairlineWidth, borderRightWidth: StyleSheet.hairlineWidth, borderColor: colors.divider, paddingVertical: 12 },
  smallA: { color: colors.text, fontFamily: fonts.serif, fontSize: 16, lineHeight: 24 },
  largeA: { color: colors.text, fontFamily: fonts.serif, fontSize: 20, lineHeight: 28 },
  percentage: { color: colors.secondaryText, fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, textAlign: 'center' },
  row: { minHeight: 57, paddingHorizontal: 24, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', alignContent: 'center', flexWrap: 'wrap', gap: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider },
  label: { color: colors.text, fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, flexGrow: 1, flexShrink: 1 },
  selection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 4, flexShrink: 1, maxWidth: '100%' },
  value: { color: colors.saveGreen, fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, flexShrink: 1 },
  choice: { minHeight: 48, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface },
  check: { width: 20 },
  choiceText: { color: colors.text, fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, flexShrink: 1 },
});
