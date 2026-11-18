import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colors, sizes, spacing, typography } from '../../../shared/theme/tokens';
import { type FeedSort, feedSortLabels } from '../types';

const sortOrder: FeedSort[] = ['latest', 'popular', 'recommended'];

export function FeedSortTabs({ selected, onSelect }: {
  selected: FeedSort;
  onSelect: (sort: FeedSort) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}
      contentContainerStyle={styles.tabs} role="tablist" accessibilityLabel="피드 정렬">
      {sortOrder.map((sort) => (
        <Pressable key={sort} role="tab" aria-label={feedSortLabels[sort]}
          aria-selected={selected === sort} onPress={() => onSelect(sort)}
          style={[styles.tab, selected === sort && styles.selected]}>
          <Text style={[styles.label, selected === sort && styles.selectedLabel]}>{feedSortLabels[sort]}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 0, flexShrink: 0, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  tabs: { paddingHorizontal: spacing.page, gap: spacing.section },
  tab: { minHeight: sizes.minimumTouchTarget, minWidth: sizes.minimumTouchTarget,
    justifyContent: 'center', alignItems: 'center', paddingVertical: spacing.small, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  selected: { borderBottomColor: colors.text },
  label: { ...typography.body, color: colors.secondaryText },
  selectedLabel: { color: colors.text, fontWeight: '600' },
});
