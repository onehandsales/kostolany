import { useEffect, useState, type ReactNode } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useIdentityCatalog } from './useIdentityCatalog';
import { useModeration } from '../moderation/ModerationContext';
import { useCommunityNavigation } from './CommunityNavigation';
import { FollowControl } from './FollowControl';
import { SafeWebsiteLink } from './SafeWebsiteLink';
import { publicListPreviews } from './data/publicDirectory';
import { SavePublicListControl } from '../public-lists/SavePublicListControl';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { useShareDialog } from '../sharing/SharingProvider';
import { ShareSheet } from '../sharing/ShareSheet';
import { useAuth } from '../auth/AuthProvider';
import { usePublicLists } from '../public-lists/PublicListProvider';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { followKey, type FollowTarget } from './types';
import { useKnownProfile } from '../profile/ProfileProvider';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { mediumArticles } from '../feed/data/mediumFixtures';
import { ReferenceArticleCard } from '../feed/components/ReferenceArticleCard';
import { usePublicStories } from '../editor/usePublicStories';
import { PublishedStoryRow } from '../editor/PublishedStoryRow';
import { IconButton } from '../../shared/ui/IconButton';
import { AppIcon } from '../../shared/ui/AppIcon';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';

type Props = {
  target: FollowTarget;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
  footer?: ReactNode;
  active?: boolean;
};
export function PublicIdentityScreen(props: Props) {
  return <IdentityContent key={followKey(props.target)} {...props} />;
}
function IdentityContent({ target, onBack, onSelectArticle, footer, active = true }: Props) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const directory = useIdentityCatalog();
  const navigation = useCommunityNavigation();
  const moderation = useModeration();
  const publicLists = usePublicLists();
  const sharing = useShareDialog(publicLists.store ?? undefined);
  const auth = useAuth();
  const knownProfile = useKnownProfile(target.kind === 'writer' ? target.id : '');
  const { scope } = moderation;
  const blocked = target.kind === 'writer' && Boolean(moderation.state?.value?.blocked.includes(target.id));
  const [uiScope, setUiScope] = useState(scope);
  const [section, setSection] = useState<'Stories' | 'Lists' | 'About'>('Stories');
  const [message, setMessage] = useState<string | null>(null);
  const published = usePublicStories(active && section === 'Stories' && !blocked);
  if (uiScope !== scope) {
    setUiScope(scope);
    setMessage(null);
  }
  if (!active && message) setMessage(null);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 2400);
    return () => clearTimeout(timer);
  }, [message]);
  const identity = directory.state.data?.identities.find((item) => followKey(item) === followKey(target));
  const lists = publicLists.state?.value?.lists.filter(list => !list.isPrivate && followKey(list.owner) === followKey(target)) ?? [];
  useEffect(() => {
    if (active && section === 'Lists') void publicLists.store?.reload();
  }, [active, section, publicLists.store]);
  const storyIds = identity
    ? [...identity.pinned, ...identity.stories.filter((id) => !identity.pinned.includes(id))]
    : [];
  const stories = storyIds.flatMap((id) => {
    const article = mediumArticles.find((item) => item.id === id);
    return article ? [article] : [];
  });
  // 발행 저장소의 공개 글만 같은 작성자 또는 publication의 프로필에 합친다.
  const rows = [
    ...stories.filter(article => identity?.pinned.includes(article.id))
      .map(article => ({ kind: 'article' as const, id: `article:${article.id}`, article })),
    ...published.items.filter(story => !moderation.state?.value?.blocked.includes(story.userId) &&
      (target.kind === 'writer' ? story.userId === target.id : story.publishing.publicationId === target.id))
      .map(story => ({ kind: 'written' as const, id: `written:${story.id}`, story })),
    ...stories.filter(article => !identity?.pinned.includes(article.id))
      .map(article => ({ kind: 'article' as const, id: `article:${article.id}`, article })),
  ];
  const header = identity && (
    <>
      <View style={styles.identity}>
        {target.kind === 'writer' ? <ProfileAvatar userId={target.id} fallback={identity.avatar} size={56} /> : identity.avatar ? (
          <Image
            source={identity.avatar}
            style={[styles.avatar, target.kind === 'publication' && styles.square]}
            accessible={false}
          />
        ) : (
          <View style={styles.avatar} />
        )}
        <View style={styles.grow}>
          <View style={styles.nameRow}>
            <Text role="heading" style={styles.name}>
              {knownProfile?.name ?? identity.name}
            </Text>
            {!!knownProfile?.pronouns.length && <Text style={styles.caption}>{knownProfile.pronouns.join('/')}</Text>}
            {identity.verified && <AppIcon name="verified" size={14} />}
          </View>
          <View style={styles.counts}>
            <Pressable
              role="button"
              accessibilityLabel={`${identity.name} followers`}
              style={styles.count}
              onPress={() => navigation.openConnections(target, 'followers')}
            >
              <Text style={styles.caption}>
                {identity.followers ?? '—'}
                {identity.followers?.includes('followers') ? '' : ' followers'}
              </Text>
            </Pressable>
            <Text style={styles.caption}>·</Text>
            <Pressable
              role="button"
              accessibilityLabel={`${identity.name} following`}
              style={styles.count}
              onPress={() => navigation.openConnections(target, 'following')}
            >
              <Text style={styles.caption}>{identity.followingCount ?? '—'} following</Text>
            </Pressable>
          </View>
          {identity.friend && (
            <View style={styles.badge}>
              <AppIcon name="friend" size={18} color={colors.gold} />
              <Text style={styles.caption}>Friend of Medium</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.follow}>
        <FollowControl target={target} name={identity.name} active={active} wide onMessage={setMessage} />
      </View>
      <View style={styles.tabs}>
        {(['Stories', 'Lists', 'About'] as const).map((tab) => (
          <Pressable
            key={tab}
            role="tab"
            aria-selected={section === tab}
            accessibilityState={{ selected: section === tab }}
            onPress={() => setSection(tab)}
            style={styles.tab}
          >
            <View style={[styles.tabLabel, section === tab && styles.activeTab]}>
              <Text style={styles.caption}>{tab}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      {section === 'Stories' && !blocked && published.status !== 'ready' && (
        <ContentStatus loading={published.status === 'loading'} error={published.status === 'error'}
          message={published.status === 'error' ? 'Couldn’t load published stories.' : 'Loading published stories…'}
          actionLabel={published.status === 'error' ? 'Retry published stories' : undefined}
          onAction={published.status === 'error' ? published.retry : undefined} />
      )}
      {section === 'About' && (
        <View style={styles.about}>
          {(
            identity.about ??
            (identity.bio
              ? [identity.bio]
              : ['Additional About information is not included in the reference.'])
          ).map((paragraph, index) => (
            <Text key={index} style={styles.aboutText}>
              {paragraph}
            </Text>
          ))}
          {identity.memberSince && (
            <Text style={styles.member}>
              Medium member since {identity.memberSince}
              {identity.friendSince ? `  ·  Friend of Medium since ${identity.friendSince}` : ''}
            </Text>
          )}
          {identity.website && <SafeWebsiteLink url={identity.website} />}
        </View>
      )}
      {section === 'Lists' && !blocked && (
        <View style={styles.lists}>
          {publicLists.state?.readError ? (
            <ContentStatus message="Couldn’t load public lists." error actionLabel="Retry public lists"
              onAction={() => { void publicLists.store?.reload(); }} />
          ) : !publicLists.state?.value ? (
            <ContentStatus message="Loading public lists…" loading />
          ) : lists.length ? (
            lists.map((list) => {
              const preview = publicListPreviews.find((item) => item.id === list.id);
              return (
                <View key={list.id} style={styles.list}>
                  <View style={styles.listCopy}>
                    <Pressable role="button" accessibilityLabel={`Open list ${list.title}`}
                      onPress={() => navigation.openPublicList(list.id, list.owner.id)} style={{ minHeight: 48, gap: 12 }}>
                      <View style={styles.badge}>
                        <ProfileAvatar userId={identity.kind === 'writer' ? identity.id : undefined} fallback={identity.avatar} size={20} />
                        <Text style={styles.secondary}>{knownProfile?.name ?? identity.name}</Text>
                      </View>
                      <Text style={styles.listTitle}>{list.title}</Text>
                    </Pressable>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Text style={[styles.secondary, { flex: 1 }]}>{list.capturedStoryCount} stories</Text>
                      <SavePublicListControl list={list} compact />
                      <ActionMenu label={`List options, ${list.title}`} items={[
                        { label: 'Share list', onPress: () => sharing.open({ kind: 'list', id: list.id,
                          title: list.title, subtitle: list.description, authorName: knownProfile?.name ?? identity.name,
                          authorId: list.owner.kind === 'writer' ? list.owner.id : undefined,
                          avatar: identity.avatar, visibility: list.isPrivate ? 'private' : 'public' }) },
                        ...(auth.state.user?.id !== list.owner.id ? [{ label: 'Report list', onPress: () => moderation.open({
                          kind: 'report', target: { kind: 'list', id: list.id,
                            writerId: list.owner.kind === 'writer' ? list.owner.id : null }, title: list.title }) }] : []),
                      ]} />
                    </View>
                  </View>
                  <Pressable role="button" accessibilityLabel={`Open list stories ${list.title}`}
                    onPress={() => navigation.openPublicList(list.id, list.owner.id)} style={styles.covers}>
                    {preview?.covers.map((source, index) => (
                      <Image key={index} source={source} style={styles.cover} accessible={false} />
                    ))}
                  </Pressable>
                </View>
              );
            })
          ) : (
            <Text style={styles.secondary}>No captured public lists</Text>
          )}
        </View>
      )}
    </>
  );
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.toolbar}>
        <IconButton icon="back" label="Back from profile" onPress={onBack} />
        <View style={styles.grow} />
        {identity && (
          <IconButton
            icon="more"
            label={`${identity.name} options`}
            onPress={() => moderation.open({ kind: 'author', target, name: identity.name })}
          />
        )}
      </View>
      {directory.state.status === 'loading' ? (
        <View style={styles.status}>
          <ActivityIndicator />
          <Text style={styles.secondary}>Loading profile…</Text>
        </View>
      ) : directory.state.status === 'error' ? (
        <Pressable
          role="button"
          accessibilityLabel="Retry public profile"
          onPress={directory.retry}
          style={styles.status}
        >
          <Text role="alert" style={styles.secondary}>
            Couldn’t load the profile. Retry
          </Text>
        </Pressable>
      ) : !identity ? (
        <Text style={styles.status}>Profile unavailable</Text>
      ) : (
        <FlatList
          accessibilityLabel={`${identity.name} ${section}`}
          key={section}
          data={section === 'Stories' && !blocked ? rows : []}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={header}
          renderItem={({ item }) => item.kind === 'written' ? <PublishedStoryRow story={item.story} /> : (
            <View>
              {identity.pinned.includes(item.article.id) && (
                <View style={styles.pinned}>
                  <AppIcon name="pin" size={16} color={colors.secondaryText} />
                  <Text style={styles.secondary}>Pinned</Text>
                </View>
              )}
              <ReferenceArticleCard article={item.article} onSelect={onSelectArticle} variant="profile" />
            </View>
          )}
          ListFooterComponent={
            blocked && section !== 'About' ? (
              <Text style={styles.status}>
                You blocked this author. Unblock them from the options menu to view their stories and lists.
              </Text>
            ) : section === 'Stories' && !rows.length && published.status === 'ready' ? (
              <Text style={styles.status}>No captured stories</Text>
            ) : null
          }
        />
      )}
      {footer}
      {sharing.target && <ShareSheet target={sharing.target}
        available={lists.some(list => list.id === sharing.target?.id)} onClose={sharing.close} />}
      {message && (
        <View style={styles.toast} pointerEvents="none">
          <Text aria-live="polite" style={styles.toastText}>
            {message}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    toolbar: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    grow: { flex: 1 },
    identity: {
      flexDirection: 'row',
      gap: 16,
      marginHorizontal: 24,
      marginTop: -4,
    },
    avatar: {
      height: 56,
      width: 56,
      borderRadius: 28,
      backgroundColor: colors.input,
      marginTop: 4,
    },
    square: { borderRadius: 3 },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    name: {
      fontFamily: fonts.sans,
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '600',
      color: colors.text,
      flexShrink: 1,
    },
    counts: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      columnGap: 6,
      marginVertical: -8,
    },
    count: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
    badge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    caption: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
    follow: { marginHorizontal: 24, marginTop: 16 },
    tabs: {
      flexDirection: 'row',
      gap: 24,
      paddingHorizontal: 24,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      marginTop: 12,
    },
    tab: {
      minHeight: 48,
      minWidth: 48,
      marginHorizontal: -8,
      paddingHorizontal: 8,
    },
    tabLabel: { minHeight: 48, justifyContent: 'center' },
    activeTab: { borderBottomWidth: 1, borderColor: colors.text },
    pinned: {
      marginHorizontal: 24,
      marginTop: 30,
      marginBottom: -20,
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    about: {
      paddingHorizontal: 24,
      paddingTop: 24,
      gap: 20,
      paddingBottom: 24,
    },
    aboutText: {
      fontFamily: fonts.serif,
      fontSize: 18,
      lineHeight: 26,
      color: colors.text,
    },
    member: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
      marginTop: 32,
    },
    lists: { padding: 24, paddingTop: 32, gap: 24 },
    list: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      borderRadius: 3,
      overflow: 'hidden',
    },
    listCopy: { padding: 24, paddingBottom: 0, gap: 12 },
    smallAvatar: { width: 20, height: 20, borderRadius: 10 },
    listTitle: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '700',
      color: colors.text,
    },
    secondary: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.secondaryText,
    },
    covers: { flexDirection: 'row', gap: 4 },
    cover: { width: '43%', height: 106 },
    status: { padding: 24, minHeight: 80, justifyContent: 'center', gap: 12 },
    menuRow: { padding: 16, minHeight: 48, justifyContent: 'center' },
    toast: {
      position: 'absolute',
      top: 48,
      left: 35,
      right: 35,
      backgroundColor: colors.text,
      padding: 24,
      borderRadius: 3,
    },
    toastText: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.onInverse,
    },
  });
