import { useLayoutEffect, useRef } from 'react';
import { captureSettingsReturnFocus } from './settingsReturnFocus';

export function useSettingsReturnFocus(active: boolean) {
  const restore = useRef<(() => void) | null>(null);
  useLayoutEffect(() => {
    if (!active || !restore.current) return;
    const frame = requestAnimationFrame(() => { restore.current?.(); restore.current = null; });
    return () => cancelAnimationFrame(frame);
  }, [active]);
  return (open: () => void) => { restore.current = captureSettingsReturnFocus(); open(); };
}
