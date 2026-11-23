import { StrictMode } from 'react';
import { View } from 'react-native';
import { act, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { FollowControl } from './FollowControl';
import { RelationshipProvider } from './RelationshipProvider';
import type { RelationshipSource, RelationshipValue } from './types';
import { createMockRelationshipSource } from './data/createMockRelationshipSource';

it.each(['close', 'blur'] as const)('메뉴 %s 뒤 늦은 위치 측정은 이전 팝오버를 되살리지 않는다', async (action) => {
  let measured: ((x: number, y: number, width: number, height: number) => void) | undefined;
  const measure = jest.spyOn(View.prototype, 'measureInWindow').mockImplementation((callback) => { measured = callback; });
  const source = createMockRelationshipSource({ delay: 0 });
  function Harness({ active = true }: { active?: boolean }) {
    return <SafeAreaProvider><AuthProvider initialUser={mockUserA}>
      <RelationshipProvider source={source} userId={mockUserA.id} revision={1}>
        <FollowControl target={{ kind: 'writer', id: 'jordan' }} name="Jordan Gibbs" active={active} />
      </RelationshipProvider>
    </AuthProvider></SafeAreaProvider>;
  }
  try {
    const user = userEvent.setup();
    const view = await render(<Harness />);
    await waitFor(() => expect(screen.getByRole('button', { name: 'Follow Jordan Gibbs' })).toBeEnabled());
    await user.press(screen.getByRole('button', { name: 'Follow Jordan Gibbs' }));
    expect(screen.getByRole('radio', { name: 'Email notifications off' })).toBeVisible();
    expect(measured).toBeDefined();
    if (action === 'close') await user.press(screen.getByRole('button', { name: 'Following Jordan Gibbs options 닫기' }));
    else { await view.rerender(<Harness active={false} />); await view.rerender(<Harness />); }
    await act(async () => { measured?.(0, 300, 200, 48); });
    expect(screen.queryByRole('radio', { name: 'Email notifications off' })).toBeNull();
    await waitFor(() => expect(screen.getByRole('button', { name: 'Following Jordan Gibbs' })).toBeVisible());
  } finally { measure.mockRestore(); }
});

it.each(['success', 'failure'])(
  'A 쓰기의 늦은 %s와 이전 메뉴/오류를 B·A 재로그인에 노출하지 않는다',
  async (outcome) => {
    let resolve!: (value: RelationshipValue) => void;
    let reject!: (error: Error) => void;
    const delayed = new Promise<RelationshipValue>((yes, no) => {
      resolve = yes;
      reject = no;
    });
    const source: RelationshipSource = {
      read: async (userId) => ({ userId, version: 0, relationships: [] }),
      set: async () => delayed,
    };
    function Harness({ userId, revision }: { userId: string; revision: number }) {
      return (
        <StrictMode>
          <SafeAreaProvider>
            <AuthProvider initialUser={mockUserA}>
              <RelationshipProvider source={source} userId={userId} revision={revision}>
                <FollowControl target={{ kind: 'writer', id: 'jordan' }} name="Jordan Gibbs"
                  presentation={outcome === 'failure' ? 'menu' : 'pill'} />
              </RelationshipProvider>
            </AuthProvider>
          </SafeAreaProvider>
        </StrictMode>
      );
    }
    const user = userEvent.setup();
    const view = await render(<Harness userId="A" revision={1} />);
    await waitFor(() => expect(screen.getByRole('button', { name: 'Follow Jordan Gibbs' })).toBeEnabled());
    if (outcome === 'failure') expect(screen.getByText('Follow author')).toBeVisible();
    await user.press(screen.getByRole('button', { name: 'Follow Jordan Gibbs' }));
    expect(screen.getByRole('radio', { name: 'Email notifications off' })).toBeVisible();
    await view.rerender(<Harness userId="B" revision={2} />);
    expect(screen.queryByRole('radio', { name: 'Email notifications off' })).toBeNull();
    await view.rerender(<Harness userId="A" revision={3} />);
    await act(async () => {
      if (outcome === 'success')
        resolve({
          userId: 'A',
          version: 1,
          relationships: [{ target: { kind: 'writer', id: 'jordan' }, following: true, email: false }],
        });
      else reject(new Error('old failure'));
      await delayed.catch(() => {});
    });
    expect(screen.queryByRole('button', { name: 'Retry following Jordan Gibbs' })).toBeNull();
    expect(screen.queryByRole('radio', { name: 'Email notifications off' })).toBeNull();
    expect(
      screen.getByRole('button', {
        name: outcome === 'success' ? 'Following Jordan Gibbs' : 'Follow Jordan Gibbs',
      }),
    ).toBeVisible();
    await user.press(
      screen.getByRole('button', {
        name: outcome === 'success' ? 'Following Jordan Gibbs' : 'Follow Jordan Gibbs',
      }),
    );
    await view.rerender(<Harness userId="A" revision={4} />);
    expect(screen.queryByRole('radio', { name: 'Email notifications off' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Retry following Jordan Gibbs' })).toBeNull();
  },
);
