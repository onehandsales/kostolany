import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export function SelectionOverlay({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [onClose]);
  return createPortal(<div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
    <div style={{ pointerEvents: 'auto' }}>{children}</div>
  </div>, document.body);
}
