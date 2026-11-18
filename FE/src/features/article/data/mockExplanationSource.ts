import type { ExplanationSource } from '../explanationTypes';
import { explanationFixtures } from './explanationFixtures';

export type ExplanationScenario = 'normal' | 'initial-error' | 'slow' | 'out-of-order';

export function createMockExplanationSource({ scenario = 'normal', delayMs }: {
  scenario?: ExplanationScenario; delayMs?: number;
} = {}): ExplanationSource {
  const failures = new Set<string>();
  return async ({ articleId, level }) => {
    const delay = delayMs ?? (scenario === 'slow' ? 10_000 : scenario === 'out-of-order'
      ? { elementary: 900, middle: 600, high: 100, adult: 250 }[level] : 250);
    if (delay > 0) await new Promise<void>(resolve => setTimeout(resolve, delay));
    const key = `${articleId}:${level}`;
    if (scenario === 'initial-error' && !failures.has(key)) {
      failures.add(key);
      throw new Error('Example explanation request failed');
    }
    const explanation = explanationFixtures.find(item => item.articleId === articleId && item.level === level);
    if (!explanation) throw new Error('Unknown example explanation: ' + key);
    return explanation;
  };
}
