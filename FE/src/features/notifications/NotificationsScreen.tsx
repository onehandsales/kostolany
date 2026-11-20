import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { AppState, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { useDirectory } from '../community/DirectoryProvider';
import { FollowControl } from '../community/FollowControl';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { useKnownProfile } from '../profile/ProfileProvider';
import { usePublicListAccess } from '../public-lists/PublicListProvider';
import { useResponseScope } from '../responses/ResponseProvider';
import { visibleResponses } from '../responses/responseVisibility';
import { useArticleModeration } from '../moderation/articleModeration';
import { previewArticleSource } from '../article/data/articlePreview';
import type { ArticleSource } from '../article/types';
import { useNotifications } from './NotificationProvider';
import { notificationTime, validNotificationTarget, type NotificationTarget, type ReaderNotification } from './types';

type NotificationsScreenProps = {
  onBack: () => void; onOpen: (target: NotificationTarget) => void; active: boolean;
  articleSource?: ArticleSource; footer?: ReactNode;
};
export function NotificationsScreen(props: NotificationsScreenProps) {
  const { scope } = useNotifications();
  const [boundary, setBoundary] = useState({ source: props.articleSource, generation: 0 });
  if (boundary.source !== props.articleSource) {
    setBoundary({ source: props.articleSource, generation: boundary.generation + 1 }); return null;
  }
  return <ScopedNotifications key={`${scope}:${boundary.generation}`} {...props} />;
}
function ScopedNotifications({ onBack, onOpen, active, articleSource = previewArticleSource, footer }: NotificationsScreenProps) {
  const { state, store } = useNotifications(); const styles = useThemeStyles(createStyles);
  const directory = useDirectory(); const lists = usePublicListAccess(); const responses = useResponseScope(); const moderation = useArticleModeration();
  const [opening, setOpening] = useState<string | null>(null); const [errorId, setErrorId] = useState<string | null>(null);
  const request = useRef(0); const mounted = useRef(true); const pending = useRef(false);
  const latest = useRef({ active, directory, lists, responses, moderation });
  useLayoutEffect(() => { latest.current = { active, directory, lists, responses, moderation }; }, [active, directory, lists, responses, moderation]);
  const [now, setNow] = useState(Date.now);
  useEffect(() => { store?.ensureInbox(); }, [store]);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => {
    if (!active) { request.current++; pending.current = false; return; }
    let timer: ReturnType<typeof setInterval> | undefined;
    const updateTimer = (foreground: boolean) => {
      clearInterval(timer); timer = undefined;
      if (foreground) { setNow(Date.now()); timer = setInterval(() => setNow(Date.now()), 60_000); }
    };
    updateTimer(AppState.currentState === 'active');
    const subscription = AppState.addEventListener('change', value => updateTimer(value === 'active'));
    return () => { clearInterval(timer); subscription.remove(); };
  }, [active]);
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) { setWasActive(active); setOpening(null); setErrorId(null); }
  async function open(item: ReaderNotification) {
    if (pending.current || !latest.current.active) return;
    const id = ++request.current; pending.current = true; setOpening(item.id); setErrorId(null);
    const current = () => mounted.current && latest.current.active && id === request.current;
    try {
      const target = item.target;
      if (!validNotificationTarget(target)) throw new Error('Invalid notification destination');
      if (target.kind === 'writer') {
        const currentDirectory = latest.current.directory;
        if (currentDirectory.state.status === 'error') { currentDirectory.retry(); throw new Error('Unavailable directory'); }
        if (!currentDirectory.state.data?.identities.some(identity => identity.kind === 'writer' && identity.id === target.id)) throw new Error('Missing writer');
      } else if (target.kind === 'list') {
        await latest.current.lists?.store.reload();
        if (!current()) return;
        const list = latest.current.lists?.getListForUser(item.recipientId, target.id);
        if (!list || list.owner.id !== target.ownerId || (list.isPrivate && list.owner.id !== item.recipientId)
          || latest.current.moderation.state?.value?.blocked.includes(list.owner.id)) throw new Error('Unavailable list');
      } else {
        const articleId = target.kind === 'article' ? target.id : target.articleId;
        const article = await articleSource(articleId);
        if (!current()) return;
        const privacy = latest.current.moderation;
        if (article.id !== articleId || privacy.state?.readError || (privacy.store && !privacy.state?.value) || privacy.blocked(articleId)) throw new Error('Unavailable article');
        if (target.kind === 'response') {
          const responseStore = latest.current.responses?.store; const parent = { kind: 'article' as const, id: articleId };
          await responseStore?.refresh(parent);
          if (!current()) return;
          const value = responseStore?.getSnapshot(parent);
          if (!value || value.readError || !visibleResponses(value.value, latest.current.moderation.state?.value?.blocked)
            .some(response => response.id === target.responseId && !response.deleted)) throw new Error('Unavailable response');
        }
      }
      if (!current()) return;
      onOpen(target);
      // 목적지 접근을 확인한 뒤 읽음을 요청하고 실패하면 행의 재시도로 복구한다.
      void store?.markRead(item.id);
    } catch { if (current()) setErrorId(item.id); }
    finally { if (current()) { pending.current = false; setOpening(null); } }
  }
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <View style={styles.header}><IconButton icon="back" label="알림에서 홈으로 돌아가기" onPress={onBack} />
      <Text role="heading" style={styles.title}>Notifications</Text><View style={styles.space} /></View>
    <FlatList data={state?.inbox?.notifications ?? []} keyExtractor={item => item.id}
      refreshing={Boolean(state?.inboxLoading && state.inbox)} onRefresh={() => { void store?.loadInbox(); }}
      ListHeaderComponent={state?.inboxError ? <ContentStatus error message="알림을 불러오지 못했어요."
        actionLabel="알림 조회 재시도" onAction={() => { void store?.loadInbox(); }} /> : null}
      ListEmptyComponent={!state?.inboxError ? <ContentStatus loading={!state?.inbox}
        message={state?.inbox ? 'You’re all caught up. No notifications yet.' : '알림을 불러오고 있어요.'} /> : null}
      renderItem={({ item }) => <NotificationRow item={item} now={now} opening={opening === item.id}
        error={errorId === item.id} readError={Boolean(state?.readErrors.includes(item.id))}
        onOpen={() => { void open(item); }} onRetryRead={() => { void store?.markRead(item.id); }} />}
    />{footer}
  </SafeAreaView>;
}
const verbs = { follow: ' started following you', 'list-story': ' added 1 story to your saved list ', clap: ' clapped for ', response: ' responded to ', mention: ' mentioned you in ' };
function NotificationRow({ item, now, opening, error, readError, onOpen, onRetryRead }: {
  item: ReaderNotification; now: number; opening: boolean; error: boolean; readError: boolean; onOpen: () => void; onRetryRead: () => void;
}) {
  const styles = useThemeStyles(createStyles); const known = useKnownProfile(item.actorId); const directory = useDirectory();
  const actor = directory.state.data?.identities.find(identity => identity.kind === 'writer' && identity.id === item.actorId);
  const name = known?.name ?? actor?.name ?? item.actorName;
  return <View style={[styles.notification, !item.read && styles.unread]}>
    <View style={styles.mainRow}>
      <Pressable role="button" accessibilityLabel={`${name}${verbs[item.kind]}${item.subject}, ${item.read ? '읽음' : '읽지 않음'}`}
        accessibilityState={{ busy: opening }} style={styles.destination} onPress={onOpen}>
        <View><ProfileAvatar size={36} userId={item.actorId} fallback={actor?.avatar} />
          {(item.kind === 'follow' || item.kind === 'clap') && <View aria-hidden style={[styles.badge, item.kind === 'follow' && styles.followBadge]}><AppIcon name={item.kind === 'follow' ? 'person' : 'clap'} size={12} color="#fff" /></View>}
        </View>
        <View style={styles.copy}><Text style={styles.text}><Text style={styles.strong}>{name}</Text>{verbs[item.kind]}<Text style={styles.strong}>{item.subject}</Text></Text>
          <Text style={styles.date}>{notificationTime(item.occurredAt, now)}</Text>
          {opening && <Text accessibilityLiveRegion="polite" style={styles.date}>Opening…</Text>}</View>
      </Pressable>
      {item.kind === 'follow' && <FollowControl target={{ kind: 'writer', id: item.actorId }} name={name} />}
    </View>
    {error && <View style={styles.feedback}><Text role="alert" style={styles.error}>대상을 열 수 없어요. 삭제·접근 권한 또는 연결 상태를 확인해 주세요.</Text>
      <Pressable role="button" accessibilityLabel={`알림 대상 재시도 ${item.id}`} onPress={onOpen} style={styles.retry}><Text style={styles.green}>Retry</Text></Pressable></View>}
    {readError && <View style={styles.feedback}><Text role="alert" style={styles.error}>읽음 상태를 저장하지 못했어요.</Text>
      <Pressable role="button" accessibilityLabel={`읽음 저장 재시도 ${item.id}`} onPress={onRetryRead} style={styles.retry}><Text style={styles.green}>Retry</Text></Pressable></View>}
  </View>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, header: { minHeight: 54, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  title: { flex: 1, fontFamily: fonts.sans, fontSize: 16, fontWeight: '600', color: colors.text, textAlign: 'center' }, space: { width: 48 },
  notification: { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border, borderLeftWidth: 4, borderLeftColor: 'transparent', paddingLeft: 20, paddingRight: 24, paddingVertical: 18 },
  unread: { borderLeftColor: colors.green }, mainRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  destination: { flex: 1, flexDirection: 'row', gap: 16, minHeight: 48, alignItems: 'flex-start' }, copy: { flex: 1, gap: 0 },
  text: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text }, strong: { fontWeight: '600' },
  date: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, color: colors.secondaryText },
  badge: { position: 'absolute', right: -2, bottom: -2, width: 18, height: 18, borderRadius: 9, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.background }, followBadge: { backgroundColor: '#ff5297' },
  feedback: { marginTop: 8 }, error: { fontFamily: fonts.sans, fontSize: 13, color: colors.destructive },
  retry: { minHeight: 48, justifyContent: 'center' }, green: { fontFamily: fonts.sans, fontSize: 14, color: colors.green },
});
