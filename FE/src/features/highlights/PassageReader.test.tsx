import { act, fireEvent, render, screen, userEvent, waitFor, within } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { HighlightProvider } from './HighlightProvider';
import { PassageReader } from './PassageReader';
import { createSelectionDocument, type SelectionDocument } from './selectionDocument';
import { colors } from '../../shared/theme/tokens';
import type { HighlightCommand, HighlightSource, HighlightValue } from './types';
import { highlightId } from './types';

const document = createSelectionDocument('article', '기사', '작가', [{ text: '내가 선택할 한국어 문구', selectable: true }]);
const deferred = <T,>() => { let resolve!: (value: T) => void; let reject!: (error: Error) => void; const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };
function tree(source: HighlightSource, userId: string, revision: number, content: SelectionDocument = document, active = true) {
  return <SafeAreaProvider><AuthProvider initialUser={mockUserA}><HighlightProvider source={source} userId={userId} revision={revision}>
    <PassageReader document={content} active={active}>{renderText => content.blocks.map((_block, index) => renderText(index, undefined, '한국어'))}</PassageReader>
  </HighlightProvider></AuthProvider></SafeAreaProvider>;
}
it('본문 문단에서 선택 범위를 바꾸고 Done 없이 저장하며 취소 후 원문을 유지한다', async () => {
  const set = jest.fn(async (userId: string, command: HighlightCommand) => ({ userId, version: 1, highlights: [command.highlight] }));
  const source: HighlightSource = { read: async userId => ({ userId, version: 0, highlights: [] }), set };
  const user = userEvent.setup(); await render(tree(source, 'A', 1));
  await fireEvent(screen.getByText(document.text), 'longPress');
  expect(screen.queryByLabelText('선택할 원문')).toBeNull();
  expect(screen.queryByRole('button', { name: '문구 선택 Done' })).toBeNull();
  const input = screen.getByLabelText('본문 안 문구 선택');
  expect(input.props.showSoftInputOnFocus).toBe(false);
  await fireEvent(input, 'selectionChange', { nativeEvent: { selection: { start: 3, end: 6 } } });
  await user.press(screen.getByRole('button', { name: 'Highlight' }));
  await waitFor(() => expect(screen.queryByLabelText('본문 안 문구 선택')).toBeNull());
  expect(set).toHaveBeenCalledWith('A', expect.objectContaining({ highlight: expect.objectContaining({ start: 3, end: 6, text: document.text.slice(3, 6) }) }));
  await fireEvent(screen.getByLabelText(`내 하이라이트: ${document.text.slice(3, 6)}`), 'longPress');
  await user.press(screen.getByRole('button', { name: '문구 선택 취소' }));
  expect(screen.queryByLabelText('문구 선택 메뉴')).toBeNull();
  expect(set).toHaveBeenCalledTimes(1);
});
it('본문 선택 중 문서 A→B→A·화면 이탈·계정 전환은 이전 선택을 복구하지 않는다', async () => {
  const source: HighlightSource = { read: async userId => ({ userId, version: 0, highlights: [] }), set: async () => { throw new Error('unused'); } };
  const changed = createSelectionDocument(document.articleId, document.title, document.author, [{ text: '수정한 본문', selectable: true }]);
  const view = await render(tree(source, 'A', 1));
  await fireEvent(screen.getByText(document.text), 'longPress');
  await view.rerender(tree(source, 'A', 1, changed));
  await view.rerender(tree(source, 'A', 1));
  expect(screen.queryByLabelText('본문 안 문구 선택')).toBeNull();
  await fireEvent(screen.getByText(document.text), 'longPress');
  await view.rerender(tree(source, 'A', 1, document, false));
  await view.rerender(tree(source, 'A', 1));
  expect(screen.queryByLabelText('문구 선택 메뉴')).toBeNull();
  await fireEvent(screen.getByText(document.text), 'longPress');
  await view.rerender(tree(source, 'B', 2));
  await view.rerender(tree(source, 'A', 3));
  expect(screen.queryByLabelText('본문 안 문구 선택')).toBeNull();
});
it('문단 밖 좌표·이모지 반쪽·입력 변조는 선택을 해제하고 원문만 유지한다', async () => {
  const content = createSelectionDocument('article', '기사', '작가', [
    { text: '첫 문단', selectable: true }, { text: '한글🥳 문단', selectable: true },
  ]);
  const set = jest.fn();
  const source: HighlightSource = { read: async userId => ({ userId, version: 0, highlights: [] }), set };
  await render(tree(source, 'A', 1, content));
  await fireEvent(screen.getByText('한글🥳 문단'), 'longPress');
  const input = screen.getByLabelText('본문 안 문구 선택');
  for (const range of [{ start: -2, end: 2 }, { start: 2, end: 3 }, { start: 0, end: 30 },
    { start: 2, end: 2 }, { start: 4, end: 2 }, { start: 0.5, end: 2 }]) {
    await fireEvent(input, 'selectionChange', { nativeEvent: { selection: range } });
    expect(screen.queryByRole('button', { name: 'Highlight' })).toBeNull();
  }
  await fireEvent(input, 'selectionChange', { nativeEvent: { selection: { start: 2, end: 4 } } });
  expect(screen.getByRole('button', { name: 'Highlight' })).toBeVisible();
  await fireEvent.changeText(input, '변조');
  expect(screen.queryByLabelText('본문 안 문구 선택')).toBeNull();
  expect(screen.getByText('한글🥳 문단')).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Highlight' })).toBeNull();
  expect(set).not.toHaveBeenCalled();
});
it('선택 중 개인·타인 강조를 유지하고 입력 변조 뒤에도 원문과 강조를 복구한다', async () => {
  const passage = { articleId: document.articleId, version: document.version, start: 0, end: 2, text: '내가' };
  const own = { ...passage, id: highlightId(passage), title: document.title,
    author: document.author, createdAt: '2026-11-24T00:00:00.000Z' };
  const set = jest.fn();
  const source: HighlightSource = { read: async userId => ({ userId, version: 0, highlights: [own] }), set };
  await render(tree(source, 'A', 1));
  await screen.findByLabelText('내 하이라이트: 내가');
  await fireEvent(screen.getByLabelText('내 하이라이트: 내가'), 'longPress');
  const input = screen.getByLabelText('본문 안 문구 선택');
  expect(within(input).getByText('내가')).toHaveStyle({ backgroundColor: colors.ownHighlight });
  expect(within(input).getByText('한국어')).toHaveStyle({ backgroundColor: colors.highlight });
  expect(input.props.value).toBeUndefined();
  const lateSelection = input.props.onSelectionChange;
  await fireEvent.changeText(input, '변조된 본문');
  await act(async () => { lateSelection({ nativeEvent: { selection: { start: 0, end: 2 } } }); });
  expect(screen.getByLabelText('내 하이라이트: 내가')).toBeVisible();
  expect(screen.queryByLabelText('문구 선택 메뉴')).toBeNull();
  expect(set).not.toHaveBeenCalled();
});
it('본문 안 선택을 저장하는 중 새 범위로 이동하면 늦은 실패가 새 메뉴를 덮지 않는다', async () => {
  const pending = deferred<HighlightValue>();
  const source: HighlightSource = { read: async userId => ({ userId, version: 0, highlights: [] }), set: () => pending.promise };
  const user = userEvent.setup(); await render(tree(source, 'A', 1));
  await fireEvent(screen.getByText(document.text), 'longPress');
  const input = screen.getByLabelText('본문 안 문구 선택');
  await fireEvent(input, 'selectionChange', { nativeEvent: { selection: { start: 0, end: 5 } } });
  await user.press(screen.getByRole('button', { name: 'Highlight' }));
  await fireEvent(input, 'selectionChange', { nativeEvent: { selection: { start: 6, end: 10 } } });
  await act(async () => { pending.reject(new Error('old-selection')); });
  expect(screen.queryByRole('button', { name: '하이라이트 저장 다시 시도' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Highlight' })).not.toBeDisabled();
  expect(input.props.selection).toEqual({ start: 6, end: 10 });
});
it('여러 문단 선택 대체 화면은 한글과 이모지의 전역 범위를 저장한다', async () => {
  const content = createSelectionDocument('article', '기사', '작가', [
    { text: '첫 한글🥳', selectable: true }, { text: '다음 문단', selectable: true },
  ]);
  const set = jest.fn(async (userId: string, command: HighlightCommand) => ({ userId, version: 1, highlights: [command.highlight] }));
  const source: HighlightSource = { read: async userId => ({ userId, version: 0, highlights: [] }), set };
  const user = userEvent.setup(); await render(tree(source, 'A', 1, content));
  await fireEvent(screen.getByText('첫 한글🥳'), 'longPress');
  await user.press(screen.getByRole('button', { name: '기사 문구 선택' }));
  expect(screen.queryByLabelText('본문 안 문구 선택')).toBeNull();
  await fireEvent(screen.getByLabelText('선택할 원문'), 'selectionChange', { nativeEvent: { selection: { start: 2, end: content.text.length } } });
  await user.press(screen.getByRole('button', { name: '문구 선택 Done' }));
  await user.press(screen.getByRole('button', { name: 'Highlight' }));
  await waitFor(() => expect(set).toHaveBeenCalledWith('A', expect.objectContaining({ highlight: expect.objectContaining({
    start: 2, end: content.text.length, text: '한글🥳\n\n다음 문단',
  }) })));
});
it.each(['success', 'failure'] as const)('A의 늦은 %s를 B 및 같은 A 새 세션의 메뉴·오류와 격리한다', async mode => {
  const pending = deferred<HighlightValue>();
  let saved: HighlightValue | null = null;
  const source: HighlightSource = { read: async userId => ({ userId, version: 0, highlights: [] }), set: (userId, command) => {
    saved = { userId, version: 1, highlights: [command.highlight] }; return pending.promise;
  } };
  const user = userEvent.setup();
  const view = await render(tree(source, 'A', 1));
  await user.press(screen.getByRole('button', { name: '기사 문구 선택' }));
  await fireEvent(screen.getByLabelText('선택할 원문'), 'selectionChange', { nativeEvent: { selection: { start: 0, end: 5 } } });
  await user.press(screen.getByRole('button', { name: '문구 선택 Done' }));
  await user.press(screen.getByRole('button', { name: 'Highlight' }));
  await view.rerender(tree(source, 'B', 2));
  expect(screen.queryByLabelText('문구 선택 메뉴')).toBeNull();
  await act(async () => { if (mode === 'success') pending.resolve(saved!); else pending.reject(new Error('old A failure')); });
  expect(screen.queryByLabelText(/^내 하이라이트:/)).toBeNull();
  expect(screen.queryByRole('alert')).toBeNull();
  await view.rerender(tree(source, 'A', 3));
  if (mode === 'success') await screen.findByLabelText('내 하이라이트: 내가 선택');
  else expect(screen.queryByRole('alert')).toBeNull();
  await user.press(screen.getByRole('button', { name: '기사 문구 선택' }));
  await view.rerender(tree(source, 'A', 4));
  expect(screen.queryByLabelText('선택할 원문')).toBeNull();
  expect(screen.queryByLabelText('문구 선택 메뉴')).toBeNull();
});
it('저장 중 선택 취소 후 새 선택을 이전 완료가 닫지 않는다', async () => {
  const pending = deferred<HighlightValue>(); let saved: HighlightValue | null = null;
  const source: HighlightSource = { read: async userId => ({ userId, version: 0, highlights: [] }), set: (userId, command) => {
    saved = { userId, version: 1, highlights: [command.highlight] }; return pending.promise;
  } };
  const user = userEvent.setup(); await render(tree(source, 'A', 1));
  async function select(start: number, end: number) {
    await user.press(screen.getByRole('button', { name: '기사 문구 선택' }));
    await fireEvent(screen.getByLabelText('선택할 원문'), 'selectionChange', { nativeEvent: { selection: { start, end } } });
    await user.press(screen.getByRole('button', { name: '문구 선택 Done' }));
  }
  await select(0, 5); await user.press(screen.getByRole('button', { name: 'Highlight' }));
  await user.press(screen.getByRole('button', { name: '문구 선택 취소' })); await select(6, 10);
  await act(async () => { pending.resolve(saved!); });
  await waitFor(() => expect(screen.getByRole('button', { name: 'Highlight' })).not.toBeDisabled());
  expect(screen.getByLabelText('문구 선택 메뉴')).toBeVisible();
});

it.each(['success', 'failure'] as const)('A→B→A의 새 조회를 이전 A 조회 %s와 구분한다', async mode => {
  const previous = deferred<HighlightValue>();
  let readsA = 0;
  const source: HighlightSource = {
    read: async userId => {
      if (userId === 'A' && ++readsA === 1) return previous.promise;
      return { userId, version: 2, highlights: [] };
    },
    set: async () => { throw new Error('unused'); },
  };
  const view = await render(tree(source, 'A', 1));
  await view.rerender(tree(source, 'B', 2));
  await view.rerender(tree(source, 'A', 3));
  await waitFor(() => expect(readsA).toBe(2));
  await act(async () => {
    if (mode === 'success') previous.resolve({ userId: 'A', version: 1, highlights: [] });
    else previous.reject(new Error('old-read'));
  });
  expect(screen.queryByRole('button', { name: '하이라이트 불러오기 다시 시도' })).toBeNull();
  await view.rerender(tree(source, 'A', 4));
  expect(readsA).toBe(2);
  expect(screen.queryByRole('button', { name: '하이라이트 불러오기 다시 시도' })).toBeNull();
});
