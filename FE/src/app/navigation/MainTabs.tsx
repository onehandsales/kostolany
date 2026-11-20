import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { LibraryLoginScreen } from '../../features/auth/AccountScreen';
import { useAuth } from '../../features/auth/AuthProvider';
import { useBookmarkScopeKey } from '../../features/bookmarks/useBookmarks';
import { HomeFeedScreen } from '../../features/feed/HomeFeedScreen';
import type { FeedSource } from '../../features/feed/types';
import type { SearchSource } from '../../features/search/types';
import { TabIcon } from '../../shared/ui/TabIcon';
import { BottomTabBar } from './BottomTabBar';
import { LibraryNavigator } from './LibraryNavigator';
import { ProfileRouteScreen } from './ProfileRouteScreen';
import { SearchRouteScreen } from './SearchRouteScreen';
import { type MainTabParamList, tabs } from './tabs';
import type { DigestSource } from '../../features/digest/types';
import { useProfile } from '../../features/profile/ProfileProvider';
import { ProfileAvatar } from '../../features/profile/ProfileAvatar';
import type { StoryStatsSource } from '../../features/story-stats/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type MainTabsProps = {
  statsSource?: StoryStatsSource;
  digestSource?: DigestSource;
  onSelectArticle: (
    articleId: string,
    origin: 'Home' | 'Explore' | 'Library' | 'Profile' | 'Digest',
    listId?: string,
    highlightId?: string,
  ) => void;
  source?: FeedSource;
  searchSource?: SearchSource;
};

export function MainTabs({
  statsSource,
  digestSource,
  onSelectArticle,
  source,
  searchSource,
}: MainTabsProps) {
  const { state } = useAuth();
  const profile = useProfile();
  const scopeKey = useBookmarkScopeKey();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: 'none',
        title: tabs[route.name].title,
        tabBarAccessibilityLabel: tabs[route.name].title,
        tabBarIcon: ({ focused, color, size }) => (
          route.name === 'Profile' && profile.state.profile?.photo
            ? <ProfileAvatar photo={profile.state.profile.photo} size={size} style={{ borderColor: color, borderWidth: focused ? 2 : 1 }} />
            : <TabIcon name={tabs[route.name].icon} focused={focused} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeFeedScreen source={source} onSelectArticle={(id) => onSelectArticle(id, 'Home')} />}
      </Tab.Screen>
      <Tab.Screen name="Explore">
        {() => (
          <SearchRouteScreen source={searchSource} onSelectArticle={(id) => onSelectArticle(id, 'Explore')} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Library" navigationKey={scopeKey}>
        {({ navigation }) =>
          state.user ? (
            <LibraryNavigator
              digestSource={digestSource}
              onOpenDigestArticle={(id) => onSelectArticle(id, 'Digest')}
              key={scopeKey}
              onSelectArticle={(id, listId) => onSelectArticle(id, 'Library', listId)}
              onOpenHighlight={(id, highlightId) => onSelectArticle(id, 'Library', undefined, highlightId)}
              onBrowseArticles={() => navigation.navigate('Home')}
            />
          ) : (
            <LibraryLoginScreen />
          )
        }
      </Tab.Screen>
      <Tab.Screen name="Profile" navigationKey={scopeKey}>
        {({ navigation }) => (
          <ProfileRouteScreen
            statsSource={statsSource}
            onSelectArticle={(articleId, listId) => onSelectArticle(articleId, 'Profile', listId)}
            onBrowseArticles={() => navigation.navigate('Home')}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
