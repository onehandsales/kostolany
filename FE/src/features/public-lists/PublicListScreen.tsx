import { useEffect, useState, type ReactNode } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { IconButton } from '../../shared/ui/IconButton';
import { useShareDialog } from '../sharing/SharingProvider';
import { ShareSheet } from '../sharing/ShareSheet';
import { useAuth } from '../auth/AuthProvider';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { publicIdentity } from '../community/data/publicDirectory';
import { FollowControl } from '../community/FollowControl';
import { useCatalogArticles } from '../feed/ArticleCatalog';
import { bookmarkArticles } from '../bookmarks/data/bookmarkFixtures';
import { mockUsers } from '../auth/data/mockUsers';
import { useKnownProfile } from '../profile/ProfileProvider';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { useModeration } from '../moderation/ModerationContext';
import { ClapControl } from '../reactions/ClapControl';
import { useClapStore } from '../reactions/ClapProvider';
import { ResponseButton } from '../responses/ResponseButton';
import { PublicListStoryCard } from './PublicListStoryCard';
import { SavePublicListControl } from './SavePublicListControl';
import { usePublicLists } from './PublicListProvider';
import type { PublicList } from './types';

type PublicListScreenProps = { listId: string; ownerId?: string; onBack: () => void;
  onSelectArticle: (id: string) => void; footer?: ReactNode; active?: boolean };
