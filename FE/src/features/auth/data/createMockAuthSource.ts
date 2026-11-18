import type { AuthSource } from '../types';
import { mockUsers } from './mockUsers';

export function createMockAuthSource({ delayMs = 600, slowDelayMs = 4000 }: {
  delayMs?: number; slowDelayMs?: number;
} = {}): AuthSource {
  const wait = async (slow: boolean): Promise<void> => {
    const duration = slow ? slowDelayMs : delayMs;
    if (duration > 0) await new Promise<void>((resolve) => setTimeout(resolve, duration));
  };
  return {
    async signIn({ userId, scenario }) {
      const user = mockUsers.find((candidate) => candidate.id === userId);
      if (!user) throw new Error('Unknown mock user');
      await wait(scenario === 'slow');
      if (scenario === 'failure') throw new Error('Mock sign-in failure');
      return scenario === 'cancel' ? { status: 'cancelled' } : { status: 'success', user };
    },
    async signOut({ userId, scenario }) {
      if (!mockUsers.some((user) => user.id === userId)) throw new Error('Unknown mock user');
      await wait(scenario === 'slow');
      if (scenario === 'failure') throw new Error('Mock sign-out failure');
    },
  };
}
