import { AccessibleModal as Modal } from '../../shared/ui/AccessibleModal';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export function SelectionOverlay({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return <Modal transparent animationType="none" onRequestClose={onClose}><View style={{ flex: 1 }}>
    <Pressable role="button" accessibilityLabel="문구 선택 취소" style={StyleSheet.absoluteFill} onPress={onClose} />
    {children}
  </View></Modal>;
}
