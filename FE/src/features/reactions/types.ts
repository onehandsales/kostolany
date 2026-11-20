export type ClapTarget = Readonly<{ kind: 'article' | 'list'; id: string }>;
export type ClapIdentity = Readonly<{ userId: string; target: ClapTarget }>;
export type ClapValue = ClapIdentity & Readonly<{ mine: number; total: number }>;
export type ClapCommand = ClapIdentity & Readonly<{ mine: number; commandId: string }>;
export type ClapSource = Readonly<{
  read: (identity: ClapIdentity) => Promise<ClapValue>;
  save: (command: ClapCommand) => Promise<ClapValue>;
}>;
export type ClapSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  mine: number;
  total: number | null;
  isSaving: boolean;
  isRefreshing: boolean;
  error: 'read' | 'write' | null;
}>;

export const MAX_CLAPS = 50;
export const clapTargetKey = (target: ClapTarget): string => JSON.stringify([target.kind, target.id]);
