import type { ArticleDetail } from '../article/types';
import type { UserList } from '../bookmarks/listTypes';
import type { ImageSourcePropType } from 'react-native';
import type { PublishedStory } from '../editor/publishing';

export type DownloadRequest = { userId: string; listId: string; articleId: string; jobId: string };
export type PublishedDownload = { story: PublishedStory; images: Readonly<Record<string, ImageSourcePropType>> };
export type DownloadArticle = DownloadRequest & { contentVersion: string } & (
  { article: ArticleDetail; published?: undefined } | { article: null; published: PublishedDownload }
);
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
  versions: Readonly<Record<string, string | null>>;
  phase: 'downloading' | 'complete' | 'cancelled' | 'error';
  items: Readonly<Record<string, DownloadArticle & { received: number }>>;
  outdated: boolean;
};
export type DownloadSnapshot = { entries: readonly DownloadEntry[]; online: boolean };
