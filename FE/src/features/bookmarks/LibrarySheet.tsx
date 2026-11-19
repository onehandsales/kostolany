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

import { colors, sizes, fonts } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';

type LibrarySheetProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onShow?: () => void;
  expanded?: boolean;
  closeLabel?: string;
  titleLabel?: string;
  closeText?: string;
  hideClose?: boolean;
  variant?: 'standard' | 'confirmation';
} & (
  | { contentMode?: 'scroll'; contentStyle?: StyleProp<ViewStyle> }
  | { contentMode: 'list'; contentStyle?: never }
);

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
  variant = 'standard',
  contentStyle,
  contentMode = 'scroll',
}: LibrarySheetProps) {
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
            <View style={[styles.header, variant === 'confirmation' && styles.confirmationHeader]}>
              {variant === 'confirmation' && <View pointerEvents="none" style={styles.handle} />}
              <Text role="heading" style={[styles.title, variant === 'confirmation' && styles.confirmationTitle]}>
                {title}
              </Text>
              {!hideClose && (
                <Pressable
                  role="button"
                  accessibilityLabel={`${titleLabel} ${closeLabel}`}
                  onPress={onClose}
                  style={[styles.close, variant === 'confirmation' && styles.confirmationClose]}
                >
                  {variant === 'confirmation' ? <AppIcon name="close" size={18} color={colors.secondaryText} /> : <Text style={styles.closeText}>{closeText}</Text>}
                </Pressable>
              )}
            </View>
            {contentMode === 'list' ? children : (
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={[styles.content, contentStyle]}
              >
                {children}
              </ScrollView>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

export const listFormStyles = StyleSheet.create({
  text: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 26, color: colors.text },
  secondary: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.secondaryText },
  primary: {
    minHeight: sizes.minimumTouchTarget,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.green,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryText: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24, color: colors.background, textAlign: 'center' },
  disabled: { opacity: 0.45 },
  row: { minHeight: sizes.minimumTouchTarget, paddingVertical: 12, justifyContent: 'center' },
  error: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: '#a52a2a' },
});

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.12)' },
  avoidKeyboard: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    maxHeight: '92%',
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    backgroundColor: colors.background,
    borderTopLeftRadius: sizes.sheetRadius,
    borderTopRightRadius: sizes.sheetRadius,
    overflow: 'hidden',
  },
  expanded: { height: '98.7%', maxHeight: '98.7%' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 54,
    paddingHorizontal: 80,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  title: {
    flex: 1,
    fontFamily: fonts.sans, fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
  },
  close: {
    position: 'absolute',
    right: 20,
    minHeight: sizes.minimumTouchTarget,
    minWidth: sizes.minimumTouchTarget,
    justifyContent: 'center',
  },
  closeText: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText, textAlign: 'center' },
  confirmationHeader: { paddingTop: 38, paddingBottom: 10, borderBottomWidth: 0 },
  confirmationTitle: { fontSize: 20, lineHeight: 26 },
  confirmationClose: { top: 0, right: 0, alignItems: 'center' },
  handle: { position: 'absolute', top: 8, left: '50%', marginLeft: -18, width: 36, height: 4, borderRadius: 2, backgroundColor: colors.divider },
  content: { padding: 24, gap: 24, paddingBottom: 32 },
});
