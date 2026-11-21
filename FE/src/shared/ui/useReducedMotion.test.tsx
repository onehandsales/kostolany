import { act, render, screen } from '@testing-library/react-native';
import { AccessibilityInfo, Text } from 'react-native';
import { useReducedMotion } from './useReducedMotion';

function Probe() {
  return <Text>{useReducedMotion() ? 'reduced' : 'animated'}</Text>;
}
it('감소 설정 변경을 늦은 최초 조회가 덮지 않고 unmount 때 OS 구독을 해제한다', async () => {
  let resolve!: (value: boolean) => void;
  let change!: (value: boolean) => void;
  const remove = jest.fn();
  const read = jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockImplementation(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
  );
  // RN의 선언 오버로드 중 이 hook이 사용하는 boolean 변경 이벤트 경계만 지정한다.
  const events: {
    addEventListener(name: 'reduceMotionChanged', listener: (value: boolean) => void): { remove(): void };
  } = AccessibilityInfo;
  const subscribe = jest.spyOn(events, 'addEventListener').mockImplementation((_name, listener) => {
    change = listener;
    return { remove };
  });
  try {
    const view = await render(<Probe />);
    expect(screen.getByText('reduced')).toBeOnTheScreen();
    await act(async () => change(true));
    await act(async () => resolve(false));
    expect(screen.getByText('reduced')).toBeOnTheScreen();
    await act(async () => change(false));
    expect(screen.getByText('animated')).toBeOnTheScreen();
    await view.unmount();
    expect(remove).toHaveBeenCalledTimes(1);
  } finally {
    read.mockRestore();
    subscribe.mockRestore();
  }
});
