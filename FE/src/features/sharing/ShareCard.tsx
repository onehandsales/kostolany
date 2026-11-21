import { useId, useState, type RefObject } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, Ellipse, RadialGradient, Rect, Stop } from 'react-native-svg';
import { fonts } from '../../shared/theme/tokens';
import type { ShareTarget } from './types';

export const sharePalettes = [
  ['#adcac7', '#436043', '#e5bc45'],
  ['#d5c5e8', '#4e456e', '#ad83ba'],
  ['#eed3b7', '#ba6b48', '#f2d569'],
  ['#c7d7e8', '#284a7b', '#78bbce'],
  ['#d8e1c4', '#64844c', '#b6ce6b'],
  ['#e7c9d3', '#9a536e', '#eaa982'],
  ['#e2dfd6', '#77746b', '#c1bba9'],
  ['#d5ece8', '#478e85', '#a8d9ba'],
  ['#ecdfbf', '#9f8439', '#d9a361'],
  ['#d7d3eb', '#6155a1', '#b2c6ee'],
] as const;

export function ShareCard({
  target,
  styleIndex,
  width,
  cardRef,
  onReady,
}: {
  target: ShareTarget;
  styleIndex: number;
  width: number;
  cardRef: RefObject<View | null>;
  onReady: (ready: boolean) => void;
}) {
  const gradient = useId();
  const palette = sharePalettes[styleIndex] ?? sharePalettes[0];
  const [imageFailed, setImageFailed] = useState(false);
  const scale = width / 339;
  const authorLabel = target.authorName || target.title;
  return (
    <View
      ref={cardRef}
      accessibilityLabel="공유 이미지 카드"
      collapsable={false}
      onLayout={(event) => {
        if (!target.avatar || imageFailed) onReady(event.nativeEvent.layout.height > 0);
      }}
      style={[styles.card, { minHeight: 529 * scale, paddingTop: 104 * scale, paddingBottom: 104 * scale }]}
    >
      <Svg
        width="100%"
        height="100%"
        style={StyleSheet.absoluteFill}
        preserveAspectRatio="none"
        viewBox="0 0 339 529"
        aria-hidden
      >
        <Defs>
          <RadialGradient id={`${gradient}-dark`}>
            <Stop offset="0" stopColor={palette[1]} />
            <Stop offset="1" stopColor={palette[0]} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={`${gradient}-gold`}>
            <Stop offset="0" stopColor={palette[2]} />
            <Stop offset="1" stopColor={palette[2]} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width={339} height={529} fill={palette[0]} />
        <Ellipse cx={280} cy={110} rx={200} ry={230} fill={`url(#${gradient}-dark)`} />
        <Ellipse cx={30} cy={370} rx={250} ry={260} fill={`url(#${gradient}-dark)`} />
        <Ellipse cx={320} cy={490} rx={320} ry={290} fill={`url(#${gradient}-gold)`} />
      </Svg>
      <View style={styles.paper}>
        <Text style={styles.reading}>
          {target.kind === 'quote'
            ? 'A passage worth sharing'
            : target.readingMinutes
              ? `${target.readingMinutes} min read`
              : target.kind === 'article' || target.kind === 'written'
                ? 'Story'
                : target.kind === 'list'
                  ? 'Reading list'
                  : target.kind === 'topic'
                    ? 'Topic'
                    : 'Profile'}
        </Text>
        <View style={styles.body}>
          <View style={styles.copy}>
            <Text style={[styles.title, target.kind === 'quote' && styles.quote]}>
              {target.kind === 'quote' ? `“${target.quote}”` : target.title}
            </Text>
            <Text style={styles.subtitle}>{target.kind === 'quote' ? target.title : target.subtitle}</Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.addressText}>kostolany.invalid</Text>
          </View>
        </View>
        <View style={styles.author}>
          {target.avatar && !imageFailed ? (
            <Image
              source={target.avatar}
              accessibilityLabel="공유 카드 작성자 사진"
              style={styles.avatar}
              accessibilityIgnoresInvertColors
              onLoad={() => onReady(true)}
              onError={() => {
                setImageFailed(true);
                onReady(true);
              }}
            />
          ) : (
            <View style={[styles.avatar, styles.initial]}>
              <Text style={styles.initialText}>{authorLabel.slice(0, 1)}</Text>
            </View>
          )}
          <Text style={styles.authorName}>{authorLabel}</Text>
          <Text style={styles.logo}>Medium</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { width: '100%', borderRadius: 5, overflow: 'hidden', paddingHorizontal: 10 },
  paper: { borderRadius: 9, backgroundColor: '#fff', overflow: 'hidden' },
  reading: {
    fontFamily: fonts.sans,
    fontSize: 11,
    lineHeight: 16,
    color: '#777',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  body: {
    flexDirection: 'row',
    minHeight: 222,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#242424',
  },
  copy: { flex: 1, paddingHorizontal: 20, paddingTop: 44, paddingBottom: 35 },
  title: { fontFamily: fonts.sans, fontSize: 28, lineHeight: 36, fontWeight: '700', color: '#191919' },
  quote: { fontSize: 22, lineHeight: 30 },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: '#191919',
    marginTop: 17,
  },
  address: {
    width: 32,
    borderLeftWidth: 1,
    borderColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressText: {
    position: 'absolute',
    width: 180,
    textAlign: 'center',
    transform: [{ rotate: '90deg' }],
    fontSize: 13,
    fontFamily: fonts.sans,
    color: '#191919',
  },
  author: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  avatar: { width: 28, height: 28, borderRadius: 14 },
  initial: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#ddd' },
  initialText: { fontSize: 14, color: '#444' },
  authorName: { flex: 1, fontFamily: fonts.sans, fontSize: 13, color: '#191919' },
  logo: { fontFamily: fonts.wordmark, fontWeight: '700', fontSize: 17, color: '#191919' },
});
