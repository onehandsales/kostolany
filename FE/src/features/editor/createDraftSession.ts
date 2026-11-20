import type { AuthStore } from '../auth/createAuthStore';
import { emptyEditor, validEditorDocument, type EditorValue } from './editorModel';
import type { DraftSource } from './draftSource';

type DraftSessionState = {
  value: EditorValue; status: 'loading' | 'ready' | 'error';
  saveStatus: 'idle' | 'pending' | 'saving' | 'saved' | 'error'; dirty: boolean;
};
export type DraftSession = ReturnType<typeof createDraftSession>;

export function createDraftSession(source: DraftSource, auth: AuthStore, scope: { userId: string; revision: number; draftId: string; isNew: boolean }) {
  let state: DraftSessionState = { value: emptyEditor(), status: scope.isNew ? 'ready' : 'loading', saveStatus: 'idle', dirty: false };
  const listeners = new Set<() => void>(); let lease = new AbortController(); let active = false;
  let timer: ReturnType<typeof setTimeout> | undefined; let saving: Promise<boolean> | null = null;
  let readSequence = 0; let savedVersion = scope.isNew ? -1 : 0;
  const valid = () => active && !lease.signal.aborted && auth.getSnapshot().user?.id === scope.userId && auth.getSnapshot().revision === scope.revision;
  function publish(next: DraftSessionState) { state = next; listeners.forEach(listener => listener()); }
  function cancelTimer() { if (timer) clearTimeout(timer); timer = undefined; }
  async function reload() {
    if (!valid()) return;
    const sequence = ++readSequence; publish({ ...state, status: 'loading' });
    try {
      const record = await source.read(scope.userId, scope.draftId, lease.signal);
      if (!valid() || sequence !== readSequence) return;
      if (!record || record.id !== scope.draftId || record.userId !== scope.userId || !validEditorDocument(record.document)) throw new Error('draft-unavailable');
      savedVersion = record.document.version;
      publish({ value: { document: record.document, selection: { start: 0, end: 0 }, typing: [] }, status: 'ready', saveStatus: 'saved', dirty: false });
    } catch { if (valid() && sequence === readSequence) publish({ ...state, status: 'error' }); }
  }
  async function drain(operationLease: AbortController): Promise<boolean> {
    const current = () => valid() && lease === operationLease;
    while (current() && state.dirty) {
      const document = state.value.document;
      publish({ ...state, saveStatus: 'saving' });
      try {
        const record = await source.save({ userId: scope.userId, draftId: scope.draftId, document,
          operationId: `${scope.draftId}:${document.version}` }, operationLease.signal);
        if (!current()) return false;
        if (record.id !== scope.draftId || record.userId !== scope.userId || record.document.version !== document.version ||
          JSON.stringify(record.document) !== JSON.stringify(document)) throw new Error('draft-version-conflict');
        savedVersion = Math.max(savedVersion, record.document.version);
        const dirty = state.value.document.version > savedVersion;
        publish({ ...state, dirty, saveStatus: dirty ? 'pending' : 'saved' });
      } catch {
        if (!current()) return false;
        if (state.value.document.version !== document.version) continue;
        publish({ ...state, saveStatus: 'error' }); return false;
      }
    }
    return current() && state.status === 'ready';
  }
  function flush(): Promise<boolean> {
    cancelTimer();
    if (!valid()) return Promise.resolve(false);
    if (!saving) {
      const task = drain(lease).finally(() => { if (saving === task) saving = null; }); saving = task;
    }
    return saving;
  }
  return {
    source, scope, getSnapshot: () => state,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    activate() {
      active = true; lease = new AbortController(); saving = null;
      const unsubscribe = auth.subscribe(() => {
        if (auth.getSnapshot().user?.id !== scope.userId || auth.getSnapshot().revision !== scope.revision) { active = false; lease.abort(); cancelTimer(); }
      });
      if (!scope.isNew) void reload();
      return () => { active = false; lease.abort(); cancelTimer(); readSequence++; unsubscribe(); };
    },
    edit(value: EditorValue) {
      if (!valid() || state.status !== 'ready') return;
      const changed = value.document !== state.value.document;
      const hasContent = Boolean(value.document.title.trim() || value.document.body.trim() || value.document.images.length);
      const dirty = value.document.version > savedVersion && (savedVersion >= 0 || hasContent || saving !== null);
      publish({ ...state, value, dirty, saveStatus: changed ? dirty ? 'pending' : savedVersion < 0 ? 'idle' : 'saved' : state.saveStatus });
      if (changed) { cancelTimer(); if (dirty) timer = setTimeout(() => { void flush(); }, 600); }
    },
    reload, flush,
  };
}
