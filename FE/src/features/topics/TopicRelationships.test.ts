import { createRelationshipStore } from '../community/createRelationshipStore';
import { createMockRelationshipSource } from '../community/data/createMockRelationshipSource';
import { articleTopicIds } from './data/topicCatalog';
import type { Relationship } from '../community/types';

it('같은 ID의 토픽과 작가를 분리하고 실패 재시도·해제가 서로의 상태를 바꾸지 않는다', async () => {
  jest.useFakeTimers();
  try {
    const source = createMockRelationshipSource({ delay: 1, scenario: 'write-error' });
    const store = createRelationshipStore(source, 'A');
    const read = store.reload();
    await jest.advanceTimersByTimeAsync(1);
    await read;
    const topic: Relationship = { target: { kind: 'topic', id: 'life' }, following: true, email: false };
    const first = store.set(topic);
    await jest.advanceTimersByTimeAsync(1);
    expect(await first).toBe(false);
    const retry = store.retry('topic:life');
    await jest.advanceTimersByTimeAsync(1);
    expect(await retry).toBe(true);
    const writer = store.set({ ...topic, target: { kind: 'writer', id: 'life' } });
    const unfollow = store.set({ ...topic, following: false });
    await jest.advanceTimersByTimeAsync(5);
    expect(await writer).toBe(true);
    expect(await unfollow).toBe(true);
    expect(store.getSnapshot().relationships).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ target: topic.target, following: false }),
        expect.objectContaining({ target: { kind: 'writer', id: 'life' }, following: true }),
      ]),
    );
    const invalid = store.set({ ...topic, email: true });
    expect(await invalid).toBe(false);
    expect(articleTopicIds('medium-morning-routine')).toEqual(['self-improvement']);
  } finally {
    jest.useRealTimers();
  }
});
