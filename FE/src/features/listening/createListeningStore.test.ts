import { deferred } from '../feed/tests/helpers';
import { createListeningStore } from './createListeningStore';
import { createMockListeningSource } from './createMockListeningSource';
import { formatListeningTime, type ListeningRecording, type ListeningSource } from './types';

const storyA = { articleId: 'a', title: '기사 A', authorName: '작가 A' };
const storyB = { articleId: 'b', title: '기사 B', authorName: '작가 B' };
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it('한 타이머의 경과·일시정지·이동 경계·끝 재개와 닫기 자원을 유지한다', async () => {
  const store = createListeningStore(createMockListeningSource({ delayMs: 10, durationSeconds: 60 }));
  const dispose = store.activate();
  store.listen(storyA);
  await jest.advanceTimersByTimeAsync(1010);
  expect(store.getSnapshot()).toMatchObject({ status: 'playing', positionSeconds: 1, durationSeconds: 60 });
  store.setExpanded(true);
  store.setPlaying(false);
  await jest.advanceTimersByTimeAsync(5000);
  expect(store.getSnapshot()).toMatchObject({ status: 'paused', positionSeconds: 1, expanded: true });
  store.seek(-10);
  expect(store.getSnapshot().positionSeconds).toBe(0);
  store.seek(500);
  expect(store.getSnapshot()).toMatchObject({ status: 'ended', positionSeconds: 60 });
  store.setPlaying(true);
  expect(store.getSnapshot().positionSeconds).toBe(0);
  await jest.advanceTimersByTimeAsync(60_000);
  expect(store.getSnapshot().status).toBe('ended');
  expect(jest.getTimerCount()).toBe(0);
  store.close();
  expect(store.getSnapshot().story).toBeNull();
  dispose();
  expect(formatListeningTime(280)).toBe('04:40');
});

it.each(['success', 'failure'] as const)(
  'A→B→A와 닫기 뒤 오래된 %s가 최신 기사나 오류를 덮지 않는다',
  async (outcome) => {
    const first = deferred<ListeningRecording>();
    const second = deferred<ListeningRecording>();
    const source: ListeningSource = jest
      .fn()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise)
      .mockImplementation(async (story) => ({
        articleId: story.articleId,
        durationSeconds: 100,
        mode: 'silent-mock',
      }));
    const store = createListeningStore(source);
    const dispose = store.activate();
    store.listen(storyA);
    store.listen(storyB);
    store.listen(storyA);
    await Promise.resolve();
    if (outcome === 'failure') {
      first.reject(new Error('late A'));
      second.reject(new Error('late B'));
    } else {
      first.resolve({ articleId: 'a', durationSeconds: 1, mode: 'silent-mock' });
      second.resolve({ articleId: 'b', durationSeconds: 2, mode: 'silent-mock' });
    }
    await Promise.resolve();
    expect(store.getSnapshot()).toMatchObject({ status: 'playing', story: storyA, durationSeconds: 100 });
    store.close();
    await jest.advanceTimersByTimeAsync(2000);
    expect(store.getSnapshot().status).toBe('idle');
    dispose();
  },
);

it('동기 예외·잘못된 응답·실패 재시도와 로딩 중 중복 시작을 처리한다', async () => {
  const source = jest
    .fn<ReturnType<ListeningSource>, Parameters<ListeningSource>>()
    .mockImplementationOnce(() => {
      throw new Error('sync');
    })
    .mockResolvedValueOnce({ articleId: 'other', durationSeconds: 280, mode: 'silent-mock' })
    .mockResolvedValue({ articleId: 'a', durationSeconds: 280, mode: 'silent-mock' });
  const store = createListeningStore(source);
  const dispose = store.activate();
  store.listen(storyA);
  expect(store.getSnapshot().status).toBe('error');
  store.retry();
  store.retry();
  await Promise.resolve();
  expect(source).toHaveBeenCalledTimes(2);
  expect(store.getSnapshot().status).toBe('error');
  store.retry();
  await Promise.resolve();
  expect(store.getSnapshot().status).toBe('playing');
  dispose();
});

it('로딩 취소·background 진입·복귀·폐기와 재활성화는 타이머와 늦은 완료를 정리한다', async () => {
  const store = createListeningStore(createMockListeningSource({ delayMs: 100 }));
  let dispose = store.activate();
  store.listen(storyA);
  store.close();
  await jest.advanceTimersByTimeAsync(200);
  expect(store.getSnapshot().status).toBe('idle');
  store.listen(storyA);
  store.setForeground(false);
  await jest.advanceTimersByTimeAsync(1000);
  expect(store.getSnapshot()).toMatchObject({ status: 'paused', positionSeconds: 0 });
  store.setForeground(true);
  await jest.advanceTimersByTimeAsync(1000);
  expect(store.getSnapshot().positionSeconds).toBe(0);
  store.setPlaying(true);
  await jest.advanceTimersByTimeAsync(2000);
  store.setForeground(false);
  expect(store.getSnapshot()).toMatchObject({ status: 'paused', positionSeconds: 2 });
  expect(jest.getTimerCount()).toBe(0);
  dispose();
  dispose = store.activate();
  store.setForeground(true);
  store.listen(storyB);
  await jest.advanceTimersByTimeAsync(100);
  expect(store.getSnapshot()).toMatchObject({ status: 'playing', story: storyB, expanded: false });
  dispose();
  expect(jest.getTimerCount()).toBe(0);
});
