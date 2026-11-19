import { StyleSheet } from 'react-native';

import { sizes, fonts, type ThemeColors } from '../../shared/theme/tokens';

export const settingsStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  page: { width: '100%', maxWidth: 680, alignSelf: 'center', paddingBottom: 32 },
  header: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8, paddingHorizontal: 16,
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border,
    width: '100%', maxWidth: 680, alignSelf: 'center' },
  headerSpace: { width: 48 },
  title: { flex: 1, fontFamily: fonts.sans, fontSize: 22, lineHeight: 30, fontWeight: '600', color: colors.text, textAlign: 'center' },
  action: { minWidth: sizes.minimumTouchTarget, minHeight: sizes.minimumTouchTarget,
    padding: 12, alignItems: 'center', justifyContent: 'center' },
  text: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 26, color: colors.text, flexShrink: 1 },
  secondary: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.secondaryText },
  section: { paddingHorizontal: 24, paddingVertical: 18, backgroundColor: colors.surface,
    fontFamily: fonts.sans, fontSize: 16, lineHeight: 24, fontWeight: '600', color: colors.text },
  row: { minHeight: 64, paddingHorizontal: 24, paddingVertical: 16, flexDirection: 'row',
    alignItems: 'center', gap: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowContent: { flex: 1, gap: 4 },
  group: { padding: 24, gap: 16 },
  error: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.destructive },
  button: { minHeight: 48, minWidth: 48, borderWidth: 1, borderColor: colors.text, borderRadius: 28,
    padding: 12, justifyContent: 'center', alignItems: 'center' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.18)', justifyContent: 'flex-end' },
  sheet: { maxHeight: '94%', width: '100%', maxWidth: 680, alignSelf: 'center', backgroundColor: colors.background,
    borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden' },
  choices: { gap: 12 },
  choice: { minHeight: 56, borderWidth: 1, borderColor: colors.border, borderRadius: 8,
    padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  selected: { borderColor: colors.text, backgroundColor: colors.input },
  disabled: { opacity: 0.45 },
});
