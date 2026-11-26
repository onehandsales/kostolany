import { useState } from 'react';
import { Image, Platform, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { RichBody, type RichBodyProps } from './RichBody';
import { editorSections, mergeEditorSection, removeImage, sliceEditor, type EditorImage } from './editorModel';
import type { EditorImageSource } from './imageSource';

export function RichDocumentBody(props: RichBodyProps & { source: EditorImageSource; continuous?: boolean }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  if (props.continuous && Platform.OS !== 'web') return <ContinuousImageBody {...props} />;
  const sections = editorSections(props.value.document);
  return <View>{sections.map((section, index) => {
    const image = section.image;
    if (!image) return <TextSection key={section.key} {...props} start={section.start} end={section.end}
      label={index === 0 ? '글 본문' : `이미지 뒤 본문 ${Math.ceil(index / 2)}`}
      onFocus={() => { setSelectedImage(null); props.onFocus(); }} />;
    const selected = selectedImage === image.id;
    return <View key={section.key} style={{ marginVertical: 24 }}>
      <DocumentImage image={image} source={props.source} selected={selected}
        onSelect={() => setSelectedImage(selected ? null : image.id)} onFailure={() => setSelectedImage(image.id)}
        onDelete={() => { props.onChange(removeImage(props.value, image.id)); setSelectedImage(null); }} />
    </View>;
  })}</View>;
}

function ContinuousImageBody(props: RichBodyProps & { source: EditorImageSource }) {
  const window = useWindowDimensions(); const [width, setWidth] = useState(Math.max(1, window.width - 36));
  const imageUris: Record<string, string> = {};
  for (const image of props.value.document.images) {
    const source = props.source.resolve(image.assetId);
    const uri = source && Image.resolveAssetSource(source)?.uri;
    if (uri) imageUris[image.id] = uri;
  }
  return <View onLayout={event => { if (event.nativeEvent.layout.width > 0) setWidth(event.nativeEvent.layout.width); }}>
    <RichBody {...props} imageUris={imageUris} imageWidth={width} label="글 본문" />
  </View>;
}

function DocumentImage({ image, source, selected, onSelect, onFailure, onDelete }: { image: EditorImage; source: EditorImageSource; selected: boolean; onSelect: () => void; onFailure: () => void; onDelete: () => void }) {
  const { colors } = useTheme(); const [failed, setFailed] = useState(false); const [attempt, setAttempt] = useState(0);
  const remove = <Pressable role="button" accessibilityLabel={`${image.description} 이미지 삭제`} onPress={onDelete}
    style={[!failed && { position: 'absolute', top: 0, right: 0 }, { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.green }]}>
    <Text style={{ color: '#fff', fontSize: 24 }}>×</Text>
  </Pressable>;
  if (failed) return <View style={{ padding: 16 }}>
    <Text role="alert" style={{ color: colors.text }}>이미지를 표시하지 못했어요.</Text>
    <Pressable role="button" accessibilityLabel={`${image.description} 표시 다시 시도`} onPress={event => {
      event.stopPropagation(); onFailure(); setFailed(false); setAttempt(value => value + 1);
    }} style={{ minWidth: 48, minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>Try again</Text></Pressable>
    {remove}
  </View>;
  return <><Pressable role="button" accessibilityLabel={`${image.description} 이미지 선택`} accessibilityState={{ selected }}
    onPress={onSelect} style={{ borderWidth: selected ? 3 : 0, borderColor: colors.green, minHeight: 48 }}>
    <Image key={attempt} accessibilityLabel={image.description} source={source.resolve(image.assetId)} onError={() => { setFailed(true); onFailure(); }}
      style={{ width: '100%', height: 'auto', aspectRatio: image.width / image.height, resizeMode: 'contain' }} />
  </Pressable>{selected && remove}</>;
}

function TextSection({ start, end, ...props }: RichBodyProps & { start: number; end: number }) {
  const document = props.value.document;
  const local = sliceEditor(props.value, start, end);
  const isActive = props.value.selection.start >= start && props.value.selection.start <= end;
  return <RichBody {...props} value={local} isActive={isActive}
    minHeight={document.images.length ? 30 : 300}
    onChange={next => props.onChange(mergeEditorSection(props.value, start, end, next))}
    onSelect={selection => props.onSelect({ start: selection.start + start, end: selection.end + start })} />;
}
