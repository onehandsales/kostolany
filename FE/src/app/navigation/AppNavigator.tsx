import { SettingsServicesProvider } from '../../features/settings/SettingsServicesProvider';
import type { SettingsPlatform } from '../../features/settings/settingsDestinations';
import type { AccountConnectionSource } from '../../features/settings/accountConnectionSource';
import type { AppIconAdapter } from '../../features/app-icon/types';
import {
  DefaultTheme,
  NavigationContainer,
  StackActions,
  useIsFocused,
  useNavigationContainerRef,
  usePreventRemove,
  type NavigationAction,
  type NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { StoryEditorScreen, EditorExitDialog } from '../../features/editor/StoryEditorScreen';
import { createDraftSession } from '../../features/editor/createDraftSession';
import { createMockDraftSource, type DraftSource } from '../../features/editor/draftSource';
import { DraftsScreen } from '../../features/editor/DraftsScreen';
import { createMockEditorImageSource, type EditorImageSource } from '../../features/editor/imageSource';
import { PublishPreview, type PublishStage } from '../../features/editor/PublishPreview';
import { WrittenStoriesProvider } from '../../features/editor/WrittenStoriesProvider';
import { WrittenStoryScreen } from '../../features/editor/WrittenStoryScreen';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { bookmarkPreviewScenario } from '../../features/bookmarks/data/bookmarkPreview';

import { useTheme } from '../../shared/theme/ThemeProvider';

import { RecommendationProvider } from '../../features/recommendations/RecommendationProvider';
import {
  RefineRecommendationsScreen,
  type RecommendationSection,
} from '../../features/recommendations/RefineRecommendationsScreen';
import type { RecommendationSource } from '../../features/recommendations/types';
import { TopicProvider } from '../../features/topics/TopicProvider';
import { TopicScreen } from '../../features/topics/TopicScreen';
import { DiscoveryScreen } from '../../features/topics/DiscoveryScreen';
import type { TopicSource } from '../../features/topics/types';
import { ModerationProvider } from '../../features/moderation/ModerationProvider';
import type { ModerationSource } from '../../features/moderation/types';
import { DirectoryProvider } from '../../features/community/DirectoryProvider';
import { RelationshipProvider } from '../../features/community/RelationshipProvider';
import { CommunityNavigationProvider } from '../../features/community/CommunityNavigation';
import { PublicIdentityScreen } from '../../features/community/PublicIdentityScreen';
import { ConnectionsScreen } from '../../features/community/ConnectionsScreen';
import { PublicListScreen } from '../../features/public-lists/PublicListScreen';
import { PublicListProvider } from '../../features/public-lists/PublicListProvider';
import type { PublicListSource } from '../../features/public-lists/types';
import type { DirectorySource, FollowTarget, RelationshipSource } from '../../features/community/types';
import type { ExplanationSource } from '../../features/article/explanationTypes';
import type { ArticleSource } from '../../features/article/types';
import { AuthDialogs } from '../../features/auth/AuthDialogs';
import { OnboardingProvider } from '../../features/onboarding/OnboardingProvider';
import type { OnboardingSource } from '../../features/onboarding/onboardingSource';
import type { NotificationPermissionSource } from '../../features/onboarding/notificationPermission';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthSource, AuthUser } from '../../features/auth/types';
import { BookmarkProvider } from '../../features/bookmarks/BookmarkProvider';
import type { BookmarkSource } from '../../features/bookmarks/types';
import type { FeedSource } from '../../features/feed/types';
import { ProfileProvider, useProfile } from '../../features/profile/ProfileProvider';
import type { ProfilePhotoPicker } from '../../features/profile/profilePhoto';
import type { ProfileSource } from '../../features/profile/types';
import type { SearchSource } from '../../features/search/types';
import { ReadingSettingsProvider } from '../../features/settings/ReadingSettingsProvider';
import type { ReadingSettingsSource } from '../../features/settings/types';
import { DisplaySettingsProvider } from '../../features/settings/DisplaySettingsProvider';
import type { DisplaySettingsSource } from '../../features/settings/displayTypes';
import { ClapProvider } from '../../features/reactions/ClapProvider';
import type { ClapSource } from '../../features/reactions/types';
import { ReadingHistoryProvider } from '../../features/reading-history/ReadingHistoryProvider';
import type { ReadingHistorySource } from '../../features/reading-history/types';
import { HighlightProvider } from '../../features/highlights/HighlightProvider';
import type { HighlightSource } from '../../features/highlights/types';
import { ResponseProvider } from '../../features/responses/ResponseProvider';
import type { ResponseSource } from '../../features/responses/types';

