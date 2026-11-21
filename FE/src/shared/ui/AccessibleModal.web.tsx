import { useCallback, useId, useLayoutEffect, useRef } from 'react';
import { Modal, type ModalProps } from 'react-native';
import { isolateModal } from './modalIsolation.web';
import { useReducedMotion } from './useReducedMotion';

export function AccessibleModal(props: ModalProps) {
  const reduced = useReducedMotion();
  const generatedId = useId();
  const id = props.nativeID ?? `modal-${generatedId}`;
  const release = useRef<(() => void) | null>(null);
  const visible = props.visible !== false;
  const activate = useCallback(() => {
    if (!visible || release.current) return;
    const element = document.getElementById(id);
    if (element) release.current = isolateModal(element);
  }, [id, visible]);
  const cleanup = useCallback(() => {
    release.current?.();
    release.current = null;
  }, []);
  useLayoutEffect(() => {
    activate();
    return cleanup;
  }, [activate, cleanup]);
  return (
    <Modal
      {...props}
      animationType={reduced ? 'none' : props.animationType}
      nativeID={id}
      onShow={(event) => {
        activate();
        props.onShow?.(event);
      }}
      onDismiss={() => {
        cleanup();
        props.onDismiss?.();
      }}
    />
  );
}
