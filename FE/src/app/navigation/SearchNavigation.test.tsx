import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { AppNavigator } from './AppNavigator';

describe('search to detail and back', () => {
  it.each(['button', 'native back event'] as const)('restores the query and results through %s without another search', async (back) => {
    const source = jest.fn(createMockSearchSource({ delayMs: 0 }));
    const articleSource = jest.fn(createMockArticleSource({ delayMs: 0 }));
    const subscription = jest.spyOn(BackHandler, 'addEventListener');
    const user = userEvent.setup();
    try {
      await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} feedSource={createMockFeedSource({ delayMs: 0 })}
        articleSource={articleSource} searchSource={source} /></SafeAreaProvider>);
      await user.press(screen.getByRole('tab', { name: '탐색' }));
      await user.press(screen.getByRole('button', { name: '기사 검색 열기' }));
      await fireEvent.changeText(screen.getByLabelText('기사 검색어'), ' 금리 ');
      await user.press(await screen.findByRole('button', { name: /^고정금리와 변동금리/ }));
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
      expect(screen.getByRole('button', { name: /^고정금리와 변동금리/ })).toBeVisible();
      expect(screen.getByRole('tab', { name: '탐색' })).toBeSelected();
      await user.press(screen.getByRole('tab', { name: '홈' }));
      await user.press(screen.getByRole('tab', { name: '탐색' }));
      expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue(' 금리 ');
      expect(screen.getByText('2개')).toBeVisible();
      expect(source.mock.calls).toEqual([['금리']]);
    } finally { subscription.mockRestore(); }
  });
});

describe('검색 내부 뒤로 가기의 포커스 수명', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(async () => {
    await act(async () => { await jest.runOnlyPendingTimersAsync(); });
    jest.useRealTimers();
  });

  function trackBackHandlers() {
    const handlers = new Set<Parameters<typeof BackHandler.addEventListener>[1]>();
    // 실제 OS 대신 등록 역순 호출과 구독 해제 계약을 재현한다.
    const subscription = jest.spyOn(BackHandler, 'addEventListener').mockImplementation((_event, handler) => {
      handlers.add(handler);
      return { remove: () => { handlers.delete(handler); } };
    });
    async function pressBack(): Promise<boolean> {
      let consumed = false;
      await act(async () => {
        for (const handler of [...handlers].reverse()) {
          if (handler({ type: 'hardwareBackPress', timeStamp: 0 })) {
            consumed = true;
            break;
          }
        }
      });
      return consumed;
    }
    return { pressBack, restore: () => subscription.mockRestore() };
  }

  it('검색에서 뒤로 가면 탐색 첫 화면을 표시하고 다음 뒤로 가기는 탭과 OS에 맡긴다', async () => {
    const back = trackBackHandlers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    try {
      await render(<SafeAreaProvider><AppNavigator feedSource={createMockFeedSource({ delayMs: 0 })}
        searchSource={createMockSearchSource({ delayMs: 0 })} /></SafeAreaProvider>);
      await user.press(screen.getByRole('tab', { name: '탐색' }));
      await user.press(screen.getByRole('button', { name: '기사 검색 열기' }));
      await fireEvent.changeText(screen.getByLabelText('기사 검색어'), '금리');
      await screen.findByRole('button', { name: /^고정금리와 변동금리/ });
      expect(await back.pressBack()).toBe(true);
      expect(screen.getByRole('tab', { name: '탐색' })).toBeSelected();
      expect(screen.getByRole('button', { name: '기사 검색 열기' })).toBeVisible();
      expect(screen.queryByLabelText('기사 검색어')).not.toBeOnTheScreen();
      expect(await back.pressBack()).toBe(true);
      expect(screen.getByRole('tab', { name: '홈' })).toBeSelected();
      expect(await back.pressBack()).toBe(false);
    } finally { back.restore(); }
  });

  it('다른 탭과 기사 상세에서는 검색의 뒤로 구독을 해제하고 복귀한 검색어와 결과를 보존한다', async () => {
    const back = trackBackHandlers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    try {
      await render(<SafeAreaProvider><AppNavigator feedSource={createMockFeedSource({ delayMs: 0 })}
        articleSource={createMockArticleSource({ delayMs: 0 })}
        searchSource={createMockSearchSource({ delayMs: 0 })} /></SafeAreaProvider>);
      await user.press(screen.getByRole('tab', { name: '탐색' }));
      await user.press(screen.getByRole('button', { name: '기사 검색 열기' }));
      await fireEvent.changeText(screen.getByLabelText('기사 검색어'), ' 금리 ');
      await screen.findByRole('button', { name: /^고정금리와 변동금리/ });
      await user.press(screen.getByRole('tab', { name: '홈' }));
      expect(await back.pressBack()).toBe(true);
      expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue(' 금리 ');
      await user.press(screen.getByRole('button', { name: /^고정금리와 변동금리/ }));
      await screen.findByRole('heading', { name: '고정금리와 변동금리 뉴스를 이해하는 첫걸음' });
      expect(await back.pressBack()).toBe(true);
      expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue(' 금리 ');
      expect(screen.getByText('2개')).toBeVisible();
      expect(await back.pressBack()).toBe(true);
      expect(screen.getByRole('button', { name: '기사 검색 열기' })).toBeVisible();
    } finally { back.restore(); }
  });
});