import { PublicTabFooter } from './PublicTabFooter';
import type { MainTabParamList } from './tabs';
import { ArticleRouteScreen, type ArticleRouteParams } from './ArticleRouteScreen';
import { ArticlePresentation } from './ArticlePresentation';
import { MainTabs } from './MainTabs';
import { createMockDigestSource } from '../../features/digest/createMockDigestSource';
import type { DigestSource } from '../../features/digest/types';
import { DownloadProvider } from '../../features/downloads/DownloadProvider';
import type { DownloadSource } from '../../features/downloads/types';
import type { StoryStatsSource } from '../../features/story-stats/types';
import { NotificationProvider } from '../../features/notifications/NotificationProvider';
import { NotificationPermissionProvider } from '../../features/notifications/NotificationPermissionProvider';
import { NotificationsScreen } from '../../features/notifications/NotificationsScreen';
import { NotificationSettingsScreen } from '../../features/notifications/NotificationSettingsScreen';
import type { NotificationSource } from '../../features/notifications/types';
import { ResponsesPanel } from '../../features/responses/ResponsesPanel';
import { ListeningProvider } from '../../features/listening/ListeningProvider';
import { ListeningPlayer } from '../../features/listening/ListeningPlayer';
import type { ListeningSource } from '../../features/listening/types';
import type { ListeningOptionsSource } from '../../features/listening/listeningOptions';
import { SharingProvider } from '../../features/sharing/SharingProvider';
import { MembershipProvider } from '../../features/membership/MembershipProvider';
import type { MembershipSource } from '../../features/membership/types';
import type { ShareAdapter } from '../../features/sharing/types';
import { previewLinkSource, type PreviewLinkSource } from './previewLinks';
import { usePreviewLinks } from './usePreviewLinks';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  InvalidLink: undefined;
  Notifications: undefined;
  NotificationSettings: { section: 'push' | 'email'; originTab: keyof MainTabParamList };
  NotificationResponse: { articleId: string; responseId: string };
  WrittenStory: { storyId: string };
  Editor: { ownerId: string; revision: number; draftId: string; isNew: boolean };
  Drafts: { ownerId: string; revision: number };
  Recommendations: { section: RecommendationSection; interests: boolean; originTab: keyof MainTabParamList };
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  Article: ArticleRouteParams;
  Identity: { target: FollowTarget; originTab: keyof MainTabParamList };
  Connections: {
    owner: FollowTarget | null;
    section: 'followers' | 'following';
    originTab: keyof MainTabParamList;
    ownerUserId?: string;
    revision?: number;
  };
  PublicList: { listId: string; ownerId?: string; originTab: keyof MainTabParamList };
  Topic: { topicId: string; originTab: keyof MainTabParamList };
  Discovery: { filter: 'all' | 'publication'; originTab: keyof MainTabParamList };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

