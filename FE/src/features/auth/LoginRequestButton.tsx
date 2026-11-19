import type { ReactNode } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { useAuth } from './AuthProvider';
import type { LoginContext } from './types';

type LoginRequestButtonProps = {
  context: LoginContext; label: string; children: ReactNode; style?: StyleProp<ViewStyle>;
};

export function LoginRequestButton({ context, label, children, style }: LoginRequestButtonProps) {
  const { store } = useAuth();
  return <Pressable role="button" accessibilityLabel={label} accessibilityHint="모의 로그인 화면을 엽니다"
    onPress={() => store.openLogin(context)} style={style}>{children}</Pressable>;
}
