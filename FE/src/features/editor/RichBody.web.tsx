import { useEffect, useLayoutEffect, useRef } from 'react';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { changeBody, insertParagraph, lines, replaceText, segments, toggleFormat, type TextSelection } from './editorModel';
import type { RichBodyProps } from './RichBody';

function bodyText(root: Node): string {
  return Array.from(root.childNodes).map(node => node.textContent ?? '').join('\n');
}
function selected(root: HTMLElement): TextSelection | null {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return null;
  const range = selection.getRangeAt(0);
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return null;
  const offset = (node: Node, end: number) => {
    const prefix = document.createRange(); prefix.selectNodeContents(root); prefix.setEnd(node, end);
    return bodyText(prefix.cloneContents()).length;
  };
  return { start: offset(range.startContainer, range.startOffset), end: offset(range.endContainer, range.endOffset) };
}
function restore(root: HTMLElement, selection: TextSelection) {
  const point = (offset: number): { node: Node; offset: number } => {
    for (const block of Array.from(root.children)) {
      const length = block.textContent?.length ?? 0;
      if (offset <= length) {
        const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT); let node = walker.nextNode();
        while (node) { const length = node.textContent?.length ?? 0; if (offset <= length) return { node, offset }; offset -= length; node = walker.nextNode(); }
        return { node: block, offset: 0 };
      }
      offset -= length + 1;
    }
    return { node: root, offset: root.childNodes.length };
  };
  const start = point(selection.start); const end = point(selection.end);
  const range = document.createRange(); range.setStart(start.node, start.offset); range.setEnd(end.node, end.offset);
  const current = window.getSelection(); current?.removeAllRanges(); current?.addRange(range);
}
export function RichBody(props: RichBodyProps) {
  const root = useRef<HTMLDivElement>(null); const latest = useRef(props);
  useLayoutEffect(() => { latest.current = props; });
  const composing = useRef(false); const rendering = useRef(false); const requested = useRef(props.focusRequest);
  const { colors } = useTheme();
  useEffect(() => { if (props.dismissRequest) root.current?.blur(); }, [props.dismissRequest]);
  useLayoutEffect(() => {
    const element = root.current; if (!element || composing.current) return;
    const currentDocument = latest.current.value.document;
    const focus = document.activeElement === element || ((props.isActive ?? true) && requested.current !== props.focusRequest);
    requested.current = props.focusRequest; rendering.current = true;
    const fragment = document.createDocumentFragment();
    for (const line of lines(currentDocument)) {
      const prefix = line.kind === 'bullet' ? '• ' : line.kind === 'numbered' ? /^\d+\. /u.exec(line.text)?.[0] ?? '' : '';
      const prefixWidth = Math.max(28, prefix.length * 10);
      const block = document.createElement('div'); block.dataset.block = line.kind;
      Object.assign(block.style, { minHeight: '30px', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap',
        fontFamily: ['heading', 'subheading', 'code'].includes(line.kind) ? line.kind === 'code' ? 'monospace' : fonts.sans : fonts.serif,
        fontSize: line.kind === 'heading' ? '28px' : line.kind === 'subheading' ? '23px' : '20px',
        lineHeight: line.kind === 'heading' ? '36px' : '30px',
        fontWeight: ['heading', 'subheading'].includes(line.kind) ? '700' : '400',
        fontStyle: ['quote', 'pullquote'].includes(line.kind) ? 'italic' : 'normal',
        textAlign: ['pullquote', 'divider'].includes(line.kind) ? 'center' : 'left',
        borderLeft: line.kind === 'quote' ? `3px solid ${colors.text}` : 'none',
        paddingLeft: line.kind === 'quote' ? '24px' : prefix ? `${prefixWidth}px` : '0', marginLeft: line.kind === 'quote' ? '-18px' : '0',
        textIndent: prefix ? `-${prefixWidth}px` : '0', letterSpacing: line.kind === 'divider' ? '6px' : 'normal',
        backgroundColor: line.kind === 'code' ? colors.surface : 'transparent' });
      if (prefix) {
        const marker = document.createElement('span'); marker.textContent = prefix;
        Object.assign(marker.style, { display: 'inline-block', width: `${prefixWidth}px`, textIndent: '0' }); block.append(marker);
      }
      for (const part of segments(currentDocument, line.start + prefix.length, line.end)) {
        const link = part.formats.find(format => format.kind === 'link');
        const span = document.createElement(link ? 'a' : 'span'); span.textContent = part.text;
        if (span instanceof HTMLAnchorElement && link?.url) { span.href = link.url; span.tabIndex = -1; }
        Object.assign(span.style, { color: link ? colors.green : line.kind === 'divider' ? colors.secondaryText : colors.text,
          fontWeight: part.formats.some(format => format.kind === 'bold') ? '700' : 'inherit',
          fontStyle: part.formats.some(format => format.kind === 'italic') ? 'italic' : 'inherit',
          textDecoration: link ? 'underline' : 'none' }); block.append(span);
      }
      if (!line.text) block.append(document.createElement('br')); fragment.append(block);
    }
    element.replaceChildren(fragment);
    if (focus) { element.focus({ preventScroll: true }); restore(element, latest.current.value.selection); }
    rendering.current = false;
    // 구간 객체가 새로 만들어져도 선택만 바뀐 경우에는 입력 DOM을 교체하지 않는다.
  }, [props.value.document.version, props.focusRequest, props.isActive, colors]);
  useEffect(() => {
    const element = root.current; if (!element) return;
    const onSelect = () => {
      if (rendering.current || composing.current || document.activeElement !== element) return;
      const selection = selected(element); if (selection) latest.current.onSelect(selection);
    };
    const beforeInput = (event: InputEvent) => {
      if (composing.current || event.isComposing) return;
      if (event.inputType === 'insertParagraph' || event.inputType === 'insertLineBreak') {
        event.preventDefault(); const selection = selected(element) ?? latest.current.value.selection;
        latest.current.onChange(insertParagraph({ ...latest.current.value, selection }));
      }
    };
    document.addEventListener('selectionchange', onSelect); element.addEventListener('beforeinput', beforeInput);
    return () => { document.removeEventListener('selectionchange', onSelect); element.removeEventListener('beforeinput', beforeInput); };
  }, []);
  const commit = () => {
    if (!root.current || composing.current) return;
    const next = changeBody(latest.current.value, bodyText(root.current));
    latest.current.onChange({ ...next, selection: selected(root.current) ?? next.selection });
  };
  return <div style={{ position: 'relative', minHeight: props.minHeight ?? 300 }}>
    <div ref={root} role="textbox" aria-label={props.label ?? '글 본문'} aria-multiline="true" contentEditable suppressContentEditableWarning spellCheck
      style={{ minHeight: props.minHeight ?? 300, outline: 'none', color: colors.text, caretColor: colors.text, paddingBottom: props.minHeight ? 0 : 40 }}
      onFocus={props.onFocus} onBlur={props.onBlur} onInput={commit}
      onCompositionStart={() => { composing.current = true; props.onComposing(true); }}
      onCompositionEnd={() => { composing.current = false; commit(); props.onComposing(false); }}
      onClick={event => { if ((event.target as HTMLElement).closest('a')) event.preventDefault(); }}
      onPaste={event => { event.preventDefault(); if (composing.current) return;
        const selection = root.current && selected(root.current) || latest.current.value.selection;
        props.onChange(replaceText(latest.current.value, selection, event.clipboardData.getData('text/plain'))); }}
      onDragOver={event => event.preventDefault()}
      onDrop={event => { event.preventDefault(); if (composing.current) return;
        const text = event.dataTransfer.getData('text/plain');
        if (text) props.onChange(replaceText(latest.current.value, latest.current.value.selection, text)); }}
      onKeyDown={event => {
        if (event.nativeEvent.isComposing) return;
        if ((event.ctrlKey || event.metaKey) && ['b', 'i'].includes(event.key.toLowerCase())) {
          event.preventDefault(); props.onChange(toggleFormat(latest.current.value, { kind: event.key.toLowerCase() === 'b' ? 'bold' : 'italic' }));
        }
        if (event.key === 'Escape') { event.stopPropagation(); root.current?.blur(); }
      }} />
  </div>;
}
