import { useCallback, useEffect, useRef, useState } from 'react';
import { usePreventRemove } from '@react-navigation/native';
import { BackHandler, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { IconButton } from '../../shared/ui/IconButton';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { useShareDialog } from '../sharing/SharingProvider';
import { ShareSheet } from '../sharing/ShareSheet';
import { ClapControl } from '../reactions/ClapControl';
import { ResponseButton } from '../responses/ResponseButton';
import { useProfile } from '../profile/ProfileProvider';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { sizes, typography, fonts, type ThemeColors } from '../../shared/theme/tokens';
import { SearchCard } from '../search/SearchCard';

import { ListStoryCard } from './ListStoryCard';
import { ReorderListEditor } from './ReorderListEditor';
import { ListActions } from './ListActions';
import { DEFAULT_LIST_ID, type RemovedListStory } from './listTypes';
import { ListNoteSheet } from './ListNoteSheet';
import type { FeedArticle } from '../feed/types';
import { ListDetailMetadata } from './ListDetailMetadata';
import { ownedPublicListId } from '../public-lists/ownedPublicList';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useBookmarkScopeKey, useBookmarkStore, useReadingList, useUserLists } from './useBookmarks';
import { UserListFeedback } from './UserListFeedback';
import { DownloadArticleStatus, DownloadControl, DownloadFeedback } from '../downloads/DownloadControl';

type ReadingListScreenProps = {
  active?: boolean;
  listId?: string;
  initialReorder?: boolean;
  backLabel?: string;
  onBack: () => void;
  onBrowseArticles: () => void;
  onSelectArticle: (articleId: string) => void;
};

export function ReadingListScreen(props: ReadingListScreenProps) {
  const scope = useBookmarkScopeKey();
  return <ReadingListContent key={JSON.stringify([scope, props.listId])} {...props} />;
}

