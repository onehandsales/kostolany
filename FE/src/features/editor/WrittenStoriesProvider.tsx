import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import type { DraftSource } from './draftSource';
import type { EditorImageSource } from './imageSource';
import { validPublishedStory, type PublishedStory } from './publishing';

const Context = createContext<{ source: DraftSource; images: EditorImageSource; sessionRevision: number } | null>(null);
export const WrittenStoriesProvider = Context.Provider;
export const useWrittenStories = () => useContext(Context);
const subscribeNothing = () => () => {};
const zero = () => 0;
export function useStoryList(userId: string, sessionRevision: number, visibility: 'public' | 'unlisted', active: boolean) {
  const context = useWrittenStories(); const source = context?.source;
  const revision = useSyncExternalStore(active && source ? source.subscribe : subscribeNothing, active && source ? source.getRevision : zero, zero);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ source: DraftSource; key: string; items: PublishedStory[] | null } | null>(null);
  const key = `${userId}:${sessionRevision}:${visibility}:${revision}:${attempt}`;
  useEffect(() => {
    if (!source || !active) return;
    const abort = new AbortController();
    void source.stories(userId, abort.signal, visibility, userId).then(items => {
      if (new Set(items.map(item => item.id)).size !== items.length || items.some(item => !validPublishedStory(item) || item.userId !== userId || item.publishing.unlisted !== (visibility === 'unlisted'))) throw new Error('invalid-story-list');
      if (!abort.signal.aborted) setResult({ source, key, items });
    }).catch(() => { if (!abort.signal.aborted) setResult({ source, key, items: null }); });
    return () => abort.abort();
  }, [source, key, userId, visibility, active]);
  const current = source ? result?.source === source && result.key === key ? result : null : { items: [] };
  return { status: !current ? 'loading' as const : current.items === null ? 'error' as const : 'ready' as const, items: current?.items ?? [], retry: () => setAttempt(value => value + 1), context };
}
