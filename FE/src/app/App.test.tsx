import { act, fireEvent, render, screen, userEvent, within } from '@testing-library/react-native';
import { BackHandler } from 'react-native';

import App from '../../App';

async function renderApp() {
  await render(<App />);
  await fireEvent(screen.getByTestId('startup-content', { includeHiddenElements: true }), 'layout');
  await fireEvent(screen.getByLabelText('Medium'), 'loadEnd');
  await screen.findByRole('button', { name: /^How to \*really\*/ });
}

const mainMenu = () => within(screen.getByLabelText('주요 메뉴'));

describe('App tab navigation', () => {
  // 시작 조회와 탭 전환의 지연 갱신을 각 테스트의 제어된 시간 안에서 처리한다.
  beforeEach(() => jest.useFakeTimers());
  afterEach(async () => {
    try {
      await act(async () => { await jest.runOnlyPendingTimersAsync(); });
    } finally {
      jest.useRealTimers();
    }
  });
  it('시작 자산과 첫 배치가 준비되기 전에는 홈을 조작할 수 없고 준비 뒤 원래 홈으로 전환한다', async () => {
    await render(<App />);
    expect(screen.getByLabelText('브랜드 시작 화면')).toBeVisible();
    expect(screen.queryByRole('tab', { name: '홈' })).toBeNull();
    await fireEvent(screen.getByTestId('startup-content', { includeHiddenElements: true }), 'layout');
    expect(screen.getByLabelText('브랜드 시작 화면')).toBeVisible();
    await fireEvent(screen.getByLabelText('Medium'), 'loadEnd');
    expect(await screen.findByRole('tab', { name: '홈' })).toBeVisible();
    expect(screen.queryByLabelText('브랜드 시작 화면')).toBeNull();
  });
  it('opens Home with four named tabs and exactly one selected tab', async () => {
    await renderApp();

    expect(screen.getByRole('heading', { name: '홈' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeVisible();
    expect(mainMenu().getAllByRole('tab')).toHaveLength(4);
    for (const name of ['홈', '탐색', '라이브러리', '프로필']) {
      expect(screen.getByRole('tab', { name })).toBeVisible();
    }
    expect(screen.getByRole('tab', { name: '홈' })).toBeSelected();
    expect(mainMenu().getAllByRole('tab', { selected: true })).toHaveLength(1);
  });

  it('switches all four tabs by accessible name and hides the previous screen', async () => {
    const user = userEvent.setup();
    await renderApp();

    let previousTitle = '홈';
    for (const title of ['탐색', '라이브러리', '프로필', '홈']) {
      await user.press(screen.getByRole('tab', { name: title }));

      expect(screen.getByRole('heading', { name: title })).toBeVisible();
      if (title === '홈') {
        expect(screen.getByRole('button', { name: 'Notifications' })).toBeVisible();
      } else if (title === '탐색') {
        expect(screen.getByRole('button', { name: '기사 검색 열기' })).toBeVisible();
        expect(screen.getByRole('heading', { name: '읽어볼 기사' })).toBeVisible();
      } else if (title === '라이브러리') {
        expect(screen.getByRole('button', { name: '라이브러리 모의 로그인' })).toBeVisible();
      } else {
        expect(screen.getByText('로그인하지 않은 상태예요.')).toBeVisible();
      }
      expect(screen.getByRole('tab', { name: title })).toBeSelected();
      expect(screen.getByRole('tab', { name: previousTitle })).not.toBeSelected();
      expect(mainMenu().getAllByRole('tab', { selected: true })).toHaveLength(1);
      expect(screen.queryByRole('heading', { name: previousTitle })).not.toBeOnTheScreen();
      previousTitle = title;
    }
  });

  it('keeps a repeated tab selection on the same single visible screen', async () => {
    const user = userEvent.setup();
    await renderApp();

    await user.press(screen.getByRole('tab', { name: '라이브러리' }));
    await user.press(screen.getByRole('tab', { name: '라이브러리' }));

    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: '라이브러리' })).toBeVisible();
    expect(mainMenu().getAllByRole('tab', { selected: true })).toHaveLength(1);
    expect(screen.getByRole('tab', { name: '라이브러리' })).toBeSelected();
  });

  it('uses visited-tab history for the native back event and releases it at Home', async () => {
    const subscription = jest.spyOn(BackHandler, 'addEventListener');
    const user = userEvent.setup();

    try {
      await renderApp();
      await user.press(screen.getByRole('tab', { name: '탐색' }));
      await user.press(screen.getByRole('tab', { name: '라이브러리' }));

      const handleBack = subscription.mock.calls.find(([event]) => event === 'hardwareBackPress')?.[1];
      expect(handleBack).toBeDefined();
      const backEvent = { type: 'hardwareBackPress', timeStamp: 0 };

      await act(async () => { expect(handleBack?.(backEvent)).toBe(true); });
      expect(screen.getByRole('heading', { name: '탐색' })).toBeVisible();
      expect(screen.getByRole('tab', { name: '탐색' })).toBeSelected();

      await act(async () => { expect(handleBack?.(backEvent)).toBe(true); });
      expect(screen.getByRole('heading', { name: '홈' })).toBeVisible();
      expect(screen.getByRole('tab', { name: '홈' })).toBeSelected();

      await act(async () => { expect(handleBack?.(backEvent)).toBe(false); });
    } finally {
      subscription.mockRestore();
    }
  });

  it('keeps the chosen feed when leaving Home and returning through the bottom tabs', async () => {
    const user = userEvent.setup();
    await renderApp();
    await user.press(screen.getByRole('tab', { name: 'Featured' }));
    await screen.findByRole('button', { name: /^I Don’t Want/ });
    await user.press(screen.getByRole('tab', { name: '탐색' }));
    await user.press(screen.getByRole('tab', { name: '홈' }));

    expect(screen.getByRole('tab', { name: 'Featured' })).toBeSelected();
    expect(screen.getByRole('button', { name: /^I Don’t Want/ })).toBeVisible();
    expect(mainMenu().getByRole('tab', { name: '홈' })).toBeSelected();
  });
});
