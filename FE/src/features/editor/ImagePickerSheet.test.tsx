import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { ImagePickerSheet } from './ImagePickerSheet';
import { createMockEditorImageSource, type ImageAsset, type ImagePermission } from './imageSource';

beforeEach(() => jest.useFakeTimers()); afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const asset: ImageAsset = { assetId: 'local-sunset', description: '노을', credit: 'Local fixture', width: 240, height: 168 };
const flush = () => act(async () => { jest.advanceTimersByTime(1000); });

it('작가명이 포함된 목록 미리보기는 중복 표기를 숨기고 본문용 사진의 크기와 식별자로 선택한다', async () => {
  const preview = { image: { uri: 'file:///picker-with-credit.png' }, width: 516, height: 690, includesCredit: true };
  const bodyImage = { uri: 'file:///body-without-picker-text.png' };
  const bodyAsset: ImageAsset = { assetId: 'reference-snow-lake', description: 'Snowy forest and lake', credit: 'Ahmet Yüksek', width: 1071, height: 1188 };
  const source = { ...createMockEditorImageSource(), search: async () => [bodyAsset], resolve: () => bodyImage, preview: () => preview };
  const select = jest.fn(); const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await render(<ImagePickerSheet source={source} onClose={jest.fn()} onSelect={select} />);
  await user.press(button('Unsplash 사진 검색')); await flush();
  expect(screen.getByLabelText(bodyAsset.description)).toHaveProp('source', preview.image);
  expect(screen.getByLabelText(bodyAsset.description)).toHaveStyle({ aspectRatio: 516 / 690 });
  expect(screen.queryByText(bodyAsset.credit)).toBeNull();
  expect(button('Snowy forest and lake 삽입')).toHaveProp('accessibilityHint', 'Photo by Ahmet Yüksek');
  await user.press(button('Snowy forest and lake 삽입'));
  expect(select).toHaveBeenCalledWith(bodyAsset, 'unsplash');
});

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

it('실제 선택 adapter의 동기 실패는 재시도할 수 있고 성공 선택은 부모에 넘긴 뒤 이탈 시 해제한다', async () => {
  const released = jest.fn(); const selected = jest.fn();
  const pick = jest.fn<Promise<import('./imageSource').ImageLease | null>, ['camera' | 'library', AbortSignal]>()
    .mockImplementationOnce(() => { throw new Error('sync picker failure'); })
    .mockResolvedValueOnce({ asset, release: released });
  const source = { ...createMockEditorImageSource({ delayMs: 0 }), pick };
  const view = await render(<ImagePickerSheet source={source} onClose={jest.fn()} onSelect={selected} />);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(button('사진 라이브러리 선택'));
  await user.press(await screen.findByRole('button', { name: '사진 다시 시도' }));
  expect(selected).toHaveBeenCalledWith(asset, 'library');
  expect(released).not.toHaveBeenCalled();
  await view.unmount(); expect(released).toHaveBeenCalledTimes(1);
});

it('선택 중 source 교체 뒤 늦은 사진을 해제하고 자동으로 새 OS 선택기를 열지 않는다', async () => {
  let finish!: (lease: import('./imageSource').ImageLease) => void;
  const released = jest.fn(); const selected = jest.fn();
  const source = { ...createMockEditorImageSource(), pick: jest.fn(() => new Promise<import('./imageSource').ImageLease>(resolve => { finish = resolve; })) };
  const next = { ...createMockEditorImageSource(), pick: jest.fn(async () => null) };
  const view = await render(<ImagePickerSheet source={source} onClose={jest.fn()} onSelect={selected} />);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(button('사진 촬영 선택'));
  await view.rerender(<ImagePickerSheet source={next} onClose={jest.fn()} onSelect={selected} />);
  await act(async () => finish({ asset, release: released }));
  expect(released).toHaveBeenCalledTimes(1); expect(selected).not.toHaveBeenCalled(); expect(next.pick).not.toHaveBeenCalled();
  expect(button('사진 촬영 선택')).toBeVisible();
});
