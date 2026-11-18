import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../shared/theme/tokens';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { useAuth } from './AuthProvider';
import { authStyles } from './authStyles';
import { mockUserA, mockUsers } from './data/mockUsers';
import type { AuthScenario, LogoutScenario } from './types';

const scenarios: readonly { value: AuthScenario; label: string }[] = [
  { value: 'success', label: '성공' }, { value: 'cancel', label: '사용자 취소' },
  { value: 'failure', label: '실패' }, { value: 'slow', label: '느린 성공 (4초)' },
];

type AuthDialogsProps = { profileName?: string };
type LogoutDialogProps = { profileName?: string };

export function AuthDialogs({ profileName }: AuthDialogsProps) {
  const { state } = useAuth();
  const wasOpen = useRef(false);
  useEffect(() => {
    if (state.dialog) { wasOpen.current = true; return; }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    const frame = requestAnimationFrame(restoreModalFocus);
    return () => cancelAnimationFrame(frame);
  }, [state.dialog]);
  if (state.dialog?.kind === 'login') return <LoginDialog />;
  if (state.dialog?.kind === 'logout') return <LogoutDialog profileName={profileName} />;
  return null;
}

function LoginDialog() {
  const { state, store } = useAuth();
  const [userId, setUserId] = useState(mockUserA.id);
  const [scenario, setScenario] = useState<AuthScenario>('success');
  const dialog = state.dialog;
  if (dialog?.kind !== 'login') return null;
  const isPending = dialog.status === 'pending';
  const hasError = dialog.status === 'error';
  const isLocked = isPending || hasError;
  return <Modal animationType="fade" accessibilityLabel="모의 로그인" onRequestClose={store.closeDialog}>
    <SafeAreaView style={authStyles.screen}>
      <ScrollView contentContainerStyle={styles.login}>
        <Pressable role="button" accessibilityLabel="로그인 닫기" onPress={store.closeDialog}
          style={[authStyles.link, styles.close]}><Text style={authStyles.buttonText}>닫기</Text></Pressable>
        <Text style={styles.brand}>Kostolany</Text>
        <View style={styles.intro}>
          <Text role="heading" style={styles.headline}>읽고, 이해하고,{'\n'}나의 생각으로.</Text>
          <Text style={styles.description}>나의 독서와 관심을 이어가세요.</Text>
        </View>
        <Text style={styles.mockLabel}>모의 로그인 · 실제 Google 인증이 아닙니다</Text>
        <View style={styles.choices}>
          {mockUsers.map((user) => <Pressable key={user.id} accessibilityRole="radio"
            accessibilityLabel={user.name} accessibilityState={{ checked: userId === user.id, disabled: isLocked }}
            disabled={isLocked} onPress={() => setUserId(user.id)}
            style={[styles.choice, userId === user.id && styles.selected, isLocked && authStyles.disabled]}>
            <Text style={authStyles.buttonText}>{user.name}</Text>
          </Pressable>)}
        </View>
        {hasError ? <View style={styles.feedback}>
          <Text role="alert" style={authStyles.error}>로그인하지 못했어요. 선택한 독자로 다시 시도해 주세요.</Text>
          <Pressable role="button" onPress={store.retry} style={authStyles.button}>
            <Text style={authStyles.buttonText}>로그인 다시 시도</Text>
          </Pressable>
        </View> : <Pressable role="button" accessibilityLabel="Google로 로그인 (모의)"
          accessibilityState={{ disabled: isPending, busy: isPending }} disabled={isPending}
          onPress={() => { void store.signIn(userId, scenario); }}
          style={[authStyles.button, styles.google, isPending && authStyles.disabled]}>
          {isPending ? <ActivityIndicator color={colors.text} /> : <Text aria-hidden style={styles.googleMark}>G</Text>}
          <Text style={[authStyles.buttonText, styles.flexText]}>{isPending ? '로그인 처리 중…' : 'Google로 로그인 (모의)'}</Text>
        </Pressable>}
        <Text aria-live="polite" style={authStyles.secondary}>{isPending ? '닫기를 누르면 로그인 요청을 취소해요.'
          : dialog.context.kind === 'like' || dialog.context.kind === 'bookmark'
            ? '로그인 후 읽던 화면으로 돌아가요. 좋아요나 저장은 다시 눌러 주세요.'
            : '로그인 후 이 화면으로 돌아가요.'}</Text>
        <ScenarioPicker selected={scenario} onSelect={setScenario} disabled={isLocked} />
      </ScrollView>
    </SafeAreaView>
  </Modal>;
}

