import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, sizes } from '../../shared/theme/tokens';

export function LibrarySheet({
  title,
  titleLabel = title,
  children,
  onClose,
  onShow,
  expanded = false,
  closeLabel = '취소',
  closeText = closeLabel,
  hideClose = false,
  contentStyle,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onShow?: () => void;
  expanded?: boolean;
  closeLabel?: string;
  titleLabel?: string;
  closeText?: string;
  hideClose?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      transparent
      animationType="fade"
      accessibilityLabel={titleLabel}
      onRequestClose={onClose}
      onShow={onShow}
    >
      <SafeAreaView accessibilityViewIsModal edges={['top', 'left', 'right']} style={styles.backdrop}>
        {hideClose && (
          <Pressable
            role="button"
            accessibilityLabel={`${titleLabel} ${closeLabel}`}
            onPress={onClose}
            style={StyleSheet.absoluteFill}
          />
        )}
        <KeyboardAvoidingView
          pointerEvents="box-none"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.avoidKeyboard}
        >
          <View style={[styles.sheet, expanded && styles.expanded, { paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
              <Text role="heading" style={styles.title}>
                {title}
              </Text>
              {!hideClose && (
                <Pressable
                  role="button"
                  accessibilityLabel={`${titleLabel} ${closeLabel}`}
                  onPress={onClose}
                  style={styles.close}
                >
                  <Text style={styles.closeText}>{closeText}</Text>
                </Pressable>
              )}
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[styles.content, contentStyle]}
            >
              {children}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

export const listFormStyles = StyleSheet.create({
  text: { fontSize: 16, lineHeight: 26, color: colors.text },
  secondary: { fontSize: 14, lineHeight: 22, color: colors.secondaryText },
  primary: {
    minHeight: sizes.minimumTouchTarget,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#18820f',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: { fontSize: 16, lineHeight: 24, color: colors.background, textAlign: 'center' },
  disabled: { opacity: 0.45 },
  row: { minHeight: sizes.minimumTouchTarget, paddingVertical: 12, justifyContent: 'center' },
  error: { fontSize: 14, lineHeight: 22, color: '#a52a2a' },
});

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.18)' },
  avoidKeyboard: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    maxHeight: '92%',
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  expanded: { height: '98%', maxHeight: '98%' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: 64,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
  },
  close: {
    position: 'absolute',
    right: 12,
    minHeight: sizes.minimumTouchTarget,
    minWidth: sizes.minimumTouchTarget,
    justifyContent: 'center',
  },
  closeText: { fontSize: 13, lineHeight: 20, color: colors.secondaryText, textAlign: 'center' },
  content: { padding: 24, gap: 24, paddingBottom: 32 },
});
