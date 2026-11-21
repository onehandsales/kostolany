import { useCallback, useEffect, useState, type ReactElement } from 'react';
import { Animated, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { useReorderDrag } from './useReorderDrag';
import { useBookmarkStore, useUserLists } from './useBookmarks';

type ReorderListEditorProps = { listId: string; header: ReactElement; onClose: () => void };
export function ReorderListEditor({ listId, header, onClose }: ReorderListEditorProps) {
  const styles = useThemeStyles(createStyles);
  const library = useBookmarkStore();
  const state = useUserLists();
  const entry = state.entries.find(item => item.listId === listId);
  const [ids, setIds] = useState([...(entry?.content?.articleIds ?? [])]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pending = submitted && Boolean(entry?.isPending);
  useEffect(() => {
    if (state.status === 'ready' && !entry?.content) onClose();
    else if (submitted && entry && !entry.isPending && !entry.failure) onClose();
  }, [state.status, entry, submitted, onClose]);
  const move = useCallback((id: string, destination: number) => {
    setIds(previous => {
      const next = previous.filter(item => item !== id);
      next.splice(Math.max(0, Math.min(destination, next.length)), 0, id);
      return next;
    });
  }, []);
  const { viewport, list, measure, panHandlers, draggedId, translateY, onScroll, onContentHeight,
    onHeaderHeight, onRowHeight, arm, disarm } = useReorderDrag(ids, pending, move);
  function save() {
    if (pending) return;
    const retryIds = entry?.failure?.target?.articleIds;
    if (!entry?.failure?.conflict && retryIds?.length === ids.length && ids.every((id, index) => id === retryIds[index])) {
      library.userLists.retryList(listId);
      setSubmitted(true);
      return;
    }
    const result = library.userLists.reorderList(listId, ids);
    if (!result.ok) { setError(result.message); return; }
    setError(null);
    setSubmitted(true);
  }
  return <View style={{ flex: 1 }}>
    <View ref={viewport} collapsable={false} onLayout={measure} style={{ flex: 1, overflow: 'hidden' }} {...panHandlers}>
    <FlatList ref={list} data={ids} keyExtractor={id => id} scrollEnabled={!draggedId} accessibilityLabel="순서 편집 기사 목록"
      onScroll={event => onScroll(event.nativeEvent.contentOffset.y)} scrollEventThrottle={16}
      onContentSizeChange={(_width, height) => onContentHeight(height)}
      ListHeaderComponent={<View onLayout={event => onHeaderHeight(event.nativeEvent.layout.height)}>{header}</View>}
      renderItem={({ item, index }) => <ReorderRow id={item}
        title={library.articles.find(article => article.id === item)?.title ?? item} disabled={pending}
        onHeight={height => onRowHeight(item, height)}
        dragging={draggedId === item} onArm={() => arm(item)} onDisarm={disarm}
        onMove={direction => move(item, index + direction)} />}
      ListFooterComponent={error ? <View><Text role="alert" style={styles.error}>{error}</Text>
        <Pressable role="button" style={styles.button} accessibilityLabel="최신 기사로 순서 다시 편집"
          onPress={() => { setIds([...(entry?.content?.articleIds ?? [])]); setError(null); }}>
          <Text style={styles.label}>Reload current stories</Text></Pressable></View> : null} />
    {draggedId && <Animated.View pointerEvents="none" style={[styles.ghost, { transform: [{ translateY: translateY }] }]}>
      <Text style={styles.title}>{library.articles.find(article => article.id === draggedId)?.title ?? draggedId}</Text>
    </Animated.View>}
    </View>
    {entry?.failure && <Text role="alert" style={styles.error}>순서를 저장하지 못했어요. 변경한 순서로 다시 시도해 주세요.</Text>}
    <View style={styles.actions}>
      <Pressable role="button" onPress={onClose} style={styles.button}><View style={styles.pill}><Text style={styles.label}>Cancel</Text></View></Pressable>
      <Pressable role="button" accessibilityLabel={entry?.failure ? '순서 저장 다시 시도' : '목록 순서 저장'}
        disabled={pending || Boolean(draggedId)} accessibilityState={{ disabled: pending || Boolean(draggedId), busy: pending }}
        onPress={save} style={styles.button}>
        <View style={[styles.pill, styles.done]}><Text style={styles.doneText}>{pending ? 'Saving…' : entry?.failure ? 'Retry' : 'Done'}</Text></View></Pressable>
    </View>
  </View>;
}

type ReorderRowProps = { id: string; title: string; disabled: boolean; dragging: boolean;
  onHeight: (height: number) => void; onArm: () => void; onDisarm: () => void; onMove: (direction: number) => void };
function ReorderRow({ title, disabled, dragging, onMove, onHeight, onArm, onDisarm }: ReorderRowProps) {
  const styles = useThemeStyles(createStyles);
  const [controls, setControls] = useState(false);
  return <View onLayout={event => onHeight(event.nativeEvent.layout.height)} style={[styles.row, dragging && { opacity: 0.25 }]}>
    <Text style={styles.title}>{title}</Text>
    <Pressable role="button" accessibilityLabel={`순서 이동, ${title}`} disabled={disabled}
      accessibilityActions={[{ name: 'increment', label: '아래로 이동' }, { name: 'decrement', label: '위로 이동' }]}
      onAccessibilityAction={event => {
        if (event.nativeEvent.actionName === 'increment') onMove(1);
        if (event.nativeEvent.actionName === 'decrement') onMove(-1);
      }}
      onPressIn={onArm} onPress={() => { onDisarm(); setControls(value => !value); }} style={[styles.handle, styles.dragHandle]}>
      <View aria-hidden style={{ gap: 4 }}>{[0, 1, 2].map(line => <View key={line} style={styles.grip} />)}</View>
    </Pressable>
    <View pointerEvents="none" style={styles.separator} />
    {controls && <View style={styles.moves}>
      <Pressable role="button" accessibilityLabel={`위로 이동, ${title}`} disabled={disabled}
        onPress={() => onMove(-1)} style={styles.handle}><Text style={styles.label}>↑</Text></Pressable>
      <Pressable role="button" accessibilityLabel={`아래로 이동, ${title}`} disabled={disabled}
        onPress={() => onMove(1)} style={styles.handle}><Text style={styles.label}>↓</Text></Pressable>
    </View>}
  </View>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  ghost: { position: 'absolute', top: 0, left: 0, right: 0, minHeight: 72, padding: 24, backgroundColor: colors.surface, boxShadow: '0 4px 12px rgba(0,0,0,0.12)' },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingVertical: 24, paddingLeft: 24, paddingRight: 64,
    minHeight: 69, backgroundColor: colors.background },
  separator: { position: 'absolute', left: 24, right: 0, bottom: 0, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  title: { flex: 1, fontFamily: fonts.sans, fontSize: 16, lineHeight: 21, fontWeight: '700', color: colors.text },
  handle: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  dragHandle: { position: 'absolute', right: 8, top: '50%', transform: [{ translateY: -24 }] },
  grip: { height: 1.5, width: 20, backgroundColor: colors.secondaryText, opacity: 0.5 },
  moves: { flexDirection: 'row', width: '100%' },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 12, padding: 24 },
  button: { minHeight: 48, minWidth: 100, alignItems: 'center', justifyContent: 'center' },
  pill: { minHeight: 38, minWidth: 100, paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  done: { backgroundColor: colors.green },
  label: { fontFamily: fonts.sans, fontSize: 14, color: colors.text },
  doneText: { fontFamily: fonts.sans, fontSize: 14, color: colors.onAccent },
  error: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.destructive, padding: 16 },
});
