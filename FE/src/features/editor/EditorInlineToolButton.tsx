import { Pressable, StyleSheet } from 'react-native';

import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { sizes, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';

type EditorInlineToolButtonProps = {
  icon: 'bold' | 'italic' | 'link' | 'keyboard-dismiss';
  label: string;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
};

export function EditorInlineToolButton({ icon, label, onPress, selected = false, disabled = false }: EditorInlineToolButtonProps) {
  const { colors } = useTheme();
  const styles = useThemeStyles(createStyles);
  const color = selected ? colors.green : colors.secondaryText;
  return (
    <Pressable
      role="button"
      accessibilityLabel={label}
      accessibilityHint={icon === 'link' ? '링크를 연결할 글자를 먼저 선택하세요.' : undefined}
      aria-pressed={selected}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      // 서식을 누를 때 본문의 선택과 입력 포커스를 보존한다.
      onPressIn={event => event.preventDefault()}
      onPress={onPress}
      style={({ pressed }) => [styles.button, selected && styles.selected, (disabled || pressed) && styles.dim]}
    >
      <AppIcon name={icon} size={20} color={color} />
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  button: { flexShrink: 1, minWidth: sizes.minimumTouchTarget, minHeight: sizes.minimumTouchTarget, padding: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 6 },
  selected: { backgroundColor: colors.highlight },
  dim: { opacity: 0.45 },
});
