import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockDraftSource } from '../../features/editor/draftSource';
import { changeBody, emptyEditor } from '../../features/editor/editorModel';
import { emptyPublishOptions } from '../../features/editor/publishing';
import { publishedArticleId } from '../../features/editor/publishedArticle';
import { createMockReadingHistorySource } from '../../features/reading-history/data/createMockReadingHistorySource';
import { AppNavigator } from './AppNavigator';
import { darkColors, fonts } from '../../shared/theme/tokens';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { mediumArticles } from '../../features/feed/data/mediumFixtures';
import { createMockResponseSource } from '../../features/responses/data/createMockResponseSource';
import { createResponseComparisonCounts } from '../../features/responses/data/responsePreview';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1200); });
const button = (name: string | RegExp) => screen.getByRole('button', { name });

it('알림의 일반 기사를 이력에서 재열고 개별 삭제와 전체 삭제를 실제 탐색으로 연결한다', async () => {
  const history = createMockReadingHistorySource({ delayMs: 0 });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} historySource={history} /></SafeAreaProvider>);
  await flush(); await user.press(button('Notifications')); await flush();
  await user.press(button(/clapped for.*기준금리/)); await flush();
  await waitFor(async () => expect((await history.read(mockUserA.id)).visits.map(item => item.articleId)).toContain('example-latest-rates'));
  await user.press(button('알림으로 돌아가기')); await user.press(button('알림에서 홈으로 돌아가기'));
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('tab', { name: 'Reading history' })); await flush();
  expect(screen.queryByText('Story unavailable')).toBeNull();
  const visit = (await history.read(mockUserA.id)).visits;
  expect(visit.map(item => item.articleId)).toContain('example-latest-rates');
  expect(button(/^금리가 오르면/)).toBeVisible();
  await user.press(button(/^금리가 오르면/)); await flush();
  expect(button('읽기 이력으로 돌아가기')).toBeVisible();
  await user.press(button('읽기 이력으로 돌아가기'));
  await user.press(button('Remove from history, 금리가 오르면 예금과 대출에는 어떤 일이 생길까'));
  await user.press(button('Cancel history removal'));
  expect(button(/^금리가 오르면/)).toBeVisible();
  await user.press(button('Remove from history, 금리가 오르면 예금과 대출에는 어떤 일이 생길까')); await user.press(button('Confirm history removal')); await flush();
  expect((await history.read(mockUserA.id)).visits).toEqual([]);
  expect(screen.queryByLabelText(/읽음, 금리가/)).toBeNull();
  await user.press(button('Explore')); await flush(); expect(screen.getByRole('tab', { name: '탐색' })).toBeSelected();
}, 30000);

