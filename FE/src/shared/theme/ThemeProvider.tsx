import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { colors, darkColors, type ThemeColors } from './tokens';

export type ThemeMode = 'system' | 'light' | 'dark';
type ThemeValue = { colors: ThemeColors; scheme: 'light' | 'dark' };
const ThemeContext = createContext<ThemeValue>({ colors, scheme: 'light' });
type ThemeProviderProps = { mode: ThemeMode; children: ReactNode };

export function ThemeProvider({ mode, children }: ThemeProviderProps) {
  const system = useColorScheme();
  const scheme = mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;
  const value = useMemo<ThemeValue>(() => ({ scheme, colors: scheme === 'dark' ? darkColors : colors }), [scheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue { return useContext(ThemeContext); }

export function useThemeStyles<T>(createStyles: (palette: ThemeColors) => T): T {
  const { colors: palette } = useTheme();
  return useMemo(() => createStyles(palette), [createStyles, palette]);
}
