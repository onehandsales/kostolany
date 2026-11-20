import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { HighlightProvider } from './HighlightProvider';
import { PassageReader } from './PassageReader';
import { createSelectionDocument } from './selectionDocument';
import type { HighlightSource, HighlightValue } from './types';

const document = createSelectionDocument('article', '기사', '작가', [{ text: '내가 선택할 한국어 문구', selectable: true }]);
const deferred = <T,>() => { let resolve!: (value: T) => void; let reject!: (error: Error) => void; const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };
function tree(source: HighlightSource, userId: string, revision: number) {
  return <SafeAreaProvider><AuthProvider initialUser={mockUserA}><HighlightProvider source={source} userId={userId} revision={revision}>
    <PassageReader document={document}>{renderText => renderText(0)}</PassageReader>
  </HighlightProvider></AuthProvider></SafeAreaProvider>;
}
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
