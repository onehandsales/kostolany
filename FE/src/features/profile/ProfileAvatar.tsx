import { useState } from 'react';
import { Image, StyleSheet, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { useKnownProfile } from './ProfileProvider';
import type { ProfilePhoto } from './profilePhoto';

type ProfileAvatarProps = {
  userId?: string;
  photo?: ProfilePhoto | null;
  fallback?: ImageSourcePropType;
  size: number;
  style?: StyleProp<ViewStyle>;
};

export function ProfileAvatar({ userId = '', photo, fallback, size, style }: ProfileAvatarProps) {
  const known = useKnownProfile(userId);
  const { colors } = useTheme();
  const selected = photo === undefined ? known?.photo : photo;
  const [failedUri, setFailedUri] = useState<string | null>(null);
  const source = selected && selected.uri !== failedUri ? { uri: selected.uri } : fallback;
  const dimensions = { width: size, height: size, borderRadius: size / 2 };
  return <View style={[dimensions, { overflow: 'hidden', backgroundColor: colors.input, borderColor: colors.border, borderWidth: StyleSheet.hairlineWidth }, style]}>
    {source && <Image source={source} accessible={false} style={dimensions} resizeMode="cover" onError={() => { if (selected) setFailedUri(selected.uri); }} />}
  </View>;
}
