import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { IconButton } from '../../shared/ui/IconButton';
import { DocumentReader } from './DocumentReader';
import { useWrittenStories } from './WrittenStoriesProvider';
import { validPublishedStory, type PublishedStory } from './publishing';
import { useKnownProfile } from '../profile/ProfileProvider';
import { ProfileAvatar } from '../profile/ProfileAvatar';

export function WrittenStoryScreen({ storyId, ownerId, onBack }: { storyId: string; ownerId?: string; onBack: () => void }) {
  const { colors } = useTheme(); const context = useWrittenStories(); const source = context?.source;
  const [attempt, retry] = useState(0); const [result, setResult] = useState<{ source: typeof source; id: string; ownerId?: string; attempt: number; story: PublishedStory | null; error: boolean } | null>(null);
  useEffect(() => {
    if (!source) return; const controller = new AbortController();
    void Promise.resolve().then(() => source.story(storyId, controller.signal)).then(story => {
      if (story && (!validPublishedStory(story) || story.id !== storyId)) throw new Error('invalid-story-result');
      if (story && ownerId && story.userId !== ownerId) throw new Error('story-owner-mismatch');
      if (!controller.signal.aborted) setResult({ source, id: storyId, ownerId, attempt, story, error: false });
    }).catch(() => { if (!controller.signal.aborted) setResult({ source, id: storyId, ownerId, attempt, story: null, error: true }); });
    return () => controller.abort();
  }, [source, storyId, ownerId, attempt]);
  const current = result?.source === source && result?.id === storyId && result.ownerId === ownerId && result.attempt === attempt ? result : null;
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}><IconButton icon="back" label="작성 글 뒤로" onPress={onBack} />
    {!current ? <ActivityIndicator accessibilityLabel="작성 글 불러오는 중" /> : current.error ? <View style={{ padding: 24 }}><Text role="alert" style={{ color: colors.text }}>글을 불러오지 못했어요.</Text><Pressable role="button" accessibilityLabel="작성 글 다시 불러오기" onPress={() => retry(value => value + 1)} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable></View> : !current.story || !context ? <Text style={{ padding: 24, color: colors.text }}>이 글을 찾을 수 없어요.</Text> :
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 64 }}><Text role="heading" style={{ fontSize: 32, lineHeight: 40, fontWeight: '700', color: colors.text }}>{current.story.document.title}</Text><WrittenStoryAuthor story={current.story} /><DocumentReader document={current.story.document} images={context.images} /></ScrollView>}
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
