import { Platform, type TextStyle } from 'react-native';

// 원본 PNG를 393 논리 폭으로 비교한 근사값이며 공개되지 않은 원본 토큰을 뜻하지 않는다.
export const colors = {
  background: '#ffffff',
  text: '#242424',
  secondaryText: '#6b6b6b',
  border: '#e5e5e5',
  divider: '#f2f2f2',
  avatar: '#808080',
  surface: '#f8f8f8',
  input: '#f2f2f2',
  green: '#1a8917',
  saveGreen: '#41872c',
  gold: '#ffc017',
  destructive: '#c94a4a',
  section: '#fafafa',
  segment: '#eeeef0',
  selectedSurface: '#ffffff',
  highlight: '#e8f3e8',
  onAccent: '#ffffff',
  onInverse: '#ffffff',
  inverse: '#242424',
  popup: '#ffffff',
} as const;

export type ThemeColors = { [Key in keyof typeof colors]: string };

// 어두운 색은 F58 원본의 평면 영역을 기준으로 하며 글꼴 가장자리의 혼합색은 제외한다.
export const darkColors: ThemeColors = {
  background: '#121212', text: '#d2d2d2', secondaryText: '#a8a8a8',
  border: '#333333', divider: '#292929', avatar: '#808080',
  surface: '#191919', input: '#29292c', green: '#1a8917', saveGreen: '#41872c',
  gold: '#ffc017', destructive: '#f08080', section: '#191919',
  segment: '#29292c', selectedSurface: '#66666a', highlight: '#28472a',
  onAccent: '#ffffff', onInverse: '#121212', inverse: '#d2d2d2', popup: '#1c1c1d',
};

export const spacing = {
  small: 8,
  medium: 16,
  page: 24,
  section: 32,
} as const;

// 원본 글꼴 파일이 없어 플랫폼 시스템 산세리프와 본문 세리프를 대체 글꼴로 사용한다.
export const fonts = {
  wordmark: Platform.select({
    ios: 'TimesNewRomanPS-BoldMT',
    android: 'serif',
    default: '"Times New Roman", serif',
  }),
  sans: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
  }),
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, "Times New Roman", serif' }),
} as const;

export const typography = {
  pageTitle: { fontFamily: fonts.sans, fontSize: 24, lineHeight: 32, fontWeight: '600' },
  sectionTitle: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 26, fontWeight: '600' },
  body: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18 },
  storyTitle: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 25, fontWeight: '700', letterSpacing: -0.4 },
  storyBody: { fontFamily: fonts.serif, fontSize: 20, lineHeight: 30 },
} as const satisfies Record<string, TextStyle>;

export const sizes = {
  tabIcon: 24,
  minimumTouchTarget: 48,
  fieldSurfaceInset: 5,
  sheetRadius: 10,
} as const;
