import type { FollowTarget } from '../community/types';

export type PublicList = Readonly<{
  id: string;
  owner: FollowTarget;
  title: string;
  description: string;
  publishedLabel: string;
  articleIds: readonly string[];
  capturedStoryCount: number;
  baselineSaves: number;
  baselineClaps: number;
  notes?: Readonly<Record<string, string>>;
  isPrivate?: boolean;
}>;
export type PublicListValue = Readonly<{
  userId: string | null;
  version: number;
  lists: readonly PublicList[];
  savedIds: readonly string[];
}>;
export type SavePublicListCommand = Readonly<{
  userId: string;
  listId: string;
  ownerId: string;
  saved: boolean;
  commandId: string;
}>;
export type PublicListSource = Readonly<{
  read: (userId: string | null) => Promise<PublicListValue>;
  save: (command: SavePublicListCommand) => Promise<PublicListValue>;
  canAccess?: (userId: string | null, listId: string) => boolean;
  subscribe?: (listener: () => void) => () => void;
}>;
export type PublicListSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  value: PublicListValue | null;
  savedIds: readonly string[];
  pendingIds: readonly string[];
  errors: Readonly<Record<string, string>>;
  readError: boolean;
  readErrorScope: string;
  refreshing: boolean;
}>;

export function validatePublicLists(value: PublicListValue, userId: string | null): void {
  if (!value || value.userId !== userId || !Number.isSafeInteger(value.version) || value.version < 0
    || !Array.isArray(value.lists) || !Array.isArray(value.savedIds)) throw new Error('Invalid list response');
  const ids = new Set<string>();
  for (const list of value.lists) {
    if (!list?.id?.trim() || ids.has(list.id) || !list.title?.trim() || !list.owner?.id?.trim()
      || !['writer', 'publication'].includes(list.owner.kind) || !Array.isArray(list.articleIds)
      || list.articleIds.some((id: unknown) => typeof id !== 'string' || !id.trim())
      || new Set(list.articleIds).size !== list.articleIds.length
      || !Number.isSafeInteger(list.baselineSaves) || list.baselineSaves < 0
      || !Number.isSafeInteger(list.baselineClaps) || list.baselineClaps < 0
      || !Number.isSafeInteger(list.capturedStoryCount) || list.capturedStoryCount < list.articleIds.length
      || typeof list.description !== 'string' || typeof list.publishedLabel !== 'string') {
      throw new Error('Invalid public list');
    }
    ids.add(list.id);
  }
  if (new Set(value.savedIds).size !== value.savedIds.length
    || value.savedIds.some(id => !ids.has(id)) || (!userId && value.savedIds.length)) {
    throw new Error('Invalid saved lists');
  }
}
