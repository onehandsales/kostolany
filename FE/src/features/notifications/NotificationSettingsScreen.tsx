import { useEffect, useRef, useState } from 'react';
import { AppState, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LibrarySheet } from '../bookmarks/LibrarySheet';
import type { NotificationPermissionSource } from '../onboarding/notificationPermission';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { displayedPreference, preferenceChange } from './createNotificationStore';
import { useNotifications } from './NotificationProvider';
import { useNotificationPermission } from './NotificationPermissionProvider';
import type { PreferenceKey, PreferenceValue } from './types';

export type NotificationSettingsSection = 'push' | 'email' | 'digest';
const titles = { push: 'Push notifications', email: 'Email notifications', digest: 'Digest settings' };
const choices = { tailored: 'Tailored for you', all: 'All', off: 'Off', daily: 'Daily', weekly: 'Weekly' };
type PreferenceChoice = { key: PreferenceKey; value: PreferenceValue };
const labels: Record<PreferenceKey, string> = {
  digestPush: 'New Medium Digest', topStory: 'Your top story of the day', editors: 'Stories picked by our Editors for you',
  featured: 'Featured stories from publications you follow', applause: 'Applause from people you follow', saves: 'Saves of your lists',
  writers: 'New stories from writers you follow', claps: 'Claps for your stories', highlights: 'Highlights', responses: 'Responses to your stories', mentions: 'Mentions',
  emailEnabled: 'Email notifications', emailDigest: 'Your Medium Digest', emailWriters: 'New stories from subscribed writers',
  emailSocial: 'Social activity and mentions', digestFrequency: 'Frequency', emailFrequency: 'Digest email frequency',
};

type NotificationSettingsScreenProps = { section: 'push' | 'email'; onBack: () => void };
type DigestSettingsSheetProps = { onClose: () => void };
export function NotificationSettingsScreen({ section, onBack }: NotificationSettingsScreenProps) {
  const styles = useThemeStyles(createStyles); const { scope } = useNotifications();
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <View style={styles.header}><IconButton icon="back" label="알림 설정에서 돌아가기" onPress={onBack} />
      <Text role="heading" style={styles.title}>{titles[section]}</Text><View style={{ width: 48 }} /></View>
    <NotificationSettingsContent key={`${scope}:${section}`} section={section} />
  </SafeAreaView>;
}

export function DigestSettingsSheet({ onClose }: DigestSettingsSheetProps) {
  const { scope } = useNotifications();
  return <ScopedDigestSettingsSheet key={scope} onClose={onClose} />;
}

function ScopedDigestSettingsSheet({ onClose }: { onClose: () => void }) {
  const [section, setSection] = useState<NotificationSettingsSection>('digest');
  const [choice, setChoice] = useState<PreferenceChoice | null>(null);
  const trigger = useRef<View | null>(null);
  const { store } = useNotifications();
  useEffect(() => () => { requestAnimationFrame(restoreModalFocus); }, []);
  const closeChoice = () => { setChoice(null); requestAnimationFrame(() => trigger.current?.focus()); };
  // Digest 하위 선택도 같은 모달 안에서 바꿔 뒤로 가기가 부모까지 닫지 않게 한다.
  return <LibrarySheet title={choice ? labels[choice.key] : titles[section]} expanded closeSide="left"
    closeIcon={choice || section === 'digest' ? 'close' : 'back'} closeLabel={choice ? '취소' : section === 'digest' ? '닫기' : '뒤로'}
    contentStyle={{ paddingHorizontal: 0, paddingTop: 0, gap: 0 }}
    onClose={() => choice ? closeChoice() : section === 'digest' ? onClose() : setSection('digest')}>
    <View style={choice ? { display: 'none' } : undefined}>
      <NotificationSettingsBody key={section} section={section} onSection={setSection}
        onChoose={(next, target) => { trigger.current = target; setChoice(next); }} />
    </View>
    {choice && <PreferenceOptions choice={choice} focusOnMount onChange={setChoice} onDone={() => {
      store?.setPreference(preferenceChange(choice.key, choice.value)); closeChoice();
    }} />}
  </LibrarySheet>;
}

