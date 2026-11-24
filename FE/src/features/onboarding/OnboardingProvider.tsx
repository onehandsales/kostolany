import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';

import { useNotificationPermission } from '../notifications/NotificationPermissionProvider';
import { useAuth } from '../auth/AuthProvider';
import { useRelationships } from '../community/RelationshipProvider';
import type { DirectorySource } from '../community/types';
import type { TopicSource } from '../topics/types';
import { useModeration } from '../moderation/ModerationContext';
import { createOnboardingSession, type OnboardingSession } from './createOnboardingSession';
import { createMockOnboardingSource, type OnboardingSource } from './onboardingSource';
import { createMockNotificationPermission, type NotificationPermissionSource } from './notificationPermission';
import { OnboardingScreen } from './OnboardingScreen';

const Context = createContext<OnboardingSession | null>(null);
const emptySubscribe = () => () => {};
type OnboardingProviderProps = {
  children: ReactNode;
  source?: OnboardingSource;
  permissionSource?: NotificationPermissionSource;
  topicSource?: TopicSource;
  directorySource?: DirectorySource;
};
export function OnboardingProvider({ children, source, permissionSource, topicSource, directorySource }: OnboardingProviderProps) {
  const auth = useAuth();
  const [fallback] = useState(createMockOnboardingSource);
  const [permission] = useState(createMockNotificationPermission);
  const sharedPermission = useNotificationPermission();
  const current = source ?? fallback;
  const relationships = useRelationships();
  const moderation = useModeration();
  const userId = auth.state.user?.id ?? null;
  const revision = auth.state.revision;
  const boundary = useMemo(() => ({ source: current, auth: auth.store, userId, revision,
    relationships: relationships.store, moderation: moderation.store, topicSource, directorySource,
    permission: permissionSource ?? sharedPermission ?? permission }),
  [current, auth.store, userId, revision, relationships.store, moderation.store, topicSource, directorySource,
    permissionSource, sharedPermission, permission]);
  const session = useMemo(() => boundary.userId
    ? createOnboardingSession(boundary.source, boundary.auth, boundary.userId) : null, [boundary]);
  useEffect(() => session?.activate(), [session]);
  const snapshot = () => session?.getSnapshot() ?? null;
  const state = useSyncExternalStore(session?.subscribe ?? emptySubscribe, snapshot, snapshot);
  const visible = state?.isOpen;
  return (
    <Context.Provider value={session}>
      {children}
      {session && state && visible && !auth.state.dialog && (
        <OnboardingScreen key={session.scope} session={session} permission={boundary.permission} />
      )}
    </Context.Provider>
  );
}
export function useOnboarding() {
  const session = useContext(Context);
  const snapshot = () => session?.getSnapshot() ?? null;
  const state = useSyncExternalStore(session?.subscribe ?? emptySubscribe, snapshot, snapshot);
  return { session, state, canResume: Boolean(state && (state.status === 'idle' || state.status === 'error'
    || state.record?.accountKind === 'new' && state.record.step !== 'complete')) };
}
