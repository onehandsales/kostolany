import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { StrictMode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { deferred } from '../feed/tests/helpers';
import { createMockProfileSource } from './data/createMockProfileSource';
import { ProfileProvider, useProfileScopeKey } from './ProfileProvider';
import { ProfileScreen } from './ProfileScreen';
import { ProfilePhotoError, type ProfilePhotoLease, type ProfilePhotoPicker } from './profilePhoto';

const button = (name: string) => screen.getByRole('button', { name });
const lease = (id: string): ProfilePhotoLease => ({ photo: { id, uri: `file:///cache/${id}.jpg`, width: 100, height: 100 }, release: jest.fn() });

function ScopedProfileScreen() {
  const scope = useProfileScopeKey();
  return <ProfileScreen key={scope} accountLabel="예시 독자 A" onLogout={() => {}} isFocused />;
}

async function setup(picker: ProfilePhotoPicker = async () => null, scenario: 'normal' | 'save-error' = 'normal') {
  const source = createMockProfileSource({ delayMs: 0, scenario });
  const save = jest.spyOn(source, 'saveProfile');
  const view = await render(<StrictMode><SafeAreaProvider><ProfileProvider userId="example-reader" sessionRevision={1} source={source} photoPicker={picker}>
    <ScopedProfileScreen />
  </ProfileProvider></SafeAreaProvider></StrictMode>);
  const user = userEvent.setup();
  await user.press(await screen.findByRole('button', { name: '프로필 편집' }));
  return { source, save, user, view };
}

it('대명사의 하위 완료는 부모 취소로 폐기하고 최대 네 개와 중복·삭제·검색 없음 경계를 지킨다', async () => {
  const { user, save, source } = await setup();
  await user.press(button('Add pronouns'));
  for (const value of ['he', 'him', 'she', 'her']) {
    await fireEvent.changeText(screen.getByLabelText('대명사 검색'), value);
    await user.press(screen.getByRole('checkbox', { name: `${value} 대명사 선택` }));
  }
  await fireEvent.changeText(screen.getByLabelText('대명사 검색'), 'they');
  expect(screen.getByRole('checkbox', { name: 'they 대명사 선택' })).toBeDisabled();
  await fireEvent.changeText(screen.getByLabelText('대명사 검색'), 'he');
  expect(screen.getByRole('checkbox', { name: 'he 대명사 선택' })).toBeChecked();
  await user.press(screen.getByRole('checkbox', { name: 'he 대명사 선택' }));
  expect(screen.getByText('4 / 4')).toBeVisible();
  await user.press(button('he 대명사 삭제'));
  await fireEvent.changeText(screen.getByLabelText('대명사 검색'), '없는 대명사');
  expect(screen.getByText('일치하는 대명사가 없어요.')).toBeVisible();
  await user.press(button('대명사 선택 완료'));
  expect(screen.getByText('3 / 4')).toBeVisible();
  expect(save).not.toHaveBeenCalled();
  await user.press(button('프로필 편집 취소'));
  expect((await source.readProfile('example-reader')).pronouns).toBeUndefined();
  await user.press(button('프로필 편집'));
  expect(screen.getByText('0 / 4')).toBeVisible();
  await user.press(button('Add pronouns'));
  await fireEvent.changeText(screen.getByLabelText('대명사 검색'), 'he');
  await user.press(screen.getByRole('checkbox', { name: 'he 대명사 선택' }));
  await fireEvent(screen.getByLabelText('프로필 편집 창'), 'requestClose');
  expect(screen.getByText('0 / 4')).toBeVisible();
});

it('사진과 대명사는 저장 실패 후 보존되고 재시도에서 함께 확정되며 저장하지 않은 사진은 해제된다', async () => {
  const first = lease('cancelled'); const second = lease('saved');
  const picker = jest.fn<ReturnType<ProfilePhotoPicker>, Parameters<ProfilePhotoPicker>>()
    .mockResolvedValueOnce(first).mockResolvedValueOnce(second);
  const { user, source, view } = await setup(picker, 'save-error');
  await user.press(button('프로필 사진 변경')); await user.press(button('프로필 사진 라이브러리'));
  await user.press(button('프로필 편집 취소'));
  expect(first.release).toHaveBeenCalledTimes(1);
  await user.press(button('프로필 편집'));
  await user.press(button('프로필 사진 변경')); await user.press(button('프로필 사진 라이브러리'));
  await user.press(button('Add pronouns'));
  await fireEvent.changeText(screen.getByLabelText('대명사 검색'), 'they');
  await user.press(screen.getByRole('checkbox', { name: 'they 대명사 선택' }));
  await user.press(button('대명사 선택 완료'));
  await user.press(button('프로필 저장'));
  expect(await screen.findByRole('alert')).toHaveTextContent(/입력은 그대로/);
  expect(screen.getByText('1 / 4')).toBeVisible();
  expect(second.release).not.toHaveBeenCalled();
  await user.press(button('프로필 저장 다시 시도'));
  expect(await screen.findByText('they')).toBeVisible();
  expect(await source.readProfile('example-reader')).toMatchObject({ photo: second.photo, pronouns: ['they'] });
  expect(second.release).not.toHaveBeenCalled();
  await view.unmount();
  await act(async () => {});
  expect(second.release).toHaveBeenCalledTimes(1);
});

it.each(['success', 'failure'] as const)('사진 선택 교체 뒤 늦은 이전 %s는 최신 선택과 편집 화면을 바꾸지 않는다', async outcome => {
  const old = deferred<ProfilePhotoLease | null>();
  const stale = lease('old'); const current = lease('new');
  const picker = jest.fn<ReturnType<ProfilePhotoPicker>, Parameters<ProfilePhotoPicker>>()
    .mockImplementationOnce(() => old.promise).mockResolvedValueOnce(current);
  const { user, source } = await setup(picker);
  await user.press(button('프로필 사진 변경'));
  await user.press(button('프로필 사진 카메라'));
  await user.press(button('프로필 사진 라이브러리'));
  await user.press(button('Add pronouns'));
  await act(async () => { if (outcome === 'success') old.resolve(stale); else old.reject(new Error('late')); });
  expect(screen.getByRole('heading', { name: 'Pronouns' })).toBeVisible();
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  if (outcome === 'success') expect(stale.release).toHaveBeenCalledTimes(1);
  await user.press(button('대명사 선택 완료'));
  await user.press(button('프로필 저장'));
  expect((await source.readProfile('example-reader')).photo).toEqual(current.photo);
});

it('사진 권한 실패와 사용자 취소는 기존 입력을 지키고 재선택과 부모 취소를 허용한다', async () => {
  const picker = jest.fn<ReturnType<ProfilePhotoPicker>, Parameters<ProfilePhotoPicker>>()
    .mockRejectedValueOnce(new ProfilePhotoError('permission')).mockResolvedValueOnce(null);
  const { user, save } = await setup(picker);
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '아직 저장하지 않은 이름');
  await user.press(button('프로필 사진 변경'));
  await user.press(button('프로필 사진 카메라'));
  expect(await screen.findByRole('alert')).toHaveTextContent(/카메라 권한/);
  await user.press(button('프로필 사진 라이브러리'));
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
  await user.press(button('프로필 사진 선택 취소'));
  expect(screen.getByLabelText('이름 · 필수')).toHaveDisplayValue('아직 저장하지 않은 이름');
  expect(save).not.toHaveBeenCalled();
});

