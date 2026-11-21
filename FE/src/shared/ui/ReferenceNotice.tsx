import { AccessibleModal as Modal } from './AccessibleModal';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeStyles } from '../theme/ThemeProvider';
import { sizes, spacing, typography, type ThemeColors } from '../theme/tokens';
import { restoreModalFocus } from './restoreModalFocus';

type ReferenceNoticeProps = { title: string | null; onClose: () => void };

// 외부 기능을 실행하지 않는 원본 메뉴는 실제 처리 결과와 구분한 로컬 안내를 연다.
export function ReferenceNotice({ title, onClose }: ReferenceNoticeProps) {
  const styles = useThemeStyles(createStyles);
  useEffect(() => {
    if (title) return restoreModalFocus;
  }, [title]);
  if (!title) return null;
  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose} onDismiss={restoreModalFocus}>
      <View style={styles.overlay}>
        <View role="dialog" accessibilityLabel={title} accessibilityViewIsModal style={styles.card}>
          <Text role="heading" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.body}>This is a local Medium UI prototype. This service is not connected.</Text>
          <Pressable role="button" onPress={onClose} style={styles.button}>
            <Text style={styles.action}>Got it</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000033',
    padding: spacing.page,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    padding: spacing.page,
    gap: spacing.medium,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  title: { ...typography.sectionTitle, color: colors.text, textAlign: 'center' },
  body: { ...typography.body, color: colors.secondaryText, textAlign: 'center' },
  button: { minHeight: sizes.minimumTouchTarget, alignItems: 'center', justifyContent: 'center' },
  action: { ...typography.body, color: colors.green },
});
