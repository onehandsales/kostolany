import { Pressable, StyleSheet, View } from 'react-native';

import { useThemeStyles } from '../theme/ThemeProvider';
import type { ThemeColors } from '../theme/tokens';

type ToggleSwitchProps = { label: string; value: boolean; disabled?: boolean; onChange: (value: boolean) => void };

export function ToggleSwitch({ label, value, disabled = false, onChange }: ToggleSwitchProps) {
  const styles = useThemeStyles(createStyles);
  return <Pressable role="switch" accessibilityLabel={label} disabled={disabled} accessibilityState={{ checked: value, disabled }} aria-checked={value}
    onPress={() => onChange(!value)} style={[styles.target, disabled && { opacity: 0.5 }]}>
    <View style={[styles.track, value && styles.enabled]}><View style={[styles.thumb, value && styles.selectedThumb]} /></View>
  </Pressable>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  target: { minHeight: 48, minWidth: 50, justifyContent: 'center' },
  track: { width: 50, height: 30, borderRadius: 15, backgroundColor: colors.segment, padding: 2 },
  enabled: { backgroundColor: colors.saveGreen },
  thumb: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#ffffff' },
  selectedThumb: { alignSelf: 'flex-end' },
});
