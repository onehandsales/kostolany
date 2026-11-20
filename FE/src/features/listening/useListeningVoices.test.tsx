import type { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react-native';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { deferred } from '../feed/tests/helpers';
import { ListeningProvider } from './ListeningProvider';
import { createMockListeningOptionsSource, listeningVoices, type ListeningVoice } from './listeningOptions';
import { useListeningVoices } from './useListeningVoices';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const advance = () =>
  act(async () => {
    await jest.advanceTimersByTimeAsync(200);
  });
it.each(['success', 'failure'] as const)(
  '음성 검색 A→B→A의 늦은 %s와 재시도는 현재 검색을 덮지 않는다',
  async (outcome) => {
    const source = createMockListeningOptionsSource();
    const requests: ReturnType<typeof deferred<ListeningVoice[]>>[] = [];
    source.searchVoices = () => {
      const request = deferred<ListeningVoice[]>();
      requests.push(request);
      return request.promise;
    };
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthProvider initialUser={mockUserA}>
        <ListeningProvider optionsSource={source}>{children}</ListeningProvider>
      </AuthProvider>
    );
    const hook = await renderHook(({ query }: { query: string }) => useListeningVoices(query), {
      initialProps: { query: 'Hans' },
      wrapper,
    });
    await advance();
    await hook.rerender({ query: 'Emma' });
    await advance();
    await hook.rerender({ query: 'Hans' });
    await advance();
    const hans = listeningVoices.filter((voice) => voice.id === 'hans');
    await act(async () => requests[2]?.resolve(hans));
    await act(async () => {
      if (outcome === 'success') {
        requests[0]?.resolve([]);
        requests[1]?.resolve([]);
      } else {
        requests[0]?.reject(new Error('old'));
        requests[1]?.reject(new Error('old'));
      }
    });
    expect(hook.result.current).toMatchObject({ status: 'ready', voices: hans });
    await hook.rerender({ query: 'missing' });
    expect(hook.result.current.status).toBe('loading');
    await advance();
    await act(async () => requests[3]?.reject(new Error('failed')));
    expect(hook.result.current.status).toBe('error');
    await act(async () => hook.result.current.retry());
    await advance();
    await act(async () => requests[4]?.resolve([]));
    expect(hook.result.current).toMatchObject({ status: 'ready', voices: [] });
    await hook.rerender({ query: 'cancelled' });
    await advance();
    await hook.unmount();
    await act(async () => requests[5]?.resolve(hans));
  },
);

it('잘못된 중복 음성 응답과 동기 예외를 오류로 처리하고 선택 공급부를 복구한다', async () => {
  const source = createMockListeningOptionsSource({ delayMs: 0 });
  const original = source.searchVoices;
  let response: 'sync' | 'duplicate' | 'normal' = 'sync';
  source.searchVoices = (query, signal) => {
    if (response === 'sync') throw new Error('sync');
    if (response === 'duplicate') return Promise.resolve([...listeningVoices, ...listeningVoices]);
    return original(query, signal);
  };
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider initialUser={mockUserA}>
      <ListeningProvider optionsSource={source}>{children}</ListeningProvider>
    </AuthProvider>
  );
  const hook = await renderHook(() => useListeningVoices('Hans'), { wrapper });
  await advance();
  expect(hook.result.current.status).toBe('error');
  response = 'duplicate';
  await act(async () => hook.result.current.retry()); await advance();
  expect(hook.result.current.status).toBe('error');
  response = 'normal';
  await act(async () => hook.result.current.retry());
  await advance();
  await act(async () => {
    await jest.advanceTimersByTimeAsync(1);
  });
  expect(hook.result.current.voices[0]?.id).toBe('hans');
});
