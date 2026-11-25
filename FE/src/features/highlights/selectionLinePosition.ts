import type { SelectionPosition } from './selectionBridge.types';

export type MeasuredTextLine = SelectionPosition & { text: string };

// 글자 폭을 추정하지 않고 선택이 걸친 실제 줄들의 영역을 메뉴 기준점으로 사용한다.
export function selectionLinePosition(text: string, start: number, end: number,
  lines: readonly MeasuredTextLine[]): SelectionPosition | null {
  if (start < 0 || end <= start || end > text.length) return null;
  let offset = 0;
  const selected: MeasuredTextLine[] = [];
  for (const line of lines) {
    if (![line.x, line.y, line.width, line.height].every(Number.isFinite)
      || line.width < 0 || line.height <= 0) return null;
    if (!line.text) continue;
    const from = text.indexOf(line.text, offset);
    if (from < 0 || text.slice(offset, from).trim()) return null;
    const to = from + line.text.length;
    if (start < to && end > from) selected.push(line);
    offset = to;
  }
  if (!selected.length || text.slice(offset).trim()) return null;
  const x = Math.min(...selected.map(line => line.x));
  const y = Math.min(...selected.map(line => line.y));
  return { x, y, width: Math.max(...selected.map(line => line.x + line.width)) - x,
    height: Math.max(...selected.map(line => line.y + line.height)) - y };
}
