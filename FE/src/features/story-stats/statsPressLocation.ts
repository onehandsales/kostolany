import type { GestureResponderEvent } from 'react-native';

export function getStatsPressLocation(event: GestureResponderEvent): number {
  return event.nativeEvent.locationX;
}
