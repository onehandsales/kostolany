import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ArticleSource } from '../../features/article/types';
import { AuthDialogs } from '../../features/auth/AuthDialogs';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthSource, AuthUser } from '../../features/auth/types';
import { BookmarkProvider } from '../../features/bookmarks/BookmarkProvider';
import type { BookmarkSource } from '../../features/bookmarks/types';
import type { FeedSource } from '../../features/feed/types';
import { LikeProvider } from '../../features/likes/LikeProvider';
import type { LikeSource } from '../../features/likes/types';
import type { SearchSource } from '../../features/search/types';
import { colors } from '../../shared/theme/tokens';
import { ArticleRouteScreen, type ArticleRouteParams } from './ArticleRouteScreen';
import { MainTabs } from './MainTabs';

type RootStackParamList = { Main: undefined; Article: ArticleRouteParams };
const Stack = createNativeStackNavigator<RootStackParamList>();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.text, background: colors.background,
    card: colors.background, text: colors.text, border: colors.border,
  },
};

type AppNavigatorProps = {
  articleSource?: ArticleSource; feedSource?: FeedSource; searchSource?: SearchSource; likeSource?: LikeSource;
  bookmarkSource?: BookmarkSource;
  authSource?: AuthSource; initialUser?: AuthUser | null;
};

export function AppNavigator({ authSource, initialUser, ...sources }: AppNavigatorProps) {
  return <AuthProvider source={authSource} initialUser={initialUser}><SessionNavigation {...sources} /></AuthProvider>;
}

export function SessionNavigation({ articleSource, feedSource, searchSource, likeSource, bookmarkSource }: AppNavigatorProps) {
  const { state } = useAuth();
  return (
    <LikeProvider source={likeSource} userId={state.user?.id ?? null}>
      <BookmarkProvider source={bookmarkSource} userId={state.user?.id ?? null} sessionRevision={state.revision}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main">
              {({ navigation }) => (
                <MainTabs source={feedSource} searchSource={searchSource}
                  onSelectArticle={(articleId, origin, listId) => navigation.navigate('Article', { articleId, origin, listId,
                    ownerUserId: origin === 'Library' ? state.user?.id : undefined,
                    sessionRevision: origin === 'Library' ? state.revision : undefined })} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Article" getId={({ params }) => params.articleId}>
              {({ route, navigation }) => (
                <ArticleRouteScreen params={route.params} source={articleSource} onBack={() => navigation.goBack()} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
        <AuthDialogs />
      </BookmarkProvider>
    </LikeProvider>
  );
}
