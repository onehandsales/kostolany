import { useEffect, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { IconButton } from '../../shared/ui/IconButton';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { useProfile } from '../profile/ProfileProvider';
import { ListStoryCard } from './ListStoryCard';
import { colors, sizes, typography, fonts } from '../../shared/theme/tokens';
import { SearchCard } from '../search/SearchCard';
import { ListActions } from './ListActions';
import { DEFAULT_LIST_ID } from './listTypes';
import { ReadingListFeedback } from './ReadingListFeedback';
import { useBookmarkStore, useReadingList, useUserLists } from './useBookmarks';
import { UserListFeedback } from './UserListFeedback';

type ReadingListScreenProps = {
  listId?: string;
  backLabel?: string;
  onBack: () => void;
  onBrowseArticles: () => void;
  onSelectArticle: (articleId: string) => void;
};

export function ReadingListScreen({
  listId = DEFAULT_LIST_ID,
  onBack,
  onBrowseArticles,
  onSelectArticle,
  backLabel = '라이브러리로 돌아가기',
}: ReadingListScreenProps) {
  const profile = useProfile();
  const [notice, setNotice] = useState<string | null>(null);
  const [removed, setRemoved] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const { state, retryReadingList, retryBookmark } = useReadingList();
  const custom = useUserLists();
  const store = useBookmarkStore();
  const isDefault = listId === DEFAULT_LIST_ID;
  const selected = custom.entries.find((entry) => entry.listId === listId);
  const articles = isDefault
    ? state.articles
    : store.articles.filter((article) => selected?.content?.articleIds.includes(article.id));
  const status = isDefault ? state.status : custom.status;
  const name = isDefault ? '읽기 목록' : (selected?.content?.name ?? '');
  useEffect(() => {
    if (!isDefault && custom.status === 'ready' && !selected?.content) onBack();
  }, [isDefault, custom.status, selected?.content, onBack]);
  if (!isDefault && custom.status === 'ready' && !selected?.content) return null;
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.header}>
        <Pressable role="button" accessibilityLabel={backLabel} onPress={onBack} style={styles.back}>
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
        <IconButton
          icon="download"
          label="Download list"
          size={20}
          onPress={() => setNotice('Download list')}
        />
        {isDefault && (
          <IconButton
            icon="more"
            label="Reading list options"
            onPress={() => setNotice('Reading list options')}
          />
        )}
        {!isDefault && <ListActions listId={listId} name={name} />}
      </View>
      {removed && !articles.some((article) => article.id === removed) && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Story removed from list</Text>
          <Pressable
            role="button"
            onPress={() => {
              store.setArticleInList(listId, removed, true);
              setRemoved(null);
            }}
            style={styles.undo}
          >
            <Text style={styles.toastText}>Undo</Text>
          </Pressable>
        </View>
      )}
      <FlatList
        onScroll={(event) => setCollapsed(event.nativeEvent.contentOffset.y > 80)}
        scrollEventThrottle={32}
        accessibilityLabel="저장한 기사 목록"
        data={articles}
        keyExtractor={(article) => article.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.intro}>
              <View style={styles.ownerRow}>
                <View style={styles.avatar} />
                <View style={styles.ownerInfo}>
                  <Text style={styles.owner}>{profile.state.profile?.name ?? 'Reader'}</Text>
                  {status === 'ready' && (
                    <Text accessibilityLabel={`${articles.length}개의 기사`} style={styles.count}>
                      {articles.length
                        ? `${articles.length} ${articles.length === 1 ? 'story' : 'stories'}`
                        : 'No stories'}
                    </Text>
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
          </View>
        }
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
            <ListStoryCard
              article={item}
              onOpen={onSelectArticle}
              onNotice={setNotice}
              onRemove={() => {
                store.setArticleInList(listId, item.id, false);
                setRemoved(item.id);
              }}
            />
          ) : (
            <SearchCard
              article={item}
              onSelect={onSelectArticle}
              footer={
                <Pressable
                  role="button"
                  accessibilityLabel={`이 목록에서 제거, ${item.title}`}
                  onPress={() => store.setArticleInList(listId, item.id, false)}
                  style={styles.remove}
                >
                  <Text style={styles.removeText}>이 목록에서 제거</Text>
                </Pressable>
              }
            />
          )
        }
      />
      <View style={styles.listBar}>
        <IconButton icon="clap" label="List claps" color="#dddddd" onPress={() => setNotice('List claps')} />
        <IconButton icon="comment" label="List responses" onPress={() => setNotice('List responses')} />
        <IconButton icon="share" label="Share list" onPress={() => setNotice('Share list')} />
      </View>
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#fafafa',
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
  browseText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.background, textAlign: 'center' },
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
    backgroundColor: 'white',
    borderRadius: 32,
    boxShadow: '0px 2px 24px rgba(0,0,0,0.08)',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#242424',
  },
  toastText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: 'white' },
  undo: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
  pressed: { opacity: 0.6 },
});
