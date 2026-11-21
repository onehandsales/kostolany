import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme, useThemeStyles, type ThemeMode } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
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
  const { scheme } = useTheme();
  const { state, store } = useDisplaySettings();
  const [picker, setPicker] = useState<'font' | 'theme' | null>(null);
  const settings = state.settings;
  const family = families.find((item) => item.value === settings.fontFamily)?.label ?? 'Default';
  const appearance = settings.readerTheme === 'system' ? `System default (${scheme === 'dark' ? 'Dark' : 'Light'})` : settings.readerTheme === 'dark' ? 'Dark' : 'Light';
  return <TopPopover title="기사 표시 설정" onClose={onClose}>
    <View style={styles.scaleRow}>
      <Pressable role="button" accessibilityLabel="글자 크기 줄이기" disabled={settings.fontScale <= 80} accessibilityState={{ disabled: settings.fontScale <= 80 }} style={styles.scaleButton} onPress={() => store?.update({ fontScale: settings.fontScale - 20 })}><Text style={styles.smallA}>A</Text></Pressable>
      <Text accessibilityLabel="글자 크기" accessibilityValue={{ text: `${settings.fontScale}%` }} style={styles.percentage}>{settings.fontScale}%</Text>
      <Pressable role="button" accessibilityLabel="글자 크기 키우기" disabled={settings.fontScale >= 200} accessibilityState={{ disabled: settings.fontScale >= 200 }} style={styles.scaleButton} onPress={() => store?.update({ fontScale: settings.fontScale + 20 })}><Text style={styles.largeA}>A</Text></Pressable>
    </View>
    <Pressable role="button" accessibilityLabel="글꼴 선택 열기" accessibilityState={{ expanded: picker === 'font' }} onPress={() => setPicker(picker === 'font' ? null : 'font')} style={styles.row}>
      <Text style={styles.label}>Font family</Text><Text style={styles.value}>{family} ⌃⌄</Text>
    </Pressable>
    <Pressable role="button" accessibilityLabel="기사 테마 선택 열기" accessibilityState={{ expanded: picker === 'theme' }} onPress={() => setPicker(picker === 'theme' ? null : 'theme')} style={styles.row}>
      <Text style={styles.label}>Appearance</Text><Text style={styles.value}>{appearance} ⌃⌄</Text>
    </Pressable>
    <View style={styles.row}>
      <Text style={styles.label}>Highlights from others</Text>
      <ToggleSwitch label="타인 하이라이트 표시" value={settings.showHighlights} onChange={(showHighlights) => store?.update({ showHighlights })} />
    </View>
    <DisplaySettingsFeedback />
    {picker && <TopPopover title={picker === 'theme' ? '기사 테마 선택' : '글꼴 선택'} onClose={() => setPicker(null)} width={250} top={picker === 'theme' ? 205 : 148} right={27} showPointer={false}>
      {picker === 'theme' ? themes.map((item) => <Pressable key={item.value} role="radio" accessibilityLabel={`기사 테마: ${item.label}`} aria-checked={settings.readerTheme === item.value} accessibilityState={{ checked: settings.readerTheme === item.value }} style={styles.choice} onPress={() => { store?.update({ readerTheme: item.value }); setPicker(null); }}>
        <View style={styles.check}>{settings.readerTheme === item.value && <AppIcon name="check" size={18} />}</View><Text style={styles.choiceText}>{item.label}</Text>
      </Pressable>) : families.map((item) => <Pressable key={item.value} role="radio" accessibilityLabel={`글꼴: ${item.label}`} aria-checked={settings.fontFamily === item.value} accessibilityState={{ checked: settings.fontFamily === item.value }} style={styles.choice} onPress={() => { store?.update({ fontFamily: item.value }); setPicker(null); }}>
        <View style={styles.check}>{settings.fontFamily === item.value && <AppIcon name="check" size={18} />}</View><Text style={styles.choiceText}>{item.label}</Text>
      </Pressable>)}
    </TopPopover>}
  </TopPopover>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  scaleRow: { minHeight: 56, flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider },
  scaleButton: { flex: 1, minHeight: 56, minWidth: 48, alignItems: 'center', justifyContent: 'center' },
  smallA: { color: colors.text, fontFamily: fonts.serif, fontSize: 14, lineHeight: 24 },
  largeA: { color: colors.text, fontFamily: fonts.serif, fontSize: 18, lineHeight: 24 },
  percentage: { flex: 1, color: colors.text, fontFamily: fonts.sans, fontSize: 14, textAlign: 'center' },
  row: { minHeight: 57, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', alignContent: 'center', flexWrap: 'wrap', gap: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider },
  label: { color: colors.text, fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, flexGrow: 1, flexShrink: 1 },
  value: { color: colors.green, fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, flexShrink: 1 },
  choice: { minHeight: 48, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface },
  check: { width: 20 },
  choiceText: { color: colors.text, fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, flexShrink: 1 },
});
