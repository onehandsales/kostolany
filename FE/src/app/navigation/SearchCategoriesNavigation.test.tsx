import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './AppNavigator';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockSearchSource } from '../../features/search/data/mockSearchSource';
import { createMockPublicListSource } from '../../features/public-lists/data/createMockPublicListSource';
import { publicListFixtures } from '../../features/public-lists/data/publicListFixtures';
import { createMockDirectorySource } from '../../features/community/DirectoryProvider';
import { createMockDraftSource } from '../../features/editor/draftSource';
import type { PreviewLinkSource } from './previewLinks';
import { shareAdapter } from '../../features/sharing/shareAdapter';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
const flush = () =>
  act(async () => {
    await jest.advanceTimersByTimeAsync(700);
  });
const button = (name: string) => screen.getByRole('button', { name });
const tab = (name: string) => screen.getByRole('tab', { name });

it('다섯 검색 탭에서 기존 대상과 복귀를 연결하고 검색어·선택을 보존한다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator initialUser={mockUserA} searchSource={createMockSearchSource({ delayMs: 0 })} />
    </SafeAreaProvider>,
  );
  await user.press(tab('탐색'));
  await user.press(button('기사 검색 열기'));
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), ' Thomas ');
  await user.press(tab('People'));
  await flush();
  await user.press(button('Discover Thomas Ricouard'));
  await flush();
  expect(screen.getByRole('heading', { name: 'Thomas Ricouard' })).toBeVisible();
  await user.press(button('Back from profile'));
  expect(tab('People')).toBeSelected();
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue(' Thomas ');
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), 'Ironkeel');
  await user.press(tab('Publications'));
  await flush();
  await user.press(button('Discover The Ironkeel Collection'));
  await flush();
  await user.press(button('Back from profile'));
  expect(tab('Publications')).toBeSelected();
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), 'Music');
  await user.press(tab('Topics'));
  await flush();
  await user.press(button('Discover Music, 3.1M followers'));
  await flush();
  await user.press(button('Back from topic'));
  expect(tab('Topics')).toBeSelected();
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), 'morning');
  await user.press(tab('Lists'));
  await flush();
  await user.press(button('Open search list The power of a morning routine'));
  await flush();
  await user.press(button('Back from public list'));
  expect(tab('Lists')).toBeSelected();
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), 'ChatGPT');
  await user.press(tab('Stories'));
  await flush();
  await user.press(screen.getByRole('button', { name: /^ChatGPT Is Poisoning/ }));
  await flush();
  await user.press(button('탐색으로 돌아가기'));
  expect(tab('Stories')).toBeSelected();
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('ChatGPT');
}, 30000);

it('목록 조회 실패를 재시도하고 공개 범위 변경·삭제를 현재 검색에 반영한다', async () => {
  const lists = createMockPublicListSource({ delayMs: 0, scenario: 'read-error' });
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator initialUser={mockUserA} publicListSource={lists} />
    </SafeAreaProvider>,
  );
  await user.press(tab('탐색'));
  await user.press(button('기사 검색 열기'));
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), 'morning');
  await user.press(tab('Lists'));
  await flush();
  await user.press(button('검색 다시 시도'));
  await flush();
  expect(button('Open search list The power of a morning routine')).toBeVisible();
  await act(async () => lists.setVisibility('public-morning-routine', 'private'));
  await flush();
  expect(
    screen.queryByRole('button', { name: 'Open search list The power of a morning routine' }),
  ).toBeNull();
  await act(async () => lists.setVisibility('public-morning-routine', 'public'));
  await flush();
  expect(button('Open search list The power of a morning routine')).toBeVisible();
  await act(async () => lists.setVisibility('public-morning-routine', 'deleted'));
  await flush();
  expect(screen.getByText('검색 결과가 없어요')).toBeVisible();
  const own = createMockPublicListSource({
    delayMs: 0,
    lists: publicListFixtures.map((list) => ({ ...list, owner: { kind: 'writer', id: mockUserA.id } })),
  });
  own.setVisibility('public-morning-routine', 'private');
  expect((await own.read(mockUserA.id)).lists[0]?.isPrivate).toBe(true);
}, 20000);

it('사용자 검색의 실패·재시도·빈 결과를 구분하며 유형 변경은 기사 재시도를 실행하지 않는다', async () => {
  const source = jest.fn(createMockSearchSource({ delayMs: 0 }));
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        searchSource={source}
        directorySource={createMockDirectorySource({ delay: 0, scenario: 'read-error' })}
      />
    </SafeAreaProvider>,
  );
  await user.press(tab('탐색'));
  await user.press(button('기사 검색 열기'));
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), 'Thomas');
  await user.press(tab('People'));
  await flush();
  await user.press(button('검색 다시 시도'));
  await flush();
  expect(button('Discover Thomas Ricouard')).toBeVisible();
  expect(source).not.toHaveBeenCalled();
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), '없는 사용자');
  await flush();
  expect(screen.getByText('검색 결과가 없어요')).toBeVisible();
  expect(tab('People')).toBeSelected();
});

