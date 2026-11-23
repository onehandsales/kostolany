import { useMemo, useRef } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { useArticleModeration } from '../moderation/articleModeration';
import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { sizes, spacing, typography, fonts, type ThemeColors } from '../../shared/theme/tokens';
import { ContentIllustration } from '../../shared/ui/ContentIllustration';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import { ClapControl, UndoClaps } from '../reactions/ClapControl';
import { ResponseButton } from '../responses/ResponseButton';
import { PassageReader } from '../highlights/PassageReader';
import { articleSelectionDocument } from './articleSelectionDocument';
import { RecordArticleVisit } from '../reading-history/ReadingHistoryProvider';
import { ArticleDisplayControl } from '../settings/ArticleDisplayControl';
import { useReaderTypography } from '../settings/useReaderTypography';
import { ListenControl } from '../listening/ListenControl';
import { ListeningMiniPlayer } from '../listening/ListeningPlayer';
import { previewArticleSource } from './data/articlePreview';
import { ExplanationSection } from './ExplanationSection';
import { ReferenceArticleView } from './ReferenceArticleView';
import type { ExplanationPreference, ExplanationSource } from './explanationTypes';
import type { ArticleDetail, ArticleLoadState, ArticleSource } from './types';
import { useArticle } from './useArticle';
import { useEntryExplanationPreference } from './useEntryExplanationPreference';
import { useShareDialog } from '../sharing/SharingProvider';
import { ShareSheet } from '../sharing/ShareSheet';
import { articleShareTarget } from '../sharing/articleShareTarget';

type ArticleDetailScreenProps = {
  offline?: boolean;
  articleId: string;
  onBack: () => void;
  source?: ArticleSource;
  explanationSource?: ExplanationSource;
  backLabel?: string;
  preference?: ExplanationPreference;
  onSelectArticle?: (articleId: string) => void;
  isFocused?: boolean;
  sessionRevision?: number;
  highlightId?: string;
};

export function ArticleDetailScreen({
  offline = false,
  articleId,
  onBack,
  source = previewArticleSource,
  explanationSource,
  preference,
  backLabel = '홈으로 돌아가기',
  onSelectArticle,
  isFocused = true,
  sessionRevision = 0,
  highlightId,
}: ArticleDetailScreenProps) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const moderation = useArticleModeration();
  const entryPreference = useEntryExplanationPreference(articleId, preference);
  const { state, retry } = useArticle(articleId, source);
  const sharing = useShareDialog(source);
  const access = moderation.state?.readError
    ? 'error'
    : moderation.store && moderation.state?.status === 'loading'
      ? 'loading'
      : moderation.blocked(articleId)
        ? 'blocked'
        : undefined;
  if (state.status === 'ready' && state.article.reference)
    return (
      <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={styles.screen}>
        {offline && <Text accessibilityLiveRegion="polite" style={{ color: colors.secondaryText, padding: 12 }}>Offline · Downloaded copy</Text>}
        <RecordArticleVisit articleId={articleId} active={isFocused && !access} revision={sessionRevision} />
        <ReferenceArticleView
          key={articleId}
          article={state.article}
          active={isFocused && !access}
          access={access}
          onRetryAccess={() => {
            void moderation.store?.reload();
          }}
          highlightId={highlightId}
          onBack={onBack}
          backLabel={backLabel}
          explanationSource={explanationSource}
          preference={entryPreference}
          onSelectArticle={onSelectArticle}
        />
        <ListeningMiniPlayer />
      </SafeAreaView>
    );
  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={styles.screen}>
      {offline && <Text accessibilityLiveRegion="polite" style={{ color: colors.secondaryText, padding: 12 }}>
        {state.status === 'ready' ? 'Offline · Downloaded copy' : state.status === 'error' ?
          '오프라인에서 이용할 수 있는 사본이 없어요. 연결 후 다시 시도해 주세요.' : '오프라인에서 이용할 수 있는 사본을 확인하고 있어요.'}</Text>}
      {state.status === 'ready' && (
        <RecordArticleVisit articleId={articleId} active={isFocused} revision={sessionRevision} />
      )}
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
        <View style={styles.headerSpace} />
        {state.status === 'ready' && (
          <ListenControl article={state.article} disabled={Boolean(access) || !isFocused} />
        )}
        <ArticleDisplayControl />
        {state.status === 'ready' && !access && <Pressable role="button" accessibilityLabel="Share story" style={styles.back}
          onPress={() => sharing.open(articleShareTarget(state.article))}><Text style={{ color: colors.green }}>Share</Text></Pressable>}
      </View>
      {/* 기사가 바뀌면 본문과 스크롤 세션만 새로 시작하고 공유 반응은 유지한다. */}
      <ArticleReader
        key={articleId}
        state={state}
        active={isFocused}
        highlightId={highlightId}
        retry={retry}
        explanationSource={explanationSource}
        preference={entryPreference}
      />
      <ListeningMiniPlayer />
      {sharing.target && <ShareSheet target={sharing.target} onClose={sharing.close} available={isFocused && !access && state.status === 'ready' && state.article.id === sharing.target.id} />}
    </SafeAreaView>
  );
}