it.each([false, true])('발행 글 unlisted=%s의 설정·Viewed·이력 재열기와 전체 삭제를 연결한다', async unlisted => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  const history = createMockReadingHistorySource({ delayMs: 0 });
  const title = '이력과 읽기 설정을 공유하는 긴 한국어 발행 제목';
  const command = { userId: mockUserA.id, draftId: drafts.newId(mockUserA.id), operationId: 'publish',
    document: { ...changeBody(emptyEditor(), '내가 발행한 긴 한국어 본문을 설정에 맞게 다시 읽습니다.').document, title },
    publishing: { ...emptyPublishOptions(), unlisted }, authorName: mockUserA.name };
  await drafts.save(command, new AbortController().signal);
  const story = await drafts.publish(command, new AbortController().signal);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} draftSource={drafts} historySource={history} /></SafeAreaProvider>);
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush();
  if (unlisted) { await user.press(button('Public stories')); await user.press(screen.getByRole('radio', { name: 'Unlisted' })); await flush(); }
  await user.press(button(`${title} 발행한 글 열기`)); await flush();
  await user.press(button(`Story options, ${title}`)); await user.press(button('발행 글 표시 설정'));
  await user.press(button('글자 크기 키우기')); await user.press(button('글꼴 선택 열기'));
  await user.press(screen.getByRole('radio', { name: '글꼴: Sans serif' }));
  await user.press(button('기사 테마 선택 열기')); await user.press(screen.getByRole('radio', { name: '기사 테마: Dark' }));
  await user.press(button('기사 표시 설정 닫기')); await flush();
  expect(screen.getByRole('heading', { name: title })).toHaveStyle({ fontSize: 38.4, color: darkColors.text });
  await waitFor(async () => expect((await history.read(mockUserA.id)).visits.map(item => item.articleId)).toContain(publishedArticleId(story.id)));
  await user.press(button('작성 글 뒤로'));
  expect(await screen.findByLabelText(`읽음, ${title}`)).toBeVisible();
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('tab', { name: 'Reading history' })); await flush();
  expect(button(new RegExp(`^${title}\\.`))).toBeVisible();
  expect((await history.read(mockUserA.id)).visits.map(item => item.articleId)).toContain(publishedArticleId(story.id));
  await user.press(button(new RegExp(`^${title}\\.`))); await flush();
  expect(screen.getByRole('heading', { name: title })).toHaveStyle({ fontSize: 38.4 });
  // 강조 span의 중첩 깊이와 무관하게 본문이 상속하는 실제 글꼴 스타일을 확인한다.
  let paragraph = screen.getByText(command.document.body);
  while (paragraph.parent && StyleSheet.flatten(paragraph.props.style)?.fontSize === undefined) paragraph = paragraph.parent;
  expect(paragraph).toHaveStyle({ fontSize: 18 * 1.2, lineHeight: 36, fontFamily: fonts.sans });
  await user.press(button('작성 글 뒤로')); await user.press(button('Clear history'));
  await user.press(button('Confirm history removal')); await flush();
  expect((await history.read(mockUserA.id)).visits).toEqual([]);
  expect(screen.getByText('You haven’t read any stories yet')).toBeVisible();
  expect((await drafts.story(story.id, new AbortController().signal))?.document).toEqual(command.document);
}, 30000);

it.each([false, true])('정책 기사 비교 모드 %s의 이력 재진입과 부모 초안 및 읽기 설정을 유지한다', async comparison => {
  const history = createMockReadingHistorySource({ delayMs: 0 });
  const responses = createMockResponseSource({ delayMs: 0,
    uncapturedCountFor: createResponseComparisonCounts('?parityResponses=reference-v1', comparison) });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} historySource={history} responseSource={responses}
    feedSource={createMockFeedSource({ delayMs: 0, catalog: { latest: mediumArticles.filter(item => item.id === 'medium-brain'), popular: [], recommended: [] } })} /></SafeAreaProvider>);
  await flush(); await user.press(button(/^ChatGPT Is Poisoning/)); await flush();
  await user.press(button('Responses')); await fireEvent.changeText(screen.getByLabelText('응답 내용'), '정책 확인 후 이어 쓸 초안');
  await user.press(button('Medium policy')); await flush();
  await user.press(button('정책 기사 Responses')); await flush();
  expect(screen.getByRole('heading', { name: `Responses (${comparison ? 272 : 0})` })).toBeVisible();
  await user.press(button('Responses 닫기'));
  await user.press(button('정책 기사 더보기')); await user.press(button('정책 기사 표시 설정'));
  await user.press(button('글자 크기 키우기')); await user.press(button('기사 표시 설정 닫기'));
  await user.press(button('Responses로 돌아가기')); expect(screen.getByLabelText('응답 내용')).toHaveDisplayValue('정책 확인 후 이어 쓸 초안');
  await user.press(button('Responses 닫기')); await user.press(button('홈으로 돌아가기'));
  await user.press(screen.getByRole('tab', { name: '라이브러리' })); await user.press(screen.getByRole('tab', { name: 'Reading history' })); await flush();
  await user.press(button(/^Medium Rules\./)); await flush();
  expect(screen.getByRole('heading', { name: 'Medium Rules' })).toHaveStyle({ fontSize: 38.4 });
  expect((await history.read(mockUserA.id)).visits.map(item => item.articleId)).toContain('medium-rules');
  await user.press(button('이전 화면으로 돌아가기')); expect(screen.getByRole('tab', { name: 'Reading history' })).toBeSelected();
}, 30000);
