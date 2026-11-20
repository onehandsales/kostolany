import { validEditorDocument, type EditorDocument } from './editorModel';
import { clonePublishOptions, emptyPublishOptions, PublishError, validPublishOptions, type PublishCommand, type PublishedStory, type PublishOptions } from './publishing';

export type Draft = { id: string; userId: string; document: EditorDocument; publishing: PublishOptions; updatedAt: string };
export type SaveDraft = { draftId: string; userId: string; document: EditorDocument; publishing?: PublishOptions; operationId: string };
export type DraftSource = {
  newId: (userId: string) => string;
  list: (userId: string, signal: AbortSignal) => Promise<Draft[]>;
  read: (userId: string, draftId: string, signal: AbortSignal) => Promise<Draft | null>;
  save: (command: SaveDraft, signal: AbortSignal) => Promise<Draft>;
  publish: (command: PublishCommand, signal: AbortSignal) => Promise<PublishedStory>;
  stories: (userId: string, signal: AbortSignal, visibility?: 'public' | 'unlisted', viewerId?: string | null) => Promise<PublishedStory[]>;
  story: (storyId: string, signal: AbortSignal) => Promise<PublishedStory | null>;
  subscribe: (listener: () => void) => () => void;
  getRevision: () => number;
};
export function cloneDocument(document: EditorDocument): EditorDocument {
  return { ...document, blocks: [...document.blocks], marks: document.marks.map(mark => ({ ...mark })),
    images: document.images.map(image => ({ ...image })), mentions: document.mentions.map(mention => ({ ...mention, target: { ...mention.target } })) };
}
const cloneDraft = (draft: Draft): Draft => ({ ...draft, document: cloneDocument(draft.document), publishing: clonePublishOptions(draft.publishing) });
const cloneStory = (story: PublishedStory): PublishedStory => ({ ...story, document: cloneDocument(story.document), publishing: clonePublishOptions(story.publishing) });

export function createMockDraftSource(options: { delayMs?: number; readFailures?: number; storyReadFailures?: number; saveFailures?: number; lostResponses?: number; publishFailures?: number; lostPublishResponses?: number } = {}): DraftSource {
  const records = new Map<string, Draft>(); const owners = new Map<string, string>();
  const operations = new Map<string, string>(); const listeners = new Set<() => void>();
  const stories = new Map<string, PublishedStory>(); const receipts = new Map<string, { operationId: string; fingerprint: string; storyId: string }>();
  let sequence = 0; let revision = 0;
  let readFailures = options.readFailures ?? 0; let saveFailures = options.saveFailures ?? 0; let lostResponses = options.lostResponses ?? 0;
  let publishFailures = options.publishFailures ?? 0; let lostPublishResponses = options.lostPublishResponses ?? 0;
  let storyReadFailures = options.storyReadFailures ?? 0;
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
      const publishing = clonePublishOptions(command.publishing ?? emptyPublishOptions());
      if (!validPublishOptions(publishing)) throw new Error('invalid-publish-options');
      command = { ...command, document, publishing };
      await wait(signal);
      if (signal.aborted) throw new Error('cancelled');
      if (!command.userId || owners.get(command.draftId) !== command.userId || !Number.isSafeInteger(document.version) || document.version < 0) throw new Error('invalid-draft-command');
      if (receipts.has(command.draftId)) throw new Error('draft-already-published');
      const previous = owned(command.userId, command.draftId);
      const operationKey = `${command.userId}:${command.operationId}`;
      const fingerprint = JSON.stringify({ draftId: command.draftId, document, publishing });
      const applied = operations.get(operationKey);
      if (applied && applied !== fingerprint) throw new Error('draft-operation-conflict');
      if (previous && previous.document.version >= document.version) {
        if (previous.document.version === document.version && (JSON.stringify(previous.document) !== JSON.stringify(document) || JSON.stringify(previous.publishing) !== JSON.stringify(publishing))) throw new Error('draft-version-conflict');
        return cloneDraft(previous);
      }
      if (saveFailures-- > 0) throw new Error('draft-save-failed');
      const next = { id: command.draftId, userId: command.userId, document, publishing, updatedAt: new Date().toISOString() };
      records.set(next.id, next); operations.set(operationKey, fingerprint); revision++;
      listeners.forEach(listener => listener());
      // 응답 유실을 재현해도 동일 초안과 문서 버전의 재시도는 새 초안을 만들지 않는다.
      if (lostResponses-- > 0) throw new Error('draft-response-lost');
      return cloneDraft(next);
    },
    async publish(input, signal) {
      if (!validEditorDocument(input.document) || !validPublishOptions(input.publishing)) throw new PublishError(false, 'invalid-story');
      const command = { ...input, document: cloneDocument(input.document), publishing: clonePublishOptions(input.publishing) };
      await wait(signal); if (signal.aborted) throw new Error('cancelled');
      if (owners.get(command.draftId) !== command.userId) throw new PublishError(false, 'story-access-denied');
      const fingerprint = JSON.stringify({ document: command.document, publishing: command.publishing, authorName: command.authorName });
      const receipt = receipts.get(command.draftId);
      if (receipt) {
        if (receipt.operationId !== command.operationId || receipt.fingerprint !== fingerprint) throw new PublishError(true, 'story-already-published');
        return cloneStory(stories.get(receipt.storyId)!);
      }
      const draft = owned(command.userId, command.draftId);
      if (!draft || JSON.stringify(draft.document) !== JSON.stringify(command.document) || JSON.stringify(draft.publishing) !== JSON.stringify(command.publishing)) throw new PublishError(false, 'draft-version-conflict');
      if (!command.document.title.trim() || !command.authorName.trim() || !command.document.body.replaceAll('\uFFFC', '').trim() && !command.document.images.length) throw new PublishError(false, 'story-content-required');
      if (publishFailures-- > 0) throw new PublishError(false, 'publish-failed');
      const story: PublishedStory = { id: `written-${++sequence}`, draftId: command.draftId, userId: command.userId, authorName: command.authorName,
        document: command.document, publishing: command.publishing, publishedAt: new Date().toISOString() };
      // 발행 결과와 초안 봉인을 같은 동기 단계에서 확정해 늦은 자동 저장의 부활을 차단한다.
      stories.set(story.id, story); receipts.set(command.draftId, { operationId: command.operationId, fingerprint, storyId: story.id }); records.delete(command.draftId);
      revision++; listeners.forEach(listener => listener());
      if (lostPublishResponses-- > 0) throw new PublishError(true, 'publish-response-lost');
      return cloneStory(story);
    },
    async stories(userId, signal, visibility = 'public', viewerId = null) {
      await wait(signal); if (signal.aborted) throw new Error('cancelled'); if (storyReadFailures-- > 0) throw new Error('stories-read-failed');
      if (visibility === 'unlisted' && viewerId !== userId) throw new Error('unlisted-index-access-denied');
      return [...stories.values()].filter(story => story.userId === userId && story.publishing.unlisted === (visibility === 'unlisted'))
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id)).map(cloneStory);
    },
    async story(storyId, signal) {
      await wait(signal); if (signal.aborted) throw new Error('cancelled'); if (storyReadFailures-- > 0) throw new Error('story-read-failed');
      const story = stories.get(storyId); return story ? cloneStory(story) : null;
    },
  };
}