function NotificationSettingsContent({ section }: { section: 'push' | 'email' }) {
  const [choice, setChoice] = useState<PreferenceChoice | null>(null);
  const trigger = useRef<View | null>(null);
  const { store } = useNotifications();
  const closeChoice = () => { setChoice(null); requestAnimationFrame(() => trigger.current?.focus()); };
  return <>
    <ScrollView><NotificationSettingsBody section={section}
      onChoose={(next, target) => { trigger.current = target; setChoice(next); }} /></ScrollView>
    {choice && <LibrarySheet title={labels[choice.key]} closeLabel="취소" onClose={closeChoice}>
      <PreferenceOptions choice={choice} onChange={setChoice} onDone={() => {
        store?.setPreference(preferenceChange(choice.key, choice.value)); closeChoice();
      }} />
    </LibrarySheet>}
  </>;
}

function NotificationSettingsBody({ section, onSection, onChoose }: {
  section: NotificationSettingsSection; onSection?: (section: NotificationSettingsSection) => void;
  onChoose: (choice: PreferenceChoice, target: View | null) => void;
}) {
  const styles = useThemeStyles(createStyles); const { state, store } = useNotifications();
  const targets = useRef<Partial<Record<PreferenceKey, View | null>>>({});
  useEffect(() => { store?.ensurePreferences(); }, [store]);
  if (!state || !state.preferences) return <ContentStatus loading={!state?.preferencesError} error={state?.preferencesError}
    message={state?.preferencesError ? '설정을 불러오지 못했어요.' : '설정을 불러오고 있어요.'}
    actionLabel="알림 설정 조회 재시도" onAction={() => { void store?.loadPreferences(); }} />;
  function row(key: PreferenceKey) {
    if (!state) return null;
    const value = displayedPreference(state, key); const edit = state.edits[key];
    return <View key={key}>
      <Pressable ref={target => { targets.current[key] = target; }} role={typeof value === 'boolean' ? 'switch' : 'button'}
        aria-checked={typeof value === 'boolean' ? value : undefined} aria-busy={Boolean(edit && !edit.failed)}
        accessibilityLabel={labels[key]} accessibilityValue={typeof value === 'boolean' ? undefined : { text: choices[value as keyof typeof choices] }}
        accessibilityState={typeof value === 'boolean' ? { checked: value } : undefined}
        onPress={() => {
          if (typeof value === 'boolean') store?.setPreference(preferenceChange(key, !value));
          else if (value !== undefined) onChoose({ key, value }, targets.current[key] ?? null);
        }} style={[styles.row, section === 'push' && styles.pushRow,
          section === 'push' && ['editors', 'featured', 'writers'].includes(key) && styles.multilineRow,
          key === 'digestFrequency' && styles.frequencyRow]}>
        <View style={[styles.labelGroup, section === 'push' && typeof value === 'boolean' && styles.pushLabel]}>
          <Text style={[styles.label, section === 'digest' && styles.digestLabel]}>{labels[key]}</Text>
          {key === 'digestFrequency' && <Text style={[styles.hint, styles.frequencyHint]}>Adjust how often you see a new Digest</Text>}
        </View>
        {typeof value === 'boolean' ? <View style={[styles.toggle, value && styles.enabled]} aria-hidden>
          <View style={[styles.thumb, value && styles.thumbOn]} /></View>
          : <View style={styles.choiceValue}><Text style={styles.choice}>{choices[value as keyof typeof choices]}</Text>
            <View aria-hidden style={styles.choiceArrows}><AppIcon name="select" size={16} color={styles.choice.color} /></View></View>}
      </Pressable>
      {edit && <View style={styles.feedback}>
        <Text role={edit.failed ? 'alert' : undefined} accessibilityLiveRegion="polite" style={edit.failed ? styles.error : styles.hint}>
          {edit.failed ? '저장하지 못했어요. 선택을 유지하고 있어요.' : 'Saving…'}</Text>
        {edit.failed && <Pressable role="button" accessibilityLabel={`${labels[key]} 저장 재시도`} style={styles.retry}
          onPress={() => store?.retryPreference(key)}><Text style={styles.choice}>Retry</Text></Pressable>}
      </View>}
    </View>;
  }
  return <>
    {state.preferencesError && <ContentStatus error message="설정 갱신에 실패했어요. 마지막 저장값을 표시해요."
      actionLabel="알림 설정 조회 재시도" onAction={() => { void store?.loadPreferences(); }} />}
    {section === 'push' && <>
      <View style={styles.gap} />{row('digestPush')}{row('topStory')}{row('editors')}<View style={styles.gap} />
      {row('writers')}{row('featured')}{row('claps')}{row('highlights')}{row('responses')}{row('mentions')}{row('applause')}
      <View style={styles.gap} />{row('saves')}<View style={styles.gap} /><PermissionCard />
    </>}
    {section === 'email' && <>
      <Text style={styles.note}>Preview preferences · No emails are sent.</Text>
      {row('emailEnabled')}<View style={styles.gap} />{row('emailDigest')}{row('emailFrequency')}{row('emailWriters')}{row('emailSocial')}
      <Text style={styles.note}>Turning email off keeps your subscriptions. Follow and writer subscription choices stay separate.</Text>
    </>}
    {section === 'digest' && <>
      {row('digestFrequency')}
      {(['push', 'email'] as const).map(type => <Pressable key={type} role="button" accessibilityLabel={`Digest ${titles[type]}`}
        onPress={() => onSection?.(type)} style={[styles.row, styles.digestRow]}>
        <Text style={[styles.label, styles.digestLabel, styles.labelGroup]}>{titles[type]}</Text>
        <Text style={[styles.label, styles.digestValue]}>{displayedPreference(state, type === 'push' ? 'digestPush' : 'emailDigest')
          && (type === 'push' || displayedPreference(state, 'emailEnabled')) ? 'On' : 'Off'}</Text>
        {type === 'push' ? <AppIcon name="chevron" size={24} /> : <Text style={styles.digestValue}>↗</Text>}
      </Pressable>)}
    </>}
  </>;
}

