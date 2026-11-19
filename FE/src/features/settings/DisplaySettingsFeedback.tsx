import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { useDisplaySettings } from './DisplaySettingsProvider';

export function DisplaySettingsFeedback() {
  const { state, store } = useDisplaySettings();
  const styles = useThemeStyles(createStyles);
  if (state.readStatus === 'loading' || state.isSaving) return <Text accessibilityLiveRegion="polite" style={styles.status}>
    {state.isSaving ? '표시 설정 저장 중…' : '표시 설정을 불러오는 중…'}
  </Text>;
  if (state.readStatus !== 'error' && !state.hasSaveError) return null;
  return <View style={styles.box}>
    <Text role="alert" style={styles.error}>{state.hasSaveError ? '표시 설정을 저장하지 못했어요. 선택은 유지돼요.' : '표시 설정을 불러오지 못했어요.'}</Text>
    <Pressable role="button" accessibilityLabel="표시 설정 다시 시도" onPress={() => { if (state.hasSaveError) store?.retry(); else void store?.reload(); }} style={styles.button}>
      <Text style={styles.text}>다시 시도</Text>
    </Pressable>
  </View>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  box: { paddingHorizontal: 16 }, error: { color: colors.destructive, fontFamily: fonts.sans, fontSize: 14, lineHeight: 20 },
  status: { color: colors.secondaryText, fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, paddingHorizontal: 16 },
  button: { minHeight: 48, minWidth: 48, justifyContent: 'center' }, text: { color: colors.text, fontFamily: fonts.sans, fontSize: 14 },
});
