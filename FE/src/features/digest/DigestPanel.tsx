import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { IconButton } from '../../shared/ui/IconButton';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { DigestSettingsSheet } from '../notifications/NotificationSettingsScreen';
import { LibrarySheet } from '../bookmarks/LibrarySheet';
import { useBookmarkStore } from '../bookmarks/useBookmarks';
import { ArticleBookmarkControl } from '../bookmarks/ArticleBookmarkControl';
import { ArticleByline } from '../community/IdentityLink';
import { ClapControl } from '../reactions/ClapControl';
import { ResponseButton } from '../responses/ResponseButton';
import { useHasViewed } from '../reading-history/ReadingHistoryProvider';
import { articleReportTarget, useArticleModeration } from '../moderation/articleModeration';
import type { FeedArticle } from '../feed/types';
import { createDigestStore } from './createDigestStore';
import type { DigestSource } from './types';

type DigestPanelProps = { source: DigestSource; userId: string; header: ReactNode; onOpen: (id: string) => void };
export function DigestPanel(props: DigestPanelProps) {
  const [owner, setOwner] = useState(() => ({ source: props.source, userId: props.userId, key: 0 }));
  if (owner.source !== props.source || owner.userId !== props.userId) {
    setOwner({ source: props.source, userId: props.userId, key: owner.key + 1 });
    return null;
  }
  return <DigestContent key={owner.key} {...props} />;
}

function DigestContent({ source, userId, header, onOpen }: DigestPanelProps) {
  const [store] = useState(() => createDigestStore(source, userId));
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  useEffect(() => store.connect(), [store]);
  const styles = useThemeStyles(createStyles);
  const articles = useBookmarkStore().articles;
  const moderation = useArticleModeration();
  const list = useRef<FlatList<FeedArticle>>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const [settings, setSettings] = useState(false);
  const selected = state.issues.find(issue => issue.id === state.selectedId);
  const validDraft = state.catalogStatus === 'ready' && state.issues.some(issue => issue.id === draft);
  const awaitingModeration = Boolean(moderation.store && !moderation.state?.value);
  const stories = awaitingModeration || moderation.state?.readError ? [] : state.digest?.articleIds.flatMap(id =>
    moderation.blocked(id) ? [] : articles.find(article => article.id === id) ?? []) ?? [];
  return <>
    <FlatList ref={list} data={stories} keyExtractor={article => article.id}
      contentContainerStyle={styles.content}
      refreshing={state.catalogStatus === 'loading'} onRefresh={() => { void store.refresh(); }}
      ListHeaderComponent={<>{header}<View style={styles.filter}>
        <Pressable role="button" accessibilityLabel="Digest 날짜 선택" style={styles.date}
          disabled={!selected} accessibilityState={{ disabled: !selected }} onPress={() => setDraft(state.selectedId)}>
          <Text style={styles.text}>{selected ? formatDigestDate(selected.date) : 'Digest history'}</Text>
          <View style={styles.down}><AppIcon name="chevron" size={16} /></View>
        </Pressable>
        <IconButton icon="settings" label="Digest 설정" onPress={() => setSettings(true)} />
      </View><Text role="heading" style={styles.heading}>Today’s highlights</Text>
      {(state.catalogStatus === 'loading' || state.status === 'loading') && <ContentStatus loading message="Digest를 불러오고 있어요." />}
      {(state.catalogStatus === 'error' || state.status === 'error') && <ContentStatus error message="Digest를 불러오지 못했어요." actionLabel="Digest 다시 시도" onAction={() => { void store.retry(); }} />}
      {awaitingModeration && !moderation.state?.readError && <ContentStatus loading message="기사 표시 설정을 확인하고 있어요." />}
      {moderation.state?.readError && <ContentStatus error message="기사 표시 설정을 확인하지 못했어요." actionLabel="표시 설정 다시 시도" onAction={() => { void moderation.store?.reload(); }} />}
      {!awaitingModeration && !moderation.state?.readError && state.catalogStatus === 'ready' && state.status === 'ready' && !stories.length &&
        <ContentStatus message={selected ? '이 날짜에는 읽을 기사가 없어요.' : '아직 발행된 Digest가 없어요.'} actionLabel="Digest 새로고침" onAction={() => { void store.refresh(); }} />}
      </>}
      renderItem={({ item, index }) => <DigestStory article={item} hero={index === 0} onOpen={onOpen} />} />
    {draft !== null && <LibrarySheet title="Digest history" titleLabel="Digest 날짜" closeLabel="취소" closeText="×" closeSide="left" contentStyle={styles.sheetContent} expanded onClose={() => setDraft(null)}>
      {state.issues.map(issue => <Pressable key={issue.id} role="radio" accessibilityLabel={formatDigestDate(issue.date)}
        accessibilityState={{ checked: draft === issue.id }} onPress={() => setDraft(issue.id)} style={styles.choice}>
        <Text style={styles.radio}>{draft === issue.id ? '◉' : '○'}</Text><Text style={styles.text}>{formatDigestDate(issue.date)}</Text>
      </Pressable>)}
      {!validDraft && <Text role="alert" style={styles.secondary}>발행 목록이 변경되었어요. 날짜를 다시 선택해 주세요.</Text>}
      <View style={styles.historyFooter}><Text style={styles.historyHelp}>You can view up to 10 of your most recent digests</Text>
      <Pressable role="button" accessibilityLabel="Digest 날짜 적용" disabled={!validDraft} accessibilityState={{ disabled: !validDraft }}
        style={[styles.done, !validDraft && styles.disabled]} onPress={() => {
          if (draft !== state.selectedId) { list.current?.scrollToOffset({ offset: 0, animated: false }); void store.select(draft); }
          setDraft(null);
        }}><Text style={styles.doneText}>Done</Text></Pressable></View>
    </LibrarySheet>}
    {settings && <DigestSettingsSheet onClose={() => setSettings(false)} />}
  </>;
}

