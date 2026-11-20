import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { AppState } from 'react-native';
import { useAuth } from '../auth/AuthProvider';
import { useArticleModeration } from '../moderation/articleModeration';
import { createListeningStore, type ListeningStore } from './createListeningStore';
import { createMockListeningSource } from './createMockListeningSource';
import { idleListening, type ListeningSource } from './types';
import { createMockListeningOptionsSource, type ListeningOptionsSource } from './listeningOptions';

const Context = createContext<{ store: ListeningStore | null; scope: string }>({ store: null, scope: '' });
type ListeningProviderProps = {
  children: ReactNode;
  source?: ListeningSource;
  optionsSource?: ListeningOptionsSource;
};
export function ListeningProvider({ children, source, optionsSource }: ListeningProviderProps) {
  const { state } = useAuth();
  const [fallback] = useState(createMockListeningSource);
  const [fallbackOptions] = useState(createMockListeningOptionsSource);
  const store = useMemo(
    () =>
      createListeningStore(
        source ?? fallback,
        Date.now,
        JSON.stringify([state.user?.id ?? null, state.revision]),
        optionsSource ?? fallbackOptions,
      ),
    [source, fallback, optionsSource, fallbackOptions, state.user?.id, state.revision],
  );
  const [boundary, setBoundary] = useState({ store, generation: 0 });
  useEffect(() => {
    const dispose = store.activate();
    store.setForeground(AppState.currentState === 'active');
    const subscription = AppState.addEventListener('change', (next) =>
      store.setForeground(next === 'active'),
    );
    return () => {
      subscription.remove();
      dispose();
    };
  }, [store]);
  if (boundary.store !== store) setBoundary({ store, generation: boundary.generation + 1 });
  return (
    <Context.Provider value={{ store, scope: `${store.scope}:${boundary.generation}` }}>
      <ListeningAccessGuard />
      {children}
    </Context.Provider>
  );
}
function ListeningAccessGuard() {
  const { store, snapshot } = useListening();
  const moderation = useArticleModeration();
  const isBlocked = snapshot.story ? moderation.blocked(snapshot.story.articleId) : false;
  // 차단 확정 뒤에는 이미 열려 있던 플레이어도 같은 접근 정책을 따른다.
  useLayoutEffect(() => {
    if (isBlocked) store?.close();
  }, [isBlocked, store]);
  return null;
}
const subscribeNone = () => () => {};
export function useListening() {
  const context = useContext(Context);
  const snapshot = useSyncExternalStore(
    context.store?.subscribe ?? subscribeNone,
    context.store?.getSnapshot ?? (() => idleListening),
    context.store?.getSnapshot ?? (() => idleListening),
  );
  return { ...context, snapshot };
}
