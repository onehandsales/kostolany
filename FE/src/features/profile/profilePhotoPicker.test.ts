import * as picker from 'expo-image-picker';
import { pickProfilePhoto } from './profilePhotoPicker';
import { deferred } from '../feed/tests/helpers';

let mockPermission = true;
const mockDeleted: string[] = [];
const mockAsset = { uri: 'file:///cache/selected.jpg', width: 1600, height: 800, fileSize: 1000 };
const mockRendered = { saveAsync: jest.fn(), release: jest.fn() };
const mockContext = { resize: jest.fn(), renderAsync: jest.fn(), release: jest.fn() };
const mockManipulate = jest.fn((_uri: string) => mockContext);

jest.mock('expo-image-picker', () => ({
  requestCameraPermissionsAsync: jest.fn(async () => ({ granted: mockPermission })),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));
jest.mock('expo-image-manipulator', () => ({ ImageManipulator: { manipulate: (uri: string) => mockManipulate(uri) }, SaveFormat: { JPEG: 'jpeg' } }));
jest.mock('expo-file-system', () => ({
  Paths: { cache: { uri: 'file:///cache/' } },
  File: class { exists = true; constructor(private mockUri: string) {} delete() { mockDeleted.push(this.mockUri); } },
}));

beforeEach(() => {
  jest.clearAllMocks(); mockPermission = true; mockDeleted.length = 0;
  jest.mocked(picker.launchCameraAsync).mockResolvedValue({ canceled: false, assets: [mockAsset] });
  jest.mocked(picker.launchImageLibraryAsync).mockResolvedValue({ canceled: false, assets: [mockAsset] });
  mockContext.renderAsync.mockResolvedValue(mockRendered);
  mockRendered.saveAsync.mockResolvedValue({ uri: 'file:///cache/resized.jpg', width: 768, height: 384 });
});

it('미지원 선택기는 별도 오류를 반환하고 변환기의 동기 실패도 원본 캐시를 정리한다', async () => {
  jest.mocked(picker.launchCameraAsync).mockRejectedValueOnce({ code: 'ERR_UNAVAILABLE' });
  await expect(pickProfilePhoto('camera', new AbortController().signal)).rejects.toMatchObject({ reason: 'unsupported' });
  mockManipulate.mockImplementationOnce(() => { throw new Error('native-context'); });
  await expect(pickProfilePhoto('library', new AbortController().signal)).rejects.toMatchObject({ reason: 'processing' });
  expect(mockDeleted).toEqual(['file:///cache/selected.jpg']);
});

it('라이브러리는 전체 읽기 권한 없이 OS 선택기를 열고 축소한 캐시 사진만 반환한다', async () => {
  const lease = await pickProfilePhoto('library', new AbortController().signal);
  expect(picker.launchImageLibraryAsync).toHaveBeenCalledWith(expect.objectContaining({ mediaTypes: ['images'], allowsEditing: false, exif: false }));
  expect(picker.requestMediaLibraryPermissionsAsync).not.toHaveBeenCalled();
  expect(mockContext.resize).toHaveBeenCalledWith({ width: 768 });
  expect(lease?.photo).toMatchObject({ uri: 'file:///cache/resized.jpg', width: 768, height: 384 });
  expect(mockDeleted).toEqual(['file:///cache/selected.jpg']);
  expect(mockRendered.release).toHaveBeenCalledTimes(1);
  expect(mockContext.release).toHaveBeenCalledTimes(1);
  lease?.release();
  expect(mockDeleted).toEqual(['file:///cache/selected.jpg', 'file:///cache/resized.jpg']);
});

it('카메라 권한 거절은 촬영을 열지 않고 사용자 취소는 처리 실패로 바꾸지 않는다', async () => {
  mockPermission = false;
  await expect(pickProfilePhoto('camera', new AbortController().signal)).rejects.toMatchObject({ reason: 'permission' });
  expect(picker.launchCameraAsync).not.toHaveBeenCalled();
  jest.mocked(picker.launchImageLibraryAsync).mockResolvedValue({ canceled: true, assets: null });
  await expect(pickProfilePhoto('library', new AbortController().signal)).resolves.toBeNull();
  expect(mockContext.renderAsync).not.toHaveBeenCalled();
});

it('선택기 실행 중 세션이 끝나면 늦은 선택 결과의 캐시만 정리하고 사진을 반환하지 않는다', async () => {
  const pending = deferred<picker.ImagePickerResult>();
  const started = deferred<void>();
  jest.mocked(picker.launchImageLibraryAsync).mockImplementation(() => { started.resolve(); return pending.promise; });
  const controller = new AbortController();
  const result = pickProfilePhoto('library', controller.signal);
  await started.promise;
  controller.abort();
  pending.resolve({ canceled: false, assets: [mockAsset] });
  expect(await result).toBeNull();
  expect(mockDeleted).toEqual(['file:///cache/selected.jpg']);
  expect(mockContext.renderAsync).not.toHaveBeenCalled();
});

it('이미지 변환 실패는 임시 자원을 정리하며 원본 라이브러리 URI는 삭제하지 않는다', async () => {
  jest.mocked(picker.launchImageLibraryAsync).mockResolvedValue({ canceled: false, assets: [{ ...mockAsset, uri: 'content://photos/original' }] });
  mockContext.renderAsync.mockRejectedValue(new Error('decode'));
  await expect(pickProfilePhoto('library', new AbortController().signal)).rejects.toMatchObject({ reason: 'processing' });
  expect(mockContext.release).toHaveBeenCalledTimes(1);
  expect(mockDeleted).toEqual([]);
});
