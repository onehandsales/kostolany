import { useSettingsReturnFocus } from './useSettingsReturnFocus';
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { useAuth } from '../auth/AuthProvider';
import { emailFixtures } from '../auth/emailAuthSource';
import { useProfile } from '../profile/ProfileProvider';
import { useModeration } from '../moderation/ModerationContext';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { SettingsAction, SettingsDetailFrame, settingsDetailStyles } from './SettingsDetailFrame';
import { useSettingsServices } from './SettingsServicesProvider';
import { settingsDestinations, type SettingsDestination } from './settingsDestinations';

export type SettingsDetail = 'account' | 'social' | 'controls' | 'icons' | SettingsDestination;
export function SettingsExtrasScreen({
  page,
  active,
  onBack,
  onOpen,
}: {
  page: Exclude<SettingsDetail, 'icons'>;
  active: boolean;
  onBack: () => void;
  onOpen: (page: SettingsDetail) => void;
}) {
  const openWithFocus = useSettingsReturnFocus(active);
  const auth = useAuth();
  const services = useSettingsServices();
  const profile = useProfile();
  const moderation = useModeration();
  const community = useCommunityNavigation();
  const records = useSyncExternalStore(
    services.connections.subscribe,
    services.connections.getSnapshot,
    services.connections.getSnapshot,
  );
  const userId = auth.state.user?.id;
  const revision = auth.state.revision;
  const connected = records.find((record) => record.userId === userId)?.facebook ?? false;
  const styles = useThemeStyles(settingsDetailStyles);
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'success'>('idle');
  const task = useRef<AbortController | null>(null);
  const live = useRef(false);
  useLayoutEffect(() => {
    live.current = active;
    return () => {
      live.current = false;
      task.current?.abort();
      task.current = null;
    };
  }, [active, services.scope]);
  const isCurrent = () =>
    live.current &&
    auth.store.getSnapshot().revision === revision &&
    auth.store.getSnapshot().user?.id === userId;
  async function run(action: (signal: AbortSignal) => Promise<void>) {
    if (task.current || !isCurrent()) return;
    const controller = new AbortController();
    task.current = controller;
    setStatus('pending');
    try {
      await action(controller.signal);
      if (!controller.signal.aborted && isCurrent()) {
        setStatus('success');
        setConfirming(false);
      }
    } catch {
      if (!controller.signal.aborted && isCurrent()) setStatus('error');
    } finally {
      if (task.current === controller) task.current = null;
    }
  }
  const [wasActive, setWasActive] = useState(active);
  if (wasActive !== active) {
    setWasActive(active);
    setConfirming(false);
    setStatus('idle');
  }
  const pending = status === 'pending';
  const title =
    page === 'account'
      ? 'Account'
      : page === 'social'
        ? 'Facebook'
        : page === 'controls'
          ? 'More app controls'
          : settingsDestinations[page].title;
  return (
    <SettingsDetailFrame title={title} onBack={onBack}>
      {page === 'account' ? (
        <>
          <Text style={styles.text}>{profile.state.profile?.name ?? auth.state.user?.name}</Text>
          <Text style={styles.secondary}>모의 계정 · {userId}</Text>
          <Text style={styles.text}>
            Email · {emailFixtures.find((item) => item.userId === userId)?.email ?? '등록된 예시 이메일 없음'}
          </Text>
          <Text style={styles.secondary}>
            예시 로그인 주소예요. 이메일 변경과 인증 메일 발송은 연결되지 않았어요.
          </Text>
          <SettingsAction
            title="이메일 수신 설정"
            onPress={() => openWithFocus(() => community.openNotificationSettings?.('email'))}
          />
          <SettingsAction title="Blocked users" onPress={() => moderation.open({ kind: 'blocked' })} />
          <SettingsAction
            title={`Facebook · ${connected ? 'Connected (mock)' : 'Not connected'}`}
            onPress={() => openWithFocus(() => onOpen('social'))}
          />
        </>
      ) : page === 'social' ? (
        <>
          <Text style={styles.text}>{connected ? 'Connected (mock)' : 'Not connected'}</Text>
          <Text style={styles.secondary}>
            이 모의 계정의 연결 선택만 저장해요. 실제 Facebook 로그인·게시·계정 연동은 실행하지 않아요.
          </Text>
          <SettingsAction
            title={connected ? 'Facebook 모의 연결 해제' : 'Facebook 모의 연결'}
            disabled={pending}
            onPress={() => {
              setConfirming(true);
              setStatus('idle');
            }}
          />
          {confirming && (
            <>
              <Text style={styles.text}>
                {connected ? '모의 연결을 해제할까요?' : '모의 Facebook 연결을 저장할까요?'}
              </Text>
              <SettingsAction
                title="Facebook 선택 확정"
                disabled={pending}
                onPress={() => {
                  void run(async (signal) => {
                    if (!userId) throw new Error('signed-out');
                    const record = await services.connections.setFacebook(
                      userId,
                      !connected,
                      signal,
                      isCurrent,
                    );
                    if (
                      record.userId !== userId ||
                      record.facebook === connected ||
                      services.connections.getSnapshot().find((item) => item.userId === userId)?.facebook !==
                        record.facebook
                    )
                      throw new Error('invalid-response');
                  });
                }}
              />
              <SettingsAction
                title="Facebook 선택 취소"
                onPress={() => {
                  task.current?.abort();
                  task.current = null;
                  setConfirming(false);
                  setStatus('idle');
                }}
              />
            </>
          )}
        </>
      ) : page === 'controls' ? (
        <>
          <Text style={styles.secondary}>
            보관본에는 하위 메뉴가 없어 기존 설정과 기기 설정으로 연결했어요. 계정이나 저장 데이터를 지우지
            않아요.
          </Text>
          <SettingsAction
            title="기기 앱 설정 열기"
            disabled={pending}
            onPress={() => {
              void run(() => services.platform.openAppSettings());
            }}
          />
          <SettingsAction title="앱 알림 설정" onPress={() => openWithFocus(() => community.openNotificationSettings?.('push'))} />
          <SettingsAction title="앱 아이콘 설정" onPress={() => openWithFocus(() => onOpen('icons'))} />
        </>
      ) : (
        <>
          <Text style={styles.text}>
            {page === 'rate' ? 'Medium의 App Store 소개 페이지' : `Medium 공식 ${title}`}
          </Text>
          <Text style={styles.secondary}>
            원본 서비스의 외부 참고 페이지를 열어요. Kostolany의 약관·개인정보 고지나 앱 평가 대상이 아니에요.
          </Text>
          <Text selectable style={styles.secondary}>
            {settingsDestinations[page].url}
          </Text>
          <SettingsAction
            title={`${title} 외부 페이지 열기`}
            disabled={pending}
            onPress={() => {
              void run(() => services.platform.open(page));
            }}
          />
        </>
      )}
      {pending && (
        <>
          <ActivityIndicator />
          <Text aria-live="polite" style={styles.secondary}>
            처리 중…
          </Text>
        </>
      )}
      {status === 'error' && (
        <Text role="alert" style={styles.error}>
          완료하지 못했어요. 기기 지원 또는 팝업 차단을 확인하고 같은 버튼으로 다시 시도해 주세요.
        </Text>
      )}
      {status === 'success' && (
        <Text aria-live="polite" style={styles.secondary}>
          {page === 'social'
            ? '모의 연결 선택을 저장했어요.'
            : '외부 열기 요청을 전달했어요. 대상 페이지나 OS의 결과를 확인해 주세요.'}
        </Text>
      )}
    </SettingsDetailFrame>
  );
}
