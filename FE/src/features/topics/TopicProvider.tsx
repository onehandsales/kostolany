import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { topicCatalog } from './data/topicCatalog';
import { topicPreviewScenario } from './data/topicPreview';
import type { TopicCatalog, TopicSource } from './types';

export function createMockTopicSource({
  delay = 80,
  scenario = 'normal',
}: {
  delay?: number;
  scenario?: 'normal' | 'read-error' | 'slow' | 'empty';
} = {}): TopicSource {
  let failed = false;
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, scenario === 'slow' ? 3000 : delay));
    if (scenario === 'read-error' && !failed) {
      failed = true;
      throw new Error('Mock topic failure');
    }
    return scenario === 'empty' ? { topics: [], curations: [] } : topicCatalog;
  };
}
export function validTopicCatalog(data: TopicCatalog): boolean {
  if (!data || !Array.isArray(data.topics) || !Array.isArray(data.curations)) return false;
  const topicIds = new Set(data.topics.map((item) => item?.id));
  const curationIds = new Set(data.curations.map((item) => item?.id));
  return (
    topicIds.size === data.topics.length &&
    curationIds.size === data.curations.length &&
    data.topics.every(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        item.id &&
        typeof item.name === 'string' &&
        item.name &&
        Array.isArray(item.related) &&
        item.related.every((id) => topicIds.has(id)) &&
        Array.isArray(item.stories) &&
        item.stories.every((id) => typeof id === 'string' && id) &&
        Array.isArray(item.curations) &&
        item.curations.every((id) => curationIds.has(id)),
    ) &&
    data.curations.every(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        item.id &&
        typeof item.title === 'string' &&
        item.title &&
        typeof item.curatorId === 'string' &&
        item.curatorId &&
        typeof item.listId === 'string' &&
        item.listId &&
        Array.isArray(item.previewStories) &&
        item.previewStories.every((id) => typeof id === 'string' && id),
    )
  );
}
type State = { status: 'loading' | 'ready' | 'error'; data: TopicCatalog | null };
const Context = createContext<{ state: State; retry: () => void }>({
  state: { status: 'ready', data: topicCatalog },
  retry: () => {},
});
export function TopicProvider({ source, children }: { source?: TopicSource; children: ReactNode }) {
  const [fallback] = useState(() => createMockTopicSource({ scenario: topicPreviewScenario }));
  const current = source ?? fallback;
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ source: TopicSource; attempt: number; state: State }>({
    source: current,
    attempt: 0,
    state: { status: 'loading', data: null },
  });
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    let active = true;
    void Promise.resolve()
      .then(current)
      .then((data) => {
        if (!validTopicCatalog(data)) throw new Error('Invalid topics');
        return data;
      })
      .then(
        (data) => {
          if (active) setResult({ source: current, attempt, state: { status: 'ready', data } });
        },
        () => {
          if (active) setResult({ source: current, attempt, state: { status: 'error', data: null } });
        },
      );
    return () => {
      active = false;
    };
  }, [current, attempt]);
  return (
    <Context.Provider
      value={{
        state:
          result.source === current && result.attempt === attempt
            ? result.state
            : { status: 'loading', data: null },
        retry,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useTopics = () => useContext(Context);
