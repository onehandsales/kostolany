import { useState, type ReactNode } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { ContentStatus } from '../../shared/ui/ContentStatus';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';

import { bookmarkArticles } from '../bookmarks/data/bookmarkFixtures';
import { useCatalogArticles } from '../feed/ArticleCatalog';
import { useArticleModeration } from '../moderation/articleModeration';
import { ReferenceArticleCard } from '../feed/components/ReferenceArticleCard';
import { LibrarySheet } from '../bookmarks/LibrarySheet';

import { useReadingHistory } from './ReadingHistoryProvider';

export function ReadingHistoryList(props: {
  header?: ReactNode;
  onSelect: (id: string) => void;
  onExplore: () => void;
}) {
  const { scope } = useReadingHistory();
  return <HistoryContent key={scope} {...props} />;
}
function HistoryContent({
  header,
  onSelect,
  onExplore,
}: {
  header?: ReactNode;
  onSelect: (id: string) => void;
  onExplore: () => void;
}) {
  const { store, state, scope } = useReadingHistory();
  const styles = useThemeStyles(createStyles);
  const articles = useCatalogArticles(bookmarkArticles);
  const moderation = useArticleModeration();
  const [deleting, setDeleting] = useState<{ id: string | null; title: string } | null>(null);
  const visits = state?.visits ?? [];
  const ready = state?.status === 'ready';
  const retry = () => store?.retry(scope);
  return (
    <>
      <FlatList
        accessibilityLabel="Reading history stories"
        data={ready ? visits : []}
        keyExtractor={(item) => item.articleId}
        initialNumToRender={5}
        windowSize={5}
        ListHeaderComponent={
          <>
            {header}
            {state?.error && (
              <ContentStatus
                error
                message={
                  state.error === 'read'
                    ? 'Couldn’t load reading history.'
                    : 'History changes aren’t saved yet.'
                }
                actionLabel="Retry reading history"
                onAction={retry}
              />
            )}
            {state?.isSaving && (
              <Text aria-live="polite" style={styles.saving}>
                Saving history changes…
              </Text>
            )}
            {ready && visits.length > 0 && (
              <View style={styles.banner}>
                <Text style={styles.text}>You can clear your reading history for a fresh start.</Text>
                <Pressable
                  role="button"
                  accessibilityLabel="Clear history"
                  onPress={() => setDeleting({ id: null, title: 'Clear reading history?' })}
                  style={styles.target}
                >
                  <View style={styles.clear}>
                    <Text style={styles.clearText}>Clear history</Text>
                  </View>
                </Pressable>
              </View>
            )}
          </>
        }
        renderItem={({ item }) => {
          // 읽은 시각과 발행일은 구분하며 접근할 수 없는 글의 제목은 노출하지 않는다.
          const canRead = !moderation.store || Boolean(moderation.state?.value && !moderation.state.readError);
          if (!canRead) return <ContentStatus loading={!moderation.state?.readError} error={Boolean(moderation.state?.readError)}
            message={moderation.state?.readError ? 'Couldn’t check story access.' : 'Checking story access…'}
            actionLabel={moderation.state?.readError ? 'Retry history access' : undefined}
            onAction={moderation.state?.readError ? () => { void moderation.store?.reload(); } : undefined} />;
          const article = canRead && !moderation.blocked(item.articleId)
            ? articles.find((story) => story.id === item.articleId) : undefined;
          return article ? (
            <ReferenceArticleCard
              article={article}
              variant="search"
              onSelect={onSelect}
              onRemoveHistory={() =>
                setDeleting({ id: article.id, title: `Remove ${article.title} from history?` })
              }
            />
          ) : (
            <View style={styles.banner}>
              <Text style={styles.text}>Story unavailable</Text>
              <Pressable
                role="button"
                accessibilityLabel={`Remove unavailable story ${item.articleId} from history`}
                style={styles.target}
                onPress={() => setDeleting({ id: item.articleId, title: 'Remove unavailable story?' })}
              >
                <Text style={styles.text}>Remove from history</Text>
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={
          state?.status === 'loading' ? (
            <ContentStatus loading message="Loading reading history…" />
          ) : ready || !store ? (
            <View style={[styles.banner, styles.empty]}>
              <Text style={styles.bold}>You haven’t read any stories yet</Text>
              <Text style={[styles.text, styles.center]}>Stories you’ve read on Medium will appear here</Text>
              <Pressable role="button" onPress={onExplore} style={[styles.target, { alignSelf: 'center' }]}>
                <View style={styles.explore}>
                  <Text style={styles.text}>Explore</Text>
                </View>
              </Pressable>
            </View>
          ) : null
        }
      />
      {deleting && (
        <LibrarySheet
          title={deleting.title}
          closeLabel="Close history confirmation"
          closeText="Cancel"
          onClose={() => setDeleting(null)}
        >
          <Text style={[styles.text, styles.message]}>
            This removes reading history and Viewed status. Saved stories, claps and highlights stay.
          </Text>
          <Pressable
            role="button"
            accessibilityLabel="Confirm history removal"
            style={styles.confirm}
            onPress={() => {
              if (deleting.id === null) store?.clear(scope);
              else store?.remove(deleting.id, scope);
              setDeleting(null);
            }}
          >
            <Text style={styles.destructive}>Remove</Text>
          </Pressable>
          <Pressable
            role="button"
            accessibilityLabel="Cancel history removal"
            style={styles.confirm}
            onPress={() => setDeleting(null)}
          >
            <Text style={styles.text}>Cancel</Text>
          </Pressable>
        </LibrarySheet>
      )}
    </>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    banner: { margin: 24, marginBottom: 0, padding: 24, gap: 8, backgroundColor: colors.surface },
    text: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
    bold: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '600', color: colors.text },
    empty: { alignItems: 'center', paddingTop: 32, paddingBottom: 24, borderRadius: 4 },
    center: { textAlign: 'center' },
    target: { minHeight: 48, alignSelf: 'flex-start', justifyContent: 'center' },
    clear: {
      minHeight: 38,
      justifyContent: 'center',
      paddingHorizontal: 16,
      backgroundColor: colors.destructive,
      borderRadius: 24,
    },
    clearText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.onAccent },
    explore: {
      minHeight: 38,
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 24,
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    message: { padding: 24 },
    confirm: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 24 },
    destructive: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.destructive },
    saving: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
      padding: 12,
    },
  });
