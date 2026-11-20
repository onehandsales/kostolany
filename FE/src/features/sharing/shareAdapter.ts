import { Linking, Platform, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { loadShareCapture, loadShareLibrary } from './nativeShareModules';
import { assertShareActive, ShareError, type ShareAdapter } from './types';

export const shareAdapter: ShareAdapter = {
  async copy(text, signal) {
    assertShareActive(signal);
    if (!(await Clipboard.setStringAsync(text))) throw new ShareError('copy');
    assertShareActive(signal);
  },
  async share(message, signal) {
    assertShareActive(signal);
    const result = await Share.share({
      title: message.title,
      message: `${message.text}\n${message.url}`,
      ...(Platform.OS === 'ios' ? { url: message.url } : {}),
    });
    assertShareActive(signal);
    return result.action === Share.dismissedAction ? 'cancelled' : 'returned';
  },
  async capture(view, signal) {
    assertShareActive(signal);
    let snapshot: typeof import('react-native-view-shot');
    try {
      snapshot = await loadShareCapture();
    } catch {
      throw new ShareError('unsupported');
    }
    const { captureRef, releaseCapture } = snapshot;
    assertShareActive(signal);
    const uri = await captureRef(view, { format: 'png', result: 'tmpfile', quality: 1 });
    const image = { uri, release: () => releaseCapture(uri) };
    if (signal.aborted) {
      image.release();
      throw new ShareError('cancelled');
    }
    return image;
  },
  async saveImage(image, signal) {
    assertShareActive(signal);
    // 실제 저장 행동에서만 모듈과 추가 전용 권한을 요청하고 사진 목록은 조회하지 않는다.
    let library: typeof import('expo-media-library');
    try {
      library = await loadShareLibrary();
    } catch {
      throw new ShareError('unsupported');
    }
    assertShareActive(signal);
    let permission = await library.getPermissionsAsync(true, []);
    assertShareActive(signal);
    if (!permission.granted && permission.canAskAgain)
      permission = await library.requestPermissionsAsync(true, []);
    assertShareActive(signal);
    if (!permission.granted) throw new ShareError('permission');
    await library.Asset.create(image.uri);
    assertShareActive(signal);
    return 'library';
  },
  openSettings: () => Linking.openSettings(),
};
