import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, useWindowDimensions, View, type StyleProp, type TextStyle } from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { useAuth } from '../auth/AuthProvider';
import { ResponsesPanel } from '../responses/ResponsesPanel';
import { ShareSheet } from '../sharing/ShareSheet';
import { articleWriter, publicIdentity } from '../community/data/publicDirectory';
import { useHighlights } from './HighlightProvider';
import { HighlightedText } from './HighlightedText';
import { SelectionOverlay } from './SelectionOverlay';
import { NativePassagePicker } from './NativePassagePicker';
import { resolvePassage, type SelectionDocument } from './selectionDocument';
import type { PassageSelection } from './selectionBridge.types';
import { clearTextSelection, revealPassage, useSelectionBridge } from './useSelectionBridge';
import { highlightId, highlightOperation, type Highlight, type Passage } from './types';

type TextRenderer = (index: number, style?: StyleProp<TextStyle>, otherHighlight?: string) => ReactNode;
type PassageReaderProps = { document: SelectionDocument; active?: boolean; highlightId?: string; onRevealBlock?: (index: number) => void;
  children: (render: TextRenderer) => ReactNode };
export function PassageReader(props: PassageReaderProps) {
  const { scope } = useHighlights();
  return <PassageReaderContent key={`${scope}:${props.document.articleId}:${props.document.version}:${props.active !== false}`} {...props} />;
}
function PassageReaderContent({ document, active = true, highlightId: anchorId, onRevealBlock, children }: PassageReaderProps) {
  const { state, store } = useHighlights();
  const { colors } = useTheme();
  const auth = useAuth();
  const { width, height } = useWindowDimensions();
  const id = `passages-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const [selection, setSelection] = useState<PassageSelection | null>(null);
  const [nativePicker, setNativePicker] = useState(false);
  const [quote, setQuote] = useState<Passage | null>(null);
  const [more, setMore] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);
  const busy = useRef(false);
  const selectionIntent = useRef(0);
  const currentPassage = useRef<Passage | null>(null);
  const attempted = useRef<{ id: string; selected: boolean; highlight: Highlight } | null>(null);
  const initialAnchor = useRef<string | null>(null);
  const highlights = state?.value?.highlights.filter(value => value.articleId === document.articleId && resolvePassage(document, value)) ?? [];
  const selectedHighlight = selection ? highlights.find(value => value.id === highlightId(selection.passage)) : undefined;
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTextSelection(); }; }, []);
  useEffect(() => {
    if (!active || !anchorId || !state?.value || initialAnchor.current === anchorId) return;
    const anchor = state.value.highlights.find(value => value.id === anchorId);
    if (!anchor || !resolvePassage(document, anchor)) return;
    const index = document.blocks.findIndex(block => block.start <= anchor.start && block.end > anchor.start);
    const timer = setTimeout(() => { initialAnchor.current = anchorId; if (!revealPassage(id, anchor.start) && index >= 0) onRevealBlock?.(index); }, 100);
    return () => clearTimeout(timer);
  }, [active, anchorId, document, id, state?.value, onRevealBlock]);
  function updateSelection(value: PassageSelection | null) {
    const previous = currentPassage.current;
    if (previous?.start !== value?.passage.start || previous?.end !== value?.passage.end) {
      selectionIntent.current += 1; setError(false); setMore(false);
    }
    currentPassage.current = value?.passage ?? null;
    setSelection(current => current?.passage.start === value?.passage.start && current?.passage.end === value?.passage.end
      && current?.position.y === value?.position.y && current?.position.x === value?.position.x
      && current?.position.width === value?.position.width && current?.position.height === value?.position.height ? current : value);
  }
  function choose(value: PassageSelection | null) {
    if (quote || sharing || nativePicker || auth.state.dialog) return;
    updateSelection(value);
  }
  useSelectionBridge({ id, document, active, selectionColor: colors.highlight, onSelect: choose });
  function close() { currentPassage.current = null; selectionIntent.current += 1; clearTextSelection(); setSelection(null); setMore(false); setSharing(false); setError(false); }
  function requireLogin(forResponse = false): boolean {
    if (store) return false;
    auth.store.openLogin(forResponse ? { kind: 'response', targetKind: 'article', targetId: document.articleId } : { kind: 'highlight', articleId: document.articleId }); return true;
  }
  async function save(retry = false) {
    if (!selection || busy.current || requireLogin() || !store) return;
    const passage = selection.passage;
    if (!resolvePassage(document, passage)) return;
    const previous = attempted.current;
    const command = retry && previous ? previous : { id: highlightOperation(), selected: !selectedHighlight,
      highlight: selectedHighlight ?? { ...passage, id: highlightId(passage), title: document.title, author: document.author, createdAt: new Date().toISOString() } };
    const intent = selectionIntent.current;
    attempted.current = command; busy.current = true; setPending(true); setError(false);
    const success = await store.set({ operationId: command.id, highlight: command.highlight, selected: command.selected });
    busy.current = false;
    if (!mounted.current) return;
    setPending(false);
    if (intent !== selectionIntent.current) return;
    if (!success) setError(true);
    else close();
  }
  const selectedAnchor = anchorId ? state?.value?.highlights.find(value => value.id === anchorId) : undefined;
  const anchorUnavailable = anchorId && state?.value && (!selectedAnchor || !resolvePassage(document, selectedAnchor));
  const renderText: TextRenderer = (index, style, otherHighlight) => {
    const block = document.blocks[index];
    if (!block?.selectable) return null;
    return <HighlightedText key={index} block={block} nativeID={`${id}-block-${index}`} highlights={highlights} otherHighlight={otherHighlight} style={style}
      onHighlight={(value, y) => { updateSelection({ passage: value, position: { x: 24, y: Number.isFinite(y) ? y : Math.min(240, height / 2), width: width - 48, height: 30 } }); setError(false); }} />;
  };
  const menuWidth = Math.min(width - 16, selectedHighlight ? 340 : 280);
  const menuTop = selection ? Math.max(8, Math.min(height - 180, selection.position.y - 58)) : 80;
  const menuLeft = selection ? Math.max(8, Math.min(width - menuWidth - 8, selection.position.x + selection.position.width / 2 - menuWidth / 2)) : 8;
  return <View nativeID={id}>
    {anchorUnavailable && <Text role="alert" style={{ color: colors.secondaryText, paddingVertical: 12 }}>이 하이라이트가 삭제되었거나 원문이 변경되어 위치를 복원할 수 없어요.</Text>}
    {state?.readError && <Pressable role="button" accessibilityLabel="하이라이트 불러오기 다시 시도" style={styles.action} onPress={() => store?.retry()}><Text style={{ color: colors.destructive }}>하이라이트를 불러오지 못했어요. 다시 시도</Text></Pressable>}
    {children(renderText)}
    {Platform.OS !== 'web' && <Pressable role="button" accessibilityLabel="기사 문구 선택" style={styles.action} onPress={() => setNativePicker(true)}><Text style={{ color: colors.green }}>Select a passage</Text></Pressable>}
    {active && nativePicker && <NativePassagePicker document={document} onClose={() => setNativePicker(false)} onSelect={passage => { setNativePicker(false); updateSelection({ passage, position: { x: 24, y: 240, width: width - 48, height: 30 } }); }} />}
    {active && selection && !quote && (sharing ? <ShareSheet target={{
          kind: 'quote', id: document.articleId, title: document.title, subtitle: '', authorName: document.author,
          authorId: articleWriter(document.articleId)?.id,
          avatar: publicIdentity(articleWriter(document.articleId) ?? { kind: 'writer', id: '' })?.avatar,
          quote: selection.passage.text, start: selection.passage.start, end: selection.passage.end,
          visibility: 'public',
        }} available={resolvePassage(document, selection.passage)} onClose={() => setSharing(false)} /> : <SelectionOverlay onClose={close}>
        <View accessibilityLabel="문구 선택 메뉴" style={[styles.menu, { backgroundColor: colors.popup, top: menuTop, left: menuLeft, width: menuWidth }]}>
          <View style={styles.row}>
            <Pressable role="button" accessibilityLabel={selectedHighlight ? 'Remove highlight' : 'Highlight'} disabled={pending} accessibilityState={{ disabled: pending, busy: pending }} style={styles.action} onPress={() => { void save(); }}><Text style={[styles.label, { color: colors.text }]}>{selectedHighlight ? 'Remove highlight' : 'Highlight'}</Text></Pressable>
            <Pressable role="button" accessibilityLabel="Respond to passage" disabled={pending} style={styles.action} onPress={() => { if (!requireLogin(true)) { clearTextSelection(); setQuote(selection.passage); } }}><Text style={[styles.label, { color: colors.text }]}>Respond</Text></Pressable>
            <Pressable role="button" accessibilityLabel="Share passage" disabled={pending} style={styles.action} onPress={() => setSharing(true)}><Text style={[styles.label, { color: colors.text }]}>Share</Text></Pressable>
            <Pressable role="button" accessibilityLabel="문구 선택 더보기" style={styles.action} onPress={() => setMore(value => !value)}><Text style={[styles.label, { color: colors.text }]}>•••</Text></Pressable>
          </View>
          {pending && <Text style={[styles.message, { color: colors.secondaryText }]}>Saving…</Text>}
          {error && <Pressable role="button" accessibilityLabel="하이라이트 저장 다시 시도" style={styles.action} onPress={() => { void save(true); }}><Text role="alert" style={{ color: colors.destructive }}>저장하지 못했어요. 다시 시도</Text></Pressable>}
          {more && <Text style={[styles.message, { color: colors.secondaryText }]}>선택 메뉴의 추가 항목은 보관된 화면에서 확인되지 않았어요.</Text>}
        </View>
    </SelectionOverlay>)}
    {active && quote && <ResponsesPanel target={{ kind: 'article', id: document.articleId }} initialQuote={quote} onClose={() => { setQuote(null); close(); }} />}
  </View>;
}
const styles = StyleSheet.create({ menu: { position: 'absolute', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.18)', paddingHorizontal: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' },
  action: { minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6 },
  label: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18 }, message: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, padding: 12 } });
