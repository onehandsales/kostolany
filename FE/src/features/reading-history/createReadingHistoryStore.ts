import type { HistorySnapshot, HistoryValue, ReadingHistorySource, ReadingVisit } from './types';

export type ReadingHistoryStore = ReturnType<typeof createReadingHistoryStore>;
export function createReadingHistoryStore(source: ReadingHistorySource, userId: string) {
  let state: HistorySnapshot = {
    status: 'loading',
    visits: [],
    isSaving: false,
    error: null,
    errorScope: null,
  };
  let loaded = false;
  let reading = false;
  let saving = false;
  let intent = 0;
  let commandId = 0;
  let dirty = false;
  let scope = '';
  let activeScope: string | null = '';
  let confirmedVisits: readonly ReadingVisit[] = [];
  let clearedBeforeRead = false;
  let retryCommand: { visits: readonly ReadingVisit[]; commandId: number; intent: number } | null = null;
  const beforeRead = new Map<string, ReadingVisit | null>();
  const listeners = new Set<() => void>();
  function publish(patch: Partial<HistorySnapshot>): void {
    state = { ...state, ...patch };
    listeners.forEach((listener) => listener());
  }
  function validate(value: HistoryValue): void {
    if (
      !value ||
      value.userId !== userId ||
      !Array.isArray(value.visits) ||
      new Set(value.visits.map((visit) => visit.articleId)).size !== value.visits.length ||
      value.visits.some(
        (visit) =>
          typeof visit.articleId !== 'string' ||
          !visit.articleId.trim() ||
          !Number.isFinite(Date.parse(visit.visitedAt)),
      )
    )
      throw new Error('Invalid reading history');
  }
  async function drain(): Promise<void> {
    if (!loaded || saving || !dirty) return;
    const command =
      retryCommand?.intent === intent
        ? retryCommand
        : { visits: state.visits, commandId: ++commandId, intent };
    retryCommand = command;
    const errorScope = scope;
    dirty = false;
    saving = true;
    publish({ isSaving: true, error: null, errorScope: null });
    try {
      const value = await source.save({ userId, visits: command.visits, commandId: command.commandId });
      validate(value);
      if (JSON.stringify(value.visits) !== JSON.stringify(command.visits))
        throw new Error('Mismatched history save');
      confirmedVisits = command.visits;
      saving = false;
      retryCommand = null;
      publish({ isSaving: false });
      void drain();
    } catch {
      saving = false;
      if (command.intent !== intent) {
        retryCommand = null;
        publish({ isSaving: false });
        void drain();
        return;
      }
      if (activeScope !== errorScope) {
        dirty = false;
        retryCommand = null;
        publish({ visits: confirmedVisits, isSaving: false, error: null, errorScope: null });
        return;
      }
      dirty = true;
      publish({ isSaving: false, error: 'write', errorScope });
    }
  }
  async function reload(): Promise<void> {
    if (reading || loaded) return;
    reading = true;
    publish({ status: 'loading', error: null, errorScope: null });
    try {
      const value = await source.read(userId);
      validate(value);
      // 조회 전 삭제 의도와 삭제 뒤의 새 방문을 순서대로 병합하여 오래된 조회의 부활을 막는다.
      const visits = new Map(
        (clearedBeforeRead ? [] : value.visits).map((visit) => [visit.articleId, visit]),
      );
      beforeRead.forEach((visit, id) => {
        if (visit) visits.set(id, visit);
        else visits.delete(id);
      });
      beforeRead.clear();
      confirmedVisits = value.visits;
      loaded = true;
      reading = false;
      publish({
        status: 'ready',
        visits: [...visits.values()].sort((a, b) => b.visitedAt.localeCompare(a.visitedAt)).slice(0, 500),
      });
      void drain();
    } catch {
      reading = false;
      publish({ status: 'error', error: 'read' });
    }
  }
  function update(visits: readonly ReadingVisit[], nextScope: string): void {
    intent += 1;
    scope = nextScope;
    if (activeScope === '') activeScope = nextScope;
    dirty = true;
    publish({ visits, error: null, errorScope: null });
    if (!loaded) void reload();
    else void drain();
  }
  return {
    userId,
    activate(nextScope: string): void {
      activeScope = nextScope;
      if (state.error === 'read') void reload();
    },
    deactivate(previousScope: string): void {
      if (activeScope !== previousScope) return;
      activeScope = null;
      if (state.error === 'write') {
        intent += 1;
        dirty = false;
        retryCommand = null;
        publish({ visits: confirmedVisits, error: null, errorScope: null });
      }
    },
    getSnapshot: () => state,
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    ensure(): void {
      if (!loaded && state.status === 'loading') void reload();
    },
    record(articleId: string, visitedAt = new Date().toISOString(), nextScope = ''): void {
      if (!articleId.trim() || !Number.isFinite(Date.parse(visitedAt))) return;
      const visit = { articleId, visitedAt };
      if (!loaded) beforeRead.set(articleId, visit);
      update(
        [visit, ...state.visits.filter((item) => item.articleId !== articleId)].slice(0, 500),
        nextScope,
      );
    },
    remove(articleId: string, nextScope = ''): void {
      if (!articleId.trim()) return;
      if (!loaded) beforeRead.set(articleId, null);
      update(
        state.visits.filter((item) => item.articleId !== articleId),
        nextScope,
      );
    },
    clear(nextScope = ''): void {
      if (!loaded) {
        clearedBeforeRead = true;
        beforeRead.clear();
      }
      update([], nextScope);
    },
    retry(nextScope = ''): void {
      scope = nextScope;
      if (!loaded) void reload();
      else void drain();
    },
  };
}
