import {
  createContext, useContext, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode,
} from 'react';
import { Platform, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { passageMenuPosition } from './passageMenuPosition';
import type { SelectionPosition } from './selectionBridge.types';

type MenuEntry = { id: string; node: ReactNode; onClose: () => void };
type MenuHost = { show: (entry: MenuEntry) => void; remove: (id: string) => void };
const Context = createContext<MenuHost | null>(null);

export function SelectionMenuHost({ children }: { children: ReactNode }) {
  return Platform.OS === 'web' ? children : <NativeMenuHost>{children}</NativeMenuHost>;
}

function NativeMenuHost({ children }: { children: ReactNode }) {
  const [entry, setEntry] = useState<MenuEntry | null>(null);
  const root = useRef<View>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const host = useMemo<MenuHost>(() => ({
    show: setEntry,
    remove: id => setEntry(current => current?.id === id ? null : current),
  }), []);
  return <Context.Provider value={host}>
    <View ref={root} collapsable={false} style={styles.root}
      onTouchStart={() => entry?.onClose?.()}
      onLayout={() => root.current?.measureInWindow((x, y) => {
        if (root.current && Number.isFinite(x) && Number.isFinite(y)) setOrigin(current =>
          current.x === x && current.y === y ? current : { x, y });
      })}>
      {children}
      {entry && <View pointerEvents="box-none" style={[StyleSheet.absoluteFill,
        { top: -origin.y, left: -origin.x, zIndex: 100 }]}>{entry.node}</View>}
    </View>
  </Context.Provider>;
}

// 입력의 OS 선택 핸들이 계속 터치를 받도록 Modal 대신 같은 화면의 별도 층에 메뉴를 올린다.
export function NativeSelectionMenu({ anchor, onClose, children }: {
  anchor: SelectionPosition | null; onClose: () => void; children: ReactNode;
}) {
  const host = useContext(Context);
  const id = useId();
  const { colors } = useTheme();
  const { width, height, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [menuHeightDp, setMenuHeightDp] = useState(48);
  // Android의 기본 선택 도구가 손잡이와 함께 유지되므로 위아래에 별도 메뉴 공간을 남긴다.
  const nativeMenuGap = Platform.OS === 'android' && children ? 56 * Math.max(1, fontScale) : 0;
  const menuAnchor = anchor ? { ...anchor, y: anchor.y - nativeMenuGap, height: anchor.height + nativeMenuGap * 2 } : { x: 0, y: insets.top, width, height: 0 };
  const position = passageMenuPosition(menuAnchor,
    { width: Math.min(340, width - 16), height: menuHeightDp }, { width, height, ...insets });
  const visible = !anchor || anchor.y + anchor.height > insets.top && anchor.y < height - insets.bottom;
  // 바깥 터치는 호스트에서 닫고 메뉴 안 터치는 행동 버튼까지 전달한다.
  const node = useMemo(() => visible && children ? <ScrollView keyboardShouldPersistTaps="always"
    onTouchStart={event => event.stopPropagation()} onAccessibilityEscape={onClose}
    style={[styles.floating, position]} contentContainerStyle={{ backgroundColor: colors.popup, borderRadius: 8 }}>
    <View onLayout={event => setMenuHeightDp(event.nativeEvent.layout.height)}>
      {children}
    </View>
  </ScrollView> : null, [visible, position, colors.popup, children, onClose]);
  useLayoutEffect(() => { if (host) host.show({ id, node, onClose }); }, [host, id, node, onClose]);
  useLayoutEffect(() => () => host?.remove(id), [host, id]);
  return host ? null : node;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  floating: { position: 'absolute', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', borderRadius: 8 },
});
