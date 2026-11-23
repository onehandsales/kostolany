import { act, render, screen, userEvent, waitFor, within } from '@testing-library/react-native';
import { AppState, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './AppNavigator';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockResponseSource } from '../../features/responses/data/createMockResponseSource';
import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import { createMockListeningSource } from '../../features/listening/createMockListeningSource';

const initialAppState = AppState.currentState;
beforeEach(() => { jest.useFakeTimers(); AppState.currentState = 'active'; });
afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); AppState.currentState = initialAppState; });
const panel = () => within(screen.getAllByLabelText('Responses 패널').at(-1)!);

async function openResponses(moderationSource = createMockModerationSource({ delay: 0 }),
  listeningSource = createMockListeningSource({ delayMs: 0 })) {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA}
    moderationSource={moderationSource}
    listeningSource={listeningSource}
    responseSource={createMockResponseSource({ delayMs: 0 })}
    feedSource={createMockFeedSource({ delayMs: 0, catalog: {
      latest: mediumArticles.filter(article => article.id === 'medium-brain'), popular: [], recommended: [],
    } })} articleSource={createMockArticleSource({ delayMs: 0 })} />
  </SafeAreaProvider>);
  await user.press(await screen.findByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  await user.press(await screen.findByRole('button', { name: 'Responses' }));
  await panel().findByRole('heading', { name: 'Responses (7)' });
  return user;
}

