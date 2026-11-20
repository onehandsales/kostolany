import { useEffect } from 'react';
import { act, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { createMockUserListSource } from '../../features/bookmarks/data/createMockUserListSource';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { articleFixtures } from '../../features/article/data/fixtures';
import { createMockDownloadSource } from '../../features/downloads/createMockDownloadSource';
import type { DownloadArticle, DownloadRequest } from '../../features/downloads/types';
import { SessionNavigation } from './AppNavigator';

const name = '다운로드를 확인할 긴 한국어 목록';
const article = articleFixtures.find(item => item.id === 'medium-love')!;
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
function Probe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => capture(store), [capture, store]); return null;
}
const button = (label: string) => screen.getByRole('button', { name: label });
async function setup(scenario: 'normal' | 'partial-error' = 'normal') {
  const lists = createMockUserListSource({ delayMs: 0, managesReadingList: true });
  await lists.setList({ userId: mockUserA.id, listId: 'own', commandId: 1,
    content: { name, articleIds: ['medium-love', 'medium-brain'], isPrivate: false } });
  await lists.setList({ userId: mockUserB.id, listId: 'own', commandId: 2,
    content: { name: 'B 목록', articleIds: ['medium-brain'], isPrivate: false } });
  const source = createMockDownloadSource({ lists, delayMs: 0, scenario });
  const bookmarks = { ...createMockBookmarkSource({ delayMs: 0 }), lists };
  const authSource = createMockAuthSource({ delayMs: 0 });
  const articleSource = createMockArticleSource({ delayMs: 0 });
  let auth: AuthStore | undefined;
  const tree = (downloadSource = source) => <SafeAreaProvider><AuthProvider initialUser={mockUserA} source={authSource}>
    <SessionNavigation bookmarkSource={bookmarks} downloadSource={downloadSource} articleSource={articleSource} />
    <Probe capture={store => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>;
  const view = await render(tree()); const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const open = async (label = name, count = 2) => {
    await user.press(screen.getByRole('tab', { name: '라이브러리' }));
    await user.press(await screen.findByRole('button', { name: `${label} 열기, 저장한 기사 ${count}개` }));
  };
  await open();
  return { user, source, lists, open, replace: (next: ReturnType<typeof createMockDownloadSource>) => view.rerender(tree(next)),
    switchTo: async (id: string) => {
      if (!auth) throw new Error('NO_AUTH'); const store = auth;
      await act(async () => { store.openLogout(); await store.signOut(); store.openLogin({ kind: 'library' }); await store.signIn(id); });
    } };
}

it('부분 실패·재시도·목록 및 기사 완료 표시와 오프라인 사본 읽기·복귀·제거를 실제 navigation으로 확인한다', async () => {
  const { user, source, lists } = await setup('partial-error');
  await user.press(button('Download list')); await screen.findByRole('button', { name: '다운로드 재시도' });
  expect(screen.getByLabelText(`다운로드됨, ${article.title}`)).toBeVisible();
  await user.press(button('다운로드 재시도')); await screen.findByRole('button', { name: '다운로드 제거' });
  await user.press(button(`기사 관리, ${article.title}`)); await user.press(button(`이 목록에서 제거, ${article.title}`));
  let finishUndo!: () => void; const pendingUndo = new Promise<void>(resolve => { finishUndo = resolve; });
  const original = lists.setList;
  jest.spyOn(lists, 'setList').mockImplementationOnce(async input => { await pendingUndo; return original(input); });
  await user.press(await screen.findByRole('button', { name: 'Undo' }));
  await screen.findByRole('button', { name: '다운로드 재시도' });
  expect(button('다운로드 재시도')).toBeDisabled();
  await act(async () => finishUndo());
  await waitFor(() => expect(button('다운로드 재시도')).toBeEnabled());
  expect(screen.queryByLabelText(`다운로드됨, ${article.title}`)).toBeNull();
  await user.press(button('다운로드 재시도')); await screen.findByRole('button', { name: '다운로드 제거' });
  await act(async () => source.setOnline(false));
  await user.press(screen.getByRole('button', { name: new RegExp('^How to \\*really\\* know') }));
  await screen.findByText('Offline · Downloaded copy');
  await user.press(button('저장 목록으로 돌아가기'));
  await user.press(button('라이브러리로 돌아가기'));
  expect(button('다운로드 제거')).toBeVisible(); await user.press(button('다운로드 제거'));
  expect(button(`Download ${name}`)).toBeVisible();
  expect(lists.getCatalog?.().find(list => list.userId === mockUserA.id && list.listId === 'own')?.articleIds).toHaveLength(2);
  await user.press(button(`${name} 열기, 저장한 기사 2개`));
  await user.press(screen.getByRole('button', { name: new RegExp('^How to \\*really\\* know') }));
  await screen.findByText('오프라인에서 이용할 수 있는 사본이 없어요. 연결 후 다시 시도해 주세요.');
  await act(async () => source.setOnline(true)); await screen.findByLabelText(`북마크, ${article.title}, 저장됨`);
}, 30000);

it('진행 중 취소·사본 제거 뒤 늦은 성공이 아이콘을 되살리지 않고 새 다운로드는 정상 완료된다', async () => {
  const { user, source } = await setup(); const original = source.load;
  let resolve!: (value: DownloadArticle) => void; let request!: DownloadRequest;
  source.load = value => { request = value; return new Promise(yes => { resolve = yes; }); };
  await user.press(button('Download list')); await user.press(screen.getByRole('button', { name: /^다운로드 취소/ }));
  await user.press(button('다운로드 사본 제거'));
  await act(async () => resolve({ ...request, article, contentVersion: 'fixture-1' }));
  expect(button('Download list')).toBeVisible(); expect(screen.queryByLabelText(`다운로드됨, ${article.title}`)).toBeNull();
  source.load = original; await user.press(button('Download list')); await screen.findByRole('button', { name: '다운로드 제거' });
}, 30000);

it('A·B·A와 같은 A 재로그인은 사본 소유권을 유지하고 공급부 교체는 이전 사본을 버린다', async () => {
  const { user, lists, open, switchTo, replace } = await setup();
  await user.press(button('Download list')); await screen.findByRole('button', { name: '다운로드 제거' });
  await switchTo(mockUserB.id); await open('B 목록', 1);
  expect(button('Download list')).toBeVisible(); expect(screen.queryByLabelText(`다운로드됨, ${article.title}`)).toBeNull();
  await user.press(button('Download list'));
  await user.press(button('Member 모의 선택'));
  await screen.findByRole('button', { name: '멤버십 성공 확인' });
  await user.press(button('멤버십 성공 확인'));
  await user.press(button('멤버십 완료 후 돌아가기'));
  await user.press(button('Download list')); await screen.findByRole('button', { name: '다운로드 제거' });
  for (const id of [mockUserA.id, mockUserA.id]) {
    await switchTo(id); await open(); expect(button('다운로드 제거')).toBeVisible();
    expect(screen.queryByRole('button', { name: '다운로드 재시도' })).toBeNull();
  }
  await replace(createMockDownloadSource({ lists, delayMs: 0 })); await open();
  expect(button('Download list')).toBeVisible(); expect(screen.queryByRole('button', { name: '다운로드 제거' })).toBeNull();
}, 30000);

it('다운로드 중 원본 목록 삭제는 상세를 닫고 늦은 응답으로 잘못 복귀하거나 사본을 부활시키지 않는다', async () => {
  const { user, lists, source } = await setup();
  let resolve!: (value: DownloadArticle) => void; let request!: DownloadRequest;
  source.load = value => { request = value; return new Promise(yes => { resolve = yes; }); };
  await user.press(button('Download list'));
  await act(async () => { await lists.setList({ userId: mockUserA.id, listId: 'own', content: null, operation: 'delete', commandId: 3 }); });
  await waitFor(() => expect(screen.queryByRole('heading', { name })).toBeNull());
  await act(async () => resolve({ ...request, article, contentVersion: 'fixture-1' }));
  expect(screen.queryByRole('button', { name: `${name} 열기, 저장한 기사 2개` })).toBeNull();
  expect(screen.queryByRole('button', { name: '다운로드 제거' })).toBeNull();
}, 30000);

it('이미 열린 오프라인 기사도 원본 목록 삭제로 마지막 사본이 철회되면 본문을 숨기고 안전하게 복귀한다', async () => {
  const { user, lists, source } = await setup();
  await user.press(button('Download list')); await screen.findByRole('button', { name: '다운로드 제거' });
  await act(async () => source.setOnline(false));
  await user.press(screen.getByRole('button', { name: new RegExp('^How to \\*really\\* know') }));
  await screen.findByText('Offline · Downloaded copy');
  await act(async () => { await lists.setList({ userId: mockUserA.id, listId: 'own', content: null, operation: 'delete', commandId: 3 }); });
  await screen.findByText('오프라인에서 이용할 수 있는 사본이 없어요. 연결 후 다시 시도해 주세요.');
  expect(screen.queryByRole('heading', { name: article.title })).toBeNull();
  await user.press(button('라이브러리로 돌아가기'));
  expect(screen.queryByRole('heading', { name })).toBeNull();
}, 30000);
