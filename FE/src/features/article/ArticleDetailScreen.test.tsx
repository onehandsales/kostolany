import { act, render, screen, userEvent, within } from '@testing-library/react-native';
import { StrictMode } from 'react';

import { deferred } from '../feed/tests/helpers';
import { ArticleDetailScreen } from './ArticleDetailScreen';
import { articleFixtures } from './data/fixtures';
import type { ArticleDetail, ArticleSource } from './types';

const illustrated = articleFixtures.find((article) => article.id === 'example-latest-rates')!;
const textOnly = articleFixtures.find((article) => article.id === 'example-latest-exchange')!;

describe('Article detail', () => {
  it('loads the selected ID and shows its metadata, image and separated body sections', async () => {
    const request = deferred<ArticleDetail>();
    const source = jest.fn(() => request.promise);
    await render(<ArticleDetailScreen articleId={illustrated.id} source={source} onBack={jest.fn()} />);
    expect(screen.getByText('기사 내용을 불러오고 있어요')).toBeVisible();
    expect(screen.getByRole('button', { name: '홈으로 돌아가기' })).toBeVisible();
    expect(source).toHaveBeenCalledWith(illustrated.id);

    await act(async () => request.resolve(illustrated));
    expect(screen.queryByText('기사 내용을 불러오고 있어요')).not.toBeOnTheScreen();
    expect(screen.getByRole('heading', { name: illustrated.title })).toBeVisible();
    expect(screen.getByText(illustrated.subtitle)).toBeVisible();
    expect(screen.getByText(`출처 · ${illustrated.sourceName}`)).toBeVisible();
    expect(screen.getByText(`${illustrated.readingMinutes}분 읽기 · ${illustrated.publishedLabel}`)).toBeVisible();
    expect(screen.getByRole('img', { name: illustrated.image!.description })).toBeVisible();
    expect(screen.getByText(illustrated.image!.caption)).toBeVisible();
    const body = within(screen.getByLabelText('기사 본문'));
    expect(body.getByRole('heading', { name: '사실 요약' })).toBeVisible();
    expect(body.getByRole('heading', { name: 'AI 해석' })).toBeVisible();
    await screen.findByText(illustrated.interpretation[0]!);
    for (const paragraph of [...illustrated.facts, ...illustrated.interpretation]) {
      expect(body.getByText(paragraph)).toBeOnTheScreen();
    }
    expect(body.getByText('끝까지 읽었습니다.')).toBeOnTheScreen();
  });

  it('reads an article without an image and returns using the back button', async () => {
    const back = jest.fn();
    const user = userEvent.setup();
    await render(<ArticleDetailScreen articleId={textOnly.id} source={async () => textOnly} onBack={back} />);
    expect(await screen.findByRole('heading', { name: textOnly.title })).toBeVisible();
    expect(screen.queryByRole('img')).not.toBeOnTheScreen();
    expect(screen.queryByText('Kostolany에서 만든 예시 삽화')).not.toBeOnTheScreen();
    expect(screen.getByText(textOnly.facts[0]!)).toBeOnTheScreen();
    await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
    expect(back).toHaveBeenCalledTimes(1);
  });

  it('retries the same article after failure and removes retry while a request is pending', async () => {
    const retryRequest = deferred<ArticleDetail>();
    const source = jest.fn<Promise<ArticleDetail>, [string]>()
      .mockRejectedValueOnce(new Error('unavailable'))
      .mockReturnValueOnce(retryRequest.promise);
    const user = userEvent.setup();
    await render(<ArticleDetailScreen articleId={illustrated.id} source={source} onBack={jest.fn()} />);
    expect(await screen.findByRole('alert')).toHaveTextContent('기사 내용을 불러오지 못했어요');
    expect(screen.getByRole('button', { name: '홈으로 돌아가기' })).toBeVisible();
    await user.press(screen.getByRole('button', { name: '다시 시도' }));
    expect(screen.getByText('기사 내용을 불러오고 있어요')).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: '다시 시도' })).not.toBeOnTheScreen();
    await act(async () => retryRequest.resolve(illustrated));
    expect(screen.getByRole('heading', { name: illustrated.title })).toBeVisible();
    expect(source.mock.calls).toEqual([[illustrated.id], [illustrated.id]]);
  });

  it.each(['resolve', 'reject'] as const)('ignores a late %s when a different article is opened', async (outcome) => {
    const previous = deferred<ArticleDetail>();
    const source: ArticleSource = (id) => id === illustrated.id ? previous.promise : Promise.resolve(textOnly);
    const view = await render(<ArticleDetailScreen articleId={illustrated.id} source={source} onBack={jest.fn()} />);
    await view.rerender(<ArticleDetailScreen articleId={textOnly.id} source={source} onBack={jest.fn()} />);
    await screen.findByRole('heading', { name: textOnly.title });
    await act(async () => {
      if (outcome === 'resolve') previous.resolve(illustrated);
      else previous.reject(new Error('obsolete failure'));
    });
    expect(screen.getByRole('heading', { name: textOnly.title })).toBeVisible();
    expect(screen.queryByText(illustrated.title)).not.toBeOnTheScreen();
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });

  it('hides already loaded content when the data source changes', async () => {
    const replacement = deferred<ArticleDetail>();
    const view = await render(<ArticleDetailScreen articleId={illustrated.id} source={async () => illustrated} onBack={jest.fn()} />);
    await screen.findByRole('heading', { name: illustrated.title });
    await view.rerender(<ArticleDetailScreen articleId={illustrated.id} source={() => replacement.promise} onBack={jest.fn()} />);
    expect(screen.queryByText(illustrated.title)).not.toBeOnTheScreen();
    expect(screen.getByText('기사 내용을 불러오고 있어요')).toBeVisible();
    await act(async () => replacement.resolve({ ...illustrated, title: '변경된 기사 제목' }));
    expect(screen.getByRole('heading', { name: '변경된 기사 제목' })).toBeVisible();
  });

  it.each(['throw', 'wrong-id'] as const)('shows an error instead of incorrect content for %s', async (failure) => {
    const source: ArticleSource = () => {
      if (failure === 'throw') throw new Error('synchronous source failure');
      return Promise.resolve(textOnly);
    };
    await render(<ArticleDetailScreen articleId={illustrated.id} source={source} onBack={jest.fn()} />);
    expect(await screen.findByRole('alert')).toBeVisible();
    expect(screen.queryByText(textOnly.title)).not.toBeOnTheScreen();
    expect(screen.getByRole('button', { name: '다시 시도' })).toBeVisible();
  });

  it('ignores the abandoned request after Strict Mode restarts the effect', async () => {
    const abandoned = deferred<ArticleDetail>();
    const source = jest.fn<Promise<ArticleDetail>, [string]>()
      .mockReturnValueOnce(abandoned.promise).mockResolvedValue(illustrated);
    await render(<StrictMode><ArticleDetailScreen articleId={illustrated.id} source={source} onBack={jest.fn()} /></StrictMode>);
    await screen.findByRole('heading', { name: illustrated.title });
    await act(async () => abandoned.reject(new Error('abandoned')));
    expect(screen.getByRole('heading', { name: illustrated.title })).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });
});
