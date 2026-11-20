import { useRef, type ReactNode } from 'react';
import { Pressable } from 'react-native';
import { formatListeningTime } from './types';

export type ListeningSeekProps = {
  positionSeconds: number;
  durationSeconds: number;
  onSeek: (seconds: number) => void;
  children: ReactNode;
};
export function ListeningSeek({ positionSeconds, durationSeconds, onSeek, children }: ListeningSeekProps) {
  const width = useRef(1);
  return (
    <Pressable
      role="slider"
      accessibilityLabel="재생 위치"
      accessibilityValue={{
        min: 0,
        max: durationSeconds,
        now: Math.floor(positionSeconds),
        text: `${formatListeningTime(positionSeconds)} / ${formatListeningTime(durationSeconds)}`,
      }}
      accessibilityActions={[
        { name: 'increment', label: '30초 앞으로' },
        { name: 'decrement', label: '10초 뒤로' },
      ]}
      onAccessibilityAction={({ nativeEvent }) => {
        if (nativeEvent.actionName === 'increment') onSeek(positionSeconds + 30);
        if (nativeEvent.actionName === 'decrement') onSeek(positionSeconds - 10);
      }}
      disabled={durationSeconds <= 0}
      onLayout={(event) => {
        width.current = event.nativeEvent.layout.width;
      }}
      onPress={(event) =>
        onSeek((event.nativeEvent.locationX / Math.max(1, width.current)) * durationSeconds)
      }
      style={{ height: 48, justifyContent: 'center' }}
    >
      {children}
    </Pressable>
  );
}
