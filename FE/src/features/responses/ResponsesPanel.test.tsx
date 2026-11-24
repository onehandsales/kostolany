import { act, render, screen, userEvent, waitFor, within } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA, mockUserB } from '../auth/data/mockUsers';
import { deferred } from '../feed/tests/helpers';
import { ProfileProvider } from '../profile/ProfileProvider';
import { createMockProfileSource } from '../profile/data/createMockProfileSource';
import { ResponseButton } from './ResponseButton';
import { ResponsePreview } from './ResponsePreview';
import { ResponsesPanel } from './ResponsesPanel';
import { ResponseProvider } from './ResponseProvider';
import { createMockResponseSource } from './data/createMockResponseSource';
import type { ResponseCommand, ResponseSource, ResponseValue } from './types';
import { ModerationContext } from '../moderation/ModerationContext';
import { createModerationStore } from '../moderation/createModerationStore';
import { createMockModerationSource } from '../moderation/data/createMockModerationSource';

const target = { kind: 'article' as const, id: 'medium-brain' };
const profile = createMockProfileSource({ delayMs: 0 });
function tree(source: ResponseSource, userId = mockUserA.id, revision = 0, directPolicy = false) {
  return (
    <SafeAreaProvider>
      <ResponseProvider source={source} userId={userId} revision={revision}>
        <AuthProvider
          key={`${userId}:${revision}`}
          initialUser={userId === mockUserA.id ? mockUserA : mockUserB}
        >
          <ProfileProvider userId={userId} sessionRevision={revision} source={profile}>
            {directPolicy
              ? <ResponsesPanel target={{ kind: 'article', id: 'medium-rules' }} onClose={() => {}} />
              : <ResponseButton target={target} title="기사" />}
          </ProfileProvider>
        </AuthProvider>
      </ResponseProvider>
    </SafeAreaProvider>
  );
}
const panel = () => within(screen.getByLabelText('Responses 패널'));

it('본문 미리보기와 응답 버튼 및 시트가 비교 집계와 새 작성 결과를 함께 갱신한다', async () => {
  const source = createMockResponseSource({ delayMs: 0, initial: () => [], uncapturedCountFor: () => 17 });
  const user = userEvent.setup();
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA}>
    <ProfileProvider userId={mockUserA.id} sessionRevision={0} source={profile}>
      <ResponseProvider source={source} userId={mockUserA.id} revision={0}>
        <ResponseButton target={target} title="비교 기사" /><ResponsePreview target={target} />
      </ResponseProvider>
    </ProfileProvider>
  </AuthProvider></SafeAreaProvider>);
  await screen.findByRole('heading', { name: 'Responses (17)' });
  expect(within(screen.getByRole('button', { name: 'Responses, 비교 기사' })).getByText('17')).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'See all responses' }));
  await user.type(panel().getByLabelText('응답 내용'), '모든 진입점에 반영할 응답');
  await user.press(panel().getByRole('button', { name: '응답 게시' }));
  await panel().findByRole('heading', { name: 'Responses (18)' });
  await user.press(panel().getByRole('button', { name: 'Responses 닫기' }));
  expect(screen.getByRole('heading', { name: 'Responses (18)' })).toBeVisible();
  expect(within(screen.getByRole('button', { name: 'Responses, 비교 기사' })).getByText('18')).toBeVisible();
});

it('비교 집계와 미수록 안내를 표시하고 직접 작성한 응답과 초안은 계정별로 분리한다', async () => {
  const source = createMockResponseSource({ delayMs: 0, uncapturedCountFor: () => 272 });
  const user = userEvent.setup();
  const view = await render(tree(source, mockUserA.id, 0, true));
  await panel().findByRole('heading', { name: 'Responses (272)' });
  expect(panel().getByText(/비교용 원본 집계 272개의 응답 본문/)).toBeVisible();
  expect(panel().queryByText('Be the first to respond.')).toBeNull();
  await user.type(panel().getByLabelText('응답 내용'), '직접 작성한 정책 응답');
  await user.press(panel().getByRole('button', { name: '응답 게시' }));
  await panel().findByRole('heading', { name: 'Responses (273)' });
  expect(panel().getByText('직접 작성한 정책 응답')).toBeVisible();
  await user.type(panel().getByLabelText('응답 내용'), 'A 계정에서만 작성 중인 미제출 초안');
  expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue('A 계정에서만 작성 중인 미제출 초안');
  await view.rerender(tree(source, mockUserB.id, 1, true));
  await panel().findByRole('heading', { name: 'Responses (272)' });
  expect(panel().queryByText('직접 작성한 정책 응답')).toBeNull();
  expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue('');
  await view.rerender(tree(source, mockUserA.id, 2, true));
  await panel().findByRole('heading', { name: 'Responses (273)' });
  expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue('');
});

