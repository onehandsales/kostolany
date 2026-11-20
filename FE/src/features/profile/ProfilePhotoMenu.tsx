import { useEffect, useRef } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import type { ProfilePhotoOrigin } from './profilePhoto';

type ProfilePhotoMenuProps = { busy: boolean; error: string | null; onSelect: (origin: ProfilePhotoOrigin) => void; onClose: () => void };

export function ProfilePhotoMenu({ busy, error, onSelect, onClose }: ProfilePhotoMenuProps) {
  const styles = useThemeStyles(createStyles);
  const camera = useRef<View>(null);
  useEffect(() => { camera.current?.focus(); }, []);
  return <View style={styles.overlay}>
    <Pressable accessibilityLabel="사진 선택 메뉴 배경 닫기" role="button" style={StyleSheet.absoluteFill} onPress={onClose} />
    <View role="dialog" accessibilityLabel="프로필 사진 선택" accessibilityViewIsModal style={styles.menu}>
      <View style={styles.group}>
        <Text style={styles.title}>Where do you want to take picture from?</Text>
        {busy && <ActivityIndicator accessibilityLabel="프로필 사진 처리 중" style={styles.progress} />}
        {error && <Text role="alert" style={styles.error}>{error}</Text>}
        <Pressable ref={camera} role="button" accessibilityLabel="프로필 사진 카메라" onPress={() => onSelect('camera')} style={styles.row}><Text style={styles.action}>Camera</Text></Pressable>
        <Pressable role="button" accessibilityLabel="프로필 사진 라이브러리" onPress={() => onSelect('library')} style={styles.row}><Text style={styles.action}>Choose from library</Text></Pressable>
      </View>
      <Pressable role="button" accessibilityLabel="프로필 사진 선택 취소" style={[styles.group, styles.row]} onPress={onClose}><Text style={styles.action}>Cancel</Text></Pressable>
    </View>
  </View>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  overlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#00000033', justifyContent: 'flex-end', padding: 8, zIndex: 2 },
  menu: { gap: 8 },
  group: { backgroundColor: colors.surface, borderRadius: 14, overflow: 'hidden' },
  title: { padding: 14, color: colors.secondaryText, textAlign: 'center', fontFamily: fonts.sans, fontSize: 13, lineHeight: 20 },
  row: { minHeight: 56, padding: 12, alignItems: 'center', justifyContent: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  action: { color: '#007aff', fontFamily: fonts.sans, fontSize: 18, lineHeight: 24, textAlign: 'center' },
  progress: { marginBottom: 12 },
  error: { color: colors.destructive, padding: 16, fontSize: 14, lineHeight: 22 },
});
