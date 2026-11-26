import { useEffect } from 'react';
import { TextInput } from 'react-native';
import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../../features/auth/AuthProvider';
import type { AuthStore } from '../../features/auth/createAuthStore';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../../features/auth/data/mockUsers';
import { createMockEditorImageSource, type EditorImageSource, type ImageAsset, type ImageLease } from '../../features/editor/imageSource';
import { SessionNavigation } from './AppNavigator';
import { createDeviceEditorImageSource } from '../../features/editor/createDeviceEditorImageSource';

beforeEach(() => jest.useFakeTimers()); afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const flush = () => act(async () => { jest.advanceTimersByTime(1500); });
function Probe({ capture }: { capture: (store: AuthStore) => void }) { const { store } = useAuth(); useEffect(() => capture(store), [capture, store]); return null; }
async function setup(source: EditorImageSource) {
  let auth!: AuthStore;
  const authSource = createMockAuthSource({ delayMs: 0 });
  const tree = (images: EditorImageSource) => <SafeAreaProvider><AuthProvider initialUser={mockUserA} source={authSource}>
    <SessionNavigation editorImageSource={images} /><Probe capture={store => { auth = store; }} />
  </AuthProvider></SafeAreaProvider>;
  const view = await render(tree(source)); const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const open = () => user.press(button('Write a story'));
  const pick = async (origin = 'Unsplash 사진 검색') => {
    await user.press(button('이미지 삽입')); await user.press(button(origin)); await flush(); await flush();
    await user.press(button('해질녘 풍경 삽입'));
  };
  return { view, user, open, pick, replace: (images: EditorImageSource) => view.rerender(tree(images)), switchTo: async (id: string) => {
    await act(async () => { auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'write' }); await auth.signIn(id); });
  } };
}

it('사진 경계 선택 모드의 한 입력에서 앞뒤 선택·교체·Undo를 연결하고 기존 사진 삭제 화면으로 돌아온다', async () => {
  const base = createMockEditorImageSource({ delayMs: 0 });
  const { user, open, pick } = await setup({ ...base, resolve: () => ({ uri: 'file:///fixture.jpg' }) });
  await open(); await fireEvent.changeText(screen.getByLabelText('글 제목'), '연속 선택');
  await fireEvent.changeText(screen.getByLabelText('글 본문'), '앞 😀');
  await fireEvent(screen.getByLabelText('글 본문'), 'selectionChange', { nativeEvent: { selection: { start: 4, end: 4 } } });
  await pick(); await flush();
  await fireEvent.changeText(screen.getByLabelText('이미지 뒤 본문 1'), '뒤');
  await user.press(button('편집기 더보기')); await user.press(button('Select across photos')); await flush();
  expect(screen.queryByLabelText('이미지 뒤 본문 1')).toBeNull();
  const html = screen.getByTestId('native-editor-글 본문').props.accessibilityValue.text;
  expect(html).toContain('<img src="file:///fixture.jpg"');
  await fireEvent(screen.getByLabelText('글 본문'), 'focus');
  await fireEvent(screen.getByLabelText('글 본문'), 'selectionChange', { nativeEvent: { selection: { start: 0, end: 8 } } });
  await user.press(button('굵게'));
  expect(screen.getByTestId('native-editor-글 본문').props.accessibilityValue.text).toContain('<b>뒤</b>');
  await fireEvent(screen.getByLabelText('글 본문'), 'changeHtml', { nativeEvent: { value: '<p>교체</p>' } });
  await user.press(button('Undo'));
  expect(screen.getByTestId('native-editor-글 본문').props.accessibilityValue.text).toContain('<img');
  await user.press(button('편집기 더보기')); await user.press(button('Finish photo selection')); await flush();
  expect(screen.getByLabelText('이미지 뒤 본문 1')).toBeVisible();
  await user.press(button('해질녘 풍경 이미지 선택')); await user.press(button('해질녘 풍경 이미지 삭제'));
  await user.press(button('Undo')); expect(button('해질녘 풍경 이미지 선택')).toBeVisible();
}, 30000);

