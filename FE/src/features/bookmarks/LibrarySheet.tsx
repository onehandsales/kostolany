import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, sizes } from '../../shared/theme/tokens';

export function LibrarySheet({ title, children, onClose, onShow, expanded = false, closeLabel = '취소' }: {
  title: string; children: ReactNode; onClose: () => void; onShow?: () => void; expanded?: boolean; closeLabel?: string;
}) {
  return <Modal transparent animationType="fade" accessibilityLabel={title} onRequestClose={onClose} onShow={onShow}>
    <SafeAreaView style={styles.backdrop}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.avoidKeyboard}>
        <View accessibilityViewIsModal
          style={[styles.sheet, expanded && styles.expanded]}>
          <View style={styles.header}>
            <Text role="heading" style={styles.title}>{title}</Text>
            <Pressable role="button" accessibilityLabel={`${title} ${closeLabel}`} onPress={onClose} style={styles.close}>
              <Text style={styles.closeText}>{closeLabel}</Text>
            </Pressable>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </Modal>;
}

export const listFormStyles = StyleSheet.create({
  text: { fontSize: 16, lineHeight: 26, color: colors.text },
  secondary: { fontSize: 14, lineHeight: 22, color: colors.secondaryText },
  primary: { minHeight: sizes.minimumTouchTarget, paddingHorizontal: 24, paddingVertical: 12,
    backgroundColor: '#18820f', borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  primaryText: { fontSize: 16, lineHeight: 24, color: colors.background, textAlign: 'center' },
  disabled: { opacity: 0.45 },
  row: { minHeight: sizes.minimumTouchTarget, paddingVertical: 12, justifyContent: 'center' },
  error: { fontSize: 14, lineHeight: 22, color: '#a52a2a' },
});

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.18)' },
  avoidKeyboard: { flex: 1, justifyContent: 'flex-end' },
  sheet: { maxHeight: '92%', width: '100%', maxWidth: 680, alignSelf: 'center',
    backgroundColor: colors.background, borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden' },
  expanded: { height: '92%' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 24,
    paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  title: { flex: 1, fontSize: 22, lineHeight: 30, fontWeight: '700', color: colors.text },
  close: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget, justifyContent: 'center' },
  closeText: { fontSize: 16, lineHeight: 24, color: colors.secondaryText, textAlign: 'center' },
  content: { padding: 24, gap: 24, paddingBottom: 32 },
});
