import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { IconButton } from '../../shared/ui/IconButton';
import { typography, fonts, type ThemeColors } from '../../shared/theme/tokens';

import { ReadingHistoryList } from '../reading-history/ReadingHistoryList';
import { SavedLists } from '../public-lists/SavedLists';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { HighlightList } from '../highlights/HighlightList';
import { DigestPanel } from '../digest/DigestPanel';
import { createMockDigestSource } from '../digest/createMockDigestSource';
import type { DigestSource } from '../digest/types';

import { BookmarkIcon } from './BookmarkIcon';
import { LibraryListCard } from './LibraryListCard';
import { listFormStyles as createListFormStyles } from './LibrarySheet';
import { ListEditorSheet } from './ListEditorSheet';
import { DEFAULT_LIST_ID } from './listTypes';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useBookmarkScopeKey, useBookmarkStore, useReadingList, useUserLists } from './useBookmarks';
import { UserListFeedback } from './UserListFeedback';

type LibraryScreenProps = {
  active?: boolean;
  digestSource?: DigestSource;
  onOpenDigestArticle?: (articleId: string) => void;
  onOpenList: (listId: string, reorder?: boolean) => void;
  onOpenHighlight?: (articleId: string, highlightId: string) => void;
};

export function LibraryScreen(props: LibraryScreenProps) {
  const scopeKey = useBookmarkScopeKey();
  return <LibraryContent key={scopeKey} {...props} />;
}

