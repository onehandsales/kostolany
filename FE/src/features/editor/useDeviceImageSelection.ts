import { useEffect, useRef, useState } from 'react';
import { LocalImageError } from '../../shared/media/localImage';
import type { EditorImageSource, ImageAsset, ImageLease } from './imageSource';

export function useDeviceImageSelection(
  source: EditorImageSource,
  onSelect: (asset: ImageAsset, origin: 'camera' | 'library') => void,
  onCancel: () => void,
) {
  const job = useRef<AbortController | null>(null);
  const selected = useRef<ImageLease | null>(null);
  const [result, setResult] = useState<{ source: EditorImageSource; error: string | null } | null>(null);
  const stop = () => {
    job.current?.abort();
    job.current = null;
    selected.current?.release();
    selected.current = null;
  };
  useEffect(() => stop, [source]);
  function start(origin: 'camera' | 'library') {
    stop();
    if (!source.pick) return;
    const abort = new AbortController();
    job.current = abort;
    setResult({ source, error: null });
    // 웹 선택기도 사용자 클릭 안에서 열고 늦은 결과는 화면과 공급부 수명에 맞춰 해제한다.
    let request: Promise<ImageLease | null>;
    try {
      request = source.pick(origin, abort.signal);
    } catch (error) {
      request = Promise.reject(error);
    }
    void request
      .then((lease) => {
        if (abort.signal.aborted || job.current !== abort) {
          lease?.release();
          return;
        }
        if (!lease) {
          onCancel();
          return;
        }
        selected.current = lease;
        onSelect(lease.asset, origin);
      })
      .catch((error) => {
        if (abort.signal.aborted || job.current !== abort) return;
        const reason = error instanceof LocalImageError ? error.reason : 'processing';
        setResult({
          source,
          error:
            reason === 'permission'
              ? '사진 접근이 허용되지 않았어요.'
              : reason === 'unsupported'
                ? '이 환경에서 사진 선택을 사용할 수 없어요.'
                : reason === 'invalid'
                  ? '지원하는 크기의 이미지 파일을 선택해 주세요.'
                  : '사진을 처리하지 못했어요.',
        });
      });
  }
  return { start, cancel: stop, error: result?.source === source ? result.error : null };
}
