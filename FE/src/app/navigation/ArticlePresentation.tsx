import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';

import { ReaderTheme } from '../../features/settings/DisplaySettingsProvider';
import { useTheme } from '../../shared/theme/ThemeProvider';

type ArticlePresentationProps = { children: ReactNode };

export function ArticlePresentation({ children }: ArticlePresentationProps) {
  return <ReaderTheme><ReaderStatusBar />{children}</ReaderTheme>;
}
function ReaderStatusBar() {
  const focused = useIsFocused();
  const { scheme } = useTheme();
  return focused ? <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} /> : null;
}
