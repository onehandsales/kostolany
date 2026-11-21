import { act, fireEvent, render, screen } from '@testing-library/react-native';
import * as Native from 'react-native';
import { Pressable, Text, View } from 'react-native';

import { useTheme } from '../../shared/theme/ThemeProvider';
import { deferred } from '../feed/tests/helpers';
import { DisplaySettingsProvider, ReaderTheme, useDisplaySettings } from './DisplaySettingsProvider';
import { defaultDisplaySettings, type DisplaySettings, type DisplaySettingsSource } from './displayTypes';

function Probe() {
  const { colors } = useTheme(); const { state, store } = useDisplaySettings();
  return <View testID="surface" style={{ backgroundColor: colors.background }}>
    <Text>{`${state.settings.appTheme}/${state.settings.fontScale}`}</Text>
    <Text>{`status:${state.readStatus}/save-error:${state.hasSaveError}`}</Text>
    <Pressable accessibilityRole="button" accessibilityLabel="어둡게" onPress={() => store?.update({ appTheme: 'dark', fontScale: 120 })} />
    <Pressable accessibilityRole="button" accessibilityLabel="기사 밝게" onPress={() => store?.update({ readerTheme: 'light' })} />
    <ReaderTheme><ReaderProbe /></ReaderTheme>
  </View>;
}
function ReaderProbe() { const { colors } = useTheme(); return <View testID="reader" style={{ backgroundColor: colors.background }} />; }

it('A의 늦은 저장을 B에 노출하지 않고 A 복귀에서 선택과 기사 우선순위를 보존한다', async () => {
  const pending = deferred<{ owner: string; settings: DisplaySettings }>();
  const source: DisplaySettingsSource = { read: async (owner) => ({ owner, settings: defaultDisplaySettings }), save: () => pending.promise };
  const app = (id: string | null) => <DisplaySettingsProvider userId={id} source={source}><Probe /></DisplaySettingsProvider>;
  const view = await render(app('A')); await screen.findByText('system/100');
  await fireEvent.press(screen.getByLabelText('어둡게'));
  expect(screen.getByTestId('surface')).toHaveStyle({ backgroundColor: '#121212' });
  expect(screen.getByTestId('reader')).toHaveStyle({ backgroundColor: '#121212' });
  await view.rerender(app('B')); await screen.findByText('system/100');
  await act(async () => pending.resolve({ owner: JSON.stringify('A'), settings: { ...defaultDisplaySettings, appTheme: 'dark', fontScale: 120 } }));
  expect(screen.getByText('system/100')).toBeOnTheScreen();
  await view.rerender(app('A')); expect(screen.getByText('dark/120')).toBeOnTheScreen();
  await fireEvent.press(screen.getByLabelText('기사 밝게'));
  expect(screen.getByTestId('reader')).toHaveStyle({ backgroundColor: '#ffffff' });
  expect(screen.getByTestId('surface')).toHaveStyle({ backgroundColor: '#121212' });
  await view.rerender(app(null)); await screen.findByText('system/100');
});

it('같은 A 재로그인은 이전 조회 실패와 저장 오류를 버리고 확정된 테마로 돌아온다', async () => {
  const oldRead = deferred<{ owner: string; settings: DisplaySettings }>();
  const oldSave = deferred<{ owner: string; settings: DisplaySettings }>();
  let reads = 0;
  const source: DisplaySettingsSource = {
    read: async owner => ++reads === 1 ? oldRead.promise : { owner, settings: defaultDisplaySettings },
    save: () => oldSave.promise,
  };
  const app = (revision: number) => <DisplaySettingsProvider userId="A" revision={revision} source={source}><Probe /></DisplaySettingsProvider>;
  const view = await render(app(1));
  await view.rerender(app(2));
  await screen.findByText('status:ready/save-error:false');
  await act(async () => oldRead.reject(new Error('old-read')));
  expect(screen.getByText('status:ready/save-error:false')).toBeOnTheScreen();
  await fireEvent.press(screen.getByLabelText('어둡게'));
  await view.rerender(app(3));
  await act(async () => oldSave.reject(new Error('old-save')));
  expect(screen.getByText('system/100')).toBeOnTheScreen();
  expect(screen.getByText('status:ready/save-error:false')).toBeOnTheScreen();
  expect(screen.getByTestId('surface')).toHaveStyle({ backgroundColor: '#ffffff' });
});

it('플랫폼 훅의 테마 값이 바뀌면 System만 따라가고 명시적 Dark는 유지한다', async () => {
  const scheme = jest.spyOn(Native, 'useColorScheme').mockReturnValue('light');
  try {
    const app = () => <DisplaySettingsProvider userId={null}><Probe /></DisplaySettingsProvider>;
    const view = await render(app());
    expect(screen.getByTestId('surface')).toHaveStyle({ backgroundColor: '#ffffff' });
    scheme.mockReturnValue('dark'); await view.rerender(app());
    expect(screen.getByTestId('surface')).toHaveStyle({ backgroundColor: '#121212' });
    await fireEvent.press(screen.getByLabelText('어둡게'));
    scheme.mockReturnValue('light'); await view.rerender(app());
    expect(screen.getByTestId('surface')).toHaveStyle({ backgroundColor: '#121212' });
  } finally { scheme.mockRestore(); }
});
