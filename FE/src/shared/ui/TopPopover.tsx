import { AccessibleModal as Modal } from './AccessibleModal';
import { useEffect, type ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeStyles } from '../theme/ThemeProvider';
import type { ThemeColors } from '../theme/tokens';
import { restoreModalFocus } from './restoreModalFocus';

type TopPopoverProps = { title: string; onClose: () => void; children: ReactNode; width?: number; top?: number; right?: number; showPointer?: boolean };

export function TopPopover({ title, onClose, children, width: preferredWidth = 320, top = 48, right = 19, showPointer = true }: TopPopoverProps) {
  const styles = useThemeStyles(createStyles);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  useEffect(() => () => { if (Platform.OS === 'web') requestAnimationFrame(restoreModalFocus); }, []);
  return <Modal transparent animationType="none" accessibilityLabel={title} onRequestClose={onClose}>
    <View style={styles.screen} accessibilityViewIsModal>
      <Pressable role="button" accessibilityLabel={`${title} 닫기`} style={StyleSheet.absoluteFill} onPress={onClose} />
      {showPointer && <View pointerEvents="none" style={[styles.tip, { top: insets.top + top - 10, right: right + 7 }]} />}
      <View style={[styles.popup, { right, width: Math.min(preferredWidth, width - right * 2), top: insets.top + top, maxHeight: Math.max(48, height - insets.top - insets.bottom - top - 16) }]}>
        <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
      </View>
    </View>
  </Modal>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1 },
  tip: { position: 'absolute', right: 26, width: 20, height: 20, transform: [{ rotate: '45deg' }], backgroundColor: colors.popup },
  popup: { position: 'absolute', right: 19, borderRadius: 14, overflow: 'hidden', backgroundColor: colors.popup, boxShadow: '0px 8px 60px rgba(0,0,0,0.18)' },
});
