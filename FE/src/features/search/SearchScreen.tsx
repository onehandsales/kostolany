import { useRef, useState } from 'react';
import { FlatList, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../shared/theme/tokens';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { exploreArticles, normalizeQuery, searchTopics } from './data/mockSearchSource';
import { previewSearchSource } from './data/searchPreview';
import { SearchByline, SearchCard } from './SearchCard';
import { SearchIcon } from './SearchIcon';
import type { SearchSource } from './types';
import { useSearch } from './useSearch';

export function SearchScreen({ onSelectArticle, source = previewSearchSource }: {
  onSelectArticle: (id: string) => void; source?: SearchSource;
}) {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const input = useRef<TextInput>(null);
  const normalized = normalizeQuery(query);
  const chooseTopic = (topic: string) => { Keyboard.dismiss(); setQuery(topic); setSearching(true); };
  const selectArticle = (id: string) => { Keyboard.dismiss(); onSelectArticle(id); };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.frame}>
        {!searching ? <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.landing}>
          <Text role="heading" style={styles.title}>탐색</Text>
          <Pressable role="button" accessibilityLabel="기사 검색 열기" onPress={() => setSearching(true)} style={styles.searchEntry}>
            <View style={styles.entrySurface}><SearchIcon name="search" /><Text style={styles.placeholder}>기사 검색</Text></View>
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {searchTopics.map((topic) => <Pressable key={topic} role="button" accessibilityLabel={`${topic} 검색`}
              onPress={() => chooseTopic(topic)} style={styles.chipTarget}><View style={styles.chip}><Text style={styles.topic}>{topic}</Text></View></Pressable>)}
          </ScrollView>
          <View style={styles.reading}>
            <Text role="heading" style={styles.sectionTitle}>읽어볼 기사</Text>
            {exploreArticles.map((article, index) => <Pressable key={article.id} role="button" accessibilityLabel={article.title}
              onPress={() => selectArticle(article.id)} style={({ pressed }) => [styles.ranked, pressed && styles.pressed]}>
              <Text style={styles.rank}>{index + 1}</Text>
              <View style={styles.rankedBody}><SearchByline name={article.sourceName} />
                <Text style={styles.rankedTitle}>{article.title}</Text>
                <Text style={styles.metadata}>{article.publishedLabel} · {article.readingMinutes}분 읽기</Text>
              </View>
            </Pressable>)}
          </View>
        </ScrollView> : <>
          <View style={styles.searchHeader}>
            <Pressable role="button" accessibilityLabel="탐색 첫 화면으로 돌아가기" style={styles.iconButton}
              onPress={() => { Keyboard.dismiss(); setQuery(''); setSearching(false); }}><SearchIcon name="back" /></Pressable>
            <View style={styles.inputSurface}>
              <View pointerEvents="none" style={styles.inputBackground} />
              <View style={styles.searchIcon}><SearchIcon name="search" /></View>
              <TextInput ref={input} accessibilityLabel="기사 검색어" placeholder="기사 검색" placeholderTextColor={colors.secondaryText}
                value={query} onChangeText={setQuery} autoFocus={!query} autoCorrect={false} autoCapitalize="none"
                maxLength={100} returnKeyType="search" onSubmitEditing={Keyboard.dismiss} style={styles.input} />
              {query.length > 0 && <Pressable role="button" accessibilityLabel="검색어 지우기" style={styles.clear}
                onPress={() => { setQuery(''); input.current?.focus(); }}><SearchIcon name="clear" /></Pressable>}
            </View>
          </View>
          {!normalized ? <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.empty}>
            <Text role="heading" style={styles.sectionTitle}>주제로 찾아보기</Text>
            <Text style={styles.emptyHint}>검색어를 입력하거나 주제를 선택하세요.</Text>
            {searchTopics.map((topic) => <Pressable key={topic} role="button" accessibilityLabel={`${topic} 검색`}
              onPress={() => chooseTopic(topic)} style={styles.topicRow}><Text style={styles.topic}>{topic}</Text><SearchIcon name="next" /></Pressable>)}
          </ScrollView> : <SearchResults key={normalized} query={normalized} source={source} onSelect={selectArticle} />}
        </>}
      </View>
    </SafeAreaView>
  );
}

