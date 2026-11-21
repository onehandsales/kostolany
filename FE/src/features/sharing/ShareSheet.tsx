import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { IconButton } from '../../shared/ui/IconButton';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { MembershipPanel } from '../membership/MembershipSheet';
import { useMembership } from '../membership/MembershipProvider';
import { useKnownProfile } from '../profile/ProfileProvider';
import { ShareCard, sharePalettes } from './ShareCard';
import { ShareActionIcon } from './ShareActionIcon';
import { useSharing } from './SharingProvider';
import { canShareTarget, ShareError, shareMessage, type ShareImage, type ShareTarget } from './types';

type SharePanelProps = { target: ShareTarget; onClose: () => void; available?: boolean };
export function ShareSheet(props: SharePanelProps) {
  return (
    <Modal transparent animationType="slide" onRequestClose={props.onClose} accessibilityLabel="공유">
      <SafeAreaView style={stylesBackdrop}>
        <SharePanel {...props} />
      </SafeAreaView>
    </Modal>
  );
}

export function SharePanel(props: SharePanelProps) {
  const { scope, adapter } = useSharing();
  const membership = useMembership();
  const [origin] = useState({ scope, adapter, membership: membership?.source });
  const profile = useKnownProfile(props.target.authorId ?? '');
  const target = {
    ...props.target,
    title: props.target.kind === 'writer' ? (profile?.name ?? props.target.title) : props.target.title,
    authorName: profile?.name ?? props.target.authorName,
    avatar: profile?.photo ? { uri: profile.photo.uri } : props.target.avatar,
  };
  const { onClose } = props;
  useEffect(() => {
    if (origin.scope !== scope || origin.adapter !== adapter || origin.membership !== membership?.source) onClose();
  }, [origin, scope, adapter, onClose, membership?.source]);
  if (origin.scope !== scope || origin.adapter !== adapter || origin.membership !== membership?.source) return null;
  return <SharePanelContent key={JSON.stringify([target, props.available])} {...props} target={target} />;
}

