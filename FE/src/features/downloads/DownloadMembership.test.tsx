import { useEffect } from 'react';
import { act, render } from '@testing-library/react-native';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { createMockUserListSource } from '../bookmarks/data/createMockUserListSource';
import { MembershipProvider } from '../membership/MembershipProvider';
import { createMockMembershipSource } from '../membership/createMockMembershipSource';
import { DownloadProvider, useDownloads } from './DownloadProvider';
import { createMockDownloadSource } from './createMockDownloadSource';
import type { DownloadStore } from './createDownloadStore';

it('공유 권한 철회는 Provider effect가 다시 연결되기 전에도 기존 사본 읽기를 막는다', async () => {
  const source = createMockMembershipSource();
  let records = source.getSnapshot();
  source.getSnapshot = () => records;
  const lists = createMockUserListSource({ delayMs: 0 });
  await lists.setList({ userId: mockUserA.id, listId: 'offline', commandId: 1,
    content: { name: '읽을 글', articleIds: ['medium-brain'], isPrivate: false } });
  const downloads = createMockDownloadSource({ lists, delayMs: 0 });
  let store: DownloadStore | null = null;
  function Probe() {
    const current = useDownloads().store;
    useEffect(() => { store = current; }, [current]);
    return null;
  }
  await render(<AuthProvider initialUser={mockUserA}><MembershipProvider source={source}>
    <DownloadProvider source={downloads} lists={lists}><Probe /></DownloadProvider>
  </MembershipProvider></AuthProvider>);
  const getStore = (): DownloadStore => { if (!store) throw new Error('missing store'); return store; };
  await act(async () => { await getStore().start('offline'); });
  expect(getStore().article('medium-brain')).not.toBeNull();
  records = [];
  expect(getStore().article('medium-brain')).toBeNull();
  await act(async () => { getStore().remove('offline'); await getStore().start('offline'); });
  expect(getStore().getSnapshot().entries).toEqual([]);
});
