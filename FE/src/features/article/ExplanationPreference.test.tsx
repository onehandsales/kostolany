import { act, render, screen, userEvent } from '@testing-library/react-native';

import { renderWithLikes } from '../../../test/renderWithLikes';
import { deferred } from '../feed/tests/helpers';
import { ArticleDetailScreen } from './ArticleDetailScreen';
import { explanationFixtures } from './data/explanationFixtures';
import { articleFixtures } from './data/fixtures';
import { ExplanationSection } from './ExplanationSection';
import type { ArticleDetail } from './types';
import type { ExplanationLevel, ExplanationPreference, ExplanationSource } from './explanationTypes';

const article = articleFixtures[0]!;
const fixture = (level: ExplanationLevel) => explanationFixtures.find((item) => item.articleId === article.id && item.level === level)!;
const source: ExplanationSource = async ({ level }) => fixture(level);
const ready = (level: ExplanationLevel, scopeKey = 'A:1'): ExplanationPreference => ({ status: 'ready', level, scopeKey });
const pending: ExplanationPreference = { status: 'loading', scopeKey: 'A:1', onRetry: async () => undefined };
const radio = (name: string) => screen.getByRole('radio', { name });

it.each([false, true])('설정 조회 중 수동 선택 여부 %s에 따라 첫 늦은 값을 한 번만 반영한다', async (manual) => {
  const view = await render(<ExplanationSection articleId={article.id} source={source} preference={pending} />);
  await screen.findByText(fixture('adult').example);
  if (manual) await userEvent.setup().press(radio('고등학생'));
  await view.rerender(<ExplanationSection articleId={article.id} source={source} preference={ready('middle')} />);
  expect(await screen.findByText(fixture(manual ? 'high' : 'middle').example)).toBeVisible();
  expect(radio(manual ? '고등학생' : '중학생')).toBeChecked();
  await view.rerender(<ExplanationSection articleId={article.id} source={source} preference={ready('elementary')} />);
  expect(radio(manual ? '고등학생' : '중학생')).toBeChecked();
});
it('임시 기본값 성인을 명시적으로 선택해도 늦은 조회를 적용하지 않는다', async () => {
  const view = await render(<ExplanationSection articleId={article.id} source={source} preference={pending} />);
  await userEvent.setup().press(radio('성인'));
  await view.rerender(<ExplanationSection articleId={article.id} source={source} preference={ready('middle')} />);
  expect(radio('성인')).toBeChecked();
});
it('조회 오류 재시도 중 직접 선택한 수준은 성공 후에도 유지한다', async () => {
  const retry = jest.fn(async () => undefined);
  const view = await render(<ExplanationSection articleId={article.id} source={source}
    preference={{ ...pending, status: 'error', onRetry: retry }} />);
  const user = userEvent.setup(); await user.press(screen.getByRole('button', { name: '기본 설정 다시 시도' }));
  expect(retry).toHaveBeenCalledTimes(1); await user.press(radio('초등학생'));
  await view.rerender(<ExplanationSection articleId={article.id} source={source} preference={ready('middle')} />);
  expect(radio('초등학생')).toBeChecked(); expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});
it('같은 화면 유지와 새 진입을 구분하고 인증 세션 변경은 이전 개인 수준을 정리한다', async () => {
  const view = await render(<ExplanationSection articleId={article.id} source={source} preference={ready('middle')} />);
  await userEvent.setup().press(radio('고등학생'));
  await view.rerender(<ExplanationSection articleId={article.id} source={source} preference={ready('elementary')} />);
  expect(radio('고등학생')).toBeChecked();
  await view.rerender(<ExplanationSection articleId={article.id} source={source} preference={ready('adult', 'B:2')} />);
  expect(radio('성인')).toBeChecked();
  await view.unmount();
  await render(<ExplanationSection articleId={article.id} source={source} preference={ready('elementary')} />);
  expect(radio('초등학생')).toBeChecked();
});
it('기사 본문 조회 중 저장 완료돼도 진입 시 확정한 수준으로 설명·본문·예시가 일치한다', async () => {
  const read = deferred<ArticleDetail>(); const articleSource = () => read.promise;
  const view = await renderWithLikes(<ArticleDetailScreen articleId={article.id} source={articleSource}
    explanationSource={source} preference={ready('middle')} onBack={() => undefined} />);
  await view.rerender(<ArticleDetailScreen articleId={article.id} source={articleSource}
    explanationSource={source} preference={ready('high')} onBack={() => undefined} />);
  await act(async () => read.resolve(article));
  expect(await screen.findByText(fixture('middle').example)).toBeVisible(); expect(radio('중학생')).toBeChecked();
  for (const text of fixture('middle').paragraphs) expect(screen.getByText(text)).toBeVisible();
});
