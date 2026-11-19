export const DEFAULT_LIST_ID = 'reading-list';
export const MAX_LIST_NAME_LENGTH = 60;

export type ListMetadata = Readonly<{ description?: string; isPrivate?: boolean }>;
export type UserListContent = Readonly<{ name: string; articleIds: readonly string[] }> & ListMetadata;
export type UserList = UserListContent & Readonly<{ userId: string; listId: string }>;
export type ListWrite = Readonly<{
  userId: string;
  listId: string;
  content: UserListContent | null;
  commandId: number;
}>;
export type UserListSource = Readonly<{
  fetchLists: (userId: string) => Promise<Readonly<{ userId: string; lists: readonly UserList[] }>>;
  setList: (
    input: ListWrite,
  ) => Promise<Readonly<{ userId: string; listId: string; content: UserListContent | null }>>;
}>;
export type UserListEntrySnapshot = Readonly<{
  listId: string;
  content: UserListContent | null;
  isPending: boolean;
  failure: Readonly<{ name: string; target: UserListContent | null }> | null;
}>;
export type UserListsSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  isRefreshing: boolean;
  hasReadError: boolean;
  entries: readonly UserListEntrySnapshot[];
}>;
export type ListActionResult =
  | Readonly<{ ok: true; listId: string }>
  | Readonly<{ ok: false; message: string }>;
