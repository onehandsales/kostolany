import { useState } from 'react';
import { MembershipSheet } from '../membership/MembershipSheet';
import { useMembership } from '../membership/MembershipProvider';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { useUserLists } from '../bookmarks/useBookmarks';
import { useDownloads } from './DownloadProvider';

function DownloadIcon({ complete = false, pending = false, size = 20 }: { complete?: boolean; pending?: boolean; size?: number }) {
  const { colors } = useTheme();
  return <Svg width={size} height={size} viewBox="0 0 24 24" aria-hidden accessible={Platform.OS === 'web' ? undefined : false}>
    <Circle cx={12} cy={12} r={10.5} stroke={colors.secondaryText} strokeWidth={0.8} fill={complete ? colors.secondaryText : 'none'} />
    {pending ? <Rect x={8} y={8} width={8} height={8} fill={colors.text} /> :
      <Path d="M12 5v13m-4-4 4 4 4-4" fill="none" stroke={complete ? colors.background : colors.secondaryText} strokeWidth={1} />}
  </Svg>;
}
export function DownloadControl({ listId, label = 'Download list' }: { listId: string; label?: string }) {
  const { store, state, ready } = useDownloads();
  const membership = useMembership();
  const [showMembership, setShowMembership] = useState(false);
  const lists = useUserLists();
  const current = lists.entries.find(entry => entry.listId === listId);
  const entry = state.entries.find(item => item.listId === listId);
  const pending = entry?.phase === 'downloading';
  const complete = entry?.phase === 'complete';
  const disabled = !ready || (!pending && !complete && (!current?.confirmed?.articleIds.length || current.isPending));
  const action = pending ? '다운로드 취소' : complete ? '다운로드 제거' : entry ? '다운로드 다시 시도' : label;
  const progress = pending ? `, ${Object.keys(entry.items).length}/${entry.snapshot.articleIds.length}` : '';
  return <>
    {showMembership && <MembershipSheet onClose={() => setShowMembership(false)} />}
    <Pressable role="button" accessibilityLabel={`${action}${progress}`} disabled={disabled}
    accessibilityState={{ disabled, selected: complete && !entry.outdated }}
    onPress={() => {
      if (!pending && !complete && membership && !membership.allows('offline')) { setShowMembership(true); return; }
      if (pending) store?.cancel(listId); else if (complete) store?.remove(listId); else void store?.start(listId);
    }}
    style={styles.target}>
    <DownloadIcon pending={pending} complete={complete && !entry.outdated} />
  </Pressable></>;
}
export function DownloadFeedback({ listId }: { listId: string }) {
  const membership = useMembership();
  const [showMembership, setShowMembership] = useState(false);
  const { store, state } = useDownloads();
  const lists = useUserLists();
  const current = lists.entries.find(item => item.listId === listId);
  const disabled = !current?.confirmed?.articleIds.length || current.isPending;
  const themed = useThemeStyles(createStyles);
  const entry = state.entries.find(item => item.listId === listId);
  if (!entry || (entry.phase !== 'error' && entry.phase !== 'cancelled' && !entry.outdated)) return null;
  return <View style={themed.feedback}>
    {showMembership && <MembershipSheet onClose={() => setShowMembership(false)} />}
    <Text role={entry.phase === 'error' ? 'alert' : undefined} style={themed.message}>
      {entry.outdated ? '목록이나 기사 내용이 변경되었어요. 사본을 다시 받을 수 있어요.' :
        entry.phase === 'error' ? '다운로드를 완료하지 못했어요.' : '다운로드를 중단했어요.'}
      {` ${Object.keys(entry.items).length}/${entry.snapshot.articleIds.length}개 이용 가능`}
    </Text>
    <View style={styles.actions}>
      <Pressable role="button" accessibilityLabel="다운로드 재시도" style={styles.target} disabled={disabled}
        accessibilityState={{ disabled }} onPress={() => { if (membership && !membership.allows('offline')) setShowMembership(true); else void store?.start(listId); }}>
        <Text style={themed.link}>{entry.outdated ? 'Download again' : 'Retry'}</Text>
      </Pressable>
      <Pressable role="button" accessibilityLabel="다운로드 사본 제거" style={styles.target} onPress={() => store?.remove(listId)}>
        <Text style={themed.link}>Remove download</Text>
      </Pressable>
    </View>
  </View>;
}
export function DownloadArticleStatus({ listId, articleId, title }: { listId: string; articleId: string; title: string }) {
  const { state } = useDownloads();
  const available = Boolean(state.entries.find(entry => entry.listId === listId)?.items[articleId]);
  return <View accessible accessibilityLabel={`${available ? '다운로드됨' : '다운로드 안 됨'}, ${title}`}>
    <DownloadIcon complete={available} size={16} />
  </View>;
}
const styles = StyleSheet.create({ target: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 24 } });
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  feedback: { paddingHorizontal: 24, paddingVertical: 12, gap: 8 },
  message: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.secondaryText },
  link: { fontFamily: fonts.sans, fontSize: 14, color: colors.green },
});
