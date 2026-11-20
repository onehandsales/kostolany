import { useEffect } from 'react';
import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockDigestSource, digestFixtures } from '../../features/digest/createMockDigestSource';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { SessionNavigation } from './AppNavigator';
import { articleSelectionDocument } from '../../features/article/articleSelectionDocument';
import { articleFixtures } from '../../features/article/data/fixtures';
import { createMockModerationSource } from '../../features/moderation/data/createMockModerationSource';
import { articleWriter } from '../../features/community/data/publicDirectory';
import type { ModerationSource, ModerationValue } from '../../features/moderation/types';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
function Probe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => capture(store), [capture, store]); return null;
}
async function setup(source = createMockDigestSource({ delayMs: 0 }), moderationSource?: ModerationSource) {
  let auth: AuthStore | undefined;
  const authentication = createMockAuthSource({ delayMs: 0 });
  const tree = (current = source) => <SafeAreaProvider><AuthProvider initialUser={mockUserA} source={authentication}>
    <SessionNavigation digestSource={current} moderationSource={moderationSource} articleSource={createMockArticleSource({ delayMs: 0 })} />
    <Probe capture={value => { auth = value; }} />
  </AuthProvider></SafeAreaProvider>;
  const view = await render(tree()); const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await user.press(screen.getByRole('tab', { name: 'Digest' }));
  return { user, source, replace: (next: ReturnType<typeof createMockDigestSource>) => view.rerender(tree(next)),
    switchTo: async (id: string) => {
      if (!auth) throw new Error('NO_AUTH'); const current = auth;
      await act(async () => { current.openLogout(); await current.signOut(); current.openLogin({ kind: 'library' }); await current.signIn(id); });
    } };
}
const button = (name: string) => screen.getByRole('button', { name });

it('차단 설정 조회가 늦거나 실패하면 기사를 먼저 노출하지 않고 복구 후 허용 기사만 표시한다', async () => {
  let reject!: (error: Error) => void;
  const pending = new Promise<ModerationValue>((_resolve, no) => { reject = no; });
  const source = createMockModerationSource({ delay: 0 });
  source.read = jest.fn().mockReturnValueOnce(pending).mockResolvedValue({
    userId: mockUserA.id, version: 1, muted: [], blocked: [articleWriter('medium-love')!.id], reports: [],
  });
  const { user } = await setup(createMockDigestSource({ delayMs: 0 }), source);
  await screen.findByText('June 12, 2025');
  expect(screen.queryAllByRole('button', { name: /^Digest 기사/ })).toHaveLength(0);
  await act(async () => reject(new Error('UNAVAILABLE')));
  expect(screen.queryAllByRole('button', { name: /^Digest 기사/ })).toHaveLength(0);
  await user.press(await screen.findByRole('button', { name: '표시 설정 다시 시도' }));
  await screen.findByRole('button', { name: `Digest 기사 ${articleFixtures.find(item => item.id === 'medium-jeremiah')!.title}` });
  expect(screen.queryByRole('button', { name: `Digest 기사 ${articleFixtures.find(item => item.id === 'medium-love')!.title}` })).toBeNull();
}, 30000);

it('Digest 날짜 취소·확정·빈 날짜와 기사 복귀 및 Library 탭 연결을 실제 navigation으로 확인한다', async () => {
  const { user } = await setup();
  await screen.findByText('June 12, 2025');
  await user.press(button('Digest 날짜 선택')); await user.press(screen.getByRole('radio', { name: 'June 11, 2025' }));
  await user.press(button('Digest 날짜 취소')); expect(screen.getByText('June 12, 2025')).toBeVisible();
  await user.press(button('Digest 날짜 선택')); await user.press(screen.getByRole('radio', { name: 'June 11, 2025' }));
  await user.press(button('Digest 날짜 적용'));
  const story = await screen.findAllByRole('button', { name: /^Digest 기사/ }); await user.press(story[0]!);
  await user.press(await screen.findByRole('button', { name: 'Digest로 돌아가기' }));
  expect(screen.getByText('June 11, 2025')).toBeVisible();
  await user.press(screen.getByRole('tab', { name: 'Saved lists' })); await user.press(screen.getByRole('tab', { name: 'Digest' }));
  expect(screen.getByText('June 11, 2025')).toBeVisible();
  await user.press(button('Digest 설정')); await screen.findByRole('heading', { name: 'Digest settings' });
  await user.press(button('Digest Push notifications')); await user.press(button('Got it'));
  await screen.findByRole('heading', { name: 'Digest settings' });
  await user.press(button('Digest settings 닫기'));
  await user.press(button('Digest 날짜 선택')); await user.press(screen.getByRole('radio', { name: 'June 7, 2025' }));
  await user.press(button('Digest 날짜 적용')); await screen.findByText('이 날짜에는 읽을 기사가 없어요.');
  for (const tab of ['Your lists', 'Highlighted', 'Reading history', 'Digest']) await user.press(screen.getByRole('tab', { name: tab }));
  expect(screen.getByText('June 7, 2025')).toBeVisible();
}, 30000);

