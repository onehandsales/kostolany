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
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      accessible={false}
    >
      {name === 'home' && (
        <>
          <Path d="M2 10 12 2 22 10" />
          <Path
            d="M4 10 12 4 20 10V22H14V15H10V22H4Z"
            fill={focused ? color : 'none'}
          />
        </>
      )}
      {name === 'search' && (
        <>
          <Circle cx={10.5} cy={10.5} r={7.5} strokeWidth={focused ? 2.5 : 1.5} />
          <Path d="m16 16 6 6" strokeWidth={focused ? 2.5 : 1.5} />
        </>
      )}
      {name === 'library' && (
        <>
          <Path d="M4 18V4Q4 2 6 2H15" />
          <Path
            d="M8 6H20V22L14 17 8 22Z"
            fill={focused ? color : 'none'}
          />
        </>
      )}
      {name === 'profile' && (
        <>
          <Circle cx={12} cy={12} r={8} fill={colors.avatar} stroke="none" />
          {focused && <Circle cx={12} cy={12} r={11} />}
        </>
      )}
    </Svg>
  );
}
