import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { authStyles as createStyles } from './authStyles';
import { LoginRequestButton } from './LoginRequestButton';

export function AccountScreen() {
  const styles = useThemeStyles(createStyles);
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <ScrollView contentContainerStyle={styles.page}>
      <Text role="heading" style={styles.title}>프로필</Text>
      <Text style={styles.secondary}>모의 로그인 · 실제 Google 계정과 연결되지 않아요.</Text>
      <View style={{ gap: 24 }}>
        <Text style={styles.text}>로그인하지 않은 상태예요.</Text>
        <Text style={styles.secondary}>기사는 자유롭게 읽고, 로그인하면 박수와 저장 목록을 사용할 수 있어요.</Text>
        <LoginRequestButton context={{ kind: 'profile' }} label="모의 로그인 시작" style={styles.button}>
          <Text style={styles.buttonText}>로그인</Text>
        </LoginRequestButton>
      </View>
    </ScrollView>
  </SafeAreaView>;
}

export function LibraryLoginScreen() {
  const styles = useThemeStyles(createStyles);
  return <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
    <ScrollView contentContainerStyle={styles.page}>
      <Text role="heading" style={styles.title}>라이브러리</Text>
      <Text style={styles.text}>내 읽기 목록을 만나보세요.</Text>
      <Text style={styles.secondary}>로그인하면 다시 읽고 싶은 기사를 나만의 목록에 모을 수 있어요.</Text>
      <LoginRequestButton context={{ kind: 'library' }} label="라이브러리 모의 로그인" style={styles.button}>
        <Text style={styles.buttonText}>로그인</Text>
      </LoginRequestButton>
      <Text style={styles.secondary}>예시 독자만 사용하는 모의 로그인입니다.</Text>
    </ScrollView>
  </SafeAreaView>;
}
