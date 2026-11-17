import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../shared/theme/tokens';
import { Screen } from '../shared/ui/Screen';
import { type MainTabParamList, tabs } from './navigation/tabs';

export function TabPlaceholderScreen({ route }: BottomTabScreenProps<MainTabParamList>) {
  const tab = tabs[route.name];

  return (
    <Screen title={tab.title}>
      <View style={styles.notice}>
        <Text style={styles.noticeTitle}>{tab.title} 화면을 준비하고 있어요</Text>
        <Text style={styles.description}>{tab.description}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  notice: { paddingVertical: spacing.section, gap: spacing.medium },
  noticeTitle: { ...typography.sectionTitle, color: colors.text },
  description: { ...typography.body, color: colors.secondaryText },
});
