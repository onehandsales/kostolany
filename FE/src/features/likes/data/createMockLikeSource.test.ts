import { articleFixtures } from '../../article/data/fixtures';
import { createMockLikeSource, initialLikeCounts, MOCK_READER_ID } from './createMockLikeSource';

const identity = { articleId: 'example-latest-exchange', userId: MOCK_READER_ID };

it('모든 예시 기사에 초기 수치가 있고 중복 등록·해제는 한 번만 집계한다', async () => {
  expect(Object.keys(initialLikeCounts).sort()).toEqual(articleFixtures.map((article) => article.id).sort());
  const source = createMockLikeSource({ delayMs: 0 });
  expect(await source.fetchArticleLike(identity)).toEqual({ ...identity, count: 0, isLiked: false });
  for (let commandId = 1; commandId <= 2; commandId += 1) {
    expect(await source.setArticleLiked({ ...identity, commandId, liked: true })).toMatchObject({ count: 1, isLiked: true });
  }
  for (let commandId = 3; commandId <= 4; commandId += 1) {
    expect(await source.setArticleLiked({ ...identity, commandId, liked: false })).toMatchObject({ count: 0, isLiked: false });
  }
});

it.each(['write-error', 'unlike-error'] as const)('모의 %s는 반영 전에 한 번 실패하고 재시도하면 목표 상태가 된다', async (scenario) => {
  const source = createMockLikeSource({ scenario, delayMs: 0 });
  if (scenario === 'unlike-error') await source.setArticleLiked({ ...identity, liked: true, commandId: 1 });
  const liked = scenario === 'write-error';
  const input = { ...identity, liked, commandId: 2 };
  await expect(source.setArticleLiked(input)).rejects.toThrow('before applying');
  expect(await source.fetchArticleLike(identity)).toMatchObject({ isLiked: !liked, count: liked ? 0 : 1 });
  expect(await source.setArticleLiked(input)).toMatchObject({ isLiked: liked, count: liked ? 1 : 0 });
});

it('공급부를 새로 만들면 초기화되고 모의 사용자와 없는 기사를 구분한다', async () => {
  const source = createMockLikeSource({ delayMs: 0 });
  await source.setArticleLiked({ ...identity, liked: true, commandId: 1 });
  const fresh = createMockLikeSource({ delayMs: 0 });
  expect(await fresh.fetchArticleLike(identity)).toMatchObject({ isLiked: false, count: 0 });
  await expect(fresh.fetchArticleLike({ ...identity, userId: ' ' })).rejects.toThrow('identity');
  await expect(fresh.fetchArticleLike({ ...identity, articleId: 'missing' })).rejects.toThrow('identity');
});

it('같은 기사의 선택과 실패 재현을 사용자 ID별로 격리한다', async () => {
  const source = createMockLikeSource({ delayMs: 0, scenario: 'write-error' });
  const other = { ...identity, userId: 'example-reader-b' };
  for (const owner of [identity, other]) {
    await expect(source.setArticleLiked({ ...owner, liked: true, commandId: 1 })).rejects.toThrow();
  }
  await source.setArticleLiked({ ...identity, liked: true, commandId: 2 });
  expect(await source.fetchArticleLike(other)).toMatchObject({ ...other, isLiked: false, count: 0 });
  expect(await source.fetchArticleLike(identity)).toMatchObject({ ...identity, isLiked: true, count: 1 });
});
