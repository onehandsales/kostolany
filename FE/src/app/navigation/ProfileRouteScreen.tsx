import { AccountScreen } from '../../features/auth/AccountScreen';
import { useAuth } from '../../features/auth/AuthProvider';
import { useProfileScopeKey } from '../../features/profile/ProfileProvider';
import { useSettingsScopeKey } from '../../features/settings/ReadingSettingsProvider';
import { ProfileNavigator } from './ProfileNavigator';

type ProfileRouteScreenProps = {
  onSelectArticle: (articleId: string, listId: string) => void;
  onBrowseArticles: () => void;
};

export function ProfileRouteScreen(props: ProfileRouteScreenProps) {
  const { state } = useAuth();
  const scopeKey = useProfileScopeKey();
  const settingsScopeKey = useSettingsScopeKey();
  return state.user ? (
    <ProfileNavigator {...props} key={JSON.stringify([scopeKey, settingsScopeKey])} />
  ) : (
    <AccountScreen />
  );
}
