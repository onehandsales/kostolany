import { act, renderHook } from '@testing-library/react-native';

import { article, deferred } from '../feed/tests/helpers';
import type { SearchResult, SearchSource } from './types';
import { useSearch } from './useSearch';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

async function finishDebounce(): Promise<void> {
  await act(async () => { await jest.advanceTimersByTimeAsync(250); });
}

it('포커스를 떠나면 debounce와 진행 응답을 정리하고 복귀한 확정 결과는 재조회하지 않는다', async () => {
  const old = deferred<SearchResult>();
  const source = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>().mockReturnValueOnce(old.promise)
    .mockResolvedValue({ query: '금리', items: [article('current')] });
  const hook = await renderHook(({ active }: { active: boolean }) => useSearch('금리', source, active), { initialProps: { active: true } });
  await hook.rerender({ active: false }); await finishDebounce(); expect(source).not.toHaveBeenCalled();
  await hook.rerender({ active: true }); await finishDebounce();
  await hook.rerender({ active: false }); await act(async () => old.resolve({ query: '금리', items: [article('old')] }));
  expect(hook.result.current.state.status).toBe('loading');
  await hook.rerender({ active: true }); await finishDebounce();
  expect(hook.result.current.state).toEqual({ status: 'ready', items: [article('current')] });
  await hook.rerender({ active: false }); await hook.rerender({ active: true }); await finishDebounce();
  expect(source).toHaveBeenCalledTimes(2);
});

it.each(['ready', 'error'] as const)('검색 공급부 A→B→A는 이전 %s를 숨기고 늦은 응답보다 새 결과를 유지한다', async (status) => {
  const response: SearchResult = { query: '금리', items: [article('current')] };
  const latest = deferred<SearchResult>();
  const obsolete = deferred<SearchResult>();
  const sourceA = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>()
    .mockImplementationOnce(() => status === 'ready' ? Promise.resolve(response) : Promise.reject(new Error('old')))
    .mockReturnValueOnce(latest.promise);
  const sourceB: SearchSource = () => obsolete.promise;
  const hook = await renderHook(({ source }: { source: SearchSource }) => useSearch('금리', source), {
    initialProps: { source: sourceA },
  });
  await finishDebounce();
  expect(hook.result.current.state.status).toBe(status);
  await hook.rerender({ source: sourceB });
  await finishDebounce();
  await hook.rerender({ source: sourceA });
  expect(hook.result.current.state).toEqual({ status: 'loading' });
  await finishDebounce();
  await act(async () => latest.resolve(response));
  await act(async () => {
    if (status === 'ready') obsolete.resolve({ query: '금리', items: [article('old')] });
    else obsolete.reject(new Error('obsolete failure'));
  });
  expect(hook.result.current.state).toEqual({ status: 'ready', items: response.items });
});

it('호출부를 다시 마운트하지 않아도 검색어 A→B→A의 이전 결과를 숨기고 중간 debounce를 취소한다', async () => {
  const latest = deferred<SearchResult>();
  const source = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>()
    .mockResolvedValueOnce({ query: '금리', items: [article('old')] }).mockReturnValueOnce(latest.promise);
  const hook = await renderHook(({ query }: { query: string }) => useSearch(query, source), { initialProps: { query: '금리' } });
  await finishDebounce();
  await hook.rerender({ query: '환율' });
  await hook.rerender({ query: '금리' });
  expect(hook.result.current.state).toEqual({ status: 'loading' });
  await finishDebounce();
  expect(source.mock.calls).toEqual([['금리'], ['금리']]);
  const items = [article('latest')];
  await act(async () => latest.resolve({ query: '금리', items }));
  expect(hook.result.current.state).toEqual({ status: 'ready', items });
});

it('이전 검색을 재시도했어도 새 검색어는 전체 debounce 시간을 기다린다', async () => {
  const source = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>()
    .mockRejectedValueOnce(new Error('first failure'))
    .mockImplementation(async (query) => ({ query, items: [article(query)] }));
  const hook = await renderHook(({ query }: { query: string }) => useSearch(query, source), {
    initialProps: { query: '금리' },
  });
  await finishDebounce();
  expect(hook.result.current.state.status).toBe('error');
  await act(async () => { hook.result.current.retry(); });
  await act(async () => { await jest.advanceTimersByTimeAsync(0); });
  expect(hook.result.current.state.status).toBe('ready');
  expect(source).toHaveBeenCalledTimes(2);
  await hook.rerender({ query: '환율' });
  await act(async () => { await jest.advanceTimersByTimeAsync(249); });
  expect(source).toHaveBeenCalledTimes(2);
  await act(async () => { await jest.advanceTimersByTimeAsync(1); });
  expect(source.mock.calls).toEqual([['금리'], ['금리'], ['환율']]);
  expect(hook.result.current.state).toEqual({ status: 'ready', items: [article('환율')] });
});
