import { useTopics } from '../topics/TopicProvider';
import { discoveryEntries, discoveryKey, DiscoveryRow } from '../topics/DiscoveryRow';
import type { ReactNode } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDirectory } from './DirectoryProvider';
import { useRelationships } from './RelationshipProvider';
import { useCommunityNavigation } from './CommunityNavigation';
import { FollowControl } from './FollowControl';
import { followKey, type FollowTarget } from './types';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { AppIcon } from '../../shared/ui/AppIcon';

export function ConnectionsScreen({
  owner,
  section,
  permitted = true,
  onBack,
  footer,
}: {
  owner: FollowTarget | null;
  section: 'following' | 'followers';
  permitted?: boolean;
  onBack: () => void;
  footer?: ReactNode;
}) {
  const styles = useThemeStyles(createStyles);
  const topics = useTopics();
  const directory = useDirectory();
  const { state, store } = useRelationships();
  const navigation = useCommunityNavigation();
  const targets =
    !permitted || section === 'followers'
      ? []
      : owner
        ? (directory.state.data?.following[followKey(owner)] ?? [])
        : (state?.relationships.filter((item) => item.following).map((item) => item.target) ?? []);
  const keys = new Set(targets.map(followKey));
  const ownRows = discoveryEntries(directory.state.data, topics.state.data).filter((entry) =>
    keys.has(discoveryKey(entry)),
  );
  const people = directory.state.data?.identities.filter((item) => keys.has(followKey(item))) ?? [];
  const loading =
    directory.state.status === 'loading' ||
    (!owner && (state?.status === 'loading' || topics.state.status === 'loading'));
  const error =
    directory.state.status === 'error' || (!owner && (state?.readError || topics.state.status === 'error'));
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.toolbar}>
        <IconButton icon="back" label="Back from connections" onPress={onBack} />
        <Text role="heading" style={styles.title}>
          {owner ? '' : section === 'following' ? 'Following' : 'Followers'}
        </Text>
      </View>
      {!permitted ? (
        <Text style={styles.status}>
          This private session ended. Open your current profile to view its connections.
        </Text>
      ) : loading ? (
        <View style={styles.status}>
          <ActivityIndicator />
          <Text style={styles.secondary}>Loading connections…</Text>
        </View>
      ) : error ? (
        <Pressable
          role="button"
          accessibilityLabel="Retry connections"
          style={styles.status}
          onPress={() => {
            directory.retry();
            topics.retry();
            void store?.reload();
          }}
        >
          <Text role="alert" style={styles.secondary}>
            Couldn’t load connections. Retry
          </Text>
        </Pressable>
      ) : !owner ? (
        <FlatList
          accessibilityLabel="Following writers publications and topics"
          data={ownRows}
          initialNumToRender={8}
          windowSize={5}
          keyExtractor={discoveryKey}
          renderItem={({ item }) => <DiscoveryRow entry={item} />}
          ListEmptyComponent={
            <Text style={styles.status}>
              {section === 'followers'
                ? 'No followers in this local account.'
                : 'You aren’t following anyone yet.'}
            </Text>
          }
        />
      ) : (
        <FlatList
          accessibilityLabel={`${section} people and publications`}
          data={people}
          keyExtractor={followKey}
          initialNumToRender={8}
          windowSize={5}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable
                role="button"
                accessibilityLabel={`Open ${item.name}`}
                onPress={() => navigation.openIdentity(item)}
                style={styles.identity}
              >
                {item.avatar ? (
                  <Image
                    source={item.avatar}
                    style={[styles.avatar, item.kind === 'publication' && styles.square]}
                    accessible={false}
                  />
                ) : (
                  <View style={[styles.avatar, item.id === 'jo' && styles.joAvatar]}>
                    <Text style={[styles.initial, item.id === 'jo' && styles.joInitial]}>
                      {item.name.slice(0, 2)}
                    </Text>
                  </View>
                )}
                <View style={styles.grow}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.verified && <AppIcon name="verified" size={14} />}
                  </View>
                  {item.bio && (
                    <Text numberOfLines={3} style={styles.secondary}>
                      {item.bio}
                    </Text>
                  )}
                </View>
              </Pressable>
              <FollowControl target={item} name={item.name} />
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.status}>
              {section === 'followers'
                ? owner
                  ? 'Follower identities are not included in the captured reference.'
                  : 'No followers in this local account.'
                : owner
                  ? 'Following identities are not included in the captured reference.'
                  : 'You aren’t following anyone yet.'}
            </Text>
          }
          ListFooterComponent={
            owner && people.length ? (
              <Text style={styles.status}>
                Only the captured entries are available. Their profile association is a local example.
              </Text>
            ) : null
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
    toolbar: { height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
    title: { fontFamily: fonts.sans, fontSize: 18, lineHeight: 24, color: colors.text },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 16,
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    identity: { minHeight: 48, flex: 1, flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.input,
      justifyContent: 'center',
      alignItems: 'center',
    },
    square: { borderRadius: 2 },
    initial: { fontSize: 14, color: colors.text },
    joAvatar: { backgroundColor: '#f33277' },
    joInitial: { color: '#ffffff' },
    grow: { flex: 1, gap: 4 },
    nameRow: { flexDirection: 'row', gap: 4, alignItems: 'center' },
    name: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '600',
      color: colors.text,
      flexShrink: 1,
    },
    secondary: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.secondaryText },
    status: { padding: 24, color: colors.secondaryText, fontSize: 14, lineHeight: 20 },
  });
