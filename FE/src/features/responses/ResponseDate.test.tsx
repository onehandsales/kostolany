import { act, render, screen } from '@testing-library/react-native';
import { AppState, type AppStateStatus } from 'react-native';

import { ResponseDate, formatResponseDate } from './ResponseDate';
import { responseFixtures } from './data/responseFixtures';

const createdAt = '2026-11-24T01:00:00.000Z';
const response = { ...responseFixtures({ kind: 'article', id: 'medium-brain' })[0]!, createdAt, dateLabel: undefined };
const previousState = AppState.currentState;
beforeEach(() => { jest.useFakeTimers(); jest.setSystemTime(new Date(createdAt)); AppState.currentState = 'active'; });
afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); AppState.currentState = previousState; });

it('작성 후 초 단위 경과와 수정 시각을 반영하고 보관된 원본 날짜는 바꾸지 않는다', async () => {
  const view = await render(<ResponseDate response={response} active style={{}} />);
  expect(screen.getByText('Now')).toBeVisible();
  await act(async () => { jest.advanceTimersByTime(2000); });
  expect(screen.getByText('2 seconds ago')).toBeVisible();
  await view.rerender(<ResponseDate response={{ ...response, updatedAt: new Date().toISOString() }} active style={{}} />);
  expect(screen.getByText('Now (edited)')).toBeVisible();
  await act(async () => { jest.advanceTimersByTime(1000); });
  expect(screen.getByText('1 second ago (edited)')).toBeVisible();
  expect(formatResponseDate({ ...response, dateLabel: 'Apr 29, 2025' }, Date.now())).toBe('Apr 29, 2025');
  expect(formatResponseDate(response, Date.parse(createdAt) + 60000)).toBe('1 minute ago');
  expect(formatResponseDate(response, Date.parse(createdAt) + 3600000)).toBe('1 hour ago');
});

it('화면 이탈과 앱 백그라운드에서 시계를 멈추고 복귀할 때 실제 경과 시간을 반영한다', async () => {
  let change: ((state: AppStateStatus) => void) | undefined;
  const remove = jest.fn();
  const interval = jest.spyOn(globalThis, 'setInterval');
  const clear = jest.spyOn(globalThis, 'clearInterval');
  jest.spyOn(AppState, 'addEventListener').mockImplementation((_event, listener) => { change = listener; return { remove }; });
  const view = await render(<ResponseDate response={response} active style={{}} />);
  await act(async () => { AppState.currentState = 'background'; change?.('background'); jest.advanceTimersByTime(3000); });
  expect(screen.getByText('Now')).toBeVisible();
  await act(async () => { AppState.currentState = 'active'; change?.('active'); });
  expect(screen.getByText('3 seconds ago')).toBeVisible();
  await view.rerender(<ResponseDate response={response} active={false} style={{}} />);
  await act(async () => { jest.advanceTimersByTime(2000); });
  expect(screen.getByText('3 seconds ago')).toBeVisible();
  await view.rerender(<ResponseDate response={response} active style={{}} />);
  expect(screen.getByText('5 seconds ago')).toBeVisible();
  await view.unmount();
  expect(remove).toHaveBeenCalled();
  for (const timer of interval.mock.results) expect(clear).toHaveBeenCalledWith(timer.value);
});
