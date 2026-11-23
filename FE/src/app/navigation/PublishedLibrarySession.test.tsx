import { useEffect } from 'react';
import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockDraftSource } from '../../features/editor/draftSource';
import { changeBody, emptyEditor } from '../../features/editor/editorModel';
import { emptyPublishOptions } from '../../features/editor/publishing';
import { SessionNavigation } from './AppNavigator';
import { createMockReadingHistorySource } from '../../features/reading-history/data/createMockReadingHistorySource';
import { publishedArticleId } from '../../features/editor/publishedArticle';

function Probe({ capture }: { capture: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => capture(store), [store, capture]); return null;
}
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it('작성 상세의 미제출 저장 초안을 A→B와 같은 A 재로그인에 버리고 계정별 확정 반응·목록만 복원한다', async () => {
  const source = createMockDraftSource({ delayMs: 0 });
  const title = '계정 경계 발행 글';
  const command = { userId: mockUserA.id, draftId: source.newId(mockUserA.id),
    document: { ...changeBody(emptyEditor(), '공개 발행 본문').document, title },
    publishing: emptyPublishOptions(), authorName: mockUserA.name, operationId: 'publish' };
  await source.save(command, new AbortController().signal);
  const published = await source.publish(command, new AbortController().signal);
  const history = createMockReadingHistorySource({ delayMs: 0 });
  let auth: AuthStore | undefined;
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA} source={createMockAuthSource({ delayMs: 0 })}>
    <SessionNavigation draftSource={source} historySource={history} /><Probe capture={store => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const button = (name: string) => screen.getByRole('button', { name });
  const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1200); });
  const change = async (id: string) => {
    if (!auth) throw new Error('Missing auth'); const session = auth;
    await act(async () => { session.openLogout(); await session.signOut(); session.openLogin({ kind: 'profile' }); await session.signIn(id); });
    await flush();
  };
  await user.press(screen.getByRole('tab', { name: '프로필' }));
  await user.press(await screen.findByRole('button', { name: `${title} 발행한 글 열기` })); await flush();
  await user.press(button(`박수 보내기, ${title}`));
  await user.press(screen.getByLabelText(`북마크, ${title}, 저장 안 됨`));
  await user.press(screen.getByRole('checkbox', { name: '읽기 목록' })); await user.press(button('저장할 목록 적용')); await flush();
  async function openDraft() {
    await user.press(button(`Story options, ${title}`)); await user.press(button('Save to list'));
    await user.press(button('새 목록 만들기')); await fireEvent.changeText(screen.getByLabelText('목록 이름 · 필수'), '이전 계정 미제출 초안');
  }
  await openDraft(); await change(mockUserB.id);
  await waitFor(async () => expect((await history.read(mockUserB.id)).visits.map(item => item.articleId)).toContain(publishedArticleId(published.id)));
  expect((await history.read(mockUserA.id)).visits.map(item => item.articleId)).toContain(publishedArticleId(published.id));
  expect(screen.queryByDisplayValue('이전 계정 미제출 초안', { includeHiddenElements: true })).toBeNull();
  expect(screen.getByLabelText(`북마크, ${title}, 저장 안 됨`)).toBeVisible();
  expect(button(`박수 보내기, ${title}`)).toHaveProp('accessibilityValue', expect.objectContaining({ now: 0 }));
  await change(mockUserA.id);
  expect(screen.getByLabelText(`북마크, ${title}, 저장됨`)).toBeVisible();
  expect(button(`박수 보내기, ${title}`)).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 }));
  await openDraft(); await change(mockUserA.id);
  expect((await history.read(mockUserA.id)).visits.filter(item => item.articleId === publishedArticleId(published.id))).toHaveLength(1);
  expect(screen.queryByDisplayValue('이전 계정 미제출 초안', { includeHiddenElements: true })).toBeNull();
  await user.press(button('작성 글 뒤로')); await user.press(screen.getByRole('tab', { name: '라이브러리' }));
  await waitFor(() => expect(button('읽기 목록 열기, 저장한 기사 1개')).toBeVisible());
}, 30000);
