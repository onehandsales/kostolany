import type { ProfileFields } from './types';
import { isProfilePhoto } from './profilePhoto';
import { validPronouns } from './pronouns';

export const PROFILE_NAME_LIMIT = 50;
export const PROFILE_BIO_LIMIT = 160;

// 조합 중 원문은 수정하지 않고 표시와 제출에서만 NFC 코드 포인트를 센다.
export function countProfileCharacters(value: string): number {
  return Array.from(value.normalize('NFC')).length;
}

export function normalizeProfileFields(fields: ProfileFields): ProfileFields {
  return { name: fields.name.normalize('NFC').trim().replace(/\s+/gu, ' '),
    bio: fields.bio.normalize('NFC').replace(/\r\n?/gu, '\n').trim(),
    ...(fields.photo !== undefined ? { photo: fields.photo ? { ...fields.photo } : null } : {}),
    ...(fields.pronouns !== undefined ? { pronouns: [...fields.pronouns] } : {}) };
}

export function validateProfileFields(fields: ProfileFields): string | null {
  if (fields.pronouns !== undefined && !validPronouns(fields.pronouns)) return '대명사는 중복 없이 후보에서 4개까지 선택해 주세요.';
  if (fields.photo != null && !isProfilePhoto(fields.photo)) return '사진을 다시 선택해 주세요.';
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
  return left.name === right.name && left.bio === right.bio
    && (left.photo?.id ?? null) === (right.photo?.id ?? null)
    && (left.photo?.uri ?? null) === (right.photo?.uri ?? null)
    && (left.photo?.width ?? null) === (right.photo?.width ?? null)
    && (left.photo?.height ?? null) === (right.photo?.height ?? null)
    && JSON.stringify(left.pronouns ?? []) === JSON.stringify(right.pronouns ?? []);
}
