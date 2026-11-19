import { Platform } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type ProviderName = 'Google' | 'Facebook' | 'Apple' | 'X' | 'Email';

export function ProviderIcon({ provider, size = 20 }: { provider: ProviderName; size?: number }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      accessible={Platform.OS === 'web' ? undefined : false}
    >
      {provider === 'Google' && (
        <>
          <Path
            fill="#4285f4"
            d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.8C21.9 18.8 23 15.9 23 12.3"
          />
          <Path
            fill="#34a853"
            d="M12 23c3.1 0 5.8-1 7.7-2.2l-3.8-2.9c-1 .7-2.3 1-3.9 1-3 0-5.6-2-6.5-4.7H1.6v3C3.5 20.8 7.4 23 12 23"
          />
          <Path fill="#fbbc05" d="M5.5 14.2a7 7 0 0 1 0-4.4v-3H1.6a11 11 0 0 0 0 10.4Z" />
          <Path
            fill="#ea4335"
            d="M12 5.1c1.7 0 3.2.6 4.4 1.7l3.3-3.2C17.7 1.8 15.1 1 12 1 7.4 1 3.5 3.2 1.6 6.8l3.9 3C6.4 7.1 9 5.1 12 5.1"
          />
        </>
      )}
      {provider === 'Facebook' && (
        <>
          <Circle cx={12} cy={12} r={12} fill="#1877f2" />
          <Path
            fill="white"
            d="M14 24V14h3l.5-4H14V8c0-1.2.4-2 2-2h2V2.5a20 20 0 0 0-3-.2c-3 0-5 1.8-5 5V10H7v4h3v10Z"
          />
        </>
      )}
      {provider === 'Apple' && (
        <Path
          fill="black"
          d="M17 1c.2 2-1.3 4-3 4.2-.3-1.8 1.2-3.9 3-4.2M20.7 17.6c-.6 1.4-.9 2-1.7 3.2-1 1.4-2.4 3.2-4 3.2-1.4 0-1.8-.9-3.8-.9-1.9 0-2.4.9-3.8.9-1.6 0-2.8-1.6-3.8-3-2.8-4-3.2-9.2-1.5-11.9 1.2-1.9 3-3 4.8-3 1.7 0 2.8.9 4.2.9 1.4 0 2.3-.9 4.2-.9 1.6 0 3.4.9 4.6 2.4-4 2.2-3.4 7.3.8 9.1Z"
        />
      )}
      {provider === 'X' && (
        <Path fill="none" stroke="#242424" strokeWidth={1.2} d="M3 2h4l14 20h-4ZM20 2 4 22" />
      )}
      {provider === 'Email' && (
        <>
          <Rect x={2} y={4} width={20} height={16} rx={1} fill="none" stroke="black" strokeWidth={1.2} />
          <Path d="m2 6 10 7L22 6" fill="none" stroke="black" strokeWidth={1.2} />
        </>
      )}
    </Svg>
  );
}
