import { useEffect, useState } from 'react';
import { FlatList, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { useIdentityCatalog } from '../community/useIdentityCatalog';
import { useTopics } from '../topics/TopicProvider';
import { discoveryEntries, discoveryKey, DiscoveryRow } from '../topics/DiscoveryRow';
import { usePublicLists } from '../public-lists/PublicListProvider';
import { useModeration } from '../moderation/ModerationContext';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { useKnownProfile } from '../profile/ProfileProvider';
import type { PublicList } from '../public-lists/types';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { SEARCH_PAGE_SIZE, searchCatalog, type SearchCategory } from './catalogSearch';

type CatalogSearchResultsProps = {
  query: string;
  category: Exclude<SearchCategory, 'Stories'>;
  active: boolean;
};

export function CatalogSearchResults({ query, category, active }: CatalogSearchResultsProps) {
  const directory = useIdentityCatalog();
  const topics = useTopics();
  const lists = usePublicLists();
  const moderation = useModeration();
  const styles = useThemeStyles(createStyles);
  const [settled, setSettled] = useState(false);
  const [limit, setLimit] = useState(SEARCH_PAGE_SIZE);
  useEffect(() => {
    if (!active || settled) return;
    const timer = setTimeout(() => setSettled(true), 250);
    return () => clearTimeout(timer);
  }, [active, settled]);
  const status =
    category === 'Lists'
      ? (lists.state?.status ?? 'error')
      : category === 'Topics'
        ? topics.state.status
        : directory.state.status;
  const error =
    status === 'error' || (category === 'Lists' && lists.state?.readError) || moderation.state?.readError;
  const loading = !settled || status === 'loading' || (moderation.store && !moderation.state?.value);
  const retry = () => {
    if (category === 'Lists') void lists.store?.reload();
    else if (category === 'Topics') topics.retry();
    else directory.retry();
    if (moderation.state?.readError) void moderation.store?.reload();
  };
  if (error)
    return (
      <ContentStatus
        error
        message="검색 결과를 불러오지 못했어요"
        actionLabel="검색 다시 시도"
        onAction={retry}
      />
    );
  if (loading) return <ContentStatus loading message="검색하고 있어요" />;
  const blocked = moderation.state?.value?.blocked ?? [];
  const entries = discoveryEntries(directory.state.data, topics.state.data)
    .filter(
      (entry) =>
        (category === 'People'
          ? entry.target.kind === 'writer'
          : category === 'Publications'
            ? entry.target.kind === 'publication'
            : category === 'Topics' && entry.target.kind === 'topic') &&
        !(entry.target.kind === 'writer' && blocked.includes(entry.target.id)),
    );
  const matches = searchCatalog(entries, query, discoveryKey, (entry) => `${entry.name} ${entry.bio ?? ''}`);
  const publicLists = searchCatalog(
    (lists.state?.value?.lists ?? []).filter(
      (list) => !list.isPrivate && !(list.owner.kind === 'writer' && blocked.includes(list.owner.id)),
    ),
    query,
    (list) => list.id,
    (list) => `${list.title} ${list.description}`,
  );
  const total = category === 'Lists' ? publicLists.length : matches.length;
  const footer =
    limit < total ? (
      <Pressable
        role="button"
        accessibilityLabel="검색 결과 더 보기"
        style={styles.more}
        onPress={() => setLimit(Math.min(limit + SEARCH_PAGE_SIZE, total))}
      >
        <Text style={styles.meta}>Show more</Text>
      </Pressable>
    ) : null;
  const empty = <ContentStatus message="검색 결과가 없어요" />;
  return (
    <View style={styles.results}>
      <Text style={styles.count} accessibilityLiveRegion="polite">
        {total}개
      </Text>
      {category === 'Lists' ? (
        <FlatList
          data={publicLists.slice(0, limit)}
          keyExtractor={(list) => list.id}
          accessibilityLabel="Lists 검색 목록"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          initialNumToRender={8}
          windowSize={5}
          ListEmptyComponent={empty}
          ListFooterComponent={footer}
          renderItem={({ item }) => <SearchListRow list={item} />}
        />
      ) : (
        <FlatList
          data={matches.slice(0, limit)}
          keyExtractor={discoveryKey}
          accessibilityLabel={`${category} 검색 목록`}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          initialNumToRender={8}
          windowSize={5}
          ListEmptyComponent={empty}
          ListFooterComponent={footer}
          renderItem={({ item }) => (
            <DiscoveryRow
              active={active}
              entry={item}
              label={
                matches.some(
                  (other) => other.name === item.name && discoveryKey(other) !== discoveryKey(item),
                )
                  ? `Discover ${item.name}, ${item.meta || item.target.id}`
                  : undefined
              }
            />
          )}
        />
      )}
    </View>
  );
}

function SearchListRow({ list }: { list: PublicList }) {
  const styles = useThemeStyles(createStyles);
  const navigation = useCommunityNavigation();
  const directory = useIdentityCatalog();
  const known = useKnownProfile(list.owner.kind === 'writer' ? list.owner.id : '');
  const owner = directory.state.data?.identities.find(
    (identity) => identity.id === list.owner.id && identity.kind === list.owner.kind,
  );
  return (
    <Pressable
      role="button"
      accessibilityLabel={`Open search list ${list.title}`}
      style={styles.list}
      onPress={() => {
        Keyboard.dismiss();
        navigation.openPublicList(list.id, list.owner.id);
      }}
    >
      <Text style={styles.meta}>{known?.name ?? owner?.name ?? list.owner.id}</Text>
      <Text style={styles.title}>{list.title}</Text>
      {!!list.description && (
        <Text style={styles.meta} numberOfLines={3}>
          {list.description}
        </Text>
      )}
      <Text style={styles.meta}>{list.capturedStoryCount} stories</Text>
    </Pressable>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    results: { flex: 1 },
    count: { color: colors.secondaryText, fontFamily: fonts.sans, marginHorizontal: 24, marginTop: 12 },
    list: {
      minHeight: 48,
      margin: 24,
      marginBottom: 0,
      padding: 20,
      gap: 12,
      backgroundColor: colors.section,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 3,
    },
    title: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 26, fontWeight: '700', color: colors.text },
    meta: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.secondaryText },
    more: { minHeight: 48, minWidth: 48, padding: 16, alignItems: 'center' },
  });
