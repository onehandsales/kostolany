import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { StrictMode, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { deferred } from '../feed/tests/helpers';
import type { ReadingSettingsStore } from './createReadingSettingsStore';
import { createMockReadingSettingsSource } from './data/createMockReadingSettingsSource';
import { ReadingSettingsProvider, useReadingSettings, useSettingsScopeKey } from './ReadingSettingsProvider';
import { SettingsScreen } from './SettingsScreen';
import type { ReadingSettings, ReadingSettingsSource } from './types';

const initial: ReadingSettings = { userId: 'example-reader', defaultLevel: 'adult' };
const button = (name: string) => screen.getByRole('button', { name });
const radio = (name: string) => screen.getByRole('radio', { name: `${name} 기본 수준` });
const ignore = () => undefined;
function Content({ isFocused, onStore }: { isFocused: boolean; onStore: (store: ReadingSettingsStore) => void }) {
  const { store } = useReadingSettings(); const key = useSettingsScopeKey();
  useEffect(() => { if (store) onStore(store); }, [store, onStore]);
  return <SettingsScreen key={key} isFocused={isFocused} onBack={ignore} onLogout={ignore} />;
}
function Subject({ source, isFocused = true, onStore = ignore }: {
  source: ReadingSettingsSource; isFocused?: boolean; onStore?: (store: ReadingSettingsStore) => void;
}) {
  return <StrictMode><SafeAreaProvider><ReadingSettingsProvider userId={initial.userId} sessionRevision={0} source={source}>
    <Content isFocused={isFocused} onStore={onStore} />
  </ReadingSettingsProvider></SafeAreaProvider></StrictMode>;
}
async function setup(source = createMockReadingSettingsSource({ delayMs: 0 })) {
  const view = await render(<Subject source={source} />); const user = userEvent.setup();
  await user.press(await screen.findByRole('button', { name: '기본 설명 수준 변경' }));
  return { user, view, source };
}
it.each(['취소', '닫기', '뒤로', '화면 이탈'] as const)('%s는 미제출 선택을 버리고 기존 값으로 다시 연다', async (action) => {
  const { user, view, source } = await setup(); const write = jest.spyOn(source, 'setDefaultLevel');
  expect(radio('성인')).toBeChecked(); await user.press(radio('중학생'));
  if (action === '취소' || action === '닫기') await user.press(button(`기본 설명 수준 ${action}`));
  else if (action === '뒤로') await fireEvent(screen.getByLabelText('기본 설명 수준 편집'), 'requestClose');
  else { await view.rerender(<Subject source={source} isFocused={false} />); await view.rerender(<Subject source={source} />); }
  expect(screen.getByText('현재 기본값 · 성인')).toBeVisible();
  await user.press(button('기본 설명 수준 변경')); expect(radio('성인')).toBeChecked(); expect(write).not.toHaveBeenCalled();
});
it('변경 없는 저장은 닫기만 하며 실패 후 선택을 보존하고 수정해 재시도한다', async () => {
  const source = createMockReadingSettingsSource({ delayMs: 0, scenario: 'save-error' });
  const write = jest.spyOn(source, 'setDefaultLevel'); const { user } = await setup(source);
  await user.press(button('기본 수준 저장')); expect(write).not.toHaveBeenCalled();
  await user.press(button('기본 설명 수준 변경')); await user.press(radio('초등학생')); await user.press(button('기본 수준 저장'));
  expect(await screen.findByRole('alert')).toHaveTextContent(/선택은 그대로/); expect(radio('초등학생')).toBeChecked();
  await user.press(radio('중학생')); await user.press(button('기본 수준 저장 다시 시도'));
  expect(await screen.findByText('현재 기본값 · 중학생')).toBeVisible();
});
it('저장 중 미제출 선택은 성공으로 닫히지 않으며 추가 제출의 성공만 닫는다', async () => {
  const requests: ReturnType<typeof deferred<ReadingSettings>>[] = [];
  const source: ReadingSettingsSource = { fetchSettings: async () => initial, setDefaultLevel: jest.fn(() => {
    const request = deferred<ReadingSettings>(); requests.push(request); return request.promise;
  }) };
  const { user } = await setup(source);
  await user.press(radio('중학생')); await user.press(button('기본 수준 저장')); expect(button('기본 수준 저장')).toBeDisabled();
  await user.press(radio('고등학생')); await act(async () => { requests[0]?.resolve({ ...initial, defaultLevel: 'middle' }); });
  expect(radio('고등학생')).toBeChecked(); expect(screen.getByText(/추가로 바꾼 수준/)).toBeVisible();
  await user.press(button('기본 수준 저장')); await act(async () => { requests[1]?.resolve({ ...initial, defaultLevel: 'high' }); });
  expect(screen.getByText('현재 기본값 · 고등학생')).toBeVisible(); expect(source.setDefaultLevel).toHaveBeenCalledTimes(2);
});
it.each(['success', 'failure'] as const)('닫기 후 늦은 저장 %s는 새 초안과 모달을 건드리지 않는다', async (outcome) => {
  const pending = deferred<ReadingSettings>();
  const source: ReadingSettingsSource = { fetchSettings: async () => initial, setDefaultLevel: () => pending.promise };
  const { user } = await setup(source);
  await user.press(radio('중학생')); await user.press(button('기본 수준 저장'));
  await user.press(button('기본 설명 수준 닫기')); await user.press(button('기본 설명 수준 변경')); await user.press(radio('고등학생'));
  await act(async () => { if (outcome === 'success') pending.resolve({ ...initial, defaultLevel: 'middle' }); else pending.reject(new Error('old')); });
  expect(radio('고등학생')).toBeChecked(); expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await user.press(button('기본 설명 수준 닫기'));
  expect(screen.getByText(`현재 기본값 · ${outcome === 'success' ? '중학생' : '성인'}`)).toBeVisible();
});
it.each(['success', 'failure'] as const)('편집 중 늦은 조회 %s는 선택을 바꾸지 않는다', async (outcome) => {
  const pending = deferred<ReadingSettings>();
  const source: ReadingSettingsSource = { ...createMockReadingSettingsSource({ delayMs: 0 }),
    fetchSettings: jest.fn().mockResolvedValueOnce(initial).mockImplementation(() => pending.promise) };
  let store: ReadingSettingsStore | undefined;
  await render(<Subject source={source} onStore={(value) => { store = value; }} />);
  const user = userEvent.setup(); await user.press(await screen.findByRole('button', { name: '기본 설명 수준 변경' }));
  await user.press(radio('고등학생')); await act(async () => { void store?.reload(); });
  await act(async () => { if (outcome === 'success') pending.resolve({ ...initial, defaultLevel: 'middle' }); else pending.reject(new Error('old')); });
  expect(radio('고등학생')).toBeChecked();
  await user.press(button('기본 수준 저장')); expect(await screen.findByText('현재 기본값 · 고등학생')).toBeVisible();
});
it('조회 실패에서는 편집할 수 없고 재시도로 최초 값을 표시한다', async () => {
  await render(<Subject source={createMockReadingSettingsSource({ delayMs: 0, scenario: 'read-error' })} />);
  expect(await screen.findByRole('alert')).toHaveTextContent('설정을 불러오지 못했어요.');
  expect(screen.queryByRole('button', { name: '기본 설명 수준 변경' })).not.toBeOnTheScreen();
  await userEvent.setup().press(button('설정 조회 다시 시도')); expect(await screen.findByText('현재 기본값 · 성인')).toBeVisible();
});
it.each(['success', 'failure'] as const)('공급부 교체 후 이전 저장 %s는 새 공급부 초안과 값을 변경하지 않는다', async (outcome) => {
  const pending = deferred<ReadingSettings>();
  const source: ReadingSettingsSource = { fetchSettings: async () => initial, setDefaultLevel: () => pending.promise };
  const { user, view } = await setup(source);
  await user.press(radio('중학생')); await user.press(button('기본 수준 저장'));
  await view.rerender(<Subject source={createMockReadingSettingsSource({ delayMs: 0 })} />);
  expect(screen.queryByLabelText('기본 설명 수준 편집')).not.toBeOnTheScreen();
  await user.press(await screen.findByRole('button', { name: '기본 설명 수준 변경' })); await user.press(radio('고등학생'));
  await act(async () => { if (outcome === 'success') pending.resolve({ ...initial, defaultLevel: 'middle' }); else pending.reject(new Error('old')); });
  expect(radio('고등학생')).toBeChecked(); expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});
