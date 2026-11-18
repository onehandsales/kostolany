import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { StrictMode } from 'react';

import { article, deferred } from '../feed/tests/helpers';
import { createMockSearchSource } from './data/mockSearchSource';
import { SearchScreen } from './SearchScreen';
import type { SearchResult, SearchSource } from './types';

const changeQuery = async (query: string) => fireEvent.changeText(screen.getByLabelText('기사 검색어'), query);
async function openSearch(source: SearchSource, onSelectArticle = jest.fn()) {
  await render(<SearchScreen source={source} onSelectArticle={onSelectArticle} />);
  await userEvent.setup().press(screen.getByRole('button', { name: '기사 검색 열기' }));
}

describe('Explore article search', () => {
  it('debounces rapid typing to the last normalized query', async () => {
    const source = jest.fn(createMockSearchSource({ delayMs: 0 }));
    await openSearch(source);
    await changeQuery('금');
    await changeQuery('금리');
    await changeQuery(' 환율 ');
    await screen.findByRole('button', { name: /환율 뉴스에서/ });
    expect(source.mock.calls).toEqual([['환율']]);
    expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue(' 환율 ');
  });

  it('distinguishes initial/whitespace input from no matches and cancels a search before its debounce', async () => {
    const source = jest.fn(createMockSearchSource({ delayMs: 0 }));
    await openSearch(source);
    expect(screen.getByRole('heading', { name: '주제로 찾아보기' })).toBeVisible();
    await changeQuery(' \n ');
    expect(source).not.toHaveBeenCalled();
    await changeQuery('금리');
    expect(screen.getByText('기사를 검색하고 있어요')).toBeVisible();
    await changeQuery('');
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 300)); });
    expect(source).not.toHaveBeenCalled();
    await changeQuery('찾을수없는문자');
    expect(await screen.findByRole('heading', { name: '검색 결과가 없어요' })).toBeVisible();
    expect(screen.queryByRole('heading', { name: '주제로 찾아보기' })).not.toBeOnTheScreen();
    expect(screen.getByText('0개')).toBeVisible();
  });

  it('uses topic shortcuts, shows all matching results and opens the chosen ID', async () => {
    const source = jest.fn(createMockSearchSource({ delayMs: 0 }));
    const select = jest.fn();
    const user = userEvent.setup();
    await render(<SearchScreen source={source} onSelectArticle={select} />);
    await user.press(screen.getByRole('button', { name: '금리 검색' }));
    expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('금리');
    await user.press(await screen.findByRole('button', { name: /고정금리와 변동금리/ }));
    expect(screen.getByText('2개')).toBeVisible();
    expect(select).toHaveBeenCalledWith('example-popular-debt');
    expect(source.mock.calls).toEqual([['금리']]);
    await user.press(screen.getByRole('button', { name: '검색어 지우기' }));
    expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('');
    expect(screen.queryByText('2개')).not.toBeOnTheScreen();
    await user.press(screen.getByRole('button', { name: '탐색 첫 화면으로 돌아가기' }));
    expect(screen.getByRole('heading', { name: '탐색' })).toBeVisible();
  });

  it('shows the current error and retries without duplicate submissions', async () => {
    const pending = deferred<SearchResult>();
    const source = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>().mockRejectedValueOnce(new Error('unavailable')).mockReturnValue(pending.promise);
    await openSearch(source);
    await changeQuery('  금리  ');
    const retry = await screen.findByRole('button', { name: '검색 다시 시도' });
    await act(async () => { await fireEvent.press(retry); await fireEvent.press(retry); });
    await waitFor(() => expect(source).toHaveBeenCalledTimes(2));
    expect(source.mock.calls).toEqual([['금리'], ['금리']]);
    expect(screen.getByText('기사를 검색하고 있어요')).toBeVisible();
    await act(async () => pending.resolve({ query: '금리', items: [article('retry')] }));
    expect(screen.getByRole('button', { name: /예시 기사 retry/ })).toBeVisible();
  });

  it.each(['resolve', 'reject'] as const)('ignores an older %s after the latest query finishes', async (completion) => {
    const old = deferred<SearchResult>();
    const source = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>().mockReturnValueOnce(old.promise)
      .mockResolvedValue({ query: '환율', items: [article('latest')] });
    await openSearch(source);
    await changeQuery('금리');
    await waitFor(() => expect(source).toHaveBeenCalledWith('금리'));
    await changeQuery('환율');
    await screen.findByRole('button', { name: /예시 기사 latest/ });
    await act(async () => completion === 'resolve' ? old.resolve({ query: '금리', items: [article('old')] }) : old.reject(new Error('late')));
    expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('환율');
    expect(screen.getByRole('button', { name: /예시 기사 latest/ })).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: /예시 기사 old/ })).not.toBeOnTheScreen();
  });

  it('keeps the newest A response after A -> B -> A and discards pending work when cleared', async () => {
    const first = deferred<SearchResult>();
    const second = deferred<SearchResult>();
    const source = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise)
      .mockResolvedValue({ query: '금리', items: [article('new-A')] });
    await openSearch(source);
    await changeQuery('금리');
    await waitFor(() => expect(source).toHaveBeenCalledTimes(1));
    await changeQuery('환율');
    await waitFor(() => expect(source).toHaveBeenCalledTimes(2));
    await changeQuery('금리');
    await screen.findByRole('button', { name: /예시 기사 new-A/ });
    await act(async () => first.resolve({ query: '금리', items: [article('old-A')] }));
    expect(screen.queryByRole('button', { name: /예시 기사 old-A/ })).not.toBeOnTheScreen();
    await changeQuery('');
    await act(async () => second.resolve({ query: '환율', items: [article('old-B')] }));
    expect(screen.getByRole('heading', { name: '주제로 찾아보기' })).toBeVisible();
    expect(screen.queryByRole('button', { name: /예시 기사/ })).not.toBeOnTheScreen();
  });

  it('removes previous results immediately when the normalized query changes', async () => {
    const pending = deferred<SearchResult>();
    const source = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>().mockResolvedValueOnce({ query: '금리', items: [article('rates')] }).mockReturnValue(pending.promise);
    await openSearch(source);
    await changeQuery('금리');
    await screen.findByRole('button', { name: /예시 기사 rates/ });
    await changeQuery('환율');
    expect(screen.queryByRole('button', { name: /예시 기사 rates/ })).not.toBeOnTheScreen();
    expect(screen.getByText('기사를 검색하고 있어요')).toBeVisible();
  });

  it.each(['mismatched', 'synchronous'] as const)('handles a %s source failure', async (failure) => {
    const source: SearchSource = failure === 'mismatched'
      ? async () => ({ query: 'wrong', items: [article('wrong')] })
      : () => { throw new Error('sync failure'); };
    await openSearch(source);
    await changeQuery('금리');
    expect(await screen.findByRole('alert')).toHaveTextContent('검색 결과를 불러오지 못했어요');
    expect(screen.queryByRole('button', { name: /예시 기사 wrong/ })).not.toBeOnTheScreen();
  });

  it('survives StrictMode cleanup and ignores an obsolete adapter', async () => {
    const pending = deferred<SearchResult>();
    const source = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>().mockReturnValue(pending.promise);
    const select = jest.fn();
    await render(<StrictMode><SearchScreen source={source} onSelectArticle={select} /></StrictMode>);
    await userEvent.setup().press(screen.getByRole('button', { name: '금리 검색' }));
    await waitFor(() => expect(source).toHaveBeenCalledTimes(1));
    const replacement = jest.fn<ReturnType<SearchSource>, Parameters<SearchSource>>().mockResolvedValue({ query: '금리', items: [article('replacement')] });
    await screen.rerender(<StrictMode><SearchScreen source={replacement} onSelectArticle={select} /></StrictMode>);
    await screen.findByRole('button', { name: /예시 기사 replacement/ });
    await act(async () => pending.resolve({ query: '금리', items: [article('obsolete')] }));
    expect(screen.queryByRole('button', { name: /예시 기사 obsolete/ })).not.toBeOnTheScreen();
  });
});
