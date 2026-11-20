import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockClapSource } from '../../features/reactions/data/createMockClapSource';
import type { ClapValue } from '../../features/reactions/types';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { AppNavigator } from './AppNavigator';

const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const getClap = () => screen.getByRole('button', { name: new RegExp(`^박수 보내기, ${title}`) });

it('홈에서 처리 중 상세로 이동해 해제한 마지막 의도가 목록과 검색·상세 재진입까지 유지된다', async () => {
  const user = userEvent.setup();
  const pending = deferred<ClapValue>();
  const source = createMockClapSource({ delayMs: 0 });
  const save = jest.fn(source.save).mockReturnValueOnce(pending.promise);
  const read = jest.fn(source.read);
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} feedSource={createMockFeedSource({ delayMs: 0 })}
    articleSource={createMockArticleSource({ delayMs: 0 })} searchSource={createMockSearchSource({ delayMs: 0 })}
    clapSource={{ read, save }} /></SafeAreaProvider>);
  await waitFor(() => expect(getClap()).toBeEnabled());
  await user.press(getClap());
  expect(getClap()).toHaveTextContent('25');
  expect(screen.getByRole('heading', { name: '홈' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: new RegExp(`^${title}`) }));
  await screen.findByRole('heading', { name: title });
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 }));
  expect(getClap()).toBeBusy();
  await user.press(screen.getByRole('button', { name: '내 박수 모두 취소' }));
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 0 }));
  expect(getClap()).toHaveTextContent('24');
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  await act(async () => pending.resolve({ target: { kind: 'article', id: 'example-latest-rates' }, userId: mockUserA.id, mine: 1, total: 25 }));
  await waitFor(() => expect(getClap()).not.toBeBusy());
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 0 }));
  expect(getClap()).toHaveTextContent('24');
  expect(save.mock.calls.map(([input]) => input.mine)).toEqual([1, 0]);

  await user.press(screen.getByRole('tab', { name: '탐색' }));
  await user.press(screen.getByRole('button', { name: '기사 검색 열기' }));
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), '금리');
  await waitFor(() => expect(getClap()).toBeEnabled());
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 0 }));
  await user.press(getClap());
  await user.press(screen.getByRole('button', { name: new RegExp(`^${title}`) }));
  await screen.findByRole('heading', { name: title });
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 }));
  expect(getClap()).toHaveTextContent('25');
  await user.press(screen.getByRole('button', { name: '탐색으로 돌아가기' }));
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('금리');
  expect(screen.getByText('2개')).toBeVisible();
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 }));
  await user.press(screen.getByRole('tab', { name: '홈' }));
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 }));
  expect(getClap()).toHaveTextContent('25');
  expect(read.mock.calls.filter(([input]) => input.target.id === 'example-latest-rates')).toHaveLength(1);
});

it('상세를 떠난 뒤 실패해도 홈에서 상태가 복구되고 재시도 후 상세와 일치한다', async () => {
  const pending = deferred<ClapValue>();
  const source = createMockClapSource({ delayMs: 0 });
  const save = jest.fn(source.save).mockReturnValueOnce(pending.promise);
  const user = userEvent.setup();
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} feedSource={createMockFeedSource({ delayMs: 0 })}
    articleSource={createMockArticleSource({ delayMs: 0 })} clapSource={{ ...source, save }} /></SafeAreaProvider>);
  await user.press(await screen.findByRole('button', { name: new RegExp(`^${title}`) }));
  await waitFor(() => expect(getClap()).toBeEnabled());
  await user.press(getClap());
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  await act(async () => pending.reject(new Error('not applied')));
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 0 }));
  expect(getClap()).toHaveTextContent('24');
  expect(screen.getByRole('alert')).toHaveTextContent(/박수를 저장하지 못했어요/);
  await user.press(screen.getByRole('button', { name: new RegExp(`^박수 다시 시도, ${title}`) }));
  await user.press(screen.getByRole('button', { name: new RegExp(`^${title}`) }));
  await screen.findByRole('heading', { name: title });
  expect(getClap()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 }));
  expect(getClap()).toHaveTextContent('25');
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});
