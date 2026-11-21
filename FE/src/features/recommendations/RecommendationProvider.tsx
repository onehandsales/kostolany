import { ReadScopeBoundary } from '../../shared/state/ReadScopeBoundary';
import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { ContentStatus } from '../../shared/ui/ContentStatus';

import { useAuth } from '../auth/AuthProvider';
import { LibrarySheet } from '../bookmarks/LibrarySheet';

import { createRecommendationStore, type RecommendationStore } from './createRecommendationStore';
import { createMockRecommendationSource } from './data/createMockRecommendationSource';
import { recommendationPreviewScenario } from './data/recommendationPreview';
import type { RecommendationSource } from './types';

const Context = createContext<{
  store: RecommendationStore | null;
  scope: string;
  showLess: (id: string, title: string) => void;
}>({ store: null, scope: '', showLess: () => {} });
export function RecommendationProvider({
  children,
  source,
}: {
  children: ReactNode;
  source?: RecommendationSource;
}) {
  const auth = useAuth();
  const [fallback] = useState(() =>
    createMockRecommendationSource({ scenario: recommendationPreviewScenario }),
  );
  const current = source ?? fallback;
  const [cache, setCache] = useState(() => ({
    source: current,
    generation: 0,
    stores: new Map<string, RecommendationStore>(),
  }));
  const [entry, setEntry] = useState<{ scope: string; id: string; title: string; operation: string } | null>(
    null,
  );
  if (cache.source !== current) {
    setCache({ source: current, generation: cache.generation + 1, stores: new Map() });
    return null;
  }
  const userId = auth.state.user?.id ?? null;
  let store = userId ? (cache.stores.get(userId) ?? null) : null;
  if (userId && !store) {
    store = createRecommendationStore(current, userId);
    cache.stores.set(userId, store);
  }
  const scope = JSON.stringify([cache.generation, userId, auth.state.revision]);
  if (entry && entry.scope !== scope) setEntry(null);
  return (
    <Context.Provider
      value={{
        store,
        scope,
        showLess: (id, title) => {
          if (!userId) {
            auth.store.openLogin({ kind: 'recommendations' });
            return;
          }
          setEntry({
            scope,
            id,
            title,
            operation: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
          });
        },
      }}
    >
      <ReadScopeBoundary store={store} scope={scope} />
      {children}
      {entry?.scope === scope && (
        <ShowLessDialog key={`${scope}:${entry.operation}`} {...entry} onClose={() => setEntry(null)} />
      )}
    </Context.Provider>
  );
}
const noop = () => () => {};
export function useRecommendations() {
  const context = useContext(Context);
  const snapshot = () => context.store?.getSnapshot() ?? null;
  const raw = useSyncExternalStore(context.store?.subscribe ?? noop, snapshot, snapshot);
  const state = raw && context.store?.getReadScope() !== context.scope
    ? { ...raw, readError: false, status: raw.value ? 'ready' as const : 'loading' as const } : raw;
  useEffect(() => {
    context.store?.ensure();
  }, [context.store, context.scope]);
  return { ...context, state, hidden: (id: string) => state?.value?.hiddenArticleIds.includes(id) ?? false };
}
function ShowLessDialog({
  id,
  title,
  operation,
  onClose,
}: {
  id: string;
  title: string;
  operation: string;
  onClose: () => void;
}) {
  const { store, state } = useRecommendations();
  const { colors } = useTheme();
  const [controller] = useState(() => new AbortController());
  const [result, setResult] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');
  const [undo, setUndo] = useState(false);
  useEffect(() => () => controller.abort(), [controller]);
  async function submit(hidden: boolean) {
    if (!store || result === 'saving') return;
    setResult('saving');
    const success = await store.execute(
      { operationId: hidden ? operation : `${operation}:undo`, articleId: id, hidden },
      controller.signal,
    );
    if (controller.signal.aborted) return;
    setResult(success ? 'saved' : 'failed');
    setUndo(!hidden);
  }
  const button = (label: string, onPress: () => void) => (
    <Pressable
      role="button"
      accessibilityLabel={label}
      onPress={onPress}
      disabled={result === 'saving'}
      style={{ minHeight: 48, padding: 16, justifyContent: 'center' }}
    >
      <Text style={{ color: colors.text }}>{label}</Text>
    </Pressable>
  );
  return (
    <LibrarySheet
      title="Show less like this"
      onClose={onClose}
      closeLabel="Close recommendation action"
      closeText="Close"
    >
      <Text style={{ color: colors.text, padding: 16 }}>{title}</Text>
      {state?.status === 'loading' ? (
        <ContentStatus loading message="Loading preferences…" />
      ) : state?.readError ? (
        <ContentStatus
          error
          message="Couldn’t load preferences."
          actionLabel="Retry recommendation preferences"
          onAction={() => {
            void store?.reload();
          }}
        />
      ) : (
        <>
          {result === 'saved' ? (
            <View>
              <Text aria-live="polite" style={{ padding: 16, color: colors.text }}>
                {undo ? 'Story restored to recommendations.' : 'We’ll show less like this.'}
              </Text>
              {!undo &&
                button('Undo show less', () => {
                  void submit(false);
                })}
            </View>
          ) : (
            <>
              <Text style={{ color: colors.secondaryText, paddingHorizontal: 16 }}>
                Hide this story from recommendations. Your saves and reactions stay.
              </Text>
              {result === 'failed' && (
                <Text role="alert" style={{ padding: 16, color: colors.destructive }}>
                  Couldn’t update recommendations. Try again.
                </Text>
              )}
              {button(
                result === 'failed'
                  ? 'Retry show less'
                  : result === 'saving'
                    ? 'Saving recommendation…'
                    : 'Confirm show less',
                () => {
                  void submit(!undo);
                },
              )}
            </>
          )}
        </>
      )}
    </LibrarySheet>
  );
}
