import { Keyboard, Pressable, StyleSheet, Text } from 'react-native';
import type { PublishedStory } from './publishing';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { useKnownProfile } from '../profile/ProfileProvider';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';

export function PublishedStoryRow({ story }: { story: PublishedStory }) {
  const navigation = useCommunityNavigation();
  const known = useKnownProfile(story.userId);
  const styles = useThemeStyles(createStyles);
  return (
    <Pressable
      role="button"
      accessibilityLabel={`Open published story ${story.document.title}`}
      style={styles.row}
      onPress={() => {
        Keyboard.dismiss();
        navigation.openWrittenStory?.(story.id);
      }}
    >
      <Text style={styles.author}>{known?.name ?? story.authorName}</Text>
      <Text style={styles.title}>{story.document.title}</Text>
      <Text style={styles.author} numberOfLines={2}>
        {story.document.body.replaceAll('\uFFFC', '')}
      </Text>
    </Pressable>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      minHeight: 48,
      padding: 24,
      gap: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    author: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.secondaryText },
    title: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 26, fontWeight: '700', color: colors.text },
  });
