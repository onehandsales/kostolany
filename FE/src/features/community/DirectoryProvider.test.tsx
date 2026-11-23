import { act, render, screen, userEvent } from '@testing-library/react-native';
import { Pressable, Text } from 'react-native';
import { DirectoryProvider, useDirectory } from './DirectoryProvider';
import { publicDirectory } from './data/publicDirectory';
import type { DirectorySource, PublicDirectory } from './types';
import { useIdentityCatalog } from './useIdentityCatalog';
import { mockUserB } from '../auth/data/mockUsers';
import { deferred } from '../feed/tests/helpers';

function Probe() {
  const { state, retry } = useDirectory();
  return (
    <>
      <Text>{state.status}</Text>
      <Text>{state.data?.identities[0]?.name}</Text>
      <Pressable role="button" onPress={retry}>
        <Text>Retry</Text>
      </Pressable>
    </>
  );
}
it('공급부 교체 후 이전 실패를 무시하고 잘못된 명단은 오류와 재시도로 복구한다', async () => {
  let reject!: (error: Error) => void;
  const old: DirectorySource = () =>
    new Promise<PublicDirectory>((_yes, no) => {
      reject = no;
    });
  let calls = 0;
  const next: DirectorySource = async () =>
    ++calls === 1
      ? { ...publicDirectory, identities: [...publicDirectory.identities, ...publicDirectory.identities] }
      : publicDirectory;
  const view = await render(
    <DirectoryProvider source={old}>
      <Probe />
    </DirectoryProvider>,
  );
  await view.rerender(
    <DirectoryProvider source={next}>
      <Probe />
    </DirectoryProvider>,
  );
  await screen.findByText('error');
  await userEvent.setup().press(screen.getByRole('button', { name: 'Retry' }));
  await screen.findByText('ready');
  await act(async () => {
    reject(new Error('obsolete'));
  });
  expect(screen.getByText('ready')).toBeVisible();
  expect(screen.queryByText('error')).toBeNull();
});

it('카탈로그 공급부 A→B→A에서 이전 성공보다 새 명단을 유지하고 동적 사용자 ID를 중복하지 않는다', async () => {
  const old = deferred<PublicDirectory>();
  const dynamic = { kind: 'writer' as const, id: mockUserB.id, name: '공급부의 B', stories: [], pinned: [], lists: [] };
  const current = { identities: [dynamic], following: {} };
  const first = jest.fn<Promise<PublicDirectory>, []>().mockImplementationOnce(() => old.promise).mockResolvedValue(current);
  const next: DirectorySource = async () => ({ identities: [], following: {} });
  function CatalogProbe() {
    const { state } = useIdentityCatalog();
    return <><Text>{state.status}</Text>{state.data?.identities.map((identity) =>
      <Text key={`${identity.kind}:${identity.id}`}>{identity.name}</Text>)}</>;
  }
  const view = await render(<DirectoryProvider source={first}><CatalogProbe /></DirectoryProvider>);
  await view.rerender(<DirectoryProvider source={next}><CatalogProbe /></DirectoryProvider>);
  await screen.findByText(mockUserB.name);
  await view.rerender(<DirectoryProvider source={first}><CatalogProbe /></DirectoryProvider>);
  await screen.findByText('공급부의 B');
  await act(async () => { old.resolve(publicDirectory); });
  expect(screen.getAllByText('공급부의 B')).toHaveLength(1);
  expect(screen.queryByText(mockUserB.name)).toBeNull();
  expect(screen.queryByText(publicDirectory.identities[0]!.name)).toBeNull();
});
