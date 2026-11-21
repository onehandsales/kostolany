import { act, render, screen, userEvent, waitFor, within } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { createMockResponseSource } from '../../features/responses/data/createMockResponseSource';
import { AppNavigator } from './AppNavigator';

const title = 'ChatGPT Is Poisoning Your Brain...';
const target = { kind: 'article' as const, id: 'medium-brain' };
// 가상 목록의 지연 갱신을 사용자 동작과 같은 테스트 시간 경계에서 진행한다.
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
it('실제 navigation에서 댓글 작성·답글·편집 취소/저장·삭제 취소/확정·정렬 후 기사와 홈에 복귀한다', async () => {
  const source = createMockResponseSource({ delayMs: 0, scenario: 'write-error' });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        responseSource={source}
        feedSource={createMockFeedSource({
          delayMs: 0,
          catalog: {
            latest: mediumArticles.filter((article) => article.id === target.id),
            popular: [],
            recommended: [],
          },
        })}
        articleSource={createMockArticleSource({ delayMs: 0 })}
      />
    </SafeAreaProvider>,
  );
  await user.press(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  await user.press(await screen.findByRole('button', { name: 'Responses' }));
  const panel = () => within(screen.getByLabelText('Responses 패널', { exact: true }));
  await panel().findByRole('heading', { name: 'Responses (7)' });
  await user.type(panel().getByLabelText('응답 내용'), '새로운 한국어 응답');
  await user.press(panel().getByRole('button', { name: '응답 게시' }));
  await panel().findByText(/저장하지 못했어요/);
  expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue('새로운 한국어 응답');
  await user.press(panel().getByRole('button', { name: '응답 게시' }));
  await panel().findByRole('heading', { name: 'Responses (8)' });
  const reading = source.read({ userId: mockUserA.id, target });
  await act(async () => { await jest.advanceTimersByTimeAsync(1); });
  const own = (await reading).responses.find(
    (response) => response.authorId === mockUserA.id,
  )!;
  await user.press(panel().getAllByRole('button', { name: /response options$/ })[0]!);
  await user.press(screen.getByRole('button', { name: `Edit response, ${own.id}` }));
  await user.clear(panel().getByLabelText('응답 내용'));
  await user.type(panel().getByLabelText('응답 내용'), '취소할 내용');
  await user.press(panel().getByRole('button', { name: '응답 작성 취소' }));
  expect(panel().getByText('새로운 한국어 응답')).toBeVisible();
  await user.press(panel().getAllByRole('button', { name: /response options$/ })[0]!);
  await user.press(screen.getByRole('button', { name: `Edit response, ${own.id}` }));
  await user.clear(panel().getByLabelText('응답 내용'));
  await user.type(panel().getByLabelText('응답 내용'), '저장된 수정');
  await user.press(panel().getByRole('button', { name: '응답 수정 저장' }));
  await panel().findByText('저장된 수정');
  await user.press(panel().getByRole('button', { name: 'Reply to Bérnie' }));
  await user.type(panel().getByLabelText('응답 내용'), '답글입니다');
  await user.press(panel().getByRole('button', { name: '응답 게시' }));
  await panel().findByText('답글입니다');
  await user.press(panel().getAllByRole('button', { name: /response options$/ })[0]!);
  await user.press(screen.getByRole('button', { name: `Delete response, ${own.id}` }));
  await user.press(panel().getByRole('button', { name: '응답 삭제 취소' }));
  expect(panel().getByText('저장된 수정')).toBeVisible();
  await user.press(panel().getAllByRole('button', { name: /response options$/ })[0]!);
  await user.press(screen.getByRole('button', { name: `Delete response, ${own.id}` }));
  await user.press(panel().getByRole('button', { name: '응답 삭제 확인' }));
  await panel().findByRole('heading', { name: 'Responses (7)' });
  await user.press(panel().getByRole('button', { name: '응답 정렬 선택' }));
  await user.press(screen.getByRole('radio', { name: 'Most Recent' }));
  await user.press(panel().getByRole('button', { name: 'Medium policy' }));
  await panel().findByRole('heading', { name: 'Medium Rules' });
  await user.press(panel().getByRole('button', { name: 'Responses로 돌아가기' }));
  expect(panel().getByText('Most Recent')).toBeVisible();
  await user.press(panel().getByRole('button', { name: 'Responses 닫기' }));
  expect(await screen.findByRole('heading', { name: title })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '본문 응답 정책' }));
  expect(await panel().findByRole('heading', { name: 'Medium Rules' })).toBeVisible();
  await user.press(panel().getByRole('button', { name: 'Responses로 돌아가기' }));
  expect(panel().getByRole('heading', { name: 'Responses (7)' })).toBeVisible();
  await user.press(panel().getByRole('button', { name: 'Responses 닫기' }));
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  expect(await screen.findByRole('button', { name: `Responses, ${title}` })).toHaveTextContent('7');
}, 30000);

it('비로그인 응답 작성에서 로그인 취소는 패널을 유지하고 로그인 성공은 개인 행동을 자동 제출하지 않는다', async () => {
  const source = createMockResponseSource({ delayMs: 0 });
  const execute = jest.spyOn(source, 'execute');
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        responseSource={source}
        feedSource={createMockFeedSource({
          delayMs: 0,
          catalog: {
            latest: mediumArticles.filter((article) => article.id === target.id),
            popular: [],
            recommended: [],
          },
        })}
        articleSource={createMockArticleSource({ delayMs: 0 })}
      />
    </SafeAreaProvider>,
  );
  await user.press(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  await user.press(await screen.findByRole('button', { name: 'Responses' }));
  await user.press(await screen.findByRole('button', { name: '댓글 작성 로그인' }));
  await user.press(screen.getByRole('button', { name: '로그인 닫기' }));
  expect(screen.getByLabelText('Responses 패널')).toBeVisible();
  await user.press(screen.getByRole('button', { name: '댓글 작성 로그인' }));
  await user.press(screen.getByRole('radio', { name: mockUserA.name }));
  await user.press(screen.getByRole('button', { name: 'Google로 로그인 (모의)' }));
  await waitFor(() => expect(screen.queryByRole('button', { name: '로그인 닫기' })).toBeNull());
  expect(screen.queryByLabelText('Responses 패널')).toBeNull();
  expect(await screen.findByRole('heading', { name: title })).toBeVisible();
  expect(execute).not.toHaveBeenCalled();
}, 15000);