it('사진 선택기와 프로필 source 교체는 이전 작업·초안·오류를 폐기하고 새 선택을 허용한다', async () => {
  const pending = deferred<ProfilePhotoLease | null>(); const stale = lease('stale');
  const { user, source, view } = await setup(() => pending.promise);
  await user.press(button('프로필 사진 변경')); await user.press(button('프로필 사진 카메라'));
  const renderScreen = (nextSource: typeof source) => <StrictMode><SafeAreaProvider><ProfileProvider userId="example-reader" sessionRevision={1} source={nextSource} photoPicker={async () => null}>
    <ScopedProfileScreen />
  </ProfileProvider></SafeAreaProvider></StrictMode>;
  await view.rerender(renderScreen(source));
  expect(screen.queryByLabelText('프로필 사진 처리 중')).not.toBeOnTheScreen();
  await user.press(button('프로필 사진 선택 취소'));
  await fireEvent.changeText(screen.getByLabelText('이름 · 필수'), '교체로 버릴 초안');
  await view.rerender(renderScreen(createMockProfileSource({ delayMs: 0 })));
  await act(async () => pending.resolve(stale));
  expect(stale.release).toHaveBeenCalledTimes(1);
  expect(screen.queryByLabelText('프로필 편집 창', { includeHiddenElements: true })).not.toBeOnTheScreen();
  await user.press(await screen.findByRole('button', { name: '프로필 편집' }));
  expect(screen.getByLabelText('이름 · 필수')).toHaveDisplayValue('예시 독자 A');
  expect(screen.queryByRole('alert')).not.toBeOnTheScreen();
});