function ReadingListContent({
  active = true,
  listId = DEFAULT_LIST_ID,
  initialReorder = false,
  onBack,
  onBrowseArticles,
  onSelectArticle,
  backLabel = '라이브러리로 돌아가기',
}: ReadingListScreenProps) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const profile = useProfile();
  const [notice, setNotice] = useState<string | null>(null);
  const sharing = useShareDialog();
  const [removed, setRemoved] = useState<RemovedListStory | string | null>(null);
  const [editingNote, setEditingNote] = useState<FeedArticle | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [reordering, setReordering] = useState(initialReorder);
  const listRef = useRef<FlatList<FeedArticle>>(null);
  const backRef = useRef<View>(null);
  const scrollOffset = useRef(0);
  const closeReorder = useCallback(() => {
    setReordering(false);
    requestAnimationFrame(() => backRef.current?.focus());
  }, []);
  if (!active) {
    if (notice) setNotice(null);
    if (removed) setRemoved(null);
    if (editingNote) setEditingNote(null);
    if (reordering) setReordering(false);
    if (sharing.target) sharing.close();
  }
  usePreventRemove(active && reordering, closeReorder);
  useEffect(() => {
    if (!active || !reordering) return;
    const listener = BackHandler.addEventListener('hardwareBackPress', () => { closeReorder(); return true; });
    return () => listener.remove();
  }, [active, reordering, closeReorder]);
  const { state, retryReadingList, retryBookmark } = useReadingList();
  const custom = useUserLists();
  const store = useBookmarkStore();
  const isDefault = listId === DEFAULT_LIST_ID;
  const selected = custom.entries.find((entry) => entry.listId === listId);
  const articles = selected?.content
    ? selected.content.articleIds.flatMap(id => store.articles.find(article => article.id === id) ?? [])
    : isDefault ? state.articles : [];
  const status = isDefault ? state.status : custom.status;
  const name = isDefault ? '읽기 목록' : (selected?.content?.name ?? '');
  const removedId = typeof removed === 'string' ? removed : removed?.articleId;
  const reactionTarget = { kind: 'list' as const, id: ownedPublicListId(store.userLists.userId, listId) };
  function removeStory(articleId: string) {
    if (selected) setRemoved(store.userLists.removeStory(listId, articleId));
    else { store.setArticleInList(listId, articleId, false); setRemoved(articleId); }
  }
  useEffect(() => {
    if (!isDefault && custom.status === 'ready' && !selected?.content) onBack();
  }, [isDefault, custom.status, selected?.content, onBack]);
  const header = <View>
            <View style={styles.intro}>
              <View style={styles.ownerRow}>
                <ProfileAvatar userId={profile.state.profile?.userId} size={48} />
                <View style={styles.ownerInfo}>
                  <Text style={styles.owner}>{profile.state.profile?.name ?? 'Reader'}</Text>
                  {status === 'ready' && (
                    <ListDetailMetadata active={active} updatedAt={selected?.confirmed?.updatedAt}
                      count={articles.length} isPrivate={isDefault || Boolean(selected?.content?.isPrivate)} />
                  )}
                </View>
              </View>
              <Text role="heading" accessibilityLabel={name} style={styles.title}>
                {isDefault ? 'Reading list' : name}
              </Text>
              {Boolean(selected?.content?.description) && (
                <Text style={styles.description}>{selected?.content?.description}</Text>
              )}
            </View>
            <DownloadFeedback active={active} listId={listId} />
            {isDefault ? (
              <ReadingListFeedback
                state={state}
                onRetry={retryReadingList}
                onRetryBookmark={retryBookmark}
                showSavedFailures={false}
              />
            ) : (
              <UserListFeedback listId={listId} hideVisibleMembershipFailures />
            )}
          </View>;
  if (!isDefault && custom.status === 'ready' && !selected?.content) return null;
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.header}>
        <Pressable ref={backRef} role="button" accessibilityLabel={backLabel} onPress={reordering ? closeReorder : onBack} style={styles.back}>
          <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            aria-hidden
            accessible={Platform.OS === 'web' ? undefined : false}
          >
            <Path d="M15 4 7 12 15 20" fill="none" stroke={colors.secondaryText} strokeWidth={2} />
          </Svg>
        </Pressable>
        <Text style={styles.headerTitle}>{collapsed ? (isDefault ? 'Reading list' : name) : ''}</Text>
        <DownloadControl active={active} listId={listId} />
        {isDefault && !selected && (
          <IconButton
            icon="more"
            label="Reading list options"
            onPress={() => setNotice('Reading list options')}
          />
        )}
        {selected && <ListActions active={active} listId={listId} name={name} onReorder={() => setReordering(true)} />}
      </View>
      {removed && !articles.some((article) => article.id === removedId) && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Story removed from list</Text>
          <Pressable
            role="button"
            onPress={() => {
              if (typeof removed === 'string') store.setArticleInList(listId, removed, true);
              else {
                const result = store.userLists.undoRemove(removed);
                if (!result.ok) setNotice(result.message);
              }
              setRemoved(null);
            }}
            style={styles.undo}
          >
            <Text style={styles.toastText}>Undo</Text>
          </Pressable>
        </View>
      )}
      {reordering && selected?.content ? <ReorderListEditor listId={listId} header={header} onClose={closeReorder} /> : <FlatList
        ref={listRef}
        onContentSizeChange={() => { if (scrollOffset.current) listRef.current?.scrollToOffset({ offset: scrollOffset.current, animated: false }); }}
        onScroll={(event) => { scrollOffset.current = event.nativeEvent.contentOffset.y; setCollapsed(scrollOffset.current > 80); }}
        scrollEventThrottle={32}
        accessibilityLabel="저장한 기사 목록"
        data={articles}
        keyExtractor={(article) => article.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={header}
        ListEmptyComponent={
          status === 'ready' ? (
            <View style={styles.empty}>
              <Text accessibilityLabel="아직 저장한 기사가 없어요." style={styles.emptyTitle}>
                You don’t have any content in{'\n'}this list yet.
              </Text>
              <Text style={styles.emptyDescription}>
                Tap the bookmark to add your favorite stories{'\n'}to this list.
              </Text>
              <Pressable
                role="button"
                accessibilityLabel="기사 둘러보기"
                onPress={onBrowseArticles}
                style={({ pressed }) => [styles.browse, pressed && styles.pressed]}
              >
                <Text style={styles.browseText}>Start browsing</Text>
              </Pressable>
            </View>
          ) : null
        }
        renderItem={({ item }) =>
          item.reference ? (
            <ListStoryCard active={active}
              listId={listId}
              article={item}
              onOpen={onSelectArticle}
              onNotice={setNotice}
              note={selected?.content?.notes?.[item.id]}
              onEditNote={selected ? () => setEditingNote(item) : undefined}
              onRemove={() => removeStory(item.id)}
            />
          ) : (
            <SearchCard
              key={`${item.id}:${active}`}
              article={item}
              onSelect={onSelectArticle}
              footer={<View>
                <DownloadArticleStatus listId={listId} articleId={item.id} title={item.title} />
                {selected && <Pressable role="button" accessibilityLabel={`Add a note, ${item.title}`}
                  onPress={() => setEditingNote(item)} style={styles.remove}>
                  <Text style={styles.removeText}>{selected.content?.notes?.[item.id] || 'Add a note...'}</Text></Pressable>}
                <Pressable
                  role="button"
                  accessibilityLabel={`이 목록에서 제거, ${item.title}`}
                  onPress={() => removeStory(item.id)}
                  style={styles.remove}
                >
                  <Text style={styles.removeText}>이 목록에서 제거</Text>
                </Pressable></View>
              }
            />
          )
        }
      />}
      {!reordering && <View style={styles.listBar}>
        <ClapControl target={reactionTarget} title={name} size={20} />
        <ResponseButton active={active} target={reactionTarget} title={name} label="List responses" size={20} />
        <IconButton icon="share" label="Share list" onPress={() => sharing.open({
          kind: 'list', id: ownedPublicListId(store.userLists.userId, listId), title: name,
          subtitle: selected?.content?.description ?? '', authorId: store.userLists.userId,
          authorName: 'My list', visibility: isDefault || selected?.content?.isPrivate ? 'private' : 'public',
        })} />
      </View>}
      {sharing.target && <ShareSheet target={{ ...sharing.target, title: name,
        subtitle: selected?.content?.description ?? '',
        visibility: isDefault || selected?.content?.isPrivate ? 'private' : 'public' }}
        available={!isDefault && !selected?.content?.isPrivate && Boolean(selected?.content)} onClose={sharing.close} />}
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
      {editingNote && selected?.content && <ListNoteSheet listId={listId} article={editingNote} onClose={() => setEditingNote(null)} />}
    </SafeAreaView>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { minHeight: 48, paddingLeft: 0, paddingRight: 4, flexDirection: 'row', alignItems: 'center' },
  remove: { minHeight: 48, minWidth: 48, alignSelf: 'flex-end', justifyContent: 'center', marginTop: 8 },
  removeText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.secondaryText, textDecorationLine: 'underline' },
  back: {
    width: sizes.minimumTouchTarget,
    minHeight: sizes.minimumTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flexGrow: 1, width: '100%', maxWidth: 728, alignSelf: 'center', paddingBottom: 88 },
  intro: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 4,
    gap: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  owner: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.text },
  title: { ...typography.pageTitle, color: colors.text },
  count: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.secondaryText },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 110,
    gap: 8,
    backgroundColor: colors.section,
  },
  emptyTitle: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 21, fontWeight: '600', color: colors.text, textAlign: 'center' },
  emptyDescription: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.text, textAlign: 'center' },
  browse: {
    minHeight: sizes.minimumTouchTarget,
    minWidth: sizes.minimumTouchTarget,
    backgroundColor: colors.green,
    borderRadius: 28,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 56,
  },
  browseText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.onAccent, textAlign: 'center' },
  headerTitle: { flex: 1, fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '600', color: colors.text },
  ownerRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.input },
  ownerInfo: { flex: 1, gap: 4 },
  description: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.secondaryText },
  listBar: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: 32,
    boxShadow: '0px 2px 24px rgba(0,0,0,0.08)',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.text,
  },
  toastText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.onInverse },
  undo: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
  pressed: { opacity: 0.6 },
});
