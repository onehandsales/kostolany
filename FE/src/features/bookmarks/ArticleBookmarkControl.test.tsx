import { act, render, screen, userEvent, waitFor, within } from '@testing-library/react-native';
import { StrictMode } from 'react';
import { View } from 'react-native';

import { deferred } from '../feed/tests/helpers';
import { ArticleBookmarkControl } from './ArticleBookmarkControl';
import { BookmarkProvider } from './BookmarkProvider';
import { createMockBookmarkSource } from './data/createMockBookmarkSource';
import type { ArticleBookmark, BookmarkSource, ReadingList } from './types';

const articleId = 'example-latest-rates';
const control = <ArticleBookmarkControl articleId={articleId} articleTitle="금리 기사" />;
const getButton = () => screen.getByRole('togglebutton', { name: /^북마크,/ });

it('조회 전에는 상태를 추측하지 않고 실패 후 재시도하면 두 소비자가 같은 선택을 읽는다', async () => {
  const read = deferred<ReadingList>();
  const source = createMockBookmarkSource({ delayMs: 0 });
  const fetchReadingList = jest.fn(source.fetchReadingList).mockReturnValueOnce(read.promise);
  const user = userEvent.setup();
  await render(<BookmarkProvider source={{ ...source, fetchReadingList }}>
    <View accessibilityLabel="첫 소비자">{control}</View><View accessibilityLabel="둘째 소비자">{control}</View>
  </BookmarkProvider>);
  expect(screen.getAllByRole('togglebutton')[0]).toBeDisabled();
  expect(screen.getAllByRole('togglebutton')[0]).toHaveAccessibleName(/저장 여부 미확인/);
  await act(async () => read.reject(new Error('read failure')));
  await user.press(within(screen.getByLabelText('첫 소비자')).getByRole('button', { name: /^북마크 조회 다시 시도/ }));
  await user.press(within(screen.getByLabelText('첫 소비자')).getByRole('togglebutton'));
  for (const button of screen.getAllByRole('togglebutton')) {
    expect(button).toHaveProp('accessibilityState', expect.objectContaining({ checked: true, busy: false }));
  }
  expect(fetchReadingList).toHaveBeenCalledTimes(2);
});

it('StrictMode와 화면 재진입은 중복 조회 없이 처리 중 마지막 입력을 유지한다', async () => {
  const write = deferred<ArticleBookmark>();
  const source = createMockBookmarkSource({ delayMs: 0 });
  const fetchReadingList = jest.fn(source.fetchReadingList);
  const setArticleSaved = jest.fn(source.setArticleSaved).mockReturnValueOnce(write.promise);
  const injected = { fetchReadingList, setArticleSaved };
  const user = userEvent.setup();
  const view = await render(<StrictMode><BookmarkProvider source={injected}>{control}</BookmarkProvider></StrictMode>);
  await waitFor(() => expect(getButton()).toBeEnabled());
  await user.press(getButton());
  expect(getButton()).toBeBusy();
  await user.press(getButton());
  expect(getButton()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  await view.rerender(<StrictMode><BookmarkProvider source={injected}><View /></BookmarkProvider></StrictMode>);
  await act(async () => write.resolve({ articleId, userId: 'example-reader', saved: true }));
  await view.rerender(<StrictMode><BookmarkProvider source={injected}>{control}</BookmarkProvider></StrictMode>);
  expect(getButton()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false, busy: false }));
  expect(fetchReadingList).toHaveBeenCalledTimes(1);
  expect(setArticleSaved.mock.calls.map(([input]) => input.saved)).toEqual([true, false]);
});

it.each(['success', 'failure'] as const)('공급부 교체 전 쓰기의 늦은 %s가 새 공급부의 선택을 덮지 않는다', async (outcome) => {
  const previous = deferred<ArticleBookmark>();
  const oldSource = { ...createMockBookmarkSource({ delayMs: 0 }), setArticleSaved: () => previous.promise };
  const nextSource = createMockBookmarkSource({ delayMs: 0 });
  const user = userEvent.setup();
  const view = await render(<BookmarkProvider source={oldSource}>{control}</BookmarkProvider>);
  await user.press(getButton());
  await view.rerender(<BookmarkProvider source={nextSource}>{control}</BookmarkProvider>);
  await user.press(getButton());
  await user.press(getButton());
  await act(async () => {
    if (outcome === 'success') previous.resolve({ articleId, userId: 'example-reader', saved: true });
    else previous.reject(new Error('old failure'));
  });
  expect(getButton()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false, busy: false }));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});

it('사용자 A의 저장 중 B로 이동했다 돌아와도 사용자별 상태와 진행 중 소유자를 유지한다', async () => {
  const previous = deferred<ArticleBookmark>();
  const mock = createMockBookmarkSource({ delayMs: 0 });
  const source: BookmarkSource = { ...mock, setArticleSaved: jest.fn(mock.setArticleSaved).mockReturnValueOnce(previous.promise) };
  const user = userEvent.setup();
  const view = await render(<BookmarkProvider source={source} userId="reader-a">{control}</BookmarkProvider>);
  await user.press(getButton());
  await view.rerender(<BookmarkProvider source={source} userId="reader-b">{control}</BookmarkProvider>);
  expect(getButton()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false, busy: false }));
  await view.rerender(<BookmarkProvider source={source} userId="reader-a">{control}</BookmarkProvider>);
  expect(getButton()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true, busy: true }));
  await user.press(getButton());
  await act(async () => previous.resolve({ articleId, userId: 'reader-a', saved: true }));
  expect(getButton()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false, busy: false }));
  await view.rerender(<BookmarkProvider source={source} userId="reader-b">{control}</BookmarkProvider>);
  expect(getButton()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false, busy: false }));
});

it('저장 실패 후 안내와 재시도를 제공하고 확정되면 오류를 제거한다', async () => {
  const user = userEvent.setup();
  await render(<BookmarkProvider source={createMockBookmarkSource({ delayMs: 0, scenario: 'save-error' })}>
    {control}
  </BookmarkProvider>);
  await user.press(getButton());
  expect(screen.getByRole('alert')).toHaveTextContent(/이전 상태로 돌아왔어요/);
  expect(getButton()).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  await user.press(screen.getByRole('button', { name: /^북마크 변경 다시 시도/ }));
  expect(getButton()).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});
