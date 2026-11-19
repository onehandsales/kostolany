import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, sizes, fonts } from '../../shared/theme/tokens';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import type { ReadingListSnapshot } from './types';

type ReadingListFeedbackProps = {
  state: ReadingListSnapshot; onRetry: () => void; onRetryBookmark: (articleId: string) => void;
  showSavedFailures?: boolean;
};

export function ReadingListFeedback({ state, onRetry, onRetryBookmark, showSavedFailures = true }: ReadingListFeedbackProps) {
  return <View>
    {state.isRefreshing && <ContentStatus message="읽기 목록을 불러오고 있어요" loading />}
    {state.hasReadError && <ContentStatus message="읽기 목록을 불러오지 못했어요" error
      actionLabel="읽기 목록 다시 시도" onAction={onRetry} />}
    {state.failures.filter((failure) => showSavedFailures || !state.articles.some((article) => article.id === failure.articleId))
      .map((failure) => <View key={failure.articleId} style={styles.failure}>
      <Text role="alert" style={styles.text}>{failure.title} — {failure.saved ? '저장' : '저장 해제'}하지 못했어요.</Text>
      <Pressable role="button" accessibilityLabel={`목록에서 북마크 변경 다시 시도, ${failure.title}`}
        onPress={() => onRetryBookmark(failure.articleId)} style={styles.retry}>
        <Text style={styles.retryText}>다시 시도</Text>
      </Pressable>
    </View>)}
  </View>;
}

const styles = StyleSheet.create({
  failure: { marginHorizontal: 24, marginVertical: 8, padding: 16, backgroundColor: '#f7f7f7' },
  text: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.text },
  retry: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget,
    alignSelf: 'flex-start', justifyContent: 'center' },
  retryText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 22, color: colors.text, textDecorationLine: 'underline' },
});
