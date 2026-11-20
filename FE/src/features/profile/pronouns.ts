export const PROFILE_PRONOUN_LIMIT = 4;

// 후보는 현재 공식 도움말의 목록이며 보관 화면에서 관찰한 후보와 별도로 기록한다.
export const profilePronouns = ['he', 'her', 'him', 'it', 'she', 'them', 'they', 'xe', 'xem', 'xer', 'ze', 'zem', 'zim'] as const;

export function validPronouns(values: readonly string[]): boolean {
  return Array.isArray(values) && values.length <= PROFILE_PRONOUN_LIMIT
    && new Set(values).size === values.length
    && values.every(value => profilePronouns.some(candidate => candidate === value));
}

export function findPronouns(query: string): readonly string[] {
  const normalized = query.normalize('NFC').trim().toLowerCase();
  return normalized ? profilePronouns.filter(value => value.startsWith(normalized)) : [];
}
