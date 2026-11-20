import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockDraftSource } from '../../features/editor/draftSource';
import { emptyEditor } from '../../features/editor/editorModel';
import { emptyPublishOptions } from '../../features/editor/publishing';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockStoryStatsSource } from '../../features/story-stats/createMockStoryStatsSource';
import type { MonthlyStats, StoryStatsSource } from '../../features/story-stats/types';
import { SessionNavigation } from './AppNavigator';

beforeEach(() => { jest.useFakeTimers(); jest.setSystemTime(new Date('2026-11-21T00:00:00Z')); });
afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1200); });

function AuthProbe({ onStore }: { onStore: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => onStore(store), [store, onStore]); return null;
}

async function setup(source: StoryStatsSource | undefined, drafts = createMockDraftSource({ delayMs: 0 })) {
  let auth: AuthStore | undefined;
  const authSource = createMockAuthSource({ delayMs: 0 });
  const onStore = (value: AuthStore) => { auth = value; };
  const app = (statsSource: StoryStatsSource | undefined) => <SafeAreaProvider><AuthProvider source={authSource} initialUser={mockUserA}>
    <SessionNavigation statsSource={statsSource} draftSource={drafts} /><AuthProbe onStore={onStore} />
  </AuthProvider></SafeAreaProvider>;
  const view = await render(app(source));
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush();
  await user.press(button('View stats')); await flush();
  if (!auth) throw new Error('missing-auth-store');
  return { user, auth, view, replace: (next: StoryStatsSource) => view.rerender(app(next)) };
}

async function seed(drafts: ReturnType<typeof createMockDraftSource>, userId: string, title: string, unlisted = false) {
  const draftId = drafts.newId(userId); const document = { ...emptyEditor().document, title, body: '실제 작성 문서 본문' };
  const publishing = { ...emptyPublishOptions(), unlisted }; const signal = new AbortController().signal;
  await drafts.save({ draftId, userId, document, publishing, operationId: `save-${draftId}` }, signal);
  return drafts.publish({ draftId, userId, document, publishing, authorName: '작성자', operationId: `publish-${draftId}` }, signal);
}

it('실제 프로필→통계→월·날짜·정렬→내 글→뒤로는 선택을 보존하고 공개·Unlisted를 소유자별로 연결한다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  await seed(drafts, mockUserA.id, 'A 공개 글'); await seed(drafts, mockUserA.id, 'A 링크 글', true); await seed(drafts, mockUserB.id, 'B 글');
  const { user } = await setup(undefined, drafts);
  expect(button('A 공개 글 통계에서 글 열기')).toBeOnTheScreen();
  expect(button('A 링크 글 통계에서 글 열기')).toBeOnTheScreen();
  expect(screen.queryByRole('button', { name: 'B 글 통계에서 글 열기' })).not.toBeOnTheScreen();
  await user.press(button('통계 월 선택, Nov 2026')); await user.press(screen.getByRole('radio', { name: 'Feb 2026' })); await flush();
  await user.press(button('통계 더보기')); await user.press(button('날짜별 수치 보기'));
  await user.press(screen.getByRole('radio', { name: 'Feb 2, 2026 · Views 0 · Reads 0' }));
  await user.press(button('통계 정렬 선택, Latest')); await user.press(screen.getByRole('radio', { name: 'Reads' })); await flush();
  await user.press(button('A 링크 글 통계에서 글 열기')); await flush();
  expect(screen.getByText('실제 작성 문서 본문')).toBeVisible();
  await user.press(button('작성 글 뒤로')); await flush();
  expect(button('통계 정렬 선택, Reads')).toBeVisible();
  expect(screen.getByRole('heading', { name: 'Feb 2, 2026' })).toBeVisible();
  await user.press(button('통계 월 선택, Feb 2026')); await user.press(screen.getByRole('radio', { name: 'Mar 2026' })); await flush();
  expect(screen.getByRole('heading', { name: 'Monthly' })).toBeVisible();
  await user.press(button('통계에서 프로필로 돌아가기')); expect(button('프로필 편집')).toBeVisible();
});