it('정책 진입과 중첩 응답 후 원래 초안·정렬·답글 접힘을 보존하고 기사에 복귀한다', async () => {
  const user = await openResponses();
  await user.press(panel().getByRole('button', { name: 'Reply to Bérnie' }));
  await user.type(screen.getByLabelText('응답 내용'), '정책을 읽고 이어 쓸 초안');
  await user.press(screen.getByRole('button', { name: 'Hide replies, brain-bernie' }));
  await user.press(screen.getByRole('button', { name: '응답 정렬 선택' }));
  await user.press(screen.getByRole('radio', { name: 'Most Recent' }));
  await user.press(screen.getByRole('button', { name: 'Medium policy' }));
  expect(await screen.findByRole('heading', { name: 'Medium Rules' })).toBeVisible();
  expect(screen.queryByLabelText('응답 내용')).toBeNull();
  await user.press(screen.getByRole('button', { name: '정책 기사 Responses' }));
  await screen.findByRole('heading', { name: 'Responses (0)' });
  await user.type(screen.getByLabelText('응답 내용'), '정책 mock 응답');
  await user.press(screen.getByRole('button', { name: '응답 게시' }));
  await screen.findByRole('heading', { name: 'Responses (1)' });
  await user.press(screen.getByRole('button', { name: 'Responses 닫기' }));
  expect(screen.getByRole('button', { name: '정책 기사 Responses' })).toHaveTextContent('1');
  await user.press(screen.getByRole('button', { name: 'Responses로 돌아가기' }));
  expect(screen.getByLabelText('응답 내용')).toHaveDisplayValue('정책을 읽고 이어 쓸 초안');
  expect(panel().getByText('Replying to Bérnie')).toBeVisible();
  expect(screen.getByText('Most Recent')).toBeVisible();
  expect(panel().getByRole('button', { name: 'Show replies, brain-bernie' })).toBeVisible();
  expect(panel().getByRole('heading', { name: 'Responses (7)' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Responses 닫기' }));
  expect(screen.getByRole('heading', { name: 'ChatGPT Is Poisoning Your Brain...' })).toBeVisible();
}, 30000);

it('정책 모달 안에서도 듣기 실패 재시도·확장·접기·닫기를 실행한다', async () => {
  const user = await openResponses(undefined, createMockListeningSource({ delayMs: 0, failures: 1 }));
  await user.press(screen.getByRole('button', { name: 'Medium policy' }));
  await user.press(panel().getByRole('button', { name: 'Listen' }));
  await user.press(await panel().findByRole('button', { name: '듣기 다시 시도' }));
  await panel().findByRole('button', { name: 'Listen 일시정지' });
  await user.press(panel().getByRole('button', { name: '플레이어 확장: Medium Rules' }));
  await user.press(await screen.findByRole('button', { name: '플레이어 접기' }));
  await user.press(panel().getByRole('button', { name: '플레이어 닫기' }));
  expect(panel().queryByRole('button', { name: '플레이어 확장: Medium Rules' })).toBeNull();
  expect(panel().getByRole('button', { name: 'Listen' })).toBeVisible();
}, 30000);

it('차단한 정책 작성자의 본문과 도구를 숨기고 원래 응답으로 돌아간다', async () => {
  const source = createMockModerationSource({ delay: 0 });
  await source.execute(mockUserA.id, { operationId: 'policy-block',
    action: { kind: 'block', writerId: 'medium-policy-author', active: true } });
  const user = await openResponses(source);
  await user.press(screen.getByRole('button', { name: 'Medium policy' }));
  expect(await screen.findByText(/차단한 작가의 기사예요/)).toBeVisible();
  expect(screen.queryByRole('heading', { name: 'Medium Rules' })).toBeNull();
  expect(screen.queryByRole('button', { name: '정책 기사 공유' })).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Responses로 돌아가기' }));
  expect(panel().getByRole('heading', { name: 'Responses (7)' })).toBeVisible();
}, 30000);

it.each(['Responses', '본문 응답 정책'])('%s에서 연 정책의 View story 이동 후 이전 모달을 닫고 복귀 후에도 되살리지 않는다', async (entry) => {
  const user = await openResponses();
  if (entry === '본문 응답 정책') {
    await user.press(screen.getByRole('button', { name: 'Responses 닫기' }));
    await user.press(screen.getByRole('button', { name: entry }));
  } else await user.press(screen.getByRole('button', { name: 'Medium policy' }));
  await user.press(panel().getByRole('button', { name: 'Listen' }));
  await panel().findByRole('button', { name: 'Listen 일시정지' });
  await user.press(panel().getByRole('button', { name: '플레이어 확장: Medium Rules' }));
  await user.press(screen.getByRole('button', { name: '플레이어 더보기' }));
  await user.press(screen.getByRole('button', { name: 'View story' }));
  await waitFor(() => expect(screen.queryByLabelText('Responses 패널', { includeHiddenElements: true })).toBeNull());
  await user.press(screen.getByRole('button', { name: '이전 화면으로 돌아가기' }));
  expect(screen.getByRole('heading', { name: 'ChatGPT Is Poisoning Your Brain...' })).toBeVisible();
  expect(screen.queryByLabelText('Responses 패널')).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Responses' }));
  expect(await panel().findByRole('heading', { name: 'Responses (7)' })).toBeVisible();
}, 30000);

it('정책 듣기를 같은 플레이어에 연결하고 작성자 프로필에서 원래 기사로 돌아간다', async () => {
  const user = await openResponses();
  await user.press(screen.getByRole('button', { name: 'Medium policy' }));
  await user.press(panel().getByRole('button', { name: 'Listen' }));
  await user.press(await panel().findByRole('button', { name: 'Listen 일시정지' }));
  await panel().findByRole('button', { name: 'Listen' });
  await user.press(screen.getByRole('button', { name: 'Open Medium profile' }));
  await user.press(await screen.findByRole('button', { name: 'Back from profile' }));
  expect(screen.getByRole('heading', { name: 'ChatGPT Is Poisoning Your Brain...' })).toBeVisible();
  expect(screen.queryByLabelText('Responses 패널')).toBeNull();
  expect(screen.getByRole('button', { name: '플레이어 확장: Medium Rules' })).toBeVisible();
}, 30000);

it('정책 링크의 늦은 실패는 재진입 화면에 남지 않고 현재 실패는 재시도로 복구한다', async () => {
  const user = await openResponses();
  const late = deferred<void>();
  jest.spyOn(Linking, 'openURL').mockImplementationOnce(() => late.promise)
    .mockRejectedValueOnce(new Error('current-failure')).mockResolvedValue(undefined);
  await user.press(screen.getByRole('button', { name: 'Medium policy' }));
  await user.press(screen.getByRole('link', { name: '현재 Medium Rules 열기' }));
  await user.press(screen.getByRole('button', { name: 'Responses로 돌아가기' }));
  await user.press(screen.getByRole('button', { name: 'Medium policy' }));
  await act(async () => late.reject(new Error('late-failure')));
  expect(screen.queryByRole('alert')).toBeNull();
  await user.press(screen.getByRole('link', { name: '현재 Medium Rules 열기' }));
  expect(screen.getByRole('alert')).toHaveTextContent(/링크를 열지 못했어요/);
  await user.press(screen.getByRole('link', { name: '현재 Medium Rules 열기' }));
  await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
}, 30000);

it('정책의 팔로우·박수·저장이 같은 ID로 유지되고 Library에서 정책 본문을 다시 연다', async () => {
  const user = await openResponses();
  await user.press(screen.getByRole('button', { name: 'Medium policy' }));
  await user.press(await screen.findByRole('button', { name: 'Follow Medium' }));
  await screen.findByRole('button', { name: 'Following Medium' });
  await user.press(screen.getByRole('button', { name: 'Following Medium options 닫기' }));
  await waitFor(() => expect(screen.getByRole('button', { name: '박수 보내기, Medium Rules' })).toBeEnabled());
  await user.press(screen.getByRole('button', { name: '박수 보내기, Medium Rules' }));
  await screen.findByRole('button', { name: '박수 목록, Medium Rules, 54001회' });
  await user.press(screen.getByRole('togglebutton', { name: /^북마크, Medium Rules,/ }));
  await user.press(await screen.findByRole('checkbox', { name: '읽기 목록' }));
  await user.press(screen.getByRole('button', { name: '저장할 목록 적용' }));
  await waitFor(() => expect(screen.getByRole('togglebutton', { name: /^북마크, Medium Rules,/ }))
    .toHaveProp('accessibilityState', expect.objectContaining({ checked: true })));
  await user.press(screen.getByRole('button', { name: 'Responses로 돌아가기' }));
  await user.press(screen.getByRole('button', { name: 'Responses 닫기' }));
  await user.press(screen.getByRole('button', { name: '홈으로 돌아가기' }));
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' }));
  await user.press(await screen.findByRole('button', { name: /^Medium Rules,/ }));
  await screen.findByRole('heading', { name: 'Medium Rules' });
  expect(screen.getByRole('button', { name: 'Following Medium' })).toBeVisible();
  expect(screen.getByRole('button', { name: '박수 목록, Medium Rules, 54001회' })).toBeVisible();
  await user.press(screen.getByRole('button', { name: '이전 화면으로 돌아가기' }));
  expect(await screen.findByRole('button', { name: /^Medium Rules,/ })).toBeVisible();
}, 30000);
