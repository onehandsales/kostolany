import { act, render, screen, userEvent, within } from '@testing-library/react-native';
import { StrictMode } from 'react';

import { deferred } from '../feed/tests/helpers';
import { ArticleDetailScreen } from './ArticleDetailScreen';
import { explanationFixtures } from './data/explanationFixtures';
import { articleFixtures } from './data/fixtures';
import { createMockExplanationSource } from './data/mockExplanationSource';
import { ExplanationSection } from './ExplanationSection';
import {
  type ArticleExplanation, type ExplanationLevel, type ExplanationRequest, type ExplanationSource,
  explanationLevelLabels, explanationLevels,
} from './explanationTypes';

const article = articleFixtures[0]!;
const fixture = (level: ExplanationLevel, articleId = article.id) => explanationFixtures.find(item => item.articleId === articleId && item.level === level)!;
const choices = () => within(screen.getByLabelText('설명 수준'));
const body = () => within(screen.getByLabelText('수준별 설명과 예시'));

describe('Explanation levels', () => {
  it.each(explanationLevels)('matches the selected %s level to its explanation and example while keeping facts', async level => {
    const source = jest.fn(createMockExplanationSource({ delayMs: 0 }));
    const user = userEvent.setup();
    await render(<ArticleDetailScreen articleId={article.id} source={async () => article}
      explanationSource={source} onBack={jest.fn()} />);
    await screen.findByText(fixture('adult').example);
    expect(choices().getByRole('radio', { name: '성인' })).toBeChecked();
    await user.press(choices().getByRole('radio', { name: explanationLevelLabels[level] }));
    await screen.findByText(fixture(level).example);
    expect(choices().getAllByRole('radio', { checked: true })).toHaveLength(1);
    expect(choices().getByRole('radio', { name: explanationLevelLabels[level] })).toBeChecked();
    expect(body().getByRole('heading', { name: `${explanationLevelLabels[level]} 수준 설명` })).toBeVisible();
    for (const paragraph of fixture(level).paragraphs) expect(body().getByText(paragraph)).toBeOnTheScreen();
    for (const fact of article.facts) expect(screen.getByText(fact)).toBeOnTheScreen();
    expect(screen.getByRole('heading', { name: '사실 요약' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'AI 해석' })).toBeVisible();
    for (const other of explanationLevels.filter(value => value !== level)) {
      expect(body().queryByText(fixture(other).example)).not.toBeOnTheScreen();
    }
    const requestsBeforeRepeat = source.mock.calls.length;
    await user.press(choices().getByRole('radio', { name: explanationLevelLabels[level] }));
    expect(source).toHaveBeenCalledTimes(requestsBeforeRepeat);
    expect(screen.queryByRole('textbox')).not.toBeOnTheScreen();
  });

  it('replaces the old level with loading and retries only the failed article/level', async () => {
    const retry = deferred<ArticleExplanation>();
    const source = jest.fn<Promise<ArticleExplanation>, [ExplanationRequest]>()
      .mockResolvedValueOnce(fixture('adult'))
      .mockRejectedValueOnce(new Error('not available'))
      .mockReturnValueOnce(retry.promise);
    const user = userEvent.setup();
    await render(<ArticleDetailScreen articleId={article.id} source={async () => article}
      explanationSource={source} onBack={jest.fn()} />);
    await screen.findByText(fixture('adult').example);
    await user.press(choices().getByRole('radio', { name: '중학생' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('중학생 수준 설명을 불러오지 못했어요');
    expect(screen.queryByText('끝까지 읽었습니다.')).not.toBeOnTheScreen();
    expect(screen.queryByText(fixture('adult').example)).not.toBeOnTheScreen();
    expect(screen.getByText(article.facts[0]!)).toBeVisible();
    expect(screen.getByRole('button', { name: '홈으로 돌아가기' })).toBeVisible();
    await user.press(screen.getByRole('button', { name: '설명 다시 시도' }));
    expect(screen.getByText('중학생 수준 설명을 불러오고 있어요')).toBeVisible();
    expect(screen.queryByText('끝까지 읽었습니다.')).not.toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: '설명 다시 시도' })).not.toBeOnTheScreen();
    await act(async () => retry.resolve(fixture('middle')));
    expect(body().getByText(fixture('middle').example)).toBeVisible();
    expect(screen.getByText('끝까지 읽었습니다.')).toBeVisible();
    expect(source.mock.calls).toEqual([
      [{ articleId: article.id, level: 'adult' }],
      [{ articleId: article.id, level: 'middle' }],
      [{ articleId: article.id, level: 'middle' }],
    ]);
  });

  it.each(['resolve', 'reject'] as const)('keeps the last selection after rapid changes and an older %s', async outcome => {
    const previous = deferred<ArticleExplanation>();
    const user = userEvent.setup();
    const source: ExplanationSource = ({ level }) => level === 'elementary' ? previous.promise : Promise.resolve(fixture(level));
    await render(<ExplanationSection articleId={article.id} source={source} />);
    await screen.findByText(fixture('adult').example);
    await user.press(choices().getByRole('radio', { name: '초등학생' }));
    expect(screen.getByText('초등학생 수준 설명을 불러오고 있어요')).toBeVisible();
    expect(screen.queryByText(fixture('adult').example)).not.toBeOnTheScreen();
    await user.press(choices().getByRole('radio', { name: '중학생' }));
    await user.press(choices().getByRole('radio', { name: '고등학생' }));
    await screen.findByText(fixture('high').example);
    await act(async () => {
      if (outcome === 'resolve') previous.resolve(fixture('elementary'));
      else previous.reject(new Error('late failure'));
    });
    expect(choices().getByRole('radio', { name: '고등학생' })).toBeChecked();
    expect(body().getByText(fixture('high').example)).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });

  it('does not revive an abandoned request when returning to the same level', async () => {
    const first = deferred<ArticleExplanation>();
    const second = deferred<ArticleExplanation>();
    const user = userEvent.setup();
    const source = jest.fn<Promise<ArticleExplanation>, [ExplanationRequest]>()
      .mockReturnValueOnce(first.promise)
      .mockResolvedValueOnce(fixture('elementary'))
      .mockReturnValueOnce(second.promise);
    await render(<ExplanationSection articleId={article.id} source={source} />);
    await user.press(choices().getByRole('radio', { name: '초등학생' }));
    await screen.findByText(fixture('elementary').example);
    await user.press(choices().getByRole('radio', { name: '성인' }));
    await act(async () => first.resolve({ ...fixture('adult'), example: '폐기된 성인 예시' }));
    expect(screen.getByText('성인 수준 설명을 불러오고 있어요')).toBeVisible();
    expect(screen.queryByText('폐기된 성인 예시')).not.toBeOnTheScreen();
    await act(async () => second.resolve(fixture('adult')));
    expect(body().getByText(fixture('adult').example)).toBeVisible();
  });

  it('allows another level while a retry is pending and ignores the late retry failure', async () => {
    const retry = deferred<ArticleExplanation>();
    const user = userEvent.setup();
    const source = jest.fn<Promise<ArticleExplanation>, [ExplanationRequest]>()
      .mockRejectedValueOnce(new Error('offline')).mockReturnValueOnce(retry.promise)
      .mockResolvedValueOnce(fixture('middle'));
    await render(<ExplanationSection articleId={article.id} source={source} />);
    await user.press(await screen.findByRole('button', { name: '설명 다시 시도' }));
    await user.press(choices().getByRole('radio', { name: '중학생' }));
    await screen.findByText(fixture('middle').example);
    await act(async () => retry.reject(new Error('old retry')));
    expect(choices().getByRole('radio', { name: '중학생' })).toBeChecked();
    expect(body().getByText(fixture('middle').example)).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });

  it('resets the level for a different article and ignores the previous article response', async () => {
    const previous = deferred<ArticleExplanation>();
    const other = articleFixtures[1]!;
    const source: ExplanationSource = request => request.articleId === article.id && request.level === 'middle'
      ? previous.promise : Promise.resolve(fixture(request.level, request.articleId));
    const articleSource = async (id: string) => id === article.id ? article : other;
    const user = userEvent.setup();
    const view = await render(<ArticleDetailScreen articleId={article.id} source={articleSource}
      explanationSource={source} onBack={jest.fn()} />);
    await screen.findByText(fixture('adult').example);
    await user.press(choices().getByRole('radio', { name: '중학생' }));
    await view.rerender(<ArticleDetailScreen articleId={other.id} source={articleSource}
      explanationSource={source} onBack={jest.fn()} />);
    await screen.findByText(fixture('adult', other.id).example);
    await act(async () => previous.resolve(fixture('middle')));
    expect(choices().getByRole('radio', { name: '성인' })).toBeChecked();
    expect(body().getByText(fixture('adult', other.id).example)).toBeVisible();
    expect(screen.queryByText(fixture('middle').example)).not.toBeOnTheScreen();
  });

  it.each(['article', 'level', 'throw'] as const)('shows an error for a mismatched %s response or synchronous failure', async failure => {
    const source: ExplanationSource = () => {
      if (failure === 'throw') throw new Error('sync failure');
      return Promise.resolve({ ...fixture('adult'), ...(failure === 'article' ? { articleId: 'wrong' } : { level: 'middle' }) });
    };
    await render(<ExplanationSection articleId={article.id} source={source} />);
    expect(await screen.findByRole('alert')).toBeVisible();
    expect(screen.queryByText(fixture('adult').example)).not.toBeOnTheScreen();
  });

  it('survives Strict Mode cleanup without accepting the abandoned response', async () => {
    const abandoned = deferred<ArticleExplanation>();
    const source = jest.fn<Promise<ArticleExplanation>, [ExplanationRequest]>()
      .mockReturnValueOnce(abandoned.promise).mockResolvedValue(fixture('adult'));
    await render(<StrictMode><ExplanationSection articleId={article.id} source={source} /></StrictMode>);
    await screen.findByText(fixture('adult').example);
    await act(async () => abandoned.reject(new Error('abandoned')));
    expect(body().getByText(fixture('adult').example)).toBeVisible();
    expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  });
});
