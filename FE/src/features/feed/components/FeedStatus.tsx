import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, sizes, spacing, typography } from '../../../shared/theme/tokens';

export function FeedStatus({ message, loading = false, error = false, actionLabel, onAction }: {
  message: string;
  loading?: boolean;
  error?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={colors.secondaryText} aria-label={message} />}
      <Text role={error ? 'alert' : undefined} accessibilityLiveRegion="polite" style={styles.message}>{message}</Text>
      {actionLabel && onAction && (
        <Pressable role="button" onPress={onAction} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <Text style={styles.buttonLabel}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: spacing.page, gap: spacing.medium },
  message: { ...typography.body, color: colors.secondaryText, textAlign: 'center' },
  button: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget,
    paddingHorizontal: spacing.page, paddingVertical: spacing.small, borderRadius: 24,
    justifyContent: 'center', borderWidth: 1, borderColor: colors.text },
  buttonLabel: { ...typography.body, color: colors.text, textAlign: 'center' },
  pressed: { opacity: 0.6 },
});
