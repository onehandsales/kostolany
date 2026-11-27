import { useContext, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { LoginRequestButton } from '../auth/LoginRequestButton';
import { LibrarySheet } from '../bookmarks/LibrarySheet';
import { formatReactionCount } from '../feed/data/mediumFixtures';
import { ClapScopeContext, useClaps, useClapStore } from './ClapProvider';
import type { ClapStore } from './createClapStore';
import { MAX_CLAPS, type ClapTarget } from './types';
import { articleClapCounts } from './data/articleClapCounts';

type ClapControlProps = { target: ClapTarget; title: string; size?: number; baseline?: number };
export function ClapControl({ target, title, size = 16, baseline }: ClapControlProps) {
  const styles = useThemeStyles(createStyles);
  const store = useClapStore();
  const scope = useContext(ClapScopeContext);
  if (store) return <SignedInClaps key={`${scope}:${target.kind}:${target.id}`}
    store={store} target={target} title={title} size={size} />;
  const total = baseline ?? (target.kind === 'article'
    ? articleClapCounts[target.id] ?? 0 : 0);
  return <LoginRequestButton context={target.kind === 'list' ? { kind: 'clap-list', listId: target.id }
    : { kind: 'like', articleId: target.id }}
    label={`박수, ${title}, 로그인 필요`} style={[styles.row, size > 20 && styles.toolbarRow]}>
    <AppIcon name="clap" size={size} />
    <Text style={[styles.count, size > 20 && styles.toolbarCount]}>{formatReactionCount(total)}</Text>
  </LoginRequestButton>;
}

function SignedInClaps({ store, target, title, size }: ClapControlProps & { store: ClapStore }) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const state = useClaps(store, target);
  const [feedback, setFeedback] = useState<number | null>(null);
  const [showReaders, setShowReaders] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const disabled = state.status !== 'ready' || state.mine >= MAX_CLAPS;
  return <View style={styles.container}>
    <View style={styles.row}>
      <Pressable role="button" accessibilityLabel={`박수 보내기, ${title}`}
        accessibilityHint="누를 때마다 박수 한 번을 보냅니다"
        accessibilityValue={{ min: 0, max: MAX_CLAPS, now: state.mine }}
        accessibilityState={{ disabled, busy: state.isSaving, selected: state.mine > 0 }} disabled={disabled}
        onLongPress={() => setShowReaders(true)}
        onPress={() => {
          store.clap(target);
          setFeedback(store.getSnapshot(target).mine);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setFeedback(null), 1100);
        }} style={styles.target}>
        <AppIcon name="clap" size={size} filled={state.mine > 0}
          color={state.mine > 0 ? colors.text : colors.secondaryText} />
        {(size ?? 16) <= 20 && <Text style={styles.count}>{state.total === null ? '—' : formatReactionCount(state.total)}</Text>}
      </Pressable>
      {(size ?? 16) > 20 && <Pressable role="button" accessibilityLabel={`박수 목록, ${title}, ${state.total ?? '미확인'}회`}
        onPress={() => setShowReaders(true)} style={styles.target}>
        <Text style={[styles.count, (size ?? 16) > 20 && styles.toolbarCount]}>
          {state.total === null ? '—' : formatReactionCount(state.total)}
        </Text>
      </Pressable>}
      {feedback !== null && !state.error && <View pointerEvents="none" style={styles.bubble}>
        <Text aria-live="polite" style={styles.feedback}>+{feedback}</Text>
      </View>}
    </View>
    {state.error && <View style={styles.error}>
      <Text role="alert" style={styles.count}>{state.error === 'read' ? '박수를 불러오지 못했어요.' : '박수를 저장하지 못했어요.'}</Text>
      <Pressable role="button" accessibilityLabel={`박수 다시 시도, ${title}`}
        onPress={() => store.retry(target)} style={styles.target}><Text style={styles.count}>Retry</Text></Pressable>
    </View>}
    {showReaders && <LibrarySheet title="Claps" onClose={() => setShowReaders(false)}>
      <Text style={styles.count}>{state.total ?? '—'} claps</Text>
      <Text style={styles.count}>{state.mine ? `You · ${state.mine} claps` : 'You haven’t clapped yet.'}</Text>
      <Text style={styles.count}>Other readers are not included in this local sample.</Text>
      <Pressable role="button" accessibilityLabel="내 박수 모두 취소" disabled={state.mine === 0}
        accessibilityState={{ disabled: state.mine === 0 }} style={styles.target}
        onPress={() => { store.undo(target); setShowReaders(false); setFeedback(null); }}>
        <Text style={styles.count}>Undo claps</Text>
      </Pressable>
    </LibrarySheet>}
  </View>;
}

export function UndoClaps({ target, onDone }: { target: ClapTarget; onDone: () => void }) {
  const store = useClapStore();
  return store ? <SignedInUndo store={store} target={target} onDone={onDone} /> : null;
}
function SignedInUndo({ store, target, onDone }: { store: ClapStore; target: ClapTarget; onDone: () => void }) {
  const state = useClaps(store, target);
  const styles = useThemeStyles(createStyles);
  if (state.mine === 0) return null;
  return <Pressable role="button" accessibilityLabel="내 박수 모두 취소" style={styles.undo}
    onPress={() => { store.undo(target); onDone(); }}><Text style={styles.menuLabel}>Undo claps</Text></Pressable>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { position: 'relative' },
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 48, minWidth: 48 },
  toolbarRow: { gap: 8 },
  target: { minHeight: 48, minWidth: 48, flexDirection: 'row', gap: 2, justifyContent: 'center', alignItems: 'center' },
  count: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, color: colors.secondaryText },
  toolbarCount: { fontSize: 14, lineHeight: 20, color: colors.text },
  bubble: { position: 'absolute', left: 18, bottom: 46, minWidth: 44, height: 44,
    borderRadius: 22, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  feedback: { fontFamily: fonts.sans, fontSize: 16, color: colors.onAccent },
  error: { maxWidth: 180 },
  undo: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 16 },
  menuLabel: { fontFamily: fonts.sans, fontSize: 16, color: colors.text },
});
