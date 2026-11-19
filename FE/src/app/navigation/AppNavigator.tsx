import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import type { ExplanationSource } from '../../features/article/explanationTypes';
import type { ArticleSource } from '../../features/article/types';
import { AuthDialogs } from '../../features/auth/AuthDialogs';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthSource, AuthUser } from '../../features/auth/types';
import { BookmarkProvider } from '../../features/bookmarks/BookmarkProvider';
import type { BookmarkSource } from '../../features/bookmarks/types';
import type { FeedSource } from '../../features/feed/types';
import { LikeProvider } from '../../features/likes/LikeProvider';
import type { LikeSource } from '../../features/likes/types';
import { ProfileProvider, useProfile } from '../../features/profile/ProfileProvider';
import type { ProfileSource } from '../../features/profile/types';
import type { SearchSource } from '../../features/search/types';
import { ReadingSettingsProvider } from '../../features/settings/ReadingSettingsProvider';
import type { ReadingSettingsSource } from '../../features/settings/types';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { DisplaySettingsProvider } from '../../features/settings/DisplaySettingsProvider';
import type { DisplaySettingsSource } from '../../features/settings/displayTypes';
import { ArticleRouteScreen, type ArticleRouteParams } from './ArticleRouteScreen';
import { ArticlePresentation } from './ArticlePresentation';
import { MainTabs } from './MainTabs';

type RootStackParamList = { Main: undefined; Article: ArticleRouteParams };
const Stack = createNativeStackNavigator<RootStackParamList>();

type AppNavigatorProps = {
  articleSource?: ArticleSource;
  feedSource?: FeedSource;
  searchSource?: SearchSource;
  likeSource?: LikeSource;
  bookmarkSource?: BookmarkSource;
  profileSource?: ProfileSource;
  settingsSource?: ReadingSettingsSource;
  displaySource?: DisplaySettingsSource;
  explanationSource?: ExplanationSource;
  authSource?: AuthSource;
  initialUser?: AuthUser | null;
};

export function AppNavigator({ authSource, initialUser, ...sources }: AppNavigatorProps) {
  return (
    <AuthProvider source={authSource} initialUser={initialUser}>
      <SessionNavigation {...sources} />
    </AuthProvider>
  );
}

export function SessionNavigation(sources: AppNavigatorProps) {
  const { state } = useAuth();
  return <DisplaySettingsProvider userId={state.user?.id ?? null} source={sources.displaySource}>
    <SessionNavigationContent {...sources} />
  </DisplaySettingsProvider>;
}

function SessionNavigationContent({
  articleSource,
  feedSource,
  searchSource,
  likeSource,
  bookmarkSource,
  profileSource,
  settingsSource,
  explanationSource,
}: AppNavigatorProps) {
  const { state } = useAuth();
  const { colors, scheme } = useTheme();
  const theme = {
    ...DefaultTheme, dark: scheme === 'dark',
    colors: { ...DefaultTheme.colors, primary: colors.text, background: colors.background,
      card: colors.background, text: colors.text, border: colors.border },
  };
  return (
    <ReadingSettingsProvider
      source={settingsSource}
      userId={state.user?.id ?? null}
      sessionRevision={state.revision}
    >
      <ProfileProvider
        source={profileSource}
        userId={state.user?.id ?? null}
        sessionRevision={state.revision}
      >
        <LikeProvider source={likeSource} userId={state.user?.id ?? null}>
          <BookmarkProvider
            source={bookmarkSource}
            userId={state.user?.id ?? null}
            sessionRevision={state.revision}
          >
            <NavigationContainer theme={theme}>
              <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
              <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main">
                  {({ navigation }) => (
                    <MainTabs
                      source={feedSource}
                      searchSource={searchSource}
                      onSelectArticle={(articleId, origin, listId) =>
                        navigation.navigate('Article', {
                          articleId,
                          origin,
                          listId,
                          ownerUserId:
                            origin === 'Library' || origin === 'Profile' ? state.user?.id : undefined,
                          sessionRevision:
                            origin === 'Library' || origin === 'Profile' ? state.revision : undefined,
                        })
                      }
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="Article" getId={({ params }) => params.articleId}>
                  {({ route, navigation }) => (
                    <ArticlePresentation>
                      <ArticleRouteScreen
                        params={route.params}
                        source={articleSource}
                        explanationSource={explanationSource}
                        onBack={() => navigation.goBack()}
                      />
                    </ArticlePresentation>
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
            <SessionAuthDialogs />
          </BookmarkProvider>
        </LikeProvider>
      </ProfileProvider>
    </ReadingSettingsProvider>
  );
}

function SessionAuthDialogs() {
  const { state } = useProfile();
  return <AuthDialogs profileName={state.profile?.name} />;
}
