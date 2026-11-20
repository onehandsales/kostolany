import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { createMockMembershipSource } from './createMockMembershipSource';
import {
  hasMembershipBenefit,
  type MembershipBenefit,
  type MembershipSource,
  type MembershipTier,
} from './types';

type MembershipContextValue = {
  source: MembershipSource;
  scope: string;
  userId: string | null;
  tier: MembershipTier;
  record: ReturnType<MembershipSource['getSnapshot']>[number] | null;
  allows: (benefit: MembershipBenefit) => boolean;
  isCurrent: () => boolean;
};
const Context = createContext<MembershipContextValue | null>(null);
export function MembershipProvider({ source, children }: { source?: MembershipSource; children: ReactNode }) {
  const auth = useAuth();
  const [fallback] = useState(createMockMembershipSource);
  const current = source ?? fallback;
  const [boundary, setBoundary] = useState({ source: current, generation: 0 });
  const userId = auth.state.user?.id ?? null;
  const revision = auth.state.revision;
  const records = useSyncExternalStore(current.subscribe, current.getSnapshot, current.getSnapshot);
  const record = records.find((item) => item.userId === userId) ?? null;
  const tier = record?.tier ?? 'free';
  const isCurrent = useMemo(
    () => () =>
      auth.store.getSnapshot().user?.id === userId && auth.store.getSnapshot().revision === revision,
    [auth.store, userId, revision],
  );
  if (boundary.source !== current) {
    setBoundary({ source: current, generation: boundary.generation + 1 });
    return null;
  }
  return (
    <Context.Provider
      value={{
        source: current,
        scope: JSON.stringify([boundary.generation, userId, revision]),
        userId,
        tier,
        record,
        allows: (benefit) =>
          Boolean(userId) &&
          isCurrent() &&
          hasMembershipBenefit(
            current.getSnapshot().find((item) => item.userId === userId)?.tier ?? 'free',
            benefit,
          ),
        isCurrent,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useMembership() {
  return useContext(Context);
}
