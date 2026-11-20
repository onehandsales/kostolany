import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { useListening } from './ListeningProvider';
import { ListeningOptionSheet } from './ListeningOptionSheet';
import { useListeningVoices } from './useListeningVoices';
import type { ListeningVoice } from './listeningOptions';
import { VoiceFlag } from './VoiceFlag';

export function ListeningVoicePanel({ onClose }: { onClose: () => void }) {
  const { store, snapshot } = useListening();
  const [voiceId, setVoiceId] = useState(snapshot.options.voiceId);
  const [query, setQuery] = useState('');
  const result = useListeningVoices(query);
  const { colors } = useTheme();
  const styles = useThemeStyles(createStyles);
  const sections = useMemo(() => {
    const groups = new Map<string, ListeningVoice[]>();
    for (const voice of result.voices)
      groups.set(voice.section, [...(groups.get(voice.section) ?? []), voice]);
    return [...groups].map(([title, data]) => ({ title, data }));
  }, [result.voices]);
  return (
    <ListeningOptionSheet title="Select Voice" options={{ ...snapshot.options, voiceId }} onClose={onClose}>
      <SectionList
        sections={sections}
        keyExtractor={(voice) => voice.id}
        stickySectionHeadersEnabled={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View style={styles.searchArea}>
            <View style={styles.search}>
              <View pointerEvents="none" style={styles.searchSurface} />
              <View pointerEvents="none" style={styles.searchIcon}>
                <AppIcon name="search" size={22} color={colors.secondaryText} />
              </View>
              <TextInput
                accessibilityLabel="Search for a voice"
                editable={snapshot.optionsStatus !== 'saving'}
                value={query}
                onChangeText={setQuery}
                placeholder="Search for a voice"
                placeholderTextColor={colors.secondaryText}
                style={styles.input}
                maxLength={100}
                returnKeyType="search"
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          result.status === 'loading' ? (
            <ActivityIndicator color={colors.secondaryText} accessibilityLabel="음성 조회 중" />
          ) : result.status === 'error' ? (
            <ContentStatus
              error
              message="Couldn’t load voices."
              actionLabel="Retry voices"
              onAction={result.retry}
            />
          ) : (
            <ContentStatus message="No voices found" />
          )
        }
        renderSectionHeader={({ section }) => (
          <Text style={[styles.section, section.title !== sections[0]?.title && { paddingTop: 28 }]}>
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <Pressable
            role="radio"
            accessibilityLabel={`${item.name}, ${item.gender}, ${item.country}`}
            accessibilityState={{
              checked: item.id === voiceId,
              disabled: snapshot.optionsStatus === 'saving',
            }}
            disabled={snapshot.optionsStatus === 'saving'}
            aria-checked={item.id === voiceId}
            onPress={() => {
              if (store?.getSnapshot().optionsStatus !== 'saving') setVoiceId(item.id);
            }}
            style={[styles.row, item.id === voiceId && styles.selected]}
          >
            <View style={styles.check}>
              {item.id === voiceId && (
                <View style={styles.checked}>
                  <AppIcon name="check" color="#fff" size={18} />
                </View>
              )}
            </View>
            <VoiceFlag code={item.countryCode} />
            <View style={styles.copy}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>
                {item.gender} · {item.country}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </ListeningOptionSheet>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    searchArea: { paddingHorizontal: 16, paddingBottom: 22 },
    search: {
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: 8,
      gap: 8,
    },
    searchSurface: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 36,
      borderRadius: 11,
      backgroundColor: colors.input,
    },
    searchIcon: { marginTop: 7 },
    input: {
      position: 'relative',
      flex: 1,
      minHeight: 48,
      paddingTop: 2,
      paddingBottom: 14,
      paddingHorizontal: 0,
      fontFamily: fonts.sans,
      fontSize: 17,
      color: colors.text,
    },
    section: {
      fontFamily: fonts.sans,
      fontSize: 16,
      color: colors.secondaryText,
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 6,
      minHeight: 34,
    },
    row: {
      minHeight: 72,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      paddingVertical: 12,
      paddingRight: 16,
    },
    selected: { backgroundColor: colors.input },
    check: { width: 50, alignItems: 'center' },
    checked: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: colors.green,
      alignItems: 'center',
      justifyContent: 'center',
    },
    copy: { flex: 1, marginLeft: 12 },
    name: { fontFamily: fonts.sans, fontSize: 17, lineHeight: 24, color: colors.text, fontWeight: '600' },
    description: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText },
  });