it.each(['success', 'failure'] as const)('통계 조회 중 A→B→A와 같은 A 재로그인 뒤 늦은 %s는 이전 개인 화면을 노출하지 않는다', async outcome => {
  const drafts = createMockDraftSource({ delayMs: 0 }); const base = createMockStoryStatsSource(drafts);
  const pending = deferred<MonthlyStats>(); let first = true;
  const source: StoryStatsSource = { ...base, readMonthly: (userId, month, signal) => {
    if (first) { first = false; return pending.promise; } return base.readMonthly(userId, month, signal);
  } };
  const { user, auth } = await setup(source, drafts);
  async function switchUser(id: string) {
    await act(async () => { auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'profile' }); await auth.signIn(id); }); await flush();
  }
  await user.press(button('통계 월 선택, Nov 2026'));
  await switchUser(mockUserB.id);
  expect(screen.queryByRole('heading', { name: 'Your story stats', includeHiddenElements: true })).not.toBeOnTheScreen();
  expect(button('View stats')).toBeVisible(); await user.press(button('View stats')); await flush();
  await act(async () => {
    if (outcome === 'failure') pending.reject(new Error('late A'));
    else pending.resolve(await base.readMonthly(mockUserA.id, '2026-11', new AbortController().signal));
  });
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  expect(screen.getByLabelText('선택 기간 Views 0')).toBeVisible();
  await switchUser(mockUserA.id); await user.press(button('View stats')); await flush();
  await switchUser(mockUserA.id);
  expect(screen.queryByRole('heading', { name: 'Your story stats', includeHiddenElements: true })).not.toBeOnTheScreen();
  expect(screen.queryByRole('dialog', { name: '통계 월 선택', includeHiddenElements: true })).not.toBeOnTheScreen();
});

it('부분 실패·재시도·메뉴 취소·source 교체와 잘못된 소유자의 글 응답을 실제 화면에서 격리한다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 }); const story = await seed(drafts, mockUserA.id, '조회할 글');
  const base = createMockStoryStatsSource(drafts, { monthlyFailures: 1 });
  const { user, replace } = await setup(base, drafts);
  expect(button('월간 통계 다시 시도')).toBeVisible(); expect(button('조회할 글 통계에서 글 열기')).toBeOnTheScreen();
  await user.press(button('월간 통계 다시 시도')); await flush();
  await user.press(button('통계 월 선택, Nov 2026')); await user.press(button('통계 이전 연도'));
  await user.press(button('통계 월 선택 닫기')); expect(button('통계 월 선택, Nov 2026')).toBeVisible();
  await user.press(button('통계 정렬 선택, Latest')); await user.press(screen.getByRole('radio', { name: 'Views' })); await flush();
  await replace(createMockStoryStatsSource(drafts)); await flush();
  expect(button('통계 정렬 선택, Latest')).toBeVisible();
  const read = drafts.story; drafts.story = async () => ({ ...story, userId: mockUserB.id });
  await user.press(button('조회할 글 통계에서 글 열기')); await flush();
  expect(screen.getByRole('alert')).toHaveTextContent('글을 불러오지 못했어요.');
  expect(screen.queryByText('실제 작성 문서 본문')).not.toBeOnTheScreen();
  drafts.story = read; await user.press(button('작성 글 다시 불러오기')); await flush();
  expect(screen.getByText('실제 작성 문서 본문')).toBeVisible();
});

it('통계에서 복귀한 뒤 실제 작성·발행한 글은 다시 진입한 누적 목록에 0으로 표시된다', async () => {
  const { user } = await setup(undefined);
  expect(screen.getByText('아직 발행한 글이 없어요.')).toBeOnTheScreen();
  await user.press(button('통계에서 프로필로 돌아가기')); await user.press(button('Write a story')); await flush();
  await fireEvent.changeText(screen.getByLabelText('글 제목'), '통계에 연결할 새 글');
  await fireEvent.changeText(screen.getByLabelText('글 본문'), '직접 입력하고 발행하는 본문');
  await user.press(button('Next')); await flush(); await user.press(button('Publish now')); await flush();
  await waitFor(() => expect(button('View stats')).toBeVisible()); await user.press(button('View stats')); await flush();
  expect(button('통계에 연결할 새 글 통계에서 글 열기')).toBeOnTheScreen();
  expect(screen.getByLabelText('선택 기간 Views 0')).toBeVisible();
});
