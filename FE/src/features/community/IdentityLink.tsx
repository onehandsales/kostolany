import { Image, Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';
import { useCommunityNavigation } from './CommunityNavigation';
import { publicIdentity, articleWriter, articlePublication } from './data/publicDirectory';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import type { FollowTarget } from './types';

export function IdentityLink({
  target,
  children,
  style,
  avatar = false,
}: {
  target: FollowTarget;
  children?: string;
  style?: StyleProp<TextStyle>;
  avatar?: boolean;
}) {
  const navigation = useCommunityNavigation();
  const identity = publicIdentity(target);
  const styles = useThemeStyles(createStyles);
  return (
    <Pressable
      role="button"
      accessibilityLabel={`Open ${identity?.name ?? children ?? target.id} ${target.kind === 'writer' ? 'profile' : 'publication'}`}
      onPress={() => navigation.openIdentity(target)}
      style={styles.target}
    >
      {avatar && identity?.avatar && (
        <Image
          source={identity.avatar}
          style={[styles.avatar, target.kind === 'publication' && styles.publication]}
          accessible={false}
        />
      )}
      <Text style={[styles.label, style]}>{children ?? identity?.name ?? target.id}</Text>
    </Pressable>
  );
}
export function ArticleByline({ articleId, fallback }: { articleId: string; fallback: string }) {
  const writer = articleWriter(articleId);
  const publication = articlePublication(articleId);
  const styles = useThemeStyles(createStyles);
  if (!writer) return <Text style={styles.label}>{fallback}</Text>;
  return (
    <View style={styles.row}>
      {publication && (
        <>
          <IdentityLink target={publication} avatar>
            {`In ${publicIdentity(publication)?.name ?? publication.id}`}
          </IdentityLink>
          <Text style={styles.label}>by</Text>
        </>
      )}
      <IdentityLink target={writer} avatar={!publication} />
    </View>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', columnGap: 4, marginVertical: -14 },
    target: {
      minHeight: 48,
      minWidth: 48,
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    label: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.text, flexShrink: 1 },
    avatar: { width: 20, height: 20, borderRadius: 10 },
    publication: { borderRadius: 2 },
  });
