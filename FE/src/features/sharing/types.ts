import type { ImageSourcePropType, View } from 'react-native';

type SharePresentation = Readonly<{
  id: string;
  title: string;
  subtitle: string;
  authorName: string;
  authorId?: string;
  memberOnly?: boolean;
  avatar?: ImageSourcePropType;
  readingMinutes?: number;
  visibility: 'public' | 'unlisted' | 'private';
}>;
export type ShareTarget = SharePresentation &
  (
    | { kind: 'article' | 'written' | 'writer' | 'publication' | 'topic' | 'list' }
    | { kind: 'quote'; quote: string; start: number; end: number }
  );
export type ShareMessage = Readonly<{ title: string; text: string; url: string }>;
export type ShareImage = Readonly<{ uri: string; release: () => void }>;
export type ShareAdapter = {
  copy: (text: string, signal: AbortSignal) => Promise<void>;
  share: (message: ShareMessage, signal: AbortSignal) => Promise<'returned' | 'cancelled'>;
  capture: (view: View, signal: AbortSignal) => Promise<ShareImage>;
  saveImage: (image: ShareImage, signal: AbortSignal) => Promise<'library' | 'download'>;
  openSettings: () => Promise<void>;
};
export class ShareError extends Error {
  constructor(
    readonly kind: 'cancelled' | 'permission' | 'unsupported' | 'capture' | 'copy' | 'save' | 'share',
  ) {
    super(kind);
    this.name = 'ShareError';
  }
}
export function assertShareActive(signal: AbortSignal): void {
  if (signal.aborted) throw new ShareError('cancelled');
}

export function canShareTarget(target: ShareTarget): boolean {
  return Boolean(
    target.id.trim() &&
      target.title.trim() &&
      target.visibility !== 'private' &&
      (target.kind !== 'quote' ||
        (target.quote.trim() &&
          Number.isSafeInteger(target.start) &&
          Number.isSafeInteger(target.end) &&
          target.start >= 0 &&
          target.end > target.start)),
  );
}

export function shareMessage(target: ShareTarget, friend = false): ShareMessage {
  if (!canShareTarget(target)) throw new Error('unavailable-share-target');
  const route = target.kind === 'quote' ? 'article' : target.kind;
  // 실제 Medium 주소나 접근 토큰을 발급하지 않는 안정적인 미리보기 주소다.
  const url =
    `https://kostolany.invalid/${route}/${encodeURIComponent(target.id)}` +
    (friend ? '?preview=friend' : '') +
    (target.kind === 'quote' ? `#quote-${target.start}-${target.end}` : '');
  return {
    title: target.title,
    text: target.kind === 'quote' ? `“${target.quote}”\n${target.title}` : target.title,
    url,
  };
}
