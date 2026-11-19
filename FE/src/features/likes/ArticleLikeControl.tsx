import { useContext } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useThemeStyles, useTheme } from '../../shared/theme/ThemeProvider';
import { sizes, fonts, type ThemeColors } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { formatReactionCount, mediumArticles } from '../feed/data/mediumFixtures';
import { LoginRequestButton } from '../auth/LoginRequestButton';
import { LikeStoreContext } from './LikeProvider';
import { useArticleLike } from './useArticleLike';

type ArticleLikeControlProps = {
  articleId: string;
  articleTitle: string;
  compact?: boolean;
  iconSize?: number;
};

export function ArticleLikeControl(props: ArticleLikeControlProps) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const store = useContext(LikeStoreContext);
  if (store) return <SignedInLikeControl {...props} />;
  return (
    <LoginRequestButton
      context={{ kind: 'like', articleId: props.articleId }}
      label={`좋아요, ${props.articleTitle}, 로그인 필요`}
      style={[styles.button, props.compact && styles.compactButton]}
    >
      {props.compact ? (
        <>
          <AppIcon name="clap" size={props.iconSize ?? 16} color={colors.secondaryText} filled={(props.iconSize ?? 16) <= 16} />
          <Text style={[styles.compactCount, (props.iconSize ?? 16) > 20 && styles.toolbarCount]}>
            {formatReactionCount(
              mediumArticles.find((article) => article.id === props.articleId)?.reference?.applause ?? 0,
            )}
          </Text>
        </>
      ) : (
        <>
          <HeartIcon selected={false} />
          <Text style={styles.status}>좋아요</Text>
        </>
      )}
    </LoginRequestButton>
  );
}

function SignedInLikeControl({
  articleId,
  articleTitle,
  compact = false,
  iconSize = 16,
}: ArticleLikeControlProps) {
  const styles = useThemeStyles(createStyles);
  const { colors } = useTheme();
  const { state, toggleLike, retryLike } = useArticleLike(articleId);
  const disabled = state.status !== 'ready';
  const busy = state.isPending || state.isRefreshing || state.status === 'loading';
  const selection = state.isLiked ? '선택됨' : '선택 안 됨';
  const statusText = state.isPending
    ? '반영 중'
    : state.isRefreshing
      ? '불러오는 중'
      : state.isLiked
        ? '좋아요 취소'
        : '좋아요';
  const label = `좋아요, ${articleTitle}, ${state.count === null ? '수치 미확인' : `${state.count}개`}, ${selection}${busy ? ', 처리 중' : ''}`;
  const accessibilityProps =
    Platform.OS === 'web'
      ? {
          role: 'button' as const,
          'aria-pressed': state.isLiked,
          'aria-busy': busy,
          'aria-disabled': disabled,
        }
      : {
          accessibilityRole: 'togglebutton' as const,
          accessibilityState: { checked: state.isLiked, busy, disabled },
        };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable
          {...accessibilityProps}
          accessibilityLabel={label}
          accessibilityHint={state.isLiked ? '누르면 좋아요 선택을 해제합니다' : '누르면 좋아요를 선택합니다'}
          disabled={disabled}
          onPress={toggleLike}
          style={({ pressed }) => [styles.button, compact && styles.compactButton, pressed && styles.pressed, disabled && styles.disabled]}
        >
          {compact ? (
            <AppIcon
              name="clap"
              size={iconSize}
              filled={iconSize <= 16}
              color={state.isLiked ? colors.green : colors.secondaryText}
            />
          ) : (
            <HeartIcon selected={state.isLiked} />
          )}
          <Text style={compact ? [styles.compactCount, iconSize > 20 && styles.toolbarCount] : styles.count}>
            {state.count === null ? '—' : compact ? formatReactionCount(state.count) : state.count}
          </Text>
        </Pressable>
        {!compact && (
          <Text aria-live="polite" style={styles.status}>
            {statusText}
          </Text>
        )}
      </View>
      {state.error && (
        <View style={styles.failure}>
          <Text role="alert" style={styles.message}>
            {state.error === 'write'
              ? '좋아요 변경을 반영하지 못해 이전 상태로 돌아왔어요.'
              : '좋아요 정보를 불러오지 못했어요.'}
          </Text>
          <Pressable
            role="button"
            accessibilityLabel={`좋아요 ${state.error === 'write' ? '변경' : '조회'} 다시 시도, ${articleTitle}`}
            onPress={retryLike}
            style={({ pressed }) => [styles.retry, pressed && styles.pressed]}
          >
            <Text style={styles.retryLabel}>다시 시도</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function HeartIcon({ selected }: { selected: boolean }) {
  const { colors } = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      aria-hidden
      accessible={Platform.OS === 'web' ? undefined : false}
    >
      <Path
        d="M12 21 3.5 12.7C-2 7.3 5.7.2 12 6.5 18.3.2 26 7.3 20.5 12.7Z"
        fill={selected ? colors.text : 'none'}
        stroke={colors.text}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: { gap: 4 },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', columnGap: 16 },
  button: {
    minHeight: sizes.minimumTouchTarget,
    minWidth: sizes.minimumTouchTarget,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  count: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.text },
  compactButton: { gap: 2, paddingHorizontal: 0 },
  compactCount: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, color: colors.secondaryText },
  toolbarCount: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20, color: colors.text },
  status: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.secondaryText, flexShrink: 1, paddingVertical: 4 },
  pressed: { opacity: 0.6 },
  disabled: { opacity: 0.5 },
  failure: { gap: 4 },
  message: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.text },
  retry: {
    minHeight: sizes.minimumTouchTarget,
    minWidth: sizes.minimumTouchTarget,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  retryLabel: { color: colors.text, fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, textDecorationLine: 'underline' },
});