function LogoutDialog({ profileName }: LogoutDialogProps) {
  const { state, store } = useAuth();
  const [scenario, setScenario] = useState<LogoutScenario>('success');
  const dialog = state.dialog;
  if (dialog?.kind !== 'logout') return null;
  const isPending = dialog.status === 'pending';
  const hasError = dialog.status === 'error';
  return <Modal transparent animationType="fade" accessibilityLabel="로그아웃 확인" onRequestClose={store.closeDialog}>
    <SafeAreaView style={styles.backdrop}>
      <View accessibilityViewIsModal style={styles.confirmation}>
        <ScrollView contentContainerStyle={styles.confirmContent}>
          <Text role="heading" style={styles.confirmTitle}>로그아웃할까요?</Text>
          <Text style={authStyles.text}>{profileName ?? '로그인한 독자'}의 프로필·좋아요와 저장 목록은 이 앱을 새로고침하거나 종료하기 전까지 남아 있어요.</Text>
          {isPending && <View style={styles.feedback}><ActivityIndicator color={colors.text} />
            <Text aria-live="polite" style={authStyles.secondary}>로그아웃 처리 중… 취소하면 로그인 상태를 유지해요.</Text></View>}
          {hasError && <Text role="alert" style={authStyles.error}>로그아웃하지 못했어요. 로그인 상태를 유지했어요.</Text>}
          <View style={styles.actions}>
            <Pressable role="button" onPress={store.closeDialog} style={[authStyles.button, styles.action]}>
              <Text style={authStyles.buttonText}>로그아웃 취소</Text>
            </Pressable>
            <Pressable role="button" disabled={isPending} accessibilityState={{ disabled: isPending, busy: isPending }}
              onPress={() => { if (hasError) store.retry(); else void store.signOut(scenario); }}
              style={[authStyles.button, styles.action, isPending && authStyles.disabled]}>
              <Text style={[authStyles.buttonText, styles.destructive]}>{hasError ? '로그아웃 다시 시도' : '로그아웃 확인'}</Text>
            </Pressable>
          </View>
          <ScenarioPicker logout selected={scenario} disabled={isPending || hasError}
            onSelect={(next) => { if (next !== 'cancel') setScenario(next); }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  </Modal>;
}

function ScenarioPicker({ selected, onSelect, disabled, logout = false }: {
  selected: AuthScenario; onSelect: (value: AuthScenario) => void; disabled: boolean; logout?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return <View>
    <Pressable role="button" accessibilityState={{ expanded }} onPress={() => setExpanded(!expanded)} style={authStyles.link}>
      <Text style={styles.scenarioLink}>모의 동작 선택 {expanded ? '접기' : '열기'}</Text>
    </Pressable>
    {expanded && <View style={styles.feedback}>
      <Text style={authStyles.secondary}>실패 뒤 ‘다시 시도’는 성공하도록 구성한 예시입니다.</Text>
      <View style={styles.choices}>
        {scenarios.filter((item) => !logout || item.value !== 'cancel').map((item) => (
          <Pressable key={item.value} accessibilityRole="radio" accessibilityLabel={`모의 결과: ${item.label}`}
            disabled={disabled} accessibilityState={{ checked: selected === item.value, disabled }}
            onPress={() => onSelect(item.value)} style={[styles.choice, selected === item.value && styles.selected,
              disabled && authStyles.disabled]}><Text style={authStyles.buttonText}>{item.label}</Text></Pressable>
        ))}
      </View>
    </View>}
  </View>;
}

const styles = StyleSheet.create({
  login: { flexGrow: 1, width: '100%', maxWidth: 520, alignSelf: 'center', paddingHorizontal: 24,
    paddingTop: 8, paddingBottom: 32, gap: 20 },
  close: { alignSelf: 'flex-end', alignItems: 'center' },
  brand: { fontSize: 30, lineHeight: 40, fontWeight: '700', color: colors.text, textAlign: 'center' },
  intro: { paddingVertical: 24, gap: 20 },
  headline: { fontSize: 36, lineHeight: 50, fontWeight: '600', color: colors.text, textAlign: 'center' },
  description: { fontSize: 18, lineHeight: 28, color: colors.secondaryText, textAlign: 'center' },
  mockLabel: { fontSize: 14, lineHeight: 22, color: '#146b0d', textAlign: 'center' },
  google: { flexDirection: 'row', gap: 12 },
  googleMark: { fontSize: 22, lineHeight: 28, fontWeight: '700', color: colors.text },
  flexText: { flexShrink: 1 },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  choice: { flexGrow: 1, flexBasis: 120, minHeight: 48, padding: 12, borderWidth: 1,
    borderColor: colors.border, borderRadius: 12, justifyContent: 'center' },
  selected: { borderColor: colors.text, backgroundColor: '#f2f2f2' },
  feedback: { gap: 16 },
  scenarioLink: { fontSize: 14, lineHeight: 22, color: colors.secondaryText, textDecorationLine: 'underline' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', padding: 24 },
  confirmation: { maxHeight: '92%', width: '100%', maxWidth: 420, alignSelf: 'center',
    borderRadius: 16, backgroundColor: colors.background, overflow: 'hidden' },
  confirmContent: { padding: 24, gap: 24 },
  confirmTitle: { fontSize: 22, lineHeight: 30, fontWeight: '700', color: colors.text, textAlign: 'center' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  action: { flexGrow: 1, flexBasis: 120 },
  destructive: { color: '#a52a2a' },
});
