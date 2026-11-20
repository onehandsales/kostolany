import { normalizeProfileFields, validateProfileFields } from '../profileValidation';
import type { Profile, ProfileSource } from '../types';
import type { ProfilePreviewScenario } from './profilePreview';

const initialProfiles: readonly Profile[] = [
  { userId: 'example-reader', name: '예시 독자 A', bio: '' },
  { userId: 'example-reader-b', name: '예시 독자 B', bio: '경제의 흐름을 천천히 읽고 있어요.' },
];

export function createMockProfileSource({ delayMs = 350, scenario = 'normal' }: {
  delayMs?: number; scenario?: ProfilePreviewScenario;
} = {}): ProfileSource {
  const profiles = new Map(initialProfiles.map((profile) => [profile.userId, profile]));
  const failures = new Set<string>();
  async function wait(userId: string, operation: 'read' | 'save') {
    if (!profiles.has(userId)) throw new Error('Unknown mock profile');
    const delay = scenario === 'slow' ? 4000 : delayMs;
    if (delay > 0) await new Promise<void>((resolve) => setTimeout(resolve, delay));
    const key = JSON.stringify([userId, operation]);
    if (scenario === `${operation}-error` && !failures.has(key)) {
      failures.add(key);
      throw new Error('Mock profile operation failed before applying');
    }
  }
  return {
    async readProfile(userId) {
      await wait(userId, 'read');
      const profile = profiles.get(userId);
      if (!profile) throw new Error('Unknown mock profile');
      return { userId, ...normalizeProfileFields(profile) };
    },
    async saveProfile({ userId, commandId, fields }) {
      if (!Number.isSafeInteger(commandId) || commandId < 1 || validateProfileFields(fields)) {
        throw new Error('Invalid profile command');
      }
      await wait(userId, 'save');
      const profile = { userId, ...normalizeProfileFields(fields) };
      profiles.set(userId, profile);
      return { userId, ...normalizeProfileFields(profile) };
    },
  };
}
