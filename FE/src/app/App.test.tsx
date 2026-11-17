import { act, render, screen, userEvent } from '@testing-library/react-native';
import { BackHandler } from 'react-native';

import App from '../../App';

describe('App tab navigation', () => {
  it('opens Home with four named tabs and exactly one selected tab', async () => {
    await render(<App />);

    expect(screen.getByRole('heading', { name: '홈' })).toBeVisible();
    expect(screen.getByText('홈 화면을 준비하고 있어요')).toBeVisible();
    expect(screen.getAllByRole('tab')).toHaveLength(4);
    for (const name of ['홈', '탐색', '라이브러리', '프로필']) {
      expect(screen.getByRole('tab', { name })).toBeVisible();
    }
    expect(screen.getByRole('tab', { name: '홈' })).toBeSelected();
    expect(screen.getAllByRole('tab', { selected: true })).toHaveLength(1);
  });

  it('switches all four tabs by accessible name and hides the previous screen', async () => {
    const user = userEvent.setup();
    await render(<App />);

    let previousTitle = '홈';
    for (const title of ['탐색', '라이브러리', '프로필', '홈']) {
      await user.press(screen.getByRole('tab', { name: title }));

      expect(screen.getByRole('heading', { name: title })).toBeVisible();
      expect(screen.getByText(`${title} 화면을 준비하고 있어요`)).toBeVisible();
      expect(screen.getByRole('tab', { name: title })).toBeSelected();
      expect(screen.getByRole('tab', { name: previousTitle })).not.toBeSelected();
      expect(screen.getAllByRole('tab', { selected: true })).toHaveLength(1);
      expect(screen.queryByRole('heading', { name: previousTitle })).not.toBeOnTheScreen();
      previousTitle = title;
    }
  });

  it('keeps a repeated tab selection on the same single visible screen', async () => {
    const user = userEvent.setup();
    await render(<App />);

    await user.press(screen.getByRole('tab', { name: '라이브러리' }));
    await user.press(screen.getByRole('tab', { name: '라이브러리' }));

    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: '라이브러리' })).toBeVisible();
    expect(screen.getAllByRole('tab', { selected: true })).toHaveLength(1);
    expect(screen.getByRole('tab', { name: '라이브러리' })).toBeSelected();
  });

  it('uses visited-tab history for the native back event and releases it at Home', async () => {
    const subscription = jest.spyOn(BackHandler, 'addEventListener');
    const user = userEvent.setup();

    try {
      await render(<App />);
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
});
