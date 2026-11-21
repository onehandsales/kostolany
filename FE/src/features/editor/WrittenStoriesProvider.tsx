import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ContextType, type ReactNode } from 'react';
import type { DraftSource } from './draftSource';
import type { EditorImageSource } from './imageSource';
import { validPublishedStory, type PublishedStory } from './publishing';

const Context = createContext<{ source: DraftSource; images: EditorImageSource; sessionRevision: number } | null>(null);
export function WrittenStoriesProvider({ value, children }: { value: NonNullable<ContextType<typeof Context>>; children: ReactNode }) {
  const { source, images } = value;
  useEffect(() => {
    const release = images.activate?.();
    const sync = () => images.retainDocuments?.(source.getImageAssetIds?.() ?? []);
    sync();
    const unsubscribe = source.subscribe(sync);
    return () => { unsubscribe(); release?.(); };
  }, [source, images]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useWrittenStories = () => useContext(Context);
const subscribeNothing = () => () => {};
const zero = () => 0;
export function useStoryList(userId: string, sessionRevision: number, visibility: 'public' | 'unlisted', active: boolean) {
  const context = useWrittenStories(); const source = context?.source;
  // 상세 진입으로 구독을 멈춰도 목록 identity를 0으로 바꾸지 않아 복귀할 스크롤과 행을 보존한다.
  const revision = useSyncExternalStore(active && source ? source.subscribe : subscribeNothing, source?.getRevision ?? zero, zero);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{ source: DraftSource; key: string; items: PublishedStory[] | null } | null>(null);
  const key = `${userId}:${sessionRevision}:${visibility}:${revision}:${attempt}`;
  useEffect(() => {
    if (!source || !active) return;
    const abort = new AbortController();
    void Promise.resolve().then(() => source.stories(userId, abort.signal, visibility, userId)).then(items => {
      if (new Set(items.map(item => item.id)).size !== items.length || items.some(item => !validPublishedStory(item) || item.userId !== userId || item.publishing.unlisted !== (visibility === 'unlisted'))) throw new Error('invalid-story-list');
      if (!abort.signal.aborted) setResult({ source, key, items });
    }).catch(() => { if (!abort.signal.aborted) setResult({ source, key, items: null }); });
    return () => abort.abort();
  }, [source, key, userId, visibility, active]);
  const current = source ? result?.source === source && result.key === key ? result : null : { items: [] };
  return { status: !current ? 'loading' as const : current.items === null ? 'error' as const : 'ready' as const, items: current?.items ?? [], retry: () => setAttempt(value => value + 1), context };
}
