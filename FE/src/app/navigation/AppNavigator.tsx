import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ArticleDetailScreen } from '../../features/article/ArticleDetailScreen';
import type { ArticleSource } from '../../features/article/types';
import { BookmarkProvider } from '../../features/bookmarks/BookmarkProvider';
import type { BookmarkSource } from '../../features/bookmarks/types';
import type { FeedSource } from '../../features/feed/types';
import { LikeProvider } from '../../features/likes/LikeProvider';
import type { LikeSource } from '../../features/likes/types';
import type { SearchSource } from '../../features/search/types';
import { colors } from '../../shared/theme/tokens';
import { MainTabs } from './MainTabs';

type RootStackParamList = { Main: undefined; Article: { articleId: string; origin: 'Home' | 'Explore' | 'Library' } };
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
};

export function AppNavigator({ articleSource, feedSource, searchSource, likeSource, bookmarkSource }: AppNavigatorProps) {
  return (
    <LikeProvider source={likeSource}>
      <BookmarkProvider source={bookmarkSource}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main">
              {({ navigation }) => (
                <MainTabs source={feedSource} searchSource={searchSource}
                  onSelectArticle={(articleId, origin) => navigation.navigate('Article', { articleId, origin })} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Article" getId={({ params }) => params.articleId}>
              {({ route, navigation }) => (
                <ArticleDetailScreen articleId={route.params.articleId}
                  source={articleSource} onBack={() => navigation.goBack()}
                  backLabel={route.params.origin === 'Library' ? '읽기 목록으로 돌아가기'
                    : route.params.origin === 'Explore' ? '탐색으로 돌아가기' : '홈으로 돌아가기'} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </BookmarkProvider>
    </LikeProvider>
  );
}
