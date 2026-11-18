import { AccountScreen } from '../../features/auth/AccountScreen';
import { useAuth } from '../../features/auth/AuthProvider';
import { useProfileScopeKey } from '../../features/profile/ProfileProvider';
import { useSettingsScopeKey } from '../../features/settings/ReadingSettingsProvider';
import { ProfileNavigator } from './ProfileNavigator';

export function ProfileRouteScreen() {
  const { state } = useAuth();
  const scopeKey = useProfileScopeKey();
  const settingsScopeKey = useSettingsScopeKey();
  return state.user ? <ProfileNavigator key={JSON.stringify([scopeKey, settingsScopeKey])} /> : <AccountScreen />;
}
