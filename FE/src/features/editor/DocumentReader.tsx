import { useState } from 'react';
import { Image, Linking, Pressable, Text, View } from 'react-native';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import { editorOutput, safeLink, type EditorDocument } from './editorModel';
import type { EditorImageSource } from './imageSource';

export function DocumentReader({ document, images }: { document: EditorDocument; images: EditorImageSource }) {
  const { colors } = useTheme(); const navigation = useCommunityNavigation(); const [failedLink, setFailedLink] = useState<string | null>(null);
  const blocks = editorOutput(document).blocks;
  async function open(url: string) { const safe = safeLink(url); if (!safe) return; try { await Linking.openURL(safe); setFailedLink(null); } catch { setFailedLink(safe); } }
  return <View accessibilityLabel="작성 문서 본문">
    {blocks.map((block, index) => {
      if (block.type === 'image' && block.image) return <ReaderImage key={block.image.id} assetId={block.image.assetId} description={block.image.description} width={block.image.width} height={block.image.height} images={images} />;
      if (block.type === 'divider') return <Text key={index} style={{ textAlign: 'center', fontSize: 24, paddingVertical: 20, letterSpacing: 8, color: colors.secondaryText }}>· · ·</Text>;
      const heading = block.type === 'heading' || block.type === 'subheading';
      return <View key={index} style={{ marginVertical: 8, paddingLeft: block.type === 'quote' ? 20 : 0, borderLeftWidth: block.type === 'quote' ? 3 : 0, borderColor: colors.text, backgroundColor: block.type === 'code' ? colors.surface : undefined }}>
        <Text selectable role={heading ? 'heading' : undefined} style={{ fontFamily: heading ? fonts.sans : block.type === 'code' ? 'monospace' : fonts.serif, fontSize: block.type === 'heading' ? 28 : 18,
          lineHeight: block.type === 'heading' ? 36 : block.type === 'subheading' ? 24 : 30, fontWeight: block.type === 'heading' ? '700' : '400', color: block.type === 'subheading' ? colors.secondaryText : colors.text, textAlign: block.type === 'pullquote' ? 'center' : 'left', fontStyle: block.type === 'quote' || block.type === 'pullquote' ? 'italic' : 'normal' }}>
          {block.type === 'bullet' ? '• ' : block.type === 'numbered' ? `${index - blocks.slice(0, index).findLastIndex(item => item.type !== 'numbered')}. ` : ''}
          {block.content.map((part, partIndex) => {
            const link = part.formats.find(format => format.kind === 'link'); const mention = 'mention' in part ? part.mention : undefined;
            return <Text key={partIndex} role={mention || link ? 'link' : undefined} accessibilityLabel={mention ? `${part.text} @${mention.handle}` : undefined}
              onPress={mention ? () => navigation.openIdentity({ kind: 'writer', id: mention.id }) : link?.url ? () => { void open(link.url!); } : undefined}
              style={{ color: mention || link ? colors.green : colors.text, textDecorationLine: link ? 'underline' : 'none', fontWeight: part.formats.some(format => format.kind === 'bold') ? '700' : undefined, fontStyle: part.formats.some(format => format.kind === 'italic') ? 'italic' : undefined }}>{part.text}</Text>;
          })}
        </Text>
      </View>;
    })}
    {failedLink && <View><Text role="alert" style={{ color: colors.destructive }}>링크를 열지 못했어요.</Text><Pressable role="button" accessibilityLabel="본문 링크 다시 열기" onPress={() => { void open(failedLink); }} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable></View>}
  </View>;
}
function ReaderImage({ assetId, description, width, height, images }: { assetId: string; description: string; width: number; height: number; images: EditorImageSource }) {
  const { colors } = useTheme(); const [failed, setFailed] = useState(false); const [attempt, setAttempt] = useState(0);
  return failed ? <View><Text role="alert" style={{ color: colors.text }}>이미지를 표시하지 못했어요.</Text><Pressable role="button" accessibilityLabel={`${description} 다시 보기`} onPress={() => { setFailed(false); setAttempt(value => value + 1); }} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable></View> :
    <Image key={attempt} source={images.resolve(assetId)} accessibilityLabel={description} onError={() => setFailed(true)} style={{ width: '100%', height: 'auto', aspectRatio: width / height, marginVertical: 20, resizeMode: 'contain' }} />;
}
