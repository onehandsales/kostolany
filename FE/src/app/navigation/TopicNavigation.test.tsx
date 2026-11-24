import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './AppNavigator';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockRelationshipSource } from '../../features/community/data/createMockRelationshipSource';
import { createMockDirectorySource } from '../../features/community/DirectoryProvider';
import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import { createMockTopicSource } from '../../features/topics/TopicProvider';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
it('실제 탐색·토픽·기사·큐레이션·Following 복귀에서 같은 팔로우와 대상이 유지된다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        articleSource={createMockArticleSource({ delayMs: 0 })}
        directorySource={createMockDirectorySource({ delay: 0 })}
        topicSource={createMockTopicSource({ delay: 0 })}
        relationshipSource={createMockRelationshipSource({ delay: 0, scenario: 'write-error' })}
      />
    </SafeAreaProvider>,
  );
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(screen.getByRole('button', { name: 'Open topic Life' }));
  await user.press(await screen.findByRole('button', { name: 'Follow Life' }));
  await user.press(await screen.findByRole('button', { name: 'Retry following Life' }));
  await screen.findByRole('button', { name: 'Following Life' });
  await user.press(screen.getByRole('button', { name: 'Open topic Self Improvement' }));
  await user.press(await screen.findByRole('button', { name: 'Follow Self Improvement' }));
  await screen.findByRole('button', { name: 'Following Self Improvement' });
  await user.press(screen.getByRole('button', { name: 'Read Pope Francis Has One More Thing To Say' }));
  await user.press(await screen.findByRole('button', { name: '토픽으로 돌아가기' }));
  await user.press(screen.getByRole('button', { name: 'See the full list The power of a morning routine' }));
  expect(screen.getByRole('heading', { name: 'The power of a morning routine' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Back from public list' }));
  expect(screen.getByRole('button', { name: 'Following Self Improvement' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Back from topic' }));
  expect(screen.getByRole('button', { name: 'Following Life' })).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '홈' }));
  await user.press(screen.getByRole('tab', { name: 'Following' }));
  expect(await screen.findByRole('button', { name: /^How Much Time Do We Have/ })).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await user.press(await screen.findByRole('button', { name: 'My following' }));
  expect(screen.getByRole('button', { name: 'Following Life' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Following Life' }));
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Following Life' })).toBeNull());
  expect(screen.getByRole('button', { name: 'Following Self Improvement' })).toBeVisible();
}, 20000);

it('토픽 조회 실패와 무관하게 publication 추천을 열고 같은 팔로우를 상세와 확장 목록에서 본다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        directorySource={createMockDirectorySource({ delay: 0 })}
        topicSource={async () => {
          throw new Error('topics unavailable');
        }}
        relationshipSource={createMockRelationshipSource({ delay: 0 })}
      />
    </SafeAreaProvider>,
  );
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(await screen.findByRole('button', { name: 'View recommended publications' }));
  await user.press(await screen.findByRole('button', { name: 'Follow Coinmonks' }));
  await user.press(screen.getByRole('button', { name: 'Following Coinmonks options 닫기' }));
  await user.press(screen.getByRole('button', { name: 'Discover Coinmonks' }));
  expect(screen.getByRole('heading', { name: 'Coinmonks' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Following Coinmonks' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Back from profile' }));
  await user.press(screen.getByRole('button', { name: 'See more suggestions' }));
  expect(await screen.findByRole('button', { name: 'Discover UX Collective' })).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Retry recommendations' })).toBeNull();
});

// 전체 목록과 추천 미리보기는 같은 소유자 차단 계약을 소비한다.
it('차단한 큐레이터의 목록은 토픽 미리보기에도 노출하지 않는다', async () => {
  const privacy = createMockModerationSource({ delay: 0 });
  await privacy.execute(mockUserA.id, { operationId: 'blocked-curator',
    action: { kind: 'block', writerId: 'medium-staff', active: true } });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} moderationSource={privacy}
    topicSource={createMockTopicSource({ delay: 0 })} /></SafeAreaProvider>);
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(screen.getByRole('button', { name: 'Open topic Life' }));
  await user.press(await screen.findByRole('button', { name: 'Open topic Self Improvement' }));
  expect(await screen.findByText('This curated list is unavailable.')).toBeVisible();
  expect(screen.queryByRole('button', { name: 'See the full list The power of a morning routine' })).toBeNull();
  expect(screen.queryByText('The power of a morning routine')).toBeNull();
});

// 차단 목록이 미확인인 동안 여러 진입점에서 본문을 노출하지 않는다.
it('관계 조회 실패는 홈·탐색을 닫고 재시도 후 차단 정책을 적용한다', async () => {
  const privacy = createMockModerationSource({ delay: 0, scenario: 'read-error' });
  await privacy.execute(mockUserA.id, { operationId: 'block-home-writer',
    action: { kind: 'block', writerId: 'jordan', active: true } });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} moderationSource={privacy} /></SafeAreaProvider>);
  await screen.findByRole('button', { name: '개인 표시 설정 다시 시도' });
  expect(screen.queryByText('ChatGPT Is Poisoning Your Brain...')).toBeNull();
  await user.press(screen.getByRole('tab', { name: '탐색' }));
  expect(screen.queryByText('Trending on Medium')).toBeNull();
  await user.press(screen.getByRole('button', { name: '개인 표시 설정 다시 시도' }));
  expect(await screen.findByText('Trending on Medium')).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '홈' }));
  await user.press(await screen.findByRole('button', { name: '기사 더 보기' }));
  await screen.findByRole('button', { name: /^This new IDE from Google is an absolute game changer\./ });
  expect(screen.queryByText('ChatGPT Is Poisoning Your Brain...')).toBeNull();
});
