import { AccessibleModal as Modal } from './AccessibleModal';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeStyles } from '../theme/ThemeProvider';
import { fonts, type ThemeColors } from '../theme/tokens';
import { IconButton } from './IconButton';
import { restoreModalFocus } from './restoreModalFocus';

type MenuItem = { label: string; accessibilityLabel?: string; destructive?: boolean; onPress: () => void };
type ActionMenuProps = { label: string; items: readonly MenuItem[] };

export function ActionMenu({ label, items }: ActionMenuProps) {
  const styles = useThemeStyles(createStyles);
  const anchor = useRef<View>(null);
  const button = useRef<View>(null);
  const measurementRevision = useRef(0);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const menuWidth = Math.min(250, width - 16);
  useEffect(
    () => () => {
      measurementRevision.current += 1;
    },
    [],
  );
  const dismiss = () => {
    measurementRevision.current += 1;
    setPosition(null);
  };
  const close = () => {
    dismiss();
    requestAnimationFrame(() => { button.current?.focus(); restoreModalFocus(); });
  };
  return (
    <View ref={anchor} collapsable={false}>
      <IconButton
        buttonRef={button}
        icon="more"
        label={label}
        onPress={() => {
          const revision = ++measurementRevision.current;
          setPosition({ x: width - 16, y: insets.top + 48 });
          // 닫힌 메뉴를 늦은 네이티브 측정 응답이 다시 열지 않도록 현재 요청만 반영한다.
          anchor.current?.measureInWindow((x, y, w, h) => {
            if (measurementRevision.current === revision) setPosition({ x: x + w, y: y + h });
          });
        }}
      />
      {position && (
        <Modal transparent animationType="none" accessibilityLabel={label} onRequestClose={close}>
          <View accessibilityViewIsModal style={styles.screen}>
            <Pressable
              role="button"
              accessibilityLabel={`${label} 닫기`}
              onPress={close}
              style={StyleSheet.absoluteFill}
            />
            <View
              style={[
                styles.menu,
                {
                  width: menuWidth,
                  left: Math.max(8, Math.min(width - menuWidth - 8, position.x - menuWidth)),
                  top: Math.max(
                    insets.top,
                    Math.min(
                      position.y,
                      height - insets.bottom - Math.min(items.length * 48, height * 0.65) - 16,
                    ),
                  ),
                  maxHeight: height * 0.65,
                },
              ]}
            >
              <ScrollView>
                {items.map((item) => (
                  <Pressable
                    key={item.label}
                    role="button"
                    accessibilityLabel={item.accessibilityLabel ?? item.label}
                    onPress={() => {
                      dismiss();
                      item.onPress();
                    }}
                    style={styles.row}
                  >
                    <Text style={[styles.text, item.destructive && styles.destructive]}>{item.label}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  screen: { flex: 1 },
  menu: {
    position: 'absolute',
    borderRadius: 14,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    boxShadow: '0px 8px 60px rgba(0,0,0,0.18)',
  },
  row: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  text: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, color: colors.text },
  destructive: { color: colors.destructive },
});
