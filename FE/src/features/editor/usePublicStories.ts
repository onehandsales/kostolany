import { useEffect, useState, useSyncExternalStore } from 'react';
import { useWrittenStories } from './WrittenStoriesProvider';
import { validPublishedStory, type PublishedStory } from './publishing';
import { useProfileScopeKey } from '../profile/ProfileProvider';
import type { DraftSource } from './draftSource';

const subscribeNothing = () => () => {};
const zero = () => 0;

export function usePublicStories(active: boolean) {
  const source = useWrittenStories()?.source;
  const scope = useProfileScopeKey();
  const revision = useSyncExternalStore(
    source?.subscribe ?? subscribeNothing,
    source?.getRevision ?? zero,
    zero,
  );
  const [attempt, setAttempt] = useState(0);
  const key = JSON.stringify([scope, revision, attempt]);
  const [result, setResult] = useState<{
    source: DraftSource;
    key: string;
    items: PublishedStory[] | null;
  } | null>(null);
  const current = source?.publicStories
    ? result?.source === source && result.key === key
      ? result
      : null
    : { items: [] };
  useEffect(() => {
    if (!active || !source?.publicStories || (result?.source === source && result.key === key)) return;
    const abort = new AbortController();
    void Promise.resolve()
      .then(() => source.publicStories?.(abort.signal) ?? [])
      .then((items) => {
        if (
          new Set(items.map((item) => item.id)).size !== items.length ||
          items.some((item) => !validPublishedStory(item) || item.publishing.unlisted)
        )
          throw new Error('invalid-public-story-search');
        if (!abort.signal.aborted) setResult({ source, key, items });
      })
      .catch(() => {
        if (!abort.signal.aborted) setResult({ source, key, items: null });
      });
    return () => abort.abort();
  }, [active, source, key, result]);
  return {
    status: !current ? 'loading' : current.items === null ? 'error' : 'ready',
    items: current?.items ?? [],
    retry: () => setAttempt((value) => value + 1),
  };
}