type AppNavigatorProps = {
  linkSource?: PreviewLinkSource;
  membershipSource?: MembershipSource;
  shareAdapter?: ShareAdapter;
  listeningOptionsSource?: ListeningOptionsSource;
  listeningSource?: ListeningSource;
  appIconAdapter?: AppIconAdapter;
  accountConnectionSource?: AccountConnectionSource;
  settingsPlatform?: SettingsPlatform;
  statsSource?: StoryStatsSource;
  onboardingSource?: OnboardingSource;
  notificationPermissionSource?: NotificationPermissionSource;
  notificationSource?: NotificationSource;
  draftSource?: DraftSource;
  editorImageSource?: EditorImageSource;
  downloadSource?: DownloadSource;
  digestSource?: DigestSource;
  articleSource?: ArticleSource;
  feedSource?: FeedSource;
  searchSource?: SearchSource;
  bookmarkSource?: BookmarkSource;
  profileSource?: ProfileSource;
  profilePhotoPicker?: ProfilePhotoPicker;
  settingsSource?: ReadingSettingsSource;
  displaySource?: DisplaySettingsSource;
  explanationSource?: ExplanationSource;
  authSource?: AuthSource;
  initialUser?: AuthUser | null;
  clapSource?: ClapSource;
  historySource?: ReadingHistorySource;
  responseSource?: ResponseSource;
  highlightSource?: HighlightSource;
  relationshipSource?: RelationshipSource;
  directorySource?: DirectorySource;
  moderationSource?: ModerationSource;
  topicSource?: TopicSource;
  recommendationSource?: RecommendationSource;
  publicListSource?: PublicListSource;
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
  return (
    <SettingsServicesProvider icons={sources.appIconAdapter} connections={sources.accountConnectionSource} platform={sources.settingsPlatform}>
    <MembershipProvider source={sources.membershipSource}>
    <NotificationPermissionProvider source={sources.notificationPermissionSource}>
    <NotificationProvider source={sources.notificationSource}>
    <DisplaySettingsProvider userId={state.user?.id ?? null} revision={state.revision} source={sources.displaySource}>
      <SessionNavigationContent {...sources} />
    </DisplaySettingsProvider>
    </NotificationProvider>
    </NotificationPermissionProvider>
    </MembershipProvider>
    </SettingsServicesProvider>
  );
}

