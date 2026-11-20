import { useCommunityNavigation } from '../community/CommunityNavigation';
import { topicByName } from '../topics/data/topicCatalog';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useArticleModeration } from '../moderation/articleModeration';
import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ReferenceNotice } from '../../shared/ui/ReferenceNotice';
import { WriteButton } from '../../shared/ui/WriteButton';
import { mediumExploreArticles } from '../feed/data/mediumFixtures';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { exploreArticles, normalizeQuery, searchTopics } from './data/mockSearchSource';
import { previewSearchSource } from './data/searchPreview';
import { ExploreSections } from './ExploreSections';
import { SearchByline, SearchCard } from './SearchCard';
import { SearchIcon } from './SearchIcon';
import type { SearchSource } from './types';
import { useSearch } from './useSearch';

const discoveryTopics = [
  'Writing',
  'Machine Learning',
  'Relationships',
  'Productivity',
  'Health',
  'Science',
  'Business',
  'Life',
  'Software Development',
  ...searchTopics,
];
const topicDirectory = [
  'Life',
  'Self Improvement',
  'Work',
  'Technology',
  'Software Development',
  'Media',
  'Society',
  'Culture',
  'World',
  ...searchTopics,
];

type SearchScreenProps = {
  onSelectArticle: (id: string) => void;
  source?: SearchSource;
  isFocused?: boolean;
};

