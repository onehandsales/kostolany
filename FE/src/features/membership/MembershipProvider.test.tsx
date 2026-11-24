import { useLayoutEffect } from 'react';
import { render } from '@testing-library/react-native';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { MembershipProvider, useMembership } from './MembershipProvider';
import { createMockMembershipSource } from './createMockMembershipSource';
import type { MembershipSource } from './types';

it('source A→B→A 교체 후 이전 소비자의 자격 함수는 다시 유효해지지 않는다', async () => {
  let current: ReturnType<typeof useMembership> = null;
  function Probe() {
    const value = useMembership();
    useLayoutEffect(() => { current = value; }, [value]);
    return null;
  }
  const first = createMockMembershipSource();
  const second = createMockMembershipSource({ records: [] });
  const tree = (source: MembershipSource) => <AuthProvider initialUser={mockUserA}>
    <MembershipProvider source={source}><Probe /></MembershipProvider>
  </AuthProvider>;
  const view = await render(tree(first));
  const read = () => { if (!current) throw new Error('missing membership'); return current; };
  const previous = read();
  expect(previous.allows('audio')).toBe(true);
  await view.rerender(tree(second));
  expect(previous.isCurrent()).toBe(false);
  expect(previous.allows('audio')).toBe(false);
  expect(read().allows('audio')).toBe(false);
  await view.rerender(tree(first));
  expect(read().allows('audio')).toBe(true);
  expect(previous.isCurrent()).toBe(false);
  expect(previous.allows('audio')).toBe(false);
  const latest = read();
  await view.unmount();
  expect(latest.isCurrent()).toBe(false);
});
