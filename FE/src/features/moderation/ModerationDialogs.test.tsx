import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { Pressable, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { deferred } from '../feed/tests/helpers';
import { ModerationProvider } from './ModerationProvider';
import { useModeration } from './ModerationContext';
import type { ModerationSource, ModerationValue } from './types';
import { DirectoryProvider, createMockDirectorySource } from '../community/DirectoryProvider';
import { createMockModerationSource } from './data/createMockModerationSource';
import { useEffect } from 'react';
import type { ModerationStore } from './createModerationStore';
import { SharingProvider } from '../sharing/SharingProvider';
import type { ShareAdapter } from '../sharing/types';

beforeEach(() => jest.useFakeTimers());
afterEach(async () => {
  await act(async () => { await jest.runOnlyPendingTimersAsync(); });
  jest.useRealTimers();
});

function ReportTrigger() {
  const { open, state } = useModeration();
  return <Pressable role="button" accessibilityLabel="Open report" disabled={!state?.value}
    onPress={() => open({ kind: 'report', title: 'Jordan Gibbs', target: { kind: 'writer', id: 'jordan', writerId: 'jordan' } })}>
    <Text>Open report</Text>
  </Pressable>;
}

it('작가 공유 중 차단이 확정되면 카드를 숨기고 늦은 복사 성공을 버린다', async () => {
  let store: ModerationStore | null = null;
  function ShareTrigger() {
    const moderation = useModeration();
    useEffect(() => { store = moderation.store; }, [moderation.store]);
    return <Pressable role="button" accessibilityLabel="Open share"
      onPress={() => moderation.open({ kind: 'share', name: 'Jordan Gibbs', target: { kind: 'writer', id: 'jordan' } })}><Text>Share</Text></Pressable>;
  }
  const pending = deferred<void>();
  const adapter: ShareAdapter = { copy: jest.fn(() => pending.promise), share: async () => 'cancelled',
    capture: jest.fn(), saveImage: jest.fn(), openSettings: jest.fn() };
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA}>
    <SharingProvider adapter={adapter}><ModerationProvider userId={mockUserA.id} revision={1}
      source={createMockModerationSource({ delay: 0 })}><ShareTrigger /></ModerationProvider></SharingProvider>
  </AuthProvider></SafeAreaProvider>);
  await act(async () => jest.runOnlyPendingTimersAsync());
  await fireEvent.press(screen.getByRole('button', { name: 'Open share' }));
  await fireEvent.press(screen.getByRole('button', { name: 'Copy link' }));
  const signal = jest.mocked(adapter.copy).mock.calls[0]?.[1];
  const current = store as ModerationStore | null;
  if (!current) throw new Error('missing moderation store');
  await act(async () => {
    const operation = current.execute({ operationId: 'block-during-share', action: { kind: 'block', writerId: 'jordan', active: true } });
    await jest.runOnlyPendingTimersAsync(); await operation;
  });
  expect(signal?.aborted).toBe(true);
  expect(screen.queryByLabelText('공유 이미지 카드')).toBeNull();
  await act(async () => pending.resolve());
  expect(screen.queryByText('Link copied')).toBeNull();
});

it('차단 목록의 사용자 카탈로그 조회 실패를 숨기지 않고 같은 목록에서 재시도한다', async () => {
  const source = createMockModerationSource({ delay: 0 });
  const seed = source.execute(mockUserA.id, { operationId: 'seed', action: { kind: 'block', writerId: 'jordan', active: true } });
  await jest.runOnlyPendingTimersAsync();
  await seed;
  function BlockedTrigger() {
    const { open, state } = useModeration();
    return <Pressable role="button" accessibilityLabel="Open blocked" disabled={!state?.value}
      onPress={() => open({ kind: 'blocked' })}><Text>Open blocked</Text></Pressable>;
  }
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA}>
    <DirectoryProvider source={createMockDirectorySource({ delay: 0, scenario: 'read-error' })}>
      <ModerationProvider userId={mockUserA.id} revision={1} source={source}><BlockedTrigger /></ModerationProvider>
    </DirectoryProvider>
  </AuthProvider></SafeAreaProvider>);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await waitFor(() => expect(screen.getByRole('button', { name: 'Open blocked' })).toBeEnabled());
  await user.press(screen.getByRole('button', { name: 'Open blocked' }));
  await user.press(screen.getByRole('button', { name: 'Retry blocked user names' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Unblock Jordan Gibbs' })).toBeVisible());
  expect(screen.queryByRole('button', { name: 'Retry blocked user names' })).toBeNull();
  const result = source.read(mockUserA.id);
  await act(async () => { await jest.runOnlyPendingTimersAsync(); });
  expect((await result).blocked).toEqual(['jordan']);
});

it.each(['success', 'failure'] as const)('취소를 무시한 신고의 늦은 %s가 A→B→A의 새 초안에 섞이지 않는다', async (outcome) => {
  const pending = deferred<ModerationValue>();
  const source: ModerationSource = {
    read: async (userId) => ({ userId, version: 0, muted: [], blocked: [], reports: [] }),
    execute: jest.fn(async () => pending.promise),
  };
  function Harness({ userId, revision }: { userId: string; revision: number }) {
    return <SafeAreaProvider><AuthProvider initialUser={mockUserA}>
      <ModerationProvider source={source} userId={userId} revision={revision}><ReportTrigger /></ModerationProvider>
    </AuthProvider></SafeAreaProvider>;
  }
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const view = await render(<Harness userId="A" revision={1} />);
  await waitFor(() => expect(screen.getByRole('button', { name: 'Open report' })).toBeEnabled());
  await user.press(screen.getByRole('button', { name: 'Open report' }));
  await user.press(screen.getByRole('radio', { name: 'Spam' }));
  await user.press(screen.getByRole('checkbox', { name: 'Also block this user' }));
  await user.press(screen.getByRole('button', { name: 'Additional report details' }));
  await fireEvent.changeText(screen.getByLabelText('Report details'), '이전 세션의 신고 초안');
  await user.press(screen.getByRole('button', { name: 'Submit report' }));
  expect(screen.getByRole('button', { name: 'Submit report' })).toBeDisabled();
  await view.rerender(<Harness userId="B" revision={2} />);
  expect(screen.queryByLabelText('Report details')).toBeNull();
  await view.rerender(<Harness userId="A" revision={3} />);
  await user.press(screen.getByRole('button', { name: 'Open report' }));
  await user.press(screen.getByRole('radio', { name: 'Harassment' }));
  await act(async () => {
    if (outcome === 'success') pending.resolve({ userId: 'A', version: 1, muted: [], blocked: ['jordan'],
      reports: [{ operationId: jest.mocked(source.execute).mock.calls[0]![1].operationId, target: { kind: 'writer', id: 'jordan', writerId: 'jordan' }, reason: 'Spam', details: '이전 세션의 신고 초안', blockedWriterId: 'jordan', createdAt: '2025-06-13T12:00:00.000Z' }] });
    else pending.reject(new Error('late report'));
  });
  expect(screen.getByRole('radio', { name: 'Harassment' })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'Also block this user' })).not.toBeChecked();
  expect(screen.queryByText('Couldn’t save. Your selection is kept. Try again.')).toBeNull();
  expect(screen.queryByText('Successfully reported user.')).toBeNull();
  expect(source.execute).toHaveBeenCalledTimes(1);
});
