import { useEffect, useRef, useState } from 'react';

import type { SearchSource, SearchState } from './types';

export function useSearch(query: string, source: SearchSource, enabled = true): { state: SearchState; retry: () => void } {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ query: string; source: SearchSource; value: SearchState }>({
    query, source, value: { status: 'loading' },
  });
  const inFlight = useRef(true);
  const matchesRequest = result.query === query && result.source === source;
  const state: SearchState = matchesRequest ? result.value : { status: 'loading' };
  // 호출부의 key와 별개로 검색어·공급부 변경부터 이전 결과와 오류의 수명을 끝낸다.
  if (!matchesRequest) {
    setResult({ query, source, value: { status: 'loading' } });
    setAttempt(0);
  }

  useEffect(() => {
    if (!enabled || !query || (result.query === query && result.source === source && result.value.status !== 'loading')) return;
    let active = true;
    inFlight.current = true;
    const timer = setTimeout(() => {
      void Promise.resolve().then(() => source(query)).then((response) => {
        if (!active) return;
        if (response.query !== query || !Array.isArray(response.items)
          || response.items.some(item => !item?.id) || new Set(response.items.map(item => item.id)).size !== response.items.length)
          throw new Error('Search response does not match the requested query');
        inFlight.current = false;
        setResult({ query, source, value: { status: 'ready', items: response.items } });
      }).catch(() => {
        if (!active) return;
        inFlight.current = false;
        setResult({ query, source, value: { status: 'error' } });
      });
    }, attempt === 0 ? 250 : 0);
    return () => { active = false; clearTimeout(timer); };
  }, [query, source, attempt, enabled, result]);

  const retry = () => {
    if (state.status !== 'error' || inFlight.current) return;
    inFlight.current = true;
    setResult({ query, source, value: { status: 'loading' } });
    setAttempt((value) => value + 1);
  };
  return { state, retry };
}
