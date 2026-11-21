import { ReadScopeBoundary } from '../../shared/state/ReadScopeBoundary';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import { useModeration } from '../moderation/ModerationContext';
import { createRelationshipStore, type RelationshipStore } from './createRelationshipStore';
import { createMockRelationshipSource } from './data/createMockRelationshipSource';
import { relationshipPreviewScenario } from './data/relationshipPreview';
import type { RelationshipSource } from './types';

const Context = createContext<{
  store: RelationshipStore | null;
  scope: string;
}>({
  store: null,
  scope: 'unavailable',
});
export function RelationshipProvider({
  children,
  userId,
  revision,
  source,
}: {
  children: ReactNode;
  userId: string | null;
  revision: number;
  source?: RelationshipSource;
}) {
  const { isBlockedForUser } = useModeration();
  const fallback = useMemo(
    () =>
      createMockRelationshipSource({
        scenario: relationshipPreviewScenario,
        canFollow: (owner, target) => target.kind !== 'writer' || !isBlockedForUser(owner, target.id),
      }),
    [isBlockedForUser],
  );
  const current = source ?? fallback;
  const [cache, setCache] = useState(() => ({
    source: current,
    generation: 0,
    stores: new Map<string, RelationshipStore>(),
  }));
  if (cache.source !== current) {
    setCache({
      source: current,
      generation: cache.generation + 1,
      stores: new Map(),
    });
    return null;
  }
  let store = userId ? (cache.stores.get(userId) ?? null) : null;
  if (userId && !store) {
    store = createRelationshipStore(current, userId);
    cache.stores.set(userId, store);
  }
  const scope = JSON.stringify([cache.generation, userId, revision]);
  return (
    <Context.Provider
      value={{
        store,
        scope,
      }}
    >
      <ReadScopeBoundary store={store} scope={scope} />
      {children}
    </Context.Provider>
  );
}
const noop = () => () => {};
export function useRelationships() {
  const context = useContext(Context);
  const snapshot = () => context.store?.getSnapshot() ?? null;
  const raw = useSyncExternalStore(context.store?.subscribe ?? noop, snapshot, snapshot);
  // 확정 데이터 수명은 유지하되 이전 인증 범위의 쓰기 오류와 재시도는 새 화면에 노출하지 않는다.
  const state = useMemo(
    () =>
      raw
        ? {
            ...raw,
            readError: context.store?.getReadScope() === context.scope && raw.readError,
            status: context.store?.getReadScope() !== context.scope && raw.status === 'error' ? 'loading' as const : raw.status,
            errors: raw.errors.filter((key) => raw.errorScopes[key] === context.scope),
          }
        : null,
    [raw, context.scope, context.store],
  );
  useEffect(() => {
    context.store?.ensure();
  }, [context.store, context.scope]);
  return { ...context, state };
}
