import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { IconButton } from '../../shared/ui/IconButton';
import { TopPopover } from '../../shared/ui/TopPopover';
import { useReturnFocus } from '../../shared/ui/useReturnFocus';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import { FollowControl } from '../community/FollowControl';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { mediumPolicyArticle, policyArticleDetail, policyParagraphs } from '../feed/data/mediumPolicyArticle';
import { ListenControl } from '../listening/ListenControl';
import { ListeningMiniPlayer } from '../listening/ListeningPlayer';
import { useArticleModeration } from '../moderation/articleModeration';
import { ClapControl } from '../reactions/ClapControl';
import { ArticleDisplayPopover } from '../settings/ArticleDisplayPopover';
import { ReaderTheme } from '../settings/DisplaySettingsProvider';
import { useReaderTypography } from '../settings/useReaderTypography';
import { articleShareTarget } from '../sharing/articleShareTarget';
import { ShareSheet } from '../sharing/ShareSheet';
import { useShareDialog } from '../sharing/SharingProvider';
import { ResponsePolicyLink } from './ResponsePolicyLink';
import { useResponseCount } from './ResponseProvider';
import { useAuth } from '../auth/AuthProvider';
import { RecordArticleVisit } from '../reading-history/ReadingHistoryProvider';

export const policyResponseTarget = { kind: 'article', id: mediumPolicyArticle.id } as const;
const policyAuthor = { kind: 'writer', id: 'medium-policy-author' } as const;
type PolicyArticleProps = {
  onBack: () => void;
  active?: boolean;
  onResponses: () => void;
  onLeave?: () => void;
  backLabel?: string;
};

export function PolicyArticle(props: PolicyArticleProps) {
  return <ReaderTheme><PolicyArticleAccess {...props} /></ReaderTheme>;
}

function PolicyArticleAccess(props: PolicyArticleProps) {
  const moderation = useArticleModeration();
  const { colors } = useTheme();
  const access = moderation.state?.readError ? 'error'
    : moderation.store && moderation.state?.status === 'loading' ? 'loading'
    : moderation.blocked(mediumPolicyArticle.id) ? 'blocked' : null;
  // 정책 전용 진입도 기존 기사 차단 정책을 따르며 접근권 상실 시 내부 도구를 폐기한다.
  if (access) return <View style={{ flex: 1, backgroundColor: colors.background }}>
    <IconButton icon="back" label={props.backLabel ?? 'Responses로 돌아가기'} onPress={props.onBack} />
    <ContentStatus loading={access === 'loading'} error={access === 'error'}
      message={access === 'loading' ? '차단 설정을 확인하고 있어요.' : access === 'error'
        ? '차단 설정을 불러오지 못했어요.'
        : '차단한 작가의 기사예요. 작가 프로필 또는 Settings에서 차단을 해제해 주세요.'}
      actionLabel={access === 'error' ? '다시 시도' : undefined}
      onAction={access === 'error' ? () => { void moderation.store?.reload(); } : undefined} />
  </View>;
  return <PolicyArticleContent {...props} />;
}

