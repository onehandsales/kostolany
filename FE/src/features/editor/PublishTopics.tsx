import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTopics } from '../topics/TopicProvider';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { IconButton } from '../../shared/ui/IconButton';

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f\s]/gu, '').toLocaleLowerCase();
// 보관본의 기본 토픽 순서를 먼저 유지하고 미수록 후보는 이름순으로 뒤에 배치한다.
const initialTopicNames = ['Artificial Intelligence', 'Blockchain', 'Business', 'Cryptocurrency', 'Culture', 'Data Science', 'Design', 'Health'];
export function PublishTopics({ selected, onSave, onCancel }: { selected: string[]; onSave: (ids: string[]) => void; onCancel: () => void }) {
  const { state, retry } = useTopics(); const { colors } = useTheme();
  const [ids, setIds] = useState([...selected]); const [query, setQuery] = useState(''); const [settled, setSettled] = useState(''); const [error, setError] = useState<string | null>(null);
  useEffect(() => { const timer = setTimeout(() => setSettled(query), 180); return () => clearTimeout(timer); }, [query]);
  const topics = state.data?.topics ?? []; const needle = normalize(settled);
  const validSelection = state.status === 'ready' && ids.every(id => topics.some(topic => topic.id === id));
  const items = needle ? topics.filter(topic => normalize(topic.name).includes(needle)) : [...topics].sort((a, b) => {
    const rank = (name: string) => { const index = initialTopicNames.indexOf(name); return index < 0 ? initialTopicNames.length : index; };
    return rank(a.name) - rank(b.name) || a.name.localeCompare(b.name) || a.id.localeCompare(b.id);
  });
  function toggle(id: string) {
    if (ids.includes(id)) setIds(ids.filter(item => item !== id));
    else if (ids.length >= 5) { setError('토픽은 최대 5개까지 선택할 수 있어요.'); return; }
    else setIds([...ids, id]);
    setError(null);
  }
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <IconButton icon="back" label="토픽 선택 취소" onPress={onCancel} />
      <View style={{ padding: 24, gap: 12 }}>
        <Text role="heading" style={{ fontSize: 30, fontWeight: '700', color: colors.text }}>Add topics</Text>
        <Text style={{ fontSize: 14, lineHeight: 21, color: colors.text }}>Add or change topics (up to 5) so readers know what your story is about</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 28, marginTop: 10 }}>
          <View style={{ flex: 1 }}><TextInput style={{ minHeight: 48, paddingHorizontal: 16, fontSize: 14, color: colors.text, outlineWidth: 0 }} placeholderTextColor={colors.secondaryText} accessibilityLabel="발행 토픽 검색" placeholder="Search a topic..." value={query} onChangeText={setQuery} autoCapitalize="none" autoCorrect={false} /></View>
          {query ? <IconButton icon="close" label="토픽 검색어 지우기" onPress={() => setQuery('')} /> : <Text accessibilityLabel={`선택 토픽 ${ids.length}/5`} style={{ color: colors.secondaryText, paddingRight: 16 }}>{ids.length}/5</Text>}
        </View>
        {!!ids.length && <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {ids.map(id => <Pressable key={id} role="button" accessibilityLabel={`${topics.find(topic => topic.id === id)?.name ?? '선택한 토픽'} 선택 토픽 제거`} onPress={() => toggle(id)} style={{ minHeight: 48, paddingHorizontal: 20, borderRadius: 24, backgroundColor: colors.input, justifyContent: 'center' }}>
            <Text style={{ color: colors.text, fontSize: 16 }}>{topics.find(topic => topic.id === id)?.name ?? '선택한 토픽'} ×</Text>
          </Pressable>)}
        </View>}
        {error && <Text role="alert" style={{ color: colors.destructive }}>{error}</Text>}
      </View>
      {state.status === 'error' ? <View style={{ padding: 24 }}><Text role="alert" style={{ color: colors.text }}>토픽을 불러오지 못했어요.</Text><Pressable role="button" accessibilityLabel="발행 토픽 다시 불러오기" onPress={retry} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable></View> :
        state.status === 'loading' || query !== settled ? <ActivityIndicator accessibilityLabel="발행 토픽 검색 중" /> : <FlatList data={items} keyExtractor={topic => topic.id} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          ListHeaderComponent={!query ? <Text role="heading" style={{ fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: 16 }}>Your topics</Text> : null}
          ListEmptyComponent={<Text style={{ color: colors.secondaryText }}>No topics found</Text>}
          renderItem={({ item }) => <Pressable role="checkbox" accessibilityLabel={`${item.name}${item.followers ? ` ${item.followers} followers` : ''} 토픽`} accessibilityState={{ checked: ids.includes(item.id) }} aria-checked={ids.includes(item.id)} onPress={() => toggle(item.id)} style={{ minHeight: 60, flexDirection: 'row', alignItems: 'center', gap: 8, borderBottomWidth: 0.5, borderColor: colors.border }}>
            <Text style={{ color: colors.text, flexShrink: 1 }}>{item.name}</Text>{item.followers && <Text style={{ color: colors.secondaryText, flexShrink: 1 }}>{item.followers} followers</Text>}
            {ids.includes(item.id) && <Text style={{ color: colors.text, marginLeft: 'auto' }}>✓</Text>}
          </Pressable>} />}
      <Pressable role="button" accessibilityLabel="발행 토픽 저장" disabled={!validSelection} accessibilityState={{ disabled: !validSelection }} onPress={() => onSave(ids)} style={{ minHeight: 48, margin: 24, marginTop: 8, borderRadius: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.text }}><Text style={{ color: colors.background }}>Save</Text></Pressable>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
