import { formatProfilePublishedTime } from './profilePublishedTime';

const publishedAt = '2026-11-23T12:00:00Z';
const published = Date.parse(publishedAt);

it.each([
  [0, 'Just now'], [59999, 'Just now'], [60000, '1m ago'],
  [3599999, '59m ago'], [3600000, '1h ago'],
  [23 * 3600000, '23h ago'], [86399999, '23h ago'],
] as const)('게시 후 %dms의 프로필 표시는 %s이고 분·시간을 내림한다', (elapsed, expected) => {
  expect(formatProfilePublishedTime(publishedAt, published + elapsed)).toBe(expected);
});

it('하루부터 기존 현지 날짜 표시를 유지하고 미래·잘못된 시각은 경과 시간을 만들지 않는다', () => {
  expect(formatProfilePublishedTime(publishedAt, published + 86400000)).toBe(new Date(publishedAt).toLocaleDateString());
  expect(formatProfilePublishedTime(publishedAt, published - 1)).toBe('—');
  expect(formatProfilePublishedTime('invalid', published)).toBe('—');
  expect(formatProfilePublishedTime('', published)).toBe('—');
  expect(formatProfilePublishedTime(publishedAt, NaN)).toBe('—');
});
