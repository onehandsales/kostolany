import type { ListMetadata } from './listTypes';

// 설명과 공개 표시만 로컬에 보관하며 외부 공개·공유 권한을 생성하지 않는다.
export function hasInvalidListMetadata(value: ListMetadata): boolean {
  return (
    (value.description !== undefined &&
      (typeof value.description !== 'string' || [...value.description.normalize('NFC')].length > 280)) ||
    (value.isPrivate !== undefined && typeof value.isPrivate !== 'boolean')
  );
}
