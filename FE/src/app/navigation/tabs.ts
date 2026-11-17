import type { TabIconName } from '../../shared/ui/TabIcon';

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
  Profile: undefined;
};

type TabDefinition = {
  title: string;
  icon: TabIconName;
  description: string;
};

export const tabs = {
  Home: {
    title: '홈',
    icon: 'home',
    description: '경제의 흐름을 읽을 수 있는 금융 뉴스를 준비하고 있어요.',
  },
  Explore: {
    title: '탐색',
    icon: 'search',
    description: '관심 있는 금융 뉴스를 찾을 수 있는 공간을 준비하고 있어요.',
  },
  Library: {
    title: '라이브러리',
    icon: 'library',
    description: '다시 읽고 싶은 뉴스를 모아볼 공간을 준비하고 있어요.',
  },
  Profile: {
    title: '프로필',
    icon: 'profile',
    description: '내 정보와 읽기 설정을 확인할 공간을 준비하고 있어요.',
  },
} as const satisfies Record<keyof MainTabParamList, TabDefinition>;
