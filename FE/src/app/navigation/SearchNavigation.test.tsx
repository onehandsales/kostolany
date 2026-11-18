import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { AppNavigator } from './AppNavigator';

describe('search to detail and back', () => {
  it.each(['button', 'native back event'] as const)('restores the query and results through %s without another search', async (back) => {
    const source = jest.fn(createMockSearchSource({ delayMs: 0 }));
    const articleSource = jest.fn(createMockArticleSource({ delayMs: 0 }));
    const subscription = jest.spyOn(BackHandler, 'addEventListener');
    const user = userEvent.setup();
    try {
      await render(<SafeAreaProvider><AppNavigator feedSource={createMockFeedSource({ delayMs: 0 })}
        articleSource={articleSource} searchSource={source} /></SafeAreaProvider>);
      await user.press(screen.getByRole('tab', { name: '탐색' }));
      await user.press(screen.getByRole('button', { name: '기사 검색 열기' }));
      await fireEvent.changeText(screen.getByLabelText('기사 검색어'), ' 금리 ');
      await user.press(await screen.findByRole('button', { name: /고정금리와 변동금리/ }));
      expect(await screen.findByRole('heading', { name: '고정금리와 변동금리 뉴스를 이해하는 첫걸음' })).toBeVisible();
      expect(articleSource).toHaveBeenCalledWith('example-popular-debt');
      expect(screen.queryByLabelText('기사 검색어')).not.toBeOnTheScreen();
      if (back === 'button') await user.press(screen.getByRole('button', { name: '탐색으로 돌아가기' }));
      else {
        const handler = subscription.mock.calls.find(([event]) => event === 'hardwareBackPress')?.[1];
        expect(handler).toBeDefined();
        await act(async () => { expect(handler?.({ type: 'hardwareBackPress', timeStamp: 0 })).toBe(true); });
      }
      expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue(' 금리 ');
      expect(screen.getByText('2개')).toBeVisible();
      expect(screen.getByRole('button', { name: /고정금리와 변동금리/ })).toBeVisible();
      expect(screen.getByRole('tab', { name: '탐색' })).toBeSelected();
      await user.press(screen.getByRole('tab', { name: '홈' }));
      await user.press(screen.getByRole('tab', { name: '탐색' }));
      expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue(' 금리 ');
      expect(screen.getByText('2개')).toBeVisible();
      expect(source.mock.calls).toEqual([['금리']]);
    } finally { subscription.mockRestore(); }
  });
});
