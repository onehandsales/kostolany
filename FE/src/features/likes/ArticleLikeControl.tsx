import { useContext } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, sizes } from '../../shared/theme/tokens';
import { LoginRequestButton } from '../auth/LoginRequestButton';
import { LikeStoreContext } from './LikeProvider';
import { useArticleLike } from './useArticleLike';

type ArticleLikeControlProps = { articleId: string; articleTitle: string };

export function ArticleLikeControl(props: ArticleLikeControlProps) {
  const store = useContext(LikeStoreContext);
  if (store) return <SignedInLikeControl {...props} />;
  return <LoginRequestButton context={{ kind: 'like', articleId: props.articleId }}
    label={`좋아요, ${props.articleTitle}, 로그인 필요`} style={styles.button}>
    <HeartIcon selected={false} /><Text style={styles.status}>좋아요</Text>
  </LoginRequestButton>;
}

function SignedInLikeControl({ articleId, articleTitle }: ArticleLikeControlProps) {
  const { state, toggleLike, retryLike } = useArticleLike(articleId);
  const disabled = state.status !== 'ready';
  const busy = state.isPending || state.isRefreshing || state.status === 'loading';
  const selection = state.isLiked ? '선택됨' : '선택 안 됨';
  const statusText = state.isPending ? '반영 중' : state.isRefreshing ? '불러오는 중' : state.isLiked ? '좋아요 취소' : '좋아요';
  const label = `좋아요, ${articleTitle}, ${state.count === null ? '수치 미확인' : `${state.count}개`}, ${selection}${busy ? ', 처리 중' : ''}`;
  const accessibilityProps = Platform.OS === 'web'
    ? { role: 'button' as const, 'aria-pressed': state.isLiked, 'aria-busy': busy, 'aria-disabled': disabled }
    : { accessibilityRole: 'togglebutton' as const, accessibilityState: { checked: state.isLiked, busy, disabled } };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable {...accessibilityProps} accessibilityLabel={label}
          accessibilityHint={state.isLiked ? '누르면 좋아요 선택을 해제합니다' : '누르면 좋아요를 선택합니다'}
          disabled={disabled} onPress={toggleLike}
          style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}>
          <HeartIcon selected={state.isLiked} />
          <Text style={styles.count}>{state.count ?? '—'}</Text>
        </Pressable>
        <Text aria-live="polite" style={styles.status}>{statusText}</Text>
      </View>
      {state.error && <View style={styles.failure}>
        <Text role="alert" style={styles.message}>{state.error === 'write'
          ? '좋아요 변경을 반영하지 못해 이전 상태로 돌아왔어요.' : '좋아요 정보를 불러오지 못했어요.'}</Text>
        <Pressable role="button" accessibilityLabel={`좋아요 ${state.error === 'write' ? '변경' : '조회'} 다시 시도, ${articleTitle}`}
          onPress={retryLike} style={({ pressed }) => [styles.retry, pressed && styles.pressed]}>
          <Text style={styles.retryLabel}>다시 시도</Text>
        </Pressable>
      </View>}
    </View>
  );
}

function HeartIcon({ selected }: { selected: boolean }) {
  return <Svg width={24} height={24} viewBox="0 0 24 24" aria-hidden accessible={Platform.OS === 'web' ? undefined : false}>
    <Path d="M12 21 3.5 12.7C-2 7.3 5.7.2 12 6.5 18.3.2 26 7.3 20.5 12.7Z"
      fill={selected ? colors.text : 'none'} stroke={colors.text} strokeWidth={1.5} strokeLinejoin="round" />
  </Svg>;
}

const styles = StyleSheet.create({
  container: { gap: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 16 },
  button: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget, paddingVertical: 8,
    flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4 },
  count: { fontSize: 14, lineHeight: 22, color: colors.text },
  status: { fontSize: 13, lineHeight: 20, color: colors.secondaryText, flexShrink: 1, paddingVertical: 4 },
  pressed: { opacity: 0.6 },
  disabled: { opacity: 0.5 },
  failure: { gap: 4 },
  message: { fontSize: 14, lineHeight: 22, color: colors.text },
  retry: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget, alignSelf: 'flex-start',
    justifyContent: 'center', paddingHorizontal: 8 },
  retryLabel: { color: colors.text, fontSize: 14, lineHeight: 22, textDecorationLine: 'underline' },
});
