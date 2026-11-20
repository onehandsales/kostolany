import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStyles } from '../../shared/theme/ThemeProvider';
import { fonts, type ThemeColors } from '../../shared/theme/tokens';
import { FormTextInput } from '../../shared/ui/FormTextInput';
import type { EditorImageSource, ImageAsset, ImageOrigin, ImagePermission } from './imageSource';

type Result = { source: EditorImageSource; origin: ImageOrigin; query: string; attempt: number } & (
  { status: 'ready'; assets: ImageAsset[]; permission: ImagePermission } | { status: 'error' });
export function ImagePickerSheet({ source, onClose, onSelect }: {
  source: EditorImageSource; onClose: () => void; onSelect: (asset: ImageAsset, origin: ImageOrigin) => void;
}) {
  const styles = useThemeStyles(createStyles);
  const [origin, setOrigin] = useState<ImageOrigin | null>(null);
  const [query, setQuery] = useState(''); const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const current = result?.source === source && result.origin === origin && result.query === query && result.attempt === attempt ? result : null;
  useEffect(() => {
    if (!origin) return;
    const abort = new AbortController();
    const timer = setTimeout(() => {
      void (async () => {
        try {
          const permission = origin === 'unsplash' ? 'granted' : await source.requestAccess(origin, abort.signal);
          const assets = permission === 'granted' || permission === 'limited' ? await source.search(query, abort.signal) : [];
          if (!abort.signal.aborted) setResult({ source, origin, query, attempt, status: 'ready', assets, permission });
        } catch { if (!abort.signal.aborted) setResult({ source, origin, query, attempt, status: 'error' }); }
      })();
    }, query ? 180 : 0);
    return () => { clearTimeout(timer); abort.abort(); };
  }, [source, origin, query, attempt]);
  const action = (label: string, text: string, onPress: () => void) => <Pressable role="button" accessibilityLabel={label} onPress={onPress} style={styles.action}><Text style={styles.blue}>{text}</Text></Pressable>;
  return <Modal transparent animationType="none" onRequestClose={onClose}>
    <SafeAreaView style={styles.backdrop} accessibilityViewIsModal>
      {!origin ? <View role="dialog" accessibilityLabel="이미지 추가" style={styles.menu}>
        <View style={styles.menuGroup}>
          {action('사진 촬영 선택', 'Take photo', () => setOrigin('camera'))}
          {action('사진 라이브러리 선택', 'Choose from library', () => setOrigin('library'))}
          {action('Unsplash 사진 검색', 'Search photos on Unsplash', () => setOrigin('unsplash'))}
        </View>
        <View style={styles.menuGroup}>{action('이미지 선택 취소', 'Cancel', onClose)}</View>
      </View> : <View role="dialog" accessibilityLabel="사진 선택" style={styles.sheet}>
        <View style={styles.header}>
          {action('이미지 선택 취소', 'Cancel', onClose)}
          <Text role="heading" style={styles.title}>{origin === 'unsplash' ? 'Unsplash' : origin === 'camera' ? 'Camera' : 'Library'}</Text>
          {action('이미지 소스 변경', 'Back', () => { setOrigin(null); setQuery(''); })}
        </View>
        <Text style={styles.note}>로컬 예시 이미지{origin !== 'unsplash' ? ' · 모의 선택기' : ''}</Text>
        {origin === 'unsplash' && <FormTextInput accessibilityLabel="사진 검색" value={query} onChangeText={setQuery}
          placeholder="Search photos" style={styles.search} autoCapitalize="none" returnKeyType="search" />}
        {!current && <ActivityIndicator accessibilityLabel="사진 불러오는 중" style={styles.space} />}
        {current?.status === 'error' && <View style={styles.space}><Text role="alert" style={styles.text}>사진을 불러오지 못했어요.</Text>{action('사진 다시 시도', 'Try again', () => setAttempt(value => value + 1))}</View>}
        {current?.status === 'ready' && <>
          {current.permission === 'limited' && <Text style={styles.note}>선택한 사진만 접근할 수 있어요.</Text>}
          {current.permission === 'denied' && <View style={styles.space}><Text role="alert" style={styles.text}>사진 접근이 허용되지 않았어요.</Text>{action('사진 권한 다시 확인', 'Try again', () => setAttempt(value => value + 1))}</View>}
          {current.permission === 'cancelled' && <Text style={styles.note}>사진 선택을 취소했어요.</Text>}
          <FlatList data={current.assets} numColumns={2} keyExtractor={item => item.assetId} keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.grid} columnWrapperStyle={styles.row}
            ListEmptyComponent={current.permission === 'granted' || current.permission === 'limited' ? <Text style={styles.note}>일치하는 사진이 없어요.</Text> : null}
            renderItem={({ item }) => <Pressable role="button" accessibilityLabel={`${item.description} 삽입`} style={styles.photo} onPress={() => onSelect(item, origin)}>
              <Image source={source.resolve(item.assetId)} accessibilityLabel={item.description} style={[styles.image, { aspectRatio: item.width / item.height }]} />
              <Text style={styles.credit}>{item.credit}</Text>
            </Pressable>} />
        </>}
      </View>}
    </SafeAreaView>
  </Modal>;
}
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000033' },
  menu: { padding: 8, gap: 8 }, menuGroup: { backgroundColor: colors.background, borderRadius: 12, overflow: 'hidden' },
  action: { minWidth: 48, minHeight: 56, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  blue: { color: colors.background === '#ffffff' ? '#007aff' : '#64aaff', fontFamily: fonts.sans, fontSize: 17 }, sheet: { height: '99%', backgroundColor: colors.background, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, title: { color: colors.text, fontFamily: fonts.sans, fontWeight: '700', fontSize: 18 },
  note: { color: colors.secondaryText, fontFamily: fonts.sans, fontSize: 13, marginHorizontal: 16, marginVertical: 8 },
  search: { minHeight: 48, borderRadius: 12, backgroundColor: colors.surface, color: colors.text, padding: 12, margin: 16 },
  grid: { padding: 16, paddingBottom: 32 }, row: { gap: 16, alignItems: 'flex-start' }, photo: { flex: 1, minHeight: 48, marginBottom: 16 },
  image: { width: '100%', height: 'auto', resizeMode: 'cover' }, credit: { position: 'absolute', left: 0, right: 0, bottom: 0, color: '#fff', backgroundColor: '#00000088', padding: 8, fontFamily: fonts.sans, fontSize: 12 },
  space: { padding: 24 }, text: { color: colors.text, fontSize: 16 },
});
