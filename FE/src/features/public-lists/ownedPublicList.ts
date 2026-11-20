import type { UserList } from '../bookmarks/listTypes';
import type { PublicList } from './types';

export function ownedPublicListId(userId: string, listId: string): string {
  return `owned:${JSON.stringify([userId, listId])}`;
}

export function toPublicList(list: UserList): PublicList {
  return { id: ownedPublicListId(list.userId, list.listId), owner: { kind: 'writer', id: list.userId },
    title: list.name, description: list.description ?? '', articleIds: [...list.articleIds],
    notes: { ...list.notes }, isPrivate: list.isPrivate ?? false,
    publishedLabel: '', capturedStoryCount: list.articleIds.length, baselineSaves: 0, baselineClaps: 0 };
}
