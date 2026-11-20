import { act, render, screen, userEvent } from '@testing-library/react-native';
import { Pressable, Text } from 'react-native';
import { TopicProvider, useTopics } from './TopicProvider';
import { topicCatalog } from './data/topicCatalog';
import type { TopicCatalog, TopicSource } from './types';

function Probe() {
  const { state, retry } = useTopics();
  return (
    <>
      <Text>{state.status}</Text>
      <Text>{state.data?.topics.find(topic => topic.id === 'life')?.name}</Text>
      <Pressable role="button" onPress={retry}>
        <Text>Retry</Text>
      </Pressable>
    </>
  );
}
it.each(['success', 'failure'])(
  '공급부 교체와 잘못된 토픽 참조 재시도 뒤 이전 %s 응답을 무시한다',
  async (completion) => {
    let resolve!: (value: TopicCatalog) => void;
    let reject!: (error: Error) => void;
    const old: TopicSource = () =>
      new Promise((yes, no) => {
        resolve = yes;
        reject = no;
      });
    let calls = 0;
    const next: TopicSource = async () =>
      ++calls === 1
        ? {
            ...topicCatalog,
            topics: topicCatalog.topics.map((item) => ({ ...item, curations: ['missing'] })),
          }
        : topicCatalog;
    const view = await render(
      <TopicProvider source={old}>
        <Probe />
      </TopicProvider>,
    );
    await view.rerender(
      <TopicProvider source={next}>
        <Probe />
      </TopicProvider>,
    );
    await screen.findByText('error');
    await userEvent.setup().press(screen.getByRole('button', { name: 'Retry' }));
    await screen.findByText('Life');
    await act(async () => {
      if (completion === 'success') resolve({ topics: [], curations: [] });
      else reject(new Error('obsolete'));
    });
    expect(screen.getByText('Life')).toBeVisible();
    expect(screen.queryByText('error')).toBeNull();
  },
);
