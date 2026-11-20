import { useEffect, useRef, useState, type ReactNode } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { useProfile } from '../profile/ProfileProvider';
import { useHighlights } from './HighlightProvider';
import { highlightOperation, type Highlight } from './types';

export function HighlightList({ header, onOpen }: { header: ReactNode; onOpen: (articleId: string, highlightId: string) => void }) {
  const { state, store } = useHighlights();
  const profile = useProfile();
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const [failure, setFailure] = useState<{ value: Highlight; operationId: string } | null>(null);
  const busy = useRef(false);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  async function remove(value: Highlight, operationId = highlightOperation()) {
    if (!store || busy.current) return;
    busy.current = true; setFailure(null);
    const ok = await store.set({ operationId, highlight: value, selected: false });
    busy.current = false;
    if (!ok && mounted.current) setFailure({ value, operationId });
  }
  return <FlatList data={[...(state?.value?.highlights ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id))}
    keyExtractor={item => item.id} contentContainerStyle={styles.content} ListHeaderComponent={<View>{header}
      {state?.readError && <ContentStatus error message="하이라이트를 불러오지 못했어요" actionLabel="하이라이트 다시 불러오기" onAction={() => store?.retry()} />}
      {failure && <ContentStatus error message="하이라이트를 삭제하지 못했어요" actionLabel="하이라이트 삭제 다시 시도" onAction={() => { void remove(failure.value, failure.operationId); }} />}
    </View>}
    ListEmptyComponent={<ContentStatus message={state?.status === 'loading' ? '하이라이트를 불러오고 있어요' : 'No highlights yet'} loading={state?.status === 'loading'} />}
    renderItem={({ item }) => <View style={styles.card}>
      <Pressable role="button" accessibilityLabel={`하이라이트 원문: ${item.title}`} onPress={() => onOpen(item.articleId, item.id)} style={{ minHeight: 48 }}>
        <Text style={styles.owner}>{profile.state.profile?.name ?? 'You'} highlighted</Text>
        <Text style={styles.quote}><Text style={{ backgroundColor: colors.highlight }}>{item.text}</Text></Text>
        <Text style={styles.byline}>{item.title} by {item.author}</Text>
      </Pressable>
      <Pressable role="button" accessibilityLabel={`하이라이트 제거: ${item.text}`} disabled={Boolean(state?.pending)} accessibilityState={{ disabled: Boolean(state?.pending) }}
        style={styles.remove} onPress={() => { void remove(item); }}><Text style={styles.removeText}>Remove highlight</Text></Pressable>
    </View>} />;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({ content: { flexGrow: 1, width: '100%', maxWidth: 728, alignSelf: 'center', paddingBottom: 24 },
  card: { marginHorizontal: 24, paddingHorizontal: 8, paddingTop: 24, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  owner: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, color: colors.green, marginBottom: 12 },
  quote: { fontFamily: fonts.serif, fontSize: 16, lineHeight: 24, color: colors.text },
  byline: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.text, marginTop: 16 },
  remove: { minHeight: 48, minWidth: 48, alignItems: 'flex-end', justifyContent: 'center' }, removeText: { fontFamily: fonts.sans, fontSize: 12, color: colors.secondaryText } });