function SearchResults({ query, source, onSelect }: { query: string; source: SearchSource; onSelect: (id: string) => void }) {
  const { state, retry } = useSearch(query, source);
  return <View style={styles.results} accessibilityLabel={`${query} 검색 결과`}>
    <View style={styles.resultHeader}>
      <View style={styles.activeCategory}><Text role="heading" style={styles.category}>기사</Text></View>
      {state.status === 'ready' && <Text accessibilityLiveRegion="polite" style={styles.count}>{state.items.length}개</Text>}
    </View>
    {state.status === 'loading' && <ContentStatus message="기사를 검색하고 있어요" loading />}
    {state.status === 'error' && <ContentStatus message="검색 결과를 불러오지 못했어요" error actionLabel="검색 다시 시도" onAction={retry} />}
    {state.status === 'ready' && <FlatList data={state.items} keyExtractor={(item) => item.id}
      accessibilityLabel="검색 기사 목록" keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag"
      renderItem={({ item, index }) => <SearchCard article={item} first={index === 0} onSelect={onSelect} />}
      ListEmptyComponent={<View style={styles.noResults}><Text role="heading" style={styles.sectionTitle}>검색 결과가 없어요</Text>
        <Text style={styles.emptyHint}>다른 검색어로 찾아보세요.</Text></View>} />}
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  frame: { flex: 1, width: '100%', maxWidth: 680, alignSelf: 'center' },
  landing: { paddingTop: 20, paddingBottom: 24 },
  title: { fontSize: 24, lineHeight: 32, fontWeight: '700', color: colors.text, marginHorizontal: 24, marginBottom: 12 },
  searchEntry: { minHeight: 48, marginHorizontal: 24, justifyContent: 'center' },
  entrySurface: { backgroundColor: '#f2f2f2', borderRadius: 4, minHeight: 36, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12 },
  placeholder: { fontSize: 14, lineHeight: 20, color: colors.secondaryText },
  chips: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 12, gap: 8 },
  chipTarget: { minHeight: 48, justifyContent: 'center' },
  chip: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#f2f2f2', borderRadius: 24 },
  topic: { fontSize: 16, lineHeight: 24, color: colors.text },
  reading: { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth, paddingHorizontal: 24, paddingTop: 28 },
  sectionTitle: { fontSize: 20, lineHeight: 28, fontWeight: '700', color: colors.text },
  ranked: { flexDirection: 'row', gap: 12, paddingTop: 24, paddingBottom: 8 },
  rank: { fontSize: 14, lineHeight: 20, color: colors.secondaryText },
  rankedBody: { flex: 1, gap: 10 },
  rankedTitle: { fontSize: 18, lineHeight: 25, fontWeight: '700', color: colors.text },
  metadata: { fontSize: 13, lineHeight: 20, color: colors.secondaryText },
  pressed: { opacity: 0.6 },
  searchHeader: { flexDirection: 'row', alignItems: 'center', minHeight: 48, paddingRight: 24, paddingLeft: 8,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  iconButton: { width: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  inputSurface: { flex: 1, flexDirection: 'row', alignItems: 'center', minHeight: 48 },
  inputBackground: { position: 'absolute', top: 6, bottom: 6, left: 0, right: 0, backgroundColor: '#f2f2f2', borderRadius: 4 },
  searchIcon: { paddingLeft: 10, paddingRight: 8, zIndex: 1 },
  input: { flex: 1, minWidth: 0, minHeight: 48, padding: 0, fontSize: 14, lineHeight: 20, color: colors.text,
    position: 'relative', zIndex: 1 },
  clear: { width: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  empty: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  emptyHint: { fontSize: 14, lineHeight: 22, color: colors.secondaryText, marginTop: 8 },
  topicRow: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  results: { flex: 1 },
  resultHeader: { minHeight: 56, flexDirection: 'row', alignItems: 'stretch', paddingHorizontal: 24, gap: 16,
    borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth },
  activeCategory: { justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: colors.text },
  category: { fontSize: 14, lineHeight: 20, color: colors.text, paddingVertical: 16 },
  count: { fontSize: 13, lineHeight: 20, color: colors.secondaryText, alignSelf: 'center' },
  noResults: { padding: 24 },
});
