import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { StrictMode } from 'react';

import { deferred } from '../feed/tests/helpers';
import { ArticleLikeControl } from './ArticleLikeControl';
import { createMockLikeSource, MOCK_READER_ID } from './data/createMockLikeSource';
import { LikeProvider } from './LikeProvider';
import type { ArticleLike, LikeSource } from './types';

const articleId = 'example-latest-exchange';
const title = '아주 긴 한국어 기사 제목도 좋아요 접근성 이름에서 생략하지 않습니다';
const control = <ArticleLikeControl articleId={articleId} articleTitle={title} />;
const initial: ArticleLike = { articleId, userId: MOCK_READER_ID, count: 0, isLiked: false };

it('같은 기사 두 영역의 선택·수치·접근성·처리 상태가 연속 입력과 동시에 일치한다', async () => {
  const pending = deferred<ArticleLike>();
  const source = createMockLikeSource({ delayMs: 0 });
  const setArticleLiked = jest.fn(source.setArticleLiked).mockReturnValueOnce(pending.promise);
  await render(<LikeProvider source={{ ...source, setArticleLiked }}>{control}{control}</LikeProvider>);
  await waitFor(() => expect(screen.getAllByRole('togglebutton')[0]).toBeEnabled());
  const button = screen.getAllByRole('togglebutton')[0]!;
  await act(async () => {
    await fireEvent.press(button);
    await fireEvent.press(button);
    await fireEvent.press(button);
  });
  for (const item of screen.getAllByRole('togglebutton')) {
    expect(item).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
    expect(item).toBeBusy();
    expect(item).toBeEnabled();
    expect(item).toHaveAccessibleName(`좋아요, ${title}, 1개, 선택됨, 처리 중`);
    expect(item).toHaveTextContent('1');
  }
  expect(setArticleLiked).toHaveBeenCalledTimes(1);
  await act(async () => pending.resolve({ ...initial, isLiked: true, count: 1 }));
  for (const item of screen.getAllByRole('togglebutton')) {
    expect(item).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
    expect(item).not.toBeBusy();
    expect(item).toHaveTextContent('1');
  }
});

it('변경 실패 안내와 복구 수치를 표시하고 재시도하면 동일 목표가 선택된다', async () => {
  const user = userEvent.setup();
  await render(<LikeProvider source={createMockLikeSource({ scenario: 'write-error', delayMs: 0 })}>{control}</LikeProvider>);
  await waitFor(() => expect(screen.getByRole('togglebutton')).toBeEnabled());
  await user.press(screen.getByRole('togglebutton'));
  expect(await screen.findByRole('alert')).toHaveTextContent(/이전 상태로 돌아왔어요/);
  expect(screen.getByRole('togglebutton')).toHaveProp('accessibilityState', expect.objectContaining({ checked: false }));
  expect(screen.getByRole('togglebutton')).toHaveTextContent('0');
  await user.press(screen.getByRole('button', { name: /^좋아요 변경 다시 시도/ }));
  await waitFor(() => expect(screen.getByRole('togglebutton')).toHaveProp('accessibilityState', expect.objectContaining({ checked: true })));
  expect(screen.getByRole('togglebutton')).toHaveTextContent('1');
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});

it('최초 조회 실패는 수치를 추측하지 않고 조회 재시도 후 조작을 허용한다', async () => {
  await render(<LikeProvider source={createMockLikeSource({ scenario: 'read-error', delayMs: 0 })}>{control}</LikeProvider>);
  expect(await screen.findByRole('alert')).toHaveTextContent(/정보를 불러오지 못했어요/);
  expect(screen.getByRole('togglebutton')).toBeDisabled();
  expect(screen.getByRole('togglebutton')).toHaveTextContent('—');
  await userEvent.setup().press(screen.getByRole('button', { name: /^좋아요 조회 다시 시도/ }));
  await waitFor(() => expect(screen.getByRole('togglebutton')).toBeEnabled());
  expect(screen.getByRole('togglebutton')).toHaveTextContent('0');
});

it.each(['success', 'failure'] as const)('공급부 교체 전 쓰기의 늦은 %s가 새 확정 상태를 덮지 않는다', async (result) => {
  const old = deferred<ArticleLike>();
  const oldSource: LikeSource = { fetchArticleLike: async () => initial, setArticleLiked: () => old.promise };
  const currentSource = createMockLikeSource({ delayMs: 0 });
  await render(<LikeProvider source={oldSource}>{control}</LikeProvider>);
  await waitFor(() => expect(screen.getByRole('togglebutton')).toBeEnabled());
  await userEvent.setup().press(screen.getByRole('togglebutton'));
  await screen.rerender(<LikeProvider source={currentSource}>{control}</LikeProvider>);
  await waitFor(() => expect(screen.getByRole('togglebutton')).toBeEnabled());
  await userEvent.setup().press(screen.getByRole('togglebutton'));
  await waitFor(() => expect(screen.getByRole('togglebutton')).not.toBeBusy());
  await act(async () => result === 'success' ? old.resolve({ ...initial, isLiked: true, count: 99 }) : old.reject(new Error('obsolete')));
  expect(screen.getByRole('togglebutton')).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  expect(screen.getByRole('togglebutton')).toHaveTextContent('1');
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});

it('StrictMode와 구독 화면 재진입에서도 조회를 중복하지 않고 상태를 유지한다', async () => {
  const source = createMockLikeSource({ delayMs: 0 });
  const fetchArticleLike = jest.fn(source.fetchArticleLike);
  const adapter = { ...source, fetchArticleLike };
  await render(<StrictMode><LikeProvider source={adapter}>{control}</LikeProvider></StrictMode>);
  await waitFor(() => expect(screen.getByRole('togglebutton')).toBeEnabled());
  await userEvent.setup().press(screen.getByRole('togglebutton'));
  await screen.rerender(<StrictMode><LikeProvider source={adapter}>{null}</LikeProvider></StrictMode>);
  await screen.rerender(<StrictMode><LikeProvider source={adapter}>{control}</LikeProvider></StrictMode>);
  expect(screen.getByRole('togglebutton')).toHaveProp('accessibilityState', expect.objectContaining({ checked: true }));
  expect(fetchArticleLike).toHaveBeenCalledTimes(1);
});

it('긴 한국어 접근성 이름을 유지하고 터치 목표와 글자 확대 허용을 제공한다', async () => {
  await render(<LikeProvider source={createMockLikeSource({ delayMs: 0 })}>{control}</LikeProvider>);
  await waitFor(() => expect(screen.getByRole('togglebutton')).toBeEnabled());
  expect(screen.getByRole('togglebutton')).toHaveStyle({ minHeight: 48, minWidth: 48 });
  expect(screen.getByRole('togglebutton')).toHaveAccessibleName(`좋아요, ${title}, 0개, 선택 안 됨`);
  expect(screen.getByText('좋아요').props.allowFontScaling).not.toBe(false);
});
