import { moderationKey, validModerationAction, type ModerationSource, type ModerationValue } from '../types';

export type ModerationScenario = 'normal' | 'read-error' | 'write-error' | 'slow';
export function createMockModerationSource({
  scenario = 'normal',
  delay = scenario === 'slow' ? 3000 : 150,
}: {
  scenario?: ModerationScenario;
  delay?: number;
} = {}): ModerationSource {
  const values = new Map<string, ModerationValue>();
  const applied = new Map<string, string>();
  const failures = new Set<string>();
  const valueFor = (userId: string): ModerationValue =>
    values.get(userId) ?? {
      userId,
      version: 0,
      muted: [],
      blocked: [],
      reports: [],
    };
  async function pause(key: string, shouldFail: boolean, signal?: AbortSignal) {
    if (delay) await new Promise<void>((resolve) => setTimeout(resolve, delay));
    if (signal?.aborted) throw new Error('cancelled');
    if (shouldFail && !failures.has(key)) {
      failures.add(key);
      throw new Error('unavailable');
    }
  }
  return {
    async read(userId) {
      if (!userId.trim()) throw new Error('permission');
      const value = valueFor(userId);
      await pause(`read:${userId}`, scenario === 'read-error');
      return value;
    },
    async execute(userId, command, signal) {
      if (!userId.trim()) throw new Error('permission');
      if (!command.operationId || !validModerationAction(command.action)) throw new Error('invalid');
      const action = command.action;
      if (
        (action.kind === 'block' && action.writerId === userId) ||
        (action.kind === 'report' && action.target.writerId === userId)
      )
        throw new Error('permission');
      await pause(`write:${userId}`, scenario === 'write-error', signal);
      const operation = JSON.stringify([userId, command.operationId]);
      const fingerprint = JSON.stringify(action);
      const previous = applied.get(operation);
      const current = valueFor(userId);
      if (previous !== undefined) {
        if (previous !== fingerprint) throw new Error('invalid');
        return current;
      }
      let next = { ...current, version: current.version + 1 };
      if (action.kind === 'mute') {
        const muted = current.muted.filter((item) => moderationKey(item) !== moderationKey(action.target));
        next = {
          ...next,
          muted: action.active ? [...muted, { ...action.target }] : muted,
        };
      } else if (action.kind === 'block') {
        const blocked = current.blocked.filter((id) => id !== action.writerId);
        next = {
          ...next,
          blocked: action.active ? [...blocked, action.writerId] : blocked,
        };
      } else {
        const blockedWriterId = action.alsoBlock ? action.target.writerId : null;
        next = {
          ...next,
          blocked: blockedWriterId ? [...new Set([...current.blocked, blockedWriterId])] : current.blocked,
          reports: [
            ...current.reports,
            {
              operationId: command.operationId,
              target: { ...action.target },
              reason: action.reason,
              details: action.details.trim(),
              blockedWriterId,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }
      // 신고 기록과 선택한 차단은 같은 확정 단계에서 반영하고 취소된 요청은 어떤 데이터도 바꾸지 않는다.
      values.set(userId, next);
      applied.set(operation, fingerprint);
      return next;
    },
  };
}