function PolicyArticleContent({ onBack, onResponses, onLeave, active = true, backLabel = 'Responses로 돌아가기' }: PolicyArticleProps) {
  const { state: auth } = useAuth();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const reader = useReaderTypography(18);
  const community = useCommunityNavigation();
  const count = useResponseCount(policyResponseTarget);
  const share = useShareDialog();
  const [menu, setMenu] = useState<'options' | 'display' | null>(null);
  const openMenu = useReturnFocus(active && menu === null);
  if (!active && menu) setMenu(null);
  if (!active && share.target) share.close();
  return (
    <View style={styles.screen}>
      <RecordArticleVisit articleId={mediumPolicyArticle.id} active={active} revision={auth.revision} />
      <View style={styles.header}>
        <IconButton icon="back" label={backLabel} onPress={onBack} />
        <View style={styles.brand}>
          <Text aria-hidden style={styles.brandMark}>M</Text>
          <Text style={styles.brandTitle}>Medium Policy</Text>
        </View>
        <ListenControl article={policyArticleDetail} disabled={!active} />
        <IconButton icon="more" label="정책 기사 더보기" onPress={() => openMenu(() => setMenu('options'))} />
      </View>
      <ScrollView accessibilityLabel="정책 기사 본문" contentContainerStyle={styles.body}>
        <Text role="heading" style={[styles.title, reader.title]}>Medium Rules</Text>
        <Text style={styles.metadata}>11 min read · May 26, 2021</Text>
        <View style={styles.author}>
          <Pressable role="button" accessibilityLabel="Open Medium profile" style={styles.authorLink}
            onPress={() => { onLeave?.(); community.openIdentity(policyAuthor); }}>
            <Text aria-hidden style={styles.avatar}>M</Text>
            <Text style={styles.authorName}>Medium</Text>
          </Pressable>
          <FollowControl target={policyAuthor} name="Medium" />
        </View>
        <Text style={[styles.paragraph, reader.body]}>
          <Text style={reader.showHighlights && { backgroundColor: colors.highlight }}>{policyParagraphs[0]}</Text>
        </Text>
        <Text style={[styles.paragraph, reader.body]}>{policyParagraphs[1]}</Text>
        <Text style={[styles.paragraph, reader.body]}>
          {policyParagraphs[2].split('newsworthiness')[0]}<Text style={styles.underlined}>newsworthiness</Text>,
        </Text>
        <Text style={styles.notice}>This is an excerpt. The current rules may have changed.</Text>
        <Text style={styles.notice}>Local preview · interactions are mock. The captured 272 responses are not included.</Text>
        <ResponsePolicyLink />
      </ScrollView>
      <View style={styles.actions}>
        <ClapControl target={policyResponseTarget} title={mediumPolicyArticle.title} size={24} />
        <Pressable role="button" accessibilityLabel="정책 기사 Responses" onPress={onResponses} style={styles.response}>
          <AppIcon name="comment" size={22} color={colors.secondaryText} />
          <Text style={styles.metadata}>{count ?? '—'}</Text>
        </Pressable>
        <ArticleBookmarkControl articleId={mediumPolicyArticle.id} articleTitle={mediumPolicyArticle.title} compact iconSize={24} />
        <IconButton icon="share" label="정책 기사 공유" onPress={() => share.open(articleShareTarget(mediumPolicyArticle))} />
      </View>
      <ListeningMiniPlayer />
      {menu === 'options' && <TopPopover title="정책 기사 메뉴" onClose={() => setMenu(null)}>
        <Pressable role="button" accessibilityLabel="정책 기사 표시 설정" style={styles.option}
          onPress={() => setMenu('display')}><Text style={styles.optionText}>Display settings</Text></Pressable>
        <ResponsePolicyLink />
      </TopPopover>}
      {menu === 'display' && <ArticleDisplayPopover onClose={() => setMenu(null)} />}
      {share.target && <ShareSheet target={share.target} available={active} onClose={share.close} />}
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', minHeight: 56, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  brand: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, minWidth: 0 },
  brandMark: { color: colors.onAccent, backgroundColor: colors.green, fontFamily: fonts.serif, fontSize: 18, paddingHorizontal: 3 },
  brandTitle: { color: colors.text, fontFamily: fonts.sans, fontWeight: '600', fontSize: 16, flexShrink: 1 },
  body: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 24 },
  title: { color: colors.text, fontFamily: fonts.sans, fontWeight: '700', marginBottom: 26 },
  metadata: { color: colors.secondaryText, fontFamily: fonts.sans, fontSize: 14, lineHeight: 20 },
  author: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 14, marginBottom: 30 },
  authorLink: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 48, minWidth: 48 },
  avatar: { color: colors.text, backgroundColor: colors.input, borderRadius: 40, minWidth: 32, minHeight: 32, paddingHorizontal: 5, textAlign: 'center', lineHeight: 32, fontFamily: fonts.serif, fontSize: 20 },
  authorName: { color: colors.text, fontFamily: fonts.sans, fontSize: 16 },
  paragraph: { color: colors.text, marginBottom: 26 },
  underlined: { textDecorationLine: 'underline' },
  notice: { color: colors.secondaryText, fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, marginBottom: 12 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border, minHeight: 56 },
  response: { minHeight: 48, minWidth: 48, flexDirection: 'row', alignItems: 'center', gap: 8 },
  option: { minHeight: 48, justifyContent: 'center' },
  optionText: { color: colors.text, fontFamily: fonts.sans, fontSize: 16 },
});
