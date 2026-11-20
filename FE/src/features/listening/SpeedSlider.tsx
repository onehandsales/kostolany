import { useMemo, useState, type ReactNode } from 'react';
import { PanResponder, View } from 'react-native';
import { speedAtFraction } from './listeningOptions';

export type SpeedSliderProps = {
  value: number;
  onChange: (speed: number) => void;
  children: ReactNode;
  disabled?: boolean;
};
export function SpeedSlider({ value, onChange, children, disabled }: SpeedSliderProps) {
  const [height, setHeight] = useState(1);
  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (event) => onChange(speedAtFraction(1 - event.nativeEvent.locationY / height)),
        onPanResponderMove: (event) => onChange(speedAtFraction(1 - event.nativeEvent.locationY / height)),
      }),
    [onChange, height, disabled],
  );
  return (
    <View
      {...responder.panHandlers}
      accessible
      role="slider"
      accessibilityLabel="재생 속도"
      accessibilityState={{ disabled }}
      accessibilityValue={{ min: 0.5, max: 4, now: value, text: `${value}배` }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={({ nativeEvent }) => {
        if (disabled) return;
        if (nativeEvent.actionName === 'increment' || nativeEvent.actionName === 'decrement')
          onChange(Math.max(0.5, Math.min(4, value + (nativeEvent.actionName === 'increment' ? 0.5 : -0.5))));
      }}
      onLayout={(event) => {
        setHeight(Math.max(1, event.nativeEvent.layout.height));
      }}
      style={{ flex: 1, width: 96 }}
    >
      <View pointerEvents="none" style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
}
