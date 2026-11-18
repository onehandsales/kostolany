import { useCallback, useEffect, useRef, useState } from 'react';

import type { FeedArticle, FeedSort, FeedSource } from './types';

type FeedState = {
  status: 'loading' | 'ready' | 'error';
  articles: FeedArticle[];
  nextCursor: string | null;
  moreStatus: 'idle' | 'loading' | 'error';
};
type Session = { active: boolean; inFlight: boolean };
type FeedResult = FeedState & { retry: () => void; loadMore: () => void };

const initialState: FeedState = {
  status: 'loading', articles: [], nextCursor: null, moreStatus: 'idle',
};

export function useFeed(sort: FeedSort, source: FeedSource): FeedResult {
  const [result, setResult] = useState({ sort, source, value: initialState });
  const matchesRequest = result.sort === sort && result.source === source;
  const state = matchesRequest ? result.value : initialState;
  // 새 조회 범위는 렌더부터 구분해 이전 기사와 커서가 교체된 공급부에 섞이지 않게 한다.
  if (!matchesRequest) setResult({ sort, source, value: initialState });
  const setState = useCallback((update: (previous: FeedState) => FeedState) => {
    setResult((previous) => previous.sort === sort && previous.source === source
      ? { ...previous, value: update(previous.value) } : previous);
  }, [sort, source]);
  const sessionRef = useRef<Session>({ active: false, inFlight: false });

  const requestPage = useCallback((cursor: string | null, session: Session) => {
    // 같은 렌더에서 여러 번 요청해도 한 페이지 요청만 전송한다.
    if (!session.active || session.inFlight) return;
    session.inFlight = true;

    // 공급부의 동기 예외도 비동기 실패와 같은 경계에서 처리한다.
    void Promise.resolve().then(() => source({ sort, cursor })).then((page) => {
      if (!session.active) return;
      setState((previous) => {
        const articles = cursor === null ? [] : previous.articles;
        const seen = new Set(articles.map((article) => article.id));
        const additions = page.items.filter((article) => {
          if (seen.has(article.id)) return false;
          seen.add(article.id);
          return true;
        });
        return {
          status: 'ready',
          articles: [...articles, ...additions],
          nextCursor: page.nextCursor,
          moreStatus: 'idle',
        };
      });
    }, () => {
      if (session.active) {
        setState((previous) => cursor === null
          ? { ...initialState, status: 'error' }
          : { ...previous, moreStatus: 'error' });
      }
    }).finally(() => {
      session.inFlight = false;
    });
  }, [sort, source, setState]);

  useEffect(() => {
    // Strict Mode의 정리와 재실행도 각각 별도의 요청 수명으로 구분한다.
    const session: Session = { active: true, inFlight: false };
    sessionRef.current = session;
    requestPage(null, session);
    return () => { session.active = false; };
  }, [requestPage]);

  const retry = () => {
    if (state.status === 'error' && !sessionRef.current.inFlight) {
      setState(() => initialState);
      requestPage(null, sessionRef.current);
    }
  };
  const loadMore = () => {
    if (state.status === 'ready' && state.nextCursor !== null && !sessionRef.current.inFlight) {
      setState((previous) => ({ ...previous, moreStatus: 'loading' }));
      requestPage(state.nextCursor, sessionRef.current);
    }
  };

  return { ...state, retry, loadMore };
}
