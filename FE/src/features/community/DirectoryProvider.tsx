import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { followKey, type DirectorySource, type PublicDirectory } from './types';
import { publicDirectory } from './data/publicDirectory';
import { directoryPreviewScenario } from './data/relationshipPreview';

export function createMockDirectorySource({
  delay = 80,
  scenario = 'normal',
}: { delay?: number; scenario?: 'normal' | 'read-error' | 'slow' } = {}): DirectorySource {
  let failed = false;
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, scenario === 'slow' ? 3000 : delay));
    if (scenario === 'read-error' && !failed) {
      failed = true;
      throw new Error('Mock directory failure');
    }
    return publicDirectory;
  };
}
type State = { status: 'loading' | 'ready' | 'error'; data: PublicDirectory | null };
const Context = createContext<{ state: State; retry: () => void }>({
  state: { status: 'ready', data: publicDirectory },
  retry: () => {},
});
export function DirectoryProvider({ source, children }: { source?: DirectorySource; children: ReactNode }) {
  const [fallback] = useState(() => createMockDirectorySource({ scenario: directoryPreviewScenario }));
  const current = source ?? fallback;
  return (
    <DirectoryScope source={current}>
      {children}
    </DirectoryScope>
  );
}
function DirectoryScope({ source, children }: { source: DirectorySource; children: ReactNode }) {
  const [result, setResult] = useState<{ source: DirectorySource; attempt: number; state: State }>({
    source,
    attempt: 0,
    state: { status: 'loading', data: null },
  });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    let active = true;
    void Promise.resolve()
      .then(source)
      .then((data) => {
        if (
          !data ||
          !Array.isArray(data.identities) ||
          data.identities.some(
            (item) =>
              !item.id ||
              !item.name ||
              !Array.isArray(item.stories) ||
              !Array.isArray(item.pinned) ||
              !Array.isArray(item.lists),
          ) ||
          new Set(data.identities.map(followKey)).size !== data.identities.length ||
          !data.following
        )
          throw new Error('Invalid directory');
        return data;
      })
      .then(
        (data) => {
          if (active) setResult({ source, attempt, state: { status: 'ready', data } });
        },
        () => {
          if (active) setResult({ source, attempt, state: { status: 'error', data: null } });
        },
      );
    return () => {
      active = false;
    };
  }, [source, attempt]);
  return (
    <Context.Provider
      value={{
        state:
          result.source === source && result.attempt === attempt
            ? result.state
            : { status: 'loading', data: null },
        retry,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useDirectory = () => useContext(Context);
