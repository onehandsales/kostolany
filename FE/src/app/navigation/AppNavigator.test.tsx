import { act, render, screen, userEvent } from '@testing-library/react-native';
import { BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { articleFixtures } from '../../features/article/data/fixtures';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import type { ArticleDetail } from '../../features/article/types';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { deferred } from '../../features/feed/tests/helpers';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { AppNavigator } from './AppNavigator';

describe('Home to article navigation', () => {
  it('opens the selected card and preserves the sort and loaded pages when returning', async () => {
    const feedSource = jest.fn(createMockFeedSource({ delayMs: 0 }));
    const articleSource = jest.fn(createMockArticleSource({ delayMs: 0 }));
    const user = userEvent.setup();
    await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} feedSource={feedSource} articleSource={articleSource} /></SafeAreaProvider>);
    await screen.findByRole('button', { name: /^금리가 오르면/ });
    await user.press(screen.getByRole('tab', { name: '인기' }));
    await user.press(await screen.findByRole('button', { name: '기사 더 보기' }));
    await user.press(await screen.findByRole('button', { name: /^고정금리와 변동금리/ }));

    expect(await screen.findByRole('heading', { name: '고정금리와 변동금리 뉴스를 이해하는 첫걸음' })).toBeVisible();
    expect(articleSource).toHaveBeenCalledWith('example-popular-debt');
    expect(screen.queryByRole('tab', { name: '홈' })).not.toBeOnTheScreen();
    expect(screen.queryByRole('img')).not.toBeOnTheScreen();
    await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));

    expect(screen.getByRole('heading', { name: '홈' })).toBeVisible();
    expect(screen.getByRole('tab', { name: '인기' })).toBeSelected();
    expect(screen.getByRole('button', { name: /^고정금리와 변동금리/ })).toBeVisible();
    expect(screen.getByText('모든 기사를 확인했어요')).toBeVisible();
    expect(screen.queryByRole('button', { name: '홈으로 돌아가기' })).not.toBeOnTheScreen();
    expect(feedSource.mock.calls).toEqual([
      [{ sort: 'latest', cursor: null }], [{ sort: 'popular', cursor: null }], [{ sort: 'popular', cursor: '2' }],
    ]);
  });

  it('returns during loading and ignores that response after another article is opened', async () => {
    const pending = deferred<ArticleDetail>();
    const rates = articleFixtures.find((article) => article.id === 'example-latest-rates')!;
    const source = jest.fn(createMockArticleSource({ delayMs: 0 })).mockReturnValueOnce(pending.promise);
    const user = userEvent.setup();
    await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} feedSource={createMockFeedSource({ delayMs: 0 })} articleSource={source} /></SafeAreaProvider>);
    await user.press(await screen.findByRole('button', { name: /^금리가 오르면/ }));
    expect(screen.getByText('기사 내용을 불러오고 있어요')).toBeVisible();
    await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
    await user.press(screen.getByRole('button', { name: /^환율 뉴스에서/ }));
    await screen.findByRole('heading', { name: '환율 뉴스에서 우리 생활까지 이어지는 연결 고리' });
    await act(async () => pending.resolve(rates));
    expect(screen.getByRole('heading', { name: '환율 뉴스에서 우리 생활까지 이어지는 연결 고리' })).toBeVisible();
    expect(screen.queryByRole('heading', { name: rates.title })).not.toBeOnTheScreen();
  });

  it('handles the native back event from detail, then releases back at Home', async () => {
    const subscription = jest.spyOn(BackHandler, 'addEventListener');
    const user = userEvent.setup();
    try {
      await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} feedSource={createMockFeedSource({ delayMs: 0 })}
        articleSource={createMockArticleSource({ delayMs: 0 })} /></SafeAreaProvider>);
      await user.press(await screen.findByRole('button', { name: /^금리가 오르면/ }));
      await screen.findByRole('heading', { name: '금리가 오르면 예금과 대출에는 어떤 일이 생길까' });
      const handleBack = subscription.mock.calls.find(([event]) => event === 'hardwareBackPress')?.[1];
      expect(handleBack).toBeDefined();
      const event = { type: 'hardwareBackPress', timeStamp: 0 };
      await act(async () => { expect(handleBack?.(event)).toBe(true); });
      expect(screen.getByRole('heading', { name: '홈' })).toBeVisible();
      await act(async () => { expect(handleBack?.(event)).toBe(false); });
    } finally {
      subscription.mockRestore();
    }
  });
});
