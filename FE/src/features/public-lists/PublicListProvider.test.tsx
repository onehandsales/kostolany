import { act, render, screen, waitFor } from '@testing-library/react-native';
import { useEffect, useLayoutEffect } from 'react';
import { Text } from 'react-native';

import { AuthProvider, useAuth } from '../auth/AuthProvider';
import type { AuthStore } from '../auth/createAuthStore';
import { createMockAuthSource } from '../auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../auth/data/mockUsers';
import { deferred } from '../feed/tests/helpers';
import { PublicListProvider, usePublicLists } from './PublicListProvider';
import { createMockPublicListSource } from './data/createMockPublicListSource';
import { publicListFixtures } from './data/publicListFixtures';
import type { PublicListSource, PublicListValue } from './types';

function Reader() {
  const { state } = usePublicLists();
  return <Text>{state?.value?.lists.map(list => list.title).join(',') ?? 'Loading'}</Text>;
}
const view = (source: PublicListSource) => <AuthProvider initialUser={mockUserA}>
  <PublicListProvider source={source}><Reader /></PublicListProvider>
</AuthProvider>;

it('B에서 접근이 철회된 뒤 A로 돌아오는 첫 렌더에도 A 캐시의 비공개 목록이 노출되지 않는다', async () => {
  const source = createMockPublicListSource({ delayMs: 0 });
  let authStore: AuthStore | undefined;
  const observed: boolean[] = [];
  function ObserveAccess() {
    const auth = useAuth();
    useEffect(() => { authStore = auth.store; }, [auth.store]);
    const { state } = usePublicLists();
    const visible = Boolean(state?.value?.lists.some(list => list.id === 'public-morning-routine'));
    useLayoutEffect(() => {
      if (auth.state.user?.id === mockUserA.id) observed.push(visible);
    }, [auth.state.user?.id, visible]);
    return <Text>{visible ? '목록 표시' : '목록 숨김'}</Text>;
  }
  await render(<AuthProvider initialUser={mockUserA} source={createMockAuthSource({ delayMs: 0 })}>
    <PublicListProvider source={source}><ObserveAccess /></PublicListProvider>
  </AuthProvider>);
  await screen.findByText('목록 표시');
  const auth = authStore;
  if (!auth) throw new Error('Missing auth');
  async function switchTo(id: string) {
    await act(async () => { auth?.openLogout(); await auth?.signOut();
      auth?.openLogin({ kind: 'library' }); await auth?.signIn(id); });
  }
  await switchTo(mockUserB.id);
  await act(async () => source.setVisibility('public-morning-routine', 'private'));
  observed.length = 0;
  await switchTo(mockUserA.id);
  expect(observed.length).toBeGreaterThan(0);
  expect(observed.every(visible => !visible)).toBe(true);
  expect(screen.getByText('목록 숨김')).toBeVisible();
});

it('공급부 교체 뒤 늦은 이전 조회와 unmount 뒤 완료가 새 목록을 덮지 않는다', async () => {
  const old = deferred<PublicListValue>();
  const next = createMockPublicListSource({ delayMs: 0, lists: publicListFixtures.map(list => ({ ...list, title: `새 ${list.title}` })) });
  const mounted = await render(view({ read: () => old.promise, save: next.save }));
  await mounted.rerender(view(next));
  await waitFor(() => expect(screen.getByText(/^새 The power/)).toBeVisible());
  await act(async () => old.resolve({ userId: mockUserA.id, version: 0, lists: publicListFixtures, savedIds: [] }));
  expect(screen.getByText(/^새 The power/)).toBeVisible();
  const late = deferred<PublicListValue>();
  await mounted.rerender(view({ read: () => late.promise, save: next.save }));
  await mounted.unmount();
  await act(async () => late.resolve({ userId: mockUserA.id, version: 0, lists: publicListFixtures, savedIds: [] }));
});
