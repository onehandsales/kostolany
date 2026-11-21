import { Modal, type ModalProps } from 'react-native';
import { useReducedMotion } from './useReducedMotion';

export function AccessibleModal(props: ModalProps) {
  const reduced = useReducedMotion();
  return <Modal {...props} animationType={reduced ? 'none' : props.animationType} />;
}
