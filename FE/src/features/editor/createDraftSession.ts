import type { AuthStore } from '../auth/createAuthStore';
import { emptyEditor, validEditorDocument, type EditorValue } from './editorModel';
import type { DraftSource } from './draftSource';
import { clonePublishOptions, emptyPublishOptions, PublishError, validPublishOptions, type PublishCommand, type PublishedStory, type PublishOptions } from './publishing';

type DraftSessionState = {
  value: EditorValue; status: 'loading' | 'ready' | 'error';
  saveStatus: 'idle' | 'pending' | 'saving' | 'saved' | 'error'; dirty: boolean;
  publishing: PublishOptions; publishStatus: 'idle' | 'pending' | 'error' | 'uncertain' | 'done'; published: PublishedStory | null;
};
export type DraftSession = ReturnType<typeof createDraftSession>;

export function createDraftSession(source: DraftSource, auth: AuthStore, scope: { userId: string; revision: number; draftId: string; isNew: boolean }) {
  let state: DraftSessionState = { value: emptyEditor(), status: scope.isNew ? 'ready' : 'loading', saveStatus: 'idle', dirty: false, publishing: emptyPublishOptions(), publishStatus: 'idle', published: null };
  const listeners = new Set<() => void>(); let lease = new AbortController(); let active = false;
  let timer: ReturnType<typeof setTimeout> | undefined; let saving: Promise<boolean> | null = null;
  let readSequence = 0; let savedVersion = scope.isNew ? -1 : 0;
  let publication: Promise<PublishedStory | null> | null = null; let command: PublishCommand | null = null;
  const valid = () => active && !lease.signal.aborted && auth.getSnapshot().user?.id === scope.userId && auth.getSnapshot().revision === scope.revision;
  function publish(next: DraftSessionState) { state = next; listeners.forEach(listener => listener()); }
  function cancelTimer() { if (timer) clearTimeout(timer); timer = undefined; }
  async function reload() {
    if (!valid() || state.publishStatus === 'pending' || state.publishStatus === 'done' || state.publishStatus === 'uncertain') return;
    const sequence = ++readSequence; publish({ ...state, status: 'loading' });
    try {
      const record = await source.read(scope.userId, scope.draftId, lease.signal);
      if (!valid() || sequence !== readSequence) return;
      if (!record || record.id !== scope.draftId || record.userId !== scope.userId || !validEditorDocument(record.document) || !validPublishOptions(record.publishing)) throw new Error('draft-unavailable');
      savedVersion = record.document.version;
      publish({ ...state, value: { document: record.document, selection: { start: 0, end: 0 }, typing: [] }, publishing: record.publishing, status: 'ready', saveStatus: 'saved', dirty: false });
    } catch { if (valid() && sequence === readSequence) publish({ ...state, status: 'error' }); }
  }
  async function drain(operationLease: AbortController): Promise<boolean> {
    const current = () => valid() && lease === operationLease;
    while (current() && state.dirty) {
      const document = state.value.document; const publishing = state.publishing;
      publish({ ...state, saveStatus: 'saving' });
      try {
        const record = await source.save({ userId: scope.userId, draftId: scope.draftId, document, publishing,
          operationId: `${scope.draftId}:${document.version}` }, operationLease.signal);
        if (!current()) return false;
        if (record.id !== scope.draftId || record.userId !== scope.userId || record.document.version !== document.version ||
          JSON.stringify(record.document) !== JSON.stringify(document) || JSON.stringify(record.publishing) !== JSON.stringify(publishing)) throw new Error('draft-version-conflict');
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
  function edit(value: EditorValue, publishing = state.publishing) {
    if (!valid() || state.status !== 'ready' || ['pending', 'uncertain', 'done'].includes(state.publishStatus)) return;
    const changed = value.document !== state.value.document;
    const hasContent = Boolean(value.document.title.trim() || value.document.body.trim() || value.document.images.length);
    const dirty = value.document.version > savedVersion && (savedVersion >= 0 || hasContent || saving !== null);
    command = null;
    publish({ ...state, value, publishing, dirty, publishStatus: 'idle', saveStatus: changed ? dirty ? 'pending' : savedVersion < 0 ? 'idle' : 'saved' : state.saveStatus });
    if (changed) { cancelTimer(); if (dirty) timer = setTimeout(() => { void flush(); }, 600); }
  }
  async function submit(authorName: string, operationLease: AbortController): Promise<PublishedStory | null> {
    const current = () => valid() && lease === operationLease;
    publish({ ...state, publishStatus: 'pending' });
    if (!command) {
      if (!await flush()) { if (current()) publish({ ...state, publishStatus: 'error' }); return null; }
      if (!current()) return null;
      command = { userId: scope.userId, draftId: scope.draftId, authorName, document: state.value.document,
        publishing: clonePublishOptions(state.publishing), operationId: `publish:${scope.draftId}:${state.value.document.version}` };
    }
    try {
      const story = await source.publish(command, operationLease.signal);
      if (!current()) return null;
      if (story.userId !== scope.userId || story.draftId !== scope.draftId || !story.id ||
        JSON.stringify(story.document) !== JSON.stringify(command.document) || JSON.stringify(story.publishing) !== JSON.stringify(command.publishing)) throw new PublishError(true, 'invalid-publish-result');
      cancelTimer(); publish({ ...state, dirty: false, publishStatus: 'done', published: story }); return story;
    } catch (error) {
      if (current()) publish({ ...state, publishStatus: error instanceof PublishError && !error.uncertain ? 'error' : 'uncertain' });
      return null;
    }
  }
  return {
    source, scope, getSnapshot: () => state,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    activate() {
      active = true; lease = new AbortController(); saving = null; publication = null;
      const unsubscribe = auth.subscribe(() => {
        if (auth.getSnapshot().user?.id !== scope.userId || auth.getSnapshot().revision !== scope.revision) { active = false; lease.abort(); cancelTimer(); }
      });
      if (!scope.isNew) void reload();
      return () => { active = false; lease.abort(); cancelTimer(); readSequence++; unsubscribe(); };
    },
    edit,
    configure(options: PublishOptions) {
      if (!validPublishOptions(options) || JSON.stringify(options) === JSON.stringify(state.publishing)) return;
      edit({ ...state.value, document: { ...state.value.document, version: state.value.document.version + 1 } }, clonePublishOptions(options));
    },
    publish(authorName: string) {
      if (!valid() || state.status !== 'ready') return Promise.resolve(null);
      if (state.publishStatus === 'done') return Promise.resolve(state.published);
      if (!publication) { const task = submit(authorName, lease).finally(() => { if (publication === task) publication = null; }); publication = task; }
      return publication;
    },
    reload, flush,
  };
}
