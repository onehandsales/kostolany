import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { bookmarkArticles } from '../bookmarks/data/bookmarkFixtures';
import { ArticleCatalogProvider, type ArticleCatalog } from '../feed/ArticleCatalog';
import { createMockModerationSource } from '../moderation/data/createMockModerationSource';
import { ModerationProvider } from '../moderation/ModerationProvider';
import { ReadingHistoryList } from './ReadingHistoryList';
import { ReadingHistoryProvider } from './ReadingHistoryProvider';
import { createMockReadingHistorySource } from './data/createMockReadingHistorySource';

it('일반 기사·발행 ID를 조회하고 삭제·복구와 차단·접근 조회 실패를 제목 노출 없이 구분한다', async () => {
  const story = { ...bookmarkArticles[0]!, id: 'written:one', title: '발행 제목', publishedStory: { id: 'one', ownerId: 'writer', unlisted: true } };
  let snapshot = [...bookmarkArticles, story]; const listeners = new Set<() => void>();
  const catalog: ArticleCatalog = { getSnapshot: () => snapshot, subscribe: listener => { listeners.add(listener); return () => { listeners.delete(listener); }; } };
  const history = createMockReadingHistorySource({ delayMs: 0, initialVisits: { [mockUserA.id]: ['example-latest-rates', 'written:one', 'medium-brain', 'missing'].map(articleId => ({ articleId, visitedAt: '2025-06-13T12:00:00Z' })) } });
  const moderation = createMockModerationSource({ delay: 0, scenario: 'read-error' });
  await moderation.execute(mockUserA.id, { operationId: 'block', action: { kind: 'block', writerId: 'jordan', active: true } });
  const open = jest.fn();
  await render(<AuthProvider initialUser={mockUserA}><ArticleCatalogProvider catalog={catalog}>
    <ModerationProvider userId={mockUserA.id} revision={0} source={moderation}><ReadingHistoryProvider userId={mockUserA.id} source={history}>
      <ReadingHistoryList onSelect={open} onExplore={() => {}} />
    </ReadingHistoryProvider></ModerationProvider></ArticleCatalogProvider></AuthProvider>);
  await screen.findAllByText('Couldn’t check story access.');
  expect(screen.queryByText('발행 제목')).toBeNull();
  await fireEvent.press(screen.getAllByRole('button', { name: 'Retry history access' })[0]!);
  await screen.findByRole('button', { name: /^금리가 오르면/ });
  await fireEvent.press(await screen.findByRole('button', { name: /^발행 제목\./ })); expect(open).toHaveBeenLastCalledWith('written:one');
  expect(screen.queryByText('ChatGPT Is Poisoning Your Brain...')).toBeNull();
  expect(screen.getByRole('button', { name: 'Remove unavailable story medium-brain from history' })).toBeVisible();
  await act(async () => { snapshot = [...bookmarkArticles]; listeners.forEach(listener => listener()); });
  expect(screen.queryByText('발행 제목')).toBeNull();
  expect(screen.getByRole('button', { name: 'Remove unavailable story written:one from history' })).toBeVisible();
  await act(async () => { snapshot = [...bookmarkArticles, story]; listeners.forEach(listener => listener()); });
  expect(screen.getByRole('button', { name: /^발행 제목\./ })).toBeVisible();
  await fireEvent.press(screen.getByRole('button', { name: 'Remove unavailable story missing from history' }));
  await fireEvent.press(screen.getByRole('button', { name: 'Confirm history removal' }));
  expect((await history.read(mockUserA.id)).visits.some(item => item.articleId === 'missing')).toBe(false);
});