type ShareAction = 'copy' | 'friend' | 'via' | 'image';
function SharePanelContent({ target, onClose, available = true }: SharePanelProps) {
  const { adapter, userId } = useSharing();
  const membership = useMembership();
  const [showMembership, setShowMembership] = useState(false);
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(393, width) - 52;
  const card = useRef<View | null>(null);
  const closeButton = useRef<View | null>(null);
  const request = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const mounted = useRef(true);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState<ShareAction | null>(null);
  const [error, setError] = useState<{ kind: string; action: ShareAction } | null>(null);
  const [toast, setToast] = useState('');
  const shareable = available && canShareTarget(target);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      request.current?.abort();
    };
  }, [adapter]);
  useEffect(() => {
    closeButton.current?.focus();
    return () => {
      requestAnimationFrame(restoreModalFocus);
    };
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function perform(action: ShareAction) {
    if (!shareable || busy.current || !mounted.current) return;
    if (action === 'friend' && (!target.memberOnly || !userId || (target.authorId !== userId && !membership?.allows('friend-link')))) {
      setError({ kind: 'friend', action });
      return;
    }
    busy.current = true;
    setPending(action);
    setError(null);
    setToast('');
    const controller = new AbortController();
    request.current = controller;
    let image: ShareImage | undefined;
    try {
      const message = shareMessage(target, action === 'friend');
      let result = '';
      if (action === 'copy' || action === 'friend') {
        await adapter.copy(message.url, controller.signal);
        result = action === 'friend' ? 'Preview Friend Link copied' : 'Link copied';
      } else if (action === 'via') {
        const outcome = await adapter.share(message, controller.signal);
        result = outcome === 'cancelled' ? '' : '공유 화면에서 돌아왔어요';
      } else {
        if (!ready || !card.current) throw new ShareError('capture');
        image = await adapter.capture(card.current, controller.signal);
        if (controller.signal.aborted) return;
        const outcome = await adapter.saveImage(image, controller.signal);
        result = outcome === 'library' ? 'Image saved to library' : 'Image download started';
      }
      if (mounted.current && !controller.signal.aborted) setToast(result);
    } catch (cause) {
      if (
        mounted.current &&
        !controller.signal.aborted &&
        !(cause instanceof ShareError && cause.kind === 'cancelled')
      )
        setError({ kind: cause instanceof ShareError ? cause.kind : action, action });
    } finally {
      // 임시 파일 정리 실패가 이미 완료된 외부 저장을 취소한 것으로 바뀌지 않게 한다.
      try {
        image?.release();
      } catch {
        /* 다음 실행의 캐시 정리와 실제 저장 결과를 구분한다. */
      }
      if (request.current === controller) {
        request.current = null;
        busy.current = false;
        if (mounted.current) setPending(null);
      }
    }
  }
  function changePage(direction: number) {
    if (busy.current) return;
    setPage((value) => Math.max(0, Math.min(sharePalettes.length - 1, value + direction)));
  }
  const swipe = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) =>
      !pending && Math.abs(gesture.dx) > 12 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 2,
    onPanResponderRelease: (_, gesture) => {
      if (!pending && Math.abs(gesture.dx) > 40)
        setPage((value) =>
          Math.max(0, Math.min(sharePalettes.length - 1, value + (gesture.dx < 0 ? 1 : -1))),
        );
    },
  });
  const actions: { kind: ShareAction; label: string }[] = [
    { kind: 'copy', label: 'Copy link' },
    ...(target.kind === 'article' || target.kind === 'written' || target.kind === 'quote'
      ? [{ kind: 'friend' as const, label: 'Friend Link...' }]
      : []),
    { kind: 'via', label: 'Share via...' },
    { kind: 'image', label: 'Save image' },
  ];
  if (showMembership) return <MembershipPanel embedded onClose={() => setShowMembership(false)} />;
  return (
    <View accessibilityViewIsModal style={styles.sheet}>
      <View style={styles.header}>
        <Pressable
          ref={closeButton}
          role="button"
          accessibilityLabel="공유 닫기"
          onPress={onClose}
          style={styles.close}
        >
          <Text style={styles.cross}>×</Text>
        </Pressable>
        <Text role="heading" style={styles.heading}>
          Share
        </Text>
      </View>
      {!shareable ? (
        <Text role="alert" style={styles.message}>
          이 대상은 공유할 수 없어요. 비공개이거나 더 이상 접근할 수 없어요.
        </Text>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.preview, { width: cardWidth }]} {...swipe.panHandlers}>
            <ShareCard
              target={target}
              styleIndex={page}
              width={cardWidth}
              cardRef={card}
              onReady={setReady}
            />
            <View style={styles.pages}>
              <IconButton
                icon="back"
                label="이전 공유 카드 스타일"
                onPress={() => changePage(-1)}
                color="#fff"
                disabled={Boolean(pending) || page === 0}
              />
              <View
                accessibilityLabel={`공유 카드 스타일 ${page + 1}/${sharePalettes.length}`}
                style={styles.dots}
              >
                {sharePalettes.map((_, index) => (
                  <View key={index} style={[styles.dot, { opacity: page === index ? 1 : 0.45 }]} />
                ))}
              </View>
              <Pressable
                role="button"
                accessibilityLabel="다음 공유 카드 스타일"
                onPress={() => changePage(1)}
                disabled={Boolean(pending) || page === sharePalettes.length - 1}
                accessibilityState={{ disabled: Boolean(pending) || page === sharePalettes.length - 1 }}
                style={styles.close}
              >
                <Text style={styles.next}>›</Text>
              </Pressable>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actions}
          >
            {actions.map((action) => (
              <Pressable
                key={action.kind}
                role="button"
                accessibilityLabel={action.label}
                disabled={Boolean(pending) || (action.kind === 'image' && !ready)}
                accessibilityState={{
                  disabled: Boolean(pending) || (action.kind === 'image' && !ready),
                  busy: pending === action.kind,
                }}
                onPress={() => {
                  void perform(action.kind);
                }}
                style={styles.action}
              >
                {pending === action.kind ? (
                  <ActivityIndicator color={colors.secondaryText} />
                ) : (
                  <ShareActionIcon kind={action.kind} />
                )}
                <Text style={styles.actionText}>{action.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
          {error && (
            <View style={styles.error}>
              <Text role="alert" style={styles.errorText}>
                {error.kind === 'friend'
                  ? target.memberOnly ? '다른 작가의 회원 전용 글은 Friend 멤버십에서 모의 링크를 복사할 수 있어요.' : '이 글은 무료로 공유할 수 있어요. Copy link를 사용하세요.'
                  : error.kind === 'permission'
                    ? '사진 저장 권한이 필요해요. 설정에서 허용한 뒤 다시 시도하세요.'
                    : error.kind === 'unsupported'
                      ? '이 환경에서는 이 공유 동작을 지원하지 않아요. Copy link를 사용하세요.'
                      : '공유 작업을 완료하지 못했어요. 선택한 카드로 다시 시도하세요.'}
              </Text>
              {error.kind === 'friend' && target.memberOnly && <Pressable role="button" accessibilityLabel="Friend 멤버십 보기" style={styles.retry} onPress={() => setShowMembership(true)}><Text style={styles.retryText}>Become a Friend of Medium</Text></Pressable>}
              {!['friend', 'unsupported'].includes(error.kind) && (
                <Pressable
                  role="button"
                  accessibilityLabel="공유 다시 시도"
                  onPress={() => {
                    void perform(error.action);
                  }}
                  style={styles.retry}
                >
                  <Text style={styles.retryText}>Try again</Text>
                </Pressable>
              )}
              {error.kind === 'permission' && (
                <Pressable
                  role="button"
                  accessibilityLabel="사진 권한 설정 열기"
                  style={styles.retry}
                  onPress={() => {
                    void adapter.openSettings().catch(() => {
                      if (mounted.current) setError({ kind: 'unsupported', action: 'image' });
                    });
                  }}
                >
                  <Text style={styles.retryText}>Open settings</Text>
                </Pressable>
              )}
            </View>
          )}
          <Text style={styles.disclaimer}>
            미리보기 링크 · 외부에서는 열리지 않아요
            {target.visibility === 'unlisted' ? '\nUnlisted 글은 링크로 접근하는 대상이에요.' : ''}
          </Text>
        </ScrollView>
      )}
      {Boolean(toast) && (
        <View style={styles.toast}>
          <Text role="status" accessibilityLiveRegion="polite" style={styles.toastText}>
            {toast}
          </Text>
        </View>
      )}
    </View>
  );
}
const stylesBackdrop = { flex: 1, backgroundColor: '#000' };
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    sheet: {
      flex: 1,
      marginTop: 10,
      backgroundColor: colors.background,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      overflow: 'hidden',
    },
    header: { flexDirection: 'row', minHeight: 64, alignItems: 'center' },
    close: { minHeight: 48, minWidth: 48, alignItems: 'center', justifyContent: 'center' },
    cross: { fontSize: 30, fontWeight: '200', color: colors.text },
    heading: { marginLeft: -8, fontFamily: fonts.sans, fontSize: 18, fontWeight: '700', color: colors.text },
    content: { paddingTop: 11, paddingBottom: 24 },
    preview: { alignSelf: 'center' },
    pages: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dots: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#fff' },
    next: { color: '#fff', fontSize: 28 },
    actions: { paddingHorizontal: 12, paddingTop: 28, paddingBottom: 12 },
    action: { width: 108, minHeight: 76, alignItems: 'center', gap: 12, justifyContent: 'center' },
    actionText: { fontSize: 14, fontFamily: fonts.sans, color: colors.text },
    message: { color: colors.secondaryText, fontSize: 16, padding: 24 },
    error: { paddingHorizontal: 24, gap: 8 },
    errorText: { color: colors.destructive, fontSize: 14, lineHeight: 20 },
    retry: { minHeight: 48, justifyContent: 'center' },
    retryText: { color: colors.green, fontSize: 16 },
    disclaimer: {
      marginTop: 8,
      paddingHorizontal: 24,
      fontSize: 12,
      color: colors.secondaryText,
      lineHeight: 18,
    },
    toast: {
      position: 'absolute',
      top: 24,
      alignSelf: 'center',
      paddingHorizontal: 20,
      minHeight: 66,
      maxWidth: '80%',
      justifyContent: 'center',
      backgroundColor: '#242424',
      borderRadius: 4,
    },
    toastText: { color: '#fff', fontSize: 14, fontFamily: fonts.sans, textAlign: 'center' },
  });
