import { useEffect, useRef, useState } from 'react';
import { useProfilePhotos } from './ProfileProvider';
import { ProfilePhotoError, type ProfilePhoto, type ProfilePhotoLease, type ProfilePhotoOrigin } from './profilePhoto';

export function useProfilePhotoSelection(initial: ProfilePhoto | null | undefined, onSelect: (photo: ProfilePhoto) => void) {
  const { picker, resources } = useProfilePhotos();
  const request = useRef<AbortController | null>(null);
  const selected = useRef<ProfilePhotoLease | null>(null);
  const [status, setStatus] = useState<{ picker: typeof picker; busy: boolean; error: string | null }>({ picker, busy: false, error: null });
  useEffect(() => {
    const releaseInitial = resources.retain(initial);
    return () => {
      request.current?.abort();
      selected.current?.release();
      selected.current = null;
      releaseInitial();
    };
  }, [initial, resources]);
  useEffect(() => () => request.current?.abort(), [picker]);

  const cancel = () => {
    request.current?.abort();
    request.current = null;
    setStatus({ picker, busy: false, error: null });
  };
  const select = async (origin: ProfilePhotoOrigin): Promise<boolean> => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setStatus({ picker, busy: true, error: null });
    try {
      const lease = await picker(origin, controller.signal);
      if (controller.signal.aborted || request.current !== controller) { lease?.release(); return false; }
      if (!lease) return false;
      const next = resources.adopt(lease);
      const previous = selected.current;
      selected.current = next;
      onSelect(next.photo);
      previous?.release();
      return true;
    } catch (reason) {
      if (controller.signal.aborted || request.current !== controller) return false;
      const error = reason instanceof ProfilePhotoError && reason.reason === 'permission'
        ? '카메라 권한이 없어요. 기기 설정에서 권한을 허용하거나 라이브러리를 선택해 주세요.'
        : reason instanceof ProfilePhotoError && reason.reason === 'unsupported'
          ? '이 환경에서 사진 선택을 지원하지 않아요. 다른 방법을 선택해 주세요.'
          : '사진을 처리하지 못했어요. 다른 사진을 선택하거나 다시 시도해 주세요.';
      setStatus({ picker, busy: false, error });
      return false;
    } finally {
      if (!controller.signal.aborted && request.current === controller) {
        request.current = null;
        setStatus(previous => ({ ...previous, busy: false }));
      }
    }
  };
  return { busy: status.picker === picker && status.busy, error: status.picker === picker ? status.error : null, select, cancel };
}
