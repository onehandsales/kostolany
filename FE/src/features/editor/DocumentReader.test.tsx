import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';

import { DocumentReader } from './DocumentReader';
import { changeBody, emptyEditor, type EditorDocument } from './editorModel';
import { createMockEditorImageSource } from './imageSource';

const document: EditorDocument = { ...changeBody(emptyEditor(), '첫 링크 둘째 링크').document,
  marks: [{ kind: 'link', start: 0, end: 4, url: 'https://example.com/first' }, { kind: 'link', start: 5, end: 10, url: 'https://example.com/second' }] };
const images = createMockEditorImageSource();
function pending() {
  let resolve!: () => void; let reject!: (error: Error) => void;
  const promise = new Promise<void>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
afterEach(() => jest.restoreAllMocks());

it('두 번째 성공 뒤 첫 실패를 버리고 최신 실패만 재시도한다', async () => {
  const first = pending(); const second = pending();
  const open = jest.spyOn(Linking, 'openURL').mockImplementationOnce(() => first.promise).mockImplementationOnce(() => second.promise).mockRejectedValueOnce(new Error('latest')).mockResolvedValue(undefined);
  await render(<DocumentReader document={document} images={images} />);
  await fireEvent.press(screen.getByRole('link', { name: '첫 링크' }));
  await fireEvent.press(screen.getByRole('link', { name: '둘째 링크' }));
  await act(async () => second.resolve()); await act(async () => first.reject(new Error('old')));
  expect(screen.queryByRole('alert')).toBeNull();
  await fireEvent.press(screen.getByRole('link', { name: '둘째 링크' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('링크를 열지 못했어요.');
  await fireEvent.press(screen.getByRole('button', { name: '본문 링크 다시 열기' }));
  expect(open).toHaveBeenLastCalledWith('https://example.com/second');
  expect(screen.queryByRole('alert')).toBeNull();
});

it('오래된 성공은 최신 실패를 지우지 않으며 중복 재시도는 마지막 결과만 반영한다', async () => {
  const old = pending(); const retry = pending();
  jest.spyOn(Linking, 'openURL').mockImplementationOnce(() => old.promise).mockRejectedValueOnce(new Error('new')).mockImplementationOnce(() => retry.promise).mockResolvedValue(undefined);
  await render(<DocumentReader document={document} images={images} />);
  await fireEvent.press(screen.getByRole('link', { name: '첫 링크' }));
  await fireEvent.press(screen.getByRole('link', { name: '둘째 링크' }));
  await act(async () => old.resolve()); expect(screen.getByRole('alert')).toBeVisible();
  await fireEvent.press(screen.getByRole('button', { name: '본문 링크 다시 열기' }));
  await fireEvent.press(screen.getByRole('link', { name: '둘째 링크' }));
  await act(async () => retry.reject(new Error('old retry'))); expect(screen.queryByRole('alert')).toBeNull();
});

it.each(['document', 'source', 'focus', 'unmount'] as const)('%s 수명을 떠난 요청은 A로 돌아와도 실패를 노출하지 않는다', async kind => {
  const old = pending(); jest.spyOn(Linking, 'openURL').mockImplementationOnce(() => old.promise).mockResolvedValue(undefined);
  const tree = (next = document, source = images, active = true) => <DocumentReader document={next} images={source} active={active} />;
  const view = await render(tree()); await fireEvent.press(screen.getByRole('link', { name: '첫 링크' }));
  if (kind === 'unmount') await view.unmount();
  else {
    await view.rerender(tree(kind === 'document' ? { ...document, title: 'B' } : document, kind === 'source' ? createMockEditorImageSource() : images, kind !== 'focus'));
    await view.rerender(tree());
    await fireEvent.press(screen.getByRole('link', { name: '둘째 링크' }));
  }
  await act(async () => old.reject(new Error('old visit')));
  if (kind !== 'unmount') expect(screen.queryByRole('alert')).toBeNull();
});
