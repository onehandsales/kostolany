import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AccountScreen, LibraryLoginScreen } from '../../features/auth/AccountScreen';
import { useAuth } from '../../features/auth/AuthProvider';
import { useBookmarkScopeKey } from '../../features/bookmarks/useBookmarks';
import { HomeFeedScreen } from '../../features/feed/HomeFeedScreen';
import type { FeedSource } from '../../features/feed/types';
import { SearchScreen } from '../../features/search/SearchScreen';
import type { SearchSource } from '../../features/search/types';
import { TabIcon } from '../../shared/ui/TabIcon';
import { BottomTabBar } from './BottomTabBar';
import { LibraryNavigator } from './LibraryNavigator';
import { type MainTabParamList, tabs } from './tabs';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs({ onSelectArticle, source, searchSource }: {
  onSelectArticle: (articleId: string, origin: 'Home' | 'Explore' | 'Library', listId?: string) => void;
  source?: FeedSource; searchSource?: SearchSource;
}) {
  const { state } = useAuth();
  const scopeKey = useBookmarkScopeKey();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      tabBar={BottomTabBar}
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: 'none',
        title: tabs[route.name].title,
        tabBarAccessibilityLabel: tabs[route.name].title,
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon name={tabs[route.name].icon} focused={focused} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeFeedScreen source={source} onSelectArticle={(id) => onSelectArticle(id, 'Home')} />}
      </Tab.Screen>
      <Tab.Screen name="Explore">
        {() => <SearchScreen source={searchSource} onSelectArticle={(id) => onSelectArticle(id, 'Explore')} />}
      </Tab.Screen>
      <Tab.Screen name="Library">
        {({ navigation }) => state.user ? <LibraryNavigator key={scopeKey}
          onSelectArticle={(id, listId) => onSelectArticle(id, 'Library', listId)}
          onBrowseArticles={() => navigation.navigate('Home')} /> : <LibraryLoginScreen />}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={AccountScreen} />
    </Tab.Navigator>
  );
}
