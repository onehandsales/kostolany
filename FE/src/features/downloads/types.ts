import type { ArticleDetail } from '../article/types';
import type { UserList } from '../bookmarks/listTypes';

export type DownloadRequest = { userId: string; listId: string; articleId: string; jobId: string };
export type DownloadArticle = DownloadRequest & { contentVersion: string; article: ArticleDetail };
export type DownloadSource = {
  getLists: () => readonly UserList[];
  getVersion: (articleId: string) => string | null;
  isOnline: () => boolean;
  subscribe: (listener: () => void) => () => void;
  load: (request: DownloadRequest, signal: AbortSignal) => Promise<DownloadArticle>;
};
export type DownloadEntry = {
  listId: string;
  jobId: string;
  snapshot: UserList;
  phase: 'downloading' | 'complete' | 'cancelled' | 'error';
  items: Readonly<Record<string, DownloadArticle & { received: number }>>;
  outdated: boolean;
};
export type DownloadSnapshot = { entries: readonly DownloadEntry[]; online: boolean };
