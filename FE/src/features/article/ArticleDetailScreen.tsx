import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { colors, sizes, spacing, typography, fonts } from '../../shared/theme/tokens';
import { ContentIllustration } from '../../shared/ui/ContentIllustration';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import { ArticleLikeControl } from '../likes/ArticleLikeControl';
import { previewArticleSource } from './data/articlePreview';
import { ExplanationSection } from './ExplanationSection';
import { ReferenceArticleView } from './ReferenceArticleView';
import type { ExplanationPreference, ExplanationSource } from './explanationTypes';
import type { ArticleDetail, ArticleLoadState, ArticleSource } from './types';
import { useArticle } from './useArticle';
import { useEntryExplanationPreference } from './useEntryExplanationPreference';

type ArticleDetailScreenProps = {
  articleId: string;
  onBack: () => void;
  source?: ArticleSource;
  explanationSource?: ExplanationSource;
  backLabel?: string;
  preference?: ExplanationPreference;
};

export function ArticleDetailScreen({
  articleId,
  onBack,
  source = previewArticleSource,
  explanationSource,
  preference,
  backLabel = '홈으로 돌아가기',
}: ArticleDetailScreenProps) {
  const entryPreference = useEntryExplanationPreference(articleId, preference);
  const { state, retry } = useArticle(articleId, source);
  if (state.status === 'ready' && state.article.reference)
    return (
      <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={styles.screen}>
        <ReferenceArticleView
          key={articleId}
          article={state.article}
          onBack={onBack}
          backLabel={backLabel}
          explanationSource={explanationSource}
          preference={entryPreference}
        />
      </SafeAreaView>
    );
  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          role="button"
          accessibilityLabel={backLabel}
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}
        >
          <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            aria-hidden
            accessible={Platform.OS === 'web' ? undefined : false}
          >
            <Path d="M15 4 7 12 15 20" fill="none" stroke={colors.secondaryText} strokeWidth={2} />
          </Svg>
        </Pressable>
      </View>
      {/* 기사가 바뀌면 본문과 스크롤 세션만 새로 시작하고 공유 반응은 유지한다. */}
      <ArticleReader
        key={articleId}
        state={state}
        retry={retry}
        explanationSource={explanationSource}
        preference={entryPreference}
      />
    </SafeAreaView>
  );
}

type ArticleReaderProps = {
  state: ArticleLoadState;
  retry: () => void;
  explanationSource?: ExplanationSource;
  preference?: ExplanationPreference;
};

function ArticleReader({ state, retry, explanationSource, preference }: ArticleReaderProps) {
  return (
    <View style={styles.reader}>
      <ScrollView accessibilityLabel="기사 본문" style={styles.scroll} contentContainerStyle={styles.content}>
        {state.status === 'loading' && <ContentStatus message="기사 내용을 불러오고 있어요" loading />}
        {state.status === 'error' && (
          <ContentStatus
            message="기사 내용을 불러오지 못했어요"
            error
            actionLabel="다시 시도"
            onAction={retry}
          />
        )}
        {state.status === 'ready' && (
          <ArticleBody
            article={state.article}
            explanationSource={explanationSource}
            preference={preference}
          />
        )}
      </ScrollView>
      {state.status === 'ready' && (
        <View style={styles.reactionBar}>
          <View style={styles.reactionContent}>
            <View style={styles.like}>
              <ArticleLikeControl articleId={state.article.id} articleTitle={state.article.title} />
            </View>
            <View style={styles.bookmark}>
              <ArticleBookmarkControl articleId={state.article.id} articleTitle={state.article.title} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

type ArticleBodyProps = {
  article: ArticleDetail;
  explanationSource?: ExplanationSource;
  preference?: ExplanationPreference;
};

function ArticleBody({ article, explanationSource, preference }: ArticleBodyProps) {
  return (
    <View style={styles.article}>
      <View style={styles.intro}>
        <Text style={styles.exampleBadge}>예시 콘텐츠 · 실제 보도 아님</Text>
        <Text role="heading" style={styles.title}>
          {article.title}
        </Text>
        <Text style={styles.subtitle}>{article.subtitle}</Text>
        <Text style={styles.metadata}>
          {article.readingMinutes > 0 ? `${article.readingMinutes}분 읽기 · ` : ''}
          {article.publishedLabel}
        </Text>
        <Text style={styles.source}>출처 · {article.sourceName}</Text>
      </View>
      {article.image !== null && (
        <View style={styles.figure}>
          <View accessible role="img" accessibilityLabel={article.image.description} style={styles.image}>
            <ContentIllustration variant={article.image.variant} width="100%" height="100%" />
          </View>
          <Text style={styles.caption}>{article.image.caption}</Text>
        </View>
      )}
      <View style={styles.section}>
        <Text role="heading" style={styles.sectionTitle}>
          사실 요약
        </Text>
        <Text style={styles.note}>아래 내용은 읽기 화면을 위한 가상 상황입니다.</Text>
        {article.facts.map((paragraph, index) => (
          <Text selectable key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </View>
      <ExplanationSection
        key={article.id}
        articleId={article.id}
        source={explanationSource}
        preference={preference}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: 4,
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  back: {
    width: sizes.minimumTouchTarget,
    minHeight: sizes.minimumTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },
  scroll: { flex: 1 },
  reader: { flex: 1 },
  reactionBar: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.page,
    paddingVertical: 4,
  },
  reactionContent: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  like: { flex: 1 },
  bookmark: { maxWidth: '48%' },
  content: { flexGrow: 1, paddingHorizontal: spacing.page, paddingVertical: spacing.section },
  article: { width: '100%', maxWidth: 680, alignSelf: 'center', gap: spacing.section },
  intro: { gap: spacing.page },
  exampleBadge: { ...typography.caption, color: colors.secondaryText },
  title: { fontFamily: fonts.sans, fontSize: 32, lineHeight: 42, fontWeight: '700', color: colors.text },
  subtitle: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 30, color: colors.secondaryText },
  metadata: { ...typography.caption, color: colors.secondaryText },
  source: { ...typography.body, color: colors.text },
  figure: { gap: spacing.small },
  image: { width: '100%', aspectRatio: 80 / 64 },
  caption: { ...typography.caption, color: colors.secondaryText, textAlign: 'center' },
  section: { gap: spacing.page },
  sectionTitle: { ...typography.sectionTitle, color: colors.text },
  note: { ...typography.caption, color: colors.secondaryText },
  paragraph: { fontFamily: fonts.sans, fontSize: 18, lineHeight: 31, color: colors.text },
});
