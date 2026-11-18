import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, sizes, spacing, typography } from '../../shared/theme/tokens';
import { ContentStatus } from '../../shared/ui/ContentStatus';
import { previewExplanationSource } from './data/explanationPreview';
import {
  defaultExplanationLevel, explanationLevelLabels, explanationLevels,
  type ExplanationLevel, type ExplanationSource,
} from './explanationTypes';
import { useExplanation } from './useExplanation';

export function ExplanationSection({ articleId, source = previewExplanationSource }: {
  articleId: string; source?: ExplanationSource;
}) {
  const [level, setLevel] = useState<ExplanationLevel>(defaultExplanationLevel);
  return (
    <View style={styles.section}>
      <Text role="heading" style={styles.heading}>AI 해석</Text>
      <Text style={styles.note}>직접 작성한 해석 예시입니다. 실제 AI 생성 결과나 코스톨라니의 인용문이 아닙니다.</Text>
      <Text style={styles.label}>설명 수준</Text>
      <Text style={styles.note}>편하게 읽을 수 있는 수준을 선택하세요.</Text>
      <View role="radiogroup" accessibilityLabel="설명 수준" style={styles.choices}>
        {explanationLevels.map(option => (
          <Pressable key={option} role="radio" aria-checked={option === level}
            accessibilityLabel={explanationLevelLabels[option]} onPress={() => setLevel(option)}
            style={({ pressed }) => [styles.choice, option === level && styles.selected, pressed && styles.pressed]}>
            <Text style={[styles.choiceLabel, option === level && styles.selectedLabel]}>
              {option === level ? '✓ ' : ''}{explanationLevelLabels[option]}
            </Text>
          </Pressable>
        ))}
      </View>
      {/* Each selection has its own request lifetime, including A → B → A. */}
      <ExplanationContent key={`${articleId}:${level}`} articleId={articleId} level={level} source={source} />
    </View>
  );
}

function ExplanationContent({ articleId, level, source }: {
  articleId: string; level: ExplanationLevel; source: ExplanationSource;
}) {
  const { state, retry } = useExplanation(articleId, level, source);
  const label = explanationLevelLabels[level];
  return (
    <View accessibilityLabel="수준별 설명과 예시" style={styles.body}>
      <Text role="heading" accessibilityLiveRegion="polite" style={styles.label}>{label} 수준 설명</Text>
      {state.status === 'loading' && <ContentStatus loading message={`${label} 수준 설명을 불러오고 있어요`} />}
      {state.status === 'error' && <ContentStatus error message={`${label} 수준 설명을 불러오지 못했어요`}
        actionLabel="설명 다시 시도" onAction={retry} />}
      {state.status === 'ready' && <>
        {state.explanation.paragraphs.map((paragraph, index) => <Text key={index} selectable style={styles.paragraph}>{paragraph}</Text>)}
        <View style={styles.example}>
          <Text role="heading" style={styles.label}>이해를 돕는 예시</Text>
          <Text selectable style={styles.paragraph}>{state.explanation.example}</Text>
        </View>
        <Text style={styles.end}>끝까지 읽었습니다.</Text>
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.page, paddingTop: spacing.section, borderTopWidth: 1, borderTopColor: colors.border },
  heading: { ...typography.sectionTitle, color: colors.text },
  label: { ...typography.body, fontWeight: '600', color: colors.text },
  note: { ...typography.caption, color: colors.secondaryText },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.small },
  choice: { flexGrow: 1, flexBasis: '45%', minHeight: sizes.minimumTouchTarget,
    paddingHorizontal: spacing.medium, paddingVertical: spacing.small,
    borderWidth: 1, borderColor: colors.border, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  selected: { backgroundColor: colors.text, borderColor: colors.text },
  choiceLabel: { ...typography.body, color: colors.text, textAlign: 'center' },
  selectedLabel: { color: colors.background, fontWeight: '600' },
  pressed: { opacity: 0.65 },
  body: { gap: spacing.page },
  paragraph: { fontSize: 18, lineHeight: 31, color: colors.text },
  example: { gap: spacing.medium, borderLeftWidth: 2, borderLeftColor: colors.border, paddingLeft: spacing.medium },
  end: { ...typography.caption, color: colors.secondaryText, textAlign: 'center', paddingVertical: spacing.medium },
});
