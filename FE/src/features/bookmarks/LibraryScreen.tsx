import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookmarkIcon } from './BookmarkIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { colors, typography } from '../../shared/theme/tokens';
import { LibraryListCard } from './LibraryListCard';
import { listFormStyles } from './LibrarySheet';
import { ListEditorSheet } from './ListEditorSheet';
import { DEFAULT_LIST_ID } from './listTypes';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useBookmarkScopeKey, useBookmarkStore, useReadingList, useUserLists } from './useBookmarks';
import { UserListFeedback } from './UserListFeedback';

export function LibraryScreen(props: { onOpenList: (listId: string) => void }) {
  const scopeKey = useBookmarkScopeKey();
  return <LibraryContent key={scopeKey} {...props} />;
}

function LibraryContent({ onOpenList }: { onOpenList: (listId: string) => void }) {
  const { state, retryReadingList, retryBookmark } = useReadingList();
  const custom = useUserLists();
  const store = useBookmarkStore();
  const [notice, setNotice] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [creating, setCreating] = useState(false);
  const showIntroduction =
    !dismissed &&
    state.status === 'ready' &&
    !state.articles.length &&
    !custom.entries.some((entry) => entry.content);
  const lists = [
    ...(state.status === 'ready'
      ? [{ listId: DEFAULT_LIST_ID, name: '읽기 목록', articles: state.articles }]
      : []),
    ...custom.entries.flatMap((entry) =>
      entry.content
        ? [
            {
              listId: entry.listId,
              name: entry.content.name,
              isPrivate: entry.content.isPrivate,
              articles: store.articles.filter((article) => entry.content?.articleIds.includes(article.id)),
            },
          ]
        : [],
    ),
  ];
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <FlatList
        data={lists}
        keyExtractor={(list) => list.listId}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
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
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabs}
              style={styles.section}
            >
              {['Your lists', 'Saved lists', 'Digest', 'Highlighted', 'Reading history'].map((tab, index) => (
                <Pressable
                  key={tab}
                  role="tab"
                  aria-selected={index === 0}
                  onPress={() => {
                    if (index) setNotice(tab);
                  }}
                  style={styles.tab}
                >
                  <View style={[styles.tabLabel, index === 0 && styles.activeTab]}>
                    <Text style={[styles.tabText, index === 0 && styles.activeText]}>{tab}</Text>
                    {tab === 'Digest' && showIntroduction && <Text style={styles.badge}>New</Text>}
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            {showIntroduction && (
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
            <ReadingListFeedback state={state} onRetry={retryReadingList} onRetryBookmark={retryBookmark} />
            <UserListFeedback />
          </View>
        }
        renderItem={({ item, index }) => (
          <LibraryListCard
            {...item}
            afterIntroduction={index === 0 && showIntroduction}
            onOpen={onOpenList}
          />
        )}
      />
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
      {creating && <ListEditorSheet onClose={() => setCreating(false)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, width: '100%', maxWidth: 728, alignSelf: 'center', paddingBottom: 24 },
  header: {
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
    fontSize: 10,
    lineHeight: 14,
    color: 'white',
    backgroundColor: '#18820f',
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
  tabText: { fontSize: 14, lineHeight: 20, color: colors.secondaryText },
  activeText: { color: colors.text },
  newTarget: { minHeight: 48, justifyContent: 'center' },
  newPill: {
    paddingHorizontal: 16,
    minHeight: 38,
    justifyContent: 'center',
    backgroundColor: '#18820f',
    borderRadius: 24,
  },
  newText: { fontSize: 14, lineHeight: 20, color: 'white' },
  banner: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#18820f',
    paddingTop: 24,
    paddingBottom: 10,
    paddingRight: 24,
    paddingLeft: 34,
    minHeight: 124,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bannerText: { fontSize: 16, lineHeight: 21, fontWeight: '600', color: 'white' },
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
    backgroundColor: 'white',
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
