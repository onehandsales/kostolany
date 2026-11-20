import { createContext, useContext, useState, type ReactNode } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { shareAdapter } from './shareAdapter';
import type { ShareAdapter, ShareTarget } from './types';

const Context = createContext<ShareAdapter>(shareAdapter);
export function SharingProvider({
  adapter = shareAdapter,
  children,
}: {
  adapter?: ShareAdapter;
  children: ReactNode;
}) {
  return <Context.Provider value={adapter}>{children}</Context.Provider>;
}
export function useSharing() {
  const adapter = useContext(Context);
  const { state } = useAuth();
  const scope = JSON.stringify([state.user?.id ?? null, state.revision]);
  return { adapter, scope, userId: state.user?.id ?? null };
}
export function useShareDialog(source?: object) {
  const { adapter, scope } = useSharing();
  const [entry, setEntry] = useState<{
    adapter: ShareAdapter;
    scope: string;
    source?: object;
    target: ShareTarget;
  } | null>(null);
  const valid = entry?.adapter === adapter && entry.scope === scope && entry.source === source;
  if (entry && !valid) setEntry(null);
  const target = valid ? entry.target : null;
  return {
    target,
    open: (next: ShareTarget) => setEntry({ adapter, scope, source, target: next }),
    close: () => setEntry(null),
  };
}
