import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

import type { ModerationStore } from './createModerationStore';
import type { ModerationAction, ModerationIdentity, ReportTarget } from './types';

export type ModerationEntry =
  | { kind: 'author'; target: ModerationIdentity; name: string }
  | {
      kind: 'confirm';
      action: ModerationAction;
      title: string;
      description: string;
      success: string;
      returnTo?: 'blocked';
    }
  | { kind: 'report'; target: ReportTarget; title: string }
  | { kind: 'share'; name: string; target: ModerationIdentity }
  | { kind: 'blocked' };
export const ModerationContext = createContext<{
  store: ModerationStore | null;
  scope: string;
  open: (entry: ModerationEntry) => void;
  isBlockedForUser: (userId: string, writerId: string) => boolean;
}>({
  store: null,
  scope: 'unavailable',
  open: () => {},
  isBlockedForUser: () => false,
});
const noop = () => () => {};
export function useModeration() {
  const context = useContext(ModerationContext);
  const snapshot = () => context.store?.getSnapshot() ?? null;
  const state = useSyncExternalStore(context.store?.subscribe ?? noop, snapshot, snapshot);
  useEffect(() => {
    context.store?.ensure();
  }, [context.store]);
  return { ...context, state };
}
