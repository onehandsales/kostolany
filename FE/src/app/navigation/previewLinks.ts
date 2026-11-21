import { Linking } from 'react-native';

export type PreviewDestination =
  | { kind: 'article' | 'writer' | 'publication' | 'topic' | 'list' | 'written'; id: string }
  | { kind: 'tab'; tab: 'Home' | 'Explore' | 'Library' | 'Profile' }
  | { kind: 'invalid' };
export type PreviewLinkSource = {
  initial: () => Promise<string | null>;
  subscribe: (onLink: (url: string) => void) => () => void;
};
export const previewLinkSource: PreviewLinkSource = {
  initial: () => Linking.getInitialURL(),
  subscribe: (onLink) => {
    const subscription = Linking.addEventListener('url', (event) => onLink(event.url));
    return () => subscription.remove();
  },
};

export function parsePreviewLink(input: string, depth = 0): PreviewDestination | null {
  if (input.length > 4096 || depth > 1) return { kind: 'invalid' };
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }
  if ((url.hostname === 'localhost' || url.hostname === '127.0.0.1') && url.searchParams.has('previewLink')) {
    return parsePreviewLink(url.searchParams.get('previewLink') ?? '', depth + 1) ?? { kind: 'invalid' };
  }
  const custom = url.protocol === 'kostolany:';
  if (!custom && !(url.protocol === 'https:' && url.hostname === 'kostolany.invalid')) return null;
  if (url.username || url.password || url.port) return { kind: 'invalid' };
  let parts: string[];
  try {
    parts = `${custom ? `/${url.hostname}` : ''}${url.pathname}`.split('/').slice(1).map(decodeURIComponent);
  } catch {
    return { kind: 'invalid' };
  }
  const [kind, id] = parts;
  if (parts.length !== 2 || !id?.trim() || id.length > 200 || /[\u0000-\u0020/\\]/u.test(id))
    return { kind: 'invalid' };
  if (kind === 'tab' && (id === 'Home' || id === 'Explore' || id === 'Library' || id === 'Profile'))
    return { kind: 'tab', tab: id };
  if (
    kind === 'article' ||
    kind === 'writer' ||
    kind === 'publication' ||
    kind === 'topic' ||
    kind === 'list' ||
    kind === 'written'
  )
    return { kind, id };
  return { kind: 'invalid' };
}
