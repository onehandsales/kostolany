import { act, renderHook } from '@testing-library/react-native';

import { deferred } from '../feed/tests/helpers';
import type { ArticleExplanation, ExplanationLevel, ExplanationSource } from './explanationTypes';
import { useExplanation } from './useExplanation';

const explanation: ArticleExplanation = {
  articleId: 'article-a', level: 'adult', paragraphs: ['현재 수준의 설명'], example: '현재 수준의 예시',
};

it.each(['ready', 'error'] as const)('설명 공급부 A→B→A는 이전 %s와 늦은 응답을 버리고 마지막 설명만 표시한다', async (status) => {
  const latest = deferred<ArticleExplanation>();
  const obsolete = deferred<ArticleExplanation>();
  const sourceA = jest.fn<ReturnType<ExplanationSource>, Parameters<ExplanationSource>>()
    .mockImplementationOnce(() => status === 'ready' ? Promise.resolve(explanation) : Promise.reject(new Error('old')))
    .mockReturnValueOnce(latest.promise);
  const sourceB: ExplanationSource = () => obsolete.promise;
  const hook = await renderHook(({ source }: { source: ExplanationSource }) => useExplanation('article-a', 'adult', source), {
    initialProps: { source: sourceA },
  });
  expect(hook.result.current.state.status).toBe(status);
  await hook.rerender({ source: sourceB });
  await hook.rerender({ source: sourceA });
  expect(hook.result.current.state).toEqual({ status: 'loading' });
  await act(async () => {
    if (status === 'ready') obsolete.resolve(explanation);
    else obsolete.reject(new Error('obsolete failure'));
  });
  expect(hook.result.current.state).toEqual({ status: 'loading' });
  const updated = { ...explanation, paragraphs: ['새 요청에서 받은 설명'] };
  await act(async () => latest.resolve(updated));
  expect(hook.result.current.state).toEqual({ status: 'ready', explanation: updated });
});

it('설명 수준 A→B→A에서는 마지막 요청만 선택된 수준의 설명을 소유한다', async () => {
  const latest = deferred<ArticleExplanation>();
  const obsolete = deferred<ArticleExplanation>();
  const source = jest.fn<ReturnType<ExplanationSource>, Parameters<ExplanationSource>>()
    .mockResolvedValueOnce(explanation).mockReturnValueOnce(obsolete.promise).mockReturnValueOnce(latest.promise);
  const initialProps: { level: ExplanationLevel } = { level: 'adult' };
  const hook = await renderHook(({ level }: { level: ExplanationLevel }) => useExplanation('article-a', level, source), { initialProps });
  await hook.rerender({ level: 'elementary' });
  await hook.rerender({ level: 'adult' });
  expect(hook.result.current.state).toEqual({ status: 'loading' });
  await act(async () => latest.resolve(explanation));
  await act(async () => obsolete.resolve({ ...explanation, level: 'elementary' }));
  expect(hook.result.current.state).toEqual({ status: 'ready', explanation });
});
