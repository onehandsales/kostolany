import { useEffect, useEffectEvent, useRef } from 'react';
import { parsePreviewLink, type PreviewDestination, type PreviewLinkSource } from './previewLinks';

export function usePreviewLinks(source: PreviewLinkSource, onOpen: (target: PreviewDestination) => void) {
  const ready = useRef(false);
  const pending = useRef<PreviewDestination | null>(null);
  const receive = useEffectEvent((target: PreviewDestination) => {
    if (ready.current) onOpen(target);
    else pending.current = target;
  });
  useEffect(() => {
    let active = true;
    let receivedEvent = false;
    const unsubscribe = source.subscribe((url) => {
      const target = parsePreviewLink(url);
      if (!active || !target) return;
      receivedEvent = true;
      receive(target);
    });
    void Promise.resolve()
      .then(source.initial)
      .then((url) => {
        if (!active || receivedEvent || !url) return;
        const target = parsePreviewLink(url);
        if (target) receive(target);
      })
      .catch(() => {
        if (active && !receivedEvent) receive({ kind: 'invalid' });
      });
    return () => {
      active = false;
      unsubscribe();
      pending.current = null;
    };
  }, [source]);
  return () => {
    ready.current = true;
    const target = pending.current;
    pending.current = null;
    if (target) onOpen(target);
  };
}
