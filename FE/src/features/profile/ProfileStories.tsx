import type { ReactElement } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { useStoryList, useWrittenStories } from '../editor/WrittenStoriesProvider';
import { useTheme } from '../../shared/theme/ThemeProvider';

export function ProfileStories({ userId, visibility, active, header, footer, contentContainerStyle }: {
  userId: string; visibility: 'public' | 'unlisted'; active: boolean; header: ReactElement; footer: ReactElement; contentContainerStyle: StyleProp<ViewStyle>;
}) {
  const context = useWrittenStories(); const { colors } = useTheme(); const navigation = useCommunityNavigation();
  const list = useStoryList(userId, context?.sessionRevision ?? 0, visibility, active);
  return <FlatList data={list.status === 'ready' ? list.items : []} keyExtractor={item => item.id} contentContainerStyle={contentContainerStyle}
    ListHeaderComponent={header} ListFooterComponent={footer}
    ListEmptyComponent={list.status === 'loading' ? <ActivityIndicator accessibilityLabel="발행한 글 불러오는 중" /> : list.status === 'error' ? <View style={{ padding: 24 }}><Text role="alert" style={{ color: colors.text }}>발행한 글을 불러오지 못했어요.</Text><Pressable role="button" accessibilityLabel="발행한 글 다시 불러오기" onPress={list.retry} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable></View> :
      <View style={{ marginHorizontal: 24, padding: 24, minHeight: 118, borderRadius: 2, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.text, textAlign: 'center' }}>{visibility === 'unlisted' ? 'You haven’t published any unlisted stories' : 'You haven’t published any stories'}</Text><Pressable role="button" onPress={navigation.openWrite} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Get started</Text></Pressable></View>}
    renderItem={({ item }) => <Pressable role="button" accessibilityLabel={`${item.document.title} 발행한 글 열기`} onPress={() => navigation.openWrittenStory?.(item.id)} style={{ padding: 20, minHeight: 140, gap: 12, borderBottomWidth: 0.5, borderColor: colors.border }}>
      <View style={{ flexDirection: 'row', gap: 20 }}><View style={{ flex: 1 }}><Text style={{ color: colors.text, fontSize: 20, lineHeight: 26, fontWeight: '700' }}>{item.document.title}</Text><Text numberOfLines={2} style={{ color: colors.secondaryText, fontSize: 15, lineHeight: 21, marginTop: 8 }}>{item.document.body.replaceAll('\uFFFC', '').trim()}</Text></View>
        {item.document.images[0] && list.context && <Image source={list.context.images.resolve(item.document.images[0].assetId)} accessibilityLabel={item.document.images[0].description} style={{ width: 80, height: 54, resizeMode: 'cover' }} />}
      </View>
      <Text style={{ color: colors.secondaryText, fontSize: 12 }}>Published · {new Date(item.publishedAt).toLocaleDateString()}{item.publishing.unlisted ? ' · Unlisted' : ''}</Text>
    </Pressable>} />;
}
