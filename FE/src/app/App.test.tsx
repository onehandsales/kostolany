import { render, screen } from '@testing-library/react-native';

import App from '../../App';

describe('App startup', () => {
  it('shows the app heading and Korean introduction from the root component', async () => {
    await render(<App />);

    expect(screen.getByRole('heading', { name: 'Kostolany' })).toBeVisible();
    expect(screen.getByText('경제의 흐름을 읽다.')).toBeVisible();
    expect(
      screen.getByText('금융 뉴스를 더 쉽게 이해하는 시간.'),
    ).toBeVisible();
  });
});
