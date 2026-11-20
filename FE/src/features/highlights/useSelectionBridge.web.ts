import { useEffect, useRef } from 'react';

import { passageAt } from './selectionDocument';
import type { SelectionBridgeProps } from './selectionBridge.types';

export function useSelectionBridge({ id, document: content, active, selectionColor, onSelect }: SelectionBridgeProps) {
  const callback = useRef(onSelect);
  useEffect(() => { callback.current = onSelect; }, [onSelect]);
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `#${id} ::selection { background: ${selectionColor}; }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, [id, selectionColor]);
  useEffect(() => {
    if (!active) return;
    const root = document.getElementById(id);
    if (!root) return;
    let dragging = false;
    const pointerDown = () => { dragging = true; };
    function offset(node: Node, index: number): number | null {
      let element = node instanceof Element ? node : node.parentElement;
      while (element && element !== root) {
        if (element.id.startsWith(`${id}-block-`) && /^\d+$/.test(element.id.slice(`${id}-block-`.length))) {
          const block = content.blocks[Number(element.id.slice(`${id}-block-`.length))];
          if (!block?.selectable) return null;
          const range = document.createRange(); range.setStart(element, 0); range.setEnd(node, index);
          return block.start + range.toString().length;
        }
        element = element.parentElement;
      }
      return null;
    }
    function update(event?: Event) {
      if (event?.type === 'pointerup') dragging = false;
      if (dragging && event?.type === 'selectionchange') return;
      const selection = window.getSelection();
      const toolbar = event?.target instanceof Element && event.target.closest('[aria-label="문구 선택 메뉴"]');
      if (toolbar) return;
      if (!selection || !selection.rangeCount || selection.isCollapsed) {
        if (event?.type === 'pointerup' || event?.type === 'keyup') callback.current(null);
        return;
      }
      const range = selection.getRangeAt(0);
      if (!root?.contains(range.startContainer) || !root.contains(range.endContainer)) return;
      const start = offset(range.startContainer, range.startOffset);
      const end = offset(range.endContainer, range.endOffset);
      const passage = start === null || end === null ? null : passageAt(content, start, end);
      if (!passage) { callback.current(null); return; }
      const box = range.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) { callback.current(null); return; }
      callback.current({ passage, position: { x: box.x, y: box.y, width: box.width, height: box.height } });
    }
    document.addEventListener('pointerdown', pointerDown);
    document.addEventListener('pointerup', update); document.addEventListener('keyup', update);
    document.addEventListener('selectionchange', update); document.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      document.removeEventListener('pointerdown', pointerDown);
      document.removeEventListener('pointerup', update); document.removeEventListener('keyup', update);
      document.removeEventListener('selectionchange', update); document.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update); window.getSelection()?.removeAllRanges();
    };
  }, [id, content, active]);
}
export function clearTextSelection(): void { window.getSelection()?.removeAllRanges(); }
export function revealPassage(id: string, start: number): boolean {
  const root = document.getElementById(id);
  const target = root?.querySelector(`[id$="-highlight-${start}"]`);
  if (!target) return false;
  target.scrollIntoView({ block: 'center', behavior: 'auto' }); return true;
}
