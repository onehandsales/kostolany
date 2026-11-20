import { act, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import type { ModerationSource } from '../../features/moderation/types';
import { deferred } from '../../features/feed/tests/helpers';
import { topicCatalog } from '../../features/topics/data/topicCatalog';
import type { TopicCatalog } from '../../features/topics/types';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { createMockRecommendationSource } from '../../features/recommendations/data/createMockRecommendationSource';
import { createMockReadingHistorySource } from '../../features/reading-history/data/createMockReadingHistorySource';
import { createMockRelationshipSource } from '../../features/community/data/createMockRelationshipSource';

import { AppNavigator } from './AppNavigator';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const title = 'ChatGPT Is Poisoning Your Brain...';
const articles = mediumArticles.filter((article) => article.id === 'medium-brain');
const feed = () =>
  createMockFeedSource({ delayMs: 0, catalog: { latest: articles, popular: [], recommended: [] } });
it('관심사 필터·팔로우와 이력 개별 삭제 취소/확정·Library/Viewed를 실제 navigation으로 연결한다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const history = createMockReadingHistorySource({ delayMs: 0 });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        feedSource={feed()}
        historySource={history}
        articleSource={createMockArticleSource({ delayMs: 0 })}
        relationshipSource={createMockRelationshipSource({ delay: 0 })}
      />
    </SafeAreaProvider>,
  );
  await user.press(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  await screen.findByRole('heading', { name: title });
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  expect(await screen.findByLabelText(`읽음, ${title}`)).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Customize your interests' }));
  await user.press(await screen.findByRole('button', { name: 'Follow Self Improvement' }));
  await screen.findByRole('button', { name: 'Following Self Improvement' });
  await user.press(screen.getByRole('button', { name: 'Back from refine recommendations' }));
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await user.press(await screen.findByRole('button', { name: '설정 열기' }));
  await user.press(screen.getByRole('button', { name: 'Refine recommendations' }));
  expect(await screen.findByRole('button', { name: 'Following Self Improvement' })).toBeVisible();
  await user.press(screen.getByRole('tab', { name: 'Reading history' }));
  await user.press(await screen.findByRole('button', { name: `Remove from history, ${title}` }));
  await user.press(screen.getByRole('button', { name: 'Cancel history removal' }));
  expect(screen.getByRole('button', { name: `Remove from history, ${title}` })).toBeVisible();
  await user.press(screen.getByRole('button', { name: `Remove from history, ${title}` }));
  await user.press(screen.getByRole('button', { name: 'Confirm history removal' }));
  await screen.findByText('You haven’t read any stories yet');
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('tab', { name: 'Reading history' }));
  expect(await screen.findByText('You haven’t read any stories yet')).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '홈' }));
  expect(screen.queryByLabelText(`읽음, ${title}`)).toBeNull();
}, 20000);
it('Show less 쓰기 실패와 재시도·Undo가 홈 추천에만 반영된다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        feedSource={feed()}
        recommendationSource={createMockRecommendationSource({ delayMs: 0, scenario: 'write-error' })}
      />
    </SafeAreaProvider>,
  );
  await user.press(await screen.findByRole('button', { name: `Show less like this, ${title}` }));
  await user.press(await screen.findByRole('button', { name: 'Confirm show less' }));
  await user.press(await screen.findByRole('button', { name: 'Retry show less' }));
  await screen.findByText('We’ll show less like this.');
  await user.press(screen.getByRole('button', { name: 'Undo show less' }));
  await screen.findByText('Story restored to recommendations.');
  await user.press(screen.getByRole('button', { name: 'Show less like this Close recommendation action' }));
  expect(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ })).toBeVisible();
  await user.press(screen.getByRole('button', { name: `Show less like this, ${title}` }));
  await user.press(screen.getByRole('button', { name: 'Confirm show less' }));
  await screen.findByText('We’ll show less like this.');
  await user.press(screen.getByRole('button', { name: 'Show less like this Close recommendation action' }));
  await waitFor(() => expect(screen.queryByRole('button', { name: /^ChatGPT Is Poisoning/ })).toBeNull());
});

it('토픽 조회 중 필터를 바꾸면 늦은 실패가 작가 결과를 가리지 않고 토픽 재시도로 복구한다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const pending = deferred<TopicCatalog>();
  let reads = 0;
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        topicSource={() => (++reads === 1 ? pending.promise : Promise.resolve(topicCatalog))}
      />
    </SafeAreaProvider>,
  );
  await user.press(screen.getByRole('button', { name: 'Customize your interests' }));
  await user.press(screen.getByRole('button', { name: 'Filter recommendations: Topics' }));
  await user.press(screen.getByRole('radio', { name: 'Writers' }));
  await act(async () => {
    pending.reject(new Error('old topic request'));
  });
  expect(await screen.findByRole('button', { name: 'Follow Kim Witten, PhD' })).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Retry recommendations' })).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Filter recommendations: Writers' }));
  await user.press(screen.getByRole('radio', { name: 'Topics' }));
  await user.press(await screen.findByRole('button', { name: 'Retry recommendations' }));
  expect(await screen.findByRole('button', { name: 'Follow Programming' })).toBeVisible();
});

it('Muted 해제 실패는 확정 관계를 보존하고 재시도 후 홈 기사를 복구한다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const base = createMockModerationSource({ delay: 0 });
  let failed = false;
  await base.execute(mockUserA.id, {
    operationId: 'seed-mute',
    action: { kind: 'mute', target: { kind: 'writer', id: 'jordan' }, active: true },
  });
  const source: ModerationSource = {
    ...base,
    execute: async (owner, command, signal) => {
      if (command.action.kind === 'mute' && !command.action.active && !failed) {
        failed = true;
        throw new Error('unmute failure');
      }
      return base.execute(owner, command, signal);
    },
  };
  await render(
    <SafeAreaProvider>
      <AppNavigator initialUser={mockUserA} feedSource={feed()} moderationSource={source} />
    </SafeAreaProvider>,
  );
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await user.press(await screen.findByRole('button', { name: '설정 열기' }));
  await user.press(screen.getByRole('button', { name: 'Refine recommendations' }));
  await user.press(screen.getByRole('tab', { name: 'Muted' }));
  await user.press(await screen.findByRole('button', { name: 'Unmute Jordan Gibbs' }));
  await user.press(screen.getByRole('button', { name: 'Confirm Unmute Jordan Gibbs?' }));
  await screen.findByText('Couldn’t save. Your selection is kept. Try again.');
  expect((await base.read(mockUserA.id)).muted).toEqual([{ kind: 'writer', id: 'jordan' }]);
  await user.press(screen.getByRole('button', { name: 'Confirm Unmute Jordan Gibbs?' }));
  await screen.findByText('You haven’t muted anyone.');
  await user.press(screen.getByRole('tab', { name: '홈' }));
  expect(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ })).toBeVisible();
});
