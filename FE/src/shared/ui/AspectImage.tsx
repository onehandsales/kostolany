import { Image, StyleSheet, View, type ImageProps, type StyleProp, type ViewStyle } from 'react-native';

type AspectImageProps = Pick<ImageProps, 'source' | 'accessibilityLabel' | 'accessible' | 'resizeMode'> & {
  aspectRatio: number;
  style?: StyleProp<ViewStyle>;
};

// 원본 파일의 픽셀 높이가 웹 레이아웃을 덮지 않도록 실제 부모 폭에서 이미지 영역을 계산한다.
export function AspectImage({ aspectRatio, style, ...imageProps }: AspectImageProps) {
  return <View style={[{ width: '100%', aspectRatio }, style]}>
    <Image {...imageProps} style={styles.image} />
  </View>;
}

const styles = StyleSheet.create({ image: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' } });
