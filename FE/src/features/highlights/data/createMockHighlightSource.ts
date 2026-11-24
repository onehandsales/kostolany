import { validHighlight, type HighlightSource, type HighlightValue, type Passage } from '../types';

export type HighlightScenario = 'normal' | 'read-error' | 'write-error' | 'remove-error' | 'slow';
export function createMockHighlightSource({ delayMs = 150, scenario = 'normal', canHighlight = () => true }: {
  delayMs?: number; scenario?: HighlightScenario; canHighlight?: (userId: string, passage: Passage) => boolean;
} = {}): HighlightSource {
  const values = new Map<string, HighlightValue>();
  const operations = new Map<string, string>();
  let failedRead = false; let failedWrite = false;
  const wait = () => new Promise<void>(resolve => setTimeout(resolve, scenario === 'slow' ? 3000 : delayMs));
  const get = (userId: string): HighlightValue => values.get(userId) ?? { userId, version: 0, highlights: [] };
  return {
    async read(userId) {
      const value = get(userId); await wait();
      if (scenario === 'read-error' && !failedRead) { failedRead = true; throw new Error('Mock highlight read failure'); }
      return value;
    },
    async set(userId, command) {
      await wait();
      if ((scenario === 'write-error' || (scenario === 'remove-error' && !command.selected)) && !failedWrite) { failedWrite = true; throw new Error('Mock highlight write failure'); }
      if (!userId || !validHighlight(command.highlight) || !command.operationId) throw new Error('Invalid highlight');
      const operationKey = JSON.stringify([userId, command.operationId]);
      const fingerprint = JSON.stringify(command);
      const previous = operations.get(operationKey);
      if (previous && previous !== fingerprint) throw new Error('Conflicting highlight operation');
      if (previous) return get(userId);
      // 원문 접근이 철회된 뒤 새 강조를 확정하지 않되 기존 개인 강조의 제거는 허용한다.
      if (command.selected && !canHighlight(userId, command.highlight)) throw new Error('Highlight permission denied');
      const value = get(userId);
      const remaining = value.highlights.filter(item => item.id !== command.highlight.id);
      const next: HighlightValue = { userId, version: value.version + 1,
        highlights: command.selected ? [...remaining, value.highlights.find(item => item.id === command.highlight.id) ?? command.highlight] : remaining };
      values.set(userId, next); operations.set(operationKey, fingerprint);
      return next;
    },
  };
}
