import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View, type StyleProp, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { useAuth } from '../auth/AuthProvider';
import { ResponsesPanel } from '../responses/ResponsesPanel';
import { ShareSheet } from '../sharing/ShareSheet';
import { articleWriter, publicIdentity } from '../community/data/publicDirectory';
import { useHighlights } from './HighlightProvider';
import { HighlightedText, type PassageTextContent } from './HighlightedText';
import { SelectionOverlay } from './SelectionOverlay';
import { NativePassagePicker } from './NativePassagePicker';
import { NativePassageText } from './NativePassageText';
import { PassageMenu } from './PassageMenu';
import { passageMenuPosition } from './passageMenuPosition';
import { passageAt, resolvePassage, type SelectionDocument } from './selectionDocument';
import type { PassageSelection } from './selectionBridge.types';
import { clearTextSelection, revealPassage, useSelectionBridge } from './useSelectionBridge';
import { highlightId, highlightOperation, type Highlight, type Passage } from './types';

export type PassageTextRenderer = (index: number, style?: StyleProp<TextStyle>, otherHighlight?: string,
  options?: { renderContent?: PassageTextContent; role?: 'heading' }) => ReactNode;
type PassageReaderProps = { document: SelectionDocument; memberOnly?: boolean; active?: boolean; highlightId?: string; onRevealBlock?: (index: number) => void;
  authorId?: string; visibility?: 'public' | 'unlisted'; children: (render: PassageTextRenderer) => ReactNode };
export function PassageReader(props: PassageReaderProps) {
  const { scope } = useHighlights();
  return <PassageReaderContent key={`${scope}:${props.document.articleId}:${props.document.version}:${props.active !== false}`} {...props} />;
}
function PassageReaderContent({ document, memberOnly = false, active = true, highlightId: anchorId, onRevealBlock, children,
  authorId, visibility = 'public' }: PassageReaderProps) {
  const { state, store } = useHighlights();
  const { colors } = useTheme();
  const auth = useAuth();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [menuHeightDp, setMenuHeightDp] = useState(48);
  const id = `passages-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const [selection, setSelection] = useState<PassageSelection | null>(null);
  const [nativePicker, setNativePicker] = useState(false);
  const [nativeBlock, setNativeBlock] = useState<{ index: number; initialHeightDp?: number } | null>(null);
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
  const blockHeightsDp = useRef(new Map<number, number>());
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
  function close() { currentPassage.current = null; selectionIntent.current += 1; clearTextSelection(); setSelection(null); setNativeBlock(null); setMore(false); setSharing(false); setError(false); }
  function selectNativeBlock(index: number) {
    if (quote || sharing || nativePicker || auth.state.dialog) return;
    const block = document.blocks[index];
    if (!block) return;
    const passage = passageAt(document, block.start, block.end);
    if (!passage) return;
    setNativeBlock({ index, initialHeightDp: blockHeightsDp.current.get(index) });
    updateSelection({ passage, position: { x: 0, y: 0, width: 0, height: 0 } });
  }
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
  const menu = <PassageMenu selected={Boolean(selectedHighlight)} pending={pending} error={error} more={more}
    onSave={retry => { void save(retry); }} onMore={() => setMore(value => !value)}
    onRespond={() => { if (selection && !requireLogin(true)) { clearTextSelection(); setNativeBlock(null); setQuote(selection.passage); } }}
    onShare={() => { setNativeBlock(null); setSharing(true); }} />;
  const renderText: PassageTextRenderer = (index, style, otherHighlight, options) => {
    const block = document.blocks[index];
    if (!block?.selectable) return null;
    if (active && nativeBlock?.index === index && !quote && !sharing && !auth.state.dialog) {
      return <NativePassageText key={index} document={document} index={index} style={style} menu={selection ? menu : null} onClose={close}
        highlights={highlights} otherHighlight={otherHighlight} initialHeightDp={nativeBlock.initialHeightDp} renderContent={options?.renderContent}
        initialSelection={{ start: selection ? selection.passage.start - block.start : 0, end: selection ? selection.passage.end - block.start : 0 }}
        onSelect={passage => updateSelection(passage ? { passage, position: { x: 0, y: 0, width: 0, height: 0 } } : null)} />;
    }
    return <HighlightedText key={index} block={block} nativeID={`${id}-block-${index}`} highlights={highlights} otherHighlight={otherHighlight} style={style} {...options}
      onLayout={event => { blockHeightsDp.current.set(index, event.nativeEvent.layout.height); }}
      onSelect={Platform.OS !== 'web' && active ? () => selectNativeBlock(index) : undefined}
      onHighlight={(value, y) => { updateSelection({ passage: value, position: { x: 24, y: Number.isFinite(y) ? y : Math.min(240, height / 2), width: width - 48, height: 30 } }); setError(false); }} />;
  };
  const menuWidth = Math.min(width - 16, selectedHighlight ? 340 : 280);
  const menuPosition = selection ? passageMenuPosition(selection.position,
    { width: menuWidth, height: menuHeightDp }, { width, height, ...insets }) : null;
  return <View nativeID={id}>
    {anchorUnavailable && <Text role="alert" style={{ color: colors.secondaryText, paddingVertical: 12 }}>이 하이라이트가 삭제되었거나 원문이 변경되어 위치를 복원할 수 없어요.</Text>}
    {state?.readError && <Pressable role="button" accessibilityLabel="하이라이트 불러오기 다시 시도" style={styles.action} onPress={() => store?.retry()}><Text style={{ color: colors.destructive }}>하이라이트를 불러오지 못했어요. 다시 시도</Text></Pressable>}
    {children(renderText)}
    {Platform.OS !== 'web' && active && <Pressable role="button" accessibilityLabel="기사 문구 선택" style={styles.action} onPress={() => { close(); setNativePicker(true); }}><Text style={{ color: colors.green }}>Select across paragraphs</Text></Pressable>}
    {active && nativePicker && <NativePassagePicker document={document} onClose={() => setNativePicker(false)} onSelect={passage => { setNativePicker(false); updateSelection({ passage, position: { x: 24, y: 240, width: width - 48, height: 30 } }); }} />}
    {active && selection && !quote && (sharing ? <ShareSheet target={{
          kind: 'quote', id: document.articleId, title: document.title, subtitle: '', authorName: document.author,
          authorId: authorId ?? articleWriter(document.articleId)?.id,
          avatar: publicIdentity(articleWriter(document.articleId) ?? { kind: 'writer', id: '' })?.avatar,
          quote: selection.passage.text, start: selection.passage.start, end: selection.passage.end,
          visibility, memberOnly,
        }} available={resolvePassage(document, selection.passage)} onClose={() => setSharing(false)} /> : nativeBlock === null && <SelectionOverlay onClose={close}>
        <ScrollView keyboardShouldPersistTaps="always" style={[{ position: 'absolute' }, menuPosition]}>
          <View onLayout={event => setMenuHeightDp(event.nativeEvent.layout.height)}>{menu}</View>
        </ScrollView>
    </SelectionOverlay>)}
    {active && quote && <ResponsesPanel target={{ kind: 'article', id: document.articleId }} initialQuote={quote} onClose={() => { setQuote(null); close(); }} />}
  </View>;
}
const styles = StyleSheet.create({ action: { minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6 } });
