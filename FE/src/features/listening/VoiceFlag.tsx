import { useId } from 'react';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import type { ListeningVoice } from './listeningOptions';

export function VoiceFlag({ code }: { code: ListeningVoice['countryCode'] }) {
  const clip = useId();
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" aria-hidden>
      <Defs>
        <ClipPath id={clip}>
          <Circle cx={20} cy={20} r={19.8} />
        </ClipPath>
      </Defs>
      <G clipPath={`url(#${clip})`}>
        <Rect width={40} height={40} fill="#fff" />
        {code === 'US' && (
          <>
            {Array.from({ length: 7 }, (_, index) => (
              <Rect key={index} y={index * 6} width={40} height={3} fill="#c92343" />
            ))}
            <Rect width={17} height={22} fill="#41416d" />
            {Array.from({ length: 15 }, (_, index) => (
              <Circle
                key={index}
                cx={3 + (index % 3) * 5}
                cy={3 + Math.floor(index / 3) * 4}
                r={1.2}
                fill="#fff"
              />
            ))}
          </>
        )}
        {code === 'GB' && (
          <>
            <Rect width={40} height={40} fill="#16257e" />
            <Path d="M0 0 40 40M0 40 40 0" stroke="#fff" strokeWidth={9} />
            <Path d="M0 0 40 40M0 40 40 0" stroke="#cc1835" strokeWidth={3} />
            <Path d="M20 0v40M0 20h40" stroke="#fff" strokeWidth={12} />
            <Path d="M20 0v40M0 20h40" stroke="#cc1835" strokeWidth={7} />
          </>
        )}
        {code === 'DE' && (
          <>
            <Rect width={40} height={14} fill="#191919" />
            <Rect y={14} width={40} height={13} fill="#ed1e0c" />
            <Rect y={27} width={40} height={13} fill="#ffcf00" />
          </>
        )}
        {code === 'IT' && (
          <>
            <Rect width={13.3} height={40} fill="#159f57" />
            <Rect x={26.7} width={13.3} height={40} fill="#dd334b" />
          </>
        )}
        {code === 'KR' && (
          <>
            <Circle cx={20} cy={20} r={9} fill="#d52439" />
            <Path d="M11 20a9 9 0 0 0 18 0c-3 6-6-6-9 0s-6 0-9 0" fill="#1454a0" />
            <Path
              d="m6 10 4-6m0 9 4-6m12 26 4-6m0 9 4-6M6 30l4 6m0-9 4 6m12-26 4 6m0-9 4 6"
              stroke="#444"
              strokeWidth={2}
            />
          </>
        )}
        {code === 'BR' && (
          <>
            <Rect width={40} height={40} fill="#00a438" />
            <Path d="m20 5 16 15-16 15L4 20Z" fill="#ffd517" />
            <Circle cx={20} cy={20} r={9} fill="#003b84" />
            <Path d="M11 16q9 1 18 8" stroke="#fff" strokeWidth={3} />
          </>
        )}
      </G>
      <Circle cx={20} cy={20} r={19.8} stroke="#b9b9b9" strokeWidth={0.3} fill="none" />
    </Svg>
  );
}
