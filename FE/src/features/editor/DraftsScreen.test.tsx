import { act, render, screen, userEvent } from '@testing-library/react-native';
import { changeBody, emptyEditor } from './editorModel';
import { createMockDraftSource } from './draftSource';
import { DraftsScreen } from './DraftsScreen';

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-11-24T00:00:00Z'));
});
afterEach(() => jest.useRealTimers());

it('초안 목록을 열어 둔 동안 수정 경과 시간만 갱신하고 저장·재조회 없이 같은 초안을 재개한다', async () => {
  const source = createMockDraftSource({ delayMs: 0 });
  const userId = 'draft-reader';
  const draftId = source.newId(userId);
  const document = { ...changeBody(emptyEditor(), '유지할 본문').document, title: '시간이 흐르는 초안' };
  await source.save({ userId, draftId, document, operationId: 'initial' }, new AbortController().signal);
  const save = jest.spyOn(source, 'save');
  const list = jest.spyOn(source, 'list');
  const onOpen = jest.fn();
  const view = await render(<DraftsScreen source={source} userId={userId} onOpen={onOpen} onClose={jest.fn()} />);
  expect(await screen.findByText('Edited just now')).toBeVisible();
  await act(async () => { await jest.advanceTimersByTimeAsync(60000); });
  expect(screen.getByText('Edited 1 minute ago')).toBeVisible();
  await act(async () => { await jest.advanceTimersByTimeAsync(60000); });
  expect(screen.getByText('Edited 2 minutes ago')).toBeVisible();
  expect(list).toHaveBeenCalledTimes(1);
  expect(save).not.toHaveBeenCalled();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(screen.getByRole('button', { name: '시간이 흐르는 초안 초안 재개' }));
  expect(onOpen).toHaveBeenCalledWith(draftId);
  await view.unmount();
  // 목록과 터치 처리의 유한 타이머가 끝난 뒤 반복 타이머가 남지 않는지 확인한다.
  await act(async () => { await jest.advanceTimersByTimeAsync(60000); });
  expect(jest.getTimerCount()).toBe(0);
});
