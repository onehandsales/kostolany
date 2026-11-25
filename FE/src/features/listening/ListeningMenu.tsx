import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon, type AppIconName } from '../../shared/ui/AppIcon';
import { useModeration } from '../moderation/ModerationContext';
import { articleReportTarget } from '../moderation/articleModeration';
import { useRecommendations } from '../recommendations/RecommendationProvider';
import { articleWriter } from '../community/data/publicDirectory';
import { useListening } from './ListeningProvider';

type ListeningMenuProps = {
  onVoice: () => void;
  onOutput: () => void;
  onViewStory: (articleId: string) => void;
};
export function ListeningMenu({ onVoice, onOutput, onViewStory }: ListeningMenuProps) {
  const { store, snapshot } = useListening();
  const styles = useThemeStyles(createStyles);
  const moderation = useModeration();
  const recommendations = useRecommendations();
  const first = useRef<View | null>(null);
  useEffect(() => {
    first.current?.focus();
  }, []);
  if (!snapshot.story) return null;
  const story = snapshot.story;
  const writer = articleWriter(story.articleId) ?? (story.authorId ? { kind: 'writer' as const, id: story.authorId } : undefined);
  const muted =
    writer &&
    moderation.state?.value?.muted.some((value) => value.kind === writer.kind && value.id === writer.id);
  function handOff(action: () => void) {
    store?.setExpanded(false);
    // 현재 모달을 닫은 뒤에도 같은 재생 수명일 때만 기존 기능의 모달을 연다.
    requestAnimationFrame(() => {
      if (store?.getSnapshot().story?.articleId === story.articleId) action();
    });
  }
  const rows: { label: string; icon?: AppIconName; action: () => void; group?: boolean }[] = [
    { label: 'AirPlay...', icon: 'airplay', action: onOutput },
    { label: 'Select a voice...', icon: 'voice', action: onVoice, group: true },
    {
      label: 'View story',
      icon: 'document',
      action: () => {
        store?.setExpanded(false);
        onViewStory(story.articleId);
      },
    },
    {
      label: 'Show less like this',
      icon: 'minus',
      action: () => handOff(() => recommendations.showLess(story.articleId, story.title)),
      group: true,
    },
    ...(writer
      ? [
          {
            label: muted ? 'Unmute author' : 'Mute author',
            action: () =>
              handOff(() =>
                moderation.open({
                  kind: 'confirm',
                  action: { kind: 'mute', target: writer, active: !muted },
                  title: muted ? 'Unmute author' : 'Mute author',
                  description: 'Following and saved stories stay unchanged.',
                  success: muted ? 'Author unmuted' : 'Author muted',
                }),
              ),
          },
        ]
      : []),
    {
      label: 'Report story...',
      action: () =>
        handOff(() =>
          moderation.open({
            kind: 'report',
            target: { ...articleReportTarget(story.articleId), ...(story.authorId ? { writerId: story.authorId } : {}) },
            title: story.title,
          }),
        ),
    },
  ];
  return (
    <ScrollView style={styles.menu} keyboardShouldPersistTaps="handled">
      {rows.map((row, index) => (
        <View key={row.label} style={row.group && styles.group}>
          <Pressable
            ref={index === 0 ? first : undefined}
            role="button"
            accessibilityLabel={row.label}
            onPress={row.action}
            style={styles.row}
          >
            <Text style={styles.text}>{row.label}</Text>
            {row.icon && <AppIcon name={row.icon} size={22} color={styles.text.color} />}
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    menu: {
      position: 'absolute',
      right: 28,
      bottom: 82,
      width: 250,
      maxHeight: '85%',
      borderRadius: 14,
      backgroundColor: colors.popup,
      boxShadow: '0px 8px 40px rgba(0,0,0,0.2)',
    },
    row: {
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    group: { borderBottomWidth: 8, borderColor: colors.border },
    text: { flex: 1, fontFamily: fonts.sans, fontSize: 17, color: colors.text },
  });
