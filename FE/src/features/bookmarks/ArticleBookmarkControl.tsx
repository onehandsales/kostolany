import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, sizes } from '../../shared/theme/tokens';
import { BookmarkIcon } from './BookmarkIcon';
import { SaveToListSheet } from './SaveToListSheet';
import { useArticleBookmark, useBookmarkStore } from './useBookmarks';

export function ArticleBookmarkControl({ articleId, articleTitle }: { articleId: string; articleTitle: string }) {
  const { state, toggleBookmark, retryBookmark } = useArticleBookmark(articleId);
  const store = useBookmarkStore();
  const [selecting, setSelecting] = useState(false);
  const disabled = state.status !== 'ready';
  const busy = state.isPending || state.status === 'loading';
  const label = `북마크, ${articleTitle}, ${state.status === 'ready'
    ? state.isSaved ? '저장됨' : '저장 안 됨' : '저장 여부 미확인'}${busy ? ', 처리 중' : ''}`;
  const accessibilityProps = Platform.OS === 'web'
    ? { role: 'button' as const, 'aria-pressed': state.isSaved, 'aria-busy': busy, 'aria-disabled': disabled }
    : { accessibilityRole: 'togglebutton' as const, accessibilityState: { checked: state.isSaved, busy, disabled } };

  return <View style={styles.container}>
    <View style={styles.controls}>
    <Pressable {...accessibilityProps} accessibilityLabel={label}
      accessibilityHint={store.hasCustomMembership(articleId) ? '누르면 저장할 목록을 변경합니다'
        : state.isSaved ? '누르면 읽기 목록에서 해제합니다' : '누르면 읽기 목록에 저장합니다'}
      disabled={disabled} onPress={() => {
        if (store.hasCustomMembership(articleId)) setSelecting(true); else toggleBookmark();
      }}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}>
      <BookmarkIcon saved={state.isSaved} />
      <Text aria-live="polite" style={styles.status}>{state.isPending ? '반영 중'
        : state.status === 'loading' ? '불러오는 중' : state.isSaved ? '저장됨' : '저장'}</Text>
    </Pressable>
    <Pressable role="button" accessibilityLabel={`저장할 목록 선택, ${articleTitle}`} onPress={() => setSelecting(true)}
      style={styles.more}><Text aria-hidden style={styles.moreText}>⋯</Text></Pressable>
    </View>
    {state.error && <View style={styles.failure}>
      <Text role="alert" style={styles.message}>{state.error === 'write'
        ? '저장 변경을 반영하지 못해 이전 상태로 돌아왔어요.' : '저장 정보를 불러오지 못했어요.'}</Text>
      <Pressable role="button" accessibilityLabel={`북마크 ${state.error === 'write' ? '변경' : '조회'} 다시 시도, ${articleTitle}`}
        onPress={retryBookmark} style={styles.retry}>
        <Text style={styles.retryLabel}>다시 시도</Text>
      </Pressable>
    </View>}
    {selecting && <SaveToListSheet articleId={articleId} articleTitle={articleTitle} onClose={() => setSelecting(false)} />}
  </View>;
}

const styles = StyleSheet.create({
  container: { gap: 4, flexShrink: 1 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  more: { minHeight: sizes.minimumTouchTarget, width: sizes.minimumTouchTarget,
    alignItems: 'center', justifyContent: 'center' },
  moreText: { fontSize: 24, lineHeight: 28, color: colors.secondaryText },
  button: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget,
    paddingVertical: 8, paddingHorizontal: 4, flexDirection: 'row', alignItems: 'center', gap: 8,
    alignSelf: 'flex-start', flexShrink: 1 },
  status: { fontSize: 13, lineHeight: 20, color: colors.secondaryText, flexShrink: 1 },
  pressed: { opacity: 0.6 },
  disabled: { opacity: 0.5 },
  failure: { gap: 4 },
  message: { fontSize: 14, lineHeight: 22, color: colors.text },
  retry: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget,
    alignSelf: 'flex-start', justifyContent: 'center', paddingHorizontal: 8 },
  retryLabel: { fontSize: 14, lineHeight: 22, color: colors.text, textDecorationLine: 'underline' },
});
