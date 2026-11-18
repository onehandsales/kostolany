import { feedFixtures } from '../../feed/data/fixtures';
import { createMockArticleSource } from './mockArticleSource';

describe('Example article source', () => {
  it('provides complete matching details for every home card, including image-free articles', async () => {
    const source = createMockArticleSource({ delayMs: 0 });
    const cards = Object.values(feedFixtures).flat();
    expect(new Set(cards.map((card) => card.id)).size).toBe(cards.length);
    for (const card of cards) {
      const detail = await source(card.id);
      expect(detail).toMatchObject({ id: card.id, title: card.title, subtitle: card.summary, sourceName: card.sourceName });
      expect(detail.publishedLabel).toContain(card.publishedLabel);
      expect(detail.facts.length).toBeGreaterThan(0);
      expect(detail.interpretation.length).toBeGreaterThan(0);
      if (card.thumbnail === null) expect(detail.image).toBeNull();
      else expect(detail.image).toMatchObject({ variant: card.thumbnail });
    }
  });

  it('rejects an unknown article instead of substituting another article', async () => {
    await expect(createMockArticleSource({ delayMs: 0 })('unknown')).rejects.toThrow('Unknown example article');
  });

  it('recovers from the example failure for the same article', async () => {
    const source = createMockArticleSource({ scenario: 'initial-error', delayMs: 0 });
    const id = 'example-latest-rates';
    await expect(source(id)).rejects.toThrow('Example article request failed');
    await expect(source(id)).resolves.toMatchObject({ id });
  });
});
