import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, G, LinearGradient, Path, Stop, Rect } from 'react-native-svg';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { AppIcon } from '../../shared/ui/AppIcon';
import { IconButton } from '../../shared/ui/IconButton';
import { restoreModalFocus } from '../../shared/ui/restoreModalFocus';
import { useKnownProfile } from '../profile/ProfileProvider';
import { useListening } from './ListeningProvider';
import { formatListeningTime, formatListeningRemaining } from './types';
import { ListeningSeek } from './ListeningSeek';
import { ListeningSpeedPanel } from './ListeningSpeedPanel';
import { ListeningVoicePanel } from './ListeningVoicePanel';
import { ListeningMenu } from './ListeningMenu';
import { SharePanel } from '../sharing/ShareSheet';
import { articleShareTarget } from '../sharing/articleShareTarget';
import { mediumArticles } from '../feed/data/mediumFixtures';
import { useCatalogArticles } from '../feed/ArticleCatalog';

export function ListeningMiniPlayer() {
  const { store, snapshot } = useListening();
  const styles = useThemeStyles(createMiniStyles);
  const { colors } = useTheme();
  const profile = useKnownProfile(snapshot.story?.authorId ?? '');
  if (!snapshot.story) return null;
  const story = snapshot.story;
  return (
    <View style={styles.player}>
      <View style={styles.progress} aria-hidden>
        <View
          style={[
            styles.progressValue,
            {
              width: `${snapshot.durationSeconds ? (snapshot.positionSeconds / snapshot.durationSeconds) * 100 : 0}%`,
            },
          ]}
        />
      </View>
      <View style={styles.row}>
        <Pressable
          role="button"
          accessibilityLabel={`플레이어 확장: ${story.title}`}
          style={styles.story}
          onPress={() => store?.setExpanded(true)}
        >
          {story.cover && <Image source={story.cover} style={styles.cover} accessible={false} />}
          <View style={styles.copy}>
            <Text numberOfLines={1} style={styles.author}>
              {profile?.name ?? story.authorName} · Mock
            </Text>
            <Text numberOfLines={1} style={styles.title}>
              {story.title}
            </Text>
          </View>
        </Pressable>
        {snapshot.status === 'loading' ? (
          <View style={styles.control} accessibilityLabel="듣기 준비 중" accessibilityState={{ busy: true }}>
            <ActivityIndicator color={colors.secondaryText} />
          </View>
        ) : snapshot.status === 'error' ? (
          <IconButton icon="play" label="듣기 다시 시도" onPress={() => store?.retry()} />
        ) : (
          <IconButton
            icon={snapshot.status === 'playing' ? 'pause' : 'play'}
            label={snapshot.status === 'playing' ? '미니 플레이어 일시정지' : '미니 플레이어 재생'}
            size={28}
            onPress={() => store?.togglePlaying()}
          />
        )}
        <IconButton icon="close" label="플레이어 닫기" size={28} onPress={() => store?.close()} />
      </View>
      {snapshot.status === 'error' && (
        <Text role="alert" style={styles.error}>
          듣기를 준비하지 못했어요. 다시 시도해 주세요.
        </Text>
      )}
    </View>
  );
}

type ListeningPlayerProps = { onViewStory: (articleId: string) => void };
export function ListeningPlayer({ onViewStory }: ListeningPlayerProps) {
  const { scope, snapshot } = useListening();
  return snapshot.story && snapshot.expanded ? (
    <ExpandedListeningPlayer key={`${scope}:${snapshot.story.articleId}`} onViewStory={onViewStory} />
  ) : null;
}