function SessionNavigationContent({
  linkSource = previewLinkSource,
  shareAdapter,
  listeningOptionsSource,
  listeningSource,
  statsSource,
  onboardingSource,
  notificationPermissionSource,
  draftSource,
  editorImageSource,
  downloadSource,
  digestSource,
  articleSource,
  feedSource,
  searchSource,
  bookmarkSource,
  profileSource,
  profilePhotoPicker,
  settingsSource,
  explanationSource,
  clapSource,
  historySource,
  responseSource,
  highlightSource,
  topicSource,
  recommendationSource,
  relationshipSource,
  directorySource,
  moderationSource,
  publicListSource,
}: AppNavigatorProps) {
  const { state, store: authStore } = useAuth();
  const { colors, scheme } = useTheme();
  const [defaultBookmarks] = useState(() => createMockBookmarkSource({ scenario: bookmarkPreviewScenario, managesReadingList: true }));
  const currentBookmarks = bookmarkSource ?? defaultBookmarks;
  const [defaultDigests] = useState(() => createMockDigestSource());
  const [defaultDrafts] = useState(createMockDraftSource);
  const drafts = draftSource ?? defaultDrafts;
  const [defaultImages] = useState(createMockEditorImageSource);
  const images = editorImageSource ?? defaultImages;
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  function currentTab(): keyof MainTabParamList {
    const tabState = navigationRef.getRootState()?.routes.find((route) => route.name === 'Main')?.state;
    const name = tabState?.routes[tabState.index ?? 0]?.name;
    return name === 'Explore' || name === 'Library' || name === 'Profile' ? name : 'Home';
  }
  function viewListeningStory(articleId: string) {
    if (!navigationRef.isReady()) return;
    const current = navigationRef.getCurrentRoute();
    if (
      current?.name === 'Article' && current.params &&
      'articleId' in current.params && current.params.articleId === articleId
    ) return;
    navigationRef.dispatch(StackActions.push('Article', { articleId, origin: currentTab() }));
  }
  const linksReady = usePreviewLinks(linkSource, target => {
    if (!navigationRef.isReady()) return;
    const originTab = currentTab();
    switch (target.kind) {
      case 'article': navigationRef.dispatch(StackActions.push('Article', { articleId: target.id, origin: originTab })); break;
      case 'written': navigationRef.dispatch(StackActions.push('WrittenStory', { storyId: target.id })); break;
      case 'writer': case 'publication': navigationRef.dispatch(StackActions.push('Identity', { target: { kind: target.kind, id: target.id }, originTab })); break;
      case 'topic': navigationRef.dispatch(StackActions.push('Topic', { topicId: target.id, originTab })); break;
      case 'list': navigationRef.dispatch(StackActions.push('PublicList', { listId: target.id, originTab })); break;
      case 'tab': navigationRef.dispatch(StackActions.popTo('Main', { screen: target.tab })); break;
      case 'invalid': navigationRef.navigate('InvalidLink'); break;
    }
  });
  const theme = {
    ...DefaultTheme,
    dark: scheme === 'dark',
    colors: {
      ...DefaultTheme.colors,
      primary: colors.text,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.border,
    },
  };
  return (
    <ReadingSettingsProvider
      source={settingsSource}
      userId={state.user?.id ?? null}
      sessionRevision={state.revision}
    >
      <ProfileProvider
        source={profileSource}
        photoPicker={profilePhotoPicker}
        userId={state.user?.id ?? null}
        sessionRevision={state.revision}
      >
        <SharingProvider adapter={shareAdapter}>
          <ReadingHistoryProvider
            source={historySource}
            userId={state.user?.id ?? null}
            revision={state.revision}
          >
            <ModerationProvider
              source={moderationSource}
              userId={state.user?.id ?? null}
              revision={state.revision}
            >
              <PublicListProvider source={publicListSource} userLists={currentBookmarks.lists}>
              <ClapProvider source={clapSource} userId={state.user?.id ?? null} revision={state.revision}>
              <ResponseProvider
                source={responseSource}
                userId={state.user?.id ?? null}
                revision={state.revision}
              >
                <HighlightProvider
                  source={highlightSource}
                  userId={state.user?.id ?? null}
                  revision={state.revision}
                >
                  <RecommendationProvider source={recommendationSource}>
                    <TopicProvider source={topicSource}>
                      <DirectoryProvider source={directorySource}>
                        <RelationshipProvider
                          source={relationshipSource}
                          userId={state.user?.id ?? null}
                          revision={state.revision}
                        >
                          <BookmarkProvider
                            source={currentBookmarks}
                            userId={state.user?.id ?? null}
                            sessionRevision={state.revision}
                          >
                            <DownloadProvider source={downloadSource} lists={currentBookmarks.lists}>
                            <WrittenStoriesProvider value={{ source: drafts, images, sessionRevision: state.revision }}>
                            <OnboardingProvider source={onboardingSource} permissionSource={notificationPermissionSource}>
                            <CommunityNavigationProvider
                              value={{
                                openExplore: () => {
                                  if (navigationRef.isReady())
                                    navigationRef.dispatch(StackActions.popTo('Main', { screen: 'Explore' }));
                                },
                                openHistoryArticle: (articleId) => {
                                  if (navigationRef.isReady())
                                    navigationRef.dispatch(
                                      StackActions.push('Article', { articleId, origin: 'History' }),
                                    );
                                },
                                openRecommendations: (section = 'Suggestions', interests = false) => {
                                  if (navigationRef.isReady())
                                    navigationRef.dispatch(
                                      StackActions.push('Recommendations', {
                                        section,
                                        interests,
                                        originTab: currentTab(),
                                      }),
                                    );
                                },
                                openTopic: (topicId) => {
                                  if (navigationRef.isReady())
                                    navigationRef.dispatch(
                                      StackActions.push('Topic', { topicId, originTab: currentTab() }),
                                    );
                                },
                                openDiscovery: (filter) => {
                                  if (navigationRef.isReady())
                                    navigationRef.dispatch(
                                      StackActions.push('Discovery', { filter, originTab: currentTab() }),
                                    );
                                },
                                openIdentity: (target) => {
                                  if (navigationRef.isReady())
                                    navigationRef.dispatch(
                                      StackActions.push('Identity', {
                                        target,
                                        originTab: currentTab(),
                                      }),
                                    );
                                },
                                openConnections: (owner, section) => {
                                  if (navigationRef.isReady())
                                    navigationRef.navigate('Connections', {
                                      owner,
                                      section,
                                      originTab: currentTab(),
                                      ownerUserId: owner ? undefined : state.user?.id,
                                      revision: owner ? undefined : state.revision,
                                    });
                                },
                                openPublicList: (listId, ownerId) => {
                                  if (navigationRef.isReady())
                                    navigationRef.dispatch(StackActions.push('PublicList', { listId, ownerId, originTab: currentTab() }));
                                },
                                openNotifications: () => {
                                  if (!state.user) { authStore.openLogin({ kind: 'notifications' }); return; }
                                  if (navigationRef.isReady()) navigationRef.navigate('Notifications');
                                },
                                openNotificationSettings: section => {
                                  if (!state.user) { authStore.openLogin({ kind: 'notifications' }); return; }
                                  if (navigationRef.isReady()) navigationRef.navigate('NotificationSettings', { section, originTab: currentTab() });
                                },
                                openWrite: () => {
                                  if (!state.user) { authStore.openLogin({ kind: 'write' }); return; }
                                  if (navigationRef.isReady()) navigationRef.navigate('Editor', { ownerId: state.user.id, revision: state.revision, draftId: drafts.newId(state.user.id), isNew: true });
                                },
                                openDrafts: () => {
                                  if (!state.user) { authStore.openLogin({ kind: 'write' }); return; }
                                  if (navigationRef.isReady()) navigationRef.navigate('Drafts', { ownerId: state.user.id, revision: state.revision });
                                },
                                openWrittenStory: storyId => {
                                  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.push('WrittenStory', { storyId }));
                                },
                              }}
                            >
                              <ListeningProvider source={listeningSource} optionsSource={listeningOptionsSource}>
                              <NavigationContainer theme={theme} ref={navigationRef} onReady={linksReady}>
                                <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
                                <Stack.Navigator
                                  initialRouteName="Main"
                                  screenOptions={{ headerShown: false }}
                                >
                                  <Stack.Screen name="InvalidLink">{({ navigation }) => <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                                    <ContentStatus error message="이 링크를 열 수 없어요" actionLabel="링크에서 돌아가기"
                                      onAction={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Main', { screen: 'Home' })} />
                                  </SafeAreaView>}</Stack.Screen>
                                  {state.user && <Stack.Group navigationKey={`notifications:${state.user.id}:${state.revision}`}>
                                    <Stack.Screen name="Notifications">{({ navigation }) => <NotificationsRoute articleSource={articleSource}
                                      onBack={() => navigation.goBack()} onOpen={target => {
                                        if (target.kind === 'writer') navigation.push('Identity', { target: { kind: 'writer', id: target.id }, originTab: 'Home' });
                                        else if (target.kind === 'list') navigation.push('PublicList', { listId: target.id, ownerId: target.ownerId, originTab: 'Home' });
                                        else if (target.kind === 'response') navigation.push('NotificationResponse', target);
                                        else navigation.push('Article', { articleId: target.id, origin: 'Notifications' });
                                      }} footer={<PublicTabFooter selected="Home" onSelect={screen => navigation.popTo('Main', { screen })} />} />}</Stack.Screen>
                                    <Stack.Screen name="NotificationSettings">{({ navigation, route }) => <>
                                      <NotificationSettingsScreen section={route.params.section} onBack={() => navigation.goBack()} />
                                      <PublicTabFooter selected={route.params.originTab} onSelect={screen => navigation.popTo('Main', { screen })} />
                                    </>}</Stack.Screen>
                                    <Stack.Screen name="NotificationResponse">{({ navigation, route }) => <NotificationResponseRoute
                                      articleId={route.params.articleId} responseId={route.params.responseId} source={articleSource}
                                      explanationSource={explanationSource} onBack={() => navigation.goBack()} />}</Stack.Screen>
                                  </Stack.Group>}
                                  <Stack.Screen name="Main">
                                    {({ navigation }) => (
                                      <MainTabs
                                        statsSource={statsSource}
                                        digestSource={digestSource ?? defaultDigests}
                                        source={feedSource}
                                        searchSource={searchSource}
                                        onSelectArticle={(articleId, origin, listId, highlightId) =>
                                          navigation.navigate('Article', {
                                            articleId,
                                            origin,
                                            listId,
                                            highlightId,
                                            ownerUserId:
                                              origin === 'Library' || origin === 'Profile'
                                                ? state.user?.id
                                                : undefined,
                                            sessionRevision:
                                              origin === 'Library' || origin === 'Profile'
                                                ? state.revision
                                                : undefined,
                                          })
                                        }
                                      />
                                    )}
                                  </Stack.Screen>
                                  <Stack.Screen name="Editor">{props => <EditorRouteScreen {...props} source={drafts} imageSource={images} />}</Stack.Screen>
                                  <Stack.Screen name="Drafts">{props => <DraftsRouteScreen {...props} source={drafts} />}</Stack.Screen>
                                  <Stack.Screen name="WrittenStory">{({ route, navigation }) => <WrittenStoryScreen storyId={route.params.storyId} onBack={() => navigation.goBack()} />}</Stack.Screen>
                                  {/* 같은 기사 새 진입과 기존 인스턴스 복귀를 구분해 설명 수준의 수명을 보존한다. */}
                                  <Stack.Screen name="Article">
                                    {({ route, navigation }) => (
                                      <ArticlePresentation>
                                        <FocusedArticleRoute
                                          params={route.params}
                                          source={articleSource}
                                          explanationSource={explanationSource}
                                          onBack={() => navigation.goBack()}
                                          onSelectArticle={(articleId) =>
                                            navigation.push('Article', {
                                              ...route.params,
                                              articleId,
                                              highlightId: undefined,
                                            })
                                          }
                                        />
                                      </ArticlePresentation>
                                    )}
                                  </Stack.Screen>
                                  <Stack.Screen name="Identity">
                                    {({ route, navigation }) => (
                                      <FocusedIdentity
                                        target={route.params.target}
                                        onBack={() => navigation.goBack()}
                                        onSelectArticle={(articleId) =>
                                          navigation.push('Article', {
                                            articleId,
                                            origin: 'Author',
                                          })
                                        }
                                        footer={
                                          <PublicTabFooter
                                            selected={route.params.originTab}
                                            onSelect={(screen) => navigation.popTo('Main', { screen })}
                                          />
                                        }
                                      />
                                    )}
                                  </Stack.Screen>
                                  <Stack.Screen name="Connections">
                                    {({ route, navigation }) => (
                                      <ConnectionsScreen
                                        key={`${state.user?.id}:${state.revision}`}
                                        owner={route.params.owner}
                                        section={route.params.section}
                                        permitted={
                                          Boolean(route.params.owner) ||
                                          (Boolean(state.user) &&
                                            route.params.ownerUserId === state.user?.id &&
                                            route.params.revision === state.revision)
                                        }
                                        onBack={() => navigation.goBack()}
                                        footer={
                                          <PublicTabFooter
                                            selected={route.params.originTab}
                                            onSelect={(screen) => navigation.popTo('Main', { screen })}
                                          />
                                        }
                                      />
                                    )}
                                  </Stack.Screen>
                                  <Stack.Screen name="Recommendations">
                                    {({ route, navigation }) => (
                                      <RefineRecommendationsScreen
                                        initialSection={route.params.section}
                                        interests={route.params.interests}
                                        onBack={() => navigation.goBack()}
                                        onExplore={() => navigation.popTo('Main', { screen: 'Explore' })}
                                        onSelectArticle={(articleId) =>
                                          navigation.push('Article', { articleId, origin: 'History' })
                                        }
                                        footer={
                                          <PublicTabFooter
                                            selected={route.params.originTab}
                                            onSelect={(screen) => navigation.popTo('Main', { screen })}
                                          />
                                        }
                                      />
                                    )}
                                  </Stack.Screen>
                                  <Stack.Screen name="Topic">
                                    {({ route, navigation }) => (
                                      <TopicScreen
                                        topicId={route.params.topicId}
                                        onBack={() => navigation.goBack()}
                                        onSelectArticle={(articleId) =>
                                          navigation.push('Article', { articleId, origin: 'Topic' })
                                        }
                                        footer={
                                          <PublicTabFooter
                                            selected={route.params.originTab}
                                            onSelect={(screen) => navigation.popTo('Main', { screen })}
                                          />
                                        }
                                      />
                                    )}
                                  </Stack.Screen>
                                  <Stack.Screen name="Discovery">
                                    {({ route, navigation }) => (
                                      <DiscoveryScreen
                                        key={route.key}
                                        filter={route.params.filter}
                                        onBack={() => navigation.goBack()}
                                        footer={
                                          <PublicTabFooter
                                            selected={route.params.originTab}
                                            onSelect={(screen) => navigation.popTo('Main', { screen })}
                                          />
                                        }
                                      />
                                    )}
                                  </Stack.Screen>
                                  <Stack.Screen name="PublicList">
                                    {({ route, navigation }) => (
                                      <FocusedPublicList
                                        listId={route.params.listId}
                                        ownerId={route.params.ownerId}
                                        onBack={() => navigation.goBack()}
                                        onSelectArticle={(articleId) => navigation.push('Article', { articleId, origin: 'PublicList' })}
                                        footer={<PublicTabFooter selected={route.params.originTab}
                                          onSelect={(screen) => navigation.popTo('Main', { screen })} />}
                                      />
                                    )}
                                  </Stack.Screen>
                                </Stack.Navigator>
                                <ListeningPlayer onViewStory={viewListeningStory} />
                              </NavigationContainer>
                              </ListeningProvider>
                              <SessionAuthDialogs />
                            </CommunityNavigationProvider>
                            </OnboardingProvider>
                            </WrittenStoriesProvider>
                            </DownloadProvider>
                          </BookmarkProvider>
                        </RelationshipProvider>
                      </DirectoryProvider>
                    </TopicProvider>
                  </RecommendationProvider>
                </HighlightProvider>
              </ResponseProvider>
              </ClapProvider>
              </PublicListProvider>
            </ModerationProvider>
          </ReadingHistoryProvider>
        </SharingProvider>
      </ProfileProvider>
    </ReadingSettingsProvider>
  );
}

