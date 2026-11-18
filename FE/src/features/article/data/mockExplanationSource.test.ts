import { explanationLevels } from '../explanationTypes';
import { articleFixtures } from './fixtures';
import { createMockExplanationSource } from './mockExplanationSource';

describe('Example explanations', () => {
  it('has distinct explanations and examples at all four levels for every article', async () => {
    const source = createMockExplanationSource({ delayMs: 0 });
    for (const article of articleFixtures) {
      const results = await Promise.all(explanationLevels.map(level => source({ articleId: article.id, level })));
      expect(results.map(item => item.level)).toEqual(explanationLevels);
      expect(results.every(item => item.articleId === article.id && item.paragraphs.every(text => text.trim()) && item.example.trim())).toBe(true);
      expect(new Set(results.map(item => item.paragraphs.join('\n'))).size).toBe(4);
      expect(new Set(results.map(item => item.example)).size).toBe(4);
    }
  });

  it('fails once and retries per article and level without substituting another selection', async () => {
    const source = createMockExplanationSource({ scenario: 'initial-error', delayMs: 0 });
    const request = { articleId: articleFixtures[0]!.id, level: 'middle' as const };
    await expect(source(request)).rejects.toThrow('Example explanation request failed');
    await expect(source(request)).resolves.toMatchObject(request);
    await expect(source({ ...request, level: 'high' })).rejects.toThrow('Example explanation request failed');
    await expect(source({ ...request, articleId: articleFixtures[1]!.id })).rejects.toThrow('Example explanation request failed');
  });

  it('rejects an unknown article', async () => {
    await expect(createMockExplanationSource({ delayMs: 0 })({ articleId: 'unknown', level: 'adult' })).rejects.toThrow('Unknown example explanation');
  });
});
