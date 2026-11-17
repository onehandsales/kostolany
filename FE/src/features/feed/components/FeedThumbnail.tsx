import Svg, { Circle, Path, Rect } from 'react-native-svg';

export function FeedThumbnail({ variant }: { variant: 'city' | 'coins' }) {
  return (
    <Svg width={80} height={64} viewBox="0 0 80 64" aria-hidden accessible={false}>
      <Rect width={80} height={64} rx={2} fill={variant === 'city' ? '#e6ece7' : '#eee7db'} />
      {variant === 'city' ? (
        <>
          <Path d="M10 55V27H29V55M32 55V11H53V55M57 55V33H70V55" fill="#53675c" />
          <Path d="M38 19H47M38 27H47M38 35H47M16 35H23M16 43H23M62 41H66" stroke="#d4dfd7" strokeWidth={3} />
          <Path d="M6 56H74" stroke="#314f3d" strokeWidth={2} />
        </>
      ) : (
        <>
          <Rect x={12} y={32} width={29} height={21} rx={5} fill="#8a7047" />
          <Path d="M14 39H39M14 46H39" stroke="#dfca9f" strokeWidth={2} />
          <Circle cx={51} cy={29} r={18} fill="#c7a76c" stroke="#8a7047" strokeWidth={2} />
          <Circle cx={51} cy={29} r={12} fill="none" stroke="#eee7db" strokeWidth={1.5} />
          <Path d="M51 21V37M47 24H53Q58 27 51 29Q44 32 49 34H55" stroke="#79603a" strokeWidth={2} fill="none" />
        </>
      )}
    </Svg>
  );
}
