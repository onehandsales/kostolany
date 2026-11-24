import { useEffect, useState, type ReactNode } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

// 시작 시간은 원본에서 알 수 없으므로 앱 첫 배치와 자산 준비 뒤 다음 프레임에 전환한다.
export function StartupBoundary({ children }: { children: ReactNode }) {
  const [layoutReady, setLayoutReady] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const hold = __DEV__ && Platform.OS === 'web' && typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).get('parityStart') === 'hold';
  useEffect(() => {
    if (!layoutReady || !imageReady || hold) return;
    const frame = requestAnimationFrame(() => setVisible(false));
    return () => cancelAnimationFrame(frame);
  }, [layoutReady, imageReady, hold]);
  return <View style={styles.container}>
    <View testID="startup-content" style={styles.container} aria-hidden={visible} pointerEvents={visible ? 'none' : 'auto'}
      {...(Platform.OS === 'web' ? { inert: visible } : {})}
      onLayout={() => setLayoutReady(true)}>{children}</View>
    {visible && <View accessibilityLabel="브랜드 시작 화면" style={styles.overlay}>
      <Image source={require('../../../assets/start-wordmark.png')} accessibilityLabel="Medium"
        resizeMode="contain" onLoadEnd={() => setImageReady(true)} style={styles.wordmark} />
    </View>}
  </View>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' },
  wordmark: { width: '80%', aspectRatio: 4 },
});
