import { Image, Keyboard, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { FollowControl } from '../community/FollowControl';
import { followKey, type PublicDirectory, type RelationshipTarget } from '../community/types';
import type { TopicCatalog } from './types';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ProfileAvatar } from '../profile/ProfileAvatar';

export type DiscoveryEntry = {
  target: RelationshipTarget;
  name: string;
  bio?: string;
  meta?: string;
  avatar?: ImageSourcePropType;
  verified?: boolean;
};
export function discoveryEntries(
  directory: PublicDirectory | null,
  catalog: TopicCatalog | null,
): DiscoveryEntry[] {
  return [
    ...(directory?.identities.map((item) => ({
      target: { kind: item.kind, id: item.id },
      name: item.name,
      bio: item.bio,
      meta: item.followers,
      avatar: item.avatar,
      verified: item.verified,
    })) ?? []),
    ...(catalog?.topics.map(
      (item): DiscoveryEntry => ({
        target: { kind: 'topic', id: item.id },
        name: item.name,
        meta: [
          item.storyCount && `${item.storyCount} stories`,
          item.followers && `${item.followers} followers`,
        ]
          .filter(Boolean)
          .join('  ·  '),
      }),
    ) ?? []),
  ];
}
export function DiscoveryRow({ entry, label, active = true }: { entry: DiscoveryEntry; label?: string; active?: boolean }) {
  const styles = useThemeStyles(createStyles);
  const navigation = useCommunityNavigation();
  return (
    <View style={styles.row}>
      <Pressable
        role="button"
        accessibilityLabel={label ?? `Discover ${entry.name}`}
        style={styles.identity}
        onPress={() => {
          Keyboard.dismiss();
          if (entry.target.kind === 'topic') navigation.openTopic(entry.target.id);
          else navigation.openIdentity(entry.target);
        }}
      >
        {entry.target.kind === 'writer' ? <ProfileAvatar userId={entry.target.id} fallback={entry.avatar} size={40} /> : entry.avatar && (
          <Image
            source={entry.avatar}
            accessible={false}
            style={[styles.avatar, entry.target.kind === 'publication' && styles.square]}
          />
        )}
        <View style={styles.grow}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{entry.name}</Text>
            {entry.verified && <AppIcon name="verified" size={14} />}
          </View>
          {Boolean(entry.meta) && <Text style={styles.meta}>{entry.meta}</Text>}
          {Boolean(entry.bio) && (
            <Text style={styles.meta} numberOfLines={3}>
              {entry.bio}
            </Text>
          )}
        </View>
      </Pressable>
      <FollowControl active={active} target={entry.target} name={entry.name} />
    </View>
  );
}
export const discoveryKey = (entry: DiscoveryEntry) => followKey(entry.target);
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 16,
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    identity: { minHeight: 48, flex: 1, flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    square: { borderRadius: 2 },
    grow: { flex: 1, gap: 4 },
    nameRow: { flexDirection: 'row', gap: 4, alignItems: 'center' },
    name: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 22,
      color: colors.text,
      fontWeight: '600',
      flexShrink: 1,
    },
    meta: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText },
  });
