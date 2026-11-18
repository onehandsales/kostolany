import type { ArticleLike, LikeSnapshot, LikeSource } from './types';

type LikeCommand = Readonly<{ id: number; intent: number; liked: boolean }>;
type LikeEntry = {
  confirmed: ArticleLike | null;
  desired: boolean;
  intent: number;
  readGeneration: number;
  isReading: boolean;
  command: LikeCommand | null;
  failedTarget: boolean | null;
  snapshot: LikeSnapshot;
  listeners: Set<() => void>;
};

const initialSnapshot: LikeSnapshot = {
  status: 'loading', isLiked: false, count: null, isPending: false, isRefreshing: false, error: null,
};

export type LikeStore = ReturnType<typeof createLikeStore>;

export function createLikeStore(source: LikeSource, userId: string) {
  const entries = new Map<string, LikeEntry>();
  let nextCommandId = 0;

  function getEntry(articleId: string): LikeEntry {
    const existing = entries.get(articleId);
    if (existing) return existing;
    const entry: LikeEntry = { confirmed: null, desired: false, intent: 0, readGeneration: 0,
      isReading: false, command: null, failedTarget: null, snapshot: initialSnapshot, listeners: new Set() };
    entries.set(articleId, entry);
    return entry;
  }

  function publish(entry: LikeEntry, error: LikeSnapshot['error'] = null): void {
    const confirmed = entry.confirmed;
    entry.snapshot = {
      status: confirmed ? 'ready' : error ? 'error' : 'loading',
      isLiked: confirmed ? entry.desired : false,
      count: confirmed ? confirmed.count + Number(entry.desired) - Number(confirmed.isLiked) : null,
      isPending: entry.command !== null,
      isRefreshing: entry.isReading,
      error,
    };
    entry.listeners.forEach((listener) => listener());
  }

  function validateResponse(response: ArticleLike, articleId: string, liked?: boolean): void {
    if (response.articleId !== articleId || response.userId !== userId
      || typeof response.isLiked !== 'boolean' || !Number.isSafeInteger(response.count)
      || response.count < Number(response.isLiked) || response.count >= Number.MAX_SAFE_INTEGER
      || (liked !== undefined && response.isLiked !== liked)) {
      throw new Error('Invalid like response');
    }
  }

  async function refreshArticleLike(articleId: string): Promise<void> {
    const entry = getEntry(articleId);
    if (entry.isReading || entry.command) return;
    const generation = ++entry.readGeneration;
    entry.isReading = true;
    publish(entry, entry.failedTarget === null ? null : 'write');
    try {
      const response = await source.fetchArticleLike({ articleId, userId });
      if (entry.readGeneration !== generation) return;
      validateResponse(response, articleId);
      entry.confirmed = response;
      entry.desired = response.isLiked;
      entry.isReading = false;
      publish(entry, entry.failedTarget === null ? null : 'write');
    } catch {
      if (entry.readGeneration !== generation) return;
      entry.isReading = false;
      publish(entry, entry.failedTarget === null ? 'read' : 'write');
    }
  }

  async function sendNextCommand(articleId: string, entry: LikeEntry): Promise<void> {
    if (entry.command || !entry.confirmed) return;
    if (entry.desired === entry.confirmed.isLiked) {
      publish(entry);
      return;
    }
    const command: LikeCommand = { id: ++nextCommandId, intent: entry.intent, liked: entry.desired };
    entry.command = command;
    publish(entry);
    try {
      const response = await source.setArticleLiked({ articleId, userId, liked: command.liked, commandId: command.id });
      if (entry.command !== command) return;
      validateResponse(response, articleId, command.liked);
      entry.confirmed = response;
      entry.command = null;
      // 이전 성공은 확정 기준만 갱신하고 처리 중에 들어온 마지막 선택을 유지한다.
      void sendNextCommand(articleId, entry);
    } catch {
      if (entry.command !== command) return;
      entry.command = null;
      if (entry.intent !== command.intent) {
        // 이전 실패는 새 의도를 복구 대상으로 삼지 않고 필요한 최신 명령만 이어 보낸다.
        void sendNextCommand(articleId, entry);
        return;
      }
      entry.failedTarget = command.liked;
      entry.desired = entry.confirmed.isLiked;
      publish(entry, 'write');
    }
  }

  function setArticleLiked(articleId: string, liked: boolean): void {
    const entry = getEntry(articleId);
    if (!entry.confirmed || (entry.desired === liked && entry.failedTarget === null)) return;
    entry.intent += 1;
    entry.desired = liked;
    entry.failedTarget = null;
    // 쓰기 이전에 시작한 조회의 성공과 실패를 모두 무효화한다.
    entry.readGeneration += 1;
    entry.isReading = false;
    if (entry.command) publish(entry);
    else void sendNextCommand(articleId, entry);
  }

  return {
    getSnapshot: (articleId: string): LikeSnapshot => entries.get(articleId)?.snapshot ?? initialSnapshot,
    subscribe(articleId: string, listener: () => void): () => void {
      const entry = getEntry(articleId);
      entry.listeners.add(listener);
      return () => { entry.listeners.delete(listener); };
    },
    ensureArticleLike(articleId: string): void {
      const entry = getEntry(articleId);
      if (!entry.confirmed && entry.snapshot.status === 'loading') void refreshArticleLike(articleId);
    },
    refreshArticleLike,
    setArticleLiked,
    retryArticleLike(articleId: string): void {
      const entry = getEntry(articleId);
      if (entry.command || entry.isReading) return;
      if (entry.failedTarget !== null) setArticleLiked(articleId, entry.failedTarget);
      else if (entry.snapshot.error === 'read') void refreshArticleLike(articleId);
    },
  };
}
