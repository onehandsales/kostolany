import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { BookmarkProvider } from '../bookmarks/BookmarkProvider';
import { mediumArticles } from '../feed/data/mediumFixtures';
import { deferred } from '../feed/tests/helpers';
import { ModerationContext } from '../moderation/ModerationContext';
import { createModerationStore } from '../moderation/createModerationStore';
import { createMockModerationSource } from '../moderation/data/createMockModerationSource';
import { DigestPanel } from './DigestPanel';
import { createMockDigestSource, digestFixtures } from './createMockDigestSource';
import type { DigestSource } from './types';

const love = mediumArticles.find(article => article.id === 'medium-love')!;
const button = (name: string) => screen.getByRole('button', { name });

it('기존 호와 새 호는 최신 음소거/차단으로 표시하고 늦은 조회·재조회·해제로 원본을 변경하지 않는다', async () => {
  const moderation = createModerationStore(createMockModerationSource({ delay: 0 }), mockUserA.id);
  moderation.setReadScope('test');
  await moderation.reload();
  const source = createMockDigestSource({ delayMs: 0 });
  const original = source.fetchDigest;
  const delayed = deferred<Awaited<ReturnType<DigestSource['fetchDigest']>>>();
  source.fetchDigest = jest.fn().mockReturnValueOnce(delayed.promise).mockImplementation(original);
  await render(<AuthProvider initialUser={mockUserA}><SafeAreaProvider>
    <ModerationContext.Provider value={{ store: moderation, scope: 'test', open: () => {}, isBlockedForUser: () => false }}>
      <BookmarkProvider userId={mockUserA.id}>
        <DigestPanel source={source} userId={mockUserA.id} header={null} onOpen={() => {}} />
      </BookmarkProvider>
    </ModerationContext.Provider>
  </SafeAreaProvider></AuthProvider>);
  await screen.findByText('June 12, 2025');
  await act(async () => {
    await moderation.execute({ operationId: 'mute', action: { kind: 'mute', target: { kind: 'writer', id: 'kris' }, active: true } });
    delayed.resolve(await original(mockUserA.id, digestFixtures[0]!.id));
  });
  expect(screen.queryByText(love.title)).toBeNull();
  expect((await original(mockUserA.id, digestFixtures[0]!.id)).digest.articleIds).toContain(love.id);
  await fireEvent.press(button('Digest 날짜 선택'));
  await fireEvent.press(screen.getByRole('radio', { name: 'June 8, 2025' }));
  await fireEvent.press(button('Digest 날짜 적용'));
  await screen.findByText('Goodbye Notion');
  const next = { ...digestFixtures[0]!, id: 'next-edition', date: '2025-06-13', publishedAt: '2025-06-13T08:00:00Z', articleIds: [love.id] };
  await act(async () => source.replaceIssues([next]));
  await screen.findByText('이 날짜에는 읽을 기사가 없어요.');
  await act(async () => {
    await moderation.execute({ operationId: 'unmute', action: { kind: 'mute', target: { kind: 'writer', id: 'kris' }, active: false } });
  });
  await screen.findByText(love.title);
  await act(async () => {
    await moderation.execute({ operationId: 'block', action: { kind: 'block', writerId: 'kris', active: true } });
    source.replaceIssues(digestFixtures);
  });
  await screen.findByText('June 12, 2025');
  expect(screen.queryByText(love.title)).toBeNull();
  await act(async () => {
    await moderation.execute({ operationId: 'unblock', action: { kind: 'block', writerId: 'kris', active: false } });
  });
  await screen.findByText(love.title);
  expect(moderation.getSnapshot().value?.muted).toEqual([]);
});

it('읽기 시간 0·누락은 숨기고 양수와 회원용 true만 날짜 재조회 뒤에도 표시한다', async () => {
  const articles = [
    { ...love, id: 'known', title: '확인한 시간', readingMinutes: 2 },
    { ...love, id: 'zero', title: '미확인 시간 0', readingMinutes: 0, reference: { ...love.reference!, memberOnly: false } },
    Object.assign({ ...love, id: 'missing', title: '누락 시간', reference: { ...love.reference!, memberOnly: undefined } }, { readingMinutes: undefined }),
  ];
  const source = createMockDigestSource({ delayMs: 0, initial: [{ ...digestFixtures[0]!, articleIds: articles.map(article => article.id) }] });
  await render(<AuthProvider initialUser={mockUserA}><SafeAreaProvider><BookmarkProvider articles={articles}>
    <DigestPanel source={source} userId={mockUserA.id} header={null} onOpen={() => {}} />
  </BookmarkProvider></SafeAreaProvider></AuthProvider>);
  await screen.findByText('확인한 시간');
  expect(screen.getByText('2 min read')).toBeVisible();
  expect(screen.queryByText('0 min read')).toBeNull();
  expect(screen.queryByText('undefined min read')).toBeNull();
  expect(screen.getAllByLabelText(/^회원용 기사,/)).toHaveLength(1);
  await act(async () => source.replaceIssues([{ ...digestFixtures[0]!, articleIds: articles.map(article => article.id) }]));
  await screen.findByText('2 min read');
  expect(screen.queryByText('0 min read')).toBeNull();
  expect(screen.getAllByLabelText(/^회원용 기사,/)).toHaveLength(1);
});
