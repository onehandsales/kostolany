import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { ProviderIcon } from '../../shared/ui/ProviderIcon';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { ProfileEditorSheet } from '../profile/ProfileEditorSheet';
import { useProfile } from '../profile/ProfileProvider';
import { colors } from '../../shared/theme/tokens';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { explanationLevelLabels } from '../article/explanationTypes';
import { DefaultLevelSheet } from './DefaultLevelSheet';
import { useReadingSettings } from './ReadingSettingsProvider';
import { settingsStyles as styles } from './settingsStyles';

type SettingsScreenProps = { onBack: () => void; onLogout: () => void; isFocused: boolean };

export function SettingsScreen({ onBack, onLogout, isFocused }: SettingsScreenProps) {
  const { state, store } = useReadingSettings();
  const profile = useProfile();
  const [editing, setEditing] = useState<'level' | 'profile' | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const isEditing = editing !== null;
  const wasEditing = useRef(false);
  useEffect(() => {
    if (isEditing) {
      wasEditing.current = true;
      return;
    }
    if (!wasEditing.current) return;
    wasEditing.current = false;
    const frame = requestAnimationFrame(restoreModalFocus);
    return () => cancelAnimationFrame(frame);
  }, [isEditing]);
  if (!isFocused && isEditing) setEditing(null);
  if (!isFocused && notice) setNotice(null);
  if (!store) return null;
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={visual.header}>
        <IconButton icon="back" label="프로필로 돌아가기" onPress={onBack} size={20} />
        <Text role="heading" accessibilityLabel="설정" style={visual.title}>
          Settings
        </Text>
        <View style={visual.headerSpace} />
      </View>
      <ScrollView contentContainerStyle={styles.page}>
        <Text role="heading" style={visual.section}>
          Account
        </Text>
        <SettingsRow
          title="Become a Friend of Medium"
          onPress={() => setNotice('Membership')}
          trailing={<AppIcon name="star" size={20} color={colors.gold} />}
        />
        <SettingsRow title="Story stats" onPress={() => setNotice('Story stats')} chevron />
        <SettingsRow title="Account" onPress={() => setNotice('Account')} />
        <SettingsRow title="Membership and payment" onPress={() => setNotice('Membership and payment')} />
        <Text role="heading" style={visual.section}>
          Configure Medium
        </Text>
        <SettingsRow
          title="Edit profile"
          label="설정에서 프로필 편집"
          onPress={() => setEditing('profile')}
          disabled={!profile.state.profile}
        />
        {profile.state.readStatus === 'error' && (
          <View style={styles.group}>
            <Text role="alert" style={styles.error}>
              프로필을 불러오지 못했어요.
            </Text>
            <Pressable
              role="button"
              onPress={() => {
                void profile.store?.reload();
              }}
              style={styles.button}
            >
              <Text>프로필 조회 다시 시도</Text>
            </Pressable>
          </View>
        )}
        <SettingsRow
          title="Refine recommendations"
          onPress={() => setNotice('Refine recommendations')}
          chevron
        />
        <View style={visual.row}>
          <Text style={[visual.text, visual.grow]}>Appearance</Text>
          <View style={visual.segments}>
            <View aria-hidden style={visual.segmentBackground} />
            {['System default', 'Light', 'Dark'].map((option, index) => (
              <Pressable
                key={option}
                role="button"
                accessibilityLabel={`Appearance: ${option}`}
                aria-pressed={index === 0}
                accessibilityState={{ selected: index === 0 }}
                onPress={() => setNotice('Appearance')}
                style={visual.segmentTarget}
              >
                <View style={[visual.segment, index === 0 && visual.selectedSegment]}>
                  <Text style={[visual.segmentText, index === 0 && visual.selectedText]}>{option}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <SettingsRow title="Push notifications" onPress={() => setNotice('Push notifications')} chevron />
        <SettingsRow title="Email notifications" onPress={() => setNotice('Email notifications')} chevron />
        <SettingsRow title="Custom app icon" onPress={() => setNotice('Custom app icon')} chevron />
        <Text role="heading" style={visual.section}>
          Social
        </Text>
        <Pressable
          role="button"
          accessibilityLabel="Connect Facebook"
          onPress={() => setNotice('Facebook connection')}
          style={visual.row}
        >
          <ProviderIcon provider="Facebook" />
          <Text style={[visual.text, visual.grow]}>Facebook</Text>
          <Text style={visual.green}>Connect</Text>
        </Pressable>
        <Text style={visual.socialHint}>We will never post to Facebook without your permission.</Text>
        <Text role="heading" style={visual.section}>
          About Medium
        </Text>
        {['Help', 'Terms of service', 'Privacy policy', 'Rate on the App Store'].map((title) => (
          <SettingsRow key={title} title={title} onPress={() => setNotice(title)} />
        ))}
        <Text role="heading" style={visual.section}>
          App Controls
        </Text>
        <SettingsRow title="More app controls" onPress={() => setNotice('More app controls')} chevron />
        <SettingsRow title="Sign out" label="로그아웃" onPress={onLogout} />
        <Text role="heading" style={visual.section}>
          Reading tools · local example
        </Text>
        {state.readStatus === 'loading' && (
          <View style={styles.group}>
            <ActivityIndicator />
            <Text aria-live="polite" style={styles.secondary}>
              설정을 불러오는 중…
            </Text>
          </View>
        )}
        {state.readStatus === 'error' && (
          <View style={styles.group}>
            <Text role="alert" style={styles.error}>
              설정을 불러오지 못했어요.
            </Text>
            <Pressable
              role="button"
              onPress={() => {
                void store.reload();
              }}
              style={styles.button}
            >
              <Text style={styles.text}>설정 조회 다시 시도</Text>
            </Pressable>
          </View>
        )}
        {state.settings && (
          <Pressable
            role="button"
            accessibilityLabel="기본 설명 수준 변경"
            accessibilityValue={{ text: explanationLevelLabels[state.settings.defaultLevel] }}
            onPress={() => setEditing('level')}
            style={visual.row}
          >
            <View style={styles.rowContent}>
              <Text style={styles.text}>기본 설명 수준</Text>
              <Text style={styles.secondary}>
                현재 기본값 · {explanationLevelLabels[state.settings.defaultLevel]}
              </Text>
            </View>
            <Text aria-hidden style={styles.secondary}>
              ›
            </Text>
          </Pressable>
        )}
        <View style={styles.group}>
          <Text style={styles.secondary}>
            기본값은 다음 기사 진입에 적용돼요. 열려 있는 기사의 선택은 유지돼요.
          </Text>
          {state.isSaving && (
            <Text aria-live="polite" style={styles.secondary}>
              제출한 기본 수준을 저장하는 중…
            </Text>
          )}
          {state.hasSaveError && !isEditing && (
            <Text role="alert" style={styles.error}>
              제출한 기본 수준을 저장하지 못했어요. 변경을 열어 다시 선택해 주세요.
            </Text>
          )}
        </View>
        <View style={styles.group}>
          <Text style={styles.secondary}>
            모의 계정의 설정이에요. 앱을 다시 실행하거나 새로고침하면 초기값으로 돌아가요.
          </Text>
        </View>
        <Text style={visual.version}>Local prototype · Version 0.1.0</Text>
      </ScrollView>
      {editing === 'level' && isFocused && state.settings && (
        <DefaultLevelSheet
          initialLevel={state.settings.defaultLevel}
          store={store}
          onClose={() => setEditing(null)}
        />
      )}
      {editing === 'profile' && isFocused && profile.state.profile && profile.store && (
        <ProfileEditorSheet
          initialProfile={profile.state.profile}
          store={profile.store}
          onClose={() => setEditing(null)}
        />
      )}
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </SafeAreaView>
  );
}

function SettingsRow({
  title,
  label = title,
  onPress,
  chevron = false,
  disabled = false,
  trailing,
}: {
  title: string;
  label?: string;
  onPress: () => void;
  chevron?: boolean;
  disabled?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <Pressable
      role="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={visual.row}
    >
      <Text style={[visual.text, visual.grow]}>{title}</Text>
      {trailing}
      {chevron && <AppIcon name="chevron" size={16} color="#bcbcbc" />}
    </Pressable>
  );
}
const visual = StyleSheet.create({
  header: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
  },
  headerSpace: { width: 48 },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fafafa',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.text,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  row: {
    minHeight: 51,
    paddingHorizontal: 16,
    paddingVertical: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    gap: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  grow: { flexGrow: 1, flexShrink: 1 },
  text: { fontSize: 14, lineHeight: 20, color: colors.text },
  green: { fontSize: 14, lineHeight: 20, color: '#18820f' },
  segments: { flexDirection: 'row', position: 'relative', borderRadius: 8, flexWrap: 'wrap' },
  segmentBackground: {
    position: 'absolute',
    top: 9,
    bottom: 9,
    left: 0,
    right: 0,
    backgroundColor: '#eeeef0',
    borderRadius: 8,
  },
  segmentTarget: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
  segment: { minHeight: 30, paddingHorizontal: 8, justifyContent: 'center', borderRadius: 6 },
  selectedSegment: { backgroundColor: 'white', borderWidth: 1, borderColor: '#dddddd' },
  segmentText: { fontSize: 13, lineHeight: 18, color: 'black' },
  selectedText: { fontWeight: '600' },
  socialHint: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.secondaryText,
    backgroundColor: '#fafafa',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  version: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.secondaryText,
    backgroundColor: '#fafafa',
    padding: 16,
  },
});
