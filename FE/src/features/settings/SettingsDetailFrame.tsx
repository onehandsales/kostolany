import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';

export function SettingsDetailFrame({
  title,
  onBack,
  children,
  footer,
}: {
  title: string;
  onBack: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const styles = useThemeStyles(settingsDetailStyles);
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.header}>
        <IconButton icon="back" label={`${title}에서 뒤로`} onPress={onBack} />
        <Text role="heading" style={styles.title}>
          {title}
        </Text>
        <View style={{ width: 48 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
      {footer}
    </SafeAreaView>
  );
}
export function SettingsAction({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const styles = useThemeStyles(settingsDetailStyles);
  return (
    <Pressable
      role="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={styles.action}
    >
      <Text style={[styles.text, disabled && styles.secondary]}>{title}</Text>
    </Pressable>
  );
}
export const settingsDetailStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontFamily: fonts.sans,
      color: colors.text,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '700',
    },
    content: { padding: 24, paddingBottom: 36, gap: 16 },
    text: { fontSize: 16, lineHeight: 24, color: colors.text, fontFamily: fonts.sans },
    secondary: { fontSize: 14, lineHeight: 21, color: colors.secondaryText, fontFamily: fonts.sans },
    action: {
      minHeight: 48,
      paddingVertical: 12,
      paddingHorizontal: 16,
      justifyContent: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderRadius: 8,
    },
    error: { fontSize: 15, lineHeight: 22, color: colors.destructive },
  });
