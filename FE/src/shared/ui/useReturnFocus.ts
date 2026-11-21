import { useLayoutEffect, useRef } from 'react';
import { captureReturnFocus } from './returnFocus';

export function useReturnFocus(active: boolean) {
  const restore = useRef<(() => void) | null>(null);
  useLayoutEffect(() => {
    if (!active || !restore.current) return;
    const frame = requestAnimationFrame(() => { restore.current?.(); restore.current = null; });
    return () => cancelAnimationFrame(frame);
  }, [active]);
  return (open: () => void) => { restore.current = captureReturnFocus(); open(); };
}
