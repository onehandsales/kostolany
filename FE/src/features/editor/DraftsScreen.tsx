import { useEffect, useState, useSyncExternalStore } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import type { Draft, DraftSource } from './draftSource';

function editedTime(iso: string, now: number) {
  const minutes = Math.max(0, Math.floor((now - Date.parse(iso)) / 60000));
  if (minutes < 1) return 'just now';
  const value = minutes < 60 ? minutes : minutes < 1440 ? Math.floor(minutes / 60) : Math.floor(minutes / 1440);
  const unit = minutes < 60 ? 'minute' : minutes < 1440 ? 'hour' : 'day';
  return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
}
export function DraftsScreen({ source, userId, onOpen, onClose }: {
  source: DraftSource; userId: string; onOpen: (draftId: string) => void; onClose: () => void;
}) {
  const styles = useThemeStyles(createStyles); const [attempt, setAttempt] = useState(0);
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    // 목록을 연 채 머물러도 수정 시각은 흐르는 시간을 반영하며 저장 요청은 만들지 않는다.
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);
  const revision = useSyncExternalStore(source.subscribe, source.getRevision, source.getRevision);
  const [result, setResult] = useState<{ source: DraftSource; userId: string; revision: number; attempt: number; items: Draft[] | null } | null>(null);
  const current = result?.source === source && result.userId === userId && result.revision === revision && result.attempt === attempt ? result : null;
  useEffect(() => {
    const abort = new AbortController();
    void Promise.resolve().then(() => source.list(userId, abort.signal)).then(items => {
      if (items.some(item => item.userId !== userId) || new Set(items.map(item => item.id)).size !== items.length) throw new Error('invalid-draft-list');
      if (!abort.signal.aborted) setResult({ source, userId, revision, attempt, items });
    }).catch(() => { if (!abort.signal.aborted) setResult({ source, userId, revision, attempt, items: null }); });
    return () => abort.abort();
  }, [source, userId, revision, attempt]);
  return <View style={styles.backdrop}><SafeAreaView style={styles.screen}>
    <View style={styles.header}>
      <Pressable role="button" accessibilityLabel="초안 목록 닫기" onPress={onClose} style={styles.action}><Text style={styles.text}>Close</Text></Pressable>
      <Text role="heading" style={styles.heading}>Drafts</Text><View style={styles.action} />
    </View>
    {!current ? <ActivityIndicator accessibilityLabel="초안 불러오는 중" style={styles.space} /> : current.items === null ? <View style={styles.space}>
      <Text role="alert" style={styles.text}>초안을 불러오지 못했어요.</Text>
      <Pressable role="button" accessibilityLabel="초안 목록 다시 시도" onPress={() => setAttempt(value => value + 1)} style={styles.action}><Text style={styles.green}>Try again</Text></Pressable>
    </View> : <FlatList data={current.items} extraData={now} keyExtractor={item => item.id} contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.secondary}>You don’t have any drafts yet.</Text>}
      renderItem={({ item }) => <Pressable role="button" accessibilityLabel={`${item.document.title.trim() || 'Untitled'} 초안 재개`}
        onPress={() => onOpen(item.id)} style={styles.row}>
        <Text style={styles.title}>{item.document.title.trim() || 'Untitled'}</Text>
        <Text style={styles.secondary}>Edited {editedTime(item.updatedAt, now)}</Text>
      </Pressable>} />}
  </SafeAreaView></View>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  backdrop: { flex: 1, paddingTop: 10, backgroundColor: '#00000044' }, screen: { flex: 1, backgroundColor: colors.background, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  header: { minHeight: 100, paddingTop: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border, paddingHorizontal: 16 },
  action: { minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center' },
  text: { fontFamily: fonts.sans, fontSize: 14, color: colors.text }, heading: { fontFamily: fonts.sans, fontSize: 16, fontWeight: '700', color: colors.text },
  space: { padding: 24 }, list: { paddingHorizontal: 16 }, row: { minHeight: 76, paddingVertical: 12, gap: 8 },
  title: { fontFamily: fonts.sans, fontSize: 16, fontWeight: '700', color: colors.text }, secondary: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText }, green: { fontFamily: fonts.sans, fontSize: 16, color: colors.green },
});
