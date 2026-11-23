import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';

import { useRecommendedArticles } from '../recommendations/useRecommendedArticles';
import { articleReportTarget } from '../moderation/articleModeration';
import { ResponsePreview } from '../responses/ResponsePreview';
import { ResponseButton } from '../responses/ResponseButton';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import { ClapControl } from '../reactions/ClapControl';

type ReferenceArticleFooterProps = {
  articleId: string;
  active?: boolean;
  onNotice: (title: string) => void;
  onSelectArticle?: (articleId: string) => void;
};

export function ReferenceArticleFooter({
  articleId,
  active = true,
  onNotice,
  onSelectArticle,
}: ReferenceArticleFooterProps) {
  const moderation = useRecommendedArticles();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  return (
    <>
      <ResponsePreview target={{ kind: 'article', id: articleId }} active={active} />
      <View style={styles.more}>
        <Text role="heading" style={styles.heading}>
          More from Jordan Gibbs
        </Text>
        {[
          {
            id: 'medium-prompt-bible',
            title: 'Behold...The Prompt Bible is Here',
            image: require('../../../assets/medium/prompt-bible.png'),
            subtitle: 'The Most Useful Tips from Google’s Epic 70-Page AI Prompt Engineering Guide',
          },
          {
            id: 'medium-gemini',
            title: 'ChatGPT Users...Should You Make the Switch to Gemini?',
            image: require('../../../assets/medium/gemini.png'),
            subtitle: '',
          },
        ]
          .filter((story) => !moderation.excluded(story.id))
          .map((story, index) => (
            <View key={story.title} style={styles.story}>
              <Pressable
                role="button"
                accessibilityLabel={story.title}
                onPress={() => onSelectArticle?.(story.id)}
              >
                <Image
                  source={story.image}
                  style={[styles.cover, { height: Math.min(width - 48, 680) / 2 }]}
                  accessible={false}
                />
                <View style={styles.storyByline}>
                  <Image
                    source={require('../../../assets/medium/jordan.png')}
                    style={styles.smallAvatar}
                    accessible={false}
                  />
                  <Text style={styles.text}>Jordan Gibbs</Text>
                </View>
                <Text style={styles.heading}>{story.title}</Text>
                {Boolean(story.subtitle) && <Text style={styles.subtitle}>{story.subtitle}</Text>}
              </Pressable>
              {index === 0 && (
                <View style={styles.actions}>
                  <AppIcon name="star" color={colors.gold} size={20} />
                  <Text style={styles.muted}>May 24</Text>
                  <ClapControl target={{ kind: 'article', id: story.id }} title={story.title} />
                  <ResponseButton target={{ kind: 'article', id: story.id }} title={story.title} active={active} />
                  <ArticleBookmarkControl articleId={story.id} articleTitle={story.title} compact />
                  <IconButton
                    icon="more"
                    label="Recommended story options"
                    onPress={() =>
                      moderation.open({
                        kind: 'report',
                        target: articleReportTarget(story.id),
                        title: story.title,
                      })
                    }
                  />
                </View>
              )}
            </View>
          ))}
      </View>
    </>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    responses: { marginTop: 48 },
    heading: {
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 26,
      fontWeight: '700',
      color: colors.text,
    },
    text: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
    responseText: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 18,
      color: colors.text,
    },
    muted: {
      fontFamily: fonts.sans,
      fontSize: 12,
      lineHeight: 18,
      color: colors.secondaryText,
    },
    composer: { marginLeft: 44, marginTop: 32, marginBottom: 32, gap: 0 },
    inputTarget: { minHeight: 48, justifyContent: 'center' },
    input: {
      minHeight: 36,
      justifyContent: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: colors.input,
      borderRadius: 4,
    },
    response: {
      paddingVertical: 18,
      gap: 12,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    byline: { flexDirection: 'row', gap: 8, alignItems: 'center' },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.avatar,
    },
    flex: { flex: 1 },
    actions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 8,
    },
    target: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      minHeight: 48,
      minWidth: 48,
    },
    reply: {
      fontFamily: fonts.sans,
      fontSize: 14,
      color: colors.text,
      textDecorationLine: 'underline',
    },
    green: { fontFamily: fonts.sans, fontSize: 16, color: colors.green },
    all: {
      minHeight: 48,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 32,
      borderWidth: 1,
      borderColor: colors.text,
      marginTop: 24,
    },
    more: {
      marginHorizontal: -24,
      padding: 24,
      paddingTop: 32,
      backgroundColor: colors.surface,
      marginTop: 48,
    },
    story: { marginTop: 40 },
    cover: { width: '100%', aspectRatio: 2, borderRadius: 2 },
    storyByline: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginVertical: 24,
    },
    smallAvatar: { width: 20, height: 20, borderRadius: 10 },
    subtitle: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 21,
      color: colors.secondaryText,
      marginTop: 12,
      marginBottom: 16,
    },
  });
