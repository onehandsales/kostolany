import { Platform } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { useTheme } from '../../shared/theme/ThemeProvider';

type SearchIconProps = { name: 'search' | 'back' | 'clear' | 'next' };

export function SearchIcon({ name }: SearchIconProps) {
  const { colors } = useTheme();
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" aria-hidden accessible={Platform.OS === 'web' ? undefined : false}>
      {name === 'search' && <Circle cx={10} cy={10} r={6.5} fill="none" stroke={colors.secondaryText} strokeWidth={1.5} />}
      <Path d={name === 'search' ? 'm15 15 6 6' : name === 'back' ? 'm15 4-8 8 8 8'
        : name === 'next' ? 'm9 6 6 6-6 6' : 'm6 6 12 12 M6 18 18 6'}
        fill="none" stroke={colors.secondaryText} strokeWidth={1.5} />
    </Svg>
  );
}
