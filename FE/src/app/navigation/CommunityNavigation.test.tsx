import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './AppNavigator';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { createMockRelationshipSource } from '../../features/community/data/createMockRelationshipSource';
import { createMockDirectorySource } from '../../features/community/DirectoryProvider';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
it('실제 navigation으로 프로필 탭·목록·팔로우/이메일 재시도·공개/내 Following·기사 복귀를 연결한다', async () => {
  const source = createMockRelationshipSource({ delay: 0, scenario: 'email-error' });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        relationshipSource={source}
        directorySource={createMockDirectorySource({ delay: 0 })}
        articleSource={createMockArticleSource({ delayMs: 0 })}
        feedSource={createMockFeedSource({
          delayMs: 0,
          catalog: {
            latest: mediumArticles.filter((item) => item.id === 'medium-brain'),
            popular: [],
            recommended: [],
          },
        })}
      />
    </SafeAreaProvider>,
  );
  await user.press(await screen.findByRole('button', { name: 'Open Jordan Gibbs profile' }));
  await screen.findByRole('heading', { name: 'Jordan Gibbs' });
  await user.press(screen.getByRole('tab', { name: 'Lists' }));
  await user.press(screen.getByRole('button', { name: 'Open list AAA AI' }));
  expect(screen.getByRole('heading', { name: 'AAA AI' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Back from public list' }));
  expect(screen.getByRole('tab', { name: 'Lists' })).toBeSelected();
  await user.press(screen.getByRole('tab', { name: 'About' }));
  expect(screen.getByText(/Medium member since October 2023/)).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Follow Jordan Gibbs' }));
  await waitFor(() => expect(screen.getByRole('radio', { name: 'Email notifications off' })).toBeChecked());
  await user.press(screen.getByRole('radio', { name: 'Email notifications on' }));
  await user.press(await screen.findByRole('button', { name: 'Retry email or follow Jordan Gibbs' }));
  await waitFor(() => expect(screen.getByRole('radio', { name: 'Email notifications on' })).toBeChecked());
  await user.press(screen.getByRole('button', { name: 'Following Jordan Gibbs options 닫기' }));
  await user.press(screen.getByRole('button', { name: 'Jordan Gibbs following' }));
  await user.press(screen.getByRole('button', { name: 'Follow The Medium Blog' }));
  await user.press(screen.getByRole('button', { name: 'Following The Medium Blog options 닫기' }));
  await user.press(screen.getByRole('button', { name: 'Back from connections' }));
  expect(screen.getByRole('tab', { name: 'About' })).toBeSelected();
  await user.press(screen.getByRole('tab', { name: 'Stories' }));
  await user.press(screen.getByRole('button', { name: /^Behold/ }));
  await user.press(await screen.findByRole('button', { name: '작가 프로필로 돌아가기' }));
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await user.press(await screen.findByRole('button', { name: 'My following' }));
  expect(screen.getByRole('button', { name: 'Following Jordan Gibbs' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Following The Medium Blog' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Following Jordan Gibbs' }));
  expect(screen.getByRole('radio', { name: 'Email notifications on' })).toBeChecked();
  await user.press(screen.getByRole('button', { name: 'Unfollow Jordan Gibbs' }));
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Following Jordan Gibbs' })).toBeNull());
  const reading = source.read(mockUserA.id);
  await jest.advanceTimersByTimeAsync(1);
  const value = await reading;
  expect(value.relationships.find((item) => item.target.id === 'medium-blog')?.following).toBe(true);
  expect(value.relationships.find((item) => item.target.id === 'jordan')).toMatchObject({
    following: false,
    email: false,
  });
}, 20000);

it('작가를 거쳐 같은 기사로 새 진입하면 기본 수준이고 기존 기사로 뒤로 돌아오면 임시 수준이다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        relationshipSource={createMockRelationshipSource({ delay: 0 })}
        directorySource={createMockDirectorySource({ delay: 0 })}
        articleSource={createMockArticleSource({ delayMs: 0 })}
        feedSource={createMockFeedSource({
          delayMs: 0,
          catalog: {
            latest: mediumArticles.filter((item) => item.id === 'medium-brain'),
            popular: [],
            recommended: [],
          },
        })}
      />
    </SafeAreaProvider>,
  );
  await user.press(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  await user.press(await screen.findByRole('button', { name: 'Reading tools' }));
  await user.press(screen.getByRole('radio', { name: '고등학생' }));
  await user.press(screen.getAllByRole('button', { name: 'Open Jordan Gibbs profile' })[0]!);
  await user.press(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  await user.press(await screen.findByRole('button', { name: 'Reading tools' }));
  expect(screen.getByRole('radio', { name: '성인', checked: true })).toBeVisible();
  await user.press(screen.getAllByRole('button', { name: 'Open Jordan Gibbs profile' })[0]!);
  await user.press(screen.getByRole('button', { name: 'Back from profile' }));
  expect(screen.getByRole('radio', { name: '성인', checked: true })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '작가 프로필로 돌아가기' }));
  await user.press(screen.getByRole('button', { name: 'Back from profile' }));
  expect(screen.getByRole('radio', { name: '고등학생', checked: true })).toBeVisible();
});
