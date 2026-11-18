import { Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../../shared/theme/tokens';

export function BookmarkIcon({ saved = false, size = 24 }: { saved?: boolean; size?: number }) {
  return <Svg width={size} height={size} viewBox="0 0 24 24" aria-hidden
    accessible={Platform.OS === 'web' ? undefined : false}>
    <Path d="M6 3h12v18l-6-4-6 4Z" fill={saved ? colors.text : 'none'}
      stroke={colors.text} strokeWidth={1.5} strokeLinejoin="round" />
  </Svg>;
}
