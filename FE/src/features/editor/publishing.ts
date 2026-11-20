import { publicDirectory } from '../community/data/publicDirectory';
import { topicCatalog } from '../topics/data/topicCatalog';
import { validEditorDocument, type EditorDocument } from './editorModel';

export type PublishOptions = { topicIds: string[]; publicationId: string | null; unlisted: boolean };
export type PublishedStory = { id: string; draftId: string; userId: string; authorName: string; document: EditorDocument; publishing: PublishOptions; publishedAt: string };
export type PublishCommand = { draftId: string; userId: string; document: EditorDocument; publishing: PublishOptions; authorName: string; operationId: string };
export const emptyPublishOptions = (): PublishOptions => ({ topicIds: [], publicationId: null, unlisted: false });
export const clonePublishOptions = (options: PublishOptions): PublishOptions => ({ ...options, topicIds: [...options.topicIds] });
// 공개 자료에 없는 제출 이후 흐름은 두 로컬 publication의 모의 편집자 권한으로 제한한다.
export const mockPublications = publicDirectory.identities.filter(identity => identity.kind === 'publication' && ['ironkeel', 'write-catalyst'].includes(identity.id))
  .map(identity => ({ id: identity.id, name: identity.name }));
export function validPublishOptions(options: PublishOptions): boolean {
  return Boolean(options && typeof options.unlisted === 'boolean' && Array.isArray(options.topicIds) && options.topicIds.length <= 5 &&
    new Set(options.topicIds).size === options.topicIds.length && options.topicIds.every(id => topicCatalog.topics.some(topic => topic.id === id)) &&
    (options.publicationId === null || mockPublications.some(item => item.id === options.publicationId)));
}
export class PublishError extends Error {
  constructor(public readonly uncertain: boolean, message: string) { super(message); }
}
export function validPublishedStory(story: PublishedStory): boolean {
  return Boolean(story && typeof story.id === 'string' && story.id && typeof story.draftId === 'string' && story.draftId &&
    typeof story.userId === 'string' && story.userId && typeof story.authorName === 'string' && story.authorName.trim() &&
    Number.isFinite(Date.parse(story.publishedAt)) && validEditorDocument(story.document) && validPublishOptions(story.publishing));
}
