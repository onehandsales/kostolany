import { useEffect, useRef, useState } from 'react';

import type { ExplanationLevel, ExplanationSource, ExplanationState } from './explanationTypes';

export function useExplanation(articleId: string, level: ExplanationLevel, source: ExplanationSource): {
  state: ExplanationState; retry: () => void;
} {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{
    articleId: string; level: ExplanationLevel; source: ExplanationSource; value: ExplanationState;
  }>({ articleId, level, source, value: { status: 'loading' } });
  const inFlight = useRef(true);
  const matchesRequest = result.articleId === articleId && result.level === level && result.source === source;
  const state: ExplanationState = matchesRequest ? result.value : { status: 'loading' };
  // 기사·수준·공급부가 바뀌면 이전 결과와 오류를 새 요청에 재사용하지 않는다.
  if (!matchesRequest) setResult({ articleId, level, source, value: { status: 'loading' } });

  useEffect(() => {
    let active = true;
    inFlight.current = true;
    void Promise.resolve().then(() => source({ articleId, level })).then(explanation => {
      if (!active) return;
      if (explanation.articleId !== articleId || explanation.level !== level) {
        throw new Error('Explanation does not match the selected article and level');
      }
      inFlight.current = false;
      setResult({ articleId, level, source, value: { status: 'ready', explanation } });
    }).catch(() => {
      if (!active) return;
      inFlight.current = false;
      setResult({ articleId, level, source, value: { status: 'error' } });
    });
    return () => { active = false; };
  }, [articleId, level, source, attempt]);

  const retry = () => {
    if (state.status !== 'error' || inFlight.current) return;
    inFlight.current = true;
    setResult({ articleId, level, source, value: { status: 'loading' } });
    setAttempt(value => value + 1);
  };
  return { state, retry };
}
