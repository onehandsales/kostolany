import * as Clipboard from 'expo-clipboard';
import { captureRef, releaseCapture } from 'react-native-view-shot';
import { assertShareActive, ShareError, type ShareAdapter } from './types';

export const shareAdapter: ShareAdapter = {
  async copy(text, signal) {
    assertShareActive(signal);
    if (!(await Clipboard.setStringAsync(text))) throw new ShareError('copy');
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
    assertShareActive(signal);
    if (!uri.startsWith('data:image/png;base64,')) throw new ShareError('capture');
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
