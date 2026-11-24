import { useRef, type ReactNode } from 'react';
import { Pressable } from 'react-native';
import { formatListeningTime } from './types';

export type ListeningSeekProps = {
  positionSeconds: number;
  durationSeconds: number;
  onSeek: (seconds: number) => void;
  onSkip: (seconds: number) => void;
  children: ReactNode;
};
export function ListeningSeek({ positionSeconds, durationSeconds, onSeek, onSkip, children }: ListeningSeekProps) {
  const width = useRef(1);
  return (
    <Pressable
      role="slider"
      accessibilityLabel="재생 위치"
      accessibilityState={{ disabled: durationSeconds <= 0 }}
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
        if (durationSeconds <= 0) return;
        if (nativeEvent.actionName === 'increment') onSkip(30);
        if (nativeEvent.actionName === 'decrement') onSkip(-10);
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
