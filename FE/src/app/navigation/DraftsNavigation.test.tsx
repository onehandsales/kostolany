import { useEffect } from 'react';
import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockDraftSource, type DraftSource } from '../../features/editor/draftSource';
import { createMockEditorImageSource } from '../../features/editor/imageSource';
import { createMockDirectorySource } from '../../features/community/DirectoryProvider';
import type { DirectorySource } from '../../features/community/types';
import { publicDirectory } from '../../features/community/data/publicDirectory';
import { SessionNavigation } from './AppNavigator';

beforeEach(() => jest.useFakeTimers()); afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1500); });
function Probe({ capture }: { capture: (store: AuthStore) => void }) { const { store } = useAuth(); useEffect(() => capture(store), [capture, store]); return null; }
async function setup(drafts = createMockDraftSource({ delayMs: 0 }), directory = createMockDirectorySource({ delay: 0 })) {
  let auth!: AuthStore; const authentication = createMockAuthSource({ delayMs: 0 }); const images = createMockEditorImageSource({ delayMs: 0 });
  const tree = (source: DraftSource, people: DirectorySource) => <SafeAreaProvider><AuthProvider initialUser={mockUserA} source={authentication}>
    <SessionNavigation draftSource={source} editorImageSource={images} directorySource={people} /><Probe capture={store => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>;
  const view = await render(tree(drafts, directory)); const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  return { view, user, open: () => user.press(button('Write a story')), replace: (source: DraftSource, people = directory) => view.rerender(tree(source, people)),
    switchTo: async (id: string) => { await act(async () => { auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'write' }); await auth.signIn(id); }); } };
}
async function input(text: string) { await fireEvent(screen.getByLabelText('글 본문'), 'focus'); await fireEvent.changeText(screen.getByLabelText('글 본문'), text); }
it('제목·본문·서식·이미지·멘션을 저장하고 실제 Drafts에서 재개한 뒤 다른 이미지 ID와 대상 연결을 보존한다', async () => {
  const source = createMockDraftSource({ delayMs: 0 }); const { user, open } = await setup(source); await open();
  await fireEvent.changeText(screen.getByLabelText('글 제목'), '이어 쓰는 글'); await input('문단 @samlee'); await flush();
  await user.press(button('Sam Lee @samlee 멘션'));
  await fireEvent(screen.getByLabelText('글 본문'), 'selectionChange', { nativeEvent: { selection: { start: 0, end: 2 } } }); await user.press(button('굵게'));
  await user.press(button('이미지 삽입')); await user.press(button('Unsplash 사진 검색')); await flush(); await user.press(button('해질녘 풍경 삽입')); await flush();
  await user.press(button('편집기 더보기')); await user.press(button('Drafts')); await user.press(await screen.findByRole('button', { name: '이어 쓰는 글 초안 재개' })); await flush();
  expect(screen.getByLabelText('글 제목')).toHaveDisplayValue('이어 쓰는 글'); expect(button('해질녘 풍경 이미지 선택')).toBeVisible();
  await user.press(button('이미지 삽입')); await user.press(button('사진 라이브러리 선택')); await flush(); await user.press(button('해질녘 풍경 삽입')); await flush();
  expect(screen.getAllByRole('button', { name: '해질녘 풍경 이미지 선택' })).toHaveLength(2);
  await user.press(button('편집기 닫기')); await screen.findByRole('button', { name: 'Write a story' });
  const saved = await source.list(mockUserA.id, new AbortController().signal);
  expect(saved).toHaveLength(1); expect(saved[0]?.document.images).toHaveLength(2); expect(saved[0]?.document.mentions[0]?.target.id).toBe('mention-samlee');
  expect(saved[0]?.document.marks).toContainEqual({ kind: 'bold', start: 0, end: 2 });
}, 30000);
it('저장 실패 후 나가기 취소와 재시도는 입력을 유지하고 조회 실패·빈 상태·재개를 실제 화면에서 구분한다', async () => {
  const source = createMockDraftSource({ delayMs: 0, saveFailures: 2, readFailures: 1 }); const { user, open } = await setup(source); await open();
  await fireEvent.changeText(screen.getByLabelText('글 제목'), '실패 후 복구'); await input('실패한 본문'); await flush();
  expect(button('초안 저장 다시 시도')).toBeVisible(); await user.press(button('편집기 닫기'));
  await user.press(await screen.findByRole('button', { name: '계속 작성' })); expect(screen.getByLabelText('글 제목')).toHaveDisplayValue('실패 후 복구');
  await user.press(button('편집기 닫기')); await screen.findByRole('button', { name: 'Write a story' });
  await user.press(screen.getByRole('tab', { name: '프로필' })); await user.press(button('내 초안'));
  await user.press(await screen.findByRole('button', { name: '초안 목록 다시 시도' }));
  await user.press(await screen.findByRole('button', { name: '실패 후 복구 초안 재개' })); await flush(); expect(screen.getByText('실패한 본문')).toBeVisible();
  await user.press(button('편집기 닫기')); await user.press(button('내 초안'));
  const next = createMockDraftSource({ delayMs: 0 });
  // 새 공급부는 이전 계정의 목록이나 화면 오류를 재사용하지 않는다.
  const separate = await source.list(mockUserA.id, new AbortController().signal); expect(separate).toHaveLength(1);
  expect(await next.list(mockUserA.id, new AbortController().signal)).toEqual([]);
}, 30000);
it('계정 전환과 같은 계정 재로그인은 화면을 비우고 A의 확정 초안만 복구하며 공급부 교체는 새 데이터만 보여준다', async () => {
  const source = createMockDraftSource({ delayMs: 0 }); const { user, open, switchTo, replace } = await setup(source); await open();
  await fireEvent.changeText(screen.getByLabelText('글 제목'), 'A 저장됨'); await input('A 내용'); await flush();
  await user.press(button('편집기 더보기')); await switchTo(mockUserB.id); expect(screen.queryByRole('button', { name: 'Drafts' })).toBeNull(); expect(screen.queryByLabelText('글 제목')).toBeNull();
  await user.press(screen.getByRole('tab', { name: '프로필' })); await user.press(await screen.findByRole('button', { name: '내 초안' })); await screen.findByText('You don’t have any drafts yet.');
  await switchTo(mockUserA.id); await user.press(await screen.findByRole('button', { name: '내 초안' }));
  await user.press(await screen.findByRole('button', { name: 'A 저장됨 초안 재개' })); await flush(); expect(screen.getByText('A 내용')).toBeVisible();
  await switchTo(mockUserA.id); expect(screen.queryByLabelText('글 제목')).toBeNull(); await user.press(await screen.findByRole('button', { name: '내 초안' }));
  await screen.findByRole('button', { name: 'A 저장됨 초안 재개' }); await replace(createMockDraftSource({ delayMs: 0 }));
  expect(screen.queryByRole('button', { name: 'A 저장됨 초안 재개' })).toBeNull(); await screen.findByText('You don’t have any drafts yet.');
}, 30000);
it('멘션 검색 실패·재시도·동명이인·빈 결과와 커서 이동 뒤 늦은 조회를 처리한다', async () => {
  const { user, open, replace } = await setup(createMockDraftSource({ delayMs: 0 }), createMockDirectorySource({ delay: 0, scenario: 'read-error' })); await open(); await input('@samlee'); await flush();
  await user.press(button('멘션 검색 다시 시도')); await flush(); expect(await screen.findByRole('button', { name: 'Sam Lee @samlee 멘션' })).toBeVisible(); expect(button('Sam Lee @sam.lee 멘션')).toBeVisible();
  expect(screen.queryByRole('button', { name: '굵게' })).toBeNull(); await fireEvent(screen.getByLabelText('글 본문'), 'blur');
  expect(screen.queryByRole('button', { name: '굵게' })).toBeNull(); expect(button('Sam Lee @sam.lee 멘션')).toBeVisible();
  await user.press(button('Sam Lee @sam.lee 멘션')); expect(screen.getByText('Sam Lee')).toBeVisible();
  await input('@없는사용자'); await flush(); expect(screen.getByText('No users found')).toBeVisible();
  let resolve!: (value: typeof publicDirectory) => void; const pending = () => new Promise<typeof publicDirectory>(done => { resolve = done; });
  const source = createMockDraftSource({ delayMs: 0 }); await replace(source, pending); await input('@sam');
  await fireEvent(screen.getByLabelText('글 본문'), 'selectionChange', { nativeEvent: { selection: { start: 0, end: 0 } } });
  await act(async () => resolve(publicDirectory)); await flush(); expect(screen.queryByLabelText('멘션 검색 결과')).toBeNull();
  expect(screen.queryByRole('button', { name: '초안 저장 다시 시도' })).toBeNull();
  const saved = await source.list(mockUserA.id, new AbortController().signal); expect(saved).toHaveLength(1); expect(saved[0]?.document.body).toBe('@sam');
}, 30000);
