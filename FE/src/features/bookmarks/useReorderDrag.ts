import { useEffect, useLayoutEffect, useState } from 'react';
import { Animated, FlatList, PanResponder, View } from 'react-native';

import { edgeScrollDelta, reorderDestination } from './reorderGeometry';

export function useReorderDrag(ids: readonly string[], disabled: boolean, move: (id: string, index: number) => void) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [translateY] = useState(() => new Animated.Value(0));
  const [controller] = useState(() => createDragController(setDraggedId, translateY));
  useLayoutEffect(() => controller.configure(ids, disabled, move), [controller, ids, disabled, move]);
  useEffect(() => () => controller.dispose(), [controller]);
  return { ...controller, draggedId, translateY };
}

// 제스처 좌표와 RAF 수명은 컨트롤러가 소유하고 렌더에는 활성 행과 애니메이션만 전달한다.
function createDragController(onDrag: (id: string | null) => void, position: Animated.Value) {
  let viewport: View | null = null;
  let list: FlatList<string> | null = null;
  let ids: readonly string[] = [];
  let disabled = false;
  let move: (id: string, index: number) => void = () => {};
  const heights = new Map<string, number>();
  const size = { top: 0, height: 0, content: 0, header: 0, offset: 0 };
  let armed: string | null = null;
  let drag: { id: string; pointer: number; started: number; frame: number | null } | null = null;
  const dispose = () => {
    if (drag?.frame !== null && drag?.frame !== undefined) cancelAnimationFrame(drag.frame);
    drag = null;
    armed = null;
  };
  function finish(commit: boolean) {
    if (!drag) return;
    const active = drag;
    dispose();
    if (commit) move(active.id, reorderDestination(ids, active.id,
      active.pointer + size.offset - size.header, heights));
    onDrag(null);
  }
  const responder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => { armed = null; return false; },
    onMoveShouldSetPanResponderCapture: (_event, gesture) => Boolean(armed) && !disabled && Math.abs(gesture.dy) > 5,
    onPanResponderGrant: (_event, gesture) => {
      if (!armed || !viewport) return;
      const active = { id: armed, pointer: gesture.y0 - size.top, started: 0, frame: null as number | null };
      drag = active;
      onDrag(active.id);
      position.setValue(active.pointer - 36);
      const tick = (now: number) => {
        if (drag !== active) return;
        const delta = edgeScrollDelta(active.pointer, size.height, active.started ? now - active.started : 16);
        active.started = now;
        const offset = Math.max(0, Math.min(Math.max(0, size.content - size.height), size.offset + delta));
        if (offset !== size.offset) {
          size.offset = offset;
          list?.scrollToOffset({ offset, animated: false });
        }
        active.frame = requestAnimationFrame(tick);
      };
      active.frame = requestAnimationFrame(tick);
    },
    onPanResponderMove: (_event, gesture) => {
      if (!drag) return;
      drag.pointer = gesture.moveY - size.top;
      position.setValue(drag.pointer - 36);
    },
    onPanResponderRelease: () => finish(true),
    onPanResponderTerminate: () => finish(false),
    onPanResponderTerminationRequest: () => false,
  });
  return {
    configure(next: readonly string[], nextDisabled: boolean, onMove: typeof move) {
      ids = next; disabled = nextDisabled; move = onMove;
    },
    dispose,
    viewport: (node: View | null) => { viewport = node; },
    list: (node: FlatList<string> | null) => { list = node; },
    panHandlers: responder.panHandlers,
    onScroll: (offset: number) => { size.offset = offset; },
    onContentHeight: (height: number) => { size.content = height; },
    onHeaderHeight: (height: number) => { size.header = height; },
    onRowHeight: (id: string, height: number) => { heights.set(id, height); },
    measure: () => viewport?.measureInWindow((_x, y, _width, height) => {
      size.top = y; size.height = height;
    }),
    arm: (id: string) => { if (!disabled) armed = id; },
    disarm: () => { if (!drag) armed = null; },
  };
}
