import { createContext, useState, type ReactNode } from 'react';

import { createLikeStore, type LikeStore } from './createLikeStore';
import { createMockLikeSource, MOCK_READER_ID } from './data/createMockLikeSource';
import { likePreviewScenario } from './data/likePreview';
import type { LikeSource } from './types';

export const LikeStoreContext = createContext<LikeStore | null>(null);

type LikeProviderProps = { children: ReactNode; source?: LikeSource; userId?: string | null };

export function LikeProvider({ children, source, userId = MOCK_READER_ID }: LikeProviderProps) {
  const [defaultSource] = useState(() => createMockLikeSource({ scenario: likePreviewScenario }));
  const currentSource = source ?? defaultSource;
  const [scope, setScope] = useState(() => ({ source: currentSource, stores: new Map<string, LikeStore>() }));
  if (scope.source !== currentSource) {
    setScope({ source: currentSource, stores: new Map() });
    return null;
  }
  // 로그아웃은 저장소 삭제가 아니며 진행 중 응답은 처음 요청한 사용자 저장소에만 반영한다.
  let store = userId ? scope.stores.get(userId) ?? null : null;
  if (userId && !store) {
    store = createLikeStore(currentSource, userId);
    scope.stores.set(userId, store);
  }
  return <LikeStoreContext.Provider value={store}>{children}</LikeStoreContext.Provider>;
}
