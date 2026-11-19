import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { StrictMode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { deferred } from '../feed/tests/helpers';
import { createMockProfileSource } from './data/createMockProfileSource';
import { ProfileProvider } from './ProfileProvider';
import { ProfileScreen } from './ProfileScreen';
import type { Profile, ProfileSource } from './types';

const initial: Profile = { userId: 'example-reader', name: '예시 독자 A', bio: '' };
const button = (name: string) => screen.getByRole('button', { name });
const nameInput = () => screen.getByLabelText('이름 · 필수');

function Subject({ source, isFocused = true }: { source: ProfileSource; isFocused?: boolean }) {
  return <StrictMode><SafeAreaProvider><ProfileProvider userId={initial.userId} sessionRevision={0} source={source}>
    <ProfileScreen accountLabel="예시 독자 A" onLogout={() => undefined} isFocused={isFocused} />
  </ProfileProvider></SafeAreaProvider></StrictMode>;
}
async function setup(source = createMockProfileSource({ delayMs: 0 })) {
  const view = await render(<Subject source={source} />);
  await screen.findByRole('heading', { name: initial.name });
  const user = userEvent.setup();
  await user.press(screen.getByRole('tab', { name: 'About' }));
  expect(screen.getByLabelText('아직 짧은 소개가 없어요.')).toBeVisible();
  await user.press(button('프로필 편집'));
  return { user, view, source };
}

it('기존 값·빈 소개를 열고 한글 조합 원문을 유지하며 입력 오류를 수정해 저장하고 소개를 지운다', async () => {
  const { user, source } = await setup();
  const save = jest.spyOn(source, 'saveProfile');
  expect(nameInput()).toHaveDisplayValue(initial.name);
  expect(screen.getByLabelText('짧은 소개')).toHaveDisplayValue('');
  await fireEvent.changeText(nameInput(), '  ');
  await user.press(button('프로필 저장'));
  expect(screen.getByRole('alert')).toHaveTextContent('이름을 입력해 주세요.');
  await fireEvent.changeText(nameInput(), '한글😀');
  expect(nameInput()).toHaveDisplayValue('한글😀');
  await fireEvent(nameInput(), 'submitEditing', { nativeEvent: { text: '한글😀' } });
  expect(save).not.toHaveBeenCalled();
  await fireEvent.changeText(screen.getByLabelText('짧은 소개'), '첫 줄\n둘째 줄');
  await user.press(button('프로필 저장'));
  expect(await screen.findByRole('heading', { name: '한글😀' })).toBeVisible();
  expect(screen.getByText('첫 줄\n둘째 줄')).toBeVisible();
  await user.press(button('프로필 편집'));
  await user.clear(screen.getByLabelText('짧은 소개'));
  await user.press(button('프로필 저장'));
  expect(await screen.findByLabelText('아직 짧은 소개가 없어요.')).toBeVisible();
});

it.each(['취소', '닫기', '뒤로', '화면 이탈'] as const)('편집 %s는 확정 값을 바꾸지 않고 재진입에서 미제출 초안을 버린다', async (action) => {
  const { user, source, view } = await setup();
  const save = jest.spyOn(source, 'saveProfile');
  await fireEvent.changeText(nameInput(), '버릴 초안');
  if (action === '취소' || action === '닫기') await user.press(button(`프로필 편집 ${action}`));
  else if (action === '뒤로') await fireEvent(screen.getByLabelText('프로필 편집 창'), 'requestClose');
  else {
    await view.rerender(<Subject source={source} isFocused={false} />);
    await view.rerender(<Subject source={source} />);
  }
  expect(screen.getByRole('heading', { name: initial.name })).toBeVisible();
  await user.press(button('프로필 편집'));
  expect(nameInput()).toHaveDisplayValue(initial.name);
  expect(save).not.toHaveBeenCalled();
});

it('변경 없는 저장은 닫기만 하고 실패한 저장은 초안 보존 뒤 수정한 값으로 재시도한다', async () => {
  const source = createMockProfileSource({ delayMs: 0, scenario: 'save-error' });
  const save = jest.spyOn(source, 'saveProfile');
  const { user } = await setup(source);
  await user.press(button('프로필 저장'));
  expect(screen.queryByLabelText('이름 · 필수')).not.toBeOnTheScreen();
  expect(save).not.toHaveBeenCalled();
  await user.press(button('프로필 편집'));
  await fireEvent.changeText(nameInput(), '실패해도 남는 초안');
  await user.press(button('프로필 저장'));
  expect(await screen.findByRole('alert')).toHaveTextContent(/입력은 그대로/);
  expect(nameInput()).toHaveDisplayValue('실패해도 남는 초안');
  await fireEvent.changeText(nameInput(), '수정해서 재시도');
  await user.press(button('프로필 저장 다시 시도'));
  expect(await screen.findByRole('heading', { name: '수정해서 재시도' })).toBeVisible();
});

it('저장 중 추가 입력은 이전 성공으로 닫히지 않고 마지막 제출 성공만 화면에 확정된다', async () => {
  const requests: ReturnType<typeof deferred<Profile>>[] = [];
  const source: ProfileSource = { readProfile: async () => initial, saveProfile: jest.fn(() => {
    const request = deferred<Profile>(); requests.push(request); return request.promise;
  }) };
  const { user } = await setup(source);
  await fireEvent.changeText(nameInput(), '첫 저장');
  await user.press(button('프로필 저장'));
  expect(button('프로필 저장')).toBeDisabled();
  await fireEvent.changeText(nameInput(), '아직 제출하지 않은 수정');
  await act(async () => { requests[0]?.resolve({ ...initial, name: '첫 저장' }); });
  expect(nameInput()).toHaveDisplayValue('아직 제출하지 않은 수정');
  expect(screen.getByText(/추가로 입력한 내용/)).toBeVisible();
  await user.press(button('프로필 저장'));
  await act(async () => { requests[1]?.resolve({ ...initial, name: '아직 제출하지 않은 수정' }); });
  expect(await screen.findByRole('heading', { name: '아직 제출하지 않은 수정' })).toBeVisible();
  expect(source.saveProfile).toHaveBeenCalledTimes(2);
});

it.each(['success', 'failure'] as const)('닫기 뒤 늦은 저장 %s는 새 편집 초안을 덮거나 화면을 닫지 않는다', async (outcome) => {
  const pending = deferred<Profile>();
  const source: ProfileSource = { readProfile: async () => initial, saveProfile: () => pending.promise };
  const { user } = await setup(source);
  await fireEvent.changeText(nameInput(), '제출'); await user.press(button('프로필 저장'));
  await user.press(button('프로필 편집 닫기'));
  await user.press(button('프로필 편집'));
  await fireEvent.changeText(nameInput(), '새 편집 초안');
  await act(async () => {
    if (outcome === 'success') pending.resolve({ ...initial, name: '제출' }); else pending.reject(new Error('late'));
  });
  expect(nameInput()).toHaveDisplayValue('새 편집 초안');
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await user.press(button('프로필 편집 닫기'));
  expect(screen.getByRole('heading', { name: outcome === 'success' ? '제출' : initial.name })).toBeVisible();
});

it('조회 실패는 재시도로 복구하고 미조회 상태에서는 편집을 열 수 없다', async () => {
  const source = createMockProfileSource({ delayMs: 0, scenario: 'read-error' });
  await render(<Subject source={source} />);
  expect(await screen.findByRole('alert')).toHaveTextContent('프로필을 불러오지 못했어요.');
  expect(screen.queryByRole('button', { name: '프로필 편집' })).not.toBeOnTheScreen();
  await userEvent.setup().press(button('프로필 조회 다시 시도'));
  expect(await screen.findByRole('heading', { name: initial.name })).toBeVisible();
});