export function PublicListScreen(props: PublicListScreenProps) {
  const { state, scope, store } = usePublicLists();
  const moderation = useModeration();
  const styles = useThemeStyles(createStyles);
  const list = state?.value?.lists.find(item => item.id === props.listId
    && (!props.ownerId || item.owner.id === props.ownerId));
  const unavailable = list && moderation.state?.value?.blocked.includes(list.owner.id);
  useEffect(() => { if (props.active) void store?.reload(); }, [store, props.active]);
  if (!state?.value || state.readError || (moderation.store && !moderation.state?.value)
    || moderation.state?.readError) {
    return <SafeAreaView style={styles.screen}>
      <IconButton icon="back" label="Back from public list" onPress={props.onBack} />
      <ContentStatus loading={!state?.readError && !moderation.state?.readError}
        error={Boolean(state?.readError || moderation.state?.readError)}
        message={state?.readError || moderation.state?.readError ? 'Couldn’t load this list.' : 'Loading list…'}
        actionLabel={state?.readError || moderation.state?.readError ? 'Retry public list' : undefined}
        onAction={() => { void store?.reload(); void moderation.store?.reload(); }} />
      {props.footer}
    </SafeAreaView>;
  }
  if (!list || unavailable) return <SafeAreaView style={styles.screen}>
    <IconButton icon="back" label="Back from public list" onPress={props.onBack} />
    <ContentStatus message="This list is unavailable." actionLabel="Refresh public list" onAction={() => { void store?.reload(); }} />
    {props.footer}
  </SafeAreaView>;
  return <PublicListContent key={`${scope}:${list.id}`} {...props} list={list}
    saved={state.savedIds.includes(list.id)} />;
}
function PublicListContent({ list, saved, onBack, onSelectArticle, footer, active = true }: PublicListScreenProps & {
  list: PublicList; saved: boolean;
}) {
  const styles = useThemeStyles(createStyles);
  const auth = useAuth();
  const navigation = useCommunityNavigation();
  const moderation = useModeration();
  const owner = publicIdentity(list.owner);
  const knownProfile = useKnownProfile(list.owner.id);
  const ownerName = knownProfile?.name ?? owner?.name ?? mockUsers.find(user => user.id === list.owner.id)?.name ?? list.owner.id;
  const clapStore = useClapStore();
  const own = auth.state.user?.id === list.owner.id;
  const [collapsed, setCollapsed] = useState(false);
  const { store } = usePublicLists();
  const sharing = useShareDialog(store ?? undefined, active);
  const target = { kind: 'list' as const, id: list.id };
  const catalogArticles = useCatalogArticles(bookmarkArticles);
  const articles = list.articleIds.flatMap(id => {
    const article = catalogArticles.find(item => item.id === id);
    return article && (!article.publishedStory?.unlisted || article.publishedStory.ownerId === auth.state.user?.id) ? [article] : [];
  });
  const share = () => sharing.open({ kind: 'list', id: list.id, title: list.title,
    subtitle: list.description, authorId: list.owner.kind === 'writer' ? list.owner.id : undefined,
    authorName: ownerName, avatar: owner?.avatar, visibility: list.isPrivate ? 'private' : 'public' });
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <View style={styles.header}>
      <IconButton icon="back" label="Back from public list" onPress={onBack} />
      <Text numberOfLines={1} style={styles.headerTitle}>{collapsed ? list.title : ''}</Text>
      <SavePublicListControl list={list} compact />
      <ActionMenu label={`List options, ${list.title}`} items={[
        { label: 'Share list', onPress: share },
        ...(clapStore ? [{ label: 'Undo claps', onPress: () => clapStore.undo(target) }] : []),
        ...(!own ? [{ label: 'Report list', onPress: () => moderation.open({ kind: 'report',
          target: { kind: 'list', id: list.id, writerId: list.owner.kind === 'writer' ? list.owner.id : null }, title: list.title }) }] : []),
      ]} />
    </View>
    <View style={styles.body}>
      <FlatList data={articles} keyExtractor={article => article.id}
        onScroll={event => setCollapsed(event.nativeEvent.contentOffset.y > 96)} scrollEventThrottle={32}
        contentContainerStyle={styles.content} accessibilityLabel={`Stories in ${list.title}`}
        ListHeaderComponent={<View style={styles.intro}>
          <Pressable role="button" accessibilityLabel={`Open ${ownerName} profile`}
            style={styles.owner} onPress={() => navigation.openIdentity(list.owner)}>
            <View style={styles.ownerAvatar}>
              <ProfileAvatar userId={list.owner.kind === 'writer' ? list.owner.id : undefined} fallback={owner?.avatar} size={40} style={styles.avatar} />
            </View>
            <View style={styles.ownerText}>
              <Text style={styles.ownerName}>{ownerName}</Text>
              <Text style={styles.metadata}>{list.publishedLabel ? `${list.publishedLabel} · ` : ''}
                {list.capturedStoryCount} stories · {list.baselineSaves + Number(saved)} saves</Text>
            </View>
          </Pressable>
          <Text role="heading" style={styles.title}>{list.title}</Text>
          {!!list.description && <Text style={styles.description}>{list.description}</Text>}
          {own && <Text style={styles.metadata}>{list.isPrivate ? 'Your private list' : 'Your public list'}</Text>}
        </View>}
        renderItem={({ item }) => <View>
          {!!list.notes?.[item.id] && <Text style={styles.note}>{list.notes[item.id]}</Text>}
          <PublicListStoryCard article={item} onOpen={onSelectArticle} /></View>}
        ListFooterComponent={<View>
          {articles.length < list.capturedStoryCount && <Text style={styles.missing}>
            {articles.length} of {list.capturedStoryCount} captured stories are available in this sample.
          </Text>}
          <View style={styles.more}>
            <View style={styles.moreHeading}>
              <Text style={styles.moreTitle}>More from {ownerName}</Text>
              {!own && <FollowControl target={list.owner} name={ownerName} />}
            </View>
            {!!owner?.bio && <Text style={styles.ownerBio}>{owner.bio}</Text>}
          </View>
        </View>} />
      <View style={styles.toolbar}>
        <ClapControl target={target} title={list.title} baseline={list.baselineClaps} size={22} />
        <ResponseButton target={target} title={list.title} size={20} />
        <IconButton icon="share" label={`Share list ${list.title}`} onPress={share} />
      </View>
    </View>
    {footer}
    {sharing.target && <ShareSheet target={{ ...sharing.target, title: list.title, subtitle: list.description,
      visibility: list.isPrivate ? 'private' : 'public' }} available={!list.isPrivate} onClose={sharing.close} />}
  </SafeAreaView>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  note: { marginHorizontal: 24, marginTop: 16, paddingLeft: 12, borderLeftWidth: 3, borderColor: colors.border,
    fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, fontStyle: 'italic', color: colors.text },
  screen: { flex: 1, backgroundColor: colors.background },
  header: { minHeight: 48, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center' },
  headerTitle: { flex: 1, fontFamily: fonts.sans, fontSize: 14, fontWeight: '700', color: colors.text },
  body: { flex: 1 }, content: { paddingBottom: 100 },
  intro: { paddingHorizontal: 24, paddingBottom: 26, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  owner: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 8 },
  ownerAvatar: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  avatar: { borderWidth: 0, backgroundColor: 'transparent' }, ownerText: { flex: 1, gap: 4 },
  ownerName: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.text },
  metadata: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.secondaryText },
  title: { fontFamily: fonts.sans, fontSize: 22, fontWeight: '800', lineHeight: 26, color: colors.text, marginTop: 8 },
  description: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.text, marginTop: 8 },
  missing: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText, padding: 24 },
  more: { backgroundColor: colors.section, padding: 24, paddingTop: 32 },
  moreHeading: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12 },
  moreTitle: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '700', color: colors.text, flex: 1 },
  ownerBio: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText, maxWidth: 240 },
  toolbar: { position: 'absolute', bottom: 16, alignSelf: 'center', maxWidth: '96%', paddingHorizontal: 12,
    flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 40, backgroundColor: colors.background,
    borderWidth: 1, borderColor: colors.border, boxShadow: '0 2px 18px rgba(0,0,0,0.10)' },
});
