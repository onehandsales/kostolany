import { useCallback, useContext, useEffect, useSyncExternalStore } from 'react';

import { LikeStoreContext } from './LikeProvider';
import type { LikeSnapshot } from './types';

export function useArticleLike(articleId: string): {
  state: LikeSnapshot; toggleLike: () => void; retryLike: () => void;
} {
  const store = useContext(LikeStoreContext);
  if (!store) throw new Error('LikeProvider is required');
  const subscribe = useCallback((listener: () => void) => store.subscribe(articleId, listener), [articleId, store]);
  const getSnapshot = useCallback(() => store.getSnapshot(articleId), [articleId, store]);
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  useEffect(() => { store.ensureArticleLike(articleId); }, [articleId, store]);

  return {
    state,
    // 같은 렌더에서 연속 입력되어도 공유 저장소의 최신 목표를 기준으로 전환한다.
    toggleLike: () => store.setArticleLiked(articleId, !store.getSnapshot(articleId).isLiked),
    retryLike: () => store.retryArticleLike(articleId),
  };
}
