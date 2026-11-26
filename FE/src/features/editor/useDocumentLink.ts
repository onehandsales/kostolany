import { useCallback, useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { safeLink, type EditorDocument } from './editorModel';
import type { EditorImageSource } from './imageSource';

export function useDocumentLink(document: EditorDocument, images: EditorImageSource, active: boolean) {
  const [lifetime, setLifetime] = useState(() => ({ document, images, active }));
  if (lifetime.document !== document || lifetime.images !== images || lifetime.active !== active) {
    setLifetime({ document, images, active });
  }
  const session = useRef<{ identity: typeof lifetime; alive: boolean } | null>(null);
  const request = useRef(0);
  const [failure, setFailure] = useState<{ lifetime: typeof lifetime; url: string } | null>(null);
  useEffect(() => {
    const current = { identity: lifetime, alive: true };
    session.current = current;
    return () => { current.alive = false; };
  }, [lifetime]);
  // 문서와 공급부가 돌아와도 이전 방문의 링크 요청은 새 방문에 속하지 않는다.
  const open = useCallback(async (url: string) => {
    const safe = safeLink(url); if (!safe || !active) return;
    const current = session.current;
    if (!current?.alive || current.identity !== lifetime) return;
    const currentRequest = ++request.current;
    setFailure(null);
    try {
      await Linking.openURL(safe);
      if (current.alive && request.current === currentRequest) setFailure(null);
    } catch {
      if (current.alive && request.current === currentRequest) setFailure({ lifetime, url: safe });
    }
  }, [active, lifetime]);
  return { open, failedLink: active && failure?.lifetime === lifetime ? failure.url : null };
}