export function SearchScreen({
  onSelectArticle,
  source = previewSearchSource,
  isFocused = false,
}: SearchScreenProps) {
  const navigation = useCommunityNavigation();
  const moderation = useArticleModeration();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const input = useRef<TextInput>(null);
  const normalized = normalizeQuery(query);
  const handleCloseSearch = useCallback(() => {
    Keyboard.dismiss();
    setQuery('');
    setIsSearching(false);
  }, []);
  useEffect(() => {
    if (!isFocused || !isSearching) return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      handleCloseSearch();
      return true;
    });
    return () => subscription.remove();
  }, [isFocused, isSearching, handleCloseSearch]);
  const handleChooseTopic = (topic: string) => {
    Keyboard.dismiss();
    const found = topicByName(topic);
    if (found) navigation.openTopic(found.id);
    else {
      setQuery(topic);
      setIsSearching(true);
    }
  };
  const handleSelectArticle = (id: string) => {
    Keyboard.dismiss();
    onSelectArticle(id);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      <View style={styles.frame}>
        {!isSearching ? (
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.landing}>
            <Text role="heading" accessibilityLabel="탐색" style={styles.title}>
              Explore
            </Text>
            <Pressable
              role="button"
              accessibilityLabel="기사 검색 열기"
              onPress={() => setIsSearching(true)}
              style={styles.searchEntry}
            >
              <View style={styles.entrySurface}>
                <SearchIcon name="search" />
                <Text style={styles.placeholder}>Search Medium</Text>
              </View>
            </Pressable>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
            >
              {discoveryTopics.map((topic) => (
                <Pressable
                  key={topic}
                  role="button"
                  accessibilityLabel={searchTopics.includes(topic) ? `${topic} 검색` : `Open topic ${topic}`}
                  onPress={() => handleChooseTopic(topic)}
                  style={styles.chipTarget}
                >
                  <View style={styles.chip}>
                    <Text style={styles.topic}>{topic}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.reading}>
              <Text role="heading" style={styles.sectionTitle}>
                Trending on Medium
              </Text>
              {mediumExploreArticles
                .filter((article) => !moderation.excluded(article.id))
                .map((article, index) => (
                  <Pressable
                    key={article.id}
                    role="button"
                    accessibilityLabel={article.title}
                    onPress={() => handleSelectArticle(article.id)}
                    style={({ pressed }) => [styles.ranked, pressed && styles.pressed]}
                  >
                    <Text style={styles.rank}>{index + 1}</Text>
                    <View style={styles.rankedBody}>
                      <SearchByline
                        name={article.sourceName}
                        avatar={article.reference?.avatar}
                        emphasized
                        verified={article.reference?.verifiedAuthor}
                      />
                      <Text style={styles.rankedTitle}>{article.title}</Text>
                      <View style={styles.dateRow}>
                        {article.reference?.memberOnly && (
                          <AppIcon name="star" color={colors.gold} size={16} />
                        )}
                        <Text style={styles.metadata}>{article.publishedLabel}</Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
            </View>
            <ExploreSections onSelect={handleSelectArticle} />
            <View style={styles.reading}>
              <Text role="heading" style={styles.sectionTitle}>
                읽어볼 기사
              </Text>
              {exploreArticles
                .filter((article) => !moderation.excluded(article.id))
                .map((article, index) => (
                  <Pressable
                    key={article.id}
                    role="button"
                    accessibilityLabel={article.title}
                    onPress={() => handleSelectArticle(article.id)}
                    style={({ pressed }) => [styles.ranked, pressed && styles.pressed]}
                  >
                    <Text style={styles.rank}>{index + 1}</Text>
                    <View style={styles.rankedBody}>
                      <SearchByline name={article.sourceName} />
                      <Text style={styles.rankedTitle}>{article.title}</Text>
                      <Text style={styles.metadata}>
                        {article.publishedLabel} · {article.readingMinutes}분 읽기
                      </Text>
                    </View>
                  </Pressable>
                ))}
            </View>
          </ScrollView>
        ) : (
          <>
            <View style={styles.searchHeader}>
              <Pressable
                role="button"
                accessibilityLabel="탐색 첫 화면으로 돌아가기"
                style={styles.iconButton}
                onPress={handleCloseSearch}
              >
                <SearchIcon name="back" />
              </Pressable>
              <View style={styles.inputSurface}>
                <View
                  pointerEvents="none"
                  style={[styles.inputBackground, inputFocused && styles.inputFocused]}
                />
                <View style={styles.searchIcon}>
                  <SearchIcon name="search" />
                </View>
                <TextInput
                  ref={input}
                  accessibilityLabel="기사 검색어"
                  placeholder="Search Medium"
                  placeholderTextColor={colors.secondaryText}
                  value={query}
                  onChangeText={setQuery}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  autoFocus={!query}
                  autoCorrect={false}
                  autoCapitalize="none"
                  maxLength={100}
                  returnKeyType="search"
                  onSubmitEditing={Keyboard.dismiss}
                  style={styles.input}
                />
                {query.length > 0 && (
                  <Pressable
                    role="button"
                    accessibilityLabel="검색어 지우기"
                    style={styles.clear}
                    onPress={() => {
                      setQuery('');
                      input.current?.focus();
                    }}
                  >
                    <SearchIcon name="clear" />
                  </Pressable>
                )}
              </View>
            </View>
            {!normalized ? (
              <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.empty}>
                <Text role="heading" accessibilityLabel="주제로 찾아보기" style={styles.sectionTitle}>
                  Explore topics
                </Text>
                {topicDirectory.map((topic) => (
                  <Pressable
                    key={topic}
                    role="button"
                    accessibilityLabel={
                      searchTopics.includes(topic) ? `${topic} 검색` : `Open topic ${topic}`
                    }
                    onPress={() => handleChooseTopic(topic)}
                    style={styles.topicRow}
                  >
                    <Text style={styles.topic}>{topic}</Text>
                    <SearchIcon name="next" />
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <SearchResults
                key={normalized}
                query={normalized}
                source={source}
                onSelect={handleSelectArticle}
              />
            )}
          </>
        )}
      </View>
      {!isSearching && <WriteButton />}
    </SafeAreaView>
  );
}

function SearchResults({
  query,
  source,
  onSelect,
}: {
  query: string;
  source: SearchSource;
  onSelect: (id: string) => void;
}) {
  const moderation = useArticleModeration();
  const styles = useThemeStyles(createStyles);
  const { state, retry } = useSearch(query, source);
  const [notice, setNotice] = useState<string | null>(null);
  return (
    <View style={styles.results} accessibilityLabel={`${query} 검색 결과`}>
      <ScrollView
        horizontal
        role="tablist"
        accessibilityLabel="Search categories"
        showsHorizontalScrollIndicator={false}
        style={styles.resultTabs}
        contentContainerStyle={styles.resultHeader}
      >
        <Pressable
          role="tab"
          accessibilityState={{ selected: true }}
          accessibilityLabel="Stories"
          style={styles.activeCategory}
        >
          <Text style={styles.category}>Stories</Text>
        </Pressable>
        {['People', 'Publications', 'Topics', 'Lists'].map((category) => (
          <Pressable
            key={category}
            role="tab"
            accessibilityState={{ selected: false }}
            accessibilityLabel={category}
            onPress={() => setNotice(category)}
            style={styles.categoryTarget}
          >
            <Text style={[styles.category, styles.inactiveCategory]}>{category}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {state.status === 'ready' && !state.items.some((item) => item.reference) && (
        <Text accessibilityLiveRegion="polite" style={styles.count}>
          {state.items.length}개
        </Text>
      )}
      {state.status === 'loading' && <ContentStatus message="기사를 검색하고 있어요" loading />}
      {state.status === 'error' && (
        <ContentStatus
          message="검색 결과를 불러오지 못했어요"
          error
          actionLabel="검색 다시 시도"
          onAction={retry}
        />
      )}
      {state.status === 'ready' && (
        <FlatList
          data={state.items.filter((article) => !moderation.blocked(article.id))}
          keyExtractor={(item) => item.id}
          accessibilityLabel="검색 기사 목록"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          renderItem={({ item, index }) => (
            <SearchCard article={item} first={index === 0} onSelect={onSelect} />
          )}
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Text role="heading" style={styles.sectionTitle}>
                검색 결과가 없어요
              </Text>
              <Text style={styles.emptyHint}>다른 검색어로 찾아보세요.</Text>
            </View>
          }
        />
      )}
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    frame: { flex: 1, width: '100%', maxWidth: 680, alignSelf: 'center' },
    landing: { paddingTop: 24, paddingBottom: 24 },
    title: {
      fontFamily: fonts.sans,
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '600',
      color: colors.text,
      marginHorizontal: 24,
      marginBottom: 12,
    },
    searchEntry: {
      minHeight: 48,
      marginHorizontal: 24,
      justifyContent: 'center',
    },
    entrySurface: {
      backgroundColor: colors.input,
      borderRadius: 4,
      minHeight: 36,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 12,
    },
    placeholder: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.secondaryText,
    },
    chips: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 10, gap: 8 },
    chipTarget: { minHeight: 48, justifyContent: 'center' },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      backgroundColor: colors.input,
      borderRadius: 24,
    },
    topic: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
    reading: {
      borderTopColor: colors.input,
      borderTopWidth: 2,
      paddingHorizontal: 24,
      paddingTop: 32,
    },
    sectionTitle: {
      fontFamily: fonts.sans,
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600',
      color: colors.text,
    },
    ranked: {
      flexDirection: 'row',
      gap: 14,
      paddingTop: 31,
      paddingBottom: 15,
    },
    rank: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
    },
    rankedBody: { flex: 1, gap: 8 },
    rankedTitle: {
      fontFamily: fonts.sans,
      fontSize: 16,
      lineHeight: 21,
      fontWeight: '700',
      color: colors.text,
    },
    dateRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    metadata: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
    },
    pressed: { opacity: 0.6 },
    searchHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 52,
      paddingRight: 24,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    iconButton: {
      width: 56,
      minHeight: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputSurface: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 48,
    },
    inputBackground: {
      position: 'absolute',
      top: 6,
      bottom: 6,
      left: 0,
      right: 0,
      backgroundColor: colors.input,
      borderRadius: 4,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    inputFocused: { borderBottomColor: colors.green },
    searchIcon: { paddingLeft: 16, paddingRight: 12, zIndex: 1 },
    input: {
      outlineStyle: 'solid',
      outlineWidth: 0,
      outlineColor: 'transparent',
      flex: 1,
      minWidth: 0,
      minHeight: 48,
      padding: 0,
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
      position: 'relative',
      zIndex: 1,
    },
    clear: {
      width: 48,
      minHeight: 48,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    empty: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
    emptyHint: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 22,
      color: colors.secondaryText,
      marginTop: 8,
    },
    topicRow: {
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    },
    results: { flex: 1 },
    resultTabs: {
      flexGrow: 0,
      flexShrink: 0,
      borderBottomColor: colors.border,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    resultHeader: {
      minHeight: 54,
      flexDirection: 'row',
      alignItems: 'stretch',
      paddingHorizontal: 24,
      gap: 32,
    },
    categoryTarget: { minHeight: 48, minWidth: 48, justifyContent: 'center' },
    activeCategory: {
      minWidth: 48,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
    },
    category: {
      fontFamily: fonts.sans,
      fontSize: 14,
      lineHeight: 20,
      color: colors.text,
      paddingVertical: 16,
    },
    inactiveCategory: { color: colors.secondaryText },
    count: {
      fontFamily: fonts.sans,
      fontSize: 13,
      lineHeight: 20,
      color: colors.secondaryText,
      alignSelf: 'center',
    },
    noResults: { padding: 24 },
  });
