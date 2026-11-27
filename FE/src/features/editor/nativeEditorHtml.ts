import { parseDocument } from 'htmlparser2';

import {
  changeBody, formatsAt, lines, safeLink, segments, type BlockKind, type EditorDocument,
  type EditorValue, type Format, type Mark, type Mention, type TextSelection, type EditorImage,
} from './editorModel';

type HtmlNode = ReturnType<typeof parseDocument>['children'][number];
type Paragraph = { kind: BlockKind; text: string; marks: Mark[]; mentions: Mention[]; images: EditorImage[]; number?: number };
export type NativeEditorContent = { text: string; document: EditorDocument; positions: number[]; rawDocument: EditorDocument };
export type EditorImageUris = Readonly<Record<string, string>>;
type EditorAppearance = { sans: string; secondaryText: string; imageWidth?: number };
const escapeHtml = (value: string) => value.replace(/&/gu, '&amp;').replace(/</gu, '&lt;')
  .replace(/>/gu, '&gt;').replace(/"/gu, '&quot;').replace(/'/gu, '&#39;');

export function listPrefix(text: string, kind: BlockKind) {
  return kind === 'bullet' && text.startsWith('• ') ? '• '
    : kind === 'numbered' ? /^\d+\. /u.exec(text)?.[0] ?? '' : '';
}

// 목록 기호는 native 장식이므로 저장 문서의 접두 문자열과 선택 좌표를 양방향으로 변환한다.
export function nativeEditorText(document: EditorDocument) {
  return lines(document).map(line => line.text.slice(listPrefix(line.text, line.kind).length)).join('\n');
}

export function nativeEditorSelection(document: EditorDocument, range: TextSelection): TextSelection {
  const position = (offset: number) => {
    let removed = 0;
    for (const line of lines(document)) {
      const prefix = listPrefix(line.text, line.kind).length;
      if (offset <= line.end) return Math.max(line.start - removed, offset - removed - prefix);
      removed += prefix;
    }
    return nativeEditorText(document).length;
  };
  return { start: position(range.start), end: position(range.end) };
}

export function modelEditorSelection(document: EditorDocument, range: TextSelection): TextSelection | null {
  const text = nativeEditorText(document);
  if (!Number.isSafeInteger(range.start) || !Number.isSafeInteger(range.end)
    || range.start < 0 || range.end < range.start || range.end > text.length) return null;
  const position = (offset: number, isEnd: boolean) => {
    let nativeStart = 0;
    for (const line of lines(document)) {
      const prefix = listPrefix(line.text, line.kind).length;
      const length = line.text.length - prefix;
      if (offset <= nativeStart + length) {
        if (isEnd && range.start !== range.end && offset === nativeStart) return line.start;
        return line.start + prefix + offset - nativeStart;
      }
      nativeStart += length + 1;
    }
    return document.body.length;
  };
  return { start: position(range.start, false), end: position(range.end, true) };
}

export function editorHtml(document: EditorDocument, appearance?: EditorAppearance, imageUris: EditorImageUris = {}): string {
  const blocks: string[] = [];
  let list: 'bullet' | 'numbered' | null = null;
  for (const line of lines(document)) {
    if (list && line.kind !== list) { blocks.push(list === 'bullet' ? '</ul>' : '</ol>'); list = null; }
    const image = document.images.find(image => image.offset === line.start && line.text === '\uFFFC');
    if (image) {
      if (list) { blocks.push(list === 'bullet' ? '</ul>' : '</ol>'); list = null; }
      const width = Math.round(appearance?.imageWidth ?? image.width);
      const height = Math.max(1, Math.round(width * image.height / image.width));
      blocks.push(`<p><img src="${escapeHtml(imageUris[image.id] ?? `kostolany-image:${image.id}`)}" width="${width}" height="${height}"/></p>`);
      continue;
    }
    const prefix = listPrefix(line.text, line.kind);
    const parts = segments(document, line.start + prefix.length, line.end);
    const inline = (part: (typeof parts)[number]) => {
      let html = escapeHtml(part.text);
      for (const format of [...part.formats].sort((a, b) => ['bold', 'italic', 'link'].indexOf(a.kind) - ['bold', 'italic', 'link'].indexOf(b.kind))) {
        if (format.kind === 'bold') html = `<b>${html}</b>`;
        if (format.kind === 'italic') html = `<i>${html}</i>`;
        const url = format.kind === 'link' ? safeLink(format.url ?? '') : null;
        if (url) html = `<a href="${escapeHtml(url)}">${html}</a>`;
      }
      return html;
    };
    let content = '';
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      if (!part) continue;
      if (!part.mention) { content += inline(part); continue; }
      let name = part.text;
      let html = inline(part);
      // mark 경계가 멘션 중간을 지나도 사람 이름과 ID는 하나의 native 멘션으로 전달한다.
      while (parts[index + 1]?.mention === part.mention) {
        const next = parts[++index];
        if (next) { name += next.text; html += inline(next); }
      }
      content += `<mention indicator="@" text="${escapeHtml(name)}" data-user-id="${escapeHtml(part.mention.id)}" data-handle="${escapeHtml(part.mention.handle)}">${html}</mention>`;
    }
    if (line.kind === 'quote' || line.kind === 'pullquote') content = `<i>${content}</i>`;
    if (appearance && (line.kind === 'heading' || line.kind === 'subheading')) {
      content = `<span style="font-family: ${escapeHtml(appearance.sans)}${line.kind === 'subheading' ? `; color: ${appearance.secondaryText}` : ''}">${content}</span>`;
    }
    if (line.kind === 'bullet' || line.kind === 'numbered') {
      if (!list) { list = line.kind; blocks.push(list === 'bullet' ? '<ul>' : '<ol>'); }
      blocks.push(`<li>${content}</li>`);
    } else if (line.kind === 'quote') {
      // 빈 인용 안의 빈 p는 Android에서 줄바꿈이 중복되므로 br 하나로 전달한다.
      blocks.push(line.text ? `<blockquote><p>${content}</p></blockquote>` : '<blockquote><br></blockquote>');
    } else if (line.kind === 'code') blocks.push(`<codeblock><p>${content}</p></codeblock>`);
    else if (line.kind === 'heading' || line.kind === 'subheading') {
      const tag = line.kind === 'heading' ? 'h1' : 'h2'; blocks.push(`<${tag}>${content}</${tag}>`);
    } else blocks.push(`<p${line.kind === 'pullquote' || line.kind === 'divider' ? ' style="text-align: center"' : ''}>${content}</p>`);
  }
  if (list) blocks.push(list === 'bullet' ? '</ul>' : '</ol>');
  return blocks.join('');
}

