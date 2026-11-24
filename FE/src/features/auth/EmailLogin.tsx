import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { FormTextInput } from '../../shared/ui/FormTextInput';
import { IconButton } from '../../shared/ui/IconButton';
import { SettingsExtrasScreen } from '../settings/SettingsExtrasScreen';
import { useAuth } from './AuthProvider';
import { createEmailAttempt } from './createEmailAttempt';
import { emailFixtures } from './emailAuthSource';
import type { AuthScenario } from './types';

const errors: Record<string, string> = {
  'fixture-required': '아래 예시 이메일과 이름을 사용해 주세요.',
  'request-failed': '모의 코드를 준비하지 못했어요. 다시 시도해 주세요.',
  'invalid-code': '모의 코드가 일치하지 않아요. 입력을 확인해 주세요.',
  'expired-code': '이 코드는 만료됐어요. 새 모의 코드를 요청해 주세요.',
  'verify-failed': '코드를 확인하지 못했어요. 입력을 유지했으니 다시 시도해 주세요.',
  'sign-in-failed': '로그인하지 못했어요. 같은 코드로 다시 시도해 주세요.',
};
export function EmailLogin({ joining, onBack, onClose, scenario, backActionRef }: { joining: boolean; onBack: () => void; onClose: () => void; scenario: AuthScenario; backActionRef: RefObject<(() => void) | null> }) {
  const { store } = useAuth(); const { colors } = useTheme();
  const [attempt] = useState(() => createEmailAttempt(store.emailSource, store, joining));
  const state = useSyncExternalStore(attempt.subscribe, attempt.getSnapshot, attempt.getSnapshot);
  const [legal, setLegal] = useState<'terms' | 'privacy' | null>(null);
  const [codeCursor, setCodeCursor] = useState(0);
  const [codeFocused, setCodeFocused] = useState(false);
  useEffect(() => attempt.activate(), [attempt]);
  const codeStage = state.stage === 'code';
  useEffect(() => {
    backActionRef.current = () => {
      if (legal) { setLegal(null); return; }
      attempt.back(); if (!codeStage) onBack();
    };
    return () => { backActionRef.current = null; };
  }, [attempt, backActionRef, codeStage, legal, onBack]);
  const enabled = !state.busy && (codeStage ? Boolean(state.challenge && /^\d{6}$/u.test(state.code)) : Boolean(state.email.trim() && (!joining || state.name.trim())));
  function submit() { if (!enabled) return; if (codeStage) void attempt.verify(state.error === 'sign-in-failed' ? 'success' : scenario); else void attempt.request(); }
  const text = { fontFamily: fonts.sans, color: colors.text, fontSize: 14, lineHeight: 20 } as const;
  if (legal) return <SettingsExtrasScreen key={legal} page={legal} active onBack={() => setLegal(null)} onOpen={() => {}} />;
  return <View style={{ flex: 1, backgroundColor: codeStage ? '#000000' : colors.background }}><KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.background, marginTop: codeStage ? 12 : 0, borderTopLeftRadius: codeStage ? 12 : 0, borderTopRightRadius: codeStage ? 12 : 0 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', minHeight: 48 }}><IconButton icon="back" label={codeStage ? '이메일 입력으로 돌아가기' : '인증 제공자로 돌아가기'} onPress={() => { attempt.back(); if (!codeStage) onBack(); }} /><IconButton icon="close" label="이메일 로그인 닫기" onPress={onClose} /></View>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: codeStage ? 32 : 24, paddingTop: codeStage ? 24 : 0, flexGrow: 1 }}>
      {!codeStage && <Text style={{ fontFamily: fonts.serif, fontWeight: '700', fontSize: 30, textAlign: 'center', color: colors.text, marginBottom: 32 }}>Medium</Text>}
      <Text role="heading" style={{ fontFamily: fonts.serif, fontSize: codeStage ? 26 : 32, textAlign: 'center', color: colors.text, marginBottom: 24 }}>{codeStage ? 'Check your inbox' : joining ? 'Sign up with email.' : 'Sign in with email.'}</Text>
      {codeStage ? <>
        <Text style={[text, { textAlign: 'center', marginBottom: 44 }]}>Enter the code we sent to{`\n${state.email.trim()} to sign ${joining ? 'up' : 'in'}.`}</Text>
        <View style={{ minHeight: 64, marginBottom: 56 }}>
          <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" aria-hidden style={{ flexDirection: 'row', marginHorizontal: 5, gap: 17 }}>
            {Array.from({ length: 6 }, (_, index) => <View key={index} style={{ flex: 1, minWidth: 0, minHeight: 54, borderRadius: 2, backgroundColor: colors.input, borderWidth: codeFocused && Math.min(codeCursor, 5) === index ? 1 : 0, borderColor: colors.text, alignItems: 'center', justifyContent: 'center' }}><Text style={[text, { fontSize: 22, lineHeight: 30, fontWeight: '600' }]}>{state.code[index] ?? ''}</Text></View>)}
          </View>
          <TextInput autoFocus accessibilityLabel="모의 인증 코드 6자리" value={state.code} onChangeText={value => attempt.input('code', value)} maxLength={6} keyboardType="number-pad" autoComplete="off" importantForAutofill="no" editable={!state.busy} caretHidden onSubmitEditing={submit}
            onFocus={() => setCodeFocused(true)} onBlur={() => setCodeFocused(false)}
            onSelectionChange={event => setCodeCursor(event.nativeEvent.selection.start)}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 64, color: 'transparent', backgroundColor: 'transparent', outlineColor: 'transparent', outlineStyle: 'solid', outlineWidth: 0 }} />
        </View>
      </> : <>
        {joining && <View style={{ marginBottom: 24 }}><Text style={text}>Your full name</Text><FormTextInput accessibilityLabel="가입 모의 이름" placeholder="예시 독자 A" value={state.name} editable={!state.busy} onChangeText={value => attempt.input('name', value)} maxLength={40} /></View>}
        <Text style={text}>Your email</Text><FormTextInput autoFocus accessibilityLabel="모의 이메일" placeholder="reader.a@example.test" value={state.email} editable={!state.busy} onChangeText={value => attempt.input('email', value)} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="off" onSubmitEditing={submit} />
      </>}
      {state.error && <Text role="alert" style={[text, { color: colors.destructive, marginVertical: 12 }]}>{errors[state.error] ?? '처리하지 못했어요. 다시 시도해 주세요.'}</Text>}
      <Pressable role="button" accessibilityLabel={codeStage ? '모의 코드 검증' : joining ? '이메일 모의 가입' : '이메일 모의 로그인 계속'} disabled={!enabled} accessibilityState={{ disabled: !enabled, busy: state.busy }} onPress={submit}
        style={{ minHeight: 48, borderRadius: 24, backgroundColor: codeStage ? colors.text : colors.green, opacity: codeStage && !enabled ? 0.4 : 1, alignItems: 'center', justifyContent: 'center', marginTop: codeStage ? 0 : 24 }}>
        <Text style={{ color: colors.onInverse, fontSize: 16 }}>{state.busy ? 'Please wait…' : codeStage ? 'Validate' : joining ? 'Create account' : 'Continue'}</Text>
      </Pressable>
      {codeStage && <Pressable role="button" accessibilityLabel="모의 코드 재전송" disabled={state.busy} accessibilityState={{ disabled: state.busy }} onPress={() => { void attempt.request(); }} style={{ minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 32 }}><Text style={[text, { textDecorationLine: 'underline' }]}>Resend code</Text></Pressable>}
      {joining && !codeStage && <View style={{ marginTop: 24 }}>
        <Text style={[text, { textAlign: 'center', color: colors.secondaryText }]}>By creating an account, you agree to Medium’s</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {(['terms', 'privacy'] as const).map(page => <Pressable key={page} role="link" disabled={state.busy} accessibilityState={{ disabled: state.busy }}
            onPress={() => setLegal(page)} style={{ minHeight: 48, justifyContent: 'center' }}>
            <Text style={[text, { textDecorationLine: 'underline' }]}>{page === 'terms' ? 'Terms of Service' : 'Privacy Policy'}</Text>
          </Pressable>)}
        </View>
        <Text style={[text, { color: colors.secondaryText }]}>원본 서비스의 참고 링크예요. 이 모의 가입은 실제 계정 생성이나 약관 동의가 아니에요.</Text>
      </View>}
      <View style={{ marginTop: 32, gap: 12 }}>
        <Text style={[text, { color: colors.secondaryText }]}>MOCK · 실제 이메일을 보내지 않아요. 실제 개인정보나 인증 코드를 입력하지 마세요.</Text>
        {codeStage ? <Text accessibilityLiveRegion="polite" style={text}>{state.challenge ? `모의 코드: ${state.challenge.mockCode} · 5분 동안 유효` : '새 모의 코드를 요청해 주세요.'}</Text> : emailFixtures.map(item => <Pressable key={item.userId} role="button" accessibilityLabel={`${item.name} 이메일 예시 사용`} disabled={state.busy} onPress={() => { attempt.input('name', item.name); attempt.input('email', item.email); }} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={[text, { color: colors.green }]}>{item.name} · {item.email}</Text></Pressable>)}
        {joining && <Text style={[text, { color: colors.secondaryText }]}>예시 A/B 계정으로 가입 흐름을 확인해요. 새 계정을 만들거나 기존 프로필 이름을 바꾸지 않아요.</Text>}
      </View>
    </ScrollView>
  </KeyboardAvoidingView></View>;
}
