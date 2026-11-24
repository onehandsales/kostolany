import type { Ref } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle, type View } from 'react-native';

import { sizes } from '../theme/tokens';
import { AppIcon, type AppIconName } from './AppIcon';

type IconButtonProps = {
  icon: AppIconName;
  label: string;
  hint?: string;
  onPress: () => void;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  buttonRef?: Ref<View>;
};

export function IconButton({ icon, label, hint, onPress, color, size = 22, style, disabled, buttonRef }: IconButtonProps) {
  return (
    <Pressable
      ref={buttonRef}
      role="button"
      accessibilityLabel={label}
      accessibilityHint={hint}
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
