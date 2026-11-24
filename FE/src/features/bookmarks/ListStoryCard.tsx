import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { useModeration } from '../moderation/ModerationContext';
import { articleReportTarget, useArticleModeration } from '../moderation/articleModeration';
import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { AppIcon } from '../../shared/ui/AppIcon';
import type { FeedArticle } from '../feed/types';
import { SearchByline } from '../search/SearchCard';
import { ArticleBookmarkControl } from './ArticleBookmarkControl';
import { useHasViewed } from '../reading-history/ReadingHistoryProvider';
import { DownloadArticleStatus } from '../downloads/DownloadControl';

type ListStoryCardProps = {
  active?: boolean;
  listId?: string;
  article: FeedArticle;
  onOpen: (id: string) => void;
  onRemove: () => void;
  onNotice: (label: string) => void;
  note?: string;
  onEditNote?: () => void;
};

export function ListStoryCard({ active = true, article, onOpen, onRemove, onNotice, note, onEditNote, listId }: ListStoryCardProps) {
  const moderation = useModeration();
  const articleModeration = useArticleModeration();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const { width, fontScale } = useWindowDimensions();
  const viewed = useHasViewed(article.id);
  if (articleModeration.blocked(article.id))
    return (
      <View style={styles.card}>
        <Text style={styles.note}>Story from a blocked author</Text>
        <Pressable
          role="button"
          accessibilityLabel={`이 목록에서 제거, ${article.title}`}
          style={{ minHeight: 48, justifyContent: 'center' }}
          onPress={onRemove}
        >
          <Text style={styles.metadata}>Remove from list</Text>
        </Pressable>
      </View>
    );
  return (
    <View style={styles.card}>
      <Pressable
        role="button"
        accessibilityLabel={`${note ? 'Edit note' : 'Add a note'}, ${article.title}`}
        onPress={onEditNote ?? (() => onNotice('Add a note'))}
        style={styles.noteTarget}
      >
        <Text style={[styles.note, Boolean(note) && { borderLeftColor: colors.text }]}>{note || 'Add a note...'}</Text>
      </Pressable>
      <Pressable
        role="button"
        accessibilityLabel={`${article.title}, ${article.sourceName}, ${article.publishedLabel}`}
        onPress={() => onOpen(article.id)}
      >
        <SearchByline userId={article.publishedStory?.ownerId} name={article.sourceName} avatar={article.reference?.avatar} />
        <View style={[styles.headline, (width < 340 || fontScale > 1.3) && styles.stack]}>
          <Text style={[styles.title, viewed && { color: colors.secondaryText }]}>{article.title}</Text>
          {article.reference?.image && (
            <Image source={article.reference.image} style={styles.image} accessible={false} />
          )}
        </View>
      </Pressable>
      <View style={styles.actions}>
        {listId ? <DownloadArticleStatus listId={listId} articleId={article.id} title={article.title} /> : <AppIcon name="download" size={16} color={colors.secondaryText} />}
        <Text style={styles.metadata}>
          {article.reference?.memberOnly === true && <Text accessibilityLabel={`회원용 기사, ${article.title}`}>
            <AppIcon name="star" color={colors.gold} size={16} />{' · '}
          </Text>}
          {article.readingMinutes > 0 ? `${article.readingMinutes} min read  ·  ` : ''}
          {article.publishedLabel}
          {viewed ? ' · Viewed' : ''}
        </Text>
        <ArticleBookmarkControl active={active} articleId={article.id} articleTitle={article.title} compact />
        <ActionMenu key={String(active)}
          label={`기사 관리, ${article.title}`}
          items={[
            { label: note ? 'Edit note' : 'Add note', onPress: onEditNote ?? (() => onNotice('Add a note')) },
            {
              label: 'Remove from list',
              accessibilityLabel: `이 목록에서 제거, ${article.title}`,
              onPress: onRemove,
            },
            {
              label: 'Report this item',
              onPress: () =>
                moderation.open({
                  kind: 'report',
                  target: article.publishedStory ? { kind: 'article', id: article.id, writerId: article.publishedStory.ownerId } : articleReportTarget(article.id),
                  title: article.title,
                }),
            },
          ]}
        />
      </View>
    </View>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      paddingHorizontal: 24,
      paddingBottom: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    noteTarget: { minHeight: 64, justifyContent: 'center' },
    note: {
      paddingLeft: 12,
      borderLeftWidth: 3,
      borderLeftColor: colors.border,
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      fontStyle: 'italic',
      color: colors.secondaryText,
    },
    headline: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 24,
      marginTop: 12,
      minHeight: 56,
    },
    stack: { flexDirection: 'column' },
    title: {
      flex: 1,
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: '700',
      color: colors.text,
    },
    image: { width: 80, height: 56, borderRadius: 2 },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 8,
    },
    metadata: {
      flex: 1,
      fontFamily: fonts.sans,
      fontSize: 12,
      lineHeight: 18,
      color: colors.secondaryText,
    },
  });
