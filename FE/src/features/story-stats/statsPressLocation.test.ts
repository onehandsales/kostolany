/** @jest-environment jsdom */
import type { GestureResponderEvent } from 'react-native';
import { getStatsPressLocation } from './statsPressLocation.web';

it('웹 그래프의 SVG 자식 클릭은 부모 좌표를 사용하고 키보드는 날짜 메뉴로 연결한다', () => {
  const chart = document.createElement('div');
  const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  chart.appendChild(point);
  chart.getBoundingClientRect = () => ({ left: 24 } as DOMRect);
  // RN Web의 마우스 경계만 재현하며 실제 navigation은 별도 통합 검증을 사용한다.
  const event = (detail: number) => ({ currentTarget: chart, target: point,
    nativeEvent: new MouseEvent('click', { clientX: 342, detail }),
  } as unknown as GestureResponderEvent);
  expect(getStatsPressLocation(event(1))).toBe(318);
  expect(getStatsPressLocation(event(0))).toBeNaN();
});
