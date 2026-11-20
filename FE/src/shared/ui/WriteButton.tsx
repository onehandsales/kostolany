import { StyleSheet } from 'react-native';

import { useThemeStyles, useTheme } from '../theme/ThemeProvider';
import { type ThemeColors } from '../theme/tokens';
import { IconButton } from './IconButton';

export function WriteButton({ onPress }: { onPress: () => void }) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  return (
    <>
      <IconButton
        icon="write"
        label="Write a story"
        color={colors.onAccent}
        size={24}
        onPress={onPress}
        style={styles.button}
      />
    </>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.green,
    boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
  },
});
