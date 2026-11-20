import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { ImagePickerSheet } from './ImagePickerSheet';
import { createMockEditorImageSource, type ImageAsset, type ImagePermission } from './imageSource';

beforeEach(() => jest.useFakeTimers()); afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const asset: ImageAsset = { assetId: 'local-sunset', description: '노을', credit: 'Local fixture', width: 240, height: 168 };
const flush = () => act(async () => { jest.advanceTimersByTime(1000); });

it('검색어가 바뀌면 이전 결과를 즉시 숨기고 응답 역전과 실패 뒤 같은 검색어 재시도를 처리한다', async () => {
  const requests: { query: string; resolve: (assets: ImageAsset[]) => void; reject: () => void }[] = [];
  const source = { ...createMockEditorImageSource({ delayMs: 0 }), search: (query: string) => new Promise<ImageAsset[]>((resolve, reject) => requests.push({ query, resolve, reject: () => reject(new Error('failure')) })) };
  const select = jest.fn(); const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<ImagePickerSheet source={source} onClose={jest.fn()} onSelect={select} />);
  await user.press(button('Unsplash 사진 검색')); await flush();
  await fireEvent.changeText(screen.getByLabelText('사진 검색'), '노을'); await flush();
  await act(async () => requests[1]!.resolve([asset])); expect(button('노을 삽입')).toBeVisible();
  await act(async () => requests[0]!.resolve([{ ...asset, description: '이전 검색' }])); expect(screen.queryByText('이전 검색')).toBeNull();
  await fireEvent.changeText(screen.getByLabelText('사진 검색'), '음악'); expect(screen.queryByRole('button', { name: '노을 삽입' })).toBeNull(); await flush();
  await act(async () => requests[2]!.reject()); expect(screen.getByLabelText('사진 검색')).toHaveDisplayValue('음악');
  await user.press(button('사진 다시 시도')); await flush(); await act(async () => requests[3]!.resolve([]));
  expect(requests[3]!.query).toBe('음악'); expect(screen.getByText('일치하는 사진이 없어요.')).toBeVisible();
  expect(select).not.toHaveBeenCalled();
});

it.each<ImagePermission>(['denied', 'limited', 'cancelled'])('기기 사진의 %s 권한을 빈 검색과 구분하고 사용자 취소는 자산을 삽입하지 않는다', async permission => {
  const source = createMockEditorImageSource({ delayMs: 0, permission }); const select = jest.fn(); const close = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<ImagePickerSheet source={source} onClose={close} onSelect={select} />);
  await user.press(button('사진 라이브러리 선택')); await flush(); await flush();
  if (permission === 'denied') expect(button('사진 권한 다시 확인')).toBeVisible();
  if (permission === 'limited') { expect(screen.getByText('선택한 사진만 접근할 수 있어요.')).toBeVisible(); expect(button('해질녘 풍경 삽입')).toBeVisible(); }
  if (permission === 'cancelled') expect(screen.getByText('사진 선택을 취소했어요.')).toBeVisible();
  await user.press(button('이미지 선택 취소')); expect(close).toHaveBeenCalledTimes(1); expect(select).not.toHaveBeenCalled();
});

it('공급부 교체와 화면 이탈은 이전 검색의 성공과 실패를 현재 선택기에 반영하지 않는다', async () => {
  let resolve!: (assets: ImageAsset[]) => void;
  const source = { ...createMockEditorImageSource(), search: () => new Promise<ImageAsset[]>(done => { resolve = done; }) };
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const view = await render(<ImagePickerSheet source={source} onClose={jest.fn()} onSelect={jest.fn()} />);
  await user.press(button('Unsplash 사진 검색')); await flush();
  await view.rerender(<ImagePickerSheet source={createMockEditorImageSource({ delayMs: 0 })} onClose={jest.fn()} onSelect={jest.fn()} />);
  await act(async () => resolve([{ ...asset, description: '이전 공급부' }])); await flush(); await flush();
  expect(screen.queryByRole('button', { name: '이전 공급부 삽입' })).toBeNull(); expect(button('해질녘 풍경 삽입')).toBeVisible();
  await view.unmount();
});
