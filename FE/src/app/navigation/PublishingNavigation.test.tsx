import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { mockUserA } from '../../features/auth/data/mockUsers';
import { createMockDraftSource } from '../../features/editor/draftSource';
import { createMockEditorImageSource } from '../../features/editor/imageSource';
import { AppNavigator } from './AppNavigator';

beforeEach(() => jest.useFakeTimers()); afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1200); });
async function setup(source = createMockDraftSource({ delayMs: 0 })) {
  const view = await render(<SafeAreaProvider><AppNavigator initialUser={mockUserA} draftSource={source} editorImageSource={createMockEditorImageSource({ delayMs: 0 })} /></SafeAreaProvider>);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime }); await user.press(button('Write a story'));
  await fireEvent.changeText(screen.getByLabelText('글 제목'), '실제 발행 제목'); await fireEvent.changeText(screen.getByLabelText('글 본문'), 'fixture로 바꾸지 않는 작성 내용');
  return { user, source, view };
}
it('실제 편집기와 토픽·미리보기·발행·내 Stories·작성 상세를 이동하며 내용과 취소 초안을 보존한다', async () => {
  const { user, source } = await setup(); await user.press(button('Next')); await user.press(button('Topics')); await flush();
  await fireEvent.changeText(screen.getByLabelText('발행 토픽 검색'), 'Music'); await flush(); await user.press(screen.getByRole('checkbox', { name: 'Music 3.1M followers 토픽' }));
  await user.press(button('토픽 검색어 지우기')); await flush(); expect(button('Music 선택 토픽 제거')).toBeVisible(); await user.press(button('토픽 선택 취소'));
  expect(screen.getByText('No topics added')).toBeVisible(); await user.press(button('Topics')); await flush();
  for (const query of ['Music', 'Culture', 'Art', 'Business', 'Health']) {
    await fireEvent.changeText(screen.getByLabelText('발행 토픽 검색'), query); await flush();
    const row = screen.getAllByRole('checkbox').find(item => String(item.props.accessibilityLabel).startsWith(`${query} `))!; await user.press(row);
  }
  await fireEvent.changeText(screen.getByLabelText('발행 토픽 검색'), 'Design'); await flush(); await user.press(screen.getByRole('checkbox', { name: 'Design 7.1M followers 토픽' })); expect(screen.getByText('토픽은 최대 5개까지 선택할 수 있어요.')).toBeVisible();
  await user.press(button('Music 선택 토픽 제거')); await user.press(screen.getByRole('checkbox', { name: 'Design 7.1M followers 토픽' })); await user.press(button('발행 토픽 저장'));
  await user.press(button('발행 미리보기 Edit')); expect(screen.getByLabelText('글 제목')).toHaveDisplayValue('실제 발행 제목'); await user.press(button('Next'));
  await user.press(button('Publish now')); await flush(); await user.press(await screen.findByRole('button', { name: '실제 발행 제목 발행한 글 열기' })); await flush();
  expect(screen.getByText('fixture로 바꾸지 않는 작성 내용')).toBeVisible(); expect(screen.queryByText('설명 수준')).toBeNull();
  await user.press(button('작성 글 뒤로')); expect(await screen.findByRole('button', { name: '실제 발행 제목 발행한 글 열기' })).toBeVisible();
  expect(await source.list(mockUserA.id, new AbortController().signal)).toEqual([]); expect((await source.stories(mockUserA.id, new AbortController().signal))[0]?.publishing.topicIds).toHaveLength(5);
}, 40000);
it('발행 실패와 응답 유실 재시도 후 Unlisted는 별도 내 목록에서 읽고 발행 데이터 공급부 교체를 반영한다', async () => {
  const { user, source, view } = await setup(createMockDraftSource({ delayMs: 0, publishFailures: 1, lostPublishResponses: 1 }));
  await user.press(button('Next')); await fireEvent(screen.getByLabelText('Unlisted'), 'valueChange', true);
  await user.press(button('Publication')); await user.press(screen.getAllByRole('radio')[1]!); await user.press(button('Publication 선택 취소')); expect(screen.getByText('No publication selected')).toBeVisible();
  await user.press(button('Publish now')); await user.press(await screen.findByRole('button', { name: '발행 다시 시도' })); await flush();
  expect(screen.getByText('발행 결과를 확인하지 못했어요. 같은 요청으로 결과를 확인해 주세요.')).toBeVisible(); expect(button('발행 미리보기 Edit')).toBeDisabled();
  await user.press(button('발행 다시 시도')); await flush(); expect(screen.queryByRole('button', { name: '실제 발행 제목 발행한 글 열기' })).toBeNull();
  await user.press(button('Public stories')); await user.press(screen.getByRole('radio', { name: 'Unlisted' })); await flush(); await user.press(await screen.findByRole('button', { name: '실제 발행 제목 발행한 글 열기' })); await flush();
  expect(screen.getByText('fixture로 바꾸지 않는 작성 내용')).toBeVisible(); expect(await source.stories(mockUserA.id, new AbortController().signal, 'unlisted', mockUserA.id)).toHaveLength(1);
  await view.rerender(<SafeAreaProvider><AppNavigator initialUser={mockUserA} draftSource={createMockDraftSource({ delayMs: 0 })} /></SafeAreaProvider>); await flush(); expect(screen.getByText('이 글을 찾을 수 없어요.')).toBeVisible();
}, 30000);
