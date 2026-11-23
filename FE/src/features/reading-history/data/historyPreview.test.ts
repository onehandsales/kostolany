import { historyComparisonSeed } from './historyPreview';
import { createMockReadingHistorySource } from './createMockReadingHistorySource';

it('비교 조건을 명시한 개발 웹만 A의 초기 이력을 만들고 삭제·계정 분리를 유지한다', async () => {
  expect(historyComparisonSeed('', true)).toEqual({});
  expect(historyComparisonSeed('?parityHistory=reference-v1', false)).toEqual({});
  const initialVisits = historyComparisonSeed('?parityHistory=reference-v1', true);
  const source = createMockReadingHistorySource({ delayMs: 0, initialVisits });
  expect((await source.read('example-reader')).visits).toHaveLength(3);
  expect((await source.read('example-reader-b')).visits).toEqual([]);
  await source.save({ userId: 'example-reader', commandId: 1, visits: [] });
  expect((await source.read('example-reader')).visits).toEqual([]);
  expect(initialVisits['example-reader']).toHaveLength(3);
  expect((await createMockReadingHistorySource({ delayMs: 0 }).read('example-reader')).visits).toEqual([]);
});
