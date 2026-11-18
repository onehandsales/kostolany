import { MAX_LIST_NAME_LENGTH } from './listTypes';

export function normalizeListName(name: string): string {
  return name.normalize('NFC').trim().replace(/\s+/gu, ' ');
}

export function validateListName(name: string, existingNames: readonly string[]): string | null {
  const normalized = normalizeListName(name);
  if (!normalized) return '목록 이름을 입력해 주세요.';
  if ([...normalized].length > MAX_LIST_NAME_LENGTH) return '목록 이름은 60자 이내로 입력해 주세요.';
  if (existingNames.some((existing) => normalizeListName(existing).toLowerCase() === normalized.toLowerCase())) {
    return '같은 이름의 목록이 있어요. 다른 이름을 입력해 주세요.';
  }
  return null;
}