it.each(['block', 'read-error'] as const)('직접 연 정책 응답에서 %s 발생 시 입력을 폐기하고 복구 후 되살리지 않는다', async (failure) => {
  const base = createMockModerationSource({ delay: 0 });
  let failRead = false;
  const moderation = createModerationStore({ ...base, read: async (id) => {
    if (failRead) throw new Error('unavailable');
    return base.read(id);
  } }, mockUserA.id);
  await moderation.reload();
  const user = userEvent.setup();
  await render(<ModerationContext.Provider value={{ store: moderation, scope: '', open: () => {}, isBlockedForUser: () => false }}>
    {tree(createMockResponseSource({ delayMs: 0 }), mockUserA.id, 0, true)}
  </ModerationContext.Provider>);
  await panel().findByRole('heading', { name: 'Responses (0)' });
  await user.type(panel().getByLabelText('응답 내용'), '접근권 상실 전 정책 응답 초안');
  await act(async () => {
    if (failure === 'block') await moderation.execute({ operationId: 'block-policy', action: { kind: 'block', writerId: 'medium-policy-author', active: true } });
    else { failRead = true; await moderation.reload(); }
  });
  expect(screen.queryByLabelText('Responses 패널')).toBeNull();
  await act(async () => {
    if (failure === 'block') await moderation.execute({ operationId: 'unblock-policy', action: { kind: 'block', writerId: 'medium-policy-author', active: false } });
    else { failRead = false; await moderation.reload(); }
  });
  expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue('');
});

it('직접 연 정책 응답도 A→B→A와 같은 A 재로그인 때 이전 입력·정렬을 초기화한다', async () => {
  const source = createMockResponseSource({ delayMs: 0 });
  const user = userEvent.setup();
  const view = await render(tree(source, mockUserA.id, 0, true));
  await panel().findByRole('heading', { name: 'Responses (0)' });
  await user.type(panel().getByLabelText('응답 내용'), '이전 세션의 비공개 초안');
  await user.press(panel().getByRole('button', { name: '응답 정렬 선택' }));
  await user.press(screen.getByRole('radio', { name: 'Most Recent' }));
  for (const [id, revision] of [[mockUserB.id, 1], [mockUserA.id, 2], [mockUserA.id, 3]] as const) {
    await view.rerender(tree(source, id, revision, true));
    expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue('');
    expect(panel().getByText('Most Relevant')).toBeVisible();
    await user.type(panel().getByLabelText('응답 내용'), '이번 세션의 새 초안');
  }
});

it.each([false, true])(
  '답글 전송 뒤 접기를 유지하고 초안 변경 여부 %s에서도 늦은 성공을 격리한다',
  async (changeDraft) => {
    const base = createMockResponseSource({ delayMs: 0 });
    const late = deferred<ResponseValue>();
    let command: ResponseCommand | undefined;
    const source: ResponseSource = {
      ...base,
      execute: (input) => {
        command = input;
        return late.promise;
      },
    };
    const user = userEvent.setup();
    await render(tree(source));
    await user.press(screen.getByRole('button', { name: 'Responses, 기사' }));
    await user.press(await panel().findByRole('button', { name: 'Reply to Bérnie' }));
    await user.type(panel().getByLabelText('응답 내용'), '전송된 답글');
    await user.press(panel().getByRole('button', { name: '응답 게시' }));
    await user.press(panel().getByRole('button', { name: 'Hide replies, brain-bernie' }));
    if (changeDraft) await user.type(panel().getByLabelText('응답 내용'), ' 새 초안');
    expect(command).toBeDefined();
    await act(async () => {
      late.resolve(await base.execute(command!));
    });
    expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue(changeDraft ? '전송된 답글 새 초안' : '');
    expect(panel().queryByRole('button', { name: 'Hide replies, brain-bernie' })).toBeNull();
    expect(panel().getByRole('button', { name: 'Show replies, brain-bernie' })).toBeVisible();
    if (changeDraft) await user.press(panel().getByRole('button', { name: '응답 작성 취소' }));
    await user.press(panel().getByRole('button', { name: 'Show replies, brain-bernie' }));
    expect(await panel().findByText('전송된 답글')).toBeVisible();
  },
);

