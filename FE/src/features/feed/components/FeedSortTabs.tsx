import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, sizes, spacing, typography, fonts } from '../../../shared/theme/tokens';
import { IconButton } from '../../../shared/ui/IconButton';
import { ReferenceNotice } from '../../../shared/ui/ReferenceNotice';
import { type FeedSort, feedSortLabels } from '../types';

const sortOrder: FeedSort[] = ['latest', 'popular', 'recommended'];

type FeedSortTabsProps = {
  selected: FeedSort;
  onSelect: (sort: FeedSort) => void;
};

export function FeedSortTabs({
  selected,
  onSelect,
}: FeedSortTabsProps) {
  const [notice, setNotice] = useState<string | null>(null);
  const scroll = useRef<ScrollView>(null);
  return (
    <>
      <ScrollView
        ref={scroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.tabs}
        role="tablist"
        accessibilityLabel="피드 정렬"
      >
        <IconButton
          icon="plus"
          label="Customize your interests"
          color={colors.secondaryText}
          size={20}
          style={styles.plus}
          onPress={() => setNotice('Customize your interests')}
        />
        {sortOrder.map((sort) => (
          <Pressable
            key={sort}
            role="tab"
            aria-label={feedSortLabels[sort]}
            aria-selected={selected === sort}
            onPress={() => {
              onSelect(sort);
              scroll.current?.scrollTo({ x: sort === 'recommended' ? 98 : 0, animated: true });
            }}
            style={[styles.tab, selected === sort && styles.selected]}
          >
            <View style={styles.labelRow}>
              <Text style={[styles.label, selected === sort && styles.selectedLabel]}>
                {feedSortLabels[sort]}
              </Text>
              {sort === 'recommended' && <Text style={styles.badge}>New</Text>}
            </View>
          </Pressable>
        ))}
        {['Data Science', 'Relationships', 'Writing'].map((topic) => (
          <Pressable
            key={topic}
            role="tab"
            aria-selected={false}
            accessibilityLabel={topic}
            onPress={() => setNotice(topic)}
            style={styles.tab}
          >
            <Text style={styles.label}>{topic}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <ReferenceNotice title={notice} onClose={() => setNotice(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tabs: { paddingLeft: 8, paddingRight: spacing.page, gap: 32 },
  plus: { marginRight: -14 },
  tab: {
    minHeight: sizes.minimumTouchTarget,
    minWidth: sizes.minimumTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  selected: { borderBottomColor: colors.text },
  label: { ...typography.caption, fontSize: 14, lineHeight: 20, color: colors.secondaryText },
  selectedLabel: { color: colors.text },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  badge: {
    fontFamily: fonts.sans, fontSize: 11,
    lineHeight: 16,
    paddingHorizontal: 4,
    borderRadius: 4,
    color: colors.background,
    backgroundColor: colors.green,
  },
});
