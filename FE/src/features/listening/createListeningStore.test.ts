import { createMockListeningOptionsSource, type ListeningOptions } from './listeningOptions';
import { deferred } from '../feed/tests/helpers';
import { createListeningStore } from './createListeningStore';
import { createMockListeningSource } from './createMockListeningSource';
import { formatListeningTime, formatListeningRemaining, type ListeningRecording, type ListeningSource } from './types';

const storyA = { articleId: 'a', title: '기사 A', authorName: '작가 A' };
const storyB = { articleId: 'b', title: '기사 B', authorName: '작가 B' };
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it.each([
  ['S055', 280, 5, 1, '00:05', '-04:35'],
  ['S160', 280, 40, 1, '00:40', '-04:00'],
  ['S141', 270, 10, 2.5, '00:10', '-01:44'],
  ['S192', 287, 20, 1, '00:20', '-04:27'],
] as const)('%s의 독립 비교 조건은 정상 source 기본값을 바꾸지 않고 재현한다', async (
  screenId, durationSeconds, positionSeconds, speed, elapsed, remaining,
) => {
  // 270초와 287초는 해당 표시 쌍을 재현하는 독립 입력이며 실제 음원 길이가 아니다.
  const store = createListeningStore(createMockListeningSource({ delayMs: 0, durationSeconds }),
    Date.now, 'comparison', createMockListeningOptionsSource({ delayMs: 0 }));
  const dispose = store.activate();
  store.listen(storyA);
  await jest.advanceTimersByTimeAsync(0);
  store.setPlaying(false);
  const saving = store.setOptions({ speed, voiceId: screenId === 'S192' ? 'hans' : 'emma' });
  await jest.advanceTimersByTimeAsync(0);
  expect(await saving).toBe(true);
  store.seek(positionSeconds);
  store.setPlaying(true);
  const current = store.getSnapshot();
  expect(formatListeningTime(current.positionSeconds)).toBe(elapsed);
  expect(formatListeningRemaining(current.positionSeconds, current.durationSeconds, current.options.speed)).toBe(remaining);
  expect(current.status).toBe('playing');
  await jest.advanceTimersByTimeAsync(1000);
  expect(store.getSnapshot().positionSeconds).toBe(positionSeconds + speed);
  dispose();
});

it('빠른 상대 이동은 마지막 틱 이후 경과와 연속 입력을 누적하고 타이머 하나만 유지한다', async () => {
  const store = createListeningStore(createMockListeningSource({ delayMs: 0 }));
  const dispose = store.activate();
  const listener = jest.fn();
  const unsubscribe = store.subscribe(listener);
  store.listen(storyA);
  await jest.advanceTimersByTimeAsync(1125);
  store.skip(30);
  store.skip(30);
  expect(store.getSnapshot().positionSeconds).toBe(61.125);
  expect(jest.getTimerCount()).toBe(1);
  store.togglePlaying();
  store.togglePlaying();
  expect(store.getSnapshot().status).toBe('playing');
  expect(jest.getTimerCount()).toBe(1);
  store.skip(-1000);
  expect(store.getSnapshot().positionSeconds).toBe(0);
  store.skip(Number.NaN);
  expect(store.getSnapshot().positionSeconds).toBe(0);
  unsubscribe();
  listener.mockClear();
  dispose();
  await jest.advanceTimersByTimeAsync(1000);
  expect(listener).not.toHaveBeenCalled();
  expect(jest.getTimerCount()).toBe(0);
});

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

it('배속·음성 확정은 위치를 보존하고 실패·취소에서는 마지막 확정 설정으로 재생한다', async () => {
  const options = createMockListeningOptionsSource({ delayMs: 100, applyFailures: 1 });
  const store = createListeningStore(createMockListeningSource({ delayMs: 0 }), Date.now, 'A', options);
  const dispose = store.activate();
  store.listen(storyA);
  await jest.advanceTimersByTimeAsync(1000);
  const before = store.getSnapshot().positionSeconds;
  const failure = store.setOptions({ speed: 2.5, voiceId: 'hans' });
  await jest.advanceTimersByTimeAsync(100);
  expect(await failure).toBe(false);
  expect(store.getSnapshot().options).toEqual({ speed: 1, voiceId: 'emma' });
  const retry = store.setOptions({ speed: 2.5, voiceId: 'hans' });
  await jest.advanceTimersByTimeAsync(100);
  expect(await retry).toBe(true);
  const confirmed = store.getSnapshot().positionSeconds;
  expect(confirmed).toBeGreaterThanOrEqual(before);
  await jest.advanceTimersByTimeAsync(2000);
  expect(store.getSnapshot().positionSeconds).toBeCloseTo(confirmed + 5);
  store.listen(storyB);
  await jest.advanceTimersByTimeAsync(0);
  expect(store.getSnapshot().options).toEqual({ speed: 2.5, voiceId: 'hans' });
  const cancelled = store.setOptions({ speed: 1, voiceId: 'emma' });
  store.cancelOptions();
  await jest.advanceTimersByTimeAsync(100);
  expect(await cancelled).toBe(false);
  expect(store.getSnapshot().options.speed).toBe(2.5);
  store.close();
  expect(store.getSnapshot().options.speed).toBe(1);
  dispose();
  expect(jest.getTimerCount()).toBe(0);
});

it.each(['success', 'failure'] as const)(
  '속도 A→B→A·기사 교체·dispose 후 늦은 옵션 %s를 버린다',
  async (outcome) => {
    const pending = [
      deferred<ListeningOptions>(),
      deferred<ListeningOptions>(),
      deferred<ListeningOptions>(),
    ];
    const source = createMockListeningOptionsSource({ delayMs: 0 });
    let index = 0;
    source.apply = () => {
      const request = pending[index++];
      if (!request) throw new Error('Unexpected');
      return request.promise;
    };
    const store = createListeningStore(createMockListeningSource({ delayMs: 0 }), Date.now, 'A', source);
    const dispose = store.activate();
    store.listen(storyA);
    await jest.advanceTimersByTimeAsync(0);
    const first = store.setOptions({ speed: 2.5, voiceId: 'hans' });
    const second = store.setOptions({ speed: 1, voiceId: 'emma' });
    const last = store.setOptions({ speed: 2.5, voiceId: 'hans' });
    pending[2]?.resolve({ speed: 2.5, voiceId: 'hans' });
    expect(await last).toBe(true);
    if (outcome === 'success') {
      pending[0]?.resolve({ speed: 2.5, voiceId: 'hans' });
      pending[1]?.resolve({ speed: 1, voiceId: 'emma' });
    } else {
      pending[0]?.reject(new Error('late'));
      pending[1]?.reject(new Error('late'));
    }
    expect(await first).toBe(false);
    expect(await second).toBe(false);
    expect(store.getSnapshot()).toMatchObject({
      optionsStatus: 'idle',
      options: { speed: 2.5, voiceId: 'hans' },
    });
    const late = deferred<ListeningOptions>();
    source.apply = () => late.promise;
    const oldArticle = store.setOptions({ speed: 1, voiceId: 'emma' });
    store.listen(storyB);
    await jest.advanceTimersByTimeAsync(0);
    late.resolve({ speed: 1, voiceId: 'emma' });
    expect(await oldArticle).toBe(false);
    expect(store.getSnapshot().options.speed).toBe(2.5);
    dispose();
    expect(jest.getTimerCount()).toBe(0);
  },
);
