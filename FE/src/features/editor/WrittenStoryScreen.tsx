import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { IconButton } from '../../shared/ui/IconButton';
import { DocumentReader } from './DocumentReader';
import { useWrittenStories } from './WrittenStoriesProvider';
import { validPublishedStory, type PublishedStory } from './publishing';
import { useKnownProfile } from '../profile/ProfileProvider';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { ClapControl } from '../reactions/ClapControl';
import { ResponseButton } from '../responses/ResponseButton';
import { useArticleModeration } from '../moderation/articleModeration';
import { publishedArticleId } from './publishedArticle';
import { WrittenStoryBookmark, WrittenStoryMenu } from './WrittenStoryActions';
import { useAuth } from '../auth/AuthProvider';
import { RecordArticleVisit } from '../reading-history/ReadingHistoryProvider';
import { ArticleDisplayPopover } from '../settings/ArticleDisplayPopover';
import { useReaderTypography } from '../settings/useReaderTypography';
import { useDownloads } from '../downloads/DownloadProvider';

type WrittenStoryScreenProps = { storyId: string; ownerId?: string; onBack: () => void; active?: boolean };
const subscribeEmpty = () => () => {};
const emptyRevision = () => 0;

export function WrittenStoryScreen(props: WrittenStoryScreenProps) {
  const { state } = useAuth();
  // 같은 계정의 새 인증 세션도 이전 본문과 열린 시트를 물려받지 않는다.
  return <WrittenStoryContent key={JSON.stringify([props.storyId, props.ownerId, state.user?.id, state.revision])} {...props} />;
}

function WrittenStoryContent({ storyId, ownerId, onBack, active = true }: WrittenStoryScreenProps) {
  const { colors } = useTheme(); const context = useWrittenStories(); const source = context?.source;
  const { state: auth } = useAuth();
  const reader = useReaderTypography(18);
  const revision = useSyncExternalStore(source?.subscribe ?? subscribeEmpty, source?.getRevision ?? emptyRevision, source?.getRevision ?? emptyRevision);
  const moderation = useArticleModeration();
  const downloads = useDownloads();
  const offline = !downloads.online;
  const cached = offline && downloads.ready ? downloads.store?.article(publishedArticleId(storyId))?.published : undefined;
  const cachedStory = cached && (!ownerId || cached.story.userId === ownerId) ? cached.story : null;
  const imageSource = useMemo(() => context && cached
    ? { ...context.images, resolve: (id: string) => cached.images[id] } : context?.images, [context, cached]);
  const [display, setDisplay] = useState(false);
  const menuButton = useRef<View>(null);
  if (!active && display) setDisplay(false);
  const [attempt, retry] = useState(0); const [result, setResult] = useState<{ source: typeof source; revision: number; attempt: number; story: PublishedStory | null; error: boolean } | null>(null);
  useEffect(() => {
    if (!source || !active || offline) return; const controller = new AbortController();
    void Promise.resolve().then(() => source.story(storyId, controller.signal)).then(story => {
      if (story && (!validPublishedStory(story) || story.id !== storyId)) throw new Error('invalid-story-result');
      if (story && ownerId && story.userId !== ownerId) throw new Error('story-owner-mismatch');
      if (!controller.signal.aborted) setResult({ source, revision, attempt, story, error: false });
    }).catch(() => { if (!controller.signal.aborted) setResult({ source, revision, attempt, story: null, error: true }); });
    return () => controller.abort();
  }, [source, storyId, ownerId, attempt, revision, active, offline]);
  // 연결을 끈 동안 원문을 다시 조회하지 않고 현재 계정의 유효한 사본만 읽는다.
  const current = offline ? { story: cachedStory, error: !cachedStory } :
    result && result.source === source && result.revision === revision && result.attempt === attempt ? result : null;
  const moderationPending = moderation.store && !moderation.state?.value && !moderation.state?.readError;
  // 접근권이나 본문 공급부가 바뀐 동안 열린 설정을 복구하지 않는다.
  if (display && (!current?.story || current.error || moderationPending || moderation.state?.readError ||
    moderation.state?.value?.blocked.includes(current.story.userId) || moderation.blocked(publishedArticleId(storyId)))) setDisplay(false);
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}><IconButton icon="back" label="작성 글 뒤로" onPress={onBack} />
    {!current || moderationPending ? <ActivityIndicator accessibilityLabel="작성 글 불러오는 중" /> : current.error || moderation.state?.readError ? <View style={{ padding: 24 }}><Text role="alert" style={{ color: colors.text }}>{offline && !cachedStory ? '오프라인에서 이용할 수 있는 사본이 없어요. 연결 후 다시 시도해 주세요.' : '글을 불러오지 못했어요.'}</Text><Pressable role="button" accessibilityLabel="작성 글 다시 불러오기" onPress={() => { retry(value => value + 1); void moderation.store?.reload(); }} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable></View> : !current.story || !imageSource || moderation.state?.value?.blocked.includes(current.story.userId) || moderation.blocked(publishedArticleId(storyId)) ? <Text style={{ padding: 24, color: colors.text }}>이 글을 찾을 수 없어요.</Text> :
      <ScrollView accessibilityLabel="발행 글 본문" contentContainerStyle={{ padding: 24, paddingBottom: 64 }}>
        {offline && <Text style={{ color: colors.secondaryText, marginBottom: 16 }}>Offline · Downloaded copy</Text>}
        <RecordArticleVisit articleId={publishedArticleId(storyId)} active={active} revision={auth.revision} />
        <Text role="heading" style={[{ fontWeight: '700', color: colors.text }, reader.title]}>{current.story.document.title}</Text><WrittenStoryAuthor story={current.story} /><View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <ClapControl target={{ kind: 'article', id: publishedArticleId(current.story.id) }} title={current.story.document.title} size={24} />
        <ResponseButton target={{ kind: 'article', id: publishedArticleId(current.story.id) }} title={current.story.document.title} size={22} active={active} />
        <WrittenStoryBookmark active={active} story={current.story} />
        {active && <WrittenStoryMenu story={current.story} showShareButton buttonRef={menuButton} onDisplay={() => setDisplay(true)} />}
      </View><DocumentReader document={current.story.document} images={imageSource} reading active={active} />
      {display && <ArticleDisplayPopover onClose={() => { setDisplay(false); requestAnimationFrame(() => menuButton.current?.focus()); }} />}
      </ScrollView>}
  </SafeAreaView>;
}

function WrittenStoryAuthor({ story }: { story: PublishedStory }) {
  const profile = useKnownProfile(story.userId);
  const { colors } = useTheme();
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 24 }}>
    <ProfileAvatar userId={story.userId} size={32} />
    <Text style={{ flex: 1, color: colors.secondaryText }}>{profile?.name ?? story.authorName} · 모의 발행{story.publishing.unlisted ? ' · Unlisted' : ''}</Text>
  </View>;
}
