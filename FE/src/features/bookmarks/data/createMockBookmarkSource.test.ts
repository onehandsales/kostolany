import { createMockBookmarkSource } from './createMockBookmarkSource';

const articleId = 'example-latest-rates';
const input = { userId: 'reader-a', articleId, saved: true, commandId: 1 };

it('같은 목표를 반복해도 중복되지 않고 사용자별 저장을 분리한다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0 });
  await source.setArticleSaved(input);
  await source.setArticleSaved(input);
  expect(await source.fetchReadingList('reader-a')).toEqual({ userId: 'reader-a', articleIds: [articleId] });
  expect(await source.fetchReadingList('reader-b')).toEqual({ userId: 'reader-b', articleIds: [] });
  await source.setArticleSaved({ ...input, userId: 'reader-b' });
  await source.setArticleSaved({ ...input, saved: false });
  await source.setArticleSaved({ ...input, saved: false });
  expect((await source.fetchReadingList('reader-a')).articleIds).toEqual([]);
  expect((await source.fetchReadingList('reader-b')).articleIds).toEqual([articleId]);
});

it.each(['save-error', 'remove-error'] as const)('%s는 반영 전에 한 번 실패하고 같은 목표 재시도는 성공한다', async (scenario) => {
  const source = createMockBookmarkSource({ scenario, delayMs: 0 });
  if (scenario === 'remove-error') await source.setArticleSaved(input);
  const command = { ...input, saved: scenario === 'save-error' };
  await expect(source.setArticleSaved(command)).rejects.toThrow('before applying');
  expect((await source.fetchReadingList('reader-a')).articleIds).toEqual(scenario === 'save-error' ? [] : [articleId]);
  await source.setArticleSaved(command);
  expect((await source.fetchReadingList('reader-a')).articleIds).toEqual(scenario === 'save-error' ? [articleId] : []);
});

it('조회 실패와 잘못된 식별자를 구분하고 새 공급부는 빈 상태로 시작한다', async () => {
  const source = createMockBookmarkSource({ scenario: 'read-error', delayMs: 0 });
  await expect(source.fetchReadingList(input.userId)).rejects.toThrow('before applying');
  expect((await source.fetchReadingList(input.userId)).articleIds).toEqual([]);
  await expect(source.setArticleSaved({ ...input, articleId: 'missing' })).rejects.toThrow('Unknown');
  await expect(source.fetchReadingList(' ')).rejects.toThrow('Invalid');
  await source.setArticleSaved(input);
  expect((await createMockBookmarkSource({ delayMs: 0 }).fetchReadingList(input.userId)).articleIds).toEqual([]);
});
