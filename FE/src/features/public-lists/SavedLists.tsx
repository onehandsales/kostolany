import { useEffect, type ReactNode } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { publicIdentity, publicListPreviews } from '../community/data/publicDirectory';
import { useModeration } from '../moderation/ModerationContext';
import { usePublicLists } from './PublicListProvider';
import { SavePublicListControl } from './SavePublicListControl';

type SavedListsProps = { header: ReactNode };
export function SavedLists({ header }: SavedListsProps) {
  const { state, store, scope } = usePublicLists();
  const moderation = useModeration();
  const navigation = useCommunityNavigation();
  const styles = useThemeStyles(createStyles);
  useEffect(() => { void store?.reload(); }, [store]);
  const lists = state?.value?.lists.filter(list =>
    (state.savedIds.includes(list.id) || state.pendingIds.includes(list.id) || state.errors[list.id] === scope)
    && !moderation.state?.value?.blocked.includes(list.owner.id)) ?? [];
  const error = state?.readError || moderation.state?.readError;
  const loading = !state?.value || (moderation.store && !moderation.state?.value);
  return <FlatList data={error || loading ? [] : lists} keyExtractor={list => list.id}
    contentContainerStyle={styles.content} accessibilityLabel="Saved public lists"
    ListHeaderComponent={<>{header}</>}
    ListEmptyComponent={<ContentStatus loading={!error && Boolean(loading)} error={Boolean(error)}
      message={error ? 'Couldn’t load saved lists.' : loading ? 'Loading saved lists…' : 'You haven’t saved any lists yet.'}
      actionLabel={error ? 'Retry saved lists' : !loading ? 'Explore lists' : undefined}
      onAction={() => { if (error) { void store?.reload(); void moderation.store?.reload(); }
        else navigation.openExplore(); }} />}
    renderItem={({ item }) => {
      const owner = publicIdentity(item.owner);
      const covers = publicListPreviews.find(list => list.id === item.id)?.covers ?? [];
      return <View style={styles.card}>
        <Pressable role="button" accessibilityLabel={`Open saved list ${item.title}`}
          style={styles.link} onPress={() => navigation.openPublicList(item.id, item.owner.id)}>
          <Text style={styles.owner}>{owner?.name ?? item.owner.id}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.metadata}>{item.capturedStoryCount} stories</Text>
          {!!covers.length && <View style={styles.covers}>{covers.map((cover, index) =>
            <Image key={index} source={cover} style={styles.cover} accessible={false} />)}</View>}
        </Pressable>
        <View style={styles.actions}><SavePublicListControl list={item} /></View>
      </View>;
    }} />;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  content: { paddingBottom: 24 }, card: { marginHorizontal: 24, marginTop: 24, borderWidth: 1,
    borderColor: colors.border, borderRadius: 3, backgroundColor: colors.section, overflow: 'hidden' },
  link: { minHeight: 48, gap: 12, padding: 20 },
  owner: { fontFamily: fonts.sans, fontSize: 14, color: colors.secondaryText },
  title: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 26, fontWeight: '700', color: colors.text },
  metadata: { fontFamily: fonts.sans, fontSize: 13, color: colors.secondaryText },
  covers: { flexDirection: 'row', gap: 4 }, cover: { flex: 1, height: 100 },
  actions: { paddingHorizontal: 20, paddingBottom: 8 },
});
