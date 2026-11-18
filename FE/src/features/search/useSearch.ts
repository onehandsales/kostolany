import { useEffect, useRef, useState } from 'react';

import type { SearchSource, SearchState } from './types';

// SearchResults의 정규화 검색어 키가 A→B→A에서도 새 요청 수명을 만든다.
export function useSearch(query: string, source: SearchSource): { state: SearchState; retry: () => void } {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ source: SearchSource; value: SearchState }>({
    source, value: { status: 'loading' },
  });
  const inFlight = useRef(true);
  const state: SearchState = result.source === source ? result.value : { status: 'loading' };

  useEffect(() => {
    let active = true;
    inFlight.current = true;
    const timer = setTimeout(() => {
      void Promise.resolve().then(() => source(query)).then((response) => {
        if (!active) return;
        if (response.query !== query) throw new Error('Search response does not match the requested query');
        inFlight.current = false;
        setResult({ source, value: { status: 'ready', items: response.items } });
      }).catch(() => {
        if (!active) return;
        inFlight.current = false;
        setResult({ source, value: { status: 'error' } });
      });
    }, attempt === 0 ? 250 : 0);
    return () => { active = false; clearTimeout(timer); };
  }, [query, source, attempt]);

  const retry = () => {
    if (state.status !== 'error' || inFlight.current) return;
    inFlight.current = true;
    setResult({ source, value: { status: 'loading' } });
    setAttempt((value) => value + 1);
  };
  return { state, retry };
}
