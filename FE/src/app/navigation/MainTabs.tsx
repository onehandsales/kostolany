import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { colors } from '../../shared/theme/tokens';
import { TabIcon } from '../../shared/ui/TabIcon';
import { TabPlaceholderScreen } from '../TabPlaceholderScreen';
import { BottomTabBar } from './BottomTabBar';
import { type MainTabParamList, tabs } from './tabs';

const Tab = createBottomTabNavigator<MainTabParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.text,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
  },
};

export function MainTabs() {
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="history"
        tabBar={BottomTabBar}
        screenOptions={({ route }) => ({
          headerShown: false,
          animation: 'none',
          title: tabs[route.name].title,
          tabBarAccessibilityLabel: tabs[route.name].title,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={tabs[route.name].icon} focused={focused} color={color} size={size} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={TabPlaceholderScreen} />
        <Tab.Screen name="Explore" component={TabPlaceholderScreen} />
        <Tab.Screen name="Library" component={TabPlaceholderScreen} />
        <Tab.Screen name="Profile" component={TabPlaceholderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
