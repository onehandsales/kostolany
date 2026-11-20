import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
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
import { createMockProfileSource } from '../../features/profile/data/createMockProfileSource';
import type { ProfilePhotoLease, ProfilePhotoPicker } from '../../features/profile/profilePhoto';
import type { ProfileSource } from '../../features/profile/types';
import { SessionNavigation } from './AppNavigator';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1200); });
const photo = { id: 'chosen', uri: 'file:///cache/profile.jpg', width: 100, height: 100 };

function Probe({ onStore }: { onStore: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => onStore(store), [store, onStore]); return null;
}

async function setup(profileSource = createMockProfileSource({ delayMs: 0 }), picker: ProfilePhotoPicker = async () => null, drafts = createMockDraftSource({ delayMs: 0 })) {
  let auth: AuthStore | undefined;
  const view = await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA} source={createMockAuthSource({ delayMs: 0 })}>
    <SessionNavigation profileSource={profileSource} profilePhotoPicker={picker} draftSource={drafts} />
    <Probe onStore={store => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(screen.getByRole('tab', { name: '프로필' })); await flush();
  if (!auth) throw new Error('Missing auth');
  return { user, auth, view };
}

async function switchUser(auth: AuthStore, id: string) {
  await act(async () => {
    auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'profile' }); await auth.signIn(id);
  });
  await flush();
}

it.each(['success', 'failure'] as const)('사진 선택 중 A→B와 같은 A 재로그인 뒤 늦은 %s는 새 프로필·초안을 오염시키지 않는다', async outcome => {
  const pending = deferred<ProfilePhotoLease | null>(); const release = jest.fn();
  const { user, auth } = await setup(undefined, () => pending.promise);
  await user.press(button('프로필 편집')); await user.press(button('프로필 사진 변경')); await user.press(button('프로필 사진 라이브러리'));
  await switchUser(auth, mockUserB.id);
  expect(screen.getByRole('heading', { name: mockUserB.name })).toBeVisible();
  await switchUser(auth, mockUserA.id);
  expect(screen.queryByLabelText('프로필 편집 창', { includeHiddenElements: true })).not.toBeOnTheScreen();
  await user.press(button('프로필 편집'));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '새 세션 초안');
  await act(async () => { if (outcome === 'success') pending.resolve({ photo, release }); else pending.reject(new Error('old selection')); });
  expect(screen.getByLabelText('이름 · 필수')).toHaveDisplayValue('새 세션 초안');
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  if (outcome === 'success') expect(release).toHaveBeenCalledTimes(1);
});

it('사진·대명사 저장 중 B 전환은 제출한 A 저장만 유지하고 같은 A 재진입의 새 초안과 revision을 지킨다', async () => {
  const base = createMockProfileSource({ delayMs: 0 }); const gate = deferred<void>(); const release = jest.fn();
  const source: ProfileSource = { ...base, saveProfile: async input => { await gate.promise; return base.saveProfile(input); } };
  const { user, auth } = await setup(source, async () => ({ photo, release }));
  await user.press(button('프로필 편집')); await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '확정 A');
  await user.press(button('프로필 사진 변경')); await user.press(button('프로필 사진 라이브러리'));
  await user.press(button('Add pronouns')); await fireEvent.changeText(screen.getByLabelText('대명사 검색'), 'he');
  await user.press(screen.getByRole('checkbox', { name: 'he 대명사 선택' })); await user.press(button('대명사 선택 완료'));
  await user.press(button('프로필 저장'));
  await switchUser(auth, mockUserB.id);
  const revision = auth.getSnapshot().revision;
  await act(async () => gate.resolve()); await flush();
  expect(auth.getSnapshot().revision).toBe(revision);
  expect(screen.getByRole('heading', { name: mockUserB.name })).toBeVisible();
  expect((await base.readProfile(mockUserB.id)).photo).toBeUndefined();
  expect(release).not.toHaveBeenCalled();
  await switchUser(auth, mockUserA.id);
  expect(screen.getByRole('heading', { name: '확정 A' })).toBeVisible();
  expect(screen.getByText('he')).toBeVisible();
  expect(await base.readProfile(mockUserA.id)).toMatchObject({ photo, pronouns: ['he'] });
  await user.press(button('프로필 편집')); await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '버릴 이름');
  await switchUser(auth, mockUserA.id);
  expect(screen.queryByDisplayValue('버릴 이름', { includeHiddenElements: true })).not.toBeOnTheScreen();
  expect(screen.getByRole('heading', { name: '확정 A' })).toBeVisible();
});

it('실제 Stories 필터·상세·복귀가 작성자 이름 변경을 반영하고 다른 계정 글과 섞이지 않는다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  for (const [userId, title, unlisted] of [[mockUserA.id, 'A 공개 글', false], [mockUserA.id, 'A 링크 글', true], [mockUserB.id, 'B 공개 글', false]] as const) {
    const draftId = drafts.newId(userId);
    const document = { ...emptyEditor().document, title, body: '작성한 본문' };
    const publishing = { ...emptyPublishOptions(), unlisted };
    await drafts.save({ draftId, userId, document, publishing, operationId: `save-${draftId}` }, new AbortController().signal);
    await drafts.publish({ draftId, userId, document, publishing, authorName: '이전 이름', operationId: `publish-${draftId}` }, new AbortController().signal);
  }
  const { user, auth } = await setup(undefined, undefined, drafts);
  expect(button('A 공개 글 발행한 글 열기')).toBeVisible();
  expect(screen.queryByRole('button', { name: 'B 공개 글 발행한 글 열기' })).not.toBeOnTheScreen();
  await user.press(button('프로필 편집')); await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '변경된 작성자'); await user.press(button('프로필 저장'));
  const revision = auth.getSnapshot().revision;
  await user.press(button('Public stories')); await user.press(screen.getByRole('radio', { name: 'Unlisted' })); await flush();
  expect(screen.queryByRole('button', { name: 'A 공개 글 발행한 글 열기' })).not.toBeOnTheScreen();
  await user.press(button('A 링크 글 발행한 글 열기')); await flush();
  expect(screen.getByText('변경된 작성자 · 모의 발행 · Unlisted')).toBeVisible();
  await user.press(button('작성 글 뒤로')); await flush();
  expect(button('Unlisted stories')).toBeVisible();
  expect(button('A 링크 글 발행한 글 열기')).toBeVisible();
  expect(auth.getSnapshot().revision).toBe(revision);
  await user.press(button('My followers')); await flush();
  expect(screen.getByRole('heading', { name: 'Followers' })).toBeVisible();
  await user.press(button('Back from connections')); await flush();
  expect(button('Unlisted stories')).toBeVisible();
});
