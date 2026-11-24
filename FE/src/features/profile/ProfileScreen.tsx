import { useRelationships } from '../community/RelationshipProvider';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { WriteButton } from '../../shared/ui/WriteButton';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';

import { ProfileLists } from './ProfileLists';
import { ProfileStories } from './ProfileStories';
import { useOnboarding } from '../onboarding/OnboardingProvider';
import { EditorDialog } from '../editor/StoryEditorScreen';
import { ProfileEditorSheet } from './ProfileEditorSheet';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfile } from './ProfileProvider';
import { profileStyles as createStyles } from './profileStyles';

type ProfileScreenProps = {
  accountLabel: string;
  onLogout: () => void;
  isFocused: boolean;
  onOpenSettings?: () => void;
  onOpenList?: (listId: string, reorder?: boolean) => void;
  onOpenStats?: () => void;
};

export function ProfileScreen({
  accountLabel,
  onLogout,
  isFocused,
  onOpenSettings,
  onOpenList,
  onOpenStats,
}: ProfileScreenProps) {
  const visual = useThemeStyles(createVisual);
  const relationships = useRelationships();
  const onboarding = useOnboarding();
  const community = useCommunityNavigation();
  const followingCount = relationships.state?.relationships.filter(item => item.following).length ?? 0;
  const styles = useThemeStyles(createStyles);
  const { state, store } = useProfile();
  const [section, setSection] = useState<'Stories' | 'Lists' | 'About'>('Stories');
  const [visibility, setVisibility] = useState<'public' | 'unlisted'>('public');
  const [filterOpen, setFilterOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const editButton = useRef<View>(null);
  const wasEditing = useRef(false);
  useEffect(() => {
    if (isEditing) {
      wasEditing.current = true;
      return;
    }
    if (!wasEditing.current) return;
    wasEditing.current = false;
    const frame = requestAnimationFrame(() => {
      if (isFocused) editButton.current?.focus();
      restoreModalFocus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isEditing, isFocused]);
  if (!isFocused && isEditing) setIsEditing(false);
  if (!isFocused && notice) setNotice(null);
  if (!isFocused && filterOpen) setFilterOpen(false);
  if (!store) return null;
  const profile = state.profile;
  const header = (
    <>
      <View style={visual.header}>
        {onOpenSettings && (
          <IconButton
            icon="settings"
            label="설정 열기"
            onPress={onOpenSettings}
            size={20}
            style={visual.settings}
          />
        )}
      </View>
      {state.readStatus === 'loading' && (
        <View style={styles.group}>
          <ActivityIndicator />
          <Text aria-live="polite" style={styles.secondary}>
            프로필을 불러오는 중…
          </Text>
        </View>
      )}
      {state.readStatus === 'error' && (
        <View style={styles.group}>
          <Text role="alert" style={styles.error}>
            프로필을 불러오지 못했어요.
          </Text>
          <Pressable
            role="button"
            onPress={() => {
              void store.reload();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>프로필 조회 다시 시도</Text>
          </Pressable>
        </View>
      )}
      {profile && (
        <>
          <View style={visual.identity}>
            <ProfileAvatar userId={profile.userId} size={56} />
            <View style={visual.grow}>
              <View style={visual.nameRow}>
              <Text role="heading" style={visual.name}>
                {profile.name}
              </Text>
              {!!profile.pronouns?.length && <Text style={styles.secondary}>{profile.pronouns.join('/')}</Text>}
              </View>
              <View style={visual.relationships}>
                <Pressable role="button" accessibilityLabel="My followers" onPress={() => community.openConnections(null, 'followers')} style={visual.followers}>
                  <Text style={visual.caption}>0 followers</Text>
                </Pressable>
                <Text style={visual.caption}>·</Text>
                <Pressable role="button" accessibilityLabel="My following" onPress={() => community.openConnections(null, 'following')} style={visual.followers}>
                  <Text style={visual.caption}>{relationships.state?.status === 'ready' ? followingCount : '—'} following</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={visual.actions}>
            <Pressable role="button" onPress={onOpenStats} disabled={!onOpenStats} style={visual.action}>
              <View style={[visual.pill, visual.dark]}>
                <Text style={[visual.buttonText, visual.white]}>View stats</Text>
              </View>
            </Pressable>
            <Pressable
              ref={editButton}
              role="button"
              accessibilityLabel="프로필 편집"
              onPress={() => setIsEditing(true)}
              style={visual.action}
            >
              <View style={visual.pill}>
                <Text style={visual.buttonText}>Edit your profile</Text>
              </View>
            </Pressable>
          </View>
          {onboarding.canResume && <Pressable role="button" accessibilityLabel="온보딩 이어서 하기"
            style={visual.action} onPress={() => onboarding.session?.open()}>
            <Text style={visual.caption}>Continue setup</Text>
          </Pressable>}
          <View style={visual.tabs}>
            {(['Stories', 'Lists', 'About'] as const).map((tab) => (
              <Pressable
                key={tab}
                role="tab"
                aria-selected={section === tab}
                onPress={() => setSection(tab)}
                style={visual.tab}
              >
                <View style={[visual.tabLabel, section === tab && visual.activeTab]}>
                  <Text style={visual.caption}>{tab}</Text>
                </View>
              </Pressable>
            ))}
          </View>
          {section === 'Stories' && (
            <View style={visual.stories}>
              <Pressable
                role="button"
                accessibilityLabel={visibility === 'public' ? 'Public stories' : 'Unlisted stories'}
                onPress={() => setFilterOpen(true)}
                style={visual.filterTarget}
              >
                <View style={visual.filter}>
                  <Text style={visual.caption}>{visibility === 'public' ? 'Public' : 'Unlisted'}</Text>
                  <View style={visual.downChevron}>
                    <AppIcon name="chevron" size={14} />
                  </View>
                </View>
              </Pressable>
              <Pressable role="button" accessibilityLabel="내 초안" style={visual.textAction} onPress={community.openDrafts}>
                <Text style={visual.green}>Drafts</Text>
              </Pressable>
            </View>
          )}
          {section === 'About' && (
            <View style={visual.about}>
              {profile.bio ? (
                <><Text style={visual.bio}>{profile.bio}</Text><Text style={visual.member}>Medium member since June 2025</Text></>
              ) : (
                <View style={visual.empty}>
                  <Text accessibilityLabel="아직 짧은 소개가 없어요." style={visual.caption}>
                    You haven’t added any information here yet
                  </Text>
                  <Text style={visual.member}>Medium member since June 2025</Text>
                  <Pressable role="button" onPress={() => setIsEditing(true)} style={visual.textAction}>
                    <Text style={visual.green}>Add a short bio</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        </>
      )}
    </>
  );
  const footer = (
    <View style={visual.mockInfo}>
      <Text style={styles.secondary}>모의 로그인 · 실제 Google 계정과 연결되지 않아요.</Text>
      <Text style={styles.secondary}>모의 계정: {accountLabel}</Text>
      {profile && <Text style={styles.secondary}>{profile.name} · 로그인됨</Text>}
      <Text style={styles.secondary}>
        팔로우는 이 모의 계정의 상태이며 Member 시작 월은 원본 화면 예시입니다.
      </Text>
      {state.isSaving && (
        <Text aria-live="polite" style={styles.secondary}>
          제출한 프로필을 저장하는 중…
        </Text>
      )}
      {state.hasSaveError && !isEditing && (
        <Text role="alert" style={styles.error}>
          제출한 프로필을 저장하지 못했어요. 편집을 열어 다시 입력해 주세요.
        </Text>
      )}
      <View style={styles.section}>
        <Text style={styles.secondary}>박수와 저장 목록은 이 독자의 공간에 보관돼요.</Text>
        <Pressable role="button" onPress={onLogout} style={styles.button}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      {section === 'Lists' && profile ? (
        <ProfileLists
          active={isFocused}
          onOpenList={onOpenList ?? (() => setNotice('Lists'))}
          header={header}
          footer={footer}
          contentContainerStyle={visual.page}
        />
      ) : section === 'Stories' && profile ? (
        <ProfileStories userId={profile.userId} visibility={visibility} active={isFocused} header={header} footer={footer} contentContainerStyle={visual.page} />
      ) : (
        <ScrollView contentContainerStyle={visual.page}>
          {header}
          {footer}
        </ScrollView>
      )}
      {section === 'Stories' && <WriteButton onPress={community.openWrite} />}
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
      {filterOpen && <EditorDialog title="Story visibility" onClose={() => setFilterOpen(false)}>
        {(['public', 'unlisted'] as const).map(item => <Pressable key={item} role="radio" accessibilityLabel={item === 'public' ? 'Public' : 'Unlisted'} accessibilityState={{ checked: visibility === item }} aria-checked={visibility === item} style={visual.textAction} onPress={() => { setVisibility(item); setFilterOpen(false); }}><Text style={visual.caption}>{item === 'public' ? 'Public' : 'Unlisted'}</Text></Pressable>)}
        <Pressable role="button" accessibilityLabel="Stories 필터 닫기" style={visual.textAction} onPress={() => setFilterOpen(false)}><Text style={visual.green}>Cancel</Text></Pressable>
      </EditorDialog>}
      {isEditing && isFocused && profile && (
        <ProfileEditorSheet initialProfile={profile} store={store} onClose={() => setIsEditing(false)} />
      )}
    </SafeAreaView>
  );
}

const createVisual = (colors: ThemeColors) => StyleSheet.create({
  page: { flexGrow: 1, width: '100%', maxWidth: 680, alignSelf: 'center', paddingBottom: 32 },
  // 설정 버튼의 부모도 전체 터치 높이를 확보하고 본문 시작 위치는 유지한다.
  header: { minHeight: 48, marginBottom: -24, zIndex: 1 },
  settings: { position: 'absolute', right: 12, top: 0 },
  identity: { marginHorizontal: 24, marginTop: 12, flexDirection: 'row', gap: 16, alignItems: 'center' },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.input,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  grow: { flex: 1 },
  nameRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 },
  name: { flexShrink: 1, maxWidth: '100%', fontFamily: fonts.sans, fontSize: 24, lineHeight: 30, fontWeight: '600', color: colors.text },
  relationships: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', columnGap: 4 },
  followers: { minHeight: 48, minWidth: 48, justifyContent: 'center', marginVertical: -8 },
  caption: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
  actions: { marginHorizontal: 24, marginTop: 16, flexDirection: 'row', gap: 8 },
  action: { flex: 1, minHeight: 48, justifyContent: 'center' },
  pill: {
    minHeight: 38,
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  dark: { backgroundColor: colors.text },
  white: { color: colors.onInverse },
  buttonText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text, textAlign: 'center' },
  tabs: {
    flexDirection: 'row',
    gap: 24,
    paddingHorizontal: 24,
    marginTop: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tab: {
    minHeight: 48,
    minWidth: 48,
    marginHorizontal: -10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  tabLabel: { minHeight: 48, justifyContent: 'center' },
  activeTab: { borderBottomWidth: 1, borderBottomColor: colors.text },
  downChevron: { transform: [{ rotate: '90deg' }] },
  stories: { marginHorizontal: 24 },
  filterTarget: { minHeight: 48, justifyContent: 'center', marginTop: 20, marginBottom: 16 },
  filter: {
    minHeight: 38,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  empty: {
    minHeight: 118,
    padding: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  textAction: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
  green: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.green },
  about: { marginHorizontal: 24, marginTop: 24 },
  bio: { fontFamily: fonts.serif, fontSize: 17, lineHeight: 28, color: colors.text },
  member: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText, marginTop: 24 },
  mockInfo: { marginTop: 360, paddingHorizontal: 24, gap: 16 },
});
