import { useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';

// 링크 화면의 수명 안에서 마지막 열기 결과만 오류 표시에 반영한다.
export function useExternalLink() {
  const [hasError, setHasError] = useState(false);
  const request = useRef(0);
  const active = useRef(true);
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      request.current += 1;
    };
  }, []);

  async function open(url: string | null): Promise<void> {
    const current = ++request.current;
    setHasError(false);
    try {
      if (!url) throw new Error('invalid-link');
      await Linking.openURL(url);
      if (active.current && current === request.current) setHasError(false);
    } catch {
      if (active.current && current === request.current) setHasError(true);
    }
  }

  return { hasError, open };
}
