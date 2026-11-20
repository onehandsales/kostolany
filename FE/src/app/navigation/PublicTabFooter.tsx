import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabIcon } from '../../shared/ui/TabIcon';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { tabs, type MainTabParamList } from './tabs';

export function PublicTabFooter({
  onSelect,
  selected = 'Home',
}: {
  onSelect: (tab: keyof MainTabParamList) => void;
  selected?: keyof MainTabParamList;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const names: (keyof MainTabParamList)[] = ['Home', 'Explore', 'Library', 'Profile'];
  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        paddingBottom: insets.bottom,
        backgroundColor: colors.background,
      }}
    >
      {names.map((name) => (
        <Pressable
          key={name}
          role="tab"
          accessibilityLabel={tabs[name].title}
          aria-selected={selected === name}
          accessibilityState={{ selected: selected === name }}
          onPress={() => onSelect(name)}
          style={{ flex: 1, minHeight: 48, minWidth: 48, justifyContent: 'center', alignItems: 'center' }}
        >
          <TabIcon
            name={tabs[name].icon}
            focused={selected === name}
            size={24}
            color={selected === name ? colors.text : colors.secondaryText}
          />
        </Pressable>
      ))}
    </View>
  );
}
