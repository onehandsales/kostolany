import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../../features/auth/AuthProvider';
import { ProfileScreen } from '../../features/profile/ProfileScreen';
import { SettingsScreen } from '../../features/settings/SettingsScreen';

type ProfileStackParamList = { ProfileHome: undefined; Settings: undefined };
const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileNavigator() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileHome">
      {({ navigation }) => <ProfileHome onOpenSettings={() => navigation.navigate('Settings')} />}
    </Stack.Screen>
    <Stack.Screen name="Settings">
      {({ navigation }) => <SettingsRoute onBack={() => navigation.goBack()} />}
    </Stack.Screen>
  </Stack.Navigator>;
}

function ProfileHome({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { state, store } = useAuth();
  const isFocused = useIsFocused();
  return state.user && <ProfileScreen accountLabel={state.user.name} isFocused={isFocused}
    onLogout={store.openLogout} onOpenSettings={onOpenSettings} />;
}

function SettingsRoute({ onBack }: { onBack: () => void }) {
  const { store } = useAuth();
  const isFocused = useIsFocused();
  return <SettingsScreen onBack={onBack} onLogout={store.openLogout} isFocused={isFocused} />;
}
