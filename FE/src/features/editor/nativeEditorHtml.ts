import { parseDocument } from 'htmlparser2';

import {
  changeBody, formatsAt, lines, safeLink, segments, type BlockKind, type EditorDocument,
  type EditorValue, type Format, type Mark, type Mention, type TextSelection,
} from './editorModel';

type HtmlNode = ReturnType<typeof parseDocument>['children'][number];
type Paragraph = { kind: BlockKind; text: string; marks: Mark[]; mentions: Mention[]; number?: number };
export type NativeEditorContent = { text: string; document: EditorDocument };
type EditorAppearance = { sans: string; secondaryText: string };
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

export function editorHtml(document: EditorDocument, appearance?: EditorAppearance): string {
  const blocks: string[] = [];
  let list: 'bullet' | 'numbered' | null = null;
  for (const line of lines(document)) {
    if (list && line.kind !== list) { blocks.push(list === 'bullet' ? '</ul>' : '</ol>'); list = null; }
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
    } else if (line.kind === 'quote') blocks.push(`<blockquote><p>${content}</p></blockquote>`);
    else if (line.kind === 'code') blocks.push(`<codeblock><p>${content}</p></codeblock>`);
    else if (line.kind === 'heading' || line.kind === 'subheading') {
      const tag = line.kind === 'heading' ? 'h1' : 'h2'; blocks.push(`<${tag}>${content}</${tag}>`);
    } else blocks.push(`<p${line.kind === 'pullquote' || line.kind === 'divider' ? ' style="text-align: center"' : ''}>${content}</p>`);
  }
  if (list) blocks.push(list === 'bullet' ? '</ul>' : '</ol>');
  return blocks.join('');
}

function readInline(nodes: HtmlNode[], paragraph: Paragraph, formats: Format[] = []) {
  for (const node of nodes) {
    if (node.type === 'text') {
      const start = paragraph.text.length;
      paragraph.text += node.data;
      for (const format of formats) if (node.data) paragraph.marks.push({ ...format, start, end: paragraph.text.length });
    } else if (node.type === 'tag') {
      const tag = node.name;
      if (['script', 'style', 'img', 'iframe'].includes(tag)) continue;
      if (tag === 'br') { paragraph.text += '\n'; continue; }
      const next = [...formats];
      if (tag === 'b' || tag === 'strong') next.push({ kind: 'bold' });
      if (tag === 'i' || tag === 'em') next.push({ kind: 'italic' });
      const link = tag === 'a' ? safeLink(node.attribs.href ?? '') : null;
      if (link) next.push({ kind: 'link', url: link });
      const start = paragraph.text.length;
      readInline(node.children, paragraph, next);
      if (tag === 'mention' && node.attribs['data-user-id'] && node.attribs['data-handle'] && paragraph.text.length > start) {
        paragraph.mentions.push({ start, end: paragraph.text.length, target: {
          id: node.attribs['data-user-id'], handle: node.attribs['data-handle'], name: paragraph.text.slice(start),
        } });
      }
    }
  }
}

function readParagraphs(nodes: HtmlNode[], kind: BlockKind = 'paragraph'): Paragraph[] {
  const result: Paragraph[] = [];
  const paragraph = (children: HtmlNode[], nextKind: BlockKind, center = false, number?: number) => {
    const value: Paragraph = { kind: nextKind, text: '', marks: [], mentions: [], number };
    readInline(children, value);
    // native가 빈 문단을 br로 표현해도 저장 문서에는 문단 하나만 남긴다.
    if (value.text === '\n') value.text = '';
    if (center && nextKind === 'paragraph') value.kind = value.text === '· · ·' ? 'divider' : 'pullquote';
    let offset = 0;
    for (const text of value.text.split('\n')) {
      result.push({ ...value, text, marks: value.marks.filter(mark => mark.end > offset && mark.start < offset + text.length)
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
    if (tag === 'html' || tag === 'body') result.push(...readParagraphs(node.children, kind));
    else if (tag === 'ul' || tag === 'ol') {
      let number = 1;
      for (const item of node.children) if (item.type === 'tag' && item.name === 'li') {
        paragraph(item.children, tag === 'ul' ? 'bullet' : 'numbered', false, number++);
      }
    } else if (tag === 'blockquote' || tag === 'codeblock' || tag === 'pre') {
      const nextKind = tag === 'blockquote' ? 'quote' : 'code';
      const hasParagraphs = node.children.some(child => child.type === 'tag' && ['p', 'br', 'div'].includes(child.name));
      if (hasParagraphs) result.push(...readParagraphs(node.children, nextKind));
      else paragraph(node.children, nextKind);
    } else if (tag === 'br') paragraph([], kind);
    else if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'].includes(tag)) {
      paragraph(node.children, tag === 'h1' ? 'heading' : /^h[2-6]$/u.test(tag) ? 'subheading' : kind,
        /text-align\s*:\s*center/iu.test(node.attribs.style ?? ''));
    }
  }
  return result;
}

// HTML은 native 입력 경계에서만 사용하고 초안·발행은 기존 schemaVersion3 문서로 저장한다.
export function parseEditorHtml(html: string, previous: EditorValue): NativeEditorContent {
  const paragraphs = readParagraphs(parseDocument(html).children);
  if (!paragraphs.length) paragraphs.push({ kind: 'paragraph', text: '', marks: [], mentions: [] });
  const body = paragraphs.map(p => (p.kind === 'bullet' ? '• ' : p.kind === 'numbered' ? `${p.number ?? 1}. ` : '') + p.text).join('\n');
  const rebased = changeBody(previous, body);
  const marks: Mark[] = [];
  const mentions: Mention[] = [];
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
  return { text: paragraphs.map(p => p.text).join('\n'), document: {
    ...previous.document, version: previous.document.version + 1, body, blocks: paragraphs.map(p => p.kind), marks: normalizedMarks, mentions,
  } };
}

export function valueFromNativeHtml(html: string, previous: EditorValue, selection?: TextSelection): EditorValue {
  const { document } = parseEditorHtml(html, previous);
  const inferred = changeBody(previous, document.body).selection;
  const range = selection ? modelEditorSelection(document, selection) ?? inferred : inferred;
  return { document, selection: range, typing: formatsAt(document, range) };
}
