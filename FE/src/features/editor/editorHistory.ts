import { cloneDocument } from './draftSource';
import type { EditorValue } from './editorModel';

const copy = (value: EditorValue): EditorValue => ({ document: cloneDocument(value.document), selection: { ...value.selection }, typing: value.typing.map(format => ({ ...format })) });
const content = (value: EditorValue) => JSON.stringify({ ...value.document, version: 0 });

// 이력은 현재 편집 세션에만 보관하고 저장 버전은 되돌리지 않는다.
export function createEditorHistory() {
  const past: EditorValue[] = []; const future: EditorValue[] = [];
  let group: 'title' | 'body' | null = null; let lastEdit = 0;
  function breakGroup() { group = null; }
  function record(before: EditorValue, after: EditorValue) {
    if (content(before) === content(after)) return;
    const a = before.document; const b = after.document;
    const field = a.title !== b.title && a.body === b.body ? 'title' : a.body !== b.body && a.title === b.title ? 'body' : null;
    const plain = field && JSON.stringify({ ...a, version: 0, [field]: '' }) === JSON.stringify({ ...b, version: 0, [field]: '' });
    const now = Date.now();
    if (!plain || group !== field || now - lastEdit > 750 || future.length) {
      past.push(copy(before));
      if (past.length > 100) past.shift();
    }
    future.length = 0; group = plain ? field : null; lastEdit = now;
  }
  function move(current: EditorValue, from: EditorValue[], to: EditorValue[]) {
    const target = from.pop(); if (!target) return null;
    to.push(copy(current)); breakGroup();
    return { ...copy(target), document: { ...cloneDocument(target.document), version: current.document.version + 1 } };
  }
  return {
    record, breakGroup,
    undo: (current: EditorValue) => move(current, past, future),
    redo: (current: EditorValue) => move(current, future, past),
    clear() { past.length = 0; future.length = 0; breakGroup(); },
    snapshot(current: EditorValue) {
      return { canUndo: past.length > 0, canRedo: future.length > 0,
        historyAssetIds: [...new Set([...past, current, ...future].flatMap(value => value.document.images.map(image => image.assetId)))] };
    },
  };
}
