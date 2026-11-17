import type { TextStyle } from 'react-native';

// Values chosen for this app from the reference's visual hierarchy, not Medium source tokens.
export const colors = {
  background: '#ffffff',
  text: '#242424',
  secondaryText: '#6b6b6b',
  border: '#e5e5e5',
  avatar: '#808080',
} as const;

export const spacing = {
  small: 8,
  medium: 16,
  page: 24,
  section: 32,
} as const;

export const typography = {
  pageTitle: { fontSize: 28, lineHeight: 36, fontWeight: '700' },
  sectionTitle: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 26 },
} as const satisfies Record<string, TextStyle>;

export const sizes = {
  tabIcon: 24,
  minimumTouchTarget: 48,
} as const;