type ReadImage = (src: string) => EditorImage | undefined;
function readInline(nodes: HtmlNode[], paragraph: Paragraph, readImage: ReadImage, formats: Format[] = []) {
  for (const node of nodes) {
    if (node.type === 'text') {
      const start = paragraph.text.length;
      paragraph.text += node.data;
      for (const format of formats) if (node.data) paragraph.marks.push({ ...format, start, end: paragraph.text.length });
    } else if (node.type === 'tag') {
      const tag = node.name;
      if (['script', 'style', 'iframe'].includes(tag)) continue;
      if (tag === 'img') {
        const image = readImage(node.attribs.src ?? '');
        if (image) { paragraph.images.push({ ...image, offset: paragraph.text.length }); paragraph.text += '\uFFFC'; }
        continue;
      }
      if (tag === 'br') { paragraph.text += '\n'; continue; }
      const next = [...formats];
      if (tag === 'b' || tag === 'strong') next.push({ kind: 'bold' });
      if (tag === 'i' || tag === 'em') next.push({ kind: 'italic' });
      const link = tag === 'a' ? safeLink(node.attribs.href ?? '') : null;
      if (link) next.push({ kind: 'link', url: link });
      const start = paragraph.text.length;
      readInline(node.children, paragraph, readImage, next);
      if (tag === 'mention' && node.attribs['data-user-id'] && node.attribs['data-handle'] && paragraph.text.length > start) {
        paragraph.mentions.push({ start, end: paragraph.text.length, target: {
          id: node.attribs['data-user-id'], handle: node.attribs['data-handle'], name: paragraph.text.slice(start),
        } });
      }
    }
  }
}

