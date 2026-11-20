import type { MembershipRecord, MembershipSource } from './types';

export const existingMember: MembershipRecord = {
  userId: 'example-reader',
  tier: 'member',
  period: 'monthly',
  confirmedAt: '2026-11-01T00:00:00.000Z',
  requestId: 'fixture-member-a',
};

export function createMockMembershipSource({
  records = [existingMember],
  delayMs = 600,
  scenario = 'normal',
}: {
  records?: readonly MembershipRecord[];
  delayMs?: number;
  scenario?: 'normal' | 'fail-once';
} = {}): MembershipSource {
  let snapshot = records.map((record) => ({ ...record }));
  const listeners = new Set<() => void>();
  const latest = new Map<string, string>();
  const completed = new Map<string, MembershipRecord>();
  let failed = false;
  return {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    async purchase(request, signal, isCurrent) {
      if (
        !request.userId.trim() ||
        !request.requestId.trim() ||
        !['member', 'friend'].includes(request.tier) ||
        !['monthly', 'annually'].includes(request.period)
      )
        throw new Error('MEMBERSHIP_INVALID');
      const valid = () => !signal.aborted && isCurrent() && latest.get(request.userId) === request.requestId;
      const key = JSON.stringify([request.userId, request.requestId]);
      const previous = completed.get(key);
      if (previous) {
        if (previous.tier !== request.tier || previous.period !== request.period)
          throw new Error('MEMBERSHIP_CONFLICT');
        if (signal.aborted || !isCurrent()) throw new Error('MEMBERSHIP_CANCELLED');
        return previous;
      }
      latest.set(request.userId, request.requestId);
      if (delayMs) await waitForMembership(delayMs, signal);
      if (!valid()) throw new Error('MEMBERSHIP_CANCELLED');
      if (scenario === 'fail-once' && !failed) {
        failed = true;
        throw new Error('MEMBERSHIP_FAILED');
      }
      const current = snapshot.find((record) => record.userId === request.userId);
      if (current?.tier === 'friend' && request.tier === 'member')
        throw new Error('MEMBERSHIP_DOWNGRADE_UNSUPPORTED');
      if (current?.tier === request.tier && current.period === request.period) return current;
      const record = { ...request, confirmedAt: new Date().toISOString() };
      completed.set(key, record);
      snapshot = [...snapshot.filter((item) => item.userId !== request.userId), record];
      listeners.forEach((listener) => listener());
      return record;
    },
  };
}

function waitForMembership(delayMs: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new Error('MEMBERSHIP_CANCELLED'));
      return;
    }
    const cancel = () => {
      clearTimeout(timer);
      signal.removeEventListener('abort', cancel);
      reject(new Error('MEMBERSHIP_CANCELLED'));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel);
      resolve();
    }, delayMs);
    signal.addEventListener('abort', cancel, { once: true });
  });
}