function FocusedArticleRoute(props: React.ComponentProps<typeof ArticleRouteScreen>) {
  const focused = useIsFocused();
  return <ArticleRouteScreen {...props} isFocused={focused} />;
}

type EditorRouteProps = NativeStackScreenProps<RootStackParamList, 'Editor'> & { source: DraftSource; imageSource: EditorImageSource };
function EditorRouteScreen(props: EditorRouteProps) {
  const { state } = useAuth();
  const permitted = state.user?.id === props.route.params.ownerId && state.revision === props.route.params.revision;
  const [boundary, setBoundary] = useState({ source: props.source, generation: 0, draftId: props.route.params.draftId });
  useEffect(() => { if (!permitted && props.navigation.isFocused()) props.navigation.goBack(); }, [permitted, props.navigation]);
  if (boundary.source !== props.source) {
    setBoundary({ source: props.source, generation: boundary.generation + 1, draftId: props.route.params.isNew ? props.source.newId(props.route.params.ownerId) : props.route.params.draftId }); return null;
  }
  return permitted ? <EditorSessionRoute key={boundary.generation} {...props} draftId={boundary.draftId} /> : null;
}
function EditorSessionRoute({ route, navigation, imageSource, source, draftId }: EditorRouteProps & { draftId: string }) {
  const { store } = useAuth();
  const { state: profile } = useProfile();
  const [stage, setStage] = useState<PublishStage | null>(null);
  const [session] = useState(() => createDraftSession(source, store, { userId: route.params.ownerId, revision: route.params.revision, draftId, isNew: route.params.isNew }));
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot, session.getSnapshot);
  useEffect(() => session.activate(), [session]);
  const [pending, setPending] = useState<NavigationAction | null>(null);
  const [failedExit, setFailedExit] = useState(false);
  const [allowExit, setAllowExit] = useState(false);
  async function saveAndExit(action: NavigationAction) {
    setPending(action); setFailedExit(false);
    if (await session.flush()) setAllowExit(true); else setFailedExit(true);
  }
  const publishing = snapshot.publishStatus === 'pending' || snapshot.publishStatus === 'uncertain';
  usePreventRemove((snapshot.dirty || Boolean(stage) || publishing) && !allowExit, ({ data }) => {
    if (publishing) return;
    if (stage) { setStage(stage === 'preview' ? null : 'preview'); return; }
    void saveAndExit(data.action);
  });
  useEffect(() => { if (allowExit && pending) navigation.dispatch(pending); }, [allowExit, navigation, pending]);
  return <>
    {stage ? <PublishPreview session={session} images={imageSource} authorName={profile.profile?.name ?? store.getSnapshot().user?.name ?? 'Writer'} stage={stage} onStage={setStage} onEdit={() => setStage(null)}
      onPublished={() => { setPending(StackActions.popTo('Main', { screen: 'Profile', params: { screen: 'ProfileHome' } })); setAllowExit(true); }} /> :
      <StoryEditorScreen session={session} onPreview={setStage} onClose={() => navigation.goBack()} onDrafts={() => navigation.replace('Drafts', { ownerId: route.params.ownerId, revision: route.params.revision })} imageSource={imageSource} />}
    {failedExit && pending && <EditorExitDialog onCancel={() => { setPending(null); setFailedExit(false); }} onRetry={() => { void saveAndExit(pending); }} onDiscard={() => setAllowExit(true)} />}
  </>;
}
function DraftsRouteScreen({ route, navigation, source }: NativeStackScreenProps<RootStackParamList, 'Drafts'> & { source: DraftSource }) {
  const { state } = useAuth();
  const permitted = state.user?.id === route.params.ownerId && state.revision === route.params.revision;
  useEffect(() => { if (!permitted && navigation.isFocused()) navigation.goBack(); }, [permitted, navigation]);
  return permitted ? <DraftsScreen key={state.revision} source={source} userId={route.params.ownerId} onClose={() => navigation.goBack()}
    onOpen={draftId => navigation.replace('Editor', { ...route.params, draftId, isNew: false })} /> : null;
}

