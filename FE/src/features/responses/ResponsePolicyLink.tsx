import { Pressable, Text, View } from 'react-native';

import { useExternalLink } from '../../shared/links/useExternalLink';
import { useTheme } from '../../shared/theme/ThemeProvider';

// 정책 화면을 닫으면 링크 요청과 오류의 수명도 함께 끝낸다.
export function ResponsePolicyLink() {
  const { colors } = useTheme();
  const link = useExternalLink();
  return <View>
    <Pressable role="link" accessibilityLabel="현재 Medium Rules 열기"
      style={{ minHeight: 48, justifyContent: 'center' }}
      onPress={() => { void link.open('https://policy.medium.com/medium-rules-30e5502c4eb4'); }}>
      <Text style={{ fontSize: 14, lineHeight: 20, color: colors.green }}>Read the current Medium Rules</Text>
    </Pressable>
    {link.hasError && <Text role="alert" style={{ color: colors.destructive }}>
      링크를 열지 못했어요. 다시 눌러 주세요.
    </Text>}
  </View>;
}
