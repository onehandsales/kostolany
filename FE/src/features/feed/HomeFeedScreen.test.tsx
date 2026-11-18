import { act, render as renderNative, screen, userEvent, within } from '@testing-library/react-native';
import { StrictMode } from 'react';
import { LikeTestProvider, renderWithLikes as render } from '../../../test/renderWithLikes';

import { createMockFeedSource } from './data/mockFeedSource';
import { HomeFeedScreen } from './HomeFeedScreen';
import { article, deferred } from './tests/helpers';
import type { FeedPage, FeedRequest, FeedSource } from './types';

describe('Home feed', () => {
  it('shows loading then passes only the chosen article ID, including cards without images', async () => {
    const firstPage = deferred<FeedPage>();
    const selectArticle = jest.fn();
    const user = userEvent.setup();
    await render(<HomeFeedScreen source={() => firstPage.promise} onSelectArticle={selectArticle} />);

    expect(screen.getByText('기사를 불러오고 있어요')).toBeVisible();
    expect(screen.queryByRole('button', { name: '기사 더 보기' })).not.toBeOnTheScreen();
    await act(async () => firstPage.resolve({ items: [article('first'), article('second')], nextCursor: null }));

    expect(screen.queryByText('기사를 불러오고 있어요')).not.toBeOnTheScreen();
    await user.press(screen.getByRole('button', { name: /^예시 기사 second/ }));
    expect(selectArticle).toHaveBeenCalledTimes(1);
    expect(selectArticle).toHaveBeenCalledWith('second');
  });

  it('matches latest, popular and recommended fixture data to the selected tab', async () => {
    const source = jest.fn(createMockFeedSource({ delayMs: 0 }));
    const user = userEvent.setup();
    await render(<HomeFeedScreen source={source} onSelectArticle={jest.fn()} />);
    expect(screen.getByRole('tab', { name: '최신' })).toBeSelected();
    expect(await screen.findByRole('button', { name: /^금리가 오르면 예금과 대출/ })).toBeVisible();

    await user.press(screen.getByRole('tab', { name: '인기' }));
    expect(await screen.findByRole('button', { name: /^현금을 보유한다는 건/ })).toBeVisible();
    expect(screen.queryByRole('button', { name: /^금리가 오르면 예금과 대출/ })).not.toBeOnTheScreen();
    expect(screen.getByRole('tab', { name: '인기' })).toBeSelected();

    await user.press(screen.getByRole('tab', { name: '추천' }));
    expect(await screen.findByRole('button', { name: /^시장의 숫자 뒤에/ })).toBeVisible();
    expect(screen.queryByRole('button', { name: /^현금을 보유한다는 건/ })).not.toBeOnTheScreen();
    const sortTabs = within(screen.getByLabelText('피드 정렬'));
    expect(sortTabs.getAllByRole('tab', { selected: true })).toHaveLength(1);
    expect(sortTabs.getByRole('tab', { name: '추천' })).toBeSelected();

    await user.press(screen.getByRole('tab', { name: '추천' }));
    expect(source).toHaveBeenCalledTimes(3);
    expect(source.mock.calls.map(([request]) => request.sort)).toEqual(['latest', 'popular', 'recommended']);
  });

  it('retries a failed first page for the current sort', async () => {
    const source = jest.fn<Promise<FeedPage>, [FeedRequest]>()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({ items: [article('recovered')], nextCursor: null });
    const user = userEvent.setup();
    await render(<HomeFeedScreen source={source} onSelectArticle={jest.fn()} />);

    expect(await screen.findByRole('alert')).toHaveTextContent('기사를 불러오지 못했어요');
    await user.press(screen.getByRole('button', { name: '다시 시도' }));
    expect(await screen.findByRole('button', { name: /^예시 기사 recovered/ })).toBeVisible();
    expect(source.mock.calls.map(([request]) => request)).toEqual([
      { sort: 'latest', cursor: null }, { sort: 'latest', cursor: null },
    ]);
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });

  it('distinguishes an empty result from an error and offers no pagination', async () => {
    await render(<HomeFeedScreen source={createMockFeedSource({ scenario: 'empty', delayMs: 0 })} onSelectArticle={jest.fn()} />);
    expect(await screen.findByText('아직 표시할 기사가 없어요')).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
    expect(screen.queryByRole('button')).not.toBeOnTheScreen();
  });

  it('keeps existing cards during pagination, removes overlapping IDs and stops at the last page', async () => {
    const nextPage = deferred<FeedPage>();
    const source = jest.fn<Promise<FeedPage>, [FeedRequest]>()
      .mockResolvedValueOnce({ items: [article('first')], nextCursor: 'next' })
      .mockReturnValueOnce(nextPage.promise);
    const user = userEvent.setup();
    await render(<HomeFeedScreen source={source} onSelectArticle={jest.fn()} />);
    await user.press(await screen.findByRole('button', { name: '기사 더 보기' }));

    expect(screen.getByText('다음 기사를 불러오고 있어요')).toBeVisible();
    expect(screen.getByRole('button', { name: /^예시 기사 first/ })).toBeVisible();
    expect(screen.queryByRole('button', { name: '기사 더 보기' })).not.toBeOnTheScreen();
    await act(async () => nextPage.resolve({ items: [article('first'), article('second')], nextCursor: null }));

    expect(screen.getAllByRole('button', { name: /^예시 기사/ })).toHaveLength(2);
    expect(screen.getByText('모든 기사를 확인했어요')).toBeVisible();
    expect(screen.queryByRole('button', { name: '기사 더 보기' })).not.toBeOnTheScreen();
    expect(source.mock.calls.map(([request]) => request.cursor)).toEqual([null, 'next']);
  });

  it('preserves existing cards on page failure and retries the same cursor', async () => {
    const source = jest.fn<Promise<FeedPage>, [FeedRequest]>()
      .mockResolvedValueOnce({ items: [article('first')], nextCursor: 'next' })
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({ items: [article('second')], nextCursor: null });
    const user = userEvent.setup();
    await render(<HomeFeedScreen source={source} onSelectArticle={jest.fn()} />);
    await user.press(await screen.findByRole('button', { name: '기사 더 보기' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('다음 기사를 불러오지 못했어요');
    expect(screen.getByRole('button', { name: /^예시 기사 first/ })).toBeVisible();
    await user.press(screen.getByRole('button', { name: '추가 불러오기 다시 시도' }));
    expect(await screen.findByRole('button', { name: /^예시 기사 second/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /^예시 기사 first/ })).toBeVisible();
    expect(source.mock.calls.map(([request]) => request.cursor)).toEqual([null, 'next', 'next']);
  });

  it.each(['resolve', 'reject'] as const)('ignores a late first-page %s from a previous sort', async (outcome) => {
    const previousPage = deferred<FeedPage>();
    const source: FeedSource = ({ sort }) => sort === 'latest'
      ? previousPage.promise : Promise.resolve({ items: [article('popular')], nextCursor: null });
    const user = userEvent.setup();
    await render(<HomeFeedScreen source={source} onSelectArticle={jest.fn()} />);
    await user.press(screen.getByRole('tab', { name: '인기' }));
    await screen.findByRole('button', { name: /^예시 기사 popular/ });

    await act(async () => {
      if (outcome === 'resolve') previousPage.resolve({ items: [article('obsolete')], nextCursor: null });
      else previousPage.reject(new Error('obsolete failure'));
    });
    expect(screen.getByRole('tab', { name: '인기' })).toBeSelected();
    expect(screen.getByRole('button', { name: /^예시 기사 popular/ })).toBeVisible();
    expect(screen.queryByRole('button', { name: /^예시 기사 obsolete/ })).not.toBeOnTheScreen();
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });

  it('ignores an old load-more response after switching sort', async () => {
    const nextPage = deferred<FeedPage>();
    const source: FeedSource = ({ sort, cursor }) => {
      if (sort === 'popular') return Promise.resolve({ items: [article('popular')], nextCursor: null });
      if (cursor) return nextPage.promise;
      return Promise.resolve({ items: [article('latest')], nextCursor: 'next' });
    };
    const user = userEvent.setup();
    await render(<HomeFeedScreen source={source} onSelectArticle={jest.fn()} />);
    await user.press(await screen.findByRole('button', { name: '기사 더 보기' }));
    await user.press(screen.getByRole('tab', { name: '인기' }));
    await screen.findByRole('button', { name: /^예시 기사 popular/ });
    await act(async () => nextPage.resolve({ items: [article('obsolete')], nextCursor: 'third' }));

    expect(screen.queryByRole('button', { name: /^예시 기사 obsolete/ })).not.toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: '기사 더 보기' })).not.toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /^예시 기사 popular/ })).toBeVisible();
  });

  it('survives Strict Mode effect restart without accepting the cleaned-up request', async () => {
    const abandoned = deferred<FeedPage>();
    const source = jest.fn<Promise<FeedPage>, [FeedRequest]>()
      .mockReturnValueOnce(abandoned.promise)
      .mockResolvedValue({ items: [article('current')], nextCursor: null });
    await renderNative(<StrictMode><LikeTestProvider><HomeFeedScreen source={source} onSelectArticle={jest.fn()} /></LikeTestProvider></StrictMode>);

    expect(await screen.findByRole('button', { name: /^예시 기사 current/ })).toBeVisible();
    await act(async () => abandoned.reject(new Error('abandoned')));
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
    expect(screen.getByRole('button', { name: /^예시 기사 current/ })).toBeVisible();
  });

});
