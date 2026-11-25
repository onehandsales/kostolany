export type BlockKind = 'paragraph' | 'heading' | 'subheading' | 'quote' | 'pullquote' | 'bullet' | 'numbered' | 'divider' | 'code';
export type Format = { kind: 'bold' | 'italic' | 'link'; url?: string };
export type Mark = Format & { start: number; end: number };
export type TextSelection = { start: number; end: number };
export type MentionTarget = { id: string; name: string; handle: string };
export type Mention = TextSelection & { target: MentionTarget };
export type EditorImage = {
  id: string; offset: number; assetId: string; source: 'camera' | 'library' | 'unsplash';
  description: string; credit: string; width: number; height: number;
};
export type EditorDocument = { schemaVersion: 3; version: number; title: string; body: string; blocks: BlockKind[]; marks: Mark[]; images: EditorImage[]; mentions: Mention[] };
export type EditorValue = { document: EditorDocument; selection: TextSelection; typing: Format[] };
export const emptyEditor = (): EditorValue => ({ document: { schemaVersion: 3, version: 0, title: '', body: '', blocks: ['paragraph'], marks: [], images: [], mentions: [] }, selection: { start: 0, end: 0 }, typing: [] });
export function validEditorDocument(document: EditorDocument): boolean {
  if (!document || document.schemaVersion !== 3 || !Number.isSafeInteger(document.version) || document.version < 0 ||
    typeof document.title !== 'string' || typeof document.body !== 'string' || !Array.isArray(document.blocks) ||
    !Array.isArray(document.marks) || !Array.isArray(document.images) || !Array.isArray(document.mentions)) return false;
  const kinds: BlockKind[] = ['paragraph', 'heading', 'subheading', 'quote', 'pullquote', 'bullet', 'numbered', 'divider', 'code'];
  const range = (item: TextSelection) => Number.isSafeInteger(item.start) && Number.isSafeInteger(item.end) && item.start >= 0 && item.end > item.start && item.end <= document.body.length;
  return document.blocks.length === document.body.split('\n').length && document.blocks.every(kind => kinds.includes(kind)) &&
    document.marks.every(mark => range(mark) && (mark.kind === 'bold' || mark.kind === 'italic' || mark.kind === 'link' && Boolean(safeLink(mark.url ?? '')))) &&
    new Set(document.images.map(image => image.id)).size === document.images.length &&
    new Set(document.images.map(image => image.offset)).size === document.images.length &&
    document.images.every(image => image.id && image.assetId && ['camera', 'library', 'unsplash'].includes(image.source) &&
      Number.isSafeInteger(image.offset) && image.offset >= 0 && document.body[image.offset] === '\uFFFC' &&
      (image.offset === 0 || document.body[image.offset - 1] === '\n') && document.body[image.offset + 1] === '\n' &&
      Number.isFinite(image.width) && image.width > 0 && Number.isFinite(image.height) && image.height > 0) &&
    document.mentions.every(mention => range(mention) && mention.target?.id && mention.target.name && mention.target.handle &&
      document.body.slice(mention.start, mention.end) === mention.target.name);
}
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
  const images = doc.images.filter(image => image.offset < start || image.offset >= end)
    .map(image => image.offset >= end ? { ...image, offset: image.offset + delta } : image);
  const mentions = doc.mentions.flatMap(mention => mention.end <= start ? [mention] : mention.start >= end ?
    [{ ...mention, start: mention.start + delta, end: mention.end + delta }] : []);
  return { ...value, document: { ...doc, version: doc.version + 1, body, blocks, images, mentions, marks: normalizeMarks(marks) }, selection: { start: position, end: position } };
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
  return { ...value, typing, document: { ...value.document, version: value.document.version + 1, marks: normalizeMarks(marks) } };
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
  const selected = selectedLines(value).filter(line => !value.document.images.some(image => image.offset === line.start)); let next = value;
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
  const points = [...new Set([start, end, ...[...document.marks, ...document.mentions].flatMap(mark => [Math.max(start, Math.min(end, mark.start)), Math.max(start, Math.min(end, mark.end))])])].sort((a, b) => a - b);
  return points.slice(0, -1).map((point, i) => ({ text: document.body.slice(point, points[i + 1]),
    formats: formatsAt(document, { start: point, end: points[i + 1]! }), start: point,
    mention: document.mentions.find(mention => mention.start <= point && mention.end >= points[i + 1]!)?.target }));
}
export function editorOutput(document: EditorDocument) {
  return { schemaVersion: document.schemaVersion, title: document.title,
    blocks: lines(document).map(line => {
      const image = document.images.find(image => image.offset === line.start);
      if (image) return { type: 'image' as const, image, content: [] };
      return { type: line.kind, content: line.kind === 'divider' ? [] :
      segments(document, line.start + (line.kind === 'bullet' && line.text.startsWith('• ') ? 2 : line.kind === 'numbered' ? /^\d+\. /u.exec(line.text)?.[0].length ?? 0 : 0), line.end)
        .map(({ text, formats, mention }) => ({ text, formats, ...(mention ? { mention } : {}) })) };
    }) };
}

