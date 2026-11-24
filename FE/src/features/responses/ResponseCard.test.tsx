import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { deferred } from '../feed/tests/helpers';
import { ResponseCard } from './ResponseCard';
import { createResponseStore } from './createResponseStore';
import { createMockResponseSource } from './data/createMockResponseSource';
import { responseFixtures } from './data/responseFixtures';
import type { ResponseValue } from './types';

const target = { kind: 'article' as const, id: 'medium-brain' };
const response = responseFixtures(target)[0]!;

it('연속 박수는 한 번만 제출하고 이탈 후 늦은 실패와 열린 메뉴를 복귀 화면에 남기지 않는다', async () => {
  const late = deferred<ResponseValue>();
  const source = createMockResponseSource({ delayMs: 0 });
  const execute = jest.fn(() => late.promise);
  const store = createResponseStore({ ...source, execute }, 'A');
  await store.refresh(target);
  const tree = (active: boolean) => <SafeAreaProvider><ResponseCard response={response} target={target}
    active={active} childCount={1} repliesVisible store={store} onReply={() => {}} onEdit={() => {}}
    onDelete={() => {}} onToggleReplies={() => {}} onRequireLogin={() => {}} /></SafeAreaProvider>;
  const view = await render(tree(true));
  const clap = screen.getByRole('button', { name: 'Clap response, brain-bernie' });
  await act(async () => { await fireEvent.press(clap); await fireEvent.press(clap); });
  expect(execute).toHaveBeenCalledTimes(1);
  const user = userEvent.setup();
  await user.press(screen.getByRole('button', { name: 'Bérnie response options' }));
  expect(screen.getByLabelText('응답 메뉴')).toBeVisible();
  await view.rerender(tree(false));
  await act(async () => { late.reject(new Error('late')); });
  await view.rerender(tree(true));
  expect(screen.queryByLabelText('응답 메뉴')).toBeNull();
  expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.getByRole('button', { name: 'Clap response, brain-bernie' })).not.toBeDisabled();
});
