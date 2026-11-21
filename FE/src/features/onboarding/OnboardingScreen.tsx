import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { IconButton } from '../../shared/ui/IconButton';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { MembershipPanel } from '../membership/MembershipSheet';
import { useDirectory } from '../community/DirectoryProvider';
import { FollowControl } from '../community/FollowControl';
import { useRelationships } from '../community/RelationshipProvider';
import { followKey } from '../community/types';
import { useModeration } from '../moderation/ModerationContext';
import { useTopics } from '../topics/TopicProvider';
import type { OnboardingSession } from './createOnboardingSession';
import type { NotificationPermissionSource } from './notificationPermission';
import type { OnboardingRecord, OnboardingStep } from './onboardingSource';

function previousStep(record: OnboardingRecord): OnboardingStep | undefined {
  return ({ interests: record.showWelcome ? 'welcome' : undefined, following: 'interests',
    notifications: 'following', membership: 'notifications' } as Partial<Record<OnboardingStep, OnboardingStep>>)[record.step];
}

type OnboardingScreenProps = { session: OnboardingSession; permission: NotificationPermissionSource };
export function OnboardingScreen(props: OnboardingScreenProps) {
  const [membership, setMembership] = useState(false);
  const styles = useThemeStyles(createStyles);
  const state = useSyncExternalStore(props.session.subscribe, props.session.getSnapshot, props.session.getSnapshot);
  useEffect(() => () => { requestAnimationFrame(restoreModalFocus); }, []);
  return (
    <Modal animationType="fade" accessibilityLabel="관심사 온보딩" onRequestClose={() => {
      if (membership) { setMembership(false); return; }
      const back = state.record && previousStep(state.record);
      if (back && !state.busy && state.error !== 'response-lost') void props.session.save(back);
      else if (!state.busy) props.session.close();
    }}>
      <SafeAreaView style={styles.screen}>
        {state.status !== 'ready' || !state.record ? (
          <View style={styles.loading}>
            <IconButton icon="close" label="온보딩 닫기" onPress={props.session.close} />
            <ContentStatus loading={state.status === 'loading'} error={state.status === 'error'}
              message={state.status === 'loading' ? '설정을 불러오고 있어요.' : '설정을 불러오지 못했어요.'}
              actionLabel="온보딩 다시 불러오기" onAction={() => { void props.session.reload(); }} />
          </View>
        ) : membership && state.record.step === 'membership'
          ? <MembershipPanel embedded onClose={() => setMembership(false)} onComplete={() => { setMembership(false); void props.session.save('complete'); }} />
          : <OnboardingFlow key={state.record.step} {...props} onOpenMembership={() => setMembership(true)} />}
      </SafeAreaView>
    </Modal>
  );
}
function OnboardingFlow({ session, permission, onOpenMembership }: OnboardingScreenProps & { onOpenMembership: () => void }) {
  const styles = useThemeStyles(createStyles);
  const state = useSyncExternalStore(session.subscribe, session.getSnapshot, session.getSnapshot);
  const record = state.record;
  const topics = useTopics();
  const directory = useDirectory();
  const relationships = useRelationships();
  const moderation = useModeration();
  const [selected, setSelected] = useState(() => relationships.state?.relationships
    .filter(item => item.target.kind === 'topic' && item.following).map(item => item.target.id) ?? []);
  const initialized = useRef(relationships.state?.status === 'ready');
  useEffect(() => {
    if (!initialized.current && relationships.state?.status === 'ready') {
      initialized.current = true;
      setSelected(relationships.state.relationships.filter(item => item.target.kind === 'topic' && item.following)
        .map(item => item.target.id));
    }
  }, [relationships.state]);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionResult, setPermissionResult] = useState(permission.read);
  const lifetime = useRef(new AbortController());
  const operationPending = useRef(false);
  const permissionIntent = useRef(0);
  useEffect(() => {
    lifetime.current = new AbortController();
    operationPending.current = false;
    return () => lifetime.current.abort();
  }, []);
  const current = () => session.isCurrent() && !lifetime.current.signal.aborted;
  useEffect(() => {
    if (state.record?.step !== 'notifications' || !permission.refresh) return;
    let active = true;
    const intent = permissionIntent.current;
    void Promise.resolve().then(() => permission.refresh?.() ?? permission.read()).then(value => {
      if (active && intent === permissionIntent.current) setPermissionResult(value);
    }, () => {
      if (active && intent === permissionIntent.current) setError('기기 알림 권한을 조회하지 못했어요. 다시 요청하거나 건너뛰세요.');
    });
    return () => { active = false; };
  }, [permission, state.record?.step]);
  if (!record) return null;
  const step = record.step;
  const busy = state.busy || working;
  const uncertain = state.error === 'response-lost';
  const topicOrder = ['programming', 'data-science', 'technology', 'self-improvement', 'writing', 'relationships',
    'machine-learning', 'productivity', 'politics', 'cryptocurrency', 'psychology', 'money', 'business', 'python',
    'health', 'science', 'mental-health', 'life', 'software-development', 'startup', 'design', 'javascript',
    'artificial-intelligence', 'culture', 'software-engineering', 'blockchain', 'coding'];
  const catalog = [...(topics.state.data?.topics ?? [])].sort((a, b) => {
    const rank = (id: string) => topicOrder.includes(id) ? topicOrder.indexOf(id) : 100;
    return rank(a.id) - rank(b.id);
  });
  const selectedIds = selected.filter(id => catalog.some(topic => topic.id === id));
  const topicsLoading = topics.state.status === 'loading' || relationships.state?.status === 'loading';
  const topicsError = topics.state.status === 'error' || relationships.state?.readError;
  const retryTopics = () => { topics.retry(); void relationships.store?.reload(); };
  async function saveInterests() {
    if (busy || operationPending.current || selectedIds.length < 3 || !relationships.store || !current()) return;
    operationPending.current = true;
    setWorking(true); setError(null);
    const before = relationships.store.getSnapshot().relationships;
    const ids = [...new Set([...before.filter(item => item.target.kind === 'topic').map(item => item.target.id), ...selectedIds])];
    for (const id of ids) {
      if (!current()) return;
      const target = { kind: 'topic' as const, id };
      const key = followKey(target);
      const following = selectedIds.includes(id);
      const snapshot = relationships.store.getSnapshot();
      const value = snapshot.relationships.find(item => followKey(item.target) === key);
      if (Boolean(value?.following) === following && !snapshot.errors.includes(key)) continue;
      const saved = await relationships.store.set({ target, following, email: false }, relationships.scope);
      if (!current()) return;
      if (!saved) { operationPending.current = false; setWorking(false); setError('관심사를 저장하지 못했어요. 선택을 유지했으니 다시 시도해 주세요.'); return; }
    }
    if (!current()) return;
    setWorking(false);
    await session.save('following');
    operationPending.current = false;
  }
  async function chooseNotifications(enable: boolean) {
    if (busy || operationPending.current || !current()) return;
    operationPending.current = true;
    permissionIntent.current++;
    const requestLifetime = lifetime.current;
    setWorking(true); setError(null);
    try {
      const result = enable ? await permission.request(lifetime.current.signal) : permission.read();
      if (!current() || lifetime.current !== requestLifetime) return;
      if (enable && result !== 'granted' && result !== 'denied') throw new Error('unresolved-permission');
      if (!['undetermined', 'granted', 'denied', 'unsupported'].includes(result)) throw new Error('invalid-permission');
      setPermissionResult(result); setWorking(false);
      await session.save(record?.showMembership ? 'membership' : 'complete',
        enable ? result === 'granted' ? 'enabled' : 'denied' : 'skipped');
    } catch {
      if (current() && lifetime.current === requestLifetime) { setWorking(false); setError('알림 권한을 확인하거나 요청할 수 없어요. 다시 시도하거나 건너뛰세요.'); }
    } finally {
      if (lifetime.current === requestLifetime) operationPending.current = false;
    }
  }
  const locked = busy || uncertain;
  const entries = (directory.state.data?.identities ?? []).filter(item => item.id !== record.userId
    && !(item.kind === 'writer' && moderation.state?.value?.blocked.includes(item.id))
    && !moderation.state?.value?.muted.some(target => followKey(target) === followKey(item)));
  const preferred = ['iris', 'write-catalyst', 'geeksociety', 'level-up-coding'];
  const recommendations = [...entries].sort((a, b) => {
    const rank = (id: string) => preferred.includes(id) ? preferred.indexOf(id) : 100;
    return rank(a.id) - rank(b.id);
  });
  const feedback = <>
    {(error || state.error) && <Text role="alert" style={styles.error}>
      {error ?? (uncertain ? '저장 결과를 확인하지 못했어요. 같은 요청을 다시 확인해 주세요.' : '설정을 저장하지 못했어요. 다시 시도해 주세요.')}
    </Text>}
    {state.error && <Pressable role="button" accessibilityLabel="온보딩 저장 다시 시도" disabled={busy}
      style={styles.secondaryAction} onPress={() => { void session.retry(); }}><Text style={styles.description}>Retry</Text></Pressable>}
  </>;
  return <>
    <View style={styles.header}>
      <IconButton icon="back" label="온보딩 이전 단계" disabled={busy || uncertain}
        onPress={() => { const back = previousStep(record); if (back) void session.save(back); else session.close(); }} />
      <Text style={styles.headerTitle}>Welcome to Medium</Text>
      <IconButton icon="close" label="온보딩 닫기" onPress={session.close} />
    </View>
    {step === 'following' ? <FlatList data={directory.state.status === 'ready' ? recommendations : []}
      keyExtractor={followKey} contentContainerStyle={styles.followList}
      ListHeaderComponent={<><Text role="heading" style={styles.title}>Recommended for you.</Text>
        <Text style={styles.description}>Here are some top writers and publications based on your interests.</Text>{feedback}</>}
      renderItem={({ item }) => <View style={styles.followRow}>
        {item.avatar ? <Image source={item.avatar} style={styles.avatar} accessible={false} />
          : <View style={styles.avatar}><Text style={styles.name}>{item.name.slice(0, 1)}</Text></View>}
        <View style={styles.identity}><Text style={styles.name}>{item.name}</Text>
          {item.kind === 'publication' && <Text style={styles.detail}>Publication</Text>}
          <Text style={styles.detail} numberOfLines={3}>{item.bio}</Text></View>
        <FollowControl target={{ kind: item.kind, id: item.id }} name={item.name} />
      </View>}
      ListEmptyComponent={<ContentStatus loading={directory.state.status === 'loading'}
        error={directory.state.status === 'error'} message={directory.state.status === 'loading'
          ? '추천을 불러오고 있어요.' : directory.state.status === 'error' ? '추천을 불러오지 못했어요.' : '추천할 항목이 없어요. 팔로우 없이 계속할 수 있어요.'}
        actionLabel="추천 다시 불러오기" onAction={directory.retry} />} /> :
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content,
        (step === 'welcome' || step === 'notifications') && styles.center]}>
        {step === 'welcome' && <>
          <Text role="heading" style={styles.welcome}>Welcome to{ '\n' }your new{ '\n' }experience.</Text>
          <Text style={styles.description}>We’ve updated our app. Let’s review who you’re following to improve your home screen and recommendations.</Text>
          <View style={styles.avatars}>{recommendations.slice(0, 7).map(item => item.avatar
            ? <Image key={followKey(item)} source={item.avatar} style={styles.welcomeAvatar} accessible={false} /> : null)}</View>
        </>}
        {step === 'interests' && <>
          <Text role="heading" style={styles.title}>What are you interested in?</Text>
          <Text style={styles.description}>Add or edit the topics you follow.{ '\n' }Choose three or more.</Text>
          {topicsLoading || topicsError ? <ContentStatus loading={topicsLoading} error={Boolean(topicsError)}
            message={topicsLoading ? '관심사를 불러오고 있어요.' : '관심사를 불러오지 못했어요.'}
            actionLabel="관심사 다시 불러오기" onAction={retryTopics} /> : catalog.length === 0
            ? <ContentStatus message="선택할 관심사가 없어요." actionLabel="관심사 다시 불러오기" onAction={retryTopics} />
            : <View style={styles.chips}>{catalog.map(topic => <Pressable key={topic.id} role="checkbox"
              accessibilityLabel={`${topic.name} 관심사`} accessibilityState={{ checked: selectedIds.includes(topic.id), disabled: busy || uncertain }}
              aria-checked={selectedIds.includes(topic.id)} disabled={busy || uncertain}
              onPress={() => setSelected(ids => ids.includes(topic.id) ? ids.filter(id => id !== topic.id) : [...ids, topic.id])}
              style={styles.chipTarget}><View style={[styles.chip, selectedIds.includes(topic.id) && styles.selected]}>
                <Text style={[styles.chipText, selectedIds.includes(topic.id) && styles.actionText]}>{topic.name}</Text>
              </View></Pressable>)}</View>}
        </>}
        {step === 'notifications' && <>
          <Text role="heading" style={styles.title}>Stay up to date.</Text>
          <Text style={styles.description}>Turn on notifications, and we’ll let you know when writers you follow publish new stories.</Text>
          <Text style={styles.mock}>{permission.kind === 'native' ? '기기 알림 권한' : permission.kind === 'unsupported' ? '현재 실행 환경에서는 알림 권한을 요청할 수 없어요' : '모의 기기 권한'}: {permissionResult}{'\n'}실제 알림 발송은 연결하지 않았어요.</Text>
        </>}
        {step === 'membership' && <>
          <Text role="heading" style={styles.membership}>Support independent writing and get the best of Medium.</Text>
          <Text style={styles.description}>Explore membership</Text>
          {record.notificationChoice === 'denied' && <Text style={styles.mock}>이전 알림 권한 요청이 거절됐어요. 알림 없이 계속 읽을 수 있어요.</Text>}

        </>}
        {feedback}
      </ScrollView>}
    <View style={styles.footer}>
      {step === 'welcome' && <OnboardingAction label="온보딩 계속" caption="Continue" disabled={locked} onPress={() => { void session.save('interests'); }} />}
      {step === 'interests' && <OnboardingAction label="관심사 다음" caption="Next" onPress={() => { void saveInterests(); }}
        disabled={locked || selectedIds.length < 3 || topicsLoading || Boolean(topicsError)} />}
      {step === 'following' && <OnboardingAction label="추천 팔로우 완료" caption="Finish" disabled={locked} onPress={() => { void session.save('notifications'); }} />}
      {step === 'notifications' && <>
        <OnboardingAction label="알림 안내 건너뛰기" caption="Skip this step" disabled={locked} secondary onPress={() => { void chooseNotifications(false); }} />
        <OnboardingAction label={permission.kind === 'native' ? '알림 OS 권한 요청' : permission.kind === 'unsupported' ? '알림 권한 사용 불가' : '모의 알림 사용'} caption="Enable Notifications" disabled={locked} onPress={() => { void chooseNotifications(true); }} />
      </>}
      {step === 'membership' && <>
        <OnboardingAction label="멤버십 안내 열기" caption="Explore membership" disabled={locked} secondary onPress={onOpenMembership} />
        <OnboardingAction label="온보딩 완료" caption="Continue reading" disabled={locked} onPress={() => { void session.save('complete'); }} />
      </>}
    </View>
  </>;
}
type OnboardingActionProps = { label: string; caption: string; onPress: () => void; disabled?: boolean; secondary?: boolean };
function OnboardingAction({ label, caption, onPress, disabled, secondary }: OnboardingActionProps) {
  const styles = useThemeStyles(createStyles);
  return <Pressable role="button" accessibilityLabel={label} disabled={disabled}
    accessibilityState={{ disabled }} onPress={onPress}
      style={[styles.action, secondary && styles.secondaryAction, disabled && styles.disabled,
        disabled && !secondary && styles.disabledAction]}>
    <Text style={[styles.actionText, secondary && styles.secondaryText]}>{caption}</Text>
  </Pressable>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', minHeight: 64, paddingHorizontal: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontFamily: fonts.sans, fontSize: 16, fontWeight: '600', color: colors.text },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24 },
  center: { justifyContent: 'center' },
  title: { fontFamily: fonts.sans, fontSize: 24, lineHeight: 30, fontWeight: '700', color: colors.text, textAlign: 'center' },
  description: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24, color: colors.secondaryText, textAlign: 'center', marginTop: 8 },
  welcome: { fontFamily: fonts.serif, fontSize: 48, lineHeight: 54, letterSpacing: -1.5, textAlign: 'center', color: colors.text, marginBottom: 16 },
  avatars: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 30, paddingTop: 32, gap: 8, borderTopWidth: 1, borderTopColor: colors.border },
  welcomeAvatar: { width: 72, height: 72, borderRadius: 36 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 32, gap: 4 },
  chipTarget: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 24, paddingHorizontal: 12, paddingVertical: 10 },
  chipText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
  selected: { backgroundColor: colors.green, borderColor: colors.green },
  footer: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24, backgroundColor: colors.background },
  action: { minHeight: 48, borderRadius: 24, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', padding: 12 },
  actionText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.onInverse },
  secondaryAction: { minHeight: 48, justifyContent: 'center', alignItems: 'center', padding: 12, backgroundColor: 'transparent' },
  secondaryText: { color: colors.secondaryText },
  disabled: { opacity: 0.4 },
  disabledAction: { backgroundColor: colors.border, opacity: 1 },
  error: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.destructive, paddingVertical: 12 },
  mock: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.secondaryText, marginTop: 20, textAlign: 'center' },
  followList: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  followRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 20 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  identity: { flex: 1 },
  name: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.text, fontWeight: '600' },
  detail: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.secondaryText, marginTop: 4 },
  membership: { fontFamily: fonts.serif, fontSize: 32, lineHeight: 36, color: colors.text, marginVertical: 24 },
  membershipNotice: { marginTop: 24, padding: 16, backgroundColor: colors.surface },
});
