import type { UserListContent } from './listTypes';

export function copyListContent(content: UserListContent): UserListContent {
  return { ...content, articleIds: [...content.articleIds],
    ...(content.notes && { notes: { ...content.notes } }) };
}

export function sameListContent(left: UserListContent | null, right: UserListContent | null): boolean {
  return left === right || Boolean(left && right && left.name === right.name
    && (left.description ?? '') === (right.description ?? '')
    && (left.isPrivate ?? false) === (right.isPrivate ?? false)
    && left.articleIds.length === right.articleIds.length
    && left.articleIds.every((id, index) => id === right.articleIds[index]
      && (left.notes?.[id] ?? '') === (right.notes?.[id] ?? '')));
}

export function hasInvalidListNotes(content: UserListContent): boolean {
  return content.notes !== undefined && (content.notes === null || typeof content.notes !== 'object'
    || Array.isArray(content.notes) || Object.entries(content.notes).some(([id, note]) =>
      !content.articleIds.includes(id) || typeof note !== 'string'));
}
