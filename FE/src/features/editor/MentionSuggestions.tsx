import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { useDirectory } from '../community/DirectoryProvider';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { mentionQuery, type EditorValue, type MentionTarget } from './editorModel';

type MentionCandidate = { target: MentionTarget; avatar?: ImageSourcePropType };

export function MentionSuggestions({ value, active, onSelect }: { value: EditorValue; active: boolean; onSelect: (value: EditorValue, target: MentionTarget) => void }) {
  const { state, retry } = useDirectory(); const { colors } = useTheme();
  const styles = useThemeStyles(createStyles);
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
  return <View accessibilityLabel="멘션 검색 결과" style={styles.panel}>
    {!query.query ? <Text style={{ color: colors.secondaryText, paddingVertical: 12, paddingHorizontal: 10, textAlign: 'center' }}>Start typing a user’s name to mention them.</Text> : state.status === 'error' ? <>
      <Text role="alert" style={{ color: colors.text, paddingHorizontal: 10 }}>사용자를 불러오지 못했어요.</Text>
      <Pressable role="button" accessibilityLabel="멘션 검색 다시 시도" onPress={retry} style={{ minHeight: 48, paddingHorizontal: 10, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable>
    </> : !items || state.status === 'loading' ? <ActivityIndicator accessibilityLabel="멘션 검색 중" style={{ minHeight: 48 }} /> :
      <FlatList data={items} keyExtractor={item => item.target.id} keyboardShouldPersistTaps="always"
        ListEmptyComponent={<Text style={{ color: colors.secondaryText, paddingVertical: 12, paddingHorizontal: 10 }}>No users found</Text>}
        renderItem={({ item: { target, avatar }, index }) => <Pressable role="button" accessibilityLabel={`${target.name} @${target.handle} 멘션`} style={styles.row}
          onPressIn={event => event.preventDefault()} onPress={() => onSelect(value, target)}>
          <View style={styles.avatar}>
            {avatar && <Image source={avatar} accessible={false} style={styles.avatarImage} />}
          </View>
          {/* 후보 사이의 선은 이름 시작점부터 그리며 확대된 핸들은 다음 줄로 흐르게 한다. */}
          <View style={[styles.details, index < items.length - 1 && styles.separator]}>
            <Text style={styles.name}>{target.name}</Text><Text style={styles.handle}>@{target.handle}</Text>
          </View>
        </Pressable>} />}
  </View>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  panel: {
    borderTopWidth: 1, borderColor: colors.divider,
    backgroundColor: colors.background === '#ffffff' ? '#f7f7f7' : colors.surface, maxHeight: 222,
  },
  row: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 10, paddingLeft: 10 },
  avatar: {
    width: 32, height: 32, borderRadius: 16, flexShrink: 0, overflow: 'hidden',
    backgroundColor: colors.background === '#ffffff' ? '#dadad9' : colors.border,
  },
  avatarImage: { width: 32, height: 32 },
  details: {
    flex: 1, minWidth: 0, minHeight: 48, flexDirection: 'row', flexWrap: 'wrap',
    alignItems: 'center', alignContent: 'center', columnGap: 10, rowGap: 2, paddingVertical: 8, paddingRight: 10,
  },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.background === '#ffffff' ? '#bfbfc1' : colors.border,
  },
  name: {
    color: colors.background === '#ffffff' ? '#292929' : colors.text,
    fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, flexShrink: 1,
  },
  handle: {
    color: colors.background === '#ffffff' ? '#aaacab' : colors.secondaryText,
    fontFamily: fonts.sans, fontSize: 12, lineHeight: 18, flexShrink: 1,
  },
});
