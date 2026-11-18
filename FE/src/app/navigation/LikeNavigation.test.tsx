import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockLikeSource, MOCK_READER_ID } from '../../features/likes/data/createMockLikeSource';
import type { ArticleLike } from '../../features/likes/types';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { AppNavigator } from './AppNavigator';

const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const getLike = () => screen.getByRole('togglebutton', { name: new RegExp(title) });

it('홈에서 처리 중 상세로 이동해 해제한 마지막 의도가 목록과 검색·상세 재진입까지 유지된다', async () => {
  const user = userEvent.setup();
  const pending = deferred<ArticleLike>();
  const source = createMockLikeSource({ delayMs: 0 });
  const setArticleLiked = jest.fn(source.setArticleLiked).mockReturnValueOnce(pending.promise);
  const fetchArticleLike = jest.fn(source.fetchArticleLike);
  await render(<SafeAreaProvider><AppNavigator feedSource={createMockFeedSource({ delayMs: 0 })}
    articleSource={createMockArticleSource({ delayMs: 0 })} searchSource={createMockSearchSource({ delayMs: 0 })}
    likeSource={{ fetchArticleLike, setArticleLiked }} /></SafeAreaProvider>);
  await waitFor(() => expect(getLike()).toBeEnabled());
  await user.press(getLike());
  expect(getLike()).toHaveTextContent('25');
  expect(screen.getByRole('heading', { name: '홈' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: new RegExp(`^${title}`) }));
  await screen.findByRole('heading', { name: title });
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  expect(getLike()).toBeBusy();
  await user.press(getLike());
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  expect(getLike()).toHaveTextContent('24');
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  await act(async () => pending.resolve({ articleId: 'example-latest-rates', userId: MOCK_READER_ID, isLiked: true, count: 25 }));
  await waitFor(() => expect(getLike()).not.toBeBusy());
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  expect(getLike()).toHaveTextContent('24');
  expect(setArticleLiked.mock.calls.map(([input]) => input.liked)).toEqual([true, false]);

  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(screen.getByRole('button', { name: '기사 검색 열기' }));
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), '금리');
  await waitFor(() => expect(getLike()).toBeEnabled());
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  await user.press(getLike());
  await user.press(screen.getByRole('button', { name: new RegExp(`^${title}`) }));
  await screen.findByRole('heading', { name: title });
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  expect(getLike()).toHaveTextContent('25');
  await user.press(screen.getByRole('button', { name: '탐색으로 돌아가기' }));
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('금리');
  expect(screen.getByText('2개')).toBeVisible();
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  await user.press(screen.getByRole('tab', { name: '홈' }));
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  expect(getLike()).toHaveTextContent('25');
  expect(fetchArticleLike.mock.calls.filter(([input]) => input.articleId === 'example-latest-rates')).toHaveLength(1);
});

it('상세를 떠난 뒤 실패해도 홈에서 상태가 복구되고 재시도 후 상세와 일치한다', async () => {
  const pending = deferred<ArticleLike>();
  const source = createMockLikeSource({ delayMs: 0 });
  const setArticleLiked = jest.fn(source.setArticleLiked).mockReturnValueOnce(pending.promise);
  const user = userEvent.setup();
  await render(<SafeAreaProvider><AppNavigator feedSource={createMockFeedSource({ delayMs: 0 })}
    articleSource={createMockArticleSource({ delayMs: 0 })} likeSource={{ ...source, setArticleLiked }} /></SafeAreaProvider>);
  await user.press(await screen.findByRole('button', { name: new RegExp(`^${title}`) }));
  await waitFor(() => expect(getLike()).toBeEnabled());
  await user.press(getLike());
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  await act(async () => pending.reject(new Error('not applied')));
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  expect(getLike()).toHaveTextContent('24');
  expect(screen.getByRole('alert')).toHaveTextContent(/이전 상태로 돌아왔어요/);
  await user.press(screen.getByRole('button', { name: new RegExp(`^좋아요 변경 다시 시도, ${title}`) }));
  await user.press(screen.getByRole('button', { name: new RegExp(`^${title}`) }));
  await screen.findByRole('heading', { name: title });
  expect(getLike()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  expect(getLike()).toHaveTextContent('25');
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});
