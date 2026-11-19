import { act, renderHook } from '@testing-library/react-native';

import { deferred } from '../feed/tests/helpers';
import { articleFixtures } from './data/fixtures';
import type { ArticleDetail, ArticleSource } from './types';
import { useArticle } from './useArticle';

const article = articleFixtures[0];
if (!article) throw new Error('Missing article fixture');
const currentArticle: ArticleDetail = { ...article, title: '다시 조회한 기사' };

it.each(['ready', 'error'] as const)('공급부 A→B→A는 이전 %s를 숨기고 마지막 요청의 실패와 재시도를 처리한다', async (status) => {
  const latest = deferred<ArticleDetail>();
  const obsolete = deferred<ArticleDetail>();
  const sourceA = jest.fn<ReturnType<ArticleSource>, Parameters<ArticleSource>>()
    .mockImplementationOnce(() => status === 'ready' ? Promise.resolve(currentArticle) : Promise.reject(new Error('old')))
    .mockReturnValueOnce(latest.promise)
    .mockResolvedValue(currentArticle);
  const sourceB: ArticleSource = () => obsolete.promise;
  const hook = await renderHook(({ source }: { source: ArticleSource }) => useArticle(currentArticle.id, source), {
    initialProps: { source: sourceA },
  });
  expect(hook.result.current.state.status).toBe(status);
  await hook.rerender({ source: sourceB });
  await hook.rerender({ source: sourceA });
  expect(hook.result.current.state).toEqual({ status: 'loading' });
  expect(sourceA).toHaveBeenCalledTimes(2);
  await act(async () => latest.reject(new Error('current failure')));
  expect(hook.result.current.state).toEqual({ status: 'error' });
  await act(async () => {
    if (status === 'ready') obsolete.resolve(currentArticle);
    else obsolete.reject(new Error('obsolete failure'));
  });
  expect(hook.result.current.state).toEqual({ status: 'error' });
  await act(async () => { hook.result.current.retry(); hook.result.current.retry(); });
  expect(sourceA).toHaveBeenCalledTimes(3);
  expect(hook.result.current.state).toEqual({ status: 'ready', article: currentArticle });
});

it('기사 ID A→B→A에서는 마지막 A 응답 전까지 이전 본문을 표시하지 않는다', async () => {
  const latest = deferred<ArticleDetail>();
  const obsolete = deferred<ArticleDetail>();
  const source = jest.fn<ReturnType<ArticleSource>, Parameters<ArticleSource>>()
    .mockResolvedValueOnce(currentArticle).mockReturnValueOnce(obsolete.promise).mockReturnValueOnce(latest.promise);
  const hook = await renderHook(({ articleId }: { articleId: string }) => useArticle(articleId, source), {
    initialProps: { articleId: currentArticle.id },
  });
  await hook.rerender({ articleId: 'other-article' });
  await hook.rerender({ articleId: currentArticle.id });
  expect(hook.result.current.state).toEqual({ status: 'loading' });
  await act(async () => latest.resolve(currentArticle));
  expect(hook.result.current.state).toEqual({ status: 'ready', article: currentArticle });
  await act(async () => obsolete.resolve({ ...currentArticle, id: 'other-article' }));
  expect(hook.result.current.state).toEqual({ status: 'ready', article: currentArticle });
});
