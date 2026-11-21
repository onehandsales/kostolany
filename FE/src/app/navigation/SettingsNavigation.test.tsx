import { act, fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { explanationFixtures } from '../../features/article/data/explanationFixtures';
import { createMockArticleSource } from '../../features/article/data/mockArticleSource';
import { createMockExplanationSource } from '../../features/article/data/mockExplanationSource';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import type { AuthUser } from '../../features/auth/types';
import { createMockBookmarkSource } from '../../features/bookmarks/data/createMockBookmarkSource';
import { createMockFeedSource } from '../../features/feed/data/mockFeedSource';
import { deferred } from '../../features/feed/tests/helpers';
import { createMockClapSource } from '../../features/reactions/data/createMockClapSource';
import { createMockProfileSource } from '../../features/profile/data/createMockProfileSource';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { createMockReadingSettingsSource } from '../../features/settings/data/createMockReadingSettingsSource';
import type { ReadingSettings, ReadingSettingsSource } from '../../features/settings/types';
import { SessionNavigation } from './AppNavigator';

const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const initial: ReadingSettings = { userId: mockUserA.id, defaultLevel: 'adult' };
const button = (name: string) => screen.getByRole('button', { name });
const tab = (name: string) => screen.getByRole('tab', { name });
const radio = (name: string) => screen.getByRole('radio', { name: `${name} 기본 수준` });
const article = () => screen.getByRole('button', { name: new RegExp(`^${title}`) });
function Probe({ onStore }: { onStore: (store: AuthStore) => void }) {
  const { store } = useAuth(); useEffect(() => onStore(store), [store, onStore]); return null;
}
async function setup(source = createMockReadingSettingsSource({ delayMs: 0 }), initialUser: AuthUser | null = mockUserA) {
  let auth: AuthStore | undefined;
  await render(<SafeAreaProvider><AuthProvider initialUser={initialUser} source={createMockAuthSource({ delayMs: 0 })}>
    <SessionNavigation settingsSource={source} profileSource={createMockProfileSource({ delayMs: 0 })}
      feedSource={createMockFeedSource({ delayMs: 0 })} searchSource={createMockSearchSource({ delayMs: 0 })}
      articleSource={createMockArticleSource({ delayMs: 0 })} explanationSource={createMockExplanationSource({ delayMs: 0 })}
      clapSource={createMockClapSource({ delayMs: 0 })} bookmarkSource={createMockBookmarkSource({ delayMs: 0 })} />
    <Probe onStore={(store) => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>);
  await screen.findByRole('button', { name: new RegExp(`^${title}`) });
  if (!auth) throw new Error('Missing auth');
  return { auth, user: userEvent.setup() };
}
async function settings(user: ReturnType<typeof userEvent.setup>) {
  await user.press(tab('프로필')); await user.press(button('설정 열기'));
}
async function edit(user: ReturnType<typeof userEvent.setup>) {
  await user.press(await screen.findByRole('button', { name: '기본 설명 수준 변경' }));
}
async function switchUser(auth: AuthStore, id: string) {
  await act(async () => { auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'profile' }); await auth.signIn(id); });
}
it.each(['홈', '탐색', '라이브러리'])('설정 저장→%s 기사 진입→임시 선택→같은 기사 재진입은 기본값·본문·예시가 일치한다', async (origin) => {
  const source = createMockReadingSettingsSource({ delayMs: 0 }); const write = jest.spyOn(source, 'setDefaultLevel');
  const { auth, user } = await setup(source);
  const bookmark = () => screen.getByRole('togglebutton', { name: new RegExp(`^북마크, ${title}`) });
  await waitFor(() => expect(bookmark()).toBeEnabled()); await user.press(bookmark());
  await settings(user); await edit(user); await user.press(radio('중학생')); await user.press(button('기본 수준 저장'));
  await screen.findByText('현재 기본값 · 중학생'); expect(auth.getSnapshot().revision).toBe(0);
  await user.press(button('프로필로 돌아가기')); expect(button('프로필 편집')).toBeVisible();
  await user.press(tab(origin));
  if (origin === '탐색') { await user.press(button('기사 검색 열기')); await fireEvent.changeText(screen.getByLabelText('기사 검색어'), '금리'); }
  if (origin === '라이브러리') await user.press(await screen.findByRole('button', { name: '읽기 목록 열기, 저장한 기사 1개' }));
  await user.press(await screen.findByRole('button', { name: new RegExp(`^${title}`) }));
  const fixture = explanationFixtures.find((item) => item.articleId === 'example-latest-rates' && item.level === 'middle')!;
  expect(await screen.findByText(fixture.example)).toBeVisible();
  expect(screen.getByRole('radio', { name: '중학생' })).toBeChecked();
  for (const text of fixture.paragraphs) expect(screen.getByText(text)).toBeVisible();
  await user.press(screen.getByRole('radio', { name: '고등학생' }));
  await user.press(button(`${origin === '라이브러리' ? '읽기 목록' : origin}으로 돌아가기`));
  await user.press(article()); await screen.findByText(fixture.example);
  expect(screen.getByRole('radio', { name: '중학생' })).toBeChecked(); expect(write).toHaveBeenCalledTimes(1);
}, 15000);
// 여러 실제 navigation·입력·계정 복귀를 연속 검증하므로 같은 파일의 긴 통합 흐름과 동일한 유한 한도를 둔다.
it('설정 로그아웃 취소·실패는 화면을 지키고 재시도는 비로그인 화면으로 복귀한다', async () => {
  const { user } = await setup(); await settings(user); await screen.findByText('현재 기본값 · 성인');
  await user.press(button('로그아웃')); await user.press(button('로그아웃 취소')); expect(button('기본 설명 수준 변경')).toBeVisible();
  await user.press(button('로그아웃')); await user.press(button('모의 동작 선택 열기'));
  await user.press(screen.getByRole('radio', { name: '모의 결과: 실패' })); await user.press(button('로그아웃 확인'));
  expect(screen.getByRole('alert')).toHaveTextContent(/로그인 상태를 유지/);
  await user.press(button('로그아웃 다시 시도')); await screen.findByRole('button', { name: 'Sign in' });
  await user.press(button('로그인 닫기')); expect(screen.getByText('로그인하지 않은 상태예요.')).toBeVisible();
  expect(screen.queryByRole('button', { name: '프로필로 돌아가기', includeHiddenElements: true })).not.toBeOnTheScreen();
}, 15000);
it.each(['success', 'failure'] as const)('A 저장과 미제출 선택 중 B 전환 뒤 늦은 %s는 B 초안·인증을 건드리지 않는다', async (outcome) => {
  const pending = deferred<ReadingSettings>(); const base = createMockReadingSettingsSource({ delayMs: 0 });
  const source: ReadingSettingsSource = { ...base, setDefaultLevel: () => pending.promise };
  const { user, auth } = await setup(source); await settings(user); await edit(user);
  await user.press(radio('중학생')); await user.press(button('기본 수준 저장')); await user.press(radio('초등학생'));
  await switchUser(auth, mockUserB.id);
  expect(screen.queryByLabelText('기본 설명 수준 편집', { includeHiddenElements: true })).not.toBeOnTheScreen();
  expect(button('설정 열기')).toBeVisible(); await user.press(button('설정 열기')); await edit(user);
  expect(radio('성인')).toBeChecked(); await user.press(radio('고등학생'));
  const revision = auth.getSnapshot().revision;
  await act(async () => { if (outcome === 'success') pending.resolve({ ...initial, defaultLevel: 'middle' }); else pending.reject(new Error('late A')); });
  expect(radio('고등학생')).toBeChecked(); expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  expect(auth.getSnapshot()).toMatchObject({ user: { id: mockUserB.id }, revision });
  await switchUser(auth, mockUserA.id); expect(button('설정 열기')).toBeVisible();
  await user.press(button('설정 열기'));
  expect(await screen.findByText(`현재 기본값 · ${outcome === 'success' ? '중학생' : '성인'}`)).toBeVisible();
  expect(screen.queryByLabelText('기본 설명 수준 편집')).not.toBeOnTheScreen();
}, 15000);
it.each(['success', 'failure'] as const)('A 조회 중 B 전환 뒤 늦은 %s를 버리고 A 복귀는 새 조회로 복구한다', async (outcome) => {
  const pending = deferred<ReadingSettings>(); const base = createMockReadingSettingsSource({ delayMs: 0 });
  const source: ReadingSettingsSource = { ...base,
    fetchSettings: jest.fn().mockImplementationOnce(() => pending.promise).mockImplementation(base.fetchSettings) };
  const { user, auth } = await setup(source); await settings(user); expect(screen.getByText('설정을 불러오는 중…')).toBeVisible();
  await switchUser(auth, mockUserB.id); await user.press(button('설정 열기')); await screen.findByText('현재 기본값 · 성인');
  await act(async () => { if (outcome === 'success') pending.resolve({ ...initial, defaultLevel: 'middle' }); else pending.reject(new Error('late A')); });
  expect(screen.getByText('현재 기본값 · 성인')).toBeVisible(); expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await switchUser(auth, mockUserA.id); await user.press(button('설정 열기'));
  expect(screen.queryByRole('button', { name: '설정 조회 다시 시도' })).not.toBeOnTheScreen();
  expect(await screen.findByText('현재 기본값 · 성인')).toBeVisible();
  expect(source.fetchSettings).toHaveBeenNthCalledWith(3, mockUserA.id);
});
it('같은 A 재로그인은 확정 설정을 보존하고 열린 개인 설정과 초안은 정리한다', async () => {
  const { user, auth } = await setup(); await settings(user); await edit(user);
  await user.press(radio('중학생')); await user.press(button('기본 수준 저장')); await screen.findByText('현재 기본값 · 중학생');
  await edit(user); await user.press(radio('고등학생')); await switchUser(auth, mockUserA.id);
  expect(button('설정 열기')).toBeVisible(); expect(screen.queryByLabelText('기본 설명 수준 편집')).not.toBeOnTheScreen();
  await user.press(button('설정 열기')); await edit(user); expect(radio('중학생')).toBeChecked();
});
it('설정 조회 중 기사에서 수동 선택하면 늦은 기본값은 현재 기사 대신 다음 진입부터 반영한다', async () => {
  const pending = deferred<ReadingSettings>(); const source: ReadingSettingsSource = {
    ...createMockReadingSettingsSource({ delayMs: 0 }), fetchSettings: () => pending.promise,
  };
  const { user } = await setup(source); await settings(user); await user.press(tab('홈')); await user.press(article());
  await user.press(await screen.findByRole('radio', { name: '고등학생' }));
  await act(async () => pending.resolve({ ...initial, defaultLevel: 'middle' }));
  expect(screen.getByRole('radio', { name: '고등학생' })).toBeChecked();
  await user.press(button('홈으로 돌아가기')); await user.press(article());
  expect(await screen.findByRole('radio', { name: '중학생' })).toBeChecked();
});
it('프로필 이름 변경은 기본 설정과 인증 revision을 유지한다', async () => {
  const { user, auth } = await setup(); await settings(user); await edit(user);
  await user.press(radio('초등학생')); await user.press(button('기본 수준 저장')); await screen.findByText('현재 기본값 · 초등학생');
  const revision = auth.getSnapshot().revision;
  await user.press(button('프로필로 돌아가기')); await user.press(button('프로필 편집'));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '새 이름'); await user.press(button('프로필 저장'));
  await screen.findByText('새 이름 · 로그인됨'); await user.press(button('설정 열기'));
  expect(screen.getByText('현재 기본값 · 초등학생')).toBeVisible(); expect(auth.getSnapshot()).toMatchObject({ user: { id: mockUserA.id }, revision });
});
it('비로그인은 설정을 조회하지 않고 성인으로 읽으며 기사 내 선택은 로그인한 계정에 이전하지 않는다', async () => {
  const source = createMockReadingSettingsSource({ delayMs: 0 }); const read = jest.spyOn(source, 'fetchSettings');
  const { user, auth } = await setup(source, null); await user.press(tab('프로필'));
  expect(screen.queryByRole('button', { name: '설정 열기' })).not.toBeOnTheScreen();
  await user.press(tab('홈')); await user.press(article()); expect(await screen.findByRole('radio', { name: '성인' })).toBeChecked();
  await user.press(screen.getByRole('radio', { name: '중학생' })); expect(read).not.toHaveBeenCalled();
  await act(async () => { auth.openLogin({ kind: 'profile' }); await auth.signIn(mockUserA.id); });
  await waitFor(() => expect(screen.getByRole('radio', { name: '성인' })).toBeChecked());
  expect(screen.getByRole('heading', { name: title })).toBeVisible();
});
