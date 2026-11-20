import { validEditorDocument, type EditorDocument } from './editorModel';

export type Draft = { id: string; userId: string; document: EditorDocument; updatedAt: string };
export type SaveDraft = { draftId: string; userId: string; document: EditorDocument; operationId: string };
export type DraftSource = {
  newId: (userId: string) => string;
  list: (userId: string, signal: AbortSignal) => Promise<Draft[]>;
  read: (userId: string, draftId: string, signal: AbortSignal) => Promise<Draft | null>;
  save: (command: SaveDraft, signal: AbortSignal) => Promise<Draft>;
  subscribe: (listener: () => void) => () => void;
  getRevision: () => number;
};
export function cloneDocument(document: EditorDocument): EditorDocument {
  return { ...document, blocks: [...document.blocks], marks: document.marks.map(mark => ({ ...mark })),
    images: document.images.map(image => ({ ...image })), mentions: document.mentions.map(mention => ({ ...mention, target: { ...mention.target } })) };
}
const cloneDraft = (draft: Draft): Draft => ({ ...draft, document: cloneDocument(draft.document) });

export function createMockDraftSource(options: { delayMs?: number; readFailures?: number; saveFailures?: number; lostResponses?: number } = {}): DraftSource {
  const records = new Map<string, Draft>(); const owners = new Map<string, string>();
  const operations = new Map<string, string>(); const listeners = new Set<() => void>();
  let sequence = 0; let revision = 0;
  let readFailures = options.readFailures ?? 0; let saveFailures = options.saveFailures ?? 0; let lostResponses = options.lostResponses ?? 0;
  async function wait(signal: AbortSignal) {
    if (signal.aborted) throw new Error('cancelled');
    if (options.delayMs === 0) return;
    await new Promise<void>((resolve, reject) => {
      const abort = () => { clearTimeout(timer); reject(new Error('cancelled')); };
      const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, options.delayMs ?? 160);
      signal.addEventListener('abort', abort, { once: true });
    });
    if (signal.aborted) throw new Error('cancelled');
  }
  function owned(userId: string, draftId: string) {
    const draft = records.get(draftId);
    if (draft && draft.userId !== userId) throw new Error('draft-access-denied');
    return draft;
  }
  return {
    newId(userId) { const id = `draft-${userId}-${++sequence}`; owners.set(id, userId); return id; },
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    getRevision: () => revision,
    async list(userId, signal) {
      await wait(signal); if (signal.aborted) throw new Error('cancelled');
      if (readFailures-- > 0) throw new Error('draft-read-failed');
      return [...records.values()].filter(record => record.userId === userId)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.id.localeCompare(b.id)).map(cloneDraft);
    },
    async read(userId, draftId, signal) {
      await wait(signal); if (signal.aborted) throw new Error('cancelled');
      if (readFailures-- > 0) throw new Error('draft-read-failed');
      const record = owned(userId, draftId); return record ? cloneDraft(record) : null;
    },
    async save(command, signal) {
      if (!validEditorDocument(command.document)) throw new Error('invalid-draft-document');
      const document = cloneDocument(command.document);
      command = { ...command, document };
      await wait(signal);
      if (signal.aborted) throw new Error('cancelled');
      if (!command.userId || owners.get(command.draftId) !== command.userId || !Number.isSafeInteger(document.version) || document.version < 0) throw new Error('invalid-draft-command');
      const previous = owned(command.userId, command.draftId);
      const operationKey = `${command.userId}:${command.operationId}`;
      const fingerprint = JSON.stringify({ draftId: command.draftId, document });
      const applied = operations.get(operationKey);
      if (applied && applied !== fingerprint) throw new Error('draft-operation-conflict');
      if (previous && previous.document.version >= document.version) {
        if (previous.document.version === document.version && JSON.stringify(previous.document) !== JSON.stringify(document)) throw new Error('draft-version-conflict');
        return cloneDraft(previous);
      }
      if (saveFailures-- > 0) throw new Error('draft-save-failed');
      const next = { id: command.draftId, userId: command.userId, document, updatedAt: new Date().toISOString() };
      records.set(next.id, next); operations.set(operationKey, fingerprint); revision++;
      listeners.forEach(listener => listener());
      // 응답 유실을 재현해도 동일 초안과 문서 버전의 재시도는 새 초안을 만들지 않는다.
      if (lostResponses-- > 0) throw new Error('draft-response-lost');
      return cloneDraft(next);
    },
  };
}
