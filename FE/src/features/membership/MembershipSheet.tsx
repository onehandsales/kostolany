import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { useAuth } from '../auth/AuthProvider';
import { createMembershipSession } from './createMembershipSession';
import { useMembership } from './MembershipProvider';

type MembershipPanelProps = { onClose: () => void; onComplete?: () => void; embedded?: boolean };
export function MembershipSheet(props: MembershipPanelProps) {
  return (
    <Modal animationType="slide" onRequestClose={props.onClose} accessibilityLabel="멤버십 선택">
      <MembershipPanel {...props} />
    </Modal>
  );
}
export function MembershipPanel(props: MembershipPanelProps) {
  const membership = useMembership();
  const auth = useAuth();
  const styles = useThemeStyles(createStyles);
  const [origin] = useState({ source: membership?.source, scope: membership?.scope });
  const { onClose } = props;
  const valid = origin.source === membership?.source && origin.scope === membership?.scope;
  useEffect(() => {
    if (!valid) onClose();
  }, [onClose, valid]);
  useEffect(
    () => () => {
      requestAnimationFrame(restoreModalFocus);
    },
    [],
  );
  if (!valid) return null;
  if (!membership?.userId)
    return (
      <SafeAreaView edges={props.embedded ? [] : undefined} style={styles.screen}>
        <IconButton icon="close" label="멤버십 닫기" onPress={onClose} />
        <View style={styles.center}>
          <Text style={styles.body}>계정별 모의 멤버십을 선택하려면 로그인하세요.</Text>
          <Pressable
            role="button"
            onPress={() => {
              onClose();
              auth.store.openLogin({ kind: 'profile' });
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>로그인</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  return <MembershipContent {...props} membership={membership} userId={membership.userId} />;
}
const memberBenefits = [
  'Read member-only stories',
  'Support writers you read most',
  'Earn money for your writing',
  'Listen to audio narrations',
  'Read offline with the Medium app',
  'Access our Mastodon community',
  'Connect your custom domain',
  'Create your own publications',
];
function MembershipContent({
  onClose,
  onComplete,
  embedded = false,
  membership,
  userId,
}: MembershipPanelProps & {
  membership: NonNullable<ReturnType<typeof useMembership>>;
  userId: string;
}) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const primary = useRef<View | null>(null);
  const session = useMemo(
    () => createMembershipSession(membership.source, userId, membership.isCurrent),
    [membership.source, userId, membership.isCurrent],
  );
  useLayoutEffect(() => session.activate(), [session]);
  const state = useSyncExternalStore(session.subscribe, session.getSnapshot, session.getSnapshot);
  const pending = state.phase === 'pending';
  useEffect(() => {
    primary.current?.focus();
  }, [state.phase]);
  const close = () => {
    session.close();
    onClose();
  };
  if (state.phase === 'welcome')
    return (
      <SafeAreaView edges={embedded ? [] : undefined} style={styles.screen}>
        <ScrollView contentContainerStyle={styles.center} accessibilityLabel="멤버십 완료 안내">
          <Text role="heading" style={styles.welcome}>
            Thanks for becoming a Medium {state.selected === 'friend' ? 'Friend' : 'member'}
          </Text>
          <Text style={styles.welcomeDescription}>You can now access the best of Medium.</Text>
          <Pressable
            role="button"
            ref={primary}
            accessibilityLabel="멤버십 완료 후 돌아가기"
            style={[styles.action, styles.start]}
            onPress={() => {
              session.close();
              (onComplete ?? onClose)();
            }}
          >
            <Text style={[styles.actionText, styles.startText]}>Start reading</Text>
          </Pressable>
          <Text style={styles.note}>모의 멤버십이 적용됐어요. 실제 결제는 없어요.</Text>
        </ScrollView>
      </SafeAreaView>
    );
  return (
    <SafeAreaView edges={embedded ? [] : undefined} style={styles.screen}>
      <View style={styles.screen} aria-hidden={state.phase === 'success'}
        pointerEvents={state.phase === 'success' ? 'none' : 'auto'}
        {...(Platform.OS === 'web' ? { inert: state.phase === 'success' } : {})}>
      <View style={styles.header}>
        <IconButton icon="close" label="멤버십 닫기" onPress={close} size={28} />
        <Text style={styles.headerNote}>모의 선택 · 보관본 가격 · 결제 없음</Text>
      </View>
      <ScrollView
        accessibilityLabel="멤버십 플랜"
        contentContainerStyle={styles.content}
      >
        <Text role="heading" style={styles.title}>
          Support independent writing and get{'\n'}the best of Medium.
        </Text>
        <Text style={styles.section}>Select a billing option</Text>
        <View style={styles.periods}>
          {(['monthly', 'annually'] as const).map((period) => (
            <Pressable
              key={period}
              role="radio"
              accessibilityLabel={`Pay ${period}`}
              accessibilityState={{ checked: state.period === period }}
              aria-checked={state.period === period}
              onPress={() => session.setPeriod(period)}
              style={[styles.period, state.period === period && styles.selected]}
            >
              <Text style={[styles.periodText, state.period === period && styles.green]}>Pay {period}</Text>
              {period === 'annually' && <Text style={styles.body}>Save up to $39</Text>}
            </Pressable>
          ))}
        </View>
        <Text style={styles.section}>Select a membership plan</Text>
        {(['member', 'friend'] as const).map((tier) => {
          const current = membership.record?.tier === tier && membership.record.period === state.period;
          const unavailable = membership.tier === 'friend' && tier === 'member';
          const benefits =
            tier === 'member'
              ? memberBenefits
              : ['All Medium Member benefits', 'Share Friend Links', 'Custom app icons'];
          return (
            <View key={tier} style={styles.card}>
              <Text role="heading" style={styles.plan}>
                {tier === 'member' ? 'Member' : 'Friend'}
              </Text>
              <Text style={styles.price}>
                {state.period === 'monthly'
                  ? `$${tier === 'member' ? '6.98' : '19.98'} SGD/month`
                  : 'Annual plan · price unrecorded'}
              </Text>

              <Text style={styles.description}>
                {tier === 'member'
                  ? 'Access member-only stories and enjoy an enhanced reading and writing experience. Cancel anytime.'
                  : 'Support independent writing with all Member benefits and Friend features.'}
              </Text>
              <Pressable
                role="button"
                accessibilityLabel={`${tier === 'member' ? 'Member' : 'Friend'} 모의 선택`}
                disabled={pending || current || unavailable}
                accessibilityState={{ disabled: pending || current || unavailable, selected: current }}
                onPress={() => {
                  void session.select(tier);
                }}
                style={[styles.planAction, (pending || current || unavailable) && styles.disabled]}
              >
                <View style={styles.planSurface}>
                  <Text style={styles.actionText}>
                    {current ? 'Current plan' : unavailable ? 'Friend active' : 'Select'}
                  </Text>
                </View>
              </Pressable>
              {state.phase === 'error' && state.selected === tier && (
                <Text role="alert" style={styles.error}>
                  적용하지 못했어요. 선택을 유지했으니 다시 시도하세요.
                </Text>
              )}
              <View style={styles.benefits}>
                {benefits.map((benefit) => (
                  <View key={benefit} style={styles.benefit}>
                    <Text style={styles.check}>✓</Text>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
        <Text accessibilityLabel="현재 모의 멤버십" style={styles.note}>
          Current: {membership.tier} {membership.record?.period ?? ''}
          {'\n'}
          원본의 가격·혜택 안내를 재현한 화면이에요. 실제 결제·갱신·해지·수익화는 연결하지 않았어요.
        </Text>
      </ScrollView>
      </View>
      {pending && (
        <View
          pointerEvents="none"
          style={styles.loading}
          accessibilityLabel="모의 멤버십 적용 중"
          accessibilityState={{ busy: true }}
        >
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      )}
      {state.phase === 'success' && (
        <View style={styles.overlay} accessibilityViewIsModal>
          <View style={styles.alert}>
            <Text role="heading" style={styles.alertTitle}>
              {"You're all set"}
            </Text>
            <Text style={styles.alertBody}>Your mock membership is ready.</Text>
            <Pressable
              role="button"
              ref={primary}
              accessibilityLabel="멤버십 성공 확인"
              onPress={session.welcome}
              style={styles.ok}
            >
              <Text style={styles.okText}>OK</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    headerNote: {
      color: colors.secondaryText,
      fontSize: 11,
      fontFamily: fonts.sans,
      flex: 1,
      textAlign: 'right',
      paddingRight: 16,
    },
    header: {
      flexDirection: 'row',
      minHeight: 70,
      paddingHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },
    title: {
      fontFamily: fonts.serif,
      fontSize: 29,
      fontWeight: '400',
      lineHeight: 33,
      color: colors.text,
      marginBottom: 52,
    },
    section: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.secondaryText,
      marginBottom: 14,
    },
    periods: { flexDirection: 'row', marginBottom: 56, borderRadius: 4, overflow: 'hidden' },
    period: {
      flex: 1,
      minHeight: 70,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      padding: 8,
    },
    selected: { borderColor: colors.green, backgroundColor: colors.highlight },
    periodText: { fontFamily: fonts.sans, fontSize: 16, color: colors.text },
    green: { color: colors.green },
    body: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
    card: { borderWidth: 1, borderColor: colors.border, borderRadius: 4, padding: 32, marginBottom: 24 },
    plan: {
      fontFamily: fonts.sans,
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
    },
    price: { fontFamily: fonts.sans, fontSize: 16, color: colors.text, textAlign: 'center', marginTop: 2 },
    description: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 17,
      color: colors.secondaryText,
      textAlign: 'center',
      marginVertical: 28,
    },
    planAction: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
    planSurface: {
      minHeight: 38,
      backgroundColor: colors.green,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    action: {
      minHeight: 48,
      minWidth: 48,
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: colors.green,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionText: { fontFamily: fonts.sans, fontWeight: '400', fontSize: 15, color: colors.onAccent },
    disabled: { opacity: 0.45 },
    benefits: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      marginTop: 24,
      paddingTop: 24,
      gap: 16,
    },
    benefit: { flexDirection: 'row', gap: 10 },
    check: { color: colors.green, fontSize: 16 },
    benefitText: { flex: 1, fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, color: colors.text },
    note: {
      fontFamily: fonts.sans,
      fontSize: 11,
      lineHeight: 16,
      color: colors.secondaryText,
      textAlign: 'center',
      marginTop: 12,
    },
    error: { color: colors.destructive, fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, marginTop: 12 },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: colors.background + 'B3',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: '#0003',
      justifyContent: 'center',
      alignItems: 'center',
    },
    alert: {
      width: '70%',
      maxWidth: 360,
      borderRadius: 14,
      backgroundColor: colors.surface,
      alignItems: 'center',
      paddingTop: 20,
    },
    alertTitle: { fontFamily: fonts.sans, fontSize: 17, fontWeight: '700', color: colors.text },
    alertBody: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
      textAlign: 'center',
      margin: 8,
      marginBottom: 20,
    },
    ok: {
      minHeight: 48,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    okText: { color: '#007aff', fontSize: 17, fontWeight: '600' },
    center: { flexGrow: 1, padding: 24, justifyContent: 'center', alignItems: 'center', gap: 24 },
    welcome: {
      fontFamily: fonts.serif,
      fontWeight: '400',
      fontSize: 24,
      lineHeight: 30,
      color: colors.text,
      textAlign: 'center',
    },
    welcomeDescription: {
      fontFamily: fonts.sans,
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      textAlign: 'center',
    },
    start: { backgroundColor: colors.inverse },
    startText: { color: colors.onInverse },
  });