type ArticleReaderProps = {
  active?: boolean;
  highlightId?: string;
  state: ArticleLoadState;
  retry: () => void;
  explanationSource?: ExplanationSource;
  preference?: ExplanationPreference;
};

function ArticleReader({
  state,
  retry,
  explanationSource,
  preference,
  active,
  highlightId,
}: ArticleReaderProps) {
  const styles = useThemeStyles(createStyles);
  const scroll = useRef<ScrollView>(null);
  return (
    <View style={styles.reader}>
      <ScrollView
        ref={scroll}
        accessibilityLabel="기사 본문"
        style={styles.scroll}
        contentContainerStyle={styles.content}
      >
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
            active={active}
            highlightId={highlightId}
            onReveal={(y) => scroll.current?.scrollTo({ y, animated: false })}
            explanationSource={explanationSource}
            preference={preference}
          />
        )}
      </ScrollView>
      {state.status === 'ready' && (
        <View style={styles.reactionBar}>
          <View style={styles.reactionContent}>
            <View style={styles.like}>
              <ClapControl target={{ kind: 'article', id: state.article.id }} title={state.article.title} />
              <ResponseButton
                active={active}
                target={{ kind: 'article', id: state.article.id }}
                title={state.article.title}
                label="Responses"
              />
              <UndoClaps target={{ kind: 'article', id: state.article.id }} onDone={() => {}} />
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
  active?: boolean;
  highlightId?: string;
  onReveal?: (y: number) => void;
  article: ArticleDetail;
  explanationSource?: ExplanationSource;
  preference?: ExplanationPreference;
};

function ArticleBody({
  article,
  explanationSource,
  preference,
  active,
  highlightId,
  onReveal,
}: ArticleBodyProps) {
  const document = useMemo(() => articleSelectionDocument(article), [article]);
  const bodyTop = useRef(0);
  const positions = useRef(new Map<number, number>());
  const reader = useReaderTypography();
  const styles = useThemeStyles(createStyles);
  return (
    <View style={styles.article}>
      <View style={styles.intro}>
        <Text style={styles.exampleBadge}>예시 콘텐츠 · 실제 보도 아님</Text>
        <Text role="heading" style={[styles.title, reader.title]}>
          {article.title}
        </Text>
        <Text style={[styles.subtitle, reader.subtitle]}>{article.subtitle}</Text>
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
        <View
          onLayout={(event) => {
            bodyTop.current = event.nativeEvent.layout.y;
          }}
        >
          <PassageReader
              memberOnly={article.reference?.memberOnly}
            document={document}
            active={active}
            highlightId={highlightId}
            onRevealBlock={(index) => onReveal?.(bodyTop.current + (positions.current.get(index) ?? 0))}
          >
            {(renderText) =>
              article.facts.map((_paragraph, index) => (
                <View
                  key={index}
                  onLayout={(event) => {
                    positions.current.set(index, event.nativeEvent.layout.y);
                  }}
                >
                  {renderText(index, [styles.paragraph, reader.body])}
                </View>
              ))
            }
          </PassageReader>
        </View>
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

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    headerSpace: { flex: 1 },
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
    content: {
      flexGrow: 1,
      paddingHorizontal: spacing.page,
      paddingVertical: spacing.section,
    },
    article: {
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      gap: spacing.section,
    },
    intro: { gap: spacing.page },
    exampleBadge: { ...typography.caption, color: colors.secondaryText },
    title: {
      fontFamily: fonts.sans,
      fontSize: 32,
      lineHeight: 42,
      fontWeight: '700',
      color: colors.text,
    },
    subtitle: {
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 30,
      color: colors.secondaryText,
    },
    metadata: { ...typography.caption, color: colors.secondaryText },
    source: { ...typography.body, color: colors.text },
    figure: { gap: spacing.small },
    image: { width: '100%', aspectRatio: 80 / 64 },
    caption: {
      ...typography.caption,
      color: colors.secondaryText,
      textAlign: 'center',
    },
    section: { gap: spacing.page },
    sectionTitle: { ...typography.sectionTitle, color: colors.text },
    note: { ...typography.caption, color: colors.secondaryText },
    paragraph: {
      fontFamily: fonts.sans,
      fontSize: 18,
      lineHeight: 31,
      color: colors.text,
    },
  });
