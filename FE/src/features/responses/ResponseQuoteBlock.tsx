import { StyleSheet, Text, View } from 'react-native';

import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';

export function ResponseQuoteBlock({ text, compact = false }: { text: string; compact?: boolean }) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  return (
    <View style={styles.card}>
      <Text numberOfLines={compact ? 2 : undefined} style={styles.quote}>
        <Text style={{ backgroundColor: colors.highlight }}>{text}</Text>
      </Text>
    </View>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      padding: 16,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderRadius: 3,
      backgroundColor: colors.popup,
      flex: 1,
    },
    quote: {
      fontFamily: fonts.serif,
      fontSize: 16,
      lineHeight: 24,
      color: colors.text,
    },
  });
