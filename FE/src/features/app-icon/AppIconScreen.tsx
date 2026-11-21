import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { useSettingsServices } from '../settings/SettingsServicesProvider';
import { SettingsAction, SettingsDetailFrame } from '../settings/SettingsDetailFrame';
import { useMembership } from '../membership/MembershipProvider';
import { MembershipSheet } from '../membership/MembershipSheet';
import { iconOptions } from './iconOptions';
import type { AppIconId } from './types';

export function AppIconScreen({ active, onBack }: { active: boolean; onBack: () => void }) {
  const services = useSettingsServices();
  const membership = useMembership();
  const state = useSyncExternalStore(
    services.icons.subscribe,
    services.icons.getSnapshot,
    services.icons.getSnapshot,
  );
  const [choice, setChoice] = useState<AppIconId | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'failed'>('idle');
  const [upgrade, setUpgrade] = useState(false);
  const live = useRef(false);
  const styles = useThemeStyles(createStyles);
  const entitled = membership?.allows('custom-icon') ?? false;
  const selected = entitled
    ? (choice ?? state.device?.applied ?? 'wordmark-black')
    : (state.device?.applied ?? 'wordmark-black');
  useLayoutEffect(() => {
    live.current = active;
    return () => {
      live.current = false;
    };
  }, [active, services.scope]);
  useEffect(() => {
    if (active) void services.icons.refresh();
  }, [active, services.icons]);
  const [boundary, setBoundary] = useState({ active, entitled });
  if (boundary.active !== active || boundary.entitled !== entitled) {
    setBoundary({ active, entitled });
    setChoice(null);
    setFeedback('idle');
    if (!active) setUpgrade(false);
  }
  async function apply() {
    const result = await services.icons.apply(
      selected,
      () => live.current && Boolean(membership?.allows('custom-icon')),
    );
    if (live.current && membership?.isCurrent()) setFeedback(result === 'applied' ? 'success' : 'failed');
  }
  return (
    <>
      <SettingsDetailFrame
        title="Custom app icon"
        onBack={onBack}
        footer={
          !entitled ? (
            <View style={styles.footer}>
              <Pressable
                role="button"
                accessibilityLabel="앱 아이콘 Friend 잠금 해제"
                onPress={() => setUpgrade(true)}
                style={styles.upgrade}
              >
                <View style={styles.upgradeSurface}><Text style={styles.upgradeText}>Become a Friend of Medium to unlock</Text></View>
              </Pressable>
            </View>
          ) : undefined
        }
      >
        <View style={styles.grid}>
          {iconOptions.map((option) => (
            <Pressable
              key={option.id}
              role="radio"
              accessibilityLabel={`앱 아이콘 ${option.label}`}
              accessibilityState={{ checked: selected === option.id, disabled: state.applying }}
              aria-checked={selected === option.id}
              accessibilityHint={
                !entitled
                  ? 'Friend 멤버십 선택 화면을 엽니다.'
                  : '선택 후 적용 버튼으로 기기 아이콘을 변경합니다.'
              }
              disabled={state.applying}
              onPress={() => {
                if (!membership?.allows('custom-icon')) {
                  setUpgrade(true);
                  return;
                }
                setChoice(option.id);
                setFeedback('idle');
              }}
              style={[styles.card, selected === option.id && styles.selected]}
            >
              <View style={[styles.cardContent, !entitled && option.id !== selected && styles.locked]}>
                <Image source={option.image} accessibilityIgnoresInvertColors style={styles.image} />
                <Text style={styles.label}>{option.id === 'founder-black' ? "Founder's\nChoice Black" : option.id === 'founder-white' ? "Founder's\nChoice White" : option.label}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Text style={styles.note}>Kostolany 아이콘을 선택하세요. 변경은 이 기기에 적용돼요.</Text>
        <Text style={styles.note}>
          {state.device?.supported
            ? `기기 적용: ${iconOptions.find((option) => option.id === state.device?.applied)?.label ?? '확인되지 않음'}`
            : '이 환경에서는 OS 앱 아이콘 변경을 지원하지 않아요. 화면 선택은 적용 성공이 아니에요.'}
        </Text>
        {(state.status === 'loading' || state.applying) && (
          <ActivityIndicator accessibilityLabel="앱 아이콘 처리 중" />
        )}
        {state.status === 'error' && (
          <Text role="alert" style={styles.error}>
            기기 아이콘 상태를 읽지 못했어요.
          </Text>
        )}
        <SettingsAction
          title="기기 아이콘 상태 다시 확인"
          disabled={state.applying || state.status === 'loading'}
          onPress={() => {
            void services.icons.refresh();
          }}
        />
        {entitled && (
          <>
            <SettingsAction
              title="선택한 앱 아이콘 적용"
              disabled={!state.device?.supported || state.applying || selected === state.device.applied}
              onPress={() => {
                void apply();
              }}
            />
            <SettingsAction
              title="앱 아이콘 선택 취소"
              disabled={state.applying}
              onPress={() => {
                setChoice(null);
                setFeedback('idle');
              }}
            />
          </>
        )}
        {feedback === 'failed' && (
          <Text role="alert" style={styles.error}>
            적용을 확인하지 못했어요. 선택은 유지했으니 기기 상태를 확인하고 다시 시도해 주세요.
          </Text>
        )}
        {feedback === 'success' && (
          <Text aria-live="polite" style={styles.note}>
            기기가 아이콘 변경을 확인했어요. 홈 화면의 표시 갱신은 기기에 따라 다를 수 있어요.
          </Text>
        )}
      </SettingsDetailFrame>
      {upgrade && active && <MembershipSheet onClose={() => setUpgrade(false)} />}
    </>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, paddingHorizontal: 12, paddingTop: 6 },
    card: {
      flexBasis: '46%',
      flexGrow: 1,
      minHeight: 124,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 5,
    },
    selected: { borderColor: colors.text },
    cardContent: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 10 },
    locked: { opacity: 0.45 },
    image: { width: 48, height: 48, borderRadius: 9 },
    label: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, color: colors.text, textAlign: 'center' },
    note: { fontFamily: fonts.sans, color: colors.secondaryText, fontSize: 13, lineHeight: 19 },
    error: { color: colors.destructive, fontSize: 14, lineHeight: 20 },
    footer: { paddingHorizontal: 24, paddingVertical: 12, backgroundColor: colors.background },
    upgrade: { alignSelf: 'center', minHeight: 48, justifyContent: 'center' },
    upgradeSurface: { backgroundColor: colors.green, borderRadius: 28, paddingHorizontal: 16, paddingVertical: 10 },
  upgradeText: { color: colors.onAccent, textAlign: 'center', fontFamily: fonts.sans, fontWeight: '400', fontSize: 13, lineHeight: 18 },
  });
