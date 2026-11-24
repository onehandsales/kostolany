export const DEFAULT_LIST_ID = 'reading-list';
export const MAX_LIST_NAME_LENGTH = 60;

export class UnavailableListError extends Error {
  constructor() { super('Deleted or unavailable owned list'); this.name = 'UnavailableListError'; }
}

export type ListMetadata = Readonly<{ description?: string; isPrivate?: boolean }>;
export type UserListContent = Readonly<{
  name: string;
  articleIds: readonly string[];
  notes?: Readonly<Record<string, string>>;
  // 저장소가 내용 변경을 확정한 시각이며 명령 ID나 화면 진입 시각과 무관하다.
  updatedAt?: number;
}> & ListMetadata;
export type UserList = UserListContent & Readonly<{ userId: string; listId: string }>;
export class ListConflictError extends Error {
  constructor(readonly current: UserListContent) { super('List changed during editing'); this.name = 'ListConflictError'; }
}
export type ListWrite = Readonly<{
  userId: string;
  listId: string;
  content: UserListContent | null;
  commandId: number;
  commandScope?: string;
  operation?: 'create' | 'update' | 'delete';
  expectedContent?: UserListContent | null;
}>;
export type UserListSource = Readonly<{
  managesReadingList?: boolean;
  getCatalog?: () => readonly UserList[];
  subscribe?: (listener: () => void) => () => void;
  fetchLists: (userId: string) => Promise<Readonly<{ userId: string; lists: readonly UserList[] }>>;
  setList: (
    input: ListWrite,
  ) => Promise<Readonly<{ userId: string; listId: string; content: UserListContent | null }>>;
}>;
export type UserListEntrySnapshot = Readonly<{
  listId: string;
  content: UserListContent | null;
  confirmed: UserListContent | null;
  isPending: boolean;
  failure: Readonly<{ name: string; target: UserListContent | null; conflict?: boolean }> | null;
}>;
export type RemovedListStory = Readonly<{
  userId: string;
  scope: string;
  listId: string;
  articleId: string;
  beforeId?: string;
  afterId?: string;
  index: number;
  note?: string;
  removal: number;
}>;
export type UserListsSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  isRefreshing: boolean;
  hasReadError: boolean;
  entries: readonly UserListEntrySnapshot[];
  deletionNotice?: Readonly<{ commandId: number; name: string }> | null;
}>;
export type ListActionResult =
  | Readonly<{ ok: true; listId: string }>
  | Readonly<{ ok: false; message: string }>;