function ExpandedListeningPlayer({ onViewStory }: ListeningPlayerProps) {
  const { store, snapshot } = useListening();
  const articles = useCatalogArticles(mediumArticles);
  const [panel, setPanel] = useState<'menu' | 'share' | 'speed' | 'voice' | 'output' | null>(null);
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // 중앙 60과 나머지 네 개의 48 터치 영역이 좁은 안전 영역에서도 겹치지 않게 한다.
  const controlsMarginDp = Math.max(0, Math.min(32, (width - insets.left - insets.right - 252) / 2));
  const profile = useKnownProfile(snapshot.story?.authorId ?? '');
  const menuTrigger = useRef<View | null>(null);
  const shareTrigger = useRef<View | null>(null);
  const speedTrigger = useRef<View | null>(null);
  const panelAction = useRef<View | null>(null);
  useEffect(
    () => () => {
      requestAnimationFrame(restoreModalFocus);
    },
    [],
  );
  useEffect(() => {
    if (panel) panelAction.current?.focus();
  }, [panel]);
  if (!snapshot.story) return null;
  const story = snapshot.story;
  const ready = snapshot.durationSeconds > 0;
  const hidePanel = () => {
    const trigger = panel === 'share' ? shareTrigger : panel === 'speed' ? speedTrigger : menuTrigger;
    store?.cancelOptions();
    setPanel(null);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  return (
    <Modal
      transparent
      animationType="slide"
      accessibilityLabel="오디오 플레이어"
      onRequestClose={() => (panel ? hidePanel() : store?.setExpanded(false))}
    >
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.backdrop} accessibilityViewIsModal>
        <View style={[styles.sheet, { paddingBottom: insets.bottom }]}>
          <Svg
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            <Defs>
              <LinearGradient id="listening-background" x1="0" y1="0" x2="0.3" y2="1">
                <Stop offset="0" stopColor="#535335" />
                <Stop offset="0.5" stopColor="#505633" />
                <Stop offset="1" stopColor="#36433f" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#listening-background)" />
          </Svg>
          <ScrollView
            aria-hidden={Boolean(panel)}
            accessibilityElementsHidden={Boolean(panel)}
            importantForAccessibility={panel ? 'no-hide-descendants' : 'auto'}
            contentContainerStyle={[
              styles.content,
              { minHeight: Math.max(640, height - insets.top - insets.bottom - 10) },
            ]}
          >
            <Pressable
              role="button"
              accessibilityLabel="플레이어 접기"
              style={styles.handleButton}
              onPress={() => store?.setExpanded(false)}
            >
              <View style={styles.handle} />
            </Pressable>
            {story.cover ? (
              <Image
                source={story.cover}
                style={[
                  styles.cover,
                  { width: Math.min(184, width * 0.47), height: Math.min(184, width * 0.47) },
                ]}
                accessible={false}
              />
            ) : (
              <View style={styles.noCover}>
                <AppIcon name="document" size={72} color="#fff" />
              </View>
            )}
            <View style={styles.metadata}>
              <Text style={styles.author}>{profile?.name ?? story.authorName}</Text>
              <Text role="heading" numberOfLines={1} style={styles.title}>
                {story.title}
              </Text>
            </View>
            <View style={styles.timeline}>
              <ListeningSeek
                positionSeconds={snapshot.positionSeconds}
                durationSeconds={snapshot.durationSeconds}
                onSeek={(seconds) => store?.seek(seconds)}
                onSkip={(seconds) => store?.skip(seconds)}
              >
                <View style={styles.track}>
                  <View
                    style={[
                      styles.elapsed,
                      {
                        width: `${ready ? (snapshot.positionSeconds / snapshot.durationSeconds) * 100 : 0}%`,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.thumb,
                      { left: `${ready ? (snapshot.positionSeconds / snapshot.durationSeconds) * 100 : 0}%` },
                    ]}
                  />
                </View>
              </ListeningSeek>
              <View style={styles.times}>
                <Text style={styles.time}>{formatListeningTime(snapshot.positionSeconds)}</Text>
                <Text style={styles.remaining}>
                  {formatListeningRemaining(
                    snapshot.positionSeconds,
                    snapshot.durationSeconds,
                    snapshot.options.speed,
                  )}
                </Text>
              </View>
            </View>
            {snapshot.status === 'loading' && (
              <ActivityIndicator color="#fff" accessibilityLabel="듣기 준비 중" />
            )}
            {snapshot.status === 'error' && (
              <View>
                <Text role="alert" style={styles.feedback}>
                  듣기를 준비하지 못했어요.
                </Text>
                <Pressable
                  role="button"
                  accessibilityLabel="듣기 다시 시도"
                  style={styles.action}
                  onPress={() => store?.retry()}
                >
                  <Text style={styles.white}>Retry</Text>
                </Pressable>
              </View>
            )}
            <View style={[styles.controls, { marginHorizontal: controlsMarginDp }]}>
              <IconButton
                icon="previous"
                label="이전 기사 없음"
                color="#ffffff40"
                disabled
                onPress={() => {}}
              />
              <SeekButton
                seconds={-10}
                disabled={!ready}
                onPress={() => store?.skip(-10)}
              />
              <IconButton
                icon={snapshot.status === 'playing' ? 'pause' : 'play'}
                label={snapshot.status === 'playing' ? '확장 플레이어 일시정지' : '확장 플레이어 재생'}
                color="#fff"
                size={60}
                disabled={!ready}
                onPress={() => store?.togglePlaying()}
              />
              <SeekButton
                seconds={30}
                disabled={!ready}
                onPress={() => store?.skip(30)}
              />
              <IconButton icon="next" label="다음 기사 없음" color="#ffffff40" disabled onPress={() => {}} />
            </View>
            <View style={styles.spacer} />
            <View style={styles.bottomControls}>
              <Pressable
                ref={speedTrigger}
                role="button"
                accessibilityLabel={`재생 속도 ${snapshot.options.speed}배`}
                style={styles.action}
                onPress={() => setPanel('speed')}
              >
                <Text style={styles.white}>{snapshot.options.speed}×</Text>
              </Pressable>
              <Pressable
                ref={shareTrigger}
                role="button"
                accessibilityLabel="오디오 기사 공유"
                style={styles.action}
                onPress={() => setPanel('share')}
              >
                <AppIcon name="share" size={28} color="#fff" />
              </Pressable>
              <Pressable
                ref={menuTrigger}
                role="button"
                accessibilityLabel="플레이어 더보기"
                style={styles.action}
                onPress={() => setPanel('menu')}
              >
                <AppIcon name="more" size={28} color="#fff" />
              </Pressable>
            </View>
            <View style={styles.credit}>
              <Text style={styles.creditText}>∿ Powered by Speechify</Text>
              <Text style={styles.mock}>Mock preview · no audio / 실제 음성 없음</Text>
            </View>
          </ScrollView>
          {panel && (
            <View style={[styles.panelLayer, { bottom: insets.bottom }]}>
              <Pressable
                role="button"
                accessibilityLabel="플레이어 메뉴 닫기"
                style={StyleSheet.absoluteFill}
                onPress={hidePanel}
              />
              {panel === 'menu' ? (
                <ListeningMenu
                  onVoice={() => setPanel('voice')}
                  onOutput={() => setPanel('output')}
                  onViewStory={onViewStory}
                />
              ) : panel === 'speed' ? (
                <ListeningSpeedPanel onClose={hidePanel} />
              ) : panel === 'voice' ? (
                <ListeningVoicePanel onClose={hidePanel} />
              ) : panel === 'share' ? (
                <SharePanel target={articleShareTarget(articles.find(article => article.id === story.articleId)
                  ?? { id: story.articleId, title: story.title, summary: '', sourceName: story.authorName,
                    publishedLabel: '', readingMinutes: 0, thumbnail: null })} onClose={hidePanel} />
              ) : (
                <View style={styles.panel}>
                  <Text role="heading" style={styles.panelTitle}>
                    AirPlay
                  </Text>
                  <Text style={styles.panelText}>
                    이 mock 플레이어는 소리를 출력하지 않아 AirPlay 장치를 연결할 수 없어요.
                  </Text>
                  <Pressable
                    ref={panelAction}
                    role="button"
                    accessibilityLabel="플레이어 메뉴 완료"
                    style={styles.action}
                    onPress={hidePanel}
                  >
                    <Text style={styles.panelText}>Done</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function SeekButton({
  seconds,
  disabled,
  onPress,
}: {
  seconds: number;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      role="button"
      accessibilityLabel={seconds < 0 ? '10초 뒤로' : '30초 앞으로'}
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={styles.action}
      onPress={onPress}
    >
      <Svg width={32} height={32} viewBox="0 0 32 32" aria-hidden>
        <G transform={seconds > 0 ? 'translate(32 0) scale(-1 1)' : undefined}>
          <Path
            d="M13 5a12 12 0 1 1-9 10M13 1 6 5l7 4"
            fill="none"
            stroke="#fff"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Text style={styles.seekNumber} allowFontScaling={false} aria-hidden>
        {Math.abs(seconds)}
      </Text>
    </Pressable>
  );
}
const createMiniStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    player: {
      backgroundColor: colors.background,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    progress: { height: 1 },
    progressValue: { height: 1, backgroundColor: colors.text },
    row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, minHeight: 66 },
    story: { flex: 1, minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 14 },
    cover: { width: 40, height: 40, borderRadius: 2 },
    copy: { flex: 1 },
    author: { fontFamily: fonts.sans, fontSize: 14, color: colors.text },
    title: { fontFamily: fonts.sans, fontSize: 16, color: colors.text },
    control: { width: 48, height: 48, justifyContent: 'center' },
    error: { paddingHorizontal: 16, paddingBottom: 8, color: colors.destructive, fontSize: 13 },
  });
const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: '#00000090', paddingTop: 10 },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
  },
  content: { alignItems: 'center' },
  handleButton: { height: 48, width: '100%', alignItems: 'center', paddingTop: 8 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#ffffff30' },
  cover: { marginTop: 35, borderRadius: 2 },
  noCover: { width: 184, height: 184, marginTop: 35, alignItems: 'center', justifyContent: 'center' },
  metadata: { marginTop: 82, paddingHorizontal: 40, width: '100%', gap: 9 },
  author: { color: '#fff', textAlign: 'center', fontFamily: fonts.sans, fontSize: 14, lineHeight: 20 },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: fonts.sans,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  timeline: { width: '100%', paddingHorizontal: 40, marginTop: 15 },
  track: { height: 2, backgroundColor: '#ffffff30' },
  elapsed: { height: 2, backgroundColor: '#fff' },
  thumb: {
    width: 8,
    height: 8,
    marginLeft: -4,
    top: -3,
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  times: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -8 },
  time: { color: '#fff', fontSize: 14, fontFamily: fonts.sans },
  remaining: { color: '#b0b49d', fontSize: 14, fontFamily: fonts.sans },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 32,
    marginTop: 34,
  },
  action: { minHeight: 48, minWidth: 48, alignItems: 'center', justifyContent: 'center' },
  seekNumber: { position: 'absolute', color: '#fff', top: 19, fontSize: 12 },
  spacer: { flex: 1, minHeight: 32 },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginHorizontal: 40,
    marginBottom: 18,
  },
  white: { color: '#fff', fontFamily: fonts.sans, fontSize: 18 },
  credit: { alignSelf: 'stretch', alignItems: 'center', paddingVertical: 8, backgroundColor: '#00000015' },
  creditText: { color: '#aeb4a4', fontFamily: fonts.sans, fontSize: 12 },
  mock: { color: '#d5d9cd', fontSize: 10, marginTop: 4 },
  feedback: { color: '#fff', paddingHorizontal: 24, textAlign: 'center' },
  panelLayer: { ...StyleSheet.absoluteFill, justifyContent: 'flex-end', backgroundColor: '#00000045' },
  panel: { margin: 16, padding: 20, borderRadius: 12, backgroundColor: '#fff' },
  panelTitle: { color: '#222', fontSize: 18, fontWeight: '600', marginBottom: 8 },
  panelText: { color: '#222', fontSize: 16, lineHeight: 24 },
});
