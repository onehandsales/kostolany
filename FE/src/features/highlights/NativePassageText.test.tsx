import { act, fireEvent, render, screen, within } from '@testing-library/react-native';
import { useState } from 'react';
import { Dimensions, Platform, Pressable, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NativePassageText } from './NativePassageText';
import { SelectionMenuHost } from './SelectionMenuHost';
import { createSelectionDocument } from './selectionDocument';

beforeEach(() => jest.useFakeTimers());
afterEach(() => { jest.restoreAllMocks(); jest.useRealTimers(); });

it('메뉴와 문단 터치는 선택을 유지하고 바깥 터치로 닫아도 같은 본문 입력을 유지한다', async () => {
  const document = createSelectionDocument('article', '기사', '작가', [{ text: '한글 선택 문단', selectable: true }]);
  function Reader() {
    const [selected, setSelected] = useState(false);
    return <SafeAreaProvider><SelectionMenuHost><Text>선택 바깥</Text><NativePassageText document={document} index={0} highlights={[]}
      selecting={selected} initialSelection={{ start: 0, end: 0 }} onSelect={passage => setSelected(Boolean(passage))}
      onClose={() => setSelected(false)} menu={<Text>Selection actions</Text>} /></SelectionMenuHost></SafeAreaProvider>;
  }
  await render(<Reader />);
  const input = screen.getByLabelText(document.text);
  await fireEvent(input, 'focus');
  await fireEvent(input, 'selectionChange', { nativeEvent: { selection: { start: 3, end: 5 } } });
  expect(screen.getByLabelText('본문 안 문구 선택')).toBe(input);
  expect(input.props.contextMenuHidden).toBe(Platform.OS !== 'android');
  expect(screen.getByText('Selection actions')).toBeOnTheScreen();
  expect(screen.queryByText('Cancel')).toBeNull();
  const stopPropagation = jest.fn();
  await fireEvent(screen.getByText('Selection actions'), 'touchStart', { stopPropagation });
  await fireEvent(input, 'touchStart', { stopPropagation, nativeEvent: { pageX: 80, pageY: 300 } });
  expect(stopPropagation).toHaveBeenCalledTimes(2);
  expect(screen.getByText('Selection actions')).toBeOnTheScreen();
  await fireEvent(screen.getByText('선택 바깥'), 'touchStart');
  expect(screen.getByLabelText(document.text)).toBe(input);
  expect(screen.queryByText('Selection actions')).toBeNull();
});

it('짧은 탭과 접근성 동작으로만 링크를 열고 선택과 드래그에는 반응하지 않는다', async () => {
  const document = createSelectionDocument('article', '기사', '작가', [{ text: '본문 링크 문단', selectable: true }]);
  const open = jest.fn();
  await render(<NativePassageText document={document} index={0} highlights={[]} selecting={false}
    initialSelection={{ start: 0, end: 0 }} onSelect={() => {}} onClose={() => {}} menu={null}
    actions={[{ start: 3, end: 5, label: '링크 열기', onPress: open }]} />);
  const input = screen.getByLabelText(document.text);
  const start = () => fireEvent(input, 'touchStart', { nativeEvent: { pageX: 80, pageY: 300 } });
  const select = (start: number, end = start) => fireEvent(input, 'selectionChange', { nativeEvent: { selection: { start, end } } });
  const end = async () => { await fireEvent(input, 'touchEnd'); await act(async () => { await jest.advanceTimersByTimeAsync(32); }); };
  await start(); await select(4); await end();
  expect(open).toHaveBeenCalledTimes(1);
  open.mockClear();
  await start(); await select(4); await act(async () => { await jest.advanceTimersByTimeAsync(600); }); await end();
  await start(); await select(4); await fireEvent(input, 'touchMove', { nativeEvent: { pageX: 80, pageY: 340 } }); await end();
  await start(); await select(3, 5); await end();
  await start(); await select(0); await end();
  expect(open).not.toHaveBeenCalled();
  await fireEvent(input, 'accessibilityAction', { nativeEvent: { actionName: 'link-0' } });
  expect(open).toHaveBeenCalledTimes(1);
});

it('원문 변조 후 입력을 복구하고 이전 입력의 늦은 선택 이벤트를 무시한다', async () => {
  const document = createSelectionDocument('article', '기사', '작가', [{ text: '바뀌지 않는 원문', selectable: true }]);
  const select = jest.fn(); const close = jest.fn();
  await render(<NativePassageText document={document} index={0} highlights={[]} selecting={false}
    initialSelection={{ start: 0, end: 0 }} onSelect={select} onClose={close} menu={null} />);
  const input = screen.getByLabelText(document.text);
  const lateSelection = input.props.onSelectionChange;
  await fireEvent(input, 'focus');
  await fireEvent.changeText(input, '붙여넣거나 잘라낸 내용');
  const restored = screen.getByLabelText(document.text);
  expect(restored).not.toBe(input);
  expect(within(restored).getByText(document.text)).toBeOnTheScreen();
  await act(async () => { lateSelection({ nativeEvent: { selection: { start: 0, end: 3 } } }); });
  expect(select).not.toHaveBeenCalled();
  expect(close).toHaveBeenCalledTimes(1);
});

it('선택 범위가 커서로 접히면 별도 취소 버튼 없이 원문 읽기에 복귀한다', async () => {
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
  expect(screen.queryByText('Cancel')).toBeNull();
  expect(screen.getByText('원문 읽기')).toBeOnTheScreen();
  expect(screen.queryByLabelText('본문 안 문구 선택')).toBeNull();
});

it('메뉴를 본문 밖에 표시하고 실측 문단 이동을 따라가며 화면 밖에서는 숨긴다', async () => {
  let y = 300;
  const gap = Platform.OS === 'android' ? 56 * Math.max(1, Dimensions.get('window').fontScale) : 0;
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
  expect(menu()).toHaveStyle({ position: 'absolute', top: 244 - gap });
  y = 240;
  await act(async () => { await jest.advanceTimersByTimeAsync(120); });
  expect(menu()).toHaveStyle({ top: 184 - gap });
  y = -100;
  await act(async () => { await jest.advanceTimersByTimeAsync(120); });
  expect(screen.queryByRole('button', { name: '검증용 Highlight' })).toBeNull();
  y = 240;
  await act(async () => { await jest.advanceTimersByTimeAsync(120); });
  await fireEvent(input, 'accessibilityAction', { nativeEvent: { actionName: 'dismissSelection' } });
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