function FocusedPublicList(props: React.ComponentProps<typeof PublicListScreen>) {
  const focused = useIsFocused();
  return <PublicListScreen {...props} active={focused} />;
}

function SessionAuthDialogs() {
  const { state } = useProfile();
  return <AuthDialogs profileName={state.profile?.name} />;
}

function FocusedIdentity(props: React.ComponentProps<typeof PublicIdentityScreen>) {
  const focused = useIsFocused();
  return <PublicIdentityScreen {...props} active={focused} />;
}

// 알림의 개인 경로만 인증 수명으로 제거하고 기존 공개 navigation은 보존한다.
function NotificationsRoute(props: Omit<React.ComponentProps<typeof NotificationsScreen>, 'active'>) {
  const active = useIsFocused();
  return <NotificationsScreen {...props} active={active} />;
}
function NotificationResponseRoute({ articleId, responseId, source, explanationSource, onBack }: {
  articleId: string; responseId: string; source?: ArticleSource; explanationSource?: ExplanationSource; onBack: () => void;
}) {
  const [open, setOpen] = useState(true); const active = useIsFocused();
  return <><ArticleRouteScreen params={{ articleId, origin: 'Notifications' }} source={source}
    explanationSource={explanationSource} onBack={onBack} isFocused={active} />
    {open && active && <ResponsesPanel target={{ kind: 'article', id: articleId }} initialFocusId={responseId} onClose={() => setOpen(false)} />}
  </>;
}