function PreferenceOptions({ choice, onChange, onDone, focusOnMount = false }: {
  choice: PreferenceChoice; onChange: (choice: PreferenceChoice) => void; onDone: () => void; focusOnMount?: boolean;
}) {
  const styles = useThemeStyles(createStyles); const selected = useRef<View | null>(null);
  useEffect(() => { if (focusOnMount) selected.current?.focus(); }, [focusOnMount]);
  const values = choice.key === 'digestFrequency' || choice.key === 'emailFrequency'
    ? ['daily', 'weekly', 'off'] as const : ['tailored', 'all', 'off'] as const;
  return <>
    {values.map(value => <Pressable key={value} ref={choice.value === value ? selected : undefined}
      role="radio" accessibilityLabel={choices[value]} aria-checked={choice.value === value}
      accessibilityState={{ checked: choice.value === value }} style={styles.row}
      onPress={() => onChange({ ...choice, value })}>
      <Text style={[styles.label, styles.labelGroup]}>{choices[value]}</Text>
      {choice.value === value && <AppIcon name="check" size={20} />}
    </Pressable>)}
    <Pressable role="button" accessibilityLabel="알림 선택 완료" style={styles.done} onPress={onDone}>
      <Text style={styles.choice}>Done</Text>
    </Pressable>
  </>;
}

function PermissionCard() {
  const source = useNotificationPermission();
  const [boundary, setBoundary] = useState({ source, generation: 0 });
  if (source !== boundary.source) {
    setBoundary({ source, generation: boundary.generation + 1 }); return null;
  }
  return <ScopedPermissionCard key={boundary.generation} source={source} />;
}

