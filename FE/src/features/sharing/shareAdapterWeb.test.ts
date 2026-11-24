import { View } from 'react-native';
import { captureRef, releaseCapture } from 'react-native-view-shot';
import { deferred } from '../feed/tests/helpers';
import { shareAdapter } from './shareAdapter.web';

jest.mock('react-native-view-shot', () => ({ captureRef: jest.fn(), releaseCapture: jest.fn() }));
const signal = () => new AbortController().signal;
const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
const documentDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');
afterEach(() => {
  for (const [key, descriptor] of [['navigator', navigatorDescriptor], ['document', documentDescriptor]] as const) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else Reflect.deleteProperty(globalThis, key);
  }
});

it('실제 웹 복사 API의 거절을 성공으로 바꾸지 않고 재시도·미지원을 구분한다', async () => {
  const writeText = jest.fn().mockRejectedValueOnce(new Error('denied')).mockResolvedValueOnce(undefined);
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { writeText } } });
  await expect(shareAdapter.copy('https://kostolany.invalid/article/one', signal())).rejects.toMatchObject({ kind: 'copy' });
  await shareAdapter.copy('https://kostolany.invalid/article/two', signal());
  expect(writeText).toHaveBeenLastCalledWith('https://kostolany.invalid/article/two');
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {} });
  await expect(shareAdapter.copy('local', signal())).rejects.toMatchObject({ kind: 'unsupported' });
});

it('웹 공유의 취소·반환·미지원·실패를 구분하고 반환을 전달 완료로 바꾸지 않는다', async () => {
  const share = jest.fn()
    .mockRejectedValueOnce(new DOMException('cancel', 'AbortError'))
    .mockResolvedValueOnce(undefined)
    .mockRejectedValueOnce(new Error('unavailable'));
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { share } });
  const message = { title: '제목', text: '인용', url: 'https://kostolany.invalid/article/one' };
  expect(await shareAdapter.share(message, signal())).toBe('cancelled');
  expect(await shareAdapter.share(message, signal())).toBe('returned');
  await expect(shareAdapter.share(message, signal())).rejects.toThrow('unavailable');
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {} });
  await expect(shareAdapter.share(message, signal())).rejects.toMatchObject({ kind: 'unsupported' });
});

it('웹의 늦은 캡처와 잘못된 출력은 해제하고 사용할 PNG의 해제는 소비자에게 맡긴다', async () => {
  const pending = deferred<string>();
  jest.mocked(captureRef).mockImplementationOnce(() => pending.promise)
    .mockResolvedValueOnce('blob:invalid').mockResolvedValueOnce('data:image/png;base64,card');
  const controller = new AbortController();
  const capture = shareAdapter.capture(new View({}), controller.signal);
  controller.abort();
  pending.resolve('data:image/png;base64,late');
  await expect(capture).rejects.toMatchObject({ kind: 'cancelled' });
  expect(releaseCapture).toHaveBeenCalledWith('data:image/png;base64,late');
  await expect(shareAdapter.capture(new View({}), signal())).rejects.toMatchObject({ kind: 'capture' });
  expect(releaseCapture).toHaveBeenCalledWith('blob:invalid');
  const image = await shareAdapter.capture(new View({}), signal());
  expect(releaseCapture).not.toHaveBeenCalledWith(image.uri);
  image.release();
  expect(releaseCapture).toHaveBeenCalledWith(image.uri);
});

it('다운로드 요청 성공·실패 모두 임시 링크를 제거하며 파일 저장 완료를 주장하지 않는다', async () => {
  const link = { href: '', download: '', click: jest.fn(), remove: jest.fn() };
  const appendChild = jest.fn();
  Object.defineProperty(globalThis, 'document', { configurable: true, value: {
    createElement: () => link, body: { appendChild },
  } });
  const image = { uri: 'data:image/png;base64,card', release: jest.fn() };
  expect(await shareAdapter.saveImage(image, signal())).toBe('download');
  expect(link.href).toBe(image.uri);
  expect(link.download).toBe('kostolany-share.png');
  expect(appendChild).toHaveBeenCalledWith(link);
  link.click.mockImplementationOnce(() => { throw new Error('blocked'); });
  await expect(shareAdapter.saveImage(image, signal())).rejects.toThrow('blocked');
  expect(link.remove).toHaveBeenCalledTimes(2);
  expect(image.release).not.toHaveBeenCalled();
});
