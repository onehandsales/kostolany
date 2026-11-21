import { Pressable, Text, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { AppIcon } from '../../shared/ui/AppIcon';
import { useExternalLink } from '../../shared/links/useExternalLink';

import { useTheme } from '../../shared/theme/ThemeProvider';

export function safeWebsite(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && Boolean(url.hostname)
      ? url.href
      : null;
  } catch {
    return null;
  }
}
type WebsiteProps = {
  url: string;
  label?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  chevron?: boolean;
};
export function SafeWebsiteLink(props: WebsiteProps) {
  return <WebsiteContent key={props.url} {...props} />;
}
function WebsiteContent({ url, label = 'Author website', text, textStyle, style, chevron }: WebsiteProps) {
  const { colors } = useTheme();
  const link = useExternalLink();
  const href = safeWebsite(url);
  return (
    <Pressable
      role="link"
      accessibilityLabel={label}
      style={[{ minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 20 }, style]}
      onPress={() => { void link.open(href); }}
    >
      <Text style={[{ fontSize: 14, lineHeight: 20, color: colors.green, flex: 1 }, textStyle]}>
        {link.hasError ? 'Couldn’t open this website. Retry' : (text ?? url)}
      </Text>
      {chevron && <AppIcon name="chevron" size={14} />}
    </Pressable>
  );
}
