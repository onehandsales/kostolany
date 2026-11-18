import type { ProfileFields } from './types';

export const PROFILE_NAME_LIMIT = 50;
export const PROFILE_BIO_LIMIT = 160;

// 조합 중 원문은 수정하지 않고 표시와 제출에서만 NFC 코드 포인트를 센다.
export function countProfileCharacters(value: string): number {
  return Array.from(value.normalize('NFC')).length;
}

export function normalizeProfileFields(fields: ProfileFields): ProfileFields {
  return { name: fields.name.normalize('NFC').trim().replace(/\s+/gu, ' '),
    bio: fields.bio.normalize('NFC').replace(/\r\n?/gu, '\n').trim() };
}

export function validateProfileFields(fields: ProfileFields): string | null {
  const normalized = normalizeProfileFields(fields);
  if (!normalized.name) return '이름을 입력해 주세요.';
  if (countProfileCharacters(normalized.name) > PROFILE_NAME_LIMIT) return '이름은 50자까지 입력할 수 있어요.';
  if (countProfileCharacters(normalized.bio) > PROFILE_BIO_LIMIT) return '짧은 소개는 160자까지 입력할 수 있어요.';
  const hasControl = Array.from(normalized.name + normalized.bio).some((character) => {
    const code = character.codePointAt(0) ?? 0;
    return (code < 32 && code !== 10 && code !== 9) || code === 127;
  });
  return hasControl ? '표시할 수 없는 제어 문자를 지워 주세요.' : null;
}

export function areProfileFieldsEqual(left: ProfileFields, right: ProfileFields): boolean {
  return left.name === right.name && left.bio === right.bio;
}
