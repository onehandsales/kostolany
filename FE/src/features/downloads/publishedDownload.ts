import { cloneDocument, type DraftSource } from '../editor/draftSource';
import type { EditorImageSource } from '../editor/imageSource';
import { clonePublishOptions, type PublishedStory } from '../editor/publishing';
import type { PublishedDownload } from './types';

export type PublishedDownloadSource = { source: DraftSource; images: EditorImageSource };

// 문서·공개범위·소유자를 함께 식별하고 다른 초안의 저장 revision과는 독립적으로 사본 버전을 계산한다.
export const publishedDownloadFingerprint = (story: PublishedStory): string => `published:${JSON.stringify(story)}`;

export function matchesPublishedDownloadVersion(version: string, story: PublishedStory): boolean {
  const fingerprint = publishedDownloadFingerprint(story);
  return version.startsWith(fingerprint) && /^#[1-9]\d*$/u.test(version.slice(fingerprint.length));
}

export function copyPublishedDownload(story: PublishedStory, images: EditorImageSource): PublishedDownload {
  const assets = Object.fromEntries(story.document.images.map(image => {
    const value = images.resolve(image.assetId);
    if (!value) throw new Error('DOWNLOAD_IMAGE_UNAVAILABLE');
    // 파일 복제나 영속 캐시가 아닌 현재 앱 수명의 이미지 참조만 보관한다.
    return [image.assetId, typeof value === 'number' ? value : Array.isArray(value) ? value.map(item => ({ ...item })) : { ...value }];
  }));
  return { story: { ...story, document: cloneDocument(story.document), publishing: clonePublishOptions(story.publishing) }, images: assets };
}
