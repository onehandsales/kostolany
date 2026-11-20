import { validPassage, type Passage } from './types';

export type SelectionBlock = Readonly<{ text: string; selectable: boolean; start: number; end: number }>;
export type SelectionDocument = Readonly<{ articleId: string; title: string; author: string; version: string; text: string; blocks: readonly SelectionBlock[] }>;
export function createSelectionDocument(articleId: string, title: string, author: string, paragraphs: readonly { text: string; selectable: boolean }[]): SelectionDocument {
  let offset = 0;
  const blocks = paragraphs.map(paragraph => {
    const block = { ...paragraph, start: offset, end: offset + paragraph.text.length };
    offset = block.end + 2; return block;
  });
  const text = paragraphs.map(paragraph => paragraph.text).join('\n\n');
  // 본문 전체와 선택 가능 경계를 버전에 포함해 바뀐 원문에 옛 범위를 붙이지 않는다.
  const version = JSON.stringify(paragraphs);
  return { articleId, title, author, version, text, blocks };
}
export function passageAt(document: SelectionDocument, start: number, end: number): Passage | null {
  const passage = { articleId: document.articleId, version: document.version, start, end, text: document.text.slice(start, end) };
  if (!validPassage(passage) || end > document.text.length) return null;
  const first = document.blocks.find(block => block.selectable && start >= block.start && start < block.end);
  const last = document.blocks.find(block => block.selectable && end > block.start && end <= block.end);
  if (!first || !last || document.blocks.some(block => !block.selectable && start < block.end && end > block.start)) return null;
  return passage;
}
export function resolvePassage(document: SelectionDocument, passage: Passage): boolean {
  const current = passageAt(document, passage.start, passage.end);
  return document.articleId === passage.articleId && document.version === passage.version && current?.text === passage.text;
}
