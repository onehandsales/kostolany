import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { ProfileEditorSheet } from './ProfileEditorSheet';
import { useProfile } from './ProfileProvider';
import { profileStyles as styles } from './profileStyles';

type ProfileScreenProps = { accountLabel: string; onLogout: () => void; isFocused: boolean; onOpenSettings?: () => void };

export function ProfileScreen({ accountLabel, onLogout, isFocused, onOpenSettings }: ProfileScreenProps) {
  const { state, store } = useProfile();
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
  const profile = state.profile;
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <Text role="heading" style={[styles.title, styles.grow]}>프로필</Text>
        {onOpenSettings && <Pressable role="button" accessibilityLabel="설정 열기" onPress={onOpenSettings} style={styles.headerAction}>
          <Text style={styles.buttonText}>설정</Text>
        </Pressable>}
      </View>
      <Text style={styles.secondary}>모의 로그인 · 실제 Google 계정과 연결되지 않아요.</Text>
      <Text style={styles.secondary}>모의 계정: {accountLabel}</Text>
      {state.readStatus === 'loading' && <View style={styles.group}>
        <ActivityIndicator /><Text aria-live="polite" style={styles.secondary}>프로필을 불러오는 중…</Text>
      </View>}
      {state.readStatus === 'error' && <View style={styles.group}>
        <Text role="alert" style={styles.error}>프로필을 불러오지 못했어요.</Text>
        <Pressable role="button" onPress={() => { void store.reload(); }} style={styles.button}>
          <Text style={styles.buttonText}>프로필 조회 다시 시도</Text>
        </Pressable>
      </View>}
      {profile && <>
        <View style={styles.identity}>
          <View aria-hidden style={styles.avatar} />
          <Text role="heading" style={styles.name}>{profile.name}</Text>
        </View>
        <Text style={styles.secondary}>{profile.name} · 로그인됨</Text>
        <Pressable role="button" onPress={() => setIsEditing(true)} style={styles.button}>
          <Text style={styles.buttonText}>프로필 편집</Text>
        </Pressable>
        <View style={styles.section}>
          <Text style={styles.label}>짧은 소개</Text>
          <Text style={profile.bio ? styles.bio : styles.secondary}>{profile.bio || '아직 짧은 소개가 없어요.'}</Text>
        </View>
      </>}
      {state.isSaving && <Text aria-live="polite" style={styles.secondary}>제출한 프로필을 저장하는 중…</Text>}
      {state.hasSaveError && !isEditing && <Text role="alert" style={styles.error}>
        제출한 프로필을 저장하지 못했어요. 편집을 열어 다시 입력해 주세요.
      </Text>}
      <View style={styles.section}>
        <Text style={styles.secondary}>좋아요와 저장 목록은 이 독자의 공간에 보관돼요.</Text>
        <Pressable role="button" onPress={onLogout} style={styles.button}><Text style={styles.buttonText}>로그아웃</Text></Pressable>
      </View>
    </ScrollView>
    {isEditing && isFocused && profile && <ProfileEditorSheet initialProfile={profile} store={store} onClose={() => setIsEditing(false)} />}
  </SafeAreaView>;
}
