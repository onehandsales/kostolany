import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { createMockClapSource } from '../../features/reactions/data/createMockClapSource';
import { createMockReadingHistorySource } from '../../features/reading-history/data/createMockReadingHistorySource';
import { createMockDisplaySettingsSource } from '../../features/settings/data/createMockDisplaySettingsSource';
import { createMockReadingSettingsSource } from '../../features/settings/data/createMockReadingSettingsSource';
import { AppNavigator } from './AppNavigator';

const title = 'ChatGPT Is Poisoning Your Brain...';
const stories = mediumArticles.filter(article => article.id === 'medium-brain');
const feedSource = createMockFeedSource({ delayMs: 0, catalog: { latest: stories, popular: [], recommended: [] } });

it('실제 탐색에서 누적 박수·Undo·Viewed와 관련 기사 복귀를 같은 ID로 연결한다', async () => {
  const claps = createMockClapSource({ delayMs: 0 });
  const history = createMockReadingHistorySource({ delayMs: 0 });
  const user = userEvent.setup();
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA}
    feedSource={feedSource} articleSource={createMockArticleSource({ delayMs: 0 })}
    clapSource={claps} historySource={history}
    displaySource={createMockDisplaySettingsSource({ delayMs: 0 })}
    settingsSource={createMockReadingSettingsSource({ delayMs: 0 })} /></SafeAreaProvider>);
  await user.press(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  const clap = await screen.findByRole('button', { name: `박수 보내기, ${title}` });
  await waitFor(() => expect(clap).toBeEnabled());
  await user.press(clap); await user.press(clap); await user.press(clap);
  await screen.findByRole('button', { name: `박수 목록, ${title}, 18003회` });
  expect(await claps.read({ userId: mockUserA.id, target: { kind: 'article', id: 'medium-brain' } }))
    .toMatchObject({ mine: 3, total: 18003 });
  await user.press(screen.getByRole('button', { name: 'Story options' }));
  await user.press(screen.getByRole('button', { name: '내 박수 모두 취소' }));
  await screen.findByRole('button', { name: `박수 목록, ${title}, 18000회` });
  await user.press(screen.getByRole('button', { name: 'Behold...The Prompt Bible is Here' }));
  expect(await screen.findByRole('heading', { name: 'Behold...The Prompt Bible is Here' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  expect(await screen.findByRole('heading', { name: title })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  expect(await screen.findByLabelText(`읽음, ${title}`)).toBeVisible();
  expect((await history.read(mockUserA.id)).visits.map(visit => visit.articleId))
    .toEqual(expect.arrayContaining(['medium-brain', 'medium-prompt-bible']));
}, 20000);

it('비로그인 박수 진입을 닫으면 기사와 기존 표시를 유지하고 박수를 전송하지 않는다', async () => {
  const claps = createMockClapSource({ delayMs: 0 });
  const save = jest.spyOn(claps, 'save');
  const user = userEvent.setup();
  await render(<SafeAreaProvider><AppNavigator feedSource={feedSource}
    articleSource={createMockArticleSource({ delayMs: 0 })} clapSource={claps}
    displaySource={createMockDisplaySettingsSource({ delayMs: 0 })} /></SafeAreaProvider>);
  await user.press(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  await user.press(await screen.findByRole('button', { name: `박수, ${title}, 로그인 필요` }));
  await user.press(screen.getByRole('button', { name: '로그인 닫기' }));
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
  expect(save).not.toHaveBeenCalled();
}, 15000);
