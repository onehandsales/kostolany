import { act, render, screen, userEvent } from '@testing-library/react-native';
import { Pressable, Text } from 'react-native';
import { DirectoryProvider, useDirectory } from './DirectoryProvider';
import { publicDirectory } from './data/publicDirectory';
import type { DirectorySource, PublicDirectory } from './types';

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
