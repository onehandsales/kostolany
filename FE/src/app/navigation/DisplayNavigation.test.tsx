import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { createMockProfileSource } from '../../features/profile/data/createMockProfileSource';
import { createMockDisplaySettingsSource } from '../../features/settings/data/createMockDisplaySettingsSource';
import { createMockReadingSettingsSource } from '../../features/settings/data/createMockReadingSettingsSource';
import { AppNavigator } from './AppNavigator';

it('실제 탐색에서 전역 테마와 기사 표시를 바꿔도 목록 조회·프로필·복귀와 선택을 보존한다', async () => {
  const stories = mediumArticles.filter((article) => article.id === 'medium-brain');
  expect(stories).toHaveLength(1);
  const feed = jest.fn(createMockFeedSource({ delayMs: 0, catalog: { latest: stories, popular: stories, recommended: stories } }));
  const source = createMockDisplaySettingsSource({ delayMs: 0 });
  const write = jest.spyOn(source, 'save');
  const user = userEvent.setup();
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA}
    feedSource={feed} articleSource={createMockArticleSource({ delayMs: 0 })}
    profileSource={createMockProfileSource({ delayMs: 0 })}
    settingsSource={createMockReadingSettingsSource({ delayMs: 0 })} displaySource={source} /></SafeAreaProvider>);
  await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ });
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await user.press(await screen.findByRole('button', { name: '설정 열기' }));
  await user.press(screen.getByRole('button', { name: '앱 테마: Dark' }));
  expect(screen.getByRole('button', { name: '앱 테마: Dark' })).toBeSelected();
  await user.press(screen.getByRole('button', { name: '프로필로 돌아가기' }));
  expect(screen.getByRole('heading', { name: mockUserA.name })).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '홈' }));
  expect(feed).toHaveBeenCalledTimes(1);
  await user.press(screen.getByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  await user.press(await screen.findByRole('button', { name: 'Story options' }));
  await user.press(screen.getByRole('button', { name: '기사 표시 설정' }));
  await user.press(screen.getByRole('button', { name: '글자 크기 키우기' }));
  await user.press(screen.getByRole('button', { name: '기사 테마 선택 열기' }));
  await user.press(screen.getByRole('radio', { name: '기사 테마: Light' }));
  await user.press(screen.getByRole('button', { name: '기사 표시 설정 닫기' }));
  expect(screen.getByRole('heading', { name: stories[0]!.title })).toHaveStyle({ fontSize: 38.4, color: '#242424' });
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  await user.press(screen.getByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  expect(await screen.findByRole('heading', { name: stories[0]!.title })).toHaveStyle({ fontSize: 38.4 });
  await waitFor(() => expect(write).toHaveBeenLastCalledWith(JSON.stringify(mockUserA.id), expect.objectContaining({ appTheme: 'dark', readerTheme: 'light', fontScale: 120 }), expect.any(Number)));
}, 15000);
