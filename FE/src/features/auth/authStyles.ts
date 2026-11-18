import { StyleSheet } from 'react-native';

import { colors, sizes, typography } from '../../shared/theme/tokens';

export const authStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  page: { flexGrow: 1, width: '100%', maxWidth: 560, alignSelf: 'center', padding: 24, gap: 24 },
  title: { ...typography.pageTitle, color: colors.text },
  text: { ...typography.body, color: colors.text },
  secondary: { fontSize: 14, lineHeight: 22, color: colors.secondaryText },
  button: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget,
    paddingVertical: 12, paddingHorizontal: 20, borderWidth: 1, borderColor: colors.text,
    borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 16, lineHeight: 24, color: colors.text, textAlign: 'center' },
  link: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget,
    paddingVertical: 12, justifyContent: 'center' },
  disabled: { opacity: 0.45 },
  error: { fontSize: 16, lineHeight: 26, color: '#a52a2a' },
});