function LibraryContent({ active = true, onOpenList, onOpenHighlight, onOpenDigestArticle, digestSource }: LibraryScreenProps) {
  const navigation = useCommunityNavigation();
  const styles = useThemeStyles(createStyles);
  const listFormStyles = useThemeStyles(createListFormStyles);
  const { state, retryReadingList, retryBookmark } = useReadingList();
  const custom = useUserLists();
  const [seenDeletion, setSeenDeletion] = useState(custom.deletionNotice);
  const [deletionNotice, setDeletionNotice] = useState<typeof custom.deletionNotice>(null);
  if (seenDeletion !== custom.deletionNotice) {
    setSeenDeletion(custom.deletionNotice);
    setDeletionNotice(custom.deletionNotice);
  }
  useEffect(() => {
    if (!deletionNotice) return;
    const timer = setTimeout(() => setDeletionNotice(null), 2600);
    return () => clearTimeout(timer);
  }, [deletionNotice]);
  const store = useBookmarkStore();
  const [selectedTab, setSelectedTab] = useState('Your lists');
  const [visitedDigest, setVisitedDigest] = useState(false);
  const [defaultDigests] = useState(() => createMockDigestSource());
  const tabScroll = useRef<ScrollView>(null);
  const [dismissed, setDismissed] = useState(false);
  const [creating, setCreating] = useState(false);
  if (!active && creating) setCreating(false);
  const showIntroduction =
    !dismissed &&
    state.status === 'ready' &&
    !state.articles.length &&
    !custom.entries.some((entry) => entry.listId !== DEFAULT_LIST_ID && entry.content);
  const lists = [
    ...(state.status === 'ready'
      ? [{ listId: DEFAULT_LIST_ID, name: '읽기 목록', articles: state.articles }]
      : []),
    ...custom.entries.flatMap((entry) =>
      entry.content && entry.listId !== DEFAULT_LIST_ID
        ? [
            {
              listId: entry.listId,
              name: entry.content.name,
              isPrivate: entry.content.isPrivate,
              articles: entry.content.articleIds.flatMap(id => store.articles.find(article => article.id === id) ?? []),
            },
          ]
        : [],
    ),
  ];
  const header = (
    <View>
      <View style={styles.header}>
        {deletionNotice && <View pointerEvents="none" style={styles.deletionNotice}>
          <Text aria-live="polite" style={styles.deletionText}>List deleted and removed from Your library</Text>
        </View>}
        <Text role="heading" accessibilityLabel="라이브러리" style={styles.title}>
          Your library
        </Text>
        <Pressable
          role="button"
          accessibilityLabel="새 목록"
          disabled={custom.status !== 'ready'}
          accessibilityState={{ disabled: custom.status !== 'ready' }}
          onPress={() => setCreating(true)}
          style={[styles.newTarget, custom.status !== 'ready' && listFormStyles.disabled]}
        >
          <View style={styles.newPill}>
            <Text style={styles.newText}>New list</Text>
          </View>
        </Pressable>
      </View>
      <ScrollView
        ref={tabScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
        style={styles.section}
      >
        {['Your lists', 'Saved lists', 'Digest', 'Highlighted', 'Reading history'].map((tab) => (
          <Pressable
            key={tab}
            role="tab"
            accessibilityLabel={tab}
            aria-selected={selectedTab === tab}
            onLayout={(event) => {
              if (selectedTab === tab)
                tabScroll.current?.scrollTo({
                  x: Math.max(0, event.nativeEvent.layout.x - 150),
                  animated: false,
                });
            }}
            onPress={() => {
              setSelectedTab(tab);
              if (tab === 'Digest') setVisitedDigest(true);
            }}
            style={styles.tab}
          >
            <View style={[styles.tabLabel, selectedTab === tab && styles.activeTab]}>
              <Text style={[styles.tabText, selectedTab === tab && styles.activeText]}>{tab}</Text>
              {tab === 'Digest' && showIntroduction && !visitedDigest && <Text style={styles.badge}>New</Text>}
            </View>
          </Pressable>
        ))}
      </ScrollView>
      {selectedTab === 'Your lists' && showIntroduction && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Create a list to easily{'\n'}curate and share stories</Text>
          <Pressable role="button" onPress={() => setCreating(true)} style={styles.start}>
            <View style={styles.startPill}>
              <Text style={styles.newText}>Start a list</Text>
            </View>
          </Pressable>
          <View style={styles.bannerCircle} />
          <View style={styles.bannerArt}>
            <BookmarkIcon saved={false} plus size={20} />
          </View>
          <IconButton
            icon="close"
            label="Dismiss list introduction"
            onPress={() => setDismissed(true)}
            size={16}
            color="white"
            style={styles.dismiss}
          />
        </View>
      )}
      {selectedTab === 'Your lists' && (
        <ReadingListFeedback state={state} onRetry={retryReadingList} onRetryBookmark={retryBookmark} />
      )}
      {selectedTab === 'Your lists' && <UserListFeedback />}
    </View>
  );
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      {visitedDigest && <View style={[styles.screen, selectedTab !== 'Digest' && { display: 'none' }]}>
        <DigestPanel active={active && selectedTab === 'Digest'} source={digestSource ?? defaultDigests} userId={store.userLists.userId} header={header} onOpen={onOpenDigestArticle ?? navigation.openHistoryArticle} />
      </View>}
      {selectedTab === 'Digest' ? null : selectedTab === 'Saved lists' ? <SavedLists header={header} /> : selectedTab === 'Reading history' ? (
        <ReadingHistoryList
          header={header}
          onSelect={navigation.openHistoryArticle}
          onExplore={navigation.openExplore}
        />
      ) : selectedTab === 'Highlighted' ? (
        <HighlightList
          header={header}
          onOpen={(articleId, highlightId) => onOpenHighlight?.(articleId, highlightId)}
        />
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(list) => list.listId}
          contentContainerStyle={styles.content}
          ListHeaderComponent={header}
          renderItem={({ item, index }) => (
            <LibraryListCard active={active}
              {...item}
              afterIntroduction={index === 0 && showIntroduction}
              onOpen={onOpenList}
            />
          )}
        />
      )}
      {creating && <ListEditorSheet onClose={() => setCreating(false)} />}
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    deletionNotice: { position: 'absolute', top: 34, left: 40, right: 40, padding: 20,
      borderRadius: 4, backgroundColor: '#242424', zIndex: 10 },
    deletionText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: '#ffffff' },
    screen: { flex: 1, backgroundColor: colors.background },
    content: { flexGrow: 1, width: '100%', maxWidth: 728, alignSelf: 'center', paddingBottom: 24 },
    header: {
      zIndex: 2,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    title: { ...typography.pageTitle, color: colors.text },
    section: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
    tabLabel: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 4 },
    badge: {
      fontFamily: fonts.sans,
      fontSize: 10,
      lineHeight: 14,
      color: colors.onAccent,
      backgroundColor: colors.green,
      paddingHorizontal: 3,
      borderRadius: 2,
    },
    tabs: { paddingHorizontal: 24, gap: 32 },
    tab: {
      minHeight: 48,
      minWidth: 48,
      marginHorizontal: -10,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    activeTab: { borderBottomWidth: 1, borderBottomColor: colors.text },
    tabText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.secondaryText },
    activeText: { color: colors.text },
    newTarget: { minHeight: 48, justifyContent: 'center' },
    newPill: {
      paddingHorizontal: 16,
      minHeight: 38,
      justifyContent: 'center',
      backgroundColor: colors.green,
      borderRadius: 24,
    },
    newText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.onAccent },
    banner: {
      marginHorizontal: 24,
      marginTop: 24,
      backgroundColor: colors.green,
      paddingTop: 24,
      paddingBottom: 10,
      paddingRight: 24,
      paddingLeft: 34,
      minHeight: 124,
      borderRadius: 3,
      overflow: 'hidden',
    },
    bannerText: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: '600',
      color: colors.onAccent,
    },
    start: { minHeight: 48, justifyContent: 'center', alignSelf: 'flex-start', zIndex: 1 },
    startPill: {
      minHeight: 32,
      paddingHorizontal: 16,
      justifyContent: 'center',
      backgroundColor: '#204d24',
      borderRadius: 24,
    },
    bannerCircle: {
      position: 'absolute',
      right: -24,
      bottom: 0,
      width: 136,
      height: 100,
      borderTopLeftRadius: 100,
      borderTopRightRadius: 100,
      backgroundColor: '#37952f',
    },
    bannerArt: {
      position: 'absolute',
      right: 24,
      bottom: 16,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dismiss: {
      position: 'absolute',
      right: 0,
      top: 0,
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      paddingRight: 8,
      paddingTop: 6,
    },
  });
