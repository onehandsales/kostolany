import { captureRef, releaseCapture } from 'react-native-view-shot';
import { assertShareActive, ShareError, type ShareAdapter } from './types';

export const shareAdapter: ShareAdapter = {
  async copy(text, signal) {
    assertShareActive(signal);
    if (!navigator.clipboard?.writeText) throw new ShareError('unsupported');
    // 웹의 legacy 복사 대체 경로는 실패해도 true를 반환할 수 있어 확정 가능한 API만 사용한다.
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      throw new ShareError('copy');
    }
    assertShareActive(signal);
  },
  async share(message, signal) {
    assertShareActive(signal);
    if (!navigator.share) throw new ShareError('unsupported');
    try {
      await navigator.share({ title: message.title, text: message.text, url: message.url });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled';
      throw error;
    }
    assertShareActive(signal);
    return 'returned';
  },
  async capture(view, signal) {
    assertShareActive(signal);
    const uri = await captureRef(view, { format: 'png', result: 'data-uri', quality: 1 });
    if (signal.aborted || !uri.startsWith('data:image/png;base64,')) {
      releaseCapture(uri);
      if (signal.aborted) throw new ShareError('cancelled');
      throw new ShareError('capture');
    }
    return { uri, release: () => releaseCapture(uri) };
  },
  async saveImage(image, signal) {
    assertShareActive(signal);
    const link = document.createElement('a');
    link.href = image.uri;
    link.download = 'kostolany-share.png';
    document.body.appendChild(link);
    try {
      link.click();
    } finally {
      link.remove();
    }
    return 'download';
  },
  async openSettings() {
    throw new ShareError('unsupported');
  },
};
