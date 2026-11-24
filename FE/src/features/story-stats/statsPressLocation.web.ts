import type { GestureResponderEvent } from 'react-native';

export function getStatsPressLocation(event: GestureResponderEvent): number {
  const pointer = event.nativeEvent;
  const target = event.currentTarget;
  // SVG 자식의 좌표 대신 그래프 전체 좌표를 쓰고 키보드는 날짜 메뉴로 연결한다.
  if (!(pointer instanceof MouseEvent) || !(target instanceof HTMLElement) || pointer.detail === 0) return NaN;
  return pointer.clientX - target.getBoundingClientRect().left;
}
