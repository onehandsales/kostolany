import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { deferred } from '../feed/tests/helpers';
import type { ProfileStore } from './createProfileStore';
import { createMockProfileSource } from './data/createMockProfileSource';
import { ProfileProvider, useProfile, useProfileScopeKey } from './ProfileProvider';
import { ProfileScreen } from './ProfileScreen';
import type { Profile, ProfileSource } from './types';

const initial: Profile = { userId: 'example-reader', name: '예시 독자 A', bio: '' };
function Content({ onStore }: { onStore: (store: ProfileStore) => void }) {
  const { store } = useProfile();
  const key = useProfileScopeKey();
  useEffect(() => { if (store) onStore(store); }, [onStore, store]);
  return <ProfileScreen key={key} accountLabel="예시 독자 A" isFocused onLogout={() => undefined} />;
}
function Subject({ source, onStore }: { source: ProfileSource; onStore: (store: ProfileStore) => void }) {
  return <SafeAreaProvider><ProfileProvider source={source} userId={initial.userId} sessionRevision={0}>
    <Content onStore={onStore} />
  </ProfileProvider></SafeAreaProvider>;
}

it.each(['success', 'failure'] as const)('편집 중 늦은 조회 %s는 초안을 덮지 않고 화면을 닫지도 않는다', async (outcome) => {
  const late = deferred<Profile>();
  const source: ProfileSource = { ...createMockProfileSource({ delayMs: 0 }),
    readProfile: jest.fn().mockResolvedValueOnce(initial).mockImplementation(() => late.promise) };
  let store: ProfileStore | undefined;
  await render(<Subject source={source} onStore={(value) => { store = value; }} />);
  const user = userEvent.setup();
  await user.press(await screen.findByRole('button', { name: '프로필 편집' }));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '조회를 기다리는 새 초안');
  await act(async () => { void store?.reload(); });
  await act(async () => {
    if (outcome === 'success') late.resolve({ ...initial, name: '다른 조회 결과' }); else late.reject(new Error('late'));
  });
  expect(screen.getByLabelText('이름 · 필수')).toHaveDisplayValue('조회를 기다리는 새 초안');
  await user.press(screen.getByRole('button', { name: '프로필 저장' }));
  expect(await screen.findByRole('heading', { name: '조회를 기다리는 새 초안' })).toBeVisible();
});

it.each(['success', 'failure'] as const)('공급부 교체 후 이전 저장 %s는 새 저장소와 편집 초안을 변경하지 않는다', async (outcome) => {
  const late = deferred<Profile>();
  const oldSource: ProfileSource = { readProfile: async () => initial, saveProfile: () => late.promise };
  const onStore = () => undefined;
  const view = await render(<Subject source={oldSource} onStore={onStore} />);
  const user = userEvent.setup();
  await user.press(await screen.findByRole('button', { name: '프로필 편집' }));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '이전 공급부 제출');
  await user.press(screen.getByRole('button', { name: '프로필 저장' }));
  const newSource = createMockProfileSource({ delayMs: 0 });
  await view.rerender(<Subject source={newSource} onStore={onStore} />);
  expect(screen.queryByLabelText('이름 · 필수')).not.toBeOnTheScreen();
  await user.press(await screen.findByRole('button', { name: '프로필 편집' }));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '새 공급부 초안');
  await act(async () => {
    if (outcome === 'success') late.resolve({ ...initial, name: '이전 공급부 제출' }); else late.reject(new Error('late'));
  });
  expect(screen.getByLabelText('이름 · 필수')).toHaveDisplayValue('새 공급부 초안');
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: '프로필 편집 닫기' }));
  expect(screen.getByRole('heading', { name: initial.name })).toBeVisible();
});
