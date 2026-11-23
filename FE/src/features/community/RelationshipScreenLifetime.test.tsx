import { act, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { ReferenceArticleView } from '../article/ReferenceArticleView';
import { articleFixtures } from '../article/data/fixtures';
import { CatalogSearchResults } from '../search/CatalogSearchResults';
import { RefineRecommendationsScreen } from '../recommendations/RefineRecommendationsScreen';
import { ConnectionsScreen } from './ConnectionsScreen';
import { RelationshipProvider } from './RelationshipProvider';
import { createMockRelationshipSource } from './data/createMockRelationshipSource';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it.each(['article', 'search', 'connections', 'recommendations'] as const)(
  '%s 화면을 떠났다가 돌아오면 이전 팔로우 메뉴를 다시 노출하지 않는다', async (entry) => {
    const source = createMockRelationshipSource({ delay: 0 });
    await act(async () => {
      const pending = source.set(mockUserA.id, { operationId: 'seed',
        relationship: { target: { kind: 'writer', id: 'jordan' }, following: true, email: false } });
      await jest.runOnlyPendingTimersAsync();
      await pending;
    });
    function Harness({ active }: { active: boolean }) {
      return <SafeAreaProvider><AuthProvider initialUser={mockUserA}>
        <RelationshipProvider source={source} userId={mockUserA.id} revision={1}>
          {entry === 'article' ? <ReferenceArticleView active={active}
            article={articleFixtures.find((item) => item.id === 'medium-brain')!} onBack={() => {}} backLabel="Back" />
            : entry === 'search' ? <CatalogSearchResults query="Jordan Gibbs" category="People" active={active} />
            : entry === 'connections' ? <ConnectionsScreen owner={null} section="following" active={active} onBack={() => {}} />
            : <RefineRecommendationsScreen initialSection="Following" active={active} onBack={() => {}}
                onExplore={() => {}} onSelectArticle={() => {}} />}
        </RelationshipProvider>
      </AuthProvider></SafeAreaProvider>;
    }
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const view = await render(<Harness active />);
    await act(async () => { await jest.advanceTimersByTimeAsync(500); });
    await waitFor(() => expect(screen.getAllByRole('button', { name: 'Following Jordan Gibbs' })[0]).toBeEnabled());
    await user.press(screen.getAllByRole('button', { name: 'Following Jordan Gibbs' })[0]!);
    expect(screen.getByRole('radio', { name: 'Email notifications off' })).toBeVisible();
    await view.rerender(<Harness active={false} />);
    expect(screen.queryByRole('radio', { name: 'Email notifications off' })).toBeNull();
    await view.rerender(<Harness active />);
    expect(screen.queryByRole('radio', { name: 'Email notifications off' })).toBeNull();
    expect(screen.getAllByRole('button', { name: 'Following Jordan Gibbs' })[0]).toBeVisible();
    if (entry === 'recommendations') {
      await user.press(screen.getByRole('button', { name: 'Filter recommendations: All' }));
      expect(screen.getByRole('radio', { name: 'All' })).toBeVisible();
      await view.rerender(<Harness active={false} />);
      await view.rerender(<Harness active />);
      expect(screen.queryByRole('radio', { name: 'All' })).toBeNull();
    }
  },
);