it('삭제한 기기 사진은 미리보기 왕복 뒤에도 Undo로 복원되고 편집 수명이 끝날 때 정리된다', async () => {
  const release = jest.fn();
  const source = createDeviceEditorImageSource(async () => ({ image: { id: 'device-photo', uri: 'file:///photo.jpg', width: 800, height: 600 }, release }));
  const { user, open, view } = await setup(source);
  await open(); await fireEvent.changeText(screen.getByLabelText('글 제목'), '사진 이력');
  await fireEvent.changeText(screen.getByLabelText('글 본문'), '앞 문장');
  await user.press(button('이미지 삽입')); await user.press(button('사진 라이브러리 선택')); await flush();
  await user.press(button('선택한 사진 이미지 선택')); await user.press(button('선택한 사진 이미지 삭제')); await flush();
  expect(release).not.toHaveBeenCalled();
  await user.press(button('Next')); await user.press(button('발행 미리보기 닫기'));
  await user.press(button('Undo')); expect(button('선택한 사진 이미지 선택')).toBeVisible();
  expect(source.resolve('device-photo')).toEqual({ uri: 'file:///photo.jpg' });
  await view.unmount(); await act(async () => {}); expect(release).toHaveBeenCalledTimes(1);
}, 30000);

it('실제 홈에서 이미지 삽입 실패·재시도와 앞뒤 본문 편집·삭제·저장 후 새 글을 연결한다', async () => {
  const { user, open, pick } = await setup(createMockEditorImageSource({ delayMs: 0, prepareFailures: 1 }));
  await open(); await fireEvent.changeText(screen.getByLabelText('글 제목'), '사진이 있는 글');
  await fireEvent.changeText(screen.getByLabelText('글 본문'), '이미지 앞'); await pick(); await flush();
  expect(button('이미지 삽입 다시 시도')).toBeVisible(); await user.press(button('이미지 삽입 다시 시도')); await flush();
  await fireEvent.changeText(screen.getByLabelText('이미지 뒤 본문 1'), '이미지 뒤');
  expect(button('해질녘 풍경 이미지 선택')).toBeVisible();
  await user.press(button('해질녘 풍경 이미지 선택')); await user.press(button('해질녘 풍경 이미지 삭제'));
  expect(screen.queryByRole('button', { name: '해질녘 풍경 이미지 선택' })).toBeNull();
  expect(screen.getByText('이미지 앞')).toBeVisible(); expect(screen.getByText('이미지 뒤')).toBeVisible();
  await user.press(button('편집기 닫기')); await screen.findByRole('button', { name: 'Write a story' }); await open();
  expect(screen.getByLabelText('글 제목')).toHaveDisplayValue('');
}, 30000);

it('사진 선택 취소는 이전 제목·본문으로 복귀하고 삽입 성공은 이미지 뒤 본문에 입력 포커스를 요청한다', async () => {
  const focus = jest.spyOn(TextInput.prototype, 'focus');
  try {
    const { user, open, pick } = await setup(createMockEditorImageSource({ delayMs: 0 }));
    await open();
    await fireEvent(screen.getByLabelText('글 제목'), 'focus');
    await user.press(button('이미지 삽입')); focus.mockClear();
    await user.press(button('이미지 선택 취소')); await flush();
    expect(focus).toHaveBeenCalledTimes(1);
    expect(focus.mock.contexts[0]).toMatchObject({ props: { accessibilityLabel: '글 제목' } });
    await fireEvent(screen.getByLabelText('글 본문'), 'focus');
    await fireEvent.changeText(screen.getByLabelText('글 본문'), '사진 앞 문단');
    await fireEvent(screen.getByLabelText('글 본문'), 'selectionChange', { nativeEvent: { selection: { start: 7, end: 7 } } });
    await user.press(button('이미지 삽입')); focus.mockClear();
    await user.press(button('이미지 선택 취소')); await flush();
    expect(focus).toHaveBeenCalledTimes(1);
    expect(focus.mock.contexts[0]).toMatchObject({ props: { accessibilityLabel: '글 본문' } });
    expect(screen.getByLabelText('글 본문')).toHaveProp('selection', { start: 7, end: 7 });
    focus.mockClear(); await pick(); await flush();
    expect(focus).toHaveBeenCalledTimes(1);
    expect(focus.mock.contexts[0]).toMatchObject({ props: { accessibilityLabel: '이미지 뒤 본문 1' } });
    expect(screen.getByLabelText('이미지 뒤 본문 1')).toHaveProp('selection', { start: 0, end: 0 });
  } finally {
    focus.mockRestore();
  }
}, 30000);

