import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './AppNavigator';
import type { PreviewLinkSource } from './previewLinks';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { deferred } from '../../features/feed/tests/helpers';
import type { ModerationSource, ModerationValue } from '../../features/moderation/types';

beforeEach(() => jest.useFakeTimers());
afterEach(async () => {
  await act(async () => { await jest.runOnlyPendingTimersAsync(); });
  jest.useRealTimers();
});
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(500); });
const button = (name: string) => screen.getByRole('button', { name });

it.each(['success', 'failure'] as const)('신고 중 실제 route가 바뀌면 초안을 폐기하고 늦은 %s가 새 대상에 섞이지 않는다', async (outcome) => {
  let receive: ((url: string) => void) | undefined;
  const links: PreviewLinkSource = { initial: async () => 'kostolany://writer/jordan',
    subscribe: (listener) => { receive = listener; return () => { receive = undefined; }; } };
  const delayed = deferred<ModerationValue>();
  const source: ModerationSource = {
    read: async (userId) => ({ userId, version: 0, muted: [], blocked: [], reports: [] }),
    execute: jest.fn(async () => delayed.promise),
  };
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} linkSource={links} moderationSource={source} /></SafeAreaProvider>);
  await flush();
  await user.press(button('Jordan Gibbs options'));
  await user.press(button('Report author'));
  await user.press(screen.getByRole('radio', { name: 'Spam' }));
  await user.press(button('Additional report details'));
  await fireEvent.changeText(screen.getByLabelText('Report details'), '이전 작성자의 신고 초안');
  await user.press(button('Submit report'));
  await act(async () => { receive?.(`kostolany://writer/${mockUserB.id}`); });
  await flush();
  expect(screen.queryByLabelText('Report details')).toBeNull();
  expect(screen.queryByRole('button', { name: 'Submit report' })).toBeNull();
  await user.press(button(`${mockUserB.name} options`));
  await user.press(button('Report author'));
  expect(screen.getByRole('radio', { name: 'Spam' })).not.toBeChecked();
  await user.press(screen.getByRole('radio', { name: 'Harassment' }));
  await act(async () => {
    if (outcome === 'failure') delayed.reject(new Error('old route failure'));
    else delayed.resolve({ userId: mockUserA.id, version: 1, muted: [], blocked: [], reports: [{
      operationId: jest.mocked(source.execute).mock.calls[0]![1].operationId,
      target: { kind: 'writer', id: 'jordan', writerId: 'jordan' }, reason: 'Spam',
      details: '이전 작성자의 신고 초안', blockedWriterId: null, createdAt: '2025-06-13T12:00:00.000Z',
    }] });
  });
  expect(screen.getByRole('radio', { name: 'Harassment' })).toBeChecked();
  expect(button('Submit report')).toBeEnabled();
  expect(screen.queryByText('Successfully reported user.')).toBeNull();
  expect(screen.queryByText('Couldn’t save. Your selection is kept. Try again.')).toBeNull();
});
