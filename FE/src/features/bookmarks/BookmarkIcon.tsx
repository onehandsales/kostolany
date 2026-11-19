import { Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../../shared/theme/tokens';

export function BookmarkIcon({
  saved = false,
  size = 24,
  plus = false,
}: {
  saved?: boolean;
  size?: number;
  plus?: boolean;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      accessible={Platform.OS === 'web' ? undefined : false}
    >
      <Path
        d={plus && !saved ? 'M13 4H5v18l6-4 6 4V12' : 'M5 4h12v18l-6-4-6 4Z'}
        fill={saved ? colors.text : 'none'}
        stroke={colors.text}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {plus && !saved && (
        <Path
          d="M19 1v8m-4-4h8"
          fill="none"
          stroke={colors.secondaryText}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
}
