import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';

type PassageMenuProps = {
  selected: boolean; pending: boolean; error: boolean; more: boolean; style?: StyleProp<ViewStyle>;
  copying: boolean; copyError: boolean; onCopy: () => void;
  onSave: (retry?: boolean) => void; onRespond: () => void; onShare: () => void; onMore: () => void;
};

// 본문 안 선택과 기존 선택 화면이 같은 행동·실패·터치 영역 계약을 사용한다.
export function PassageMenu({ selected: isSelected, pending: isPending, error: hasError, more: isExpanded, copying: isCopying, copyError: hasCopyError, style, onCopy, onSave, onRespond, onShare, onMore }: PassageMenuProps) {
  const { colors } = useTheme();
  return <View accessibilityLabel="문구 선택 메뉴" style={[styles.menu, { backgroundColor: colors.popup }, style]}>
    <View style={styles.row}>
      {[
        { label: 'Copy passage', text: 'Copy', press: onCopy },
        { label: isSelected ? 'Remove highlight' : 'Highlight', text: isSelected ? 'Remove highlight' : 'Highlight', press: () => onSave() },
        { label: 'Respond to passage', text: 'Respond', press: onRespond },
        { label: 'Share passage', text: 'Share', press: onShare },
        { label: '문구 선택 더보기', text: '•••', press: onMore },
      ].map(action => <Pressable key={action.label} role="button" accessibilityLabel={action.label} disabled={isPending || isCopying}
        accessibilityState={{ disabled: isPending || isCopying, busy: isPending || isCopying }} style={[styles.action, styles.slot]} onPress={action.press}>
        <Text style={[styles.label, { color: colors.text }]}>{action.text}</Text>
      </Pressable>)}
    </View>
    {isPending && <Text style={[styles.message, { color: colors.secondaryText }]}>Saving…</Text>}
    {isCopying && <Text style={[styles.message, { color: colors.secondaryText }]}>Copying…</Text>}
    {hasCopyError && <Text role="alert" style={[styles.message, { color: colors.destructive }]}>Couldn’t copy. Tap Copy to try again.</Text>}
    {hasError && <Pressable role="button" accessibilityLabel="하이라이트 저장 다시 시도" style={styles.action} onPress={() => onSave(true)}>
      <Text role="alert" style={{ color: colors.destructive }}>저장하지 못했어요. 다시 시도</Text>
    </Pressable>}
    {isExpanded && <Text style={[styles.message, { color: colors.secondaryText }]}>선택 메뉴의 추가 항목은 보관된 화면에서 확인되지 않았어요.</Text>}
  </View>;
}

const styles = StyleSheet.create({
  menu: { borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.18)', paddingHorizontal: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch' },
  action: { minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6 },
  slot: { width: '20%' },
  label: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, textAlign: 'center' },
  message: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, padding: 12 },
});