function DigestStory({ article, hero, onOpen }: { article: FeedArticle; hero: boolean; onOpen: (id: string) => void }) {
  const styles = useThemeStyles(createStyles);
  const viewed = useHasViewed(article.id);
  const moderation = useArticleModeration();
  const { width } = useWindowDimensions();
  return <View style={styles.story}>
    {hero && article.reference?.image && <Image source={article.reference.image} style={[styles.hero, { height: (Math.min(728, width) - 48) / 2.1 }]} accessible={false} resizeMode="cover" />}
    <ArticleByline articleId={article.id} fallback={article.sourceName} />
    <Pressable role="button" accessibilityLabel={`Digest 기사 ${article.title}`} onPress={() => onOpen(article.id)} style={styles.storyLink}>
      <Text style={[styles.storyTitle, viewed && styles.viewed]}>{article.title}</Text><Text style={styles.summary}>{article.summary}</Text>
    </Pressable>
    <View style={styles.actions}>
      <Text style={styles.secondary}>{article.readingMinutes} min read{viewed ? ' · Viewed' : ''}</Text>
      <ClapControl target={{ kind: 'article', id: article.id }} title={article.title} />
      <ResponseButton target={{ kind: 'article', id: article.id }} title={article.title} />
      <ArticleBookmarkControl articleId={article.id} articleTitle={article.title} compact />
      <ActionMenu label={`Digest 기사 더보기, ${article.title}`} items={[{ label: 'Report this story',
        onPress: () => moderation.open({ kind: 'report', target: articleReportTarget(article.id), title: article.title }) }]} />
    </View>
  </View>;
}

export function formatDigestDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  content: { flexGrow: 1, maxWidth: 728, width: '100%', alignSelf: 'center', paddingBottom: 24 },
  filter: { flexDirection: 'row', gap: 8, alignItems: 'center', marginHorizontal: 20, marginTop: 20 },
  date: { minHeight: 48, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderRadius: 28, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  down: { transform: [{ rotate: '90deg' }] },
  heading: { fontFamily: fonts.serif, fontSize: 24, lineHeight: 32, color: colors.text, marginHorizontal: 24, marginTop: 32, marginBottom: 30 },
  text: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.text },
  secondary: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 20, color: colors.secondaryText },
  choice: { flexDirection: 'row', minHeight: 48, alignItems: 'center', gap: 20 },
  radio: { fontSize: 24, color: colors.text },
  sheetContent: { gap: 0, paddingTop: 16, paddingBottom: 24, flexGrow: 1 },
  historyFooter: { marginTop: 'auto', paddingTop: 36, gap: 20 },
  historyHelp: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 20, color: colors.secondaryText, textAlign: 'center' },
  done: { minHeight: 48, justifyContent: 'center', borderRadius: 28, backgroundColor: colors.text },
  doneText: { textAlign: 'center', color: colors.background, fontFamily: fonts.sans, fontSize: 14 },
  disabled: { opacity: 0.4 },
  story: { paddingHorizontal: 24, paddingBottom: 24, marginBottom: 24, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border, gap: 12 },
  hero: { width: '100%', borderRadius: 2, marginBottom: 4 },
  storyLink: { minHeight: 48, gap: 6 },
  storyTitle: { fontFamily: fonts.sans, fontSize: 19, lineHeight: 25, fontWeight: '700', color: colors.text },
  viewed: { color: colors.secondaryText },
  summary: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.secondaryText },
  actions: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
});