it('실제 작성·발행 후 공개 검색에서 같은 글을 열고 돌아오며 초기 링크보다 새 이벤트를 우선한다', async () => {
  let emit = (_url: string) => {};
  let initialResolve: (url: string) => void = () => {};
  const linkSource: PreviewLinkSource = {
    initial: () =>
      new Promise((resolve) => {
        initialResolve = resolve;
      }),
    subscribe: (listener) => {
      emit = listener;
      return () => {
        emit = () => {};
      };
    },
  };
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const drafts = createMockDraftSource({ delayMs: 0 });
  const sharing = { ...shareAdapter };
  const copied = jest.spyOn(sharing, 'copy').mockResolvedValue(undefined);
  await render(
    <SafeAreaProvider>
      <AppNavigator
        initialUser={mockUserA}
        linkSource={linkSource}
        draftSource={drafts}
        shareAdapter={sharing}
      />
    </SafeAreaProvider>,
  );
  await user.press(button('Write a story'));
  await fireEvent.changeText(screen.getByLabelText('글 제목'), '검색으로 돌아오는 공개 글');
  await fireEvent.changeText(screen.getByLabelText('글 본문'), '원래 발행 저장소의 확정 내용');
  await user.press(button('Next'));
  await user.press(button('Publication'));
  await user.press(screen.getByRole('radio', { name: 'The Ironkeel Collection' }));
  await user.press(button('Publication 선택 저장'));
  await user.press(button('Publish now'));
  await flush();
  await act(async () => emit('kostolany://tab/Explore'));
  await flush();
  await act(async () => initialResolve('kostolany://topic/music'));
  await flush();
  expect(tab('탐색')).toBeSelected();
  await user.press(button('기사 검색 열기'));
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), '검색으로');
  await flush();
  await user.press(button('Open published story 검색으로 돌아오는 공개 글'));
  await flush();
  expect(screen.getByText('원래 발행 저장소의 확정 내용')).toBeVisible();
  await user.press(button('Share story'));
  await user.press(button('Copy link'));
  await flush();
  const sharedUrl = copied.mock.calls[0]?.[0];
  expect(sharedUrl).toMatch(/^https:\/\/kostolany.invalid\/written\//);
  await user.press(button('공유 닫기'));
  await user.press(button('작성 글 뒤로'));
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('검색으로');
  await act(async () => emit(sharedUrl!));
  await flush();
  expect(screen.getByText('원래 발행 저장소의 확정 내용')).toBeVisible();
  await user.press(button('작성 글 뒤로'));
  await act(async () => emit('kostolany://private/invalid'));
  await flush();
  await user.press(button('링크에서 돌아가기'));
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('검색으로');
  await act(async () => emit('https://kostolany.invalid/topic/music'));
  await flush();
  await user.press(button('Back from topic'));
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('검색으로');
  await user.press(tab('프로필'));
  await flush();
  await user.press(button('프로필 편집'));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '검색 작성자 새 이름');
  await user.press(button('프로필 저장'));
  await flush();
  await user.press(tab('탐색'));
  await fireEvent.changeText(screen.getByLabelText('기사 검색어'), '검색 작성자 새 이름');
  await flush();
  expect(button('Open published story 검색으로 돌아오는 공개 글')).toBeVisible();
  await user.press(tab('People'));
  await flush();
  expect(button('Discover 검색 작성자 새 이름')).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Follow 검색 작성자 새 이름' })).toBeNull();
  jest.spyOn(drafts, 'publicStories').mockRejectedValueOnce(new Error('profile-list'));
  await user.press(button('Discover 검색 작성자 새 이름'));
  await flush();
  expect(screen.getByRole('heading', { name: '검색 작성자 새 이름' })).toBeVisible();
  await user.press(button('Retry published stories'));
  await flush();
  await user.press(button('Open published story 검색으로 돌아오는 공개 글'));
  await flush();
  expect(screen.getByText('원래 발행 저장소의 확정 내용')).toBeVisible();
  await user.press(button('작성 글 뒤로'));
  expect(screen.getByRole('heading', { name: '검색 작성자 새 이름' })).toBeVisible();
  await user.press(button('Back from profile'));
  expect(tab('People')).toBeSelected();
  expect(screen.getByLabelText('기사 검색어')).toHaveDisplayValue('검색 작성자 새 이름');
  await act(async () => emit('kostolany://publication/ironkeel'));
  await flush();
  expect(button('Open published story 검색으로 돌아오는 공개 글')).toBeVisible();
  await user.press(button('Back from profile'));
  expect(tab('People')).toBeSelected();
}, 30000);

it('Featured는 북마크를 제공하고 Following 일부 조회 실패는 기존 기사와 함께 복구 경로를 보여 준다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const directory = createMockDirectorySource({ delay: 0 });
  let failed = false;
  const topicSource: import('../../features/topics/types').TopicSource = async () => {
    if (!failed) { failed = true; throw new Error('topics'); }
    return { topics: [], curations: [] };
  };
  await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} directorySource={directory} topicSource={topicSource}
    relationshipSource={{ read: async userId => ({ userId, version: 1, relationships: [{ target: { kind: 'writer', id: 'jordan' }, following: true, email: false }] }),
      set: async () => { throw new Error('unused'); } }} /></SafeAreaProvider>);
  await flush(); expect(screen.getAllByRole('button', { name: /^Show less like this/ }).length).toBeGreaterThan(0);
  await user.press(tab('Featured')); await flush();
  expect(screen.queryByRole('button', { name: /^Show less like this/ })).toBeNull();
  expect(screen.getAllByRole('togglebutton', { name: /^북마크,/ }).length).toBeGreaterThan(0);
  await user.press(tab('Following')); await flush();
  expect(screen.getByRole('button', { name: /^Behold/ })).toBeVisible();
  await user.press(button('팔로우 갱신 다시 시도')); await flush();
  expect(screen.queryByRole('button', { name: '팔로우 갱신 다시 시도' })).toBeNull();
  expect(screen.getByRole('button', { name: /^Behold/ })).toBeVisible();
});
