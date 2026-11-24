export type ResponseTarget = Readonly<{ kind: 'article' | 'list'; id: string }>;
export type ResponseQuote = Readonly<{
  articleId: string;
  version: string;
  start: number;
  end: number;
  text: string;
}>;
export type ReaderResponse = Readonly<{
  id: string;
  parentId: string | null;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
  updatedAt: string | null;
  dateLabel?: string;
  relevance: number;
  baselineClaps: number;
  applauded: boolean;
  deleted: boolean;
  quote?: ResponseQuote;
  hidden?: boolean;
}>;
export type ResponseValue = Readonly<{
  userId: string | null;
  target: ResponseTarget;
  version: number;
  responses: readonly ReaderResponse[];
  // 원본 비교에서 본문이 제공되지 않은 집계만 보관하며 응답 행이나 실서비스 총수로 해석하지 않는다.
  uncapturedCount?: number;
  ownerId?: string | null;
  discussion?: 'open' | 'closed' | 'hidden';
}>;
export type ResponseAction =
  | Readonly<{
      kind: 'create';
      id: string;
      parentId: string | null;
      body: string;
      authorName: string;
      quote?: ResponseQuote;
    }>
  | Readonly<{ kind: 'edit'; id: string; body: string }>
  | Readonly<{ kind: 'delete'; id: string }>
  | Readonly<{ kind: 'react'; id: string; active: boolean }>
  | Readonly<{ kind: 'hide'; id: string; hidden: boolean }>
  | Readonly<{
      kind: 'discussion';
      id: 'discussion';
      value: 'open' | 'closed' | 'hidden';
    }>;
export type ResponseCommand = Readonly<{
  userId: string;
  target: ResponseTarget;
  operationId: string;
  action: ResponseAction;
}>;
export type ResponseSource = {
  read: (identity: { userId: string | null; target: ResponseTarget }) => Promise<ResponseValue>;
  execute: (command: ResponseCommand, signal?: AbortSignal) => Promise<ResponseValue>;
};
export type ResponseResult =
  | { ok: true }
  | { ok: false; error: 'permission' | 'removed' | 'invalid' | 'unavailable' };
export type ResponseSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  value: ResponseValue | null;
  isRefreshing: boolean;
  pendingIds: readonly string[];
  readError: boolean;
}>;
export const responseTargetKey = (target: ResponseTarget): string => JSON.stringify([target.kind, target.id]);
export const RESPONSE_MAX_LENGTH = 5000;
export function newResponseOperation(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
