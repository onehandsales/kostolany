import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../shared/theme/ThemeProvider';

export function ShareActionIcon({ kind }: { kind: 'copy' | 'friend' | 'via' | 'image' }) {
  const { colors } = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.text}
      strokeWidth={1.3}
      aria-hidden
    >
      {kind === 'image' ? (
        <>
          <Circle cx={12} cy={12} r={10} />
          <Path d="M12 5v13m-5-5 5 5 5-5" />
        </>
      ) : kind === 'via' ? (
        <Path d="M8 8H4v13h16V8h-4M12 15V2m-4 4 4-4 4 4" />
      ) : (
        <>
          <Path d="m10 14 4-4m-7 2-2 2a4 4 0 0 0 6 6l3-3m-4-10 3-3a4 4 0 0 1 6 6l-2 2" />
          {kind === 'friend' && <Path d="m16 22-4-4c-3-3 1-6 4-3 3-3 7 0 4 3Z" fill={colors.background} />}
        </>
      )}
    </Svg>
  );
}
