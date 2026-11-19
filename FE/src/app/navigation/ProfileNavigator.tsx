import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../../features/auth/AuthProvider';
import { ReadingListScreen } from '../../features/bookmarks/ReadingListScreen';
import { ProfileScreen } from '../../features/profile/ProfileScreen';
import { SettingsScreen } from '../../features/settings/SettingsScreen';

type ProfileStackParamList = { ProfileHome: undefined; Settings: undefined; ProfileList: { listId: string } };
const Stack = createNativeStackNavigator<ProfileStackParamList>();

type ProfileNavigatorProps = {
  onSelectArticle: (articleId: string, listId: string) => void;
  onBrowseArticles: () => void;
};

export function ProfileNavigator({ onSelectArticle, onBrowseArticles }: ProfileNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome">
        {({ navigation }) => (
          <ProfileHome
            onOpenList={(listId) => navigation.navigate('ProfileList', { listId })}
            onOpenSettings={() => navigation.navigate('Settings')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {({ navigation }) => <SettingsRoute onBack={() => navigation.goBack()} />}
      </Stack.Screen>
      <Stack.Screen name="ProfileList" getId={({ params }) => params.listId}>
        {({ navigation, route }) => (
          <ReadingListScreen
            listId={route.params.listId}
            backLabel="프로필로 돌아가기"
            onBack={() => navigation.popToTop()}
            onBrowseArticles={onBrowseArticles}
            onSelectArticle={(articleId) => onSelectArticle(articleId, route.params.listId)}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function ProfileHome({
  onOpenSettings,
  onOpenList,
}: {
  onOpenSettings: () => void;
  onOpenList: (listId: string) => void;
}) {
  const { state, store } = useAuth();
  const isFocused = useIsFocused();
  return (
    state.user && (
      <ProfileScreen
        accountLabel={state.user.name}
        isFocused={isFocused}
        onLogout={store.openLogout}
        onOpenSettings={onOpenSettings}
        onOpenList={onOpenList}
      />
    )
  );
}

function SettingsRoute({ onBack }: { onBack: () => void }) {
  const { store } = useAuth();
  const isFocused = useIsFocused();
  return <SettingsScreen onBack={onBack} onLogout={store.openLogout} isFocused={isFocused} />;
}
