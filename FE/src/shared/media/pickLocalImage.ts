import { LocalImageError, type LocalImagePicker } from './localImage';
import * as picker from 'expo-image-picker';
import { File, Paths } from 'expo-file-system';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';

let imageSequence = 0;

export const pickLocalImage: LocalImagePicker = async (origin, signal, maxDimension = 768) => {
  if (signal.aborted) return null;
  if (origin === 'camera') {
    const permission = await picker.requestCameraPermissionsAsync();
    if (signal.aborted) return null;
    if (!permission.granted) throw new LocalImageError('permission');
  }
  // 정지 사진용 시스템 선택기는 전체 사진 라이브러리 읽기 권한을 선행 요청하지 않는다.
  const options: picker.ImagePickerOptions = {
    mediaTypes: ['images'],
    allowsEditing: false,
    quality: 1,
    exif: false,
  };
  let selection: picker.ImagePickerResult;
  try {
    selection =
      origin === 'camera'
        ? await picker.launchCameraAsync(options)
        : await picker.launchImageLibraryAsync(options);
  } catch (error) {
    if (signal.aborted) return null;
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      ['ERR_UNAVAILABLE', 'ERR_MISSING_ACTIVITY_TO_HANDLE_INTENT'].includes(String(error.code))
    ) {
      throw new LocalImageError('unsupported');
    }
    throw error;
  }
  if (selection.canceled) return null;
  const asset = selection.assets[0];
  if (!asset) throw new LocalImageError('invalid');
  const removeCacheFile = (uri: string) => {
    // 사진 라이브러리 원본은 삭제하지 않고 선택기와 변환기가 만든 앱 캐시만 정리한다.
    if (!uri.startsWith(Paths.cache.uri)) return;
    try {
      const file = new File(uri);
      if (file.exists) file.delete();
    } catch {
      /* 캐시 정리 실패는 확정 이미지를 되돌리지 않는다. */
    }
  };
  if (signal.aborted) {
    removeCacheFile(asset.uri);
    return null;
  }
  if (
    !asset.width ||
    !asset.height ||
    asset.width * asset.height > 40_000_000 ||
    (asset.fileSize ?? 0) > 20_000_000
  ) {
    removeCacheFile(asset.uri);
    throw new LocalImageError('invalid');
  }
  let context: ReturnType<typeof ImageManipulator.manipulate> | undefined;
  try {
    context = ImageManipulator.manipulate(asset.uri);
    if (Math.max(asset.width, asset.height) > maxDimension) {
      context.resize(asset.width >= asset.height ? { width: maxDimension } : { height: maxDimension });
    }
    const rendered = await context.renderAsync();
    try {
      const result = await rendered.saveAsync({ format: SaveFormat.JPEG, compress: 0.85 });
      if (signal.aborted) {
        removeCacheFile(result.uri);
        return null;
      }
      return {
        image: {
          id: `local-image-${Date.now()}-${++imageSequence}`,
          uri: result.uri,
          width: result.width,
          height: result.height,
        },
        release: () => removeCacheFile(result.uri),
      };
    } finally {
      rendered.release();
    }
  } catch {
    if (signal.aborted) return null;
    throw new LocalImageError('processing');
  } finally {
    context?.release();
    removeCacheFile(asset.uri);
  }
};
