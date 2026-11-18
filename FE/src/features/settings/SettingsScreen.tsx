import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../../shared/theme/tokens';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { explanationLevelLabels } from '../article/explanationTypes';
import { DefaultLevelSheet } from './DefaultLevelSheet';
import { useReadingSettings } from './ReadingSettingsProvider';
import { settingsStyles as styles } from './settingsStyles';

type SettingsScreenProps = { onBack: () => void; onLogout: () => void; isFocused: boolean };

export function SettingsScreen({ onBack, onLogout, isFocused }: SettingsScreenProps) {
  const { state, store } = useReadingSettings();
  const [isEditing, setIsEditing] = useState(false);
  const wasEditing = useRef(false);
  useEffect(() => {
    if (isEditing) { wasEditing.current = true; return; }
    if (!wasEditing.current) return;
    wasEditing.current = false;
    const frame = requestAnimationFrame(restoreModalFocus);
    return () => cancelAnimationFrame(frame);
  }, [isEditing]);
  if (!isFocused && isEditing) setIsEditing(false);
  if (!store) return null;
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <View style={styles.header}>
      <Pressable role="button" accessibilityLabel="프로필로 돌아가기" onPress={onBack} style={styles.action}>
        <Svg width={24} height={24} viewBox="0 0 24 24" aria-hidden accessible={Platform.OS === 'web' ? undefined : false}>
          <Path d="M15 4 7 12 15 20" fill="none" stroke={colors.text} strokeWidth={2} />
        </Svg>
      </Pressable>
      <Text role="heading" style={styles.title}>설정</Text>
      <View aria-hidden style={styles.headerSpace} />
    </View>
    <ScrollView contentContainerStyle={styles.page}>
      <Text role="heading" style={styles.section}>읽기 설정</Text>
      {state.readStatus === 'loading' && <View style={styles.group}>
        <ActivityIndicator /><Text aria-live="polite" style={styles.secondary}>설정을 불러오는 중…</Text>
      </View>}
      {state.readStatus === 'error' && <View style={styles.group}>
        <Text role="alert" style={styles.error}>설정을 불러오지 못했어요.</Text>
        <Pressable role="button" onPress={() => { void store.reload(); }} style={styles.button}>
          <Text style={styles.text}>설정 조회 다시 시도</Text>
        </Pressable>
      </View>}
      {state.settings && <Pressable role="button" accessibilityLabel="기본 설명 수준 변경"
        accessibilityValue={{ text: explanationLevelLabels[state.settings.defaultLevel] }}
        onPress={() => setIsEditing(true)} style={styles.row}>
        <View style={styles.rowContent}>
          <Text style={styles.text}>기본 설명 수준</Text>
          <Text style={styles.secondary}>현재 기본값 · {explanationLevelLabels[state.settings.defaultLevel]}</Text>
        </View>
        <Text aria-hidden style={styles.secondary}>›</Text>
      </Pressable>}
      <View style={styles.group}>
        <Text style={styles.secondary}>기본값은 다음 기사 진입에 적용돼요. 열려 있는 기사의 선택은 유지돼요.</Text>
        {state.isSaving && <Text aria-live="polite" style={styles.secondary}>제출한 기본 수준을 저장하는 중…</Text>}
        {state.hasSaveError && !isEditing && <Text role="alert" style={styles.error}>
          제출한 기본 수준을 저장하지 못했어요. 변경을 열어 다시 선택해 주세요.
        </Text>}
      </View>
      <Text role="heading" style={styles.section}>계정</Text>
      <Pressable role="button" onPress={onLogout} style={styles.row}><Text style={styles.text}>로그아웃</Text></Pressable>
      <View style={styles.group}><Text style={styles.secondary}>모의 계정의 설정이에요. 앱을 다시 실행하거나 새로고침하면 초기값으로 돌아가요.</Text></View>
    </ScrollView>
    {isEditing && isFocused && state.settings && <DefaultLevelSheet initialLevel={state.settings.defaultLevel}
      store={store} onClose={() => setIsEditing(false)} />}
  </SafeAreaView>;
}
