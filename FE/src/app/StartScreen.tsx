import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function StartScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.introduction}>
          <Text role="heading" style={styles.title}>
            Kostolany
          </Text>
          <Text style={styles.subtitle}>경제의 흐름을 읽다.</Text>
          <Text style={styles.description}>
            금융 뉴스를 더 쉽게 이해하는 시간.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  introduction: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    gap: 16,
  },
  title: {
    color: '#242424',
    fontSize: 40,
    fontWeight: '700',
  },
  subtitle: {
    color: '#242424',
    fontSize: 24,
    fontWeight: '600',
  },
  description: {
    color: '#6b6b6b',
    fontSize: 17,
    lineHeight: 28,
  },
});
