import { Platform } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { useTheme } from '../theme/ThemeProvider';

export type AppIconName =
  | 'document'
  | 'trash'
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
  | 'friend'
  | 'verified'
  | 'star'
  | 'check'
  | 'clap'
  | 'shield'
  | 'pin';
type AppIconProps = { name: AppIconName; size?: number; color?: string; filled?: boolean };

// 원본 PNG의 윤곽을 참고한 벡터 대체이며 Medium의 원본 아이콘 경로는 확보하지 못했다.
export function AppIcon({ name, size = 24, color: requestedColor, filled = false }: AppIconProps) {
  const { colors } = useTheme();
  const color = requestedColor ?? colors.text;
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
      {name === 'document' && <Path d="M5 2h14v20H5ZM8 6h8M8 10h8M8 14h8M8 18h5" />}
      {name === 'trash' && <Path d="M3 5h18M9 2h6l1 3M5 5l1 17h12l1-17M9 9v9M12 9v9M15 9v9" />}
      {name === 'pin' && <Path d="m14 2 8 8-3 1-5 5-2-2-8 8 7-9-2-2 5-5Z" />}
      {name === 'shield' && <Path d="M12 2 4 5v6c0 5 4 8 8 11 4-3 8-6 8-11V5l-8-3Zm-3 9 2 2 4-5" fill="none" stroke={color} strokeWidth={1.2} />}
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
          <Path d="M4 18c1.7-2 2-3.4 2-6V8a6 6 0 0 1 12 0v4c0 2.6.3 4 2 6H4Z" />
          <Path d="M10 20a2.2 2.2 0 0 0 4 0" />
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
      {name === 'comment' && (
        <Path d="M21 12a9 9 0 1 0-5.1 8.1L22 22l-1.8-6.1A9 9 0 0 0 21 12Z" fill={filled ? color : 'none'} />
      )}
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
          <Path d="M10 2h4l1 3 2 .9 3-.5 2 3.5-2 2.3v2.6l2 2.3-2 3.5-3-.5-2 .9-1 3h-4l-1-3-2-.9-3 .5-2-3.5 2-2.3v-2.6L2 8.5 4 5l3 .5L9 5Z" />
          <Circle cx={12} cy={12} r={3.5} />
        </>
      )}
      {name === 'friend' && (
        <>
          <Path d="m12 1 3 2 3 .5 1.5 3L22 9v4l-2 3-1 3-4 1-3 3-3-3-4-1-1-3-2-3V9l2.5-2.5 1.5-3L9 3Z" fill={color} stroke="none" />
          <Path d="M12 16.5 7.8 12c-3-3 1-6.1 4.2-3 3.2-3.1 7.2 0 4.2 3Z" fill="white" stroke="none" />
        </>
      )}
      {name === 'verified' && (
        <>
          <Path d="m12 1 3 3h4v4l3 4-3 3v4h-4l-3 3-3-3H5v-4l-3-3 3-4V4h4Z" fill="#437aff" stroke="none" />
          <Path d="m8 12 3 3 5-6" stroke="white" strokeWidth={2} />
        </>
      )}
      {name === 'star' && (
        <Path d="m12 1 2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6Z" fill={color} stroke="none" />
      )}
      {name === 'check' && <Path d="m5 12 4 4L19 6" strokeWidth={2} />}
      {name === 'clap' && (
        <>
          <Path d="m13 7-2-3q-.8-1.5.4-2l1.7 1.5 5.4 6.8.3-2.4q.2-1.6 1.3-1.6 1 0 1 1.6l-.3 7.1q-.1 3.1-2.8 4.9" fill={filled ? color : 'none'} />
          <Path d="m8.6 11-4-5q-1-1.2-1.9-.3-.7.8.2 1.9l5.3 6.5-5.7-4.9q-1.3-.9-2 .1-.6.9.5 1.9l6.1 5.6 2.5 3.3q2.4 3.3 5.8 2.1 3.6-1.3 3.2-5.6l-.6-5.8q-.2-1.4-1.4-1.2-1.1.2-1 1.6l.1 2.2-7.4-9q-1-1.2-1.9-.4-.8.8.1 1.9l5.4 6.7-6.8-7.2q-1.1-1.1-1.9-.2-.7.8.3 1.9Z" fill={filled ? color : 'none'} />
          <Path d="M5 1 4 0M17 2l1-2M21 4l2-1" />
        </>
      )}
    </Svg>
  );
}