function readParagraphs(nodes: HtmlNode[], readImage: ReadImage, kind: BlockKind = 'paragraph'): Paragraph[] {
  const result: Paragraph[] = [];
  const paragraph = (children: HtmlNode[], nextKind: BlockKind, center = false, number?: number) => {
    const value: Paragraph = { kind: nextKind, text: '', marks: [], mentions: [], images: [], number };
    readInline(children, value, readImage);
    // native가 빈 문단을 br로 표현해도 저장 문서에는 문단 하나만 남긴다.
    if (value.text === '\n') value.text = '';
    if (center && nextKind === 'paragraph') value.kind = value.text === '· · ·' ? 'divider' : 'pullquote';
    let offset = 0;
    for (const text of value.text.split('\n')) {
      result.push({ ...value, text, images: value.images.filter(image => image.offset >= offset && image.offset < offset + text.length).map(image => ({ ...image, offset: image.offset - offset })), marks: value.marks.filter(mark => mark.end > offset && mark.start < offset + text.length)
        .map(mark => ({ ...mark, start: Math.max(0, mark.start - offset), end: Math.min(text.length, mark.end - offset) })),
      mentions: value.mentions.filter(mention => mention.start >= offset && mention.end <= offset + text.length)
        .map(mention => ({ ...mention, start: mention.start - offset, end: mention.end - offset })) });
      offset += text.length + 1;
    }
  };
  for (const node of nodes) {
    if (node.type === 'text') { if (node.data.trim()) paragraph([node], kind); continue; }
    if (node.type !== 'tag') continue;
    const tag = node.name;
    if (tag === 'html' || tag === 'body') result.push(...readParagraphs(node.children, readImage, kind));
    else if (tag === 'ul' || tag === 'ol') {
      let number = 1;
      for (const item of node.children) if (item.type === 'tag' && item.name === 'li') {
        paragraph(item.children, tag === 'ul' ? 'bullet' : 'numbered', false, number++);
      }
    } else if (tag === 'blockquote' || tag === 'codeblock' || tag === 'pre') {
      const nextKind = tag === 'blockquote' ? 'quote' : 'code';
      const hasParagraphs = node.children.some(child => child.type === 'tag' && ['p', 'br', 'div'].includes(child.name));
      if (hasParagraphs) result.push(...readParagraphs(node.children, readImage, nextKind));
      else paragraph(node.children, nextKind);
    } else if (tag === 'br') paragraph([], kind);
    else if (tag === 'img') paragraph([node], kind);
    else if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'].includes(tag)) {
      paragraph(node.children, tag === 'h1' ? 'heading' : /^h[2-6]$/u.test(tag) ? 'subheading' : kind,
        /text-align\s*:\s*center/iu.test(node.attribs.style ?? ''));
    }
  }
  return result;
}

