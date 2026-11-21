import { useEffect, useState, type ReactElement } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { useStoryList, useWrittenStories } from '../editor/WrittenStoriesProvider';
import { WrittenStoryBookmark, WrittenStoryMenu } from '../editor/WrittenStoryActions';
import { WrittenStoryCardReactions } from '../editor/WrittenStoryCardReactions';
import { useTheme } from '../../shared/theme/ThemeProvider';

export function ProfileStories({ userId, visibility, active, header, footer, contentContainerStyle }: {
  userId: string; visibility: 'public' | 'unlisted'; active: boolean; header: ReactElement; footer: ReactElement; contentContainerStyle: StyleProp<ViewStyle>;
}) {
  const context = useWrittenStories(); const { colors } = useTheme(); const navigation = useCommunityNavigation();
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!active) return;
    const frame = requestAnimationFrame(() => setNow(Date.now()));
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => { cancelAnimationFrame(frame); clearInterval(timer); };
  }, [active]);
  const list = useStoryList(userId, context?.sessionRevision ?? 0, visibility, active);
  return <FlatList data={list.status === 'ready' ? list.items : []} keyExtractor={item => item.id} contentContainerStyle={contentContainerStyle}
    ListHeaderComponent={header} ListFooterComponent={footer}
    ListEmptyComponent={list.status === 'loading' ? <ActivityIndicator accessibilityLabel="발행한 글 불러오는 중" /> : list.status === 'error' ? <View style={{ padding: 24 }}><Text role="alert" style={{ color: colors.text }}>발행한 글을 불러오지 못했어요.</Text><Pressable role="button" accessibilityLabel="발행한 글 다시 불러오기" onPress={list.retry} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable></View> :
      <View style={{ marginHorizontal: 24, padding: 24, minHeight: 118, borderRadius: 2, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.text, textAlign: 'center' }}>{visibility === 'unlisted' ? 'You haven’t published any unlisted stories' : 'You haven’t published any stories'}</Text><Pressable role="button" onPress={navigation.openWrite} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Get started</Text></Pressable></View>}
    renderItem={({ item }) => <View style={{ paddingHorizontal: 24, paddingVertical: 20, borderBottomWidth: 0.5, borderColor: colors.border }}><Pressable role="button" accessibilityLabel={`${item.document.title} 발행한 글 열기`} onPress={() => navigation.openWrittenStory?.(item.id)} style={{ minHeight: 72 }}>
      <View style={{ flexDirection: 'row', gap: 20 }}><View style={{ flex: 1 }}><Text style={{ color: colors.text, fontSize: 20, lineHeight: 26, fontWeight: '700' }}>{item.document.title}</Text><Text numberOfLines={2} style={{ color: colors.secondaryText, fontSize: 16, lineHeight: 20, marginTop: 8 }}>{item.document.body.replaceAll('\uFFFC', '').trim()}</Text></View>
        {item.document.images[0] && list.context && <Image source={list.context.images.resolve(item.document.images[0].assetId)} accessibilityLabel={item.document.images[0].description} style={{ width: 80, height: 56, resizeMode: 'cover' }} />}
      </View>
    </Pressable><View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 12 }}><Text style={{ marginRight: 12, color: colors.secondaryText, fontSize: 12 }}>{now >= Date.parse(item.publishedAt) && now - Date.parse(item.publishedAt) < 60000 ? 'Just now' : new Date(item.publishedAt).toLocaleDateString()}{item.publishing.unlisted ? ' · Unlisted' : ''}</Text>
      <WrittenStoryCardReactions story={item} /><View style={{ flex: 1 }} />
      <WrittenStoryBookmark story={item} /><WrittenStoryMenu story={item} />
    </View></View>} />;
}
