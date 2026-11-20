import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, FlatList, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { LibrarySheet } from './LibrarySheet';
import { useBookmarkStore, useUserLists } from './useBookmarks';

type ReorderListSheetProps = { listId: string; onClose: () => void };
export function ReorderListSheet({ listId, onClose }: ReorderListSheetProps) {
  const styles = useThemeStyles(createStyles);
  const library = useBookmarkStore();
  const state = useUserLists();
  const entry = state.entries.find(item => item.listId === listId);
  const [ids, setIds] = useState([...(entry?.content?.articleIds ?? [])]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const heights = useRef(new Map<string, number>());
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
  const drop = useCallback((id: string, dy: number) => {
    let y = 0;
    const layouts = new Map(ids.map(item => {
      const height = heights.current.get(item) ?? 72;
      const layout = { y, height }; y += height;
      return [item, layout] as const;
    }));
    const layout = layouts.get(id);
    if (!layout) return;
    const center = layout.y + layout.height / 2 + dy;
    const destination = ids.filter(item => item !== id).filter(item => {
      const row = layouts.get(item);
      return row && row.y + row.height / 2 < center;
    }).length;
    move(id, destination);
  }, [ids, move]);
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
  return <LibrarySheet title="Reorder items" titleLabel="목록 순서 변경" expanded contentMode="list" onClose={onClose}>
    <Text style={styles.heading}>{entry?.confirmed?.name}</Text>
    <FlatList data={ids} keyExtractor={id => id} scrollEnabled={!dragging} accessibilityLabel="순서 편집 기사 목록"
      renderItem={({ item, index }) => <ReorderRow id={item}
        title={library.articles.find(article => article.id === item)?.title ?? item} disabled={pending}
        onHeight={height => heights.current.set(item, height)}
        onDrag={setDragging} onDrop={drop}
        onMove={direction => move(item, index + direction)} />}
      ListFooterComponent={error ? <View><Text role="alert" style={styles.error}>{error}</Text>
        <Pressable role="button" style={styles.button} accessibilityLabel="최신 기사로 순서 다시 편집"
          onPress={() => { setIds([...(entry?.content?.articleIds ?? [])]); setError(null); }}>
          <Text style={styles.label}>Reload current stories</Text></Pressable></View> : null} />
    {entry?.failure && <Text role="alert" style={styles.error}>순서를 저장하지 못했어요. 변경한 순서로 다시 시도해 주세요.</Text>}
    <View style={styles.actions}>
      <Pressable role="button" onPress={onClose} style={styles.button}><Text style={styles.label}>Cancel</Text></Pressable>
      <Pressable role="button" accessibilityLabel={entry?.failure ? '순서 저장 다시 시도' : '목록 순서 저장'}
        disabled={pending || dragging} accessibilityState={{ disabled: pending || dragging, busy: pending }}
        onPress={save} style={[styles.button, styles.done]}>
        <Text style={styles.doneText}>{pending ? 'Saving…' : entry?.failure ? 'Retry' : 'Done'}</Text></Pressable>
    </View>
  </LibrarySheet>;
}

type ReorderRowProps = { id: string; title: string; disabled: boolean;
  onHeight: (height: number) => void;
  onDrop: (id: string, dy: number) => void;
  onDrag: (value: boolean) => void; onMove: (direction: number) => void };
function ReorderRow({ id, title, disabled, onDrop, onDrag, onMove, onHeight }: ReorderRowProps) {
  const styles = useThemeStyles(createStyles);
  const [translateY] = useState(() => new Animated.Value(0));
  const [controls, setControls] = useState(false);
  const responder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponderCapture: (_event, gesture) => !disabled && Math.abs(gesture.dy) > 5,
    onPanResponderGrant: () => onDrag(true),
    onPanResponderMove: (_event, gesture) => translateY.setValue(gesture.dy),
    onPanResponderRelease: (_event, gesture) => { translateY.setValue(0); onDrag(false); onDrop(id, gesture.dy); },
    onPanResponderTerminate: () => { translateY.setValue(0); onDrag(false); },
    onPanResponderTerminationRequest: () => false,
  }), [disabled, id, onDrag, onDrop, translateY]);
  return <Animated.View onLayout={event => onHeight(event.nativeEvent.layout.height)}
    style={[styles.row, { transform: [{ translateY }] }]}>
    <Text style={styles.title}>{title}</Text>
    <View {...responder.panHandlers}>
      <Pressable role="button" accessibilityLabel={`순서 이동, ${title}`} disabled={disabled}
        accessibilityActions={[{ name: 'increment', label: '아래로 이동' }, { name: 'decrement', label: '위로 이동' }]}
        onAccessibilityAction={event => onMove(event.nativeEvent.actionName === 'increment' ? 1 : -1)}
        onPress={() => setControls(value => !value)} style={styles.handle}>
        <Text style={styles.grip}>☰</Text></Pressable>
    </View>
    {controls && <View style={styles.moves}>
      <Pressable role="button" accessibilityLabel={`위로 이동, ${title}`} disabled={disabled}
        onPress={() => onMove(-1)} style={styles.handle}><Text style={styles.label}>↑</Text></Pressable>
      <Pressable role="button" accessibilityLabel={`아래로 이동, ${title}`} disabled={disabled}
        onPress={() => onMove(1)} style={styles.handle}><Text style={styles.label}>↓</Text></Pressable>
    </View>}
  </Animated.View>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  heading: { fontFamily: fonts.sans, fontWeight: '700', fontSize: 24, lineHeight: 30, color: colors.text, padding: 24 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingVertical: 12, paddingLeft: 24, paddingRight: 8,
    minHeight: 72, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border, backgroundColor: colors.background },
  title: { flex: 1, fontFamily: fonts.sans, fontSize: 16, lineHeight: 21, fontWeight: '700', color: colors.text },
  handle: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  grip: { fontSize: 20, color: colors.secondaryText },
  moves: { flexDirection: 'row' },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 12, padding: 24 },
  button: { minHeight: 48, minWidth: 100, padding: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  done: { backgroundColor: colors.green },
  label: { fontFamily: fonts.sans, fontSize: 14, color: colors.text },
  doneText: { fontFamily: fonts.sans, fontSize: 14, color: colors.onAccent },
  error: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.destructive, padding: 16 },
});
