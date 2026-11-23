import { ReadScopeBoundary } from '../../shared/state/ReadScopeBoundary';
import { Text, View } from 'react-native';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { useAuth } from '../auth/AuthProvider';
import { createModerationStore, type ModerationStore } from './createModerationStore';
import { createMockModerationSource } from './data/createMockModerationSource';
import { moderationPreviewScenario } from './data/moderationPreview';
import { ModerationContext, type ModerationEntry } from './ModerationContext';
import { ModerationDialogs } from './ModerationDialogs';
import type { ModerationSource } from './types';

export function ModerationProvider({
  children,
  userId,
  revision,
  source,
  routeKey = '',
}: {
  children: ReactNode;
  userId: string | null;
  revision: number;
  source?: ModerationSource;
  routeKey?: string;
}) {
  const auth = useAuth();
  const { colors } = useTheme();
  const sequence = useRef(0);
  const [message, setMessage] = useState<{ scope: string; routeKey: string; text: string } | null>(null);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 2400);
    return () => clearTimeout(timer);
  }, [message]);
  const [fallback] = useState(() => createMockModerationSource({ scenario: moderationPreviewScenario }));
  const current = source ?? fallback;
  const [cache, setCache] = useState(() => ({
    source: current,
    generation: 0,
    stores: new Map<string, ModerationStore>(),
  }));
  const [dialog, setDialog] = useState<{
    scope: string;
    routeKey: string;
    entry: ModerationEntry;
    id: number;
  } | null>(null);
  const isBlockedForUser = useMemo(
    () => (owner: string, writer: string) => {
      const value = cache.stores.get(owner)?.getSnapshot().value;
      return !value || value.blocked.includes(writer);
    },
    [cache],
  );
  if (cache.source !== current) {
    setCache({
      source: current,
      generation: cache.generation + 1,
      stores: new Map(),
    });
    return null;
  }
  let store = userId ? (cache.stores.get(userId) ?? null) : null;
  if (userId && !store) {
    store = createModerationStore(current, userId);
    cache.stores.set(userId, store);
  }
  const scope = JSON.stringify([cache.generation, userId, revision]);
  // 화면 이탈은 초안·요청 UI만 폐기하며 계정별 확정 저장소와 조회 수명은 유지한다.
  if (dialog && (dialog.scope !== scope || dialog.routeKey !== routeKey)) setDialog(null);
  if (message && (message.scope !== scope || message.routeKey !== routeKey)) setMessage(null);
  function open(entry: ModerationEntry) {
    if (!userId && (entry.kind === 'confirm' || entry.kind === 'report' || entry.kind === 'blocked')) {
      setDialog(null);
      auth.store.openLogin({ kind: 'moderation' });
      return;
    }
    sequence.current += 1;
    setDialog({ scope, routeKey, entry, id: sequence.current });
  }
  return (
    <ModerationContext.Provider
      value={{
        store,
        scope,
        open,
        isBlockedForUser,
      }}
    >
      <ReadScopeBoundary store={store} scope={scope} />
      {children}
      {message?.scope === scope && message.routeKey === routeKey && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 34,
            alignSelf: 'center',
            maxWidth: '90%',
            padding: 22,
            backgroundColor: colors.text,
            borderRadius: 3,
            zIndex: 1000,
          }}
        >
          <Text aria-live="polite" style={{ fontSize: 14, lineHeight: 20, color: colors.onInverse }}>
            {message.text}
          </Text>
        </View>
      )}
      {dialog?.scope === scope && dialog.routeKey === routeKey && (
        <ModerationDialogs
          key={`${scope}:${dialog.id}`}
          entry={dialog.entry}
          onClose={() => setDialog(null)}
          onSuccess={(text) => {
            if (dialog.entry.kind === 'confirm' && dialog.entry.returnTo === 'blocked')
              open({ kind: 'blocked' });
            else setDialog(null);
            setMessage({ scope, routeKey, text });
          }}
        />
      )}
    </ModerationContext.Provider>
  );
}