// HTML은 native 입력 경계에서만 사용하고 초안·발행은 기존 schemaVersion3 문서로 저장한다.
export function parseEditorHtml(html: string, previous: EditorValue, imageUris: EditorImageUris = {}): NativeEditorContent {
  const available = [...previous.document.images];
  const paragraphs = readParagraphs(parseDocument(html).children, src => {
    const index = available.findIndex(image => src === (imageUris[image.id] ?? `kostolany-image:${image.id}`));
    return index < 0 ? undefined : available.splice(index, 1)[0];
  });
  if (!paragraphs.length) paragraphs.push({ kind: 'paragraph', text: '', marks: [], mentions: [], images: [] });
  const body = paragraphs.map(p => (p.kind === 'bullet' ? '• ' : p.kind === 'numbered' ? `${p.number ?? 1}. ` : '') + p.text).join('\n');
  const rebased = changeBody(previous, body);
  const marks: Mark[] = [];
  const mentions: Mention[] = [];
  const images: EditorImage[] = [];
  let offset = 0;
  paragraphs.forEach(p => {
    const prefix = p.kind === 'bullet' ? '• ' : p.kind === 'numbered' ? `${p.number ?? 1}. ` : '';
    const start = offset + prefix.length;
    const end = start + p.text.length;
    const automaticItalic = p.kind === 'quote' || p.kind === 'pullquote';
    for (const mark of p.marks) if (!(automaticItalic && mark.kind === 'italic') && !(p.kind === 'heading' && mark.kind === 'bold')) {
      marks.push({ ...mark, start: start + mark.start, end: start + mark.end });
    }
    // 인용의 표시용 기울임과 사용자가 적용한 기울임을 분리해 서식 해제 후에도 원래 mark를 보존한다.
    if (automaticItalic) marks.push(...rebased.document.marks.filter(mark => mark.kind === 'italic' && mark.end > start && mark.start < end)
      .map(mark => ({ ...mark, start: Math.max(start, mark.start), end: Math.min(end, mark.end) })));
    // native에서 막는 heading 굵게와 code 내부 mark도 기존 저장 문서에서는 제거하지 않는다.
    marks.push(...rebased.document.marks.filter(mark => (p.kind === 'code' || p.kind === 'heading' && mark.kind === 'bold')
      && mark.end > start && mark.start < end && !marks.some(next => next.kind === mark.kind && next.start <= mark.start && next.end >= mark.end))
      .map(mark => ({ ...mark, start: Math.max(start, mark.start), end: Math.min(end, mark.end) })));
    mentions.push(...p.mentions.map(mention => ({ ...mention, start: start + mention.start, end: start + mention.end })));
    images.push(...p.images.map(image => ({ ...image, offset: start + image.offset })));
    if (p.kind === 'code') mentions.push(...rebased.document.mentions.filter(mention => mention.start >= start && mention.end <= end
      && !mentions.some(next => next.start === mention.start && next.end === mention.end)));
    offset = end + 1;
  });
  const normalizedMarks: Mark[] = [];
  for (const mark of marks.sort((a, b) => a.start - b.start)) {
    const previous = normalizedMarks.find(item => item.kind === mark.kind && item.url === mark.url
      && (item.end >= mark.start || /^(?:\n(?:• |\d+\. )?)*$/u.test(body.slice(item.end, mark.start))));
    if (previous) previous.end = Math.max(previous.end, mark.end);
    else normalizedMarks.push({ ...mark });
  }
  // 같은 사진을 여러 번 삽입한 뒤 일부를 지울 때 선택 범위로 살아남은 이미지 ID를 먼저 복구한다.
  const identifiedImages = images.map(image => {
    const retained = rebased.document.images.find(candidate => candidate.offset === image.offset
      && (imageUris[candidate.id] ?? `kostolany-image:${candidate.id}`) === (imageUris[image.id] ?? `kostolany-image:${image.id}`));
    return retained ? { ...retained } : image;
  });
  const raw = { ...previous.document, version: previous.document.version + 1, body, blocks: paragraphs.map(p => p.kind), marks: normalizedMarks, mentions,
    images: new Set(identifiedImages.map(image => image.id)).size === identifiedImages.length ? identifiedImages : images };
  const normalized = normalizeImageLines(raw);
  return { text: paragraphs.map(p => p.text).join('\n'), document: normalized.document, positions: normalized.positions, rawDocument: raw };
}

// 이미지 앞뒤 줄바꿈을 지워도 schemaVersion3의 독립 이미지 행과 UTF-16 선택 좌표를 보존한다.
function normalizeImageLines(document: EditorDocument) {
  const positions: number[] = []; let body = ''; let line = 0;
  const blocks: BlockKind[] = [document.blocks[0] ?? 'paragraph'];
  const offsets = new Set(document.images.map(image => image.offset));
  const newline = (kind: BlockKind) => { body += '\n'; blocks.push(kind); };
  for (let index = 0; index < document.body.length; index++) {
    const char = document.body[index]!;
    if (offsets.has(index) && body && !body.endsWith('\n')) newline('paragraph');
    positions[index] = body.length;
    if (char === '\n') { line++; newline(document.blocks[line] ?? 'paragraph'); }
    else {
      body += char;
      if (offsets.has(index)) {
        blocks[blocks.length - 1] = 'paragraph';
        if (document.body[index + 1] !== '\n') newline(document.blocks[line] ?? 'paragraph');
      }
    }
  }
  positions[document.body.length] = body.length;
  const range = <T extends TextSelection>(item: T): T => ({ ...item, start: positions[item.start]!, end: positions[item.end]! });
  return { positions, document: { ...document, body, blocks,
    images: document.images.map(image => ({ ...image, offset: positions[image.offset]! })),
    marks: document.marks.map(range), mentions: document.mentions.map(range) } };
}

export function valueFromNativeHtml(html: string, previous: EditorValue, selection?: TextSelection, imageUris: EditorImageUris = {}): EditorValue {
  const { document, positions, rawDocument } = parseEditorHtml(html, previous, imageUris);
  const inferred = changeBody(previous, document.body).selection;
  const model = selection ? modelEditorSelection(rawDocument, selection) : null;
  const mapped = model ? { start: positions[model.start]!, end: positions[model.end]! } : null;
  const range = mapped ?? inferred;
  return { document, selection: range, typing: formatsAt(document, range) };
}