it.each(['success', 'failure'] as const)(
  'A 작성 중 B와 같은 A 재로그인에서 늦은 %s와 이전 초안·메뉴를 격리한다',
  async (outcome) => {
    const base = createMockResponseSource({ delayMs: 0 });
    const late = deferred<ResponseValue>();
    let command: ResponseCommand | undefined;
    const source: ResponseSource = {
      ...base,
      execute: (input) => {
        command = input;
        return late.promise;
      },
    };
    const user = userEvent.setup();
    const view = await render(tree(source));
    await user.press(screen.getByRole('button', { name: 'Responses, 기사' }));
    await panel().findByRole('heading', { name: 'Responses (7)' });
    await user.type(panel().getByLabelText('응답 내용'), 'A의 전송');
    await user.press(panel().getByRole('button', { name: '응답 게시' }));
    await view.rerender(tree(source, mockUserB.id, 1));
    expect(screen.queryByLabelText('Responses 패널')).toBeNull();
    await act(async () => {
      if (outcome === 'success') late.resolve(await base.execute(command!));
      else late.reject(new Error('old A failure'));
    });
    await user.press(screen.getByRole('button', { name: 'Responses, 기사' }));
    await panel().findByRole('heading', { name: 'Responses (7)' });
    expect(panel().queryByText('A의 전송')).toBeNull();
    await view.rerender(tree(source, mockUserA.id, 2));
    await user.press(screen.getByRole('button', { name: 'Responses, 기사' }));
    await panel().findByRole('heading', {
      name: `Responses (${outcome === 'success' ? 8 : 7})`,
    });
    expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue('');
    await user.type(panel().getByLabelText('응답 내용'), '재로그인 전 초안');
    await user.press(panel().getAllByRole('button', { name: /response options$/ })[0]!);
    await view.rerender(tree(source, mockUserA.id, 3));
    expect(screen.queryByLabelText('응답 메뉴')).toBeNull();
    expect(screen.queryByLabelText('Responses 패널')).toBeNull();
    await user.press(screen.getByRole('button', { name: 'Responses, 기사' }));
    expect(panel().getByLabelText('응답 내용')).toHaveDisplayValue('');
  },
);

it('최초 조회 실패에서 재시도하고 source 교체 시 이전 읽기와 열린 패널을 폐기한다', async () => {
  const source = createMockResponseSource({
    scenario: 'read-error',
    delayMs: 0,
  });
  const user = userEvent.setup();
  const view = await render(tree(source));
  await user.press(screen.getByRole('button', { name: 'Responses, 기사' }));
  await user.press(await panel().findByRole('button', { name: '댓글 조회 다시 시도' }));
  await panel().findByRole('heading', { name: 'Responses (7)' });
  const late = deferred<ResponseValue>();
  const replacement = { ...source, read: () => late.promise };
  await view.rerender(tree(replacement));
  expect(screen.queryByLabelText('Responses 패널')).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Responses, 기사' }));
  await view.rerender(tree(createMockResponseSource({ delayMs: 0, initial: () => [] })));
  await act(async () => {
    late.reject(new Error('obsolete'));
  });
  await user.press(screen.getByRole('button', { name: 'Responses, 기사' }));
  await waitFor(() => expect(panel().getByRole('heading', { name: 'Responses (0)' })).toBeVisible());
  expect(panel().queryByRole('alert')).toBeNull();
});
