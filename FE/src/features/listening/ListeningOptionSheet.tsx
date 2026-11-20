import { useEffect, useRef, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme, useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { useListening } from './ListeningProvider';
import type { ListeningOptions } from './listeningOptions';

type ListeningOptionSheetProps = {
  title: string;
  options: ListeningOptions;
  children: ReactNode;
  onClose: () => void;
};
export function ListeningOptionSheet({ title, options, children, onClose }: ListeningOptionSheetProps) {
  const { store, snapshot } = useListening();
  const active = useRef(true);
  const closeButton = useRef<View | null>(null);
  const { colors } = useTheme();
  const styles = useThemeStyles(createStyles);
  useEffect(() => {
    active.current = true;
    closeButton.current?.focus();
    return () => {
      active.current = false;
      store?.cancelOptions();
    };
  }, [store]);
  async function save() {
    if (!store || store.getSnapshot().optionsStatus === 'saving') return;
    if ((await store.setOptions(options)) && active.current) onClose();
  }
  return (
    <View style={styles.sheet}>
      <View style={styles.header}>
        <Pressable
          ref={closeButton}
          role="button"
          accessibilityLabel={`${title} 취소`}
          onPress={onClose}
          style={styles.done}
        >
          <AppIcon name="close" size={22} />
        </Pressable>
        <Text role="heading" style={styles.title}>
          {title}
        </Text>
        <Pressable
          role="button"
          accessibilityLabel={`${title} Done`}
          onPress={() => {
            void save();
          }}
          disabled={snapshot.optionsStatus === 'saving'}
          accessibilityState={{
            disabled: snapshot.optionsStatus === 'saving',
            busy: snapshot.optionsStatus === 'saving',
          }}
          style={styles.done}
        >
          {snapshot.optionsStatus === 'saving' ? (
            <ActivityIndicator color={colors.green} />
          ) : (
            <Text style={styles.doneText}>Done</Text>
          )}
        </Pressable>
      </View>
      {snapshot.optionsStatus === 'error' && (
        <Text role="alert" style={styles.error}>
          적용하지 못했어요. 선택을 유지했어요. Done으로 다시 시도하세요.
        </Text>
      )}
      <View style={styles.body} pointerEvents={snapshot.optionsStatus === 'saving' ? 'none' : 'auto'}>
        {children}
      </View>
    </View>
  );
}
const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    sheet: {
      ...StyleSheet.absoluteFill,
      top: 0,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.background,
    },
    header: { minHeight: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 },
    title: {
      fontFamily: fonts.sans,
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      flex: 1,
    },
    done: { minWidth: 64, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
    doneText: { color: colors.green, fontFamily: fonts.sans, fontSize: 17 },
    error: { color: colors.destructive, paddingHorizontal: 16, paddingVertical: 8 },
    body: { flex: 1 },
  });
