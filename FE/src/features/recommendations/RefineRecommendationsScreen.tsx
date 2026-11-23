import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { TopPopover } from '../../shared/ui/TopPopover';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';

import { ProfileAvatar } from '../profile/ProfileAvatar';
import { useAuth } from '../auth/AuthProvider';
import { useIdentityCatalog } from '../community/useIdentityCatalog';
import { useRelationships } from '../community/RelationshipProvider';
import { followKey } from '../community/types';
import { FollowControl } from '../community/FollowControl';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { useTopics } from '../topics/TopicProvider';
import { discoveryEntries, discoveryKey, type DiscoveryEntry } from '../topics/DiscoveryRow';
import { useModeration } from '../moderation/ModerationContext';
import { ReadingHistoryList } from '../reading-history/ReadingHistoryList';

export type RecommendationSection = 'Following' | 'Reading history' | 'Muted' | 'Suggestions';
type Filter = 'All' | 'Writers' | 'Publications' | 'Topics';
type Props = {
  initialSection: RecommendationSection;
  interests?: boolean;
  active?: boolean;
  onBack: () => void;
  onExplore: () => void;
  onSelectArticle: (id: string) => void;
  footer?: ReactNode;
};
export function RefineRecommendationsScreen(props: Props) {
  const auth = useAuth();
  return <RefineContent key={`${auth.state.user?.id}:${auth.state.revision}`} {...props} />;
}
function RefineContent({
  initialSection,
  interests = false,
  active = true,
  onBack,
  onExplore,
  onSelectArticle,
  footer,
}: Props) {
  const styles = useThemeStyles(createStyles);
  const { width } = useWindowDimensions();
  const directory = useIdentityCatalog();
  const topics = useTopics();
  const relationships = useRelationships();
  const moderation = useModeration();
  const auth = useAuth();
  const tabScroll = useRef<ScrollView>(null);
  const filterButton = useRef<View>(null);
  const filterRequest = useRef(0);
  useEffect(
    () => () => {
      filterRequest.current += 1;
    },
    [active],
  );
  const [section, setSection] = useState(initialSection);
  const [filter, setFilter] = useState<Filter>(interests ? 'Topics' : 'All');
  const [menu, setMenu] = useState<number | null>(null);
  const [limit, setLimit] = useState(5);
  function closeFilter() {
    filterRequest.current += 1;
    setMenu(null);
  }
  if (!active && menu !== null) setMenu(null);
  function openFilter() {
    const request = ++filterRequest.current;
    setMenu(240);
    filterButton.current?.measureInWindow((_x, y, _w, h) => {
      if (request === filterRequest.current) setMenu(y + h);
    });
  }
  const entries = discoveryEntries(directory.state.data, topics.state.data);
  const matchesFilter = (entry: DiscoveryEntry) =>
    filter === 'All' ||
    (filter === 'Writers' && entry.target.kind === 'writer') ||
    (filter === 'Publications' && entry.target.kind === 'publication') ||
    (filter === 'Topics' && entry.target.kind === 'topic');
  const filtered = entries.filter((entry) => {
    if (!matchesFilter(entry)) return false;
    if (section === 'Suggestions' && entry.target.kind === 'writer' && entry.target.id === auth.state.user?.id) return false;
    const key = discoveryKey(entry);
    const muted = moderation.state?.value?.muted.some((item) => followKey(item) === key);
    if (section === 'Muted') return muted;
    if (section === 'Following')
      return relationships.state?.relationships.some(
        (item) => followKey(item.target) === key && item.following,
      );
    return (
      !muted &&
      !(entry.target.kind === 'writer' && moderation.state?.value?.blocked.includes(entry.target.id))
    );
  });
  const preferredTopics = ['programming', 'self-improvement', 'data-science', 'writing', 'relationships'];
  const preferredWriters = ['kim-witten', 'zulie-medium', 'wilson'];
  if (section === 'Suggestions')
    filtered.sort((a, b) => {
      const rank = (entry: DiscoveryEntry) => {
        const index = (entry.target.kind === 'topic' ? preferredTopics : preferredWriters).indexOf(
          entry.target.id,
        );
        return index < 0 ? 100 : index;
      };
      return rank(a) - rank(b);
    });
  if (section === 'Following')
    filtered.sort((a, b) => a.name.localeCompare(b.name) || discoveryKey(a).localeCompare(discoveryKey(b)));
  const wantsTopics = filter === 'Topics' || filter === 'All';
  const wantsDirectory = filter !== 'Topics';
  const loading =
    (wantsTopics && topics.state.status === 'loading') ||
    (wantsDirectory && directory.state.status === 'loading') ||
    relationships.state?.status === 'loading' ||
    moderation.state?.status === 'loading';
  const error =
    (wantsTopics && topics.state.status === 'error') ||
    (wantsDirectory && directory.state.status === 'error') ||
    relationships.state?.readError ||
    moderation.state?.readError;
  const navigationHeader = (
    <>
      <View style={styles.intro}>
        <Text role="heading" style={styles.title}>
          {interests ? 'Your interests' : 'Refine recommendations'}
        </Text>
        <Text style={styles.description}>
          {interests
            ? 'Follow topics to update your interests. Changes apply immediately.'
            : 'Adjust recommendations by updating what you’re following, your reading history, and who you’ve muted.'}
        </Text>
      </View>
      {!interests && (
        <ScrollView
          horizontal
          ref={tabScroll}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
          style={styles.tabBorder}
        >
          {(['Following', 'Reading history', 'Muted', 'Suggestions'] as const).map((item) => (
            <Pressable
              key={item}
              role="tab"
              aria-selected={item === section}
              accessibilityState={{ selected: item === section }}
              onLayout={(event) => {
                if (item === section)
                  tabScroll.current?.scrollTo({
                    x: Math.max(0, event.nativeEvent.layout.x - 160),
                    animated: false,
                  });
              }}
              onPress={() => {
                setSection(item);
                if (item === 'Muted' && filter === 'Topics') setFilter('All');
                setLimit(5);
                closeFilter();
              }}
              style={[styles.tab, item === section && styles.activeTab]}
            >
              <Text style={[styles.tabText, item === section && styles.activeText]}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </>
  );
  const header = (
    <>
      {section !== 'Reading history' && (
        <Pressable
          ref={filterButton}
          role="button"
          accessibilityLabel={`Filter recommendations: ${filter}`}
          style={styles.filterTarget}
          onPress={openFilter}
        >
          <View style={styles.filter}>
            <Text style={styles.text}>{filter}</Text>
            <View style={{ transform: [{ rotate: '90deg' }] }}>
              <AppIcon name="chevron" size={16} />
            </View>
          </View>
        </Pressable>
      )}
      {!auth.state.user && section !== 'Suggestions' && (
        <ContentStatus
          message="Sign in to manage your recommendations."
          actionLabel="Sign in for recommendations"
          onAction={() => auth.store.openLogin({ kind: 'recommendations' })}
        />
      )}
    </>
  );
  const rows: ({ kind: 'heading'; title: string } | { kind: 'entry'; entry: DiscoveryEntry }
    | { kind: 'more'; filter: Filter; count: number })[] = [];
  if (filter === 'All' && (section === 'Suggestions' || section === 'Following')) {
    for (const kind of ['writer', 'publication', 'topic'] as const) {
      const members = filtered.filter((entry) => entry.target.kind === kind);
      const group = members.slice(0, limit);
      const category = kind === 'writer' ? 'Writers' : kind === 'publication' ? 'Publications' : 'Topics';
      if (group.length) {
        rows.push({
          kind: 'heading',
          title: section === 'Following' ? `${category} (${members.length})` : `${category} to follow`,
        });
        group.forEach((entry) => rows.push({ kind: 'entry', entry }));
        if (section === 'Following') rows.push({ kind: 'more', filter: category, count: members.length });
      }
    }
  } else filtered.slice(0, limit).forEach((entry) => rows.push({ kind: 'entry', entry }));
  const more =
    filter === 'All' && section === 'Suggestions'
      ? ['writer', 'publication', 'topic'].some(
          (kind) => filtered.filter((entry) => entry.target.kind === kind).length > limit,
        )
      : !(filter === 'All' && section === 'Following') && filtered.length > limit;
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.back}>
        <IconButton icon="back" label="Back from refine recommendations" onPress={onBack} />
      </View>
      {navigationHeader}
      {section === 'Reading history' ? (
        <ReadingHistoryList header={header} onSelect={onSelectArticle} onExplore={onExplore} />
      ) : (
        <FlatList
          key={`${section}:${filter}`}
          accessibilityLabel={`${section} recommendations`}
          data={loading || error ? [] : rows}
          initialNumToRender={8}
          windowSize={5}
          keyExtractor={(item) => item.kind === 'heading' ? item.title : item.kind === 'more' ? `more:${item.filter}` : discoveryKey(item.entry)}
          ListHeaderComponent={header}
          renderItem={({ item }) =>
            item.kind === 'heading' ? (
              <Text role="heading" style={styles.group}>
                {item.title}
              </Text>
            ) : item.kind === 'more' ? (
              <Pressable role="button" accessibilityLabel={`See all ${item.filter} (${item.count})`} style={styles.groupMore}
                onPress={() => { setFilter(item.filter); setLimit(Math.max(5, item.count)); closeFilter(); }}>
                <Text style={styles.link}>See all ({item.count})</Text>
              </Pressable>
            ) : (
              <RecommendationRow active={active} entry={item.entry} muted={section === 'Muted'} />
            )
          }
          ListEmptyComponent={
            loading ? (
              <ContentStatus loading message="Loading recommendations…" />
            ) : error ? (
              <ContentStatus
                error
                message="Couldn’t load recommendations."
                actionLabel="Retry recommendations"
                onAction={() => {
                  directory.retry();
                  topics.retry();
                  void relationships.store?.reload();
                  void moderation.store?.reload();
                }}
              />
            ) : (
              <ContentStatus
                message={
                  section === 'Muted'
                    ? 'You haven’t muted anyone.'
                    : section === 'Following'
                      ? "You don't follow anything yet."
                      : 'No suggestions available.'
                }
              />
            )
          }
          ListFooterComponent={
            !loading && !error && more ? (
              <Pressable role="button" style={styles.more} onPress={() => setLimit((value) => value + 10)}>
                <Text style={styles.link}>
                  {section === 'Suggestions' ? 'See more suggestions' : 'See all'}
                </Text>
              </Pressable>
            ) : null
          }
        />
      )}
      {footer}
      {menu !== null && (
        <TopPopover
          title="Recommendation filter"
          onClose={closeFilter}
          width={250}
          top={menu}
          right={Math.max(12, (width - 250) / 2)}
          showPointer={false}
        >
          {(['All', 'Writers', 'Publications', 'Topics'] as const)
            .filter((item) => section !== 'Muted' || item !== 'Topics')
            .map((item) => (
              <Pressable
                key={item}
                role="radio"
                aria-checked={filter === item}
                accessibilityState={{ checked: filter === item }}
                accessibilityLabel={item}
                style={styles.option}
                onPress={() => {
                  setFilter(item);
                  setLimit(5);
                  closeFilter();
                }}
              >
                <View style={styles.check}>{filter === item && <AppIcon name="check" size={16} />}</View>
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            ))}
        </TopPopover>
      )}
    </SafeAreaView>
  );
}
function RecommendationRow({ entry, muted, active }: { entry: DiscoveryEntry; muted: boolean; active: boolean }) {
  const styles = useThemeStyles(createStyles);
  const navigation = useCommunityNavigation();
  const moderation = useModeration();
  const openIdentity = () => entry.target.kind === 'topic'
    ? navigation.openTopic(entry.target.id) : navigation.openIdentity(entry.target);
  return (
    <View style={styles.row}>
      <Pressable accessible={false} style={styles.avatarTarget} onPress={openIdentity}>
      {entry.target.kind === 'writer' ? (
        <ProfileAvatar userId={entry.target.id} fallback={entry.avatar} size={32} style={styles.avatar} />
      ) : entry.avatar ? (
        <Image source={entry.avatar} style={[styles.avatar, styles.square]} accessible={false} />
      ) : (
        <View style={styles.topicIcon}><AppIcon name="document" size={16} /></View>
      )}
      </Pressable>
      <View style={styles.content}>
        <View style={styles.rowHeader}>
          <Pressable role="button" accessibilityLabel={`Recommendation ${entry.name}`} style={styles.identity}
            onPress={openIdentity}>
            <Text style={styles.name}>{entry.name}</Text>
            {entry.verified && <AppIcon name="verified" size={14} />}
          </Pressable>
          {muted ? (
            <Pressable role="button" accessibilityLabel={`Unmute ${entry.name}`} style={styles.unmute}
              onPress={() => {
                if (entry.target.kind !== 'topic') moderation.open({
                  kind: 'confirm', action: { kind: 'mute', target: entry.target, active: false },
                  title: `Unmute ${entry.name}?`,
                  description: 'Stories from this writer or publication can appear in recommendations again.',
                  success: 'Unmuted',
                });
              }}><Text style={styles.text}>Unmute</Text></Pressable>
          ) : <FollowControl active={active} target={entry.target} name={entry.name} />}
        </View>
        {entry.target.kind === 'topic' ? (
          <Text style={[styles.meta, styles.topicMeta]}>{entry.meta?.replace(' stories', ' Stories')}</Text>
        ) : Boolean(entry.bio) && <Text numberOfLines={3} style={styles.meta}>{entry.bio}</Text>}
      </View>
    </View>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    back: { height: 48, paddingHorizontal: 4, alignItems: 'flex-start' },
    intro: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
    title: {
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 26,
      letterSpacing: -0.35,
      fontWeight: '700',
      color: colors.text,
    },
    description: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.secondaryText,
      marginTop: 16,
      letterSpacing: -0.22,
    },
    tabs: { paddingHorizontal: 24, gap: 32 },
    tabBorder: {
      flexGrow: 0,
      flexShrink: 0,
      minHeight: 48,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    tab: { minHeight: 48, justifyContent: 'center' },
    activeTab: { borderBottomWidth: 1, borderBottomColor: colors.text },
    tabText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.secondaryText },
    activeText: { color: colors.text },
    filterTarget: {
      marginHorizontal: 24,
      marginTop: 32,
      marginBottom: 24,
      minHeight: 48,
      justifyContent: 'center',
    },
    filter: {
      minHeight: 40,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 24,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
    option: {
      minHeight: 48,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    optionText: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.text },
    check: { width: 16 },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: 24,
      paddingVertical: 12,
      gap: 0,
    },
    identity: { flex: 1, minWidth: 48, minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 4 },
    avatarTarget: { width: 48, minHeight: 48 },
    avatar: { width: 32, height: 32, borderRadius: 16, marginTop: 8 },
    square: { borderRadius: 2 },
    topicIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginTop: 8,
      backgroundColor: colors.input,
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: { flex: 1, minWidth: 0 },
    rowHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
    name: {
      flexShrink: 1,
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.text,
    },
    topicMeta: { fontSize: 13 },
    meta: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.secondaryText },
    group: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '700',
      color: colors.text,
      paddingHorizontal: 24,
      marginBottom: 16,
      marginTop: 8,
    },
    more: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 24, marginVertical: 24 },
    groupMore: { minHeight: 48, justifyContent: 'center', marginHorizontal: 24, marginTop: 24, marginBottom: 40, paddingBottom: 24, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
    link: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.green },
    unmute: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 8 },
  });
