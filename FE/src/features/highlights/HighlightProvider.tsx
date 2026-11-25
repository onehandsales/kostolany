import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';

import { createHighlightStore, type HighlightStore } from './createHighlightStore';
import { createMockHighlightSource } from './data/createMockHighlightSource';
import { highlightPreviewScenario } from './data/highlightPreview';
import type { HighlightSource } from './types';
import { ReadScopeBoundary } from '../../shared/state/ReadScopeBoundary';
import { useArticleCatalog } from '../feed/ArticleCatalog';
import { useModeration } from '../moderation/ModerationContext';
import { articleWriter } from '../community/data/publicDirectory';
import { useWrittenStories } from '../editor/WrittenStoriesProvider';
import { writtenStoryId } from '../editor/publishedArticle';
import { publishedSelectionDocument } from '../editor/publishedSelection';
import { resolvePassage } from './selectionDocument';
import { SelectionMenuHost } from './SelectionMenuHost';

const Context = createContext<{ store: HighlightStore | null; scope: string }>({ store: null, scope: 'unavailable' });
export function HighlightProvider({ children, userId, revision, source }: { children: ReactNode; userId: string | null; revision: number; source?: HighlightSource }) {
  const catalog = useArticleCatalog();
  const writtenSource = useWrittenStories()?.source;
  const { isBlockedForUser } = useModeration();
  // 저장 직전의 원문과 제출 계정의 차단 상태를 확인해 철회되거나 바뀐 발행 문구를 확정하지 않는다.
  const fallback = useMemo(() => createMockHighlightSource({ scenario: highlightPreviewScenario,
    canHighlight: (owner, passage) => {
      const article = catalog?.getSnapshot().find(value => value.id === passage.articleId);
      if (catalog && !article) return false;
      const storyId = writtenStoryId(passage.articleId);
      if (storyId || article?.publishedStory) {
        const story = writtenSource?.getPublishedSnapshot().find(value => value.id === storyId);
        return Boolean(story && article?.publishedStory?.ownerId === story.userId
          && !isBlockedForUser(owner, story.userId) && resolvePassage(publishedSelectionDocument(story), passage));
      }
      const writer = articleWriter(passage.articleId);
      return !(writer && isBlockedForUser(owner, writer.id));
    },
  }), [catalog, isBlockedForUser, writtenSource]);
  const current = source ?? fallback;
  const [cache, setCache] = useState(() => ({ source: current, generation: 0, stores: new Map<string, HighlightStore>() }));
  if (cache.source !== current) { setCache({ source: current, generation: cache.generation + 1, stores: new Map() }); return null; }
  let store = userId ? cache.stores.get(userId) ?? null : null;
  if (userId && !store) { store = createHighlightStore(current, userId); cache.stores.set(userId, store); }
  const scope = JSON.stringify([cache.generation, userId, revision]);
  return <Context.Provider value={{ store, scope }}><ReadScopeBoundary store={store} scope={scope} />
    <SelectionMenuHost>{children}</SelectionMenuHost>
  </Context.Provider>;
}
const noop = () => () => {};
export function useHighlights() {
  const context = useContext(Context);
  const snapshot = () => context.store?.getSnapshot() ?? null;
  const raw = useSyncExternalStore(context.store?.subscribe ?? noop, snapshot, snapshot);
  const state = raw && context.store?.getReadScope() !== context.scope
    ? { ...raw, readError: false, status: raw.value ? 'ready' as const : 'loading' as const } : raw;
  useEffect(() => { context.store?.ensure(); }, [context.store, context.scope]);
  return { ...context, state };
}
