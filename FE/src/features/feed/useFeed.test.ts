import { act, renderHook } from '@testing-library/react-native';

import { article, deferred } from './tests/helpers';
import type { FeedPage, FeedRequest, FeedSort, FeedSource } from './types';
import { useFeed } from './useFeed';

it('coalesces same-tick load-more calls and does not request beyond the final cursor', async () => {
  const nextPage = deferred<FeedPage>();
  const source = jest.fn<Promise<FeedPage>, [FeedRequest]>()
    .mockResolvedValueOnce({ items: [article('first')], nextCursor: 'next' })
    .mockReturnValueOnce(nextPage.promise);
  const { result } = await renderHook(() => useFeed('latest', source));

  await act(async () => {
    result.current.loadMore();
    result.current.loadMore();
    result.current.loadMore();
  });
  expect(source.mock.calls.map(([request]) => request.cursor)).toEqual([null, 'next']);
  expect(result.current.moreStatus).toBe('loading');

  await act(async () => nextPage.resolve({ items: [article('second')], nextCursor: null }));
  await act(async () => result.current.loadMore());
  expect(source).toHaveBeenCalledTimes(2);
  expect(result.current.articles.map((item) => item.id)).toEqual(['first', 'second']);
});

it('공급부 교체 중 이전 기사와 커서를 숨기고 새 공급부의 실패를 재시도한다', async () => {
  const replacement = deferred<FeedPage>();
  const original: FeedSource = async () => ({ items: [article('original')], nextCursor: 'old-cursor' });
  const next = jest.fn<Promise<FeedPage>, [FeedRequest]>()
    .mockReturnValueOnce(replacement.promise)
    .mockResolvedValueOnce({ items: [article('replacement')], nextCursor: null });
  const { result, rerender } = await renderHook(({ source }: { source: FeedSource }) => useFeed('latest', source),
    { initialProps: { source: original } });
  expect(result.current.articles.map((item) => item.id)).toEqual(['original']);

  await rerender({ source: next });
  expect(result.current.status).toBe('loading');
  expect(result.current.articles).toEqual([]);
  expect(result.current.nextCursor).toBeNull();
  await act(async () => result.current.loadMore());
  expect(next.mock.calls.map(([request]) => request.cursor)).toEqual([null]);

  await act(async () => replacement.reject(new Error('replacement failed')));
  expect(result.current.status).toBe('error');
  await act(async () => result.current.retry());
  expect(result.current.articles.map((item) => item.id)).toEqual(['replacement']);
  expect(next.mock.calls.map(([request]) => request.cursor)).toEqual([null, null]);
});

it.each(['success', 'failure'] as const)('정렬 A→B→A에서 첫 A의 늦은 %s가 마지막 A를 덮지 않는다', async (outcome) => {
  const first = deferred<FeedPage>();
  const middle = deferred<FeedPage>();
  const last = deferred<FeedPage>();
  const source = jest.fn<Promise<FeedPage>, [FeedRequest]>()
    .mockReturnValueOnce(first.promise).mockReturnValueOnce(middle.promise).mockReturnValueOnce(last.promise);
  const { result, rerender } = await renderHook(({ sort }: { sort: FeedSort }) => useFeed(sort, source),
    { initialProps: { sort: 'latest' as FeedSort } });
  await rerender({ sort: 'popular' });
  await act(async () => middle.resolve({ items: [article('middle')], nextCursor: null }));
  await rerender({ sort: 'latest' });
  expect(result.current.status).toBe('loading');
  expect(result.current.articles).toEqual([]);
  await act(async () => {
    if (outcome === 'success') first.resolve({ items: [article('obsolete')], nextCursor: 'obsolete' });
    else first.reject(new Error('obsolete failure'));
  });
  expect(result.current.status).toBe('loading');
  await act(async () => last.resolve({ items: [article('latest')], nextCursor: null }));
  expect(result.current.articles.map((item) => item.id)).toEqual(['latest']);
});
