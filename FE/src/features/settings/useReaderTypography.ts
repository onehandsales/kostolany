import { fonts } from '../../shared/theme/tokens';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { useDisplaySettings } from './DisplaySettingsProvider';

export function useReaderTypography(baseBodyFontSize = 20) {
  const { state } = useDisplaySettings();
  const { colors, scheme } = useTheme();
  const scale = state.settings.fontScale / 100;
  return {
    // 원본 다크 기사의 제목 흰색과 부제의 주요 픽셀색을 구분한다.
    title: { fontSize: 32 * scale, lineHeight: 38 * scale, color: scheme === 'dark' ? colors.onAccent : colors.text },
    subtitle: { fontSize: 18 * scale, lineHeight: 26 * scale, color: scheme === 'dark' ? '#e6e7e6' : colors.secondaryText },
    body: { fontSize: baseBodyFontSize * scale, lineHeight: 30 * scale, fontFamily: state.settings.fontFamily === 'sans' ? fonts.sans : fonts.serif },
    showHighlights: state.settings.showHighlights,
  };
}
