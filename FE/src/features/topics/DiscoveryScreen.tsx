import { useState, type ReactNode } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDirectory } from '../community/DirectoryProvider';
import { suggestedTargets } from '../community/data/publicDirectory';
import { followKey } from '../community/types';
import { useTopics } from './TopicProvider';
import { discoveryEntries, discoveryKey, DiscoveryRow } from './DiscoveryRow';
import { useModeration } from '../moderation/ModerationContext';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { ContentStatus } from '../../shared/ui/ContentStatus';

export function DiscoveryScreen({
  filter,
  onBack,
  footer,
}: {
  filter: 'all' | 'publication';
  onBack: () => void;
  footer?: ReactNode;
}) {
  const styles = useThemeStyles(createStyles);
  const directory = useDirectory();
  const topics = useTopics();
  const moderation = useModeration();
  const [limit, setLimit] = useState(5);
  const preferred = new Set(suggestedTargets.map(followKey));
  const entries = discoveryEntries(directory.state.data, topics.state.data)
    .filter(
      ({ target }) =>
        (filter === 'all' || target.kind === filter) &&
        !(target.kind === 'writer' && moderation.state?.value?.blocked.includes(target.id)) &&
        !moderation.state?.value?.muted.some((item) => followKey(item) === followKey(target)),
    )
    .sort((a, b) => Number(preferred.has(discoveryKey(b))) - Number(preferred.has(discoveryKey(a))));
  const loading =
    directory.state.status === 'loading' || (filter === 'all' && topics.state.status === 'loading');
  const error = directory.state.status === 'error' || (filter === 'all' && topics.state.status === 'error');
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.toolbar}>
        <IconButton icon="back" label="Back from recommendations" onPress={onBack} />
        <Text role="heading" style={styles.title}>
          {filter === 'publication' ? 'Recommended publications' : 'Who to follow'}
        </Text>
      </View>
      {loading ? (
        <ContentStatus loading message="Loading recommendations…" />
      ) : error ? (
        <ContentStatus
          error
          message="Couldn’t load recommendations."
          actionLabel="Retry recommendations"
          onAction={() => {
            directory.retry();
            topics.retry();
          }}
        />
      ) : (
        <FlatList
          accessibilityLabel="Discover writers publications and topics"
          data={entries.slice(0, limit)}
          initialNumToRender={8}
          windowSize={5}
          keyExtractor={discoveryKey}
          renderItem={({ item }) => <DiscoveryRow entry={item} />}
          ListEmptyComponent={<ContentStatus message="No recommendations available." />}
          ListFooterComponent={
            limit < entries.length ? (
              <Pressable role="button" style={styles.more} onPress={() => setLimit((value) => value + 10)}>
                <Text style={styles.link}>See more suggestions</Text>
              </Pressable>
            ) : (
              <Text style={styles.end}>You’ve seen all available suggestions.</Text>
            )
          }
        />
      )}
      {footer}
    </SafeAreaView>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    toolbar: {
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    title: {
      flex: 1,
      paddingRight: 12,
      fontFamily: fonts.sans,
      fontSize: 18,
      lineHeight: 24,
      color: colors.text,
    },
    more: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 12 },
    link: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.green },
    end: { padding: 24, fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText },
  });
