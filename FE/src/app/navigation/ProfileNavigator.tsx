import { SettingsExtrasScreen, type SettingsDetail } from '../../features/settings/SettingsExtrasScreen';
import { AppIconScreen } from '../../features/app-icon/AppIconScreen';
import { useSettingsServices } from '../../features/settings/SettingsServicesProvider';
import { useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';

import { useAuth } from '../../features/auth/AuthProvider';
import { ReadingListScreen } from '../../features/bookmarks/ReadingListScreen';
import { ProfileScreen } from '../../features/profile/ProfileScreen';
import { SettingsScreen } from '../../features/settings/SettingsScreen';
import { useWrittenStories } from '../../features/editor/WrittenStoriesProvider';
import { WrittenStoryRoute } from './WrittenStoryRoute';
import { createMockStoryStatsSource } from '../../features/story-stats/createMockStoryStatsSource';
import { StoryStatsScreen } from '../../features/story-stats/StoryStatsScreen';
import type { StoryStatsSource } from '../../features/story-stats/types';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Settings: undefined;
  SettingsDetail: { page: SettingsDetail };
  ProfileList: { listId: string; reorder?: boolean };
  StoryStats: undefined;
  StatsStory: { storyId: string };
};
const Stack = createNativeStackNavigator<ProfileStackParamList>();

type ProfileNavigatorProps = {
  statsSource?: StoryStatsSource;
  onSelectArticle: (articleId: string, listId: string) => void;
  onBrowseArticles: () => void;
};

export function ProfileNavigator({ statsSource, onSelectArticle, onBrowseArticles }: ProfileNavigatorProps) {
  const drafts = useWrittenStories()?.source;
  const source = useMemo(() => statsSource ?? (drafts ? createMockStoryStatsSource(drafts) : null), [statsSource, drafts]);
  const { state } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome">
        {({ navigation }) => (
          <ProfileHome
            onOpenStats={() => navigation.navigate('StoryStats')}
            onOpenList={(listId, reorder) => navigation.navigate('ProfileList', { listId, reorder })}
            onOpenSettings={() => navigation.navigate('Settings')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="StoryStats">
        {({ navigation }) => source && state.user && <StatsRoute source={source}
          userId={state.user.id} revision={state.revision} onBack={() => navigation.goBack()}
          onOpenStory={storyId => navigation.navigate('StatsStory', { storyId })} />}
      </Stack.Screen>
      <Stack.Screen name="StatsStory">
        {({ navigation, route }) => state.user && <WrittenStoryRoute storyId={route.params.storyId}
          ownerId={state.user.id} onBack={() => navigation.goBack()} />}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {({ navigation }) => <SettingsRoute onBack={() => navigation.goBack()} onOpenStats={() => navigation.navigate('StoryStats')} onOpenDetail={page => navigation.push('SettingsDetail', { page })} />}
      </Stack.Screen>
      <Stack.Screen name="SettingsDetail">
        {({ navigation, route }) => <SettingsDetailRoute page={route.params.page} onBack={() => navigation.goBack()}
          onOpen={page => navigation.push('SettingsDetail', { page })} />}
      </Stack.Screen>
      <Stack.Screen name="ProfileList" getId={({ params }) => params.listId}>
        {({ navigation, route }) => (
          <ReadingListScreen initialReorder={route.params.reorder}
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
  onOpenStats,
  onOpenSettings,
  onOpenList,
}: {
  onOpenStats: () => void;
  onOpenSettings: () => void;
  onOpenList: (listId: string, reorder?: boolean) => void;
}) {
  const { state, store } = useAuth();
  const isFocused = useIsFocused();
  return (
    state.user && (
      <ProfileScreen
        onOpenStats={onOpenStats}
        accountLabel={state.user.name}
        isFocused={isFocused}
        onLogout={store.openLogout}
        onOpenSettings={onOpenSettings}
        onOpenList={onOpenList}
      />
    )
  );
}

function StatsRoute({ source, userId, revision, onBack, onOpenStory }: {
  source: StoryStatsSource; userId: string; revision: number; onBack: () => void; onOpenStory: (storyId: string) => void;
}) {
  const active = useIsFocused();
  const [scope, setScope] = useState({ source, version: 0 });
  if (scope.source !== source) {
    setScope({ source, version: scope.version + 1 });
    return null;
  }
  return <StoryStatsScreen key={JSON.stringify([userId, revision, scope.version])} source={source}
    userId={userId} sessionRevision={revision} active={active} onBack={onBack} onOpenStory={onOpenStory} />;
}

function SettingsRoute({ onBack, onOpenStats, onOpenDetail }: { onBack: () => void; onOpenStats: () => void; onOpenDetail: (page: SettingsDetail) => void }) {
  const { store } = useAuth();
  const isFocused = useIsFocused();
  return <SettingsScreen onBack={onBack} onOpenStats={onOpenStats} onOpenDetail={onOpenDetail} onLogout={store.openLogout} isFocused={isFocused} />;
}

function SettingsDetailRoute({ page, onBack, onOpen }: { page: SettingsDetail; onBack: () => void; onOpen: (page: SettingsDetail) => void }) {
  const active = useIsFocused();
  const { scope } = useSettingsServices();
  return page === 'icons' ? <AppIconScreen key={scope} active={active} onBack={onBack} />
    : <SettingsExtrasScreen key={scope} page={page} active={active} onBack={onBack} onOpen={onOpen} />;
}