it('Digest에서 저장·강조한 같은 기사가 내 목록·Highlighted·Reading history에 연결된다', async () => {
  const { user } = await setup();
  await screen.findByText('June 12, 2025');
  await user.press(button('Digest 날짜 선택')); await user.press(screen.getByRole('radio', { name: 'June 11, 2025' }));
  await user.press(button('Digest 날짜 적용'));
  const article = articleFixtures.find(item => item.id === 'medium-brain')!;
  await user.press(await screen.findByRole('button', { name: `Digest 기사 ${article.title}` }));
  await user.press(await screen.findByLabelText(`북마크, ${article.title}, 저장 안 됨`));
  await user.press(await screen.findByRole('checkbox', { name: '읽기 목록' })); await user.press(button('저장할 목록 적용'));
  const document = articleSelectionDocument(article);
  const start = document.text.indexOf('This “yes man”'); const end = document.text.indexOf(' last week', start);
  await user.press(button('기사 문구 선택'));
  await fireEvent(screen.getByLabelText('선택할 원문'), 'selectionChange', { nativeEvent: { selection: { start, end } } });
  await user.press(button('문구 선택 Done')); await user.press(button('Highlight'));
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Highlight' })).toBeNull());
  await user.press(button('Digest로 돌아가기'));
  await user.press(screen.getByRole('tab', { name: 'Your lists' }));
  await user.press(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' }));
  expect(screen.getByRole('button', { name: new RegExp('^ChatGPT Is Poisoning') })).toBeVisible();
  await user.press(button('라이브러리로 돌아가기')); await user.press(screen.getByRole('tab', { name: 'Highlighted' }));
  await user.press(await screen.findByRole('button', { name: `하이라이트 원문: ${article.title}` }));
  await user.press(await screen.findByRole('button', { name: '라이브러리로 돌아가기' }));
  await user.press(screen.getByRole('tab', { name: 'Reading history' }));
  await user.press(await screen.findByRole('button', { name: new RegExp('^ChatGPT Is Poisoning') }));
  await user.press(await screen.findByRole('button', { name: '읽기 이력으로 돌아가기' }));
  await user.press(screen.getByRole('tab', { name: 'Digest' })); expect(screen.getByText('June 11, 2025')).toBeVisible();
}, 30000);

it('Digest 실패 재시도와 원본 갱신에 따른 날짜 초안 무효화를 실제 화면에 반영한다', async () => {
  const { user, source } = await setup(createMockDigestSource({ delayMs: 0, scenario: 'detail-error' }));
  await user.press(await screen.findByRole('button', { name: 'Digest 다시 시도' }));
  await screen.findAllByRole('button', { name: /^Digest 기사/ });
  await user.press(button('Digest 날짜 선택'));
  await act(async () => source.replaceIssues(digestFixtures.slice(2)));
  expect(button('Digest 날짜 적용')).toBeDisabled();
  await user.press(screen.getByRole('radio', { name: 'June 7, 2025' })); await user.press(button('Digest 날짜 적용'));
  await user.press(await screen.findByRole('button', { name: 'Digest 다시 시도' }));
  await screen.findByText('이 날짜에는 읽을 기사가 없어요.');
}, 30000);

it('A·B·A 및 같은 계정 재로그인은 날짜 초안과 시트를 초기화하고 source 교체는 이전 데이터를 숨긴다', async () => {
  const { user, switchTo, replace } = await setup();
  await screen.findByText('June 12, 2025');
  for (const id of [mockUserB.id, mockUserA.id, mockUserA.id]) {
    await user.press(button('Digest 날짜 선택')); await user.press(screen.getByRole('radio', { name: 'June 7, 2025' }));
    await switchTo(id);
    expect(screen.queryByRole('heading', { name: 'Digest history' })).toBeNull();
    await user.press(screen.getByRole('tab', { name: '라이브러리' })); await user.press(screen.getByRole('tab', { name: 'Digest' }));
    await screen.findByText('June 12, 2025');
  }
  await replace(createMockDigestSource({ delayMs: 0, scenario: 'empty' }));
  await waitFor(() => expect(screen.queryByText('June 12, 2025')).toBeNull());
  await screen.findByText('아직 발행된 Digest가 없어요.');
}, 30000);
