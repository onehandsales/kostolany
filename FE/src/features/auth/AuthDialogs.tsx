import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { IconButton } from '../../shared/ui/IconButton';
import { ProviderIcon, type ProviderName } from '../../shared/ui/ProviderIcon';
import { EmailLogin } from './EmailLogin';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { useAuth } from './AuthProvider';
import { authStyles as createAuthStyles } from './authStyles';
import { mockUserA, mockUsers } from './data/mockUsers';
import type { AuthScenario, LogoutScenario } from './types';

const scenarios: readonly { value: AuthScenario; label: string }[] = [
  { value: 'success', label: '성공' },
  { value: 'cancel', label: '사용자 취소' },
  { value: 'failure', label: '실패' },
  { value: 'slow', label: '느린 성공 (4초)' },
];

type AuthDialogsProps = { profileName?: string };
type LogoutDialogProps = { profileName?: string };

export function AuthDialogs({ profileName }: AuthDialogsProps) {
  const { state, store } = useAuth();
  const wasOpen = useRef(false);
  useEffect(() => {
    if (state.dialog) {
      wasOpen.current = true;
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    const frame = requestAnimationFrame(restoreModalFocus);
    return () => cancelAnimationFrame(frame);
  }, [state.dialog]);
  if (state.dialog?.kind === 'login') return <LoginDialog key={`${state.revision}:${store.getLoginAttempt()}`} />;
  if (state.dialog?.kind === 'logout') return <LogoutDialog profileName={profileName} />;
  return null;
}

function LoginDialog() {
  const styles = useThemeStyles(createStyles);
  const authStyles = useThemeStyles(createAuthStyles);
  const { colors } = useTheme();
  const { state, store } = useAuth();
  const { width } = useWindowDimensions();
  const [isJoining, setJoining] = useState(state.dialog?.kind === 'login' && Boolean(state.dialog.joining));
  const [email, setEmail] = useState(false);
  const emailBack = useRef<(() => void) | null>(null);
  const loginScroll = useRef<ScrollView>(null);
  useEffect(() => { loginScroll.current?.scrollTo({ y: 0, animated: false }); }, [isJoining]);
  const [userId, setUserId] = useState(mockUserA.id);
  const [scenario, setScenario] = useState<AuthScenario>('success');
  const dialog = state.dialog;
  if (dialog?.kind !== 'login') return null;
  const isPending = dialog.status === 'pending';
  const hasError = dialog.status === 'error';
  const isLocked = isPending || hasError;
  const providers: readonly ProviderName[] = isJoining
    ? ['Google', 'Facebook', 'Apple', 'Email']
    : ['Google', 'Facebook', 'Apple', 'X', 'Email'];
  function handleProviderPress(provider: ProviderName): void {
    if (provider === 'Email') { store.cancelLoginRequest(); setEmail(true); return; }
    if (hasError) store.retry();
    else void store.signIn(userId, scenario, provider, isJoining);
  }
  return (
    <Modal animationType="fade" accessibilityLabel="모의 로그인" onRequestClose={() => { if (email) emailBack.current?.(); else store.closeDialog(); }}>
      <SafeAreaView style={authStyles.screen}>
        {email ? <EmailLogin joining={isJoining} scenario={scenario} backActionRef={emailBack} onBack={() => setEmail(false)} onClose={store.closeDialog} /> : <>
        <View style={styles.authHeader}>
          <Text style={styles.brand}>Medium</Text>
          <View style={styles.loginTop}>
            <Text style={styles.mockBadge}>MOCK · no real authentication</Text>
            <IconButton icon="close" label="로그인 닫기" onPress={store.closeDialog} size={20} />
          </View>
        </View>
        <ScrollView ref={loginScroll} contentContainerStyle={styles.login}>
          <Text role="heading" style={[styles.headline, width < 360 && styles.smallHeadline]}>
            Human{'\n'}stories and{'\n'}ideas.
          </Text>
          <Text style={styles.description}>Discover perspectives that deepen{'\n'}understanding.</Text>
          <View style={styles.providers}>
            {hasError && (
              <Text role="alert" style={authStyles.error}>
                로그인하지 못했어요. 선택한 독자로 다시 시도해 주세요.
              </Text>
            )}
            {providers.map((provider) => (
              <Pressable
                key={provider}
                role="button"
                accessibilityLabel={
                  hasError && provider === dialog.provider ? '로그인 다시 시도' : provider === 'Google'
                    ? 'Google로 로그인 (모의)'
                    : `Sign ${isJoining ? 'up' : 'in'} with ${provider}`
                }
                accessibilityState={{ disabled: isPending || hasError && provider !== dialog.provider, busy: provider === (dialog.provider ?? 'Google') && isPending }}
                disabled={isPending || hasError && provider !== dialog.provider}
                onPress={() => handleProviderPress(provider)}
                style={styles.providerTarget}
              >
                <View style={styles.providerPill}>
                  <View style={styles.providerIcon}>
                    {provider === (dialog.provider ?? 'Google') && isPending ? (
                      <ActivityIndicator color={colors.text} />
                    ) : (
                      <ProviderIcon provider={provider} />
                    )}
                  </View>
                  <Text style={styles.providerLabel}>
                    {provider === (dialog.provider ?? 'Google') && isPending
                      ? 'Signing in…'
                      : provider === dialog.provider && hasError
                        ? `Try again with ${provider}`
                        : `Sign ${isJoining ? 'up' : 'in'} with ${provider}`}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
          <Pressable
            role="button"
            accessibilityLabel={isJoining ? 'Sign in' : 'Create account'}
            disabled={isLocked}
            accessibilityState={{ disabled: isLocked }}
            onPress={() => setJoining(!isJoining)}
            style={styles.joinLink}
          >
            <Text style={styles.joinText}>
              {isJoining ? 'Already have an account?  ' : 'New here?  '}
              <Text style={styles.green}>{isJoining ? 'Sign in.' : 'Create account.'}</Text>
            </Text>
          </Pressable>
          <View style={styles.mockPanel}>
            <Text style={styles.mockLabel}>모의 로그인 · 실제 Google 인증이 아닙니다</Text>
            <View style={styles.choices}>
              {mockUsers.map((user) => (
                <Pressable
                  key={user.id}
                  accessibilityRole="radio"
                  accessibilityLabel={user.name}
                  aria-checked={userId === user.id}
                  aria-disabled={isLocked}
                  accessibilityState={{ checked: userId === user.id, disabled: isLocked }}
                  disabled={isLocked}
                  onPress={() => setUserId(user.id)}
                  style={[
                    styles.choice,
                    userId === user.id && styles.selected,
                    isLocked && authStyles.disabled,
                  ]}
                >
                  <Text style={authStyles.buttonText}>{user.name}</Text>
                </Pressable>
              ))}
            </View>
            <Text aria-live="polite" style={authStyles.secondary}>
              {isPending
                ? '닫기를 누르면 로그인 요청을 취소해요.'
                : dialog.context.kind === 'like' || dialog.context.kind === 'bookmark'
                    || dialog.context.kind === 'save-list' || dialog.context.kind === 'clap-list'
                  ? '로그인 후 읽던 화면으로 돌아가요. 박수나 저장은 다시 눌러 주세요.'
                  : '로그인 후 이 화면으로 돌아가요.'}
            </Text>
            <ScenarioPicker selected={scenario} onSelect={setScenario} disabled={isLocked} />
          </View>
        </ScrollView>
        </>}
      </SafeAreaView>
    </Modal>
  );
}

function LogoutDialog({ profileName }: LogoutDialogProps) {
  const styles = useThemeStyles(createStyles);
  const authStyles = useThemeStyles(createAuthStyles);
  const { colors } = useTheme();
  const { state, store } = useAuth();
  const [scenario, setScenario] = useState<LogoutScenario>('success');
  const dialog = state.dialog;
  if (dialog?.kind !== 'logout') return null;
  const isPending = dialog.status === 'pending';
  const hasError = dialog.status === 'error';
  return (
    <Modal
      transparent
      animationType="fade"
      accessibilityLabel="로그아웃 확인"
      onRequestClose={store.closeDialog}
    >
      <SafeAreaView accessibilityViewIsModal style={styles.backdrop}>
        <View style={styles.confirmation}>
          <ScrollView contentContainerStyle={styles.confirmContent}>
            <Text role="heading" accessibilityLabel="로그아웃할까요?" style={styles.confirmTitle}>
              Sign out
            </Text>
            <Text
              accessibilityHint={`${profileName ?? 'Reader'} · local mock session`}
              style={styles.confirmDescription}
            >
              Do you really want to sign out from the Medium app?
            </Text>
            {isPending && (
              <View style={styles.feedback}>
                <ActivityIndicator color={colors.text} />
                <Text aria-live="polite" style={authStyles.secondary}>
                  로그아웃 처리 중… 취소하면 로그인 상태를 유지해요.
                </Text>
              </View>
            )}
            {hasError && (
              <Text role="alert" style={authStyles.error}>
                로그아웃하지 못했어요. 로그인 상태를 유지했어요.
              </Text>
            )}
            <View style={styles.actions}>
              <Pressable
                role="button"
                accessibilityLabel="로그아웃 취소"
                onPress={store.closeDialog}
                style={[styles.action, styles.cancelAction]}
              >
                <Text style={styles.cancelLabel}>Cancel</Text>
              </Pressable>
              <Pressable
                role="button"
                accessibilityLabel={hasError ? '로그아웃 다시 시도' : '로그아웃 확인'}
                disabled={isPending}
                accessibilityState={{ disabled: isPending, busy: isPending }}
                onPress={() => {
                  if (hasError) store.retry();
                  else void store.signOut(scenario);
                }}
                style={[styles.action, isPending && authStyles.disabled]}
              >
                <Text style={styles.destructive}>{hasError ? 'Retry' : 'Confirm'}</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
        <ScrollView style={styles.logoutMock}>
          <ScenarioPicker
            logout
            selected={scenario}
            disabled={isPending || hasError}
            onSelect={(next) => {
              if (next !== 'cancel') setScenario(next);
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

function ScenarioPicker({
  selected,
  onSelect,
  disabled,
  logout = false,
}: {
  selected: AuthScenario;
  onSelect: (value: AuthScenario) => void;
  disabled: boolean;
  logout?: boolean;
}) {
  const styles = useThemeStyles(createStyles);
  const authStyles = useThemeStyles(createAuthStyles);
  const [expanded, setExpanded] = useState(false);
  return (
    <View>
      <Pressable
        role="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded(!expanded)}
        style={authStyles.link}
      >
        <Text style={styles.scenarioLink}>모의 동작 선택 {expanded ? '접기' : '열기'}</Text>
      </Pressable>
      {expanded && (
        <View style={styles.feedback}>
          <Text style={authStyles.secondary}>실패 뒤 ‘다시 시도’는 성공하도록 구성한 예시입니다.</Text>
          <View style={styles.choices}>
            {scenarios
              .filter((item) => !logout || item.value !== 'cancel')
              .map((item) => (
                <Pressable
                  key={item.value}
                  accessibilityRole="radio"
                  accessibilityLabel={`모의 결과: ${item.label}`}
                  aria-checked={selected === item.value}
                  aria-disabled={disabled}
                  disabled={disabled}
                  accessibilityState={{ checked: selected === item.value, disabled }}
                  onPress={() => onSelect(item.value)}
                  style={[
                    styles.choice,
                    selected === item.value && styles.selected,
                    disabled && authStyles.disabled,
                  ]}
                >
                  <Text style={authStyles.buttonText}>{item.label}</Text>
                </Pressable>
              ))}
          </View>
        </View>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  authHeader: { minHeight: 72, paddingTop: 32, backgroundColor: colors.background },
  loginTop: {
    position: 'absolute',
    top: 0,
    right: 4,
    left: 24,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mockBadge: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 14, color: colors.secondaryText },
  login: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
  },
  brand: {
    fontFamily: fonts.wordmark,
    fontSize: 30,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -1.5,
    color: colors.text,
    textAlign: 'center',
  },
  headline: {
    fontFamily: fonts.serif,
    fontSize: 72,
    lineHeight: 80,
    letterSpacing: -4,
    color: colors.text,
    textAlign: 'center',
  },
  smallHeadline: { fontSize: 60, lineHeight: 70, letterSpacing: -3 },
  description: {
    fontFamily: fonts.sans, fontSize: 16,
    lineHeight: 24,
    color: colors.secondaryText,
    textAlign: 'center',
    marginTop: 16,
  },
  providers: { marginTop: 43, gap: 10 },
  providerTarget: { minHeight: 48, justifyContent: 'center' },
  providerPill: {
    minHeight: 42,
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.text,
    justifyContent: 'center',
  },
  providerIcon: { position: 'absolute', left: 14 },
  providerLabel: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24, color: colors.text, textAlign: 'center' },
  joinLink: { minHeight: 48, justifyContent: 'center', marginTop: 24 },
  joinText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text, textAlign: 'center' },
  green: { color: colors.green },
  mockPanel: { marginTop: 24, gap: 16, padding: 16, backgroundColor: colors.surface, borderRadius: 8 },
  mockLabel: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.green, textAlign: 'center' },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choice: {
    flexGrow: 1,
    flexBasis: 120,
    minHeight: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    justifyContent: 'center',
  },
  selected: { borderColor: colors.text, backgroundColor: colors.input },
  feedback: { gap: 16, padding: 16 },
  scenarioLink: {
    fontFamily: fonts.sans, fontSize: 14,
    lineHeight: 22,
    color: colors.secondaryText,
    textDecorationLine: 'underline',
  },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', padding: 24 },
  confirmation: {
    maxHeight: '70%',
    width: '100%',
    maxWidth: 270,
    alignSelf: 'center',
    borderRadius: 14,
    backgroundColor: colors.input,
    overflow: 'hidden',
  },
  confirmContent: { paddingTop: 20 },
  confirmTitle: { fontFamily: fonts.sans, fontSize: 18, lineHeight: 24, fontWeight: '700', color: colors.text, textAlign: 'center' },
  confirmDescription: {
    fontFamily: fonts.sans, fontSize: 14,
    lineHeight: 17,
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 20,
  },
  actions: { flexDirection: 'row', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  action: { flex: 1, minHeight: 48, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' },
  cancelAction: { borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: colors.border },
  cancelLabel: { fontFamily: fonts.sans, fontSize: 18, lineHeight: 24, color: '#007aff', fontWeight: '600' },
  destructive: { fontFamily: fonts.sans, fontSize: 18, lineHeight: 24, color: colors.destructive },
  logoutMock: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    maxHeight: '35%',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});
