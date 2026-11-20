export type Passage = Readonly<{ articleId: string; version: string; start: number; end: number; text: string }>;
export type Highlight = Passage & Readonly<{ id: string; title: string; author: string; createdAt: string }>;
export type HighlightValue = Readonly<{ userId: string; version: number; highlights: readonly Highlight[] }>;
export type HighlightCommand = Readonly<{ operationId: string; highlight: Highlight; selected: boolean }>;
export type HighlightSource = Readonly<{
  read: (userId: string) => Promise<HighlightValue>;
  set: (userId: string, command: HighlightCommand) => Promise<HighlightValue>;
}>;
export type HighlightSnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error'; value: HighlightValue | null; pending: number; readError: boolean;
}>;
export const highlightId = (passage: Passage): string => JSON.stringify([passage.articleId, passage.version, passage.start, passage.end]);
export const highlightOperation = (): string => `highlight-${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function validPassage(value: Passage): boolean {
  return Boolean(value.articleId && value.version && value.text.trim()) && Number.isSafeInteger(value.start)
    && Number.isSafeInteger(value.end) && value.start >= 0 && value.end > value.start && value.end - value.start === value.text.length;
}
export function validHighlight(value: Highlight): boolean {
  return validPassage(value) && value.id === highlightId(value) && Boolean(value.title && value.author)
    && Number.isFinite(Date.parse(value.createdAt));
}
