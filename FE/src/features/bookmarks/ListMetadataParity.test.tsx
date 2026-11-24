import { render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BookmarkProvider } from './BookmarkProvider';
import { createMockBookmarkSource } from './data/createMockBookmarkSource';
import { bookmarkArticles } from './data/bookmarkFixtures';
import { ListNoteSheet } from './ListNoteSheet';
import { ListStoryCard } from './ListStoryCard';

it('같은 기사 ID의 메모와 목록 카드가 양수 시간과 명시적인 회원용 표시만 사용한다', async () => {
  const source = createMockBookmarkSource({ delayMs: 0, managesReadingList: true });
  const original = bookmarkArticles.find(article => article.id === 'medium-love');
  if (!original?.reference || !source.lists) throw new Error('Missing fixture');
  await source.lists.setList({ userId: 'A', listId: 'own', commandId: 1,
    content: { name: '메타데이터', articleIds: [original.id] } });
  const close = jest.fn();
  const contents = (minutes: number | undefined, memberOnly: boolean | undefined) => {
    // 누락값은 외부 공급부의 런타임 경계 사례이며 임의 시간을 채우지 않는다.
    const article = Object.assign({ ...original, reference: { ...original.reference!, memberOnly } }, { readingMinutes: minutes });
    return <SafeAreaProvider><BookmarkProvider userId="A" source={source}>
      <ListStoryCard article={article} onOpen={jest.fn()} onRemove={jest.fn()} onNotice={jest.fn()} />
      <ListNoteSheet listId="own" article={article} onClose={close} />
    </BookmarkProvider></SafeAreaProvider>;
  };
  const view = await render(contents(0, false));
  expect(screen.queryByText(/0 min read/)).toBeNull();
  expect(screen.queryByLabelText(`회원용 기사, ${original.title}`)).toBeNull();
  await view.rerender(contents(undefined, undefined));
  expect(screen.queryByText(/min read/)).toBeNull();
  expect(screen.queryByLabelText(`회원용 기사, ${original.title}`)).toBeNull();
  await view.rerender(contents(8, true));
  expect(screen.getAllByText(/8 min read/)).toHaveLength(2);
  expect(screen.getByLabelText(`회원용 기사, ${original.title}`, { includeHiddenElements: true })).toBeOnTheScreen();
});
