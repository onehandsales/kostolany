import { Share, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { captureRef as mockCapture, releaseCapture as mockRelease } from 'react-native-view-shot';
import * as mockLibrary from 'expo-media-library';
import { PermissionStatus } from 'expo-modules-core';
import { shareAdapter } from './shareAdapter';
import { deferred } from '../feed/tests/helpers';

jest.mock('expo-clipboard', () => ({ setStringAsync: jest.fn() }));
jest.mock('./nativeShareModules', () => ({
  loadShareCapture: async () => ({ captureRef: mockCapture, releaseCapture: mockRelease }),
  loadShareLibrary: async () => mockLibrary,
}));
jest.mock('react-native-view-shot', () => ({ captureRef: jest.fn(), releaseCapture: jest.fn() }));
jest.mock('expo-media-library', () => ({
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  Asset: { create: jest.fn() },
}));
const signal = () => new AbortController().signal;

it('클립보드 거절과 공유 취소는 성공으로 바꾸지 않고 OS 반환은 전송 완료와 구분한다', async () => {
  jest.mocked(Clipboard.setStringAsync).mockResolvedValueOnce(false).mockResolvedValueOnce(true);
  await expect(shareAdapter.copy('local', signal())).rejects.toMatchObject({ kind: 'copy' });
  await shareAdapter.copy('local', signal());
  const share = jest
    .spyOn(Share, 'share')
    .mockResolvedValueOnce({ action: Share.dismissedAction })
    .mockResolvedValueOnce({ action: Share.sharedAction });
  const message = { title: '제목', text: '인용', url: 'https://kostolany.invalid/article/one' };
  expect(await shareAdapter.share(message, signal())).toBe('cancelled');
  expect(await shareAdapter.share(message, signal())).toBe('returned');
  expect(share).toHaveBeenCalledWith(
    expect.objectContaining({ message: '인용\nhttps://kostolany.invalid/article/one' }),
  );
  share.mockRestore();
});

it('추가 전용 권한만 요청하고 거절·재시도·이미 허용된 저장을 구분한다', async () => {
  const denied = {
    granted: false,
    canAskAgain: true,
    status: PermissionStatus.DENIED,
    expires: 'never' as const,
  };
  jest.mocked(mockLibrary.getPermissionsAsync).mockResolvedValue(denied);
  jest
    .mocked(mockLibrary.requestPermissionsAsync)
    .mockResolvedValueOnce(denied)
    .mockResolvedValueOnce({ ...denied, granted: true });
  const image = { uri: 'file:///cache/card.png', release: jest.fn() };
  await expect(shareAdapter.saveImage(image, signal())).rejects.toMatchObject({ kind: 'permission' });
  expect(mockLibrary.Asset.create).not.toHaveBeenCalled();
  expect(await shareAdapter.saveImage(image, signal())).toBe('library');
  expect(mockLibrary.getPermissionsAsync).toHaveBeenCalledWith(true, []);
  expect(mockLibrary.requestPermissionsAsync).toHaveBeenCalledWith(true, []);
  expect(mockLibrary.Asset.create).toHaveBeenCalledWith(image.uri);
  expect(image.release).not.toHaveBeenCalled();
});

it('중간 취소 뒤 늦은 캡처는 파일을 정리하고 저장 권한 요청을 시작하지 않는다', async () => {
  const pending = deferred<string>();
  jest.mocked(mockCapture).mockImplementation(() => pending.promise);
  const controller = new AbortController();
  const result = shareAdapter.capture(new View({}), controller.signal);
  await Promise.resolve();
  await Promise.resolve();
  controller.abort();
  pending.resolve('file:///cache/late.png');
  await expect(result).rejects.toMatchObject({ kind: 'cancelled' });
  expect(mockRelease).toHaveBeenCalledWith('file:///cache/late.png');
  expect(mockLibrary.getPermissionsAsync).not.toHaveBeenCalled();
});
