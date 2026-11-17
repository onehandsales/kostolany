import { useCallback, useEffect, useRef, useState } from 'react';

import type { FeedArticle, FeedSort, FeedSource } from './types';

type FeedState = {
  status: 'loading' | 'ready' | 'error';
  articles: FeedArticle[];
  nextCursor: string | null;
  moreStatus: 'idle' | 'loading' | 'error';
};
type Session = { active: boolean; inFlight: boolean };

const initialState: FeedState = {
  status: 'loading', articles: [], nextCursor: null, moreStatus: 'idle',
};

export function useFeed(sort: FeedSort, source: FeedSource) {
  const [state, setState] = useState<FeedState>(initialState);
  const sessionRef = useRef<Session>({ active: false, inFlight: false });

  const requestPage = useCallback((cursor: string | null, session: Session) => {
    // A synchronous guard also covers two load-more events in the same render.
    if (!session.active || session.inFlight) return;
    session.inFlight = true;

    // Normalize a synchronous adapter throw to a rejection as well as awaiting its result.
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
  }, [sort, source]);

  useEffect(() => {
    // Each effect owns its lifetime, including Strict Mode cleanup/restart.
    const session: Session = { active: true, inFlight: false };
    sessionRef.current = session;
    requestPage(null, session);
    return () => { session.active = false; };
  }, [requestPage]);

  const retry = () => {
    if (state.status === 'error' && !sessionRef.current.inFlight) {
      setState(initialState);
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
