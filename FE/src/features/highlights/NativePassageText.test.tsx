import { act, fireEvent, render, screen, within } from '@testing-library/react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NativePassageText } from './NativePassageText';
import { SelectionMenuHost } from './SelectionMenuHost';
import { createSelectionDocument } from './selectionDocument';

beforeEach(() => jest.useFakeTimers());
afterEach(() => { jest.restoreAllMocks(); jest.useRealTimers(); });

it('선택을 커서로 접어 행동 메뉴가 사라져도 취소로 원문 읽기에 복귀할 수 있다', async () => {
  jest.spyOn(View.prototype, 'measureInWindow').mockImplementation(callback => callback(20, 300, 300, 60));
  const document = createSelectionDocument('article', '기사', '작가', [{ text: '선택 원문', selectable: true }]);
  function Reader() {
    const [active, setActive] = useState(true);
    const [selected, setSelected] = useState(true);
    return <SafeAreaProvider><SelectionMenuHost>{active
      ? <NativePassageText document={document} index={0} highlights={[]} initialSelection={{ start: 0, end: 2 }}
        onSelect={passage => setSelected(Boolean(passage))} onClose={() => setActive(false)}
        menu={selected ? <Text>선택 동작</Text> : null} />
      : <Text>원문 읽기</Text>
    }</SelectionMenuHost></SafeAreaProvider>;
  }
  await render(<Reader />);
  await fireEvent(screen.getByLabelText('본문 안 문구 선택'), 'selectionChange', { nativeEvent: { selection: { start: 2, end: 2 } } });
  expect(screen.queryByText('선택 동작')).toBeNull();
  await fireEvent.press(screen.getByRole('button', { name: '문구 선택 취소' }));
  expect(screen.getByText('원문 읽기')).toBeOnTheScreen();
  expect(screen.queryByLabelText('본문 안 문구 선택')).toBeNull();
});

it('메뉴를 본문 밖에 표시하고 실측 문단 이동을 따라가며 화면 밖에서는 숨긴다', async () => {
  let y = 300;
  const measure = jest.spyOn(View.prototype, 'measureInWindow').mockImplementation(callback => callback(20, y, 300, 60));
  const close = jest.fn();
  const document = createSelectionDocument('article', '기사', '작가', [{ text: '첫 줄\n둘째 줄', selectable: true }]);
  const view = await render(<SafeAreaProvider><SelectionMenuHost>
    <NativePassageText document={document} index={0} highlights={[]} initialHeightDp={60}
      initialSelection={{ start: 0, end: 3 }} onSelect={() => {}} onClose={close}
      menu={<Pressable role="button" accessibilityLabel="검증용 Highlight"><Text>Highlight</Text></Pressable>} />
  </SelectionMenuHost></SafeAreaProvider>);
  const input = screen.getByLabelText('본문 안 문구 선택');
  expect(input).toHaveStyle({ height: 60 });
  expect(within(input.parent!).queryByRole('button', { name: '검증용 Highlight' })).toBeNull();
  const menu = () => screen.getByRole('button', { name: '검증용 Highlight' }).parent?.parent?.parent;
  expect(menu()).toHaveStyle({ position: 'absolute', top: 196 });
  y = 240;
  await act(async () => { await jest.advanceTimersByTimeAsync(120); });
  expect(menu()).toHaveStyle({ top: 136 });
  y = -100;
  await act(async () => { await jest.advanceTimersByTimeAsync(120); });
  expect(screen.queryByRole('button', { name: '검증용 Highlight' })).toBeNull();
  y = 240;
  await act(async () => { await jest.advanceTimersByTimeAsync(120); });
  await fireEvent.press(screen.getByRole('button', { name: '문구 선택 취소' }));
  expect(close).toHaveBeenCalledTimes(1);
  await view.unmount();
  const calls = measure.mock.calls.length;
  await act(async () => { await jest.advanceTimersByTimeAsync(1000); });
  expect(measure).toHaveBeenCalledTimes(calls);
});

it('문단 선택을 닫은 뒤 늦게 도착한 위치 측정은 메뉴를 복원하지 않는다', async () => {
  let finish: ((x: number, y: number, width: number, height: number) => void) | undefined;
  jest.spyOn(View.prototype, 'measureInWindow').mockImplementation(callback => { finish = callback; });
  const document = createSelectionDocument('article', '기사', '작가', [{ text: '선택 원문', selectable: true }]);
  const tree = (active: boolean) => <SafeAreaProvider><SelectionMenuHost>{active &&
    <NativePassageText document={document} index={0} highlights={[]} initialSelection={{ start: 0, end: 2 }}
      onSelect={() => {}} onClose={() => {}} menu={<Text>선택 동작</Text>} />
  }</SelectionMenuHost></SafeAreaProvider>;
  const view = await render(tree(true));
  const late = finish;
  expect(late).toBeDefined();
  await view.rerender(tree(false));
  await act(async () => { late?.(20, 300, 300, 60); });
  expect(screen.queryByText('선택 동작')).toBeNull();
});
