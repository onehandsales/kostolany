import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [query] = useState(() =>
    typeof window === 'undefined' ? null : window.matchMedia('(prefers-reduced-motion: reduce)'),
  );
  const [reduced, setReduced] = useState(() => query?.matches ?? true);
  useEffect(() => {
    const change = () => setReduced(query?.matches ?? true);
    query?.addEventListener('change', change);
    return () => query?.removeEventListener('change', change);
  }, [query]);
  return reduced;
}
