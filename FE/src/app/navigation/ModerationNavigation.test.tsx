import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './AppNavigator';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
it('실제 작가 navigation에서 취소·신고 실패 재시도·선택적 차단·복귀와 해제를 연결한다', async () => {
  const source = createMockModerationSource({ delay: 0, scenario: 'write-error' });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        moderationSource={source}
        feedSource={createMockFeedSource({
          delayMs: 0,
          catalog: {
            latest: mediumArticles.filter((item) => item.id === 'medium-brain'),
            popular: [],
            recommended: [],
          },
        })}
      />
    </SafeAreaProvider>,
  );
  await user.press(await screen.findByRole('button', { name: 'Open Jordan Gibbs profile' }));
  await user.press(await screen.findByRole('button', { name: 'Jordan Gibbs options' }));
  await user.press(screen.getByRole('button', { name: 'Block author' }));
  await user.press(screen.getByRole('button', { name: 'Cancel moderation change' }));
  expect(screen.getByRole('button', { name: 'Follow Jordan Gibbs' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Jordan Gibbs options' }));
  await user.press(screen.getByRole('button', { name: 'Report author' }));
  expect(screen.getByRole('button', { name: 'Submit report' })).toBeDisabled();
  await user.press(screen.getByRole('radio', { name: 'Spam' }));
  await user.press(screen.getByRole('checkbox', { name: 'Also block this user' }));
  await user.press(screen.getByRole('button', { name: 'Submit report' }));
  await screen.findByText('Couldn’t save. Your selection is kept. Try again.');
  expect(screen.getByRole('radio', { name: 'Spam' })).toBeChecked();
  await user.press(screen.getByRole('button', { name: 'Submit report' }));
  await screen.findByText('Successfully reported user.');
  expect(screen.queryByRole('button', { name: 'Follow Jordan Gibbs' })).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Jordan Gibbs options' }));
  await user.press(screen.getByRole('button', { name: 'Unblock author' }));
  await user.press(screen.getByRole('button', { name: 'Confirm Unblock author' }));
  await screen.findByRole('button', { name: 'Follow Jordan Gibbs' });
  await user.press(screen.getByRole('button', { name: 'Back from profile' }));
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'Open Jordan Gibbs profile' })).toBeVisible(),
  );
  const value = await source.read(mockUserA.id);
  expect(value.reports).toHaveLength(1);
  expect(value.blocked).toEqual([]);
});

it('Settings 차단 목록의 해제 취소와 성공은 해당 목록으로 돌아오고 접수 기록을 지우지 않는다', async () => {
  const source = createMockModerationSource({ delay: 0 });
  await source.execute(mockUserA.id, {
    operationId: 'seed',
    action: { kind: 'block', writerId: 'jordan', active: true },
  });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator initialUser={mockUserA} moderationSource={source} />
    </SafeAreaProvider>,
  );
  await user.press(await screen.findByRole('tab', { name: '프로필' }));
  await user.press(await screen.findByRole('button', { name: '설정 열기' }));
  await user.press(await screen.findByRole('button', { name: 'Account' }));
  await user.press(await screen.findByRole('button', { name: 'Blocked users' }));
  await user.press(await screen.findByRole('button', { name: 'Unblock Jordan Gibbs' }));
  await user.press(screen.getByRole('button', { name: 'Cancel moderation change' }));
  await user.press(screen.getByRole('button', { name: 'Unblock Jordan Gibbs' }));
  await user.press(screen.getByRole('button', { name: 'Confirm Unblock author' }));
  await screen.findByText('No blocked users');
  expect(screen.getByRole('button', { name: 'Close blocked users' })).toBeVisible();
});
