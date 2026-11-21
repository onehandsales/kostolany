import type { TabIconName } from '../../shared/ui/TabIcon';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ProfileStackParamList } from './ProfileNavigator';

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

type TabDefinition = {
  title: string;
  icon: TabIconName;
};

export const tabs = {
  Home: {
    title: '홈',
    icon: 'home',
  },
  Explore: {
    title: '탐색',
    icon: 'search',
  },
  Library: {
    title: '라이브러리',
    icon: 'library',
  },
  Profile: {
    title: '프로필',
    icon: 'profile',
  },
} as const satisfies Record<keyof MainTabParamList, TabDefinition>;
