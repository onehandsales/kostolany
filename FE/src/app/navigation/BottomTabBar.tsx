import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, sizes } from '../../shared/theme/tokens';

export function BottomTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  return (
    <View
      role="tablist"
      accessibilityLabel="주요 메뉴"
      style={[
        styles.bar,
        {
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const options = descriptors[route.key]?.options;
        const focused = state.index === index;
        const color = focused ? colors.text : colors.secondaryText;

        return (
          <Pressable
            key={route.key}
            role="tab"
            aria-label={options?.tabBarAccessibilityLabel ?? options?.title ?? route.name}
            aria-selected={focused}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            }}
            onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
          >
            {options?.tabBarIcon?.({ focused, color, size: sizes.tabIcon })}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    minWidth: sizes.minimumTouchTarget,
    minHeight: sizes.minimumTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.55 },
});
