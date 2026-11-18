import { createContext, useMemo, type ReactNode } from 'react';

import { createLikeStore, type LikeStore } from './createLikeStore';
import { createMockLikeSource, MOCK_READER_ID } from './data/createMockLikeSource';
import { likePreviewScenario } from './data/likePreview';
import type { LikeSource } from './types';

export const LikeStoreContext = createContext<LikeStore | null>(null);

type LikeProviderProps = { children: ReactNode; source?: LikeSource; userId?: string };

export function LikeProvider({ children, source, userId = MOCK_READER_ID }: LikeProviderProps) {
  const store = useMemo(() => createLikeStore(source ?? createMockLikeSource({ scenario: likePreviewScenario }), userId), [source, userId]);
  return <LikeStoreContext.Provider value={store}>{children}</LikeStoreContext.Provider>;
}