export function insertImage(value: EditorValue, image: Omit<EditorImage, 'offset'>): EditorValue {
  if (value.document.images.some(item => item.id === image.id)) return value;
  const line = selectedLines(value).at(-1);
  const at = line?.end ?? value.document.body.length;
  const prefix = at === 0 && !value.document.body ? '' : '\n';
  const next = replaceText({ ...value, typing: [] }, { start: at, end: at }, `${prefix}\uFFFC\n`);
  const offset = at + prefix.length;
  const blocks = [...next.document.blocks];
  const index = next.document.body.slice(0, offset).split('\n').length - 1;
  blocks[index] = 'paragraph'; blocks[index + 1] = 'paragraph';
  return { ...next, document: { ...next.document, blocks, images: [...next.document.images, { ...image, offset }] } };
}
export function removeImage(value: EditorValue, id: string): EditorValue {
  const image = value.document.images.find(item => item.id === id);
  if (!image) return value;
  return replaceText({ ...value, typing: [] }, { start: image.offset, end: image.offset + 2 }, '');
}

export function editorSections(document: EditorDocument) {
  let start = 0;
  const sections: { key: string; start: number; end: number; image?: EditorImage }[] = [];
  for (const image of [...document.images].sort((a, b) => a.offset - b.offset)) {
    sections.push({ key: start === 0 ? 'start' : `after-${sections.at(-1)?.key}`, start, end: Math.max(start, image.offset - 1) });
    sections.push({ key: image.id, start: image.offset, end: image.offset + 1, image });
    start = image.offset + 2;
  }
  sections.push({ key: start === 0 ? 'start' : `after-${sections.at(-1)?.key}`, start, end: document.body.length });
  return sections;
}

export function sliceEditor(value: EditorValue, start: number, end: number): EditorValue {
  const document = value.document;
  const body = document.body.slice(start, end);
  const first = document.body.slice(0, start).split('\n').length - 1;
  return { ...value, selection: clampSelection(body, { start: value.selection.start - start, end: value.selection.end - start }),
    document: { ...document, body, images: [], blocks: document.blocks.slice(first, first + body.split('\n').length),
      mentions: document.mentions.filter(mention => mention.start >= start && mention.end <= end).map(mention => ({ ...mention, start: mention.start - start, end: mention.end - start })),
      marks: document.marks.filter(mark => mark.end > start && mark.start < end)
        .map(mark => ({ ...mark, start: Math.max(start, mark.start) - start, end: Math.min(end, mark.end) - start })) } };
}

export function mergeEditorSection(value: EditorValue, start: number, end: number, section: EditorValue): EditorValue {
  const body = section.document.body.replace(/\uFFFC/gu, '');
  // 이미지 바로 앞의 빈 입력에 글을 넣으면 사용자 문단과 별개인 이미지 경계를 만든다.
  const separator = body.length > 0 && start === end && value.document.images.some(image => image.offset === end) ? '\n' : '';
  const next = replaceText({ ...value, typing: [] }, { start, end }, body + separator);
  const first = next.document.body.slice(0, start).split('\n').length - 1;
  const blocks = [...next.document.blocks]; blocks.splice(first, section.document.blocks.length, ...section.document.blocks);
  const marks = [...next.document.marks, ...section.document.marks.map(mark => ({ ...mark, start: mark.start + start, end: mark.end + start }))];
  const mentions = [...next.document.mentions, ...section.document.mentions.map(mention => ({ ...mention, start: mention.start + start, end: mention.end + start }))];
  return { ...next, typing: section.typing, selection: { start: section.selection.start + start, end: section.selection.end + start },
    document: { ...next.document, blocks, marks, mentions } };
}

export function mentionQuery(value: EditorValue): { start: number; end: number; query: string } | null {
  if (value.selection.start !== value.selection.end) return null;
  const prefix = value.document.body.slice(0, value.selection.start);
  const match = /(?:^|\s)@([^\s@]*)$/u.exec(prefix);
  if (!match) return null;
  return { start: prefix.length - match[1]!.length - 1, end: prefix.length, query: match[1]! };
}
export function insertMention(value: EditorValue, range: TextSelection, target: MentionTarget): EditorValue {
  const current = mentionQuery(value);
  if (!current || current.start !== range.start || current.end !== range.end) return value;
  const next = replaceText(value, range, `${target.name} `);
  return { ...next, document: { ...next.document, mentions: [...next.document.mentions, { start: range.start, end: range.start + target.name.length, target: { ...target } }] } };
}
