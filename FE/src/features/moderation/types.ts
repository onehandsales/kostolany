export type ModerationIdentity = Readonly<{
  kind: 'writer' | 'publication';
  id: string;
}>;
export type ReportTarget = Readonly<{
  kind: 'writer' | 'article' | 'list' | 'response';
  id: string;
  writerId: string | null;
  parent?: Readonly<{ kind: 'article' | 'list'; id: string }>;
}>;
export const reportReasons = ['Spam', 'Harassment', 'Rules violation', 'AI-generated'] as const;
export type ReportReason = (typeof reportReasons)[number];
export type ModerationAction =
  | Readonly<{ kind: 'mute'; target: ModerationIdentity; active: boolean }>
  | Readonly<{ kind: 'block'; writerId: string; active: boolean }>
  | Readonly<{
      kind: 'report';
      target: ReportTarget;
      reason: ReportReason;
      details: string;
      alsoBlock: boolean;
    }>;
export type ModerationCommand = Readonly<{
  operationId: string;
  action: ModerationAction;
}>;
export type ReportReceipt = Readonly<{
  operationId: string;
  target: ReportTarget;
  reason: ReportReason;
  details: string;
  blockedWriterId: string | null;
  createdAt: string;
}>;
export type ModerationValue = Readonly<{
  userId: string;
  version: number;
  muted: readonly ModerationIdentity[];
  blocked: readonly string[];
  reports: readonly ReportReceipt[];
}>;
export type ModerationSource = {
  read: (userId: string) => Promise<ModerationValue>;
  execute: (userId: string, command: ModerationCommand, signal?: AbortSignal) => Promise<ModerationValue>;
};
export type ModerationSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  value: ModerationValue | null;
  readError: boolean;
  pending: readonly string[];
}>;
export type ModerationResult =
  | { ok: true }
  | {
      ok: false;
      error: 'invalid' | 'permission' | 'cancelled' | 'unavailable';
    };
export const moderationKey = (target: ModerationIdentity): string => `${target.kind}:${target.id}`;
export function moderationOperation(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
export function validIdentity(target: ModerationIdentity): boolean {
  return Boolean(target && ['writer', 'publication'].includes(target.kind) && target.id?.trim());
}
export function validReportTarget(target: ReportTarget): boolean {
  return Boolean(
    target &&
      ['writer', 'article', 'list', 'response'].includes(target.kind) &&
      target.id?.trim() &&
      (target.writerId === null || (typeof target.writerId === 'string' && target.writerId.trim())) &&
      (target.kind !== 'writer' || target.writerId === target.id) &&
      (target.kind !== 'response' ||
        (target.parent?.id?.trim() && ['article', 'list'].includes(target.parent.kind))),
  );
}
export function validModerationAction(action: ModerationAction): boolean {
  if (!action) return false;
  if (action.kind === 'mute') return validIdentity(action.target) && typeof action.active === 'boolean';
  if (action.kind === 'block') return Boolean(action.writerId?.trim()) && typeof action.active === 'boolean';
  return (
    action.kind === 'report' &&
    validReportTarget(action.target) &&
    reportReasons.includes(action.reason) &&
    typeof action.details === 'string' &&
    action.details.length <= 2000 &&
    typeof action.alsoBlock === 'boolean' &&
    (!action.alsoBlock || Boolean(action.target.writerId))
  );
}
export function validateModerationValue(value: ModerationValue, userId: string): void {
  if (
    !value ||
    value.userId !== userId ||
    !Number.isSafeInteger(value.version) ||
    value.version < 0 ||
    !Array.isArray(value.muted) ||
    !value.muted.every(validIdentity) ||
    new Set(value.muted.map(moderationKey)).size !== value.muted.length ||
    !Array.isArray(value.blocked) ||
    value.blocked.some((id) => typeof id !== 'string' || !id.trim() || id === userId) ||
    new Set(value.blocked).size !== value.blocked.length ||
    !Array.isArray(value.reports) ||
    new Set(value.reports.map((item) => item.operationId)).size !== value.reports.length ||
    value.reports.some(
      (item) =>
        !item.operationId ||
        !validReportTarget(item.target) ||
        !reportReasons.includes(item.reason) ||
        typeof item.details !== 'string' ||
        item.details.length > 2000 ||
        !Number.isFinite(Date.parse(item.createdAt)) ||
        (item.blockedWriterId !== null &&
          (item.blockedWriterId !== item.target.writerId || item.blockedWriterId === userId)),
    )
  )
    throw new Error('invalid');
}
