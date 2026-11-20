import { act, render, screen, userEvent, waitFor } from '@testing-library/react-native';

import { deferred } from '../feed/tests/helpers';
import { ClapControl } from './ClapControl';
import { ClapProvider } from './ClapProvider';
import { createMockClapSource } from './data/createMockClapSource';
import type { ClapSource, ClapValue } from './types';

const target = { kind: 'article', id: 'example-latest-exchange' } as const;
const title = '긴 한국어 제목의 박수와 실패 복구';
const control = <ClapControl target={target} title={title} size={24} />;
const initial: ClapValue = { userId: 'A', target, mine: 0, total: 0 };
const button = () => screen.getByRole('button', { name: `박수 보내기, ${title}` });

it('A의 늦은 실패와 이전 오류가 B 전환 및 같은 A 재로그인 화면에 남지 않는다', async () => {
  const pending = deferred<ClapValue>();
  const source: ClapSource = { read: async identity => ({ ...initial, userId: identity.userId }), save: () => pending.promise };
  const user = userEvent.setup();
  const view = await render(<ClapProvider userId="A" revision={1} source={source}>{control}</ClapProvider>);
  await waitFor(() => expect(button()).toBeEnabled());
  await user.press(button());
  await view.rerender(<ClapProvider userId="B" revision={2} source={source}>{control}</ClapProvider>);
  await act(async () => pending.reject(new Error('Old A failure')));
  expect(screen.queryByRole('alert')).toBeNull();
  await view.rerender(<ClapProvider userId="A" revision={3} source={source}>{control}</ClapProvider>);
  expect(screen.queryByRole('alert')).toBeNull();
  await user.press(button());
  await screen.findByRole('alert');
  await view.rerender(<ClapProvider userId="A" revision={4} source={source}>{control}</ClapProvider>);
  expect(screen.queryByRole('alert')).toBeNull();
});

it.each(['read-error', 'write-error'] as const)('%s를 구분해 보여주고 재시도 후 박수 목표를 복구한다', async scenario => {
  const user = userEvent.setup();
  await render(<ClapProvider userId="A" source={createMockClapSource({ delayMs: 0, scenario })}>{control}</ClapProvider>);
  if (scenario === 'write-error') {
    await waitFor(() => expect(button()).toBeEnabled());
    await user.press(button());
  }
  await screen.findByRole('alert');
  expect(button()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 0, max: 50 }));
  if (scenario === 'read-error') expect(button()).toBeDisabled();
  await user.press(screen.getByRole('button', { name: `박수 다시 시도, ${title}` }));
  await waitFor(() => expect(button()).toBeEnabled());
  expect(button()).toHaveProp('accessibilityValue', expect.objectContaining({ now: scenario === 'write-error' ? 1 : 0 }));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  expect(button()).toHaveStyle({ minWidth: 48, minHeight: 48 });
});

it.each(['success', 'failure'] as const)('공급부 교체 전 늦은 %s는 새 수치와 팝업에 영향을 주지 않는다', async outcome => {
  const pending = deferred<ClapValue>();
  const source: ClapSource = { read: async () => initial, save: () => pending.promise };
  const user = userEvent.setup();
  const view = await render(<ClapProvider userId="A" source={source}>{control}</ClapProvider>);
  await waitFor(() => expect(button()).toBeEnabled());
  await user.press(button());
  await user.press(screen.getByRole('button', { name: `박수 목록, ${title}, 1회` }));
  expect(screen.getByText('You · 1 claps')).toBeVisible();
  await view.rerender(<ClapProvider userId="A" source={createMockClapSource({ delayMs: 0 })}>{control}</ClapProvider>);
  await waitFor(() => expect(button()).toBeEnabled());
  await act(async () => outcome === 'success'
    ? pending.resolve({ ...initial, mine: 1, total: 1 }) : pending.reject(new Error('old')));
  expect(button()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 0 }));
  expect(screen.queryByText('You · 1 claps')).not.toBeOnTheScreen();
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});

it('같은 계정의 새 인증 revision은 열린 참여자 목록만 닫고 확정 박수를 유지한다', async () => {
  const source = createMockClapSource({ delayMs: 0 });
  const user = userEvent.setup();
  const view = await render(<ClapProvider userId="A" revision={1} source={source}>{control}</ClapProvider>);
  await waitFor(() => expect(button()).toBeEnabled());
  await user.press(button());
  await user.press(screen.getByRole('button', { name: `박수 목록, ${title}, 1회` }));
  await view.rerender(<ClapProvider userId="A" revision={2} source={source}>{control}</ClapProvider>);
  expect(screen.queryByText('You · 1 claps')).not.toBeOnTheScreen();
  expect(button()).toHaveProp('accessibilityValue', expect.objectContaining({ now: 1 }));
});