function ScopedPermissionCard({ source }: { source: NotificationPermissionSource | null }) {
  const styles = useThemeStyles(createStyles);
  const [value, setValue] = useState(() => source?.read() ?? 'unsupported');
  const [busy, setBusy] = useState(false); const [error, setError] = useState(false);
  const operation = useRef(0); const lifetime = useRef(new AbortController()); const requesting = useRef(false);
  useEffect(() => {
    lifetime.current = new AbortController(); let current = true;
    async function refresh() {
      const id = ++operation.current;
      try { const next = await (source?.refresh?.() ?? source?.read() ?? 'unsupported');
        if (current && id === operation.current) { setValue(next); setError(false); }
      } catch { if (current && id === operation.current) setError(true); }
    }
    void refresh(); const listener = AppState.addEventListener('change', state => { if (state === 'active' && !requesting.current) void refresh(); });
    return () => { current = false; lifetime.current.abort(); listener.remove(); };
  }, [source]);
  async function act(kind: 'request' | 'settings' | 'refresh') {
    if (!source || requesting.current) return;
    requesting.current = true; setBusy(true); setError(false); const id = ++operation.current; const signal = lifetime.current.signal;
    try {
      if (kind === 'settings') await source.openSettings?.();
      const next = kind === 'request' ? await source.request(signal) : await (source.refresh?.() ?? source.read());
      if (!signal.aborted && id === operation.current) setValue(next);
    } catch { if (!signal.aborted && id === operation.current) setError(true); }
    finally { requesting.current = false; if (!signal.aborted) setBusy(false); }
  }
  return <View style={styles.permission}>
    <Text role="heading" style={styles.label}>Device notification permission</Text>
    <Text accessibilityLiveRegion="polite" style={styles.hint}>{source?.kind === 'mock' || !source?.kind ? 'Mock permission: ' : ''}{value}</Text>
    <Text style={styles.hint}>{value === 'unsupported' ? '현재 실행 환경에서는 기기 알림 권한을 요청할 수 없어요.' : '기기 권한은 계정별 수신 설정과 별도로 유지돼요. 실제 알림은 발송하지 않아요.'}</Text>
    {error && <Text role="alert" style={styles.error}>권한 확인 또는 변경에 실패했어요.</Text>}
    {value !== 'unsupported' && <>
      {value === 'undetermined' && <Pressable role="button" accessibilityLabel="알림 권한 요청" disabled={busy} style={styles.retry}
        onPress={() => { void act('request'); }}><Text style={styles.choice}>Enable notifications</Text></Pressable>}
      {source?.openSettings && <Pressable role="button" accessibilityLabel="OS 알림 설정 열기" disabled={busy} style={styles.retry}
        onPress={() => { void act('settings'); }}><Text style={styles.choice}>Open device settings</Text></Pressable>}
      <Pressable role="button" accessibilityLabel="알림 권한 다시 확인" disabled={busy} style={styles.retry}
        onPress={() => { void act('refresh'); }}><Text style={styles.choice}>{busy ? 'Checking…' : 'Check permission again'}</Text></Pressable>
    </>}
  </View>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, header: { minHeight: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  title: { fontFamily: fonts.sans, fontSize: 16, fontWeight: '600', textAlign: 'center', color: colors.text, flex: 1 },
  gap: { height: 34, backgroundColor: colors.divider },
  row: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 24, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  pushRow: { minHeight: 48, paddingVertical: 8, paddingHorizontal: 16 }, pushLabel: { maxWidth: 215 },
  multilineRow: { minHeight: 66 },
  frequencyRow: { minHeight: 90, paddingVertical: 20, paddingRight: 32, borderColor: colors.divider },
  frequencyHint: { fontSize: 13, marginTop: 2 }, digestRow: { minHeight: 50, paddingVertical: 12, borderColor: colors.divider },
  digestLabel: { fontSize: 16, lineHeight: 22 }, digestValue: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.secondaryText },
  labelGroup: { flex: 1 }, label: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
  hint: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, color: colors.secondaryText },
  choice: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 20, color: colors.green, flexShrink: 1 },
  toggle: { width: 51, height: 30, borderRadius: 16, backgroundColor: colors.border, padding: 2, justifyContent: 'center', marginLeft: 'auto' },
  enabled: { backgroundColor: colors.green }, thumb: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#fff' }, thumbOn: { alignSelf: 'flex-end' },
  choiceValue: { flexDirection: 'row', alignItems: 'center', flexShrink: 1, maxWidth: '50%' }, choiceArrows: { width: 16, height: 20, justifyContent: 'center' },
  feedback: { paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', gap: 8 }, error: { color: colors.destructive, fontFamily: fonts.sans, fontSize: 13, flexShrink: 1 },
  retry: { minHeight: 48, minWidth: 48, justifyContent: 'center' }, done: { minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  note: { padding: 24, fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText }, permission: { padding: 24, gap: 8 },
});
