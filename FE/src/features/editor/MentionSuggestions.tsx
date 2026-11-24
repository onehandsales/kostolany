import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View, type ImageSourcePropType } from 'react-native';
import { useDirectory } from '../community/DirectoryProvider';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { mentionQuery, type EditorValue, type MentionTarget } from './editorModel';

type MentionCandidate = { target: MentionTarget; avatar?: ImageSourcePropType };

export function MentionSuggestions({ value, active, onSelect }: { value: EditorValue; active: boolean; onSelect: (value: EditorValue, target: MentionTarget) => void }) {
  const { state, retry } = useDirectory(); const { colors } = useTheme();
  const query = active ? mentionQuery(value) : null;
  const key = query ? `${query.start}:${query.end}:${query.query}` : null;
  const [result, setResult] = useState<{ key: string; data: typeof state.data; items: MentionCandidate[] } | null>(null);
  useEffect(() => {
    if (!key || !query?.query || !state.data) return;
    const data = state.data; const text = query.query.toLocaleLowerCase().replace(/[.-]/gu, '');
    const timer = setTimeout(() => setResult({ key, data, items: data.identities.filter(item => item.kind === 'writer' &&
      `${item.name} ${item.handle ?? item.id}`.toLocaleLowerCase().replace(/[.-]/gu, '').includes(text))
      .map(item => ({ target: { id: item.id, name: item.name, handle: item.handle ?? item.id }, avatar: item.avatar })) }), 180);
    return () => clearTimeout(timer);
  }, [key, query?.query, state.data]);
  if (!query) return null;
  const items = result?.key === key && result.data === state.data ? result.items : null;
  return <View accessibilityLabel="멘션 검색 결과" style={{ borderTopWidth: 1, borderColor: colors.border, paddingHorizontal: 10, backgroundColor: colors.surface, maxHeight: 222 }}>
    {!query.query ? <Text style={{ color: colors.secondaryText, paddingVertical: 12, textAlign: 'center' }}>Start typing a user’s name to mention them.</Text> : state.status === 'error' ? <>
      <Text role="alert" style={{ color: colors.text }}>사용자를 불러오지 못했어요.</Text>
      <Pressable role="button" accessibilityLabel="멘션 검색 다시 시도" onPress={retry} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable>
    </> : !items || state.status === 'loading' ? <ActivityIndicator accessibilityLabel="멘션 검색 중" style={{ minHeight: 48 }} /> :
      <FlatList data={items} keyExtractor={item => item.target.id} keyboardShouldPersistTaps="always"
        ListEmptyComponent={<Text style={{ color: colors.secondaryText, paddingVertical: 12 }}>No users found</Text>}
        renderItem={({ item: { target, avatar } }) => <Pressable role="button" accessibilityLabel={`${target.name} @${target.handle} 멘션`} style={{ minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 0.5, borderColor: colors.border }}
          onPressIn={event => event.preventDefault()} onPress={() => onSelect(value, target)}>
          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border, overflow: 'hidden' }}>
            {avatar && <Image source={avatar} accessible={false} style={{ width: 32, height: 32 }} />}
          </View>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}><Text style={{ color: colors.text, fontSize: 12 }}>{target.name}</Text><Text style={{ color: colors.secondaryText, fontSize: 11 }}>@{target.handle}</Text></View>
        </Pressable>} />}
  </View>;
}
