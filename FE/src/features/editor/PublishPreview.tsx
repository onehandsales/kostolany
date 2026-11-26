import { useState, useSyncExternalStore } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { ToggleSwitch } from '../../shared/ui/ToggleSwitch';
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
  const [collapsed, setCollapsed] = useState(false);
  const [previousStage, setPreviousStage] = useState(stage);
  const snapshot = useSyncExternalStore(session.subscribe, session.getSnapshot, session.getSnapshot);
  // 하위 선택 화면에서 돌아오면 새 미리보기의 제목 상태를 초기화한다.
  if (previousStage !== stage) {
    setPreviousStage(stage);
    setCollapsed(false);
  }
  const { document } = snapshot.value; const options = snapshot.publishing;
  const locked = snapshot.publishStatus === 'pending' || snapshot.publishStatus === 'uncertain';
  const eligible = Boolean(document.title.trim() && (document.body.replace(/\uFFFC/gu, '').trim() || document.images.length));
  if (stage === 'topics') return <PublishTopics selected={options.topicIds} onCancel={() => onStage('preview')} onSave={ids => { session.configure({ ...options, topicIds: ids }); onStage('preview'); }} />;
  if (stage === 'publication') return <PublicationPicker selected={options.publicationId} onCancel={() => onStage('preview')} onSave={publicationId => { session.configure({ ...options, publicationId }); onStage('preview'); }} />;
  const row = (label: string, value: string, action: () => void, chips?: string[]) => <Pressable role="button" accessibilityLabel={label} disabled={locked} accessibilityState={{ disabled: locked }} onPress={action} style={{ minHeight: 128, justifyContent: 'center', borderBottomWidth: 1, borderColor: colors.border, gap: 12 }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={{ color: colors.text, fontSize: 22, fontWeight: '600' }}>{label}</Text><Text style={{ color: colors.text }}>›</Text></View>{chips?.length ? <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{chips.map((name, index) => <View key={options.topicIds[index]} style={{ borderRadius: 24, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: colors.input }}><Text style={{ color: colors.text, fontSize: 16 }}>{name}</Text></View>)}</View> : <Text style={{ color: colors.secondaryText, fontSize: 13 }}>{value}</Text>}</Pressable>;
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <View style={{ minHeight: 48, flexDirection: 'row', alignItems: 'center', backgroundColor: stage === 'preview' ? colors.surface : colors.background }}>
      <IconButton icon="close" label="발행 미리보기 닫기" disabled={locked} onPress={stage === 'body' ? () => onStage('preview') : onEdit} />
      {stage === 'body' && <Text role="heading" style={{ fontSize: 20, fontWeight: '600', color: colors.text }}>Story content</Text>}
      {stage === 'preview' && collapsed && <><Text role="heading" style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: colors.text }}>Story preview</Text><View style={{ width: 48 }} /></>}
    </View>
    <ScrollView onScroll={event => setCollapsed(event.nativeEvent.contentOffset.y > 100)} scrollEventThrottle={32} contentContainerStyle={{ padding: 24, paddingTop: 16, gap: 0 }}>
      {stage === 'body' ? <><Text style={{ fontSize: 32, fontWeight: '700', color: colors.text }}>{document.title}</Text><DocumentReader document={document} images={images} /></> : <>
        <View style={{ marginHorizontal: -24, marginTop: -16, padding: 24, paddingTop: 16, gap: 16, backgroundColor: colors.surface }}>
        <Text role="heading" style={{ fontSize: 30, fontWeight: '700', color: colors.text }}>Story preview</Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: colors.text }}>This is how your story will be shown to readers in public places, like Medium’s homepage and subscribers’ inboxes.</Text>
        <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 4, padding: 20, gap: 12, marginTop: 8, backgroundColor: colors.background }}>
          <Text style={{ color: colors.text, fontSize: 12, lineHeight: 18 }}>{authorName}</Text>
          <View style={{ flexDirection: 'row', gap: 24 }}><View style={{ flex: 1, gap: 8 }}><Text style={{ fontSize: 16, lineHeight: 20, fontWeight: '700', color: colors.text }}>{document.title || 'Untitled story'}</Text><Text style={{ color: colors.text, fontSize: 13, lineHeight: 20 }}>{document.body.replace(/\uFFFC/gu, '').trim()}</Text></View>
            {document.images[0] && <Image accessibilityLabel={document.images[0].description} source={images.resolve(document.images[0].assetId)} style={{ width: 80, height: 54, resizeMode: 'cover' }} />}</View>
          <Pressable role="button" accessibilityLabel="발행 미리보기 Edit" disabled={locked} onPress={onEdit} style={{ minHeight: 48, minWidth: 48, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: colors.green }}>Edit</Text></Pressable>
        </View>
        </View>
        {row('Topics', 'No topics added', () => onStage('topics'), options.topicIds.map(id => topics.data?.topics.find(topic => topic.id === id)?.name ?? '선택한 토픽'))}
        {row('Publication', mockPublications.find(item => item.id === options.publicationId)?.name ?? 'No publication selected', () => onStage('publication'))}
        <View style={{ paddingTop: 24, paddingBottom: 16, gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 48 }}><Text style={{ fontSize: 22, fontWeight: '600', color: colors.text }}>Unlisted</Text><View style={{ minHeight: 48, minWidth: 48, justifyContent: 'center' }}><ToggleSwitch label="Unlisted" value={options.unlisted} disabled={locked} onChange={unlisted => session.configure({ ...options, unlisted })} /></View></View>
          <Text style={{ fontSize: 13, lineHeight: 20, color: colors.secondaryText }}>When a story is published as unlisted, it is only visible to those with the link. It won’t be listed on Medium’s public pages (your profile, homepage, etc.).</Text>
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
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}><IconButton icon="back" label="Publication 선택 취소" onPress={onCancel} style={{ alignSelf: 'flex-start' }} />
    <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}><Text role="heading" style={{ fontSize: 26, color: colors.text }}>Publication</Text>
      <Text style={{ color: colors.secondaryText, lineHeight: 24 }}>모의 편집 권한이 있는 publication을 선택해 바로 발행해요. 실제 원고 제출·심사 기능은 연결하지 않아요.</Text>
      {[{ id: null, name: 'No publication' }, ...mockPublications].map(item => <Pressable key={item.id ?? 'none'} role="radio" accessibilityLabel={item.name} accessibilityState={{ checked: id === item.id }} aria-checked={id === item.id} onPress={() => setId(item.id)} style={{ minHeight: 56, justifyContent: 'center' }}><Text style={{ color: colors.text }}>{item.name}{id === item.id ? '　✓' : ''}</Text></Pressable>)}
    </ScrollView><Pressable role="button" accessibilityLabel="Publication 선택 저장" onPress={() => onSave(id)} style={{ minHeight: 48, margin: 24, justifyContent: 'center', alignItems: 'center', borderRadius: 24, backgroundColor: colors.text }}><Text style={{ color: colors.background }}>Select</Text></Pressable></SafeAreaView>;
}
