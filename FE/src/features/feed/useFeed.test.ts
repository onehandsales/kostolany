import { act, renderHook } from '@testing-library/react-native';

import { article, deferred } from './tests/helpers';
import type { FeedPage, FeedRequest } from './types';
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
