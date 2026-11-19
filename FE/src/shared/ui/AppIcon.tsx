import { Platform } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '../theme/tokens';

export type AppIconName =
  | 'back'
  | 'close'
  | 'more'
  | 'plus'
  | 'chevron'
  | 'bell'
  | 'write'
  | 'minus'
  | 'comment'
  | 'share'
  | 'play'
  | 'lock'
  | 'download'
  | 'settings'
  | 'star'
  | 'check'
  | 'clap';
type AppIconProps = { name: AppIconName; size?: number; color?: string };

export function AppIcon({ name, size = 24, color = colors.text }: AppIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      accessible={Platform.OS === 'web' ? undefined : false}
    >
      {name === 'back' && <Path d="m14 5-7 7 7 7" />}
      {name === 'chevron' && <Path d="m9 5 7 7-7 7" />}
      {name === 'close' && <Path d="m5 5 14 14M19 5 5 19" />}
      {name === 'plus' && <Path d="M12 4v16M4 12h16" />}
      {name === 'more' && (
        <>
          <Circle cx={5} cy={12} r={1} fill={color} />
          <Circle cx={12} cy={12} r={1} fill={color} />
          <Circle cx={19} cy={12} r={1} fill={color} />
        </>
      )}
      {name === 'bell' && (
        <>
          <Path d="M5 17h14l-2-4V8a5 5 0 0 0-10 0v5ZM10 20h4" />
          <Path d="M12 1v2" />
        </>
      )}
      {name === 'write' && (
        <>
          <Path d="M12 5H4v15h15v-8M10 14l1-4L20 1l3 3-9 9ZM18 3l3 3" />
        </>
      )}
      {name === 'minus' && (
        <>
          <Circle cx={12} cy={12} r={9} />
          <Path d="M8 12h8" />
        </>
      )}
      {name === 'comment' && <Path d="M20 19 15 17a8 8 0 1 1 5-5Z" />}
      {name === 'share' && (
        <>
          <Path d="M7 8H4v13h16V8h-3M12 15V1m-4 4 4-4 4 4" />
        </>
      )}
      {name === 'play' && (
        <>
          <Circle cx={12} cy={12} r={9} />
          <Path d="m10 8 6 4-6 4Z" fill={color} />
        </>
      )}
      {name === 'lock' && (
        <>
          <Rect x={6} y={10} width={12} height={11} rx={1} fill={color} />
          <Path d="M8 10V6a4 4 0 0 1 8 0v4" />
        </>
      )}
      {name === 'download' && (
        <>
          <Circle cx={12} cy={12} r={10} />
          <Path d="M12 5v12m-4-4 4 4 4-4M8 19h8" />
        </>
      )}
      {name === 'settings' && (
        <>
          <Path d="m12 1 3 3 4 1 1 4 3 3-3 3-1 4-4 1-3 3-3-3-4-1-1-4-3-3 3-3 1-4 4-1Z" />
          <Circle cx={12} cy={12} r={4} />
        </>
      )}
      {name === 'star' && (
        <Path d="m12 1 2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" fill={color} stroke="none" />
      )}
      {name === 'check' && <Path d="m5 12 4 4L19 6" strokeWidth={2} />}
      {name === 'clap' && (
        <>
          <Path d="m8 13-4-5q-1-2 1-2l5 5-4-7q0-2 2-1l5 7-3-7q0-2 2-1l5 9 1-5q1-2 2 0v9q-1 6-6 7-4 0-7-4l-4-4q-1-2 1-2Z" />
          <Path d="M3 3 1 1M17 2l1-2M21 4l2-1" />
        </>
      )}
    </Svg>
  );
}
