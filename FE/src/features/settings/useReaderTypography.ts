import { fonts } from '../../shared/theme/tokens';
import { useDisplaySettings } from './DisplaySettingsProvider';

export function useReaderTypography() {
  const { state } = useDisplaySettings();
  const scale = state.settings.fontScale / 100;
  return {
    title: { fontSize: 32 * scale, lineHeight: 38 * scale },
    subtitle: { fontSize: 18 * scale, lineHeight: 26 * scale },
    body: { fontSize: 20 * scale, lineHeight: 30 * scale, fontFamily: state.settings.fontFamily === 'sans' ? fonts.sans : fonts.serif },
    showHighlights: state.settings.showHighlights,
  };
}