it('삽입 취소·문서 변경·공급부 교체 뒤 늦은 자산은 해제하고 새 문서에 부활시키지 않는다', async () => {
  const requests: ((lease: ImageLease) => void)[] = [];
  const source = { ...createMockEditorImageSource({ delayMs: 0 }), prepare: jest.fn(() => new Promise<ImageLease>(resolve => requests.push(resolve))) };
  const asset: ImageAsset = { assetId: 'local-sunset', description: '해질녘 풍경', credit: 'Local fixture', width: 240, height: 168 };
  const { user, open, pick, replace, view } = await setup(source); await open();
  await pick(); await user.press(button('이미지 삽입 취소'));
  const released = jest.fn(); await act(async () => requests[0]!({ asset, release: released }));
  expect(released).toHaveBeenCalledTimes(1); expect(screen.queryByRole('button', { name: '해질녘 풍경 이미지 선택' })).toBeNull();
  await pick('사진 촬영 선택'); await fireEvent.changeText(screen.getByLabelText('글 제목'), '나중에 수정');
  await act(async () => requests[1]!({ asset, release: released })); expect(released).toHaveBeenCalledTimes(2);
  await pick('사진 라이브러리 선택'); await replace(createMockEditorImageSource({ delayMs: 0 }));
  await act(async () => requests[2]!({ asset, release: released })); expect(released).toHaveBeenCalledTimes(3);
  expect(screen.queryByRole('button', { name: '해질녘 풍경 이미지 선택' })).toBeNull();
  await replace(source); await pick(); await view.unmount();
  await act(async () => requests[3]!({ asset, release: released })); expect(released).toHaveBeenCalledTimes(4);
}, 30000);

it('삽입 중 A에서 B와 같은 A로 재로그인해도 이전 개인 선택기와 늦은 사진이 새 편집기에 나타나지 않는다', async () => {
  const requests: ((lease: ImageLease) => void)[] = [];
  const source = { ...createMockEditorImageSource({ delayMs: 0 }), prepare: () => new Promise<ImageLease>(resolve => requests.push(resolve)) };
  const asset: ImageAsset = { assetId: 'local-sunset', description: '해질녘 풍경', credit: 'Local fixture', width: 240, height: 168 };
  const { open, pick, switchTo } = await setup(source); const release = jest.fn();
  await open(); await pick(); await switchTo(mockUserB.id); await open();
  await act(async () => requests[0]!({ asset, release })); expect(release).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole('button', { name: '해질녘 풍경 이미지 선택' })).toBeNull();
  await switchTo(mockUserA.id); await open(); await pick(); await switchTo(mockUserA.id); await open();
  await act(async () => requests[1]!({ asset, release })); expect(release).toHaveBeenCalledTimes(2);
  expect(screen.queryByRole('button', { name: '해질녘 풍경 이미지 선택' })).toBeNull();
}, 30000);

it('잘못된 자산 응답은 해제하고 재시도한 이미지의 표시 실패·삭제·화면 이탈은 각각 자원을 한 번 정리한다', async () => {
  const base = createMockEditorImageSource({ delayMs: 0 }); const release = jest.fn(); let invalid = true;
  const source: EditorImageSource = { ...base, prepare: async () => ({
    asset: { assetId: invalid ? 'wrong' : 'local-sunset', description: '해질녘 풍경', credit: 'Local fixture', width: 240, height: 168 }, release,
  }) };
  const { user, open, pick, view } = await setup(source); await open(); await pick();
  expect(button('이미지 삽입 다시 시도')).toBeVisible(); expect(release).toHaveBeenCalledTimes(1);
  invalid = false; await user.press(button('이미지 삽입 다시 시도'));
  await fireEvent(screen.getByLabelText('해질녘 풍경'), 'error', { nativeEvent: { error: 'decode' } });
  expect(button('해질녘 풍경 이미지 삭제')).toBeVisible();
  await user.press(button('해질녘 풍경 표시 다시 시도'));
  await user.press(button('해질녘 풍경 이미지 삭제')); expect(release).toHaveBeenCalledTimes(2);
  await pick(); await fireEvent(screen.getByLabelText('해질녘 풍경'), 'error', { nativeEvent: { error: 'decode' } });
  await user.press(button('해질녘 풍경 이미지 삭제')); expect(release).toHaveBeenCalledTimes(3);
  await pick(); await view.unmount(); expect(release).toHaveBeenCalledTimes(4);
}, 30000);
