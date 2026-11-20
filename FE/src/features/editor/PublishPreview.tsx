import { useState, useSyncExternalStore } from 'react';
import { Image, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { IconButton } from '../../shared/ui/IconButton';
import { useTopics } from '../topics/TopicProvider';
import type { DraftSession } from './createDraftSession';
import type { EditorImageSource } from './imageSource';
import { DocumentReader } from './DocumentReader';
import { PublishTopics } from './PublishTopics';
import { mockPublications } from './publishing';

export type PublishStage = 'preview' | 'topics' | 'publication' | 'body';
export function PublishPreview({ session, images, authorName, stage, onStage, onEdit, onPublished }: {
  session: DraftSession; images: EditorImageSource; authorName: string; stage: PublishStage;
  onStage: (stage: PublishStage) => void; onEdit: () => void; onPublished: () => void;
}) {
  const { colors } = useTheme(); const { state: topics } = useTopics();
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot, session.getSnapshot);
  const { document } = snapshot.value; const options = snapshot.publishing;
  const locked = snapshot.publishStatus === 'pending' || snapshot.publishStatus === 'uncertain';
  const eligible = Boolean(document.title.trim() && (document.body.replace(/\uFFFC/gu, '').trim() || document.images.length));
  if (stage === 'topics') return <PublishTopics selected={options.topicIds} onCancel={() => onStage('preview')} onSave={ids => { session.configure({ ...options, topicIds: ids }); onStage('preview'); }} />;
  if (stage === 'publication') return <PublicationPicker selected={options.publicationId} onCancel={() => onStage('preview')} onSave={publicationId => { session.configure({ ...options, publicationId }); onStage('preview'); }} />;
  const row = (label: string, value: string, action: () => void) => <Pressable role="button" accessibilityLabel={label} disabled={locked} accessibilityState={{ disabled: locked }} onPress={action} style={{ minHeight: 100, justifyContent: 'center', borderTopWidth: 1, borderColor: colors.border, gap: 12 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ color: colors.text, fontSize: 22, fontWeight: '600' }}>{label}</Text><Text style={{ color: colors.text }}>›</Text></View><Text style={{ color: colors.secondaryText, fontSize: 16 }}>{value}</Text></Pressable>;
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <View style={{ minHeight: 56, flexDirection: 'row', alignItems: 'center' }}>
      <IconButton icon="close" label="발행 미리보기 닫기" disabled={locked} onPress={stage === 'body' ? () => onStage('preview') : onEdit} />
      {stage === 'body' && <Text role="heading" style={{ fontSize: 20, fontWeight: '600', color: colors.text }}>Story content</Text>}
    </View>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 20 }}>
      {stage === 'body' ? <><Text style={{ fontSize: 32, fontWeight: '700', color: colors.text }}>{document.title}</Text><DocumentReader document={document} images={images} /></> : <>
        <Text role="heading" style={{ fontSize: 30, fontWeight: '700', color: colors.text }}>Story preview</Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: colors.text }}>How your story will be shown to readers in public places, like Medium’s homepage and subscribers’ inboxes</Text>
        <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 16, gap: 16 }}>
          <Text style={{ color: colors.text }}>{authorName}</Text>
          <View style={{ flexDirection: 'row', gap: 16 }}><View style={{ flex: 1, gap: 8 }}><Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>{document.title || 'Untitled story'}</Text><Text style={{ color: colors.text, fontSize: 14, lineHeight: 20 }}>{document.body.replace(/\uFFFC/gu, '').trim()}</Text></View>
            {document.images[0] && <Image accessibilityLabel={document.images[0].description} source={images.resolve(document.images[0].assetId)} style={{ width: 80, height: 54, resizeMode: 'cover' }} />}</View>
          <Pressable role="button" accessibilityLabel="발행 미리보기 Edit" disabled={locked} onPress={onEdit} style={{ minHeight: 48, minWidth: 48, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: colors.green }}>Edit</Text></Pressable>
        </View>
        {row('Topics', options.topicIds.map(id => topics.data?.topics.find(topic => topic.id === id)?.name ?? '선택한 토픽').join(', ') || 'No topics added', () => onStage('topics'))}
        {row('Publication', mockPublications.find(item => item.id === options.publicationId)?.name ?? 'No publication selected', () => onStage('publication'))}
        <View style={{ borderTopWidth: 1, borderColor: colors.border, paddingTop: 24, gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 48 }}><Text style={{ fontSize: 16, color: colors.text }}>Unlisted</Text><View style={{ minHeight: 48, minWidth: 48, justifyContent: 'center' }}><Switch accessibilityLabel="Unlisted" value={options.unlisted} disabled={locked} onValueChange={unlisted => session.configure({ ...options, unlisted })} /></View></View>
          <Text style={{ fontSize: 16, lineHeight: 24, color: colors.secondaryText }}>Anyone with a link can read this story. It will not appear on public pages, such as your profile or the Medium homepage.</Text>
        </View>
        <Pressable role="button" accessibilityLabel="작성 본문 전체 미리보기" disabled={locked} onPress={() => onStage('body')} style={{ minHeight: 48, justifyContent: 'center' }}><Text style={{ color: colors.green }}>본문 전체 미리보기</Text></Pressable>
        <Text style={{ color: colors.secondaryText, lineHeight: 21 }}>이 앱 안의 모의 발행입니다. 외부 게시나 링크 발급은 하지 않아요.</Text>
        {!eligible && <Text style={{ color: colors.secondaryText }}>제목과 본문 또는 이미지를 입력해 주세요.</Text>}
        {snapshot.publishStatus === 'error' && <Text role="alert" style={{ color: colors.destructive }}>발행하지 못했어요. 문서와 선택은 유지됐어요.</Text>}
        {snapshot.publishStatus === 'uncertain' && <Text role="alert" style={{ color: colors.destructive }}>발행 결과를 확인하지 못했어요. 같은 요청으로 결과를 확인해 주세요.</Text>}
      </>}
    </ScrollView>
    {stage !== 'body' && <Pressable role="button" accessibilityLabel={snapshot.publishStatus === 'error' || snapshot.publishStatus === 'uncertain' ? '발행 다시 시도' : 'Publish now'}
      disabled={!eligible || snapshot.publishStatus === 'pending'} accessibilityState={{ disabled: !eligible || snapshot.publishStatus === 'pending' }}
      onPress={() => { void session.publish(authorName).then(story => { if (story) onPublished(); }); }} style={{ minHeight: 48, borderRadius: 24, backgroundColor: colors.text, margin: 24, justifyContent: 'center', alignItems: 'center', opacity: eligible ? 1 : 0.5 }}>
      <Text style={{ color: colors.onInverse }}>{snapshot.publishStatus === 'pending' ? 'Publishing…' : snapshot.publishStatus === 'uncertain' ? 'Check publish result' : 'Publish now'}</Text>
    </Pressable>}
  </SafeAreaView>;
}
function PublicationPicker({ selected, onSave, onCancel }: { selected: string | null; onSave: (id: string | null) => void; onCancel: () => void }) {
  const { colors } = useTheme(); const [id, setId] = useState(selected);
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}><IconButton icon="back" label="Publication 선택 취소" onPress={onCancel} />
    <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}><Text role="heading" style={{ fontSize: 26, color: colors.text }}>Publication</Text>
      <Text style={{ color: colors.secondaryText, lineHeight: 24 }}>모의 편집 권한이 있는 publication을 선택해 바로 발행해요. 실제 원고 제출·심사 기능은 연결하지 않아요.</Text>
      {[{ id: null, name: 'No publication' }, ...mockPublications].map(item => <Pressable key={item.id ?? 'none'} role="radio" accessibilityLabel={item.name} accessibilityState={{ checked: id === item.id }} aria-checked={id === item.id} onPress={() => setId(item.id)} style={{ minHeight: 56, justifyContent: 'center' }}><Text style={{ color: colors.text }}>{item.name}{id === item.id ? '　✓' : ''}</Text></Pressable>)}
    </ScrollView><Pressable role="button" accessibilityLabel="Publication 선택 저장" onPress={() => onSave(id)} style={{ minHeight: 48, margin: 24, justifyContent: 'center', alignItems: 'center', borderRadius: 24, backgroundColor: colors.text }}><Text style={{ color: colors.background }}>Select</Text></Pressable></SafeAreaView>;
}
