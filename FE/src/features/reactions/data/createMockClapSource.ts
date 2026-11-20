import { clapTargetKey, MAX_CLAPS, type ClapIdentity, type ClapSource, type ClapValue } from '../types';
import { articleClapCounts } from './articleClapCounts';

export type ClapScenario = 'normal' | 'read-error' | 'write-error' | 'slow';
export function createMockClapSource({ scenario = 'normal', delayMs = scenario === 'slow' ? 4000 : 150,
  baselines = Object.fromEntries(Object.entries(articleClapCounts).map(([id, count]) => [clapTargetKey({ kind: 'article', id }), count])),
}: { scenario?: ClapScenario; delayMs?: number; baselines?: Readonly<Record<string, number>> } = {}): ClapSource {
  const values = new Map<string, number>();
  const failures = new Set<string>();
  const appliedCommands = new Map<string, number>();
  const identityKey = (identity: ClapIdentity) => JSON.stringify([identity.userId, clapTargetKey(identity.target)]);
  function valueFor(identity: ClapIdentity): ClapValue {
    const baseline = baselines[clapTargetKey(identity.target)];
    if (baseline === undefined || !identity.userId.trim()) throw new Error('Unknown clap target');
    const mine = values.get(identityKey(identity)) ?? 0;
    // 각 모의 계정의 세계는 원본 기준 수치와 자기 기여만 합치며 실제 전체 사용자 집계와 구분한다.
    return { ...identity, mine, total: baseline + mine };
  }
  async function wait(key: string, fail: boolean): Promise<void> {
    if (delayMs > 0) await new Promise<void>(resolve => setTimeout(resolve, delayMs));
    if (fail && !failures.has(key)) { failures.add(key); throw new Error('Mock clap failure before apply'); }
  }
  return {
    async read(identity) {
      const result = valueFor(identity);
      await wait(`read:${identityKey(identity)}`, scenario === 'read-error');
      return result;
    },
    async save(command) {
      valueFor(command);
      if (!Number.isInteger(command.mine) || command.mine < 0 || command.mine > MAX_CLAPS
        || typeof command.commandId !== 'string' || !command.commandId.trim()) throw new Error('Invalid clap command');
      const key = identityKey(command);
      const commandKey = JSON.stringify([key, command.commandId]);
      await wait(`save:${key}`, scenario === 'write-error');
      const previousTarget = appliedCommands.get(commandKey);
      if (previousTarget !== undefined && previousTarget !== command.mine) throw new Error('Conflicting clap command');
      if (previousTarget === undefined) {
        values.set(key, command.mine);
        appliedCommands.set(commandKey, command.mine);
      }
      return valueFor(command);
    },
  };
}
