import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { sizes } from '../theme/tokens';
import { AppIcon, type AppIconName } from './AppIcon';

type IconButtonProps = {
  icon: AppIconName;
  label: string;
  onPress: () => void;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export function IconButton({ icon, label, onPress, color, size = 22, style, disabled }: IconButtonProps) {
  return (
    <Pressable
      role="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
    >
      <AppIcon name={icon} color={color} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: sizes.minimumTouchTarget,
    minHeight: sizes.minimumTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.55 },
});
