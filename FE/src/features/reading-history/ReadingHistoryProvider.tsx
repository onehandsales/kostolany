import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';

import { useAuth } from '../auth/AuthProvider';

import { historyPreviewScenario } from './data/historyPreview';
import { createReadingHistoryStore, type ReadingHistoryStore } from './createReadingHistoryStore';
import { createMockReadingHistorySource } from './data/createMockReadingHistorySource';
import type { ReadingHistorySource } from './types';

const HistoryContext = createContext<ReadingHistoryStore | null>(null);
type ReadingHistoryProviderProps = {
  children: ReactNode;
  userId: string | null;
  source?: ReadingHistorySource;
  revision?: number;
};
export function ReadingHistoryProvider({
  children,
  userId,
  source,
  revision = 0,
}: ReadingHistoryProviderProps) {
  const [fallback] = useState(() => createMockReadingHistorySource({ scenario: historyPreviewScenario }));
  const current = source ?? fallback;
  const [scope, setScope] = useState(() => ({
    source: current,
    stores: new Map<string, ReadingHistoryStore>(),
  }));
  if (scope.source !== current) {
    setScope({ source: current, stores: new Map() });
    return null;
  }
  let store = userId ? (scope.stores.get(userId) ?? null) : null;
  if (userId && !store) {
    store = createReadingHistoryStore(current, userId);
    scope.stores.set(userId, store);
  }
  return (
    <HistoryContext.Provider value={store}>
      <HistorySession store={store} scope={JSON.stringify([userId, revision])}>
        {children}
      </HistorySession>
    </HistoryContext.Provider>
  );
}
function HistorySession({
  store,
  scope,
  children,
}: {
  store: ReadingHistoryStore | null;
  scope: string;
  children: ReactNode;
}) {
  useEffect(() => {
    store?.activate(scope);
    return () => store?.deactivate(scope);
  }, [store, scope]);
  return children;
}
const noopSubscribe = () => () => {};
export function useReadingHistory() {
  const store = useContext(HistoryContext);
  const auth = useAuth();
  const scope = JSON.stringify([auth.state.user?.id ?? null, auth.state.revision]);
  const getState = () => store?.getSnapshot() ?? null;
  const raw = useSyncExternalStore(store?.subscribe ?? noopSubscribe, getState, getState);
  const state = raw
    ? { ...raw, error: raw.error === 'write' && raw.errorScope !== scope ? null : raw.error }
    : null;
  useEffect(() => {
    store?.ensure();
  }, [store]);
  return { store, state, scope, visits: state?.visits ?? [] };
}
export function useHasViewed(articleId: string): boolean {
  const store = useContext(HistoryContext);
  const getViewed = () => store?.getSnapshot().visits.some((visit) => visit.articleId === articleId) ?? false;
  const viewed = useSyncExternalStore(store?.subscribe ?? noopSubscribe, getViewed, getViewed);
  useEffect(() => {
    store?.ensure();
  }, [store]);
  return viewed;
}
export function RecordArticleVisit({
  articleId,
  active,
  revision,
}: {
  articleId: string;
  active: boolean;
  revision: number;
}) {
  const store = useContext(HistoryContext);
  useEffect(() => {
    if (active) store?.record(articleId, undefined, JSON.stringify([store.userId, revision]));
  }, [store, articleId, active, revision]);
  return store ? <HistoryFeedback store={store} /> : null;
}
function HistoryFeedback({ store }: { store: ReadingHistoryStore }) {
  const { state, scope } = useReadingHistory();
  const { colors } = useTheme();
  if (!state?.error) return null;
  return (
    <Pressable
      role="button"
      accessibilityLabel="읽기 이력 다시 시도"
      onPress={() => store.retry(scope)}
      style={{ minHeight: 48, justifyContent: 'center', paddingHorizontal: 24 }}
    >
      <Text role="alert" style={{ color: colors.destructive }}>
        읽기 이력을 {state.error === 'read' ? '불러오지' : '저장하지'} 못했어요. 다시 시도
      </Text>
    </Pressable>
  );
}
