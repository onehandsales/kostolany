import { useIsFocused } from '@react-navigation/native';

import { AccountScreen } from '../../features/auth/AccountScreen';
import { useAuth } from '../../features/auth/AuthProvider';
import { useProfileScopeKey } from '../../features/profile/ProfileProvider';
import { ProfileScreen } from '../../features/profile/ProfileScreen';

export function ProfileRouteScreen() {
  const { state, store } = useAuth();
  const scopeKey = useProfileScopeKey();
  const isFocused = useIsFocused();
  return state.user ? <ProfileScreen key={scopeKey} accountLabel={state.user.name}
    isFocused={isFocused} onLogout={store.openLogout} /> : <AccountScreen />;
}
