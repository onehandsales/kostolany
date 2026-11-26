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
  | 'select'
  | 'bell'
  | 'write'
  | 'bold'
  | 'italic'
  | 'link'
  | 'keyboard-dismiss'
  | 'minus'
  | 'comment'
  | 'share'
  | 'play'
  | 'pause'
  | 'previous'
  | 'next'
  | 'airplay'
  | 'voice'
  | 'search'
  | 'lock'
  | 'download'
  | 'settings'
  | 'friend'
  | 'verified'
  | 'star'
  | 'check'
  | 'clap'
  | 'shield'
  | 'pin'
  | 'person';
type AppIconProps = { name: AppIconName; size?: number; color?: string; filled?: boolean };

// 박수는 Phosphor의 손뼉 벡터이며 나머지는 원본 PNG 윤곽을 참고한 대체 벡터다.
export function AppIcon({ name, size = 24, color: requestedColor, filled = false }: AppIconProps) {
  const { colors } = useTheme();
  const color = requestedColor ?? colors.text;
  return (
    <Svg
      width={size}
      height={size}
      viewBox={name === 'clap' ? '0 0 256 256' : '0 0 24 24'}
      fill="none"
      stroke={color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      accessible={Platform.OS === 'web' ? undefined : false}
    >
      {name === 'person' && <><Circle cx={12} cy={7} r={4} /><Path d="M4 22v-3a8 8 0 0 1 16 0v3" /></>}
      {name === 'document' && <Path d="M5 2h14v20H5ZM8 6h8M8 10h8M8 14h8M8 18h5" />}
      {name === 'trash' && <Path d="M3 5h18M9 2h6l1 3M5 5l1 17h12l1-17M9 9v9M12 9v9M15 9v9" />}
      {name === 'pin' && <Path d="m14 2 8 8-3 1-5 5-2-2-8 8 7-9-2-2 5-5Z" />}
      {name === 'shield' && <Path d="M12 2 4 5v6c0 5 4 8 8 11 4-3 8-6 8-11V5l-8-3Zm-3 9 2 2 4-5" fill="none" stroke={color} strokeWidth={1.2} />}
      {name === 'back' && <Path d="m14 5-7 7 7 7" />}
      {name === 'chevron' && <Path d="m9 5 7 7-7 7" />}
      {name === 'select' && <Path d="m6 9 6-6 6 6M6 15l6 6 6-6" strokeWidth={2} />}
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
      {name === 'bold' && <Path d="M6 4h7a4 4 0 0 1 0 8H6Zm0 8h8a4 4 0 0 1 0 8H6Z" strokeWidth={2.5} />}
      {name === 'italic' && <Path d="M11 4h8M5 20h8M15 4 9 20" strokeWidth={2} />}
      {name === 'link' && <Path d="m10 14 4-4M8 12l-2 2a3.5 3.5 0 0 0 5 5l3-3a3.5 3.5 0 0 0 0-5M16 12l2-2a3.5 3.5 0 0 0-5-5l-3 3a3.5 3.5 0 0 0 0 5" strokeWidth={1.75} />}
      {name === 'keyboard-dismiss' && <>
        <Rect x={2} y={3} width={20} height={12} rx={2} />
        <Path d="M5 6h1m3 0h1m3 0h1m3 0h1M5 9h1m3 0h1m3 0h1m3 0h1M8 12h8m-7 6 3 3 3-3" />
      </>}
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
      {name === 'pause' && (
        <>
          <Circle cx={12} cy={12} r={9} />
          <Path d="M10 9v6M14 9v6" strokeWidth={1.5} />
        </>
      )}
      {name === 'previous' && <Path d="M4 4v16M20 4 6 12l14 8Z" fill={color} />}
      {name === 'next' && <Path d="M20 4v16M4 4l14 8L4 20Z" fill={color} />}
      {name === 'search' && (
        <>
          <Circle cx={10} cy={10} r={7} />
          <Path d="m15 15 6 6" />
        </>
      )}
      {name === 'airplay' && (
        <>
          <Path d="m12 14-6 8h12Z" fill={color} />
          <Path d="M5 17a9 9 0 1 1 14 0M8 14a5 5 0 1 1 8 0" />
        </>
      )}
      {name === 'voice' && (
        <>
          <Circle cx={11} cy={7} r={4} />
          <Path d="M3 22v-5q0-3 3-3h10q3 0 3 3v5M18 3q3 4 0 8M21 1q4 6 0 12" />
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
        <Path
          fill={color}
          stroke="none"
          d={filled
            ? 'M188.87,65A18,18,0,0,0,157.62,83L133.36,41a18,18,0,0,0-31.22,18L96.4,49A18,18,0,0,0,65.18,67l3.34,5.77A26,26,0,0,0,39.74,111l3,5.2A26,26,0,0,0,23.5,155l35.27,61a80.14,80.14,0,0,0,149.52-39.57A71.92,71.92,0,0,0,210,101.58Zm1.2,127.56A64.12,64.12,0,0,1,72.65,208L37.38,147a10,10,0,0,1,17.34-10L75,172a8,8,0,0,0,13.87-8L53.62,103A10,10,0,0,1,71,93l31.81,55a8,8,0,0,0,13.87-8l-26-45a10,10,0,0,1,17.35-10l36.5,63a8,8,0,0,0,13.87-8l-12.6-21.75A10,10,0,0,1,163.44,109l20.22,35A63.52,63.52,0,0,1,190.07,192.57ZM160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0Zm33.22,6,8-13.1a8,8,0,0,1,13.68,8.33l-8,13.11a8,8,0,0,1-6.84,3.83A8,8,0,0,1,193.44,30Zm45,33.66-15.05,4.85a8.15,8.15,0,0,1-2.46.39,8,8,0,0,1-2.46-15.62l15.06-4.85a8,8,0,1,1,4.91,15.23Z'
            : 'M160.22,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0ZM196.1,41a7.91,7.91,0,0,0,4.17,1.17,8,8,0,0,0,6.84-3.83l8-13.11a8,8,0,0,0-13.68-8.33l-8,13.1A8,8,0,0,0,196.1,41Zm47.51,12.59a8,8,0,0,0-10.08-5.16l-15.06,4.85a8,8,0,0,0,2.46,15.62,8.15,8.15,0,0,0,2.46-.39l15.05-4.85A8,8,0,0,0,243.61,53.55ZM217,97.58a80.22,80.22,0,0,1-10.22,94c-.34,1.73-.72,3.46-1.19,5.18A80.17,80.17,0,0,1,58.77,216L23.5,155a26,26,0,0,1,19.24-38.79l-3-5.2a26,26,0,0,1,19.2-38.78L58.24,71A26,26,0,0,1,95.47,36.53,26.06,26.06,0,0,1,140.3,37l12.26,21.2A26.07,26.07,0,0,1,195.81,61ZM109.07,55l0,0h0l25,43.17a26,26,0,0,1,17.33-10L126.42,45a10,10,0,1,0-17.35,10ZM72.12,63l6.46,11.17a26.05,26.05,0,0,1,17.32-10L89.45,53A10,10,0,1,0,72.12,63Zm111.54,81-20.22-35a10,10,0,0,0-17.74,9.25L158.3,140a8,8,0,0,1-13.87,8l-36.5-63A10,10,0,1,0,90.58,95l26.05,45a8,8,0,0,1-13.87,8L71,93h0l0,0a10,10,0,0,0-17.33,10l35.22,61A8,8,0,0,1,75,172L54.72,137a10,10,0,0,0-17.34,10l35.27,61a64.12,64.12,0,0,0,117.42-15.44A63.52,63.52,0,0,0,183.66,144Zm19.41-38.42L181.93,69A10,10,0,0,0,164.55,79l33,57.05A80.2,80.2,0,0,1,207,161.51,64.23,64.23,0,0,0,203.07,105.58Z'}
        />
      )}
    </Svg>
  );
}
