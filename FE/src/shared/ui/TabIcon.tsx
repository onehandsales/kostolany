import { Platform } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '../theme/tokens';

export type TabIconName = 'home' | 'search' | 'library' | 'profile';

type TabIconProps = {
  name: TabIconName;
  focused: boolean;
  color: string;
  size: number;
};

export function TabIcon({ name, focused, color, size }: TabIconProps) {
  return (
    <Svg
      width={name === 'profile' ? size + 4 : size}
      height={name === 'profile' ? size + 4 : size}
      viewBox={name === 'profile' ? '0 0 28 28' : '0 0 24 24'}
      fill="none"
      stroke={color}
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      accessible={Platform.OS === 'web' ? undefined : false}
    >
      {name === 'home' && (
        <>
          <Path d="M2 10 12 2 22 10" />
          <Path d="M4 11 12 5 20 11V22H14V15H10V22H4Z" fill={focused ? color : 'none'} />
        </>
      )}
      {name === 'search' && (
        <>
          <Circle cx={10.5} cy={10.5} r={7.5} strokeWidth={focused ? 2 : 1} />
          <Path d="m16 16 6 6" strokeWidth={focused ? 2 : 1} />
        </>
      )}
      {name === 'library' && (
        <>
          <Path d="M4 18V4Q4 2 6 2H15" />
          <Path d="M8 6H20V22L14 17 8 22Z" fill={focused ? color : 'none'} />
        </>
      )}
      {name === 'profile' && (
        <>
          <Circle cx={14} cy={14} r={10} fill={colors.avatar} stroke="none" />
          {focused && <Circle cx={14} cy={14} r={13} />}
          <Path d="m23 0 1.8 4.8L28 7l-3.2 2.2L23 14l-1.8-4.8L17 7l4.2-2.2Z" fill={colors.gold} stroke="none" />
        </>
      )}
    </Svg>
  );
}
