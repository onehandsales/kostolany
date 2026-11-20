export type BlockKind = 'paragraph' | 'heading' | 'subheading' | 'quote' | 'pullquote' | 'bullet' | 'numbered' | 'divider' | 'code';
export type Format = { kind: 'bold' | 'italic' | 'link'; url?: string };
export type Mark = Format & { start: number; end: number };
export type TextSelection = { start: number; end: number };
export type EditorDocument = { schemaVersion: 1; title: string; body: string; blocks: BlockKind[]; marks: Mark[] };
export type EditorValue = { document: EditorDocument; selection: TextSelection; typing: Format[] };
export const emptyEditor = (): EditorValue => ({ document: { schemaVersion: 1, title: '', body: '', blocks: ['paragraph'], marks: [] }, selection: { start: 0, end: 0 }, typing: [] });
export function clampSelection(body: string, selection: TextSelection): TextSelection {
  const start = Math.max(0, Math.min(body.length, selection.start));
  return { start, end: Math.max(start, Math.min(body.length, selection.end)) };
}
export function lines(document: EditorDocument) {
  let start = 0;
  return document.body.split('\n').map((text, index) => {
    const line = { text, start, end: start + text.length, kind: document.blocks[index] ?? 'paragraph', index };
    start += text.length + 1; return line;
  });
}
const sameFormat = (a: Format, b: Format) => a.kind === b.kind && a.url === b.url;
function normalizeMarks(marks: Mark[]): Mark[] {
  const result: Mark[] = [];
  for (const mark of marks.filter(item => item.end > item.start).sort((a, b) => a.start - b.start)) {
    const previous = result.find(item => sameFormat(item, mark) && item.end >= mark.start);
    if (previous) previous.end = Math.max(previous.end, mark.end); else result.push({ ...mark });
  }
  return result;
}
export function formatsAt(document: EditorDocument, selection: TextSelection): Format[] {
  const { start, end } = selection;
  const result: Format[] = [];
  for (const mark of document.marks) {
    if ((start === end ? (start === 0 ? mark.start === 0 : mark.start < start) && mark.end >= start : mark.start <= start && mark.end >= end)
      && !result.some(item => sameFormat(item, mark))) result.push({ kind: mark.kind, ...(mark.url ? { url: mark.url } : {}) });
  }
  return result;
}
export function selectText(value: EditorValue, selection: TextSelection): EditorValue {
  const next = clampSelection(value.document.body, selection);
  if (value.selection.start === next.start && value.selection.end === next.end) return value;
  return { ...value, selection: next, typing: formatsAt(value.document, next) };
}
export function replaceText(value: EditorValue, selection: TextSelection, insertion: string): EditorValue {
  const doc = value.document; const { start, end } = clampSelection(doc.body, selection);
  const inserted = insertion.replace(/\r\n?/g, '\n');
  const body = doc.body.slice(0, start) + inserted + doc.body.slice(end);
  const delta = inserted.length - (end - start);
  const first = doc.body.slice(0, start).split('\n').length - 1;
  const last = doc.body.slice(0, end).split('\n').length - 1;
  const inherited = doc.blocks[first] === 'divider' ? 'paragraph' : doc.blocks[first] ?? 'paragraph';
  const nextBlocks = [...doc.blocks.slice(0, first), ...inserted.split('\n').map(() => inherited), ...doc.blocks.slice(last + 1)];
  const blocks = body.split('\n').map((text, index): BlockKind => {
    const kind = nextBlocks[index] ?? 'paragraph';
    if ((kind === 'bullet' && !text.startsWith('• ')) || (kind === 'numbered' && !/^\d+\. /u.test(text)) ||
      (kind === 'divider' && text !== '· · ·')) return 'paragraph';
    return kind;
  });
  const marks = doc.marks.flatMap(mark => {
    if (mark.end <= start) return [mark];
    if (mark.start >= end) return [{ ...mark, start: mark.start + delta, end: mark.end + delta }];
    return [...(mark.start < start ? [{ ...mark, end: start }] : []),
      ...(mark.end > end ? [{ ...mark, start: start + inserted.length, end: mark.end + delta }] : [])];
  });
  if (inserted.length) marks.push(...value.typing.map(format => ({ ...format, start, end: start + inserted.length })));
  const position = start + inserted.length;
  return { ...value, document: { ...doc, body, blocks, marks: normalizeMarks(marks) }, selection: { start: position, end: position } };
}
export function changeBody(value: EditorValue, next: string): EditorValue {
  next = next.replace(/\r\n?/g, '\n'); const before = value.document.body;
  if (before === next) return value;
  let start = 0; while (start < before.length && start < next.length && before[start] === next[start]) start++;
  let end = before.length; let tail = next.length;
  while (end > start && tail > start && before[end - 1] === next[tail - 1]) { end--; tail--; }
  // 같은 줄바꿈이 반복되어도 현재 선택과 일치하는 입력 위치를 먼저 사용한다.
  const selection = clampSelection(before, value.selection);
  const suffix = before.slice(selection.end);
  if (next.length >= selection.start + suffix.length && next.startsWith(before.slice(0, selection.start)) && next.endsWith(suffix)) {
    start = selection.start; end = selection.end; tail = next.length - suffix.length;
  }
  if (next.slice(start, tail) === '\n') return insertParagraph({ ...value, selection: { start, end } });
  return replaceText(value, { start, end }, next.slice(start, tail));
}
export function toggleFormat(value: EditorValue, format: Format): EditorValue {
  if (format.kind === 'link') {
    const url = safeLink(format.url ?? ''); if (!url) return value;
    format = { kind: 'link', url };
  }
  const active = value.typing.some(item => sameFormat(item, format));
  const typing = [...value.typing.filter(item => item.kind !== format.kind), ...(!active ? [format] : [])];
  const { start, end } = value.selection;
  if (start === end) return { ...value, typing };
  const marks = value.document.marks.flatMap(mark => mark.kind !== format.kind || mark.end <= start || mark.start >= end ? [mark] :
    [...(mark.start < start ? [{ ...mark, end: start }] : []), ...(mark.end > end ? [{ ...mark, start: end }] : [])]);
  if (!active) marks.push({ ...format, start, end });
  return { ...value, typing, document: { ...value.document, marks: normalizeMarks(marks) } };
}
export function safeLink(input: string): string | null {
  try {
    const raw = input.trim();
    if (!raw || /[\s\u0000-\u001f]/u.test(raw)) return null;
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : `https://${raw}`);
    return ['http:', 'https:'].includes(url.protocol) && url.hostname && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
export function selectedLines(value: EditorValue) {
  return lines(value.document).filter(line => line.end >= value.selection.start &&
    (line.start < value.selection.end || line.start <= value.selection.start));
}
export function setBlock(value: EditorValue, kind: BlockKind): EditorValue {
  const selected = selectedLines(value); let next = value;
  let selection = { ...value.selection };
  for (const line of [...selected].reverse()) {
    const prefix = line.kind === 'bullet' && line.text.startsWith('• ') ? 2 : line.kind === 'numbered' ? /^\d+\. /u.exec(line.text)?.[0].length ?? 0 : 0;
    const add = kind === 'bullet' ? '• ' : kind === 'numbered' ? `${selected.indexOf(line) + 1}. ` : '';
    next = replaceText(next, { start: line.start, end: line.start + prefix }, add);
    const shift = (position: number) => position < line.start ? position : position >= line.start + prefix ? position + add.length - prefix : line.start + add.length;
    selection = { start: shift(selection.start), end: shift(selection.end) };
  }
  const blocks = [...next.document.blocks]; selected.forEach(line => { blocks[line.index] = kind; });
  return { ...next, document: { ...next.document, blocks }, selection: clampSelection(next.document.body, selection) };
}
export function insertParagraph(value: EditorValue): EditorValue {
  const line = selectedLines(value)[0];
  if (line && value.selection.start === value.selection.end && ['bullet', 'numbered'].includes(line.kind)) {
    const prefix = line.kind === 'bullet' ? '• ' : /^\d+\. /u.exec(line.text)?.[0] ?? '';
    if (line.text === prefix) return setBlock(value, 'paragraph');
    const nextPrefix = line.kind === 'bullet' ? prefix : `${Number.parseInt(prefix, 10) + 1}. `;
    return replaceText(value, value.selection, `\n${nextPrefix}`);
  }
  return replaceText(value, value.selection, '\n');
}
export function insertDivider(value: EditorValue): EditorValue {
  const line = selectedLines(value).at(-1)!;
  const next = replaceText({ ...value, typing: [] }, { start: line.end, end: line.end }, '\n· · ·\n');
  const blocks = [...next.document.blocks]; blocks[line.index + 1] = 'divider'; blocks[line.index + 2] = 'paragraph';
  return { ...next, document: { ...next.document, blocks } };
}
export function segments(document: EditorDocument, start: number, end: number) {
  const points = [...new Set([start, end, ...document.marks.flatMap(mark => [Math.max(start, Math.min(end, mark.start)), Math.max(start, Math.min(end, mark.end))])])].sort((a, b) => a - b);
  return points.slice(0, -1).map((point, i) => ({ text: document.body.slice(point, points[i + 1]),
    formats: formatsAt(document, { start: point, end: points[i + 1]! }), start: point }));
}
export function editorOutput(document: EditorDocument) {
  return { schemaVersion: document.schemaVersion, title: document.title,
    blocks: lines(document).map(line => ({ type: line.kind, content: line.kind === 'divider' ? [] :
      segments(document, line.start + (line.kind === 'bullet' && line.text.startsWith('• ') ? 2 : line.kind === 'numbered' ? /^\d+\. /u.exec(line.text)?.[0].length ?? 0 : 0), line.end)
        .map(({ text, formats }) => ({ text, formats })) })) };
}
