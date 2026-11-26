import { useState } from 'react';
import { Image, Pressable, Text, View, type TextStyle } from 'react-native';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { useCommunityNavigation } from '../community/CommunityNavigation';
import type { EditorDocument } from './editorModel';
import type { EditorImageSource } from './imageSource';
import { useReaderTypography } from '../settings/useReaderTypography';
import { PassageReader, type PassageTextRenderer } from '../highlights/PassageReader';
import type { PassageTextAction } from '../highlights/HighlightedText';
import type { SelectionDocument } from '../highlights/selectionDocument';
import { documentReaderBlocks } from './publishedSelection';
import { useDocumentLink } from './useDocumentLink';

type DocumentReaderProps = {
  document: EditorDocument; images: EditorImageSource; active?: boolean; reading?: boolean;
  passages?: { document: SelectionDocument; authorId: string; visibility: 'public' | 'unlisted'; highlightId?: string;
    onRevealBlock?: (index: number) => void };
  onBlockLayout?: (index: number, y: number) => void;
};

export function DocumentReader({ document, images, active = true, reading = false, passages, onBlockLayout }: DocumentReaderProps) {
  const { colors } = useTheme(); const navigation = useCommunityNavigation();
  const typography = useReaderTypography(18);
  const { open, failedLink } = useDocumentLink(document, images, active);
  const scale = reading ? typography.body.fontSize / 18 : 1;
  const blocks = documentReaderBlocks(document);
  function renderBlocks(renderText?: PassageTextRenderer) {
    return blocks.map((block, index) => {
      if (block.type === 'image' && block.image) return <ReaderImage key={block.image.id} assetId={block.image.assetId} description={block.image.description} width={block.image.width} height={block.image.height} images={images} />;
      if (block.type === 'divider') return <Text key={index} style={{ textAlign: 'center', fontSize: 24, paddingVertical: 20, letterSpacing: 8, color: colors.secondaryText }}>· · ·</Text>;
      const heading = block.type === 'heading' || block.type === 'subheading';
      const style: TextStyle = { fontFamily: heading ? fonts.sans : block.type === 'code' ? 'monospace' : reading ? typography.body.fontFamily : fonts.serif,
        fontSize: (block.type === 'heading' ? 28 : 18) * scale,
        lineHeight: (block.type === 'heading' ? 36 : block.type === 'subheading' ? 24 : 30) * scale,
        fontWeight: block.type === 'heading' ? '700' : '400', color: block.type === 'subheading' ? colors.secondaryText : colors.text,
        textAlign: block.type === 'pullquote' ? 'center' : 'left', fontStyle: block.type === 'quote' || block.type === 'pullquote' ? 'italic' : 'normal' };
      const actions: PassageTextAction[] = [];
      let actionOffset = block.prefix.length;
      for (const part of block.content) {
        const start = actionOffset; actionOffset += part.text.length;
        const mention = 'mention' in part ? part.mention : undefined;
        const url = part.formats.find(format => format.kind === 'link')?.url;
        if (mention) actions.push({ start, end: actionOffset, label: `${part.text} @${mention.handle}`,
          onPress: () => navigation.openIdentity({ kind: 'writer', id: mention.id }) });
        else if (url) actions.push({ start, end: actionOffset, label: part.text, onPress: () => { void open(url); } });
      }
      function renderContent(start: number, end: number, interactive: boolean) {
        let offset = block.prefix.length;
        return <>{block.prefix.slice(start, end)}{block.content.map((part, partIndex) => {
            const partStart = offset; offset += part.text.length;
            const text = part.text.slice(Math.max(0, start - partStart), Math.min(part.text.length, end - partStart));
            if (end <= partStart || start >= offset || !text) return null;
            const link = part.formats.find(format => format.kind === 'link'); const mention = 'mention' in part ? part.mention : undefined;
            return <Text key={partIndex} role={interactive && (mention || link) ? 'link' : undefined} accessibilityLabel={interactive && mention ? `${text} @${mention.handle}` : undefined}
              onPress={!interactive ? undefined : mention ? () => navigation.openIdentity({ kind: 'writer', id: mention.id }) : link?.url ? () => { void open(link.url!); } : undefined}
              style={{ color: mention || link ? colors.green : colors.text, textDecorationLine: link ? 'underline' : 'none', fontWeight: part.formats.some(format => format.kind === 'bold') ? '700' : undefined, fontStyle: part.formats.some(format => format.kind === 'italic') ? 'italic' : undefined }}>{text}</Text>;
          })}</>;
      }
      return <View key={index} onLayout={event => onBlockLayout?.(index, event.nativeEvent.layout.y)}
        style={{ marginVertical: 8, paddingLeft: block.type === 'quote' ? 20 : 0, borderLeftWidth: block.type === 'quote' ? 3 : 0, borderColor: colors.text, backgroundColor: block.type === 'code' ? colors.surface : undefined }}>
        {renderText ? renderText(index, style, undefined, { role: heading ? 'heading' : undefined, renderContent, actions })
          : <Text selectable role={heading ? 'heading' : undefined} style={style}>{renderContent(0, block.text.length, true)}</Text>}
      </View>;
    });
  }
  return <View accessibilityLabel="작성 문서 본문">
    {passages ? <PassageReader {...passages} active={active}>{renderBlocks}</PassageReader> : renderBlocks()}
    {failedLink && <View><Text role="alert" style={{ color: colors.destructive }}>링크를 열지 못했어요.</Text><Pressable role="button" accessibilityLabel="본문 링크 다시 열기" onPress={() => { void open(failedLink); }} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable></View>}
  </View>;
}
function ReaderImage({ assetId, description, width, height, images }: { assetId: string; description: string; width: number; height: number; images: EditorImageSource }) {
  const { colors } = useTheme(); const [failed, setFailed] = useState(false); const [attempt, setAttempt] = useState(0);
  return failed ? <View><Text role="alert" style={{ color: colors.text }}>이미지를 표시하지 못했어요.</Text><Pressable role="button" accessibilityLabel={`${description} 다시 보기`} onPress={() => { setFailed(false); setAttempt(value => value + 1); }} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable></View> :
    <Image key={attempt} source={images.resolve(assetId)} accessibilityLabel={description} onError={() => setFailed(true)} style={{ width: '100%', height: 'auto', aspectRatio: width / height, marginVertical: 20, resizeMode: 'contain' }} />;
}
