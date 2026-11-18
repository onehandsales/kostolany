import { useEffect, useRef, useState } from 'react';

import type { ArticleLoadState, ArticleSource } from './types';

export function useArticle(articleId: string, source: ArticleSource): { state: ArticleLoadState; retry: () => void } {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ articleId: string; source: ArticleSource; value: ArticleLoadState }>({
    articleId, source, value: { status: 'loading' },
  });
  const inFlight = useRef(true);
  const state: ArticleLoadState = result.articleId === articleId && result.source === source
    ? result.value : { status: 'loading' };

  useEffect(() => {
    let active = true;
    inFlight.current = true;
    // 공급부의 동기 예외도 비동기 실패와 같은 오류 상태로 전환한다.
    void Promise.resolve().then(() => source(articleId)).then((article) => {
      if (!active) return;
      if (article.id !== articleId) throw new Error('Article response does not match the requested ID');
      inFlight.current = false;
      setResult({ articleId, source, value: { status: 'ready', article } });
    }).catch(() => {
      if (!active) return;
      inFlight.current = false;
      setResult({ articleId, source, value: { status: 'error' } });
    });
    return () => { active = false; };
  }, [articleId, source, attempt]);

  const retry = () => {
    if (state.status !== 'error' || inFlight.current) return;
    inFlight.current = true;
    setResult({ articleId, source, value: { status: 'loading' } });
    setAttempt((value) => value + 1);
  };

  return { state, retry };
}
