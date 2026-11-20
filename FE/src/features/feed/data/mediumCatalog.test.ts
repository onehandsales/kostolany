import { createMockArticleSource } from '../../article/data/mockArticleSource';
import { createMockBookmarkSource } from '../../bookmarks/data/createMockBookmarkSource';
import { createMockClapSource } from '../../reactions/data/createMockClapSource';
import { createMockSearchSource } from '../../search/data/mockSearchSource';
import { mediumArticles } from './mediumFixtures';

describe('원본 카드의 공유 식별자 연결', () => {
  it('모든 원본 카드를 같은 ID로 조회·반응·저장하고 사용자별로 분리한다', async () => {
    const articles = createMockArticleSource({ delayMs: 0 });
    const bookmarks = createMockBookmarkSource({ delayMs: 0 });
    const claps = createMockClapSource({ delayMs: 0 });
    expect(new Set(mediumArticles.map(article => article.id)).size).toBe(mediumArticles.length);
    for (const card of mediumArticles) {
      expect(await articles(card.id)).toMatchObject({ id: card.id, title: card.title });
      const identity = { userId: 'A', articleId: card.id };
      expect(await claps.save({ userId: 'A', target: { kind: 'article', id: card.id }, mine: 3, commandId: card.id }))
        .toMatchObject({ userId: 'A', target: { kind: 'article', id: card.id }, mine: 3 });
      await bookmarks.setArticleSaved({ ...identity, saved: true, commandId: 1 });
    }
    expect((await bookmarks.fetchReadingList('A')).articleIds).toEqual(mediumArticles.map(article => article.id));
    expect((await bookmarks.fetchReadingList('B')).articleIds).toEqual([]);
    expect(await claps.read({ userId: 'B', target: { kind: 'article', id: 'medium-love' } }))
      .toMatchObject({ mine: 0, total: 157000 });
  });

  it('Mindfulness 원본 결과와 기존 한국어 금융 기사를 함께 검색할 수 있다', async () => {
    const search = createMockSearchSource({ delayMs: 0 });
    expect((await search('Mindfulness')).items.map(article => article.id)).toEqual(['medium-trauma', 'medium-awareness', 'medium-vinyl']);
    expect((await search('금리')).items.map(article => article.id)).toEqual(['example-latest-rates', 'example-popular-debt']);
  });
});
