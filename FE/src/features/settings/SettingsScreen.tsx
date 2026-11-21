import { useReturnFocus } from '../../shared/ui/useReturnFocus';
import { useAccountFacebook } from './SettingsServicesProvider';
import { settingsDestinations } from './settingsDestinations';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { ProviderIcon } from '../../shared/ui/ProviderIcon';
import type { SettingsDetail } from './SettingsExtrasScreen';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';

import { MembershipSheet } from '../membership/MembershipSheet';
import { useMembership } from '../membership/MembershipProvider';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { ProfileEditorSheet } from '../profile/ProfileEditorSheet';
import { useProfile } from '../profile/ProfileProvider';
import { explanationLevelLabels } from '../article/explanationTypes';

import { DefaultLevelSheet } from './DefaultLevelSheet';
import { useReadingSettings } from './ReadingSettingsProvider';
import { useDisplaySettings } from './DisplaySettingsProvider';
import { DisplaySettingsFeedback } from './DisplaySettingsFeedback';
import { settingsStyles as createStyles } from './settingsStyles';

type SettingsScreenProps = { onBack: () => void; onLogout: () => void; isFocused: boolean; onOpenStats?: () => void; onOpenDetail?: (page: SettingsDetail) => void };

export function SettingsScreen({ onBack, onLogout, isFocused, onOpenStats, onOpenDetail }: SettingsScreenProps) {
  const openWithFocus = useReturnFocus(isFocused);
  const facebook = useAccountFacebook();
  const display = useDisplaySettings();
  const visual = useThemeStyles(createVisual);
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const { state, store } = useReadingSettings();
  const profile = useProfile();
  const [editing, setEditing] = useState<'level' | 'profile' | null>(null);
  const community = useCommunityNavigation();
  const membership = useMembership();
  const [showMembership, setShowMembership] = useState(false);
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
  if (!isFocused && showMembership) setShowMembership(false);
  if (!store) return null;
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={visual.header}>
        <IconButton icon="back" label="프로필로 돌아가기" onPress={onBack} size={20} style={visual.back} />
        <Text role="heading" accessibilityLabel="설정" style={visual.title}>
          Settings
        </Text>
        <View style={visual.headerSpace} />
      </View>
      {showMembership && <MembershipSheet onClose={() => setShowMembership(false)} />}
      <ScrollView contentContainerStyle={styles.page}>
        <Text role="heading" style={[visual.section, visual.firstSection]}>
          Account
        </Text>
        <SettingsRow
          title="Become a Friend of Medium"
          onPress={() => setShowMembership(true)}
          trailing={<AppIcon name="friend" size={20} color={colors.gold} />}
        />
        <SettingsRow title="Story stats" onPress={() => openWithFocus(() => onOpenStats?.())} chevron />
        <SettingsRow title="Account" onPress={() => openWithFocus(() => onOpenDetail?.('account'))} />
        <SettingsRow title="Membership and payment" onPress={() => setShowMembership(true)}
          trailing={<Text accessibilityLabel="현재 멤버십 상태" style={{ color: colors.secondaryText, fontSize: 12 }}>Mock: {membership?.tier ?? 'free'}</Text>} />
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
              <Text style={styles.text}>프로필 조회 다시 시도</Text>
            </Pressable>
          </View>
        )}
        <SettingsRow
          title="Refine recommendations"
          onPress={() => community.openRecommendations('Following')}
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
                accessibilityLabel={`앱 테마: ${option}`}
                aria-pressed={display.state.settings.appTheme === ['system', 'light', 'dark'][index]}
                accessibilityState={{
                  selected: display.state.settings.appTheme === ['system', 'light', 'dark'][index],
                }}
                onPress={() =>
                  display.store?.update({ appTheme: (['system', 'light', 'dark'] as const)[index] })
                }
                style={visual.segmentTarget}
              >
                <View
                  style={[
                    visual.segment,
                    display.state.settings.appTheme === ['system', 'light', 'dark'][index] &&
                      visual.selectedSegment,
                  ]}
                >
                  <Text
                    style={[
                      visual.segmentText,
                      display.state.settings.appTheme === ['system', 'light', 'dark'][index] &&
                        visual.selectedText,
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <DisplaySettingsFeedback />
        <SettingsRow title="Push notifications" onPress={() => community.openNotificationSettings?.('push')} chevron />
        <SettingsRow title="Email notifications" onPress={() => community.openNotificationSettings?.('email')} chevron />
        <SettingsRow title="Custom app icon" onPress={() => openWithFocus(() => onOpenDetail?.('icons'))} chevron />
        <Text role="heading" style={visual.section}>
          Social
        </Text>
        <Pressable
          role="button"
          accessibilityLabel="Connect Facebook"
          onPress={() => openWithFocus(() => onOpenDetail?.('social'))}
          style={visual.row}
        >
          <ProviderIcon provider="Facebook" />
          <Text style={[visual.text, visual.grow]}>Facebook</Text>
          <Text style={visual.green}>{facebook ? 'Connected (mock)' : 'Connect'}</Text>
        </Pressable>
        <Text style={visual.socialHint}>We will never post to Facebook without your permission.</Text>
        <Text role="heading" style={visual.section}>
          About Medium
        </Text>
        {(['help', 'terms', 'privacy', 'rate'] as const).map((destination) => (
          <SettingsRow key={destination} title={settingsDestinations[destination].title} onPress={() => openWithFocus(() => onOpenDetail?.(destination))} />
        ))}
        <Text role="heading" style={visual.section}>
          App Controls
        </Text>
        <SettingsRow title="More app controls" onPress={() => openWithFocus(() => onOpenDetail?.('controls'))} chevron />
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
  const { colors } = useTheme();
  const visual = useThemeStyles(createVisual);
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
      {chevron && <AppIcon name="chevron" size={16} color={colors.secondaryText} />}
    </Pressable>
  );
}
const createVisual = (colors: ThemeColors) =>
  StyleSheet.create({
    header: {
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    title: {
      flex: 1,
      alignSelf: 'flex-start',
      paddingTop: 8,
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '700',
      textAlign: 'center',
      color: colors.text,
    },
    headerSpace: { width: 48 },
    back: { paddingBottom: 14 },
    firstSection: { paddingTop: 17, paddingBottom: 11 },
    section: {
      paddingHorizontal: 16,
      paddingTop: 25,
      paddingBottom: 13,
      backgroundColor: colors.section,
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '600',
      color: colors.text,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.divider,
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
      borderBottomColor: colors.divider,
    },
    grow: { flexGrow: 1, flexShrink: 1 },
    text: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
    green: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.green },
    segments: { flexDirection: 'row', position: 'relative', borderRadius: 8, flexWrap: 'wrap' },
    segmentBackground: {
      position: 'absolute',
      top: 9,
      bottom: 9,
      left: 0,
      right: 0,
      backgroundColor: colors.segment,
      borderRadius: 8,
    },
    segmentTarget: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
    segment: { minHeight: 30, paddingHorizontal: 8, justifyContent: 'center', borderRadius: 6 },
    selectedSegment: { backgroundColor: colors.selectedSurface, borderWidth: 1, borderColor: colors.border },
    segmentText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, color: colors.text },
    selectedText: { fontWeight: '600' },
    socialHint: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
      backgroundColor: colors.section,
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    version: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.secondaryText,
      backgroundColor: colors.section,
      padding: 16,
    },
  });
