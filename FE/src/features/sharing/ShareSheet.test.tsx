import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { deferred } from '../feed/tests/helpers';
import { ShareSheet } from './ShareSheet';
import { SharingProvider } from './SharingProvider';
import { ShareError, type ShareAdapter, type ShareImage, type ShareTarget } from './types';
import { MembershipProvider } from '../membership/MembershipProvider';
import { existingMember } from '../membership/createMockMembershipSource';
import type { MembershipRecord, MembershipSource } from '../membership/types';
import { useEffect } from 'react';
import { ProfileProvider, useProfile } from '../profile/ProfileProvider';
import type { ProfileStore } from '../profile/createProfileStore';
import type { ProfileSource } from '../profile/types';

const target: ShareTarget = {
  kind: 'article',
  id: 'one',
  title: '원본 글',
  subtitle: '소개',
  authorName: 'A',
  authorId: mockUserA.id,
  visibility: 'public',
};
beforeEach(() => jest.useFakeTimers());
afterEach(async () => {
  await act(async () => jest.runOnlyPendingTimersAsync());
  jest.useRealTimers();
});
const adapter = (): ShareAdapter => ({
  copy: jest.fn(async () => {}),
  share: jest.fn(async () => 'cancelled'),
  capture: jest.fn(async () => ({ uri: 'file:///cache/card.png', release: jest.fn() })),
  saveImage: jest.fn(async () => 'library'),
  openSettings: jest.fn(async () => {}),
});
const button = (name: string) => screen.getByRole('button', { name });
async function setup(source = adapter(), membershipSource?: MembershipSource) {
  const close = jest.fn();
  const tree = (nextTarget = target, nextSource = source, available = true) => (
    <SafeAreaProvider>
      <AuthProvider initialUser={mockUserA}>
        <MembershipProvider source={membershipSource}><SharingProvider adapter={nextSource}>
          <ShareSheet target={nextTarget} available={available} onClose={close} />
        </SharingProvider></MembershipProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
  const view = await render(tree());
  const ready = () =>
    fireEvent(screen.getByLabelText('공유 이미지 카드'), 'layout', {
      nativeEvent: { layout: { width: 339, height: 529 } },
    });
  await ready();
  return {
    source,
    close,
    ready,
    replace: (nextTarget = target, nextSource = source, available = true) =>
      view.rerender(tree(nextTarget, nextSource, available)),
    unmount: view.unmount,
  };
}

it('복사 실패·재시도는 카드 스타일을 보존하고 공유 취소에는 완료 토스트를 표시하지 않는다', async () => {
  const { source } = await setup();
  jest.mocked(source.copy).mockRejectedValueOnce(new ShareError('copy'));
  await fireEvent.press(button('다음 공유 카드 스타일'));
  await fireEvent.press(button('Copy link'));
  expect(screen.getByLabelText('공유 카드 스타일 2/10')).toBeVisible();
  await fireEvent.press(button('공유 다시 시도'));
  expect(screen.getByText('Link copied')).toBeVisible();
  expect(source.copy).toHaveBeenLastCalledWith(
    'https://kostolany.invalid/article/one',
    expect.any(AbortSignal),
  );
  await fireEvent.press(button('Share via...'));
  expect(screen.queryByText('공유 화면에서 돌아왔어요')).toBeNull();
  expect(screen.queryByText('Link copied')).toBeNull();
  jest.mocked(source.copy).mockRejectedValueOnce(new ShareError('unsupported'));
  await fireEvent.press(button('Copy link'));
  expect(screen.getByRole('alert')).toHaveTextContent('이 환경에서는 링크 복사를 지원하지 않아요.');
  expect(screen.getByRole('alert')).not.toHaveTextContent(/Copy link를 사용하세요\./);
  jest.mocked(source.share).mockRejectedValueOnce(new ShareError('unsupported'));
  await fireEvent.press(button('Share via...'));
  expect(screen.getByRole('alert')).toHaveTextContent('이 환경에서는 이 공유 동작을 지원하지 않아요. Copy link를 사용하세요.');
});

it('아바타 A→B→A 교체는 새 이미지 준비를 기다리며 공급부 변경은 부모도 닫는다', async () => {
  const { replace, close, ready } = await setup();
  const photoA = { ...target, avatar: { uri: 'file:///photo-a.png' } };
  await replace(photoA);
  expect(button('Save image')).toBeDisabled();
  await fireEvent(screen.getByLabelText('공유 카드 작성자 사진'), 'load');
  expect(button('Save image')).toBeDisabled();
  await ready();
  expect(button('Save image')).toBeEnabled();
  await replace({ ...target, avatar: { uri: 'file:///photo-b.png' } });
  expect(button('Save image')).toBeDisabled();
  await replace(photoA);
  expect(button('Save image')).toBeDisabled();
  await fireEvent(screen.getByLabelText('공유 카드 작성자 사진'), 'error');
  await ready();
  expect(button('Save image')).toBeEnabled();
  await replace(target, adapter());
  expect(close).toHaveBeenCalledTimes(1);
});

it('Friend 자격 철회 중 늦은 복사는 성공을 표시하지 않고 일반 링크는 계속 복사할 수 있다', async () => {
  let records: readonly MembershipRecord[] = [{ ...existingMember, tier: 'friend' }];
  const listeners = new Set<() => void>();
  const membership: MembershipSource = {
    getSnapshot: () => records,
    subscribe: listener => { listeners.add(listener); return () => { listeners.delete(listener); }; },
    purchase: jest.fn(),
  };
  const { source, replace } = await setup(adapter(), membership);
  await replace({ ...target, authorId: 'another-writer', memberOnly: true });
  const pending = deferred<void>();
  jest.mocked(source.copy).mockImplementationOnce(() => pending.promise);
  await fireEvent.press(button('Friend Link...'));
  const signal = jest.mocked(source.copy).mock.calls.at(-1)?.[1];
  await act(async () => { records = []; listeners.forEach(listener => listener()); });
  expect(signal?.aborted).toBe(true);
  await act(async () => pending.resolve());
  expect(screen.queryByText('Preview Friend Link copied')).toBeNull();
  await fireEvent.press(button('Copy link'));
  expect(screen.getByText('Link copied')).toBeVisible();
  expect(source.copy).toHaveBeenLastCalledWith('https://kostolany.invalid/article/one', expect.any(AbortSignal));
});

it('저장 실패는 임시 이미지를 정리하고 재시도하며 연속 누르기는 한 번만 저장한다', async () => {
  const { source } = await setup();
  const release = jest.fn();
  jest.mocked(source.capture).mockResolvedValue({ uri: 'file:///cache/card.png', release });
  jest.mocked(source.saveImage).mockRejectedValueOnce(new ShareError('permission'));
  await fireEvent.press(button('Save image'));
  expect(release).toHaveBeenCalledTimes(1);
  expect(button('사진 권한 설정 열기')).toBeVisible();
  const pending = deferred<'library'>();
  jest.mocked(source.saveImage).mockImplementationOnce(() => pending.promise);
  await fireEvent.press(button('공유 다시 시도'));
  await fireEvent.press(button('Save image'));
  expect(source.saveImage).toHaveBeenCalledTimes(2);
  await act(async () => pending.resolve('library'));
  expect(screen.getByText('Image saved to library')).toBeVisible();
  expect(release).toHaveBeenCalledTimes(2);
});

it.each(['target', 'source', 'access', 'unmount'] as const)(
  '캡처 중 %s 경계 변경은 늦은 이미지만 정리하고 저장·토스트를 복원하지 않는다',
  async (boundary) => {
    const { source, replace, unmount } = await setup();
    const pending = deferred<ShareImage>();
    const release = jest.fn();
    jest.mocked(source.capture).mockImplementationOnce(() => pending.promise);
    await fireEvent.press(button('Save image'));
    expect(source.capture).toHaveBeenCalledTimes(1);
    if (boundary === 'target') await replace({ ...target, id: 'two', title: '새 글' });
    else if (boundary === 'source') await replace(target, adapter());
    else if (boundary === 'access') await replace(target, source, false);
    else await unmount();
    await act(async () => pending.resolve({ uri: 'file:///cache/late.png', release }));
    expect(source.saveImage).not.toHaveBeenCalled();
    expect(release).toHaveBeenCalledTimes(1);
    if (boundary !== 'unmount') expect(screen.queryByText('Image saved to library')).toBeNull();
  },
);

it('비공개 대상은 카드·링크·Friend 동작을 노출하지 않는다', async () => {
  const { replace, source } = await setup();
  await replace({ ...target, visibility: 'private' });
  expect(screen.queryByRole('button', { name: 'Copy link' })).toBeNull();
  expect(screen.queryByLabelText('공유 이미지 카드')).toBeNull();
  expect(source.copy).not.toHaveBeenCalled();
});

it('사진 권한 설정의 오래된 실패가 새 이미지 저장 성공을 덮지 않는다', async () => {
  const { source } = await setup();
  jest.mocked(source.saveImage).mockRejectedValueOnce(new ShareError('permission'));
  await fireEvent.press(button('Save image'));
  const settings = deferred<void>();
  jest.mocked(source.openSettings).mockImplementationOnce(() => settings.promise);
  await fireEvent.press(button('사진 권한 설정 열기'));
  await fireEvent.press(button('공유 다시 시도'));
  expect(screen.getByText('Image saved to library')).toBeVisible();
  await act(async () => settings.reject(new Error('late settings')));
  expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.getByText('Image saved to library')).toBeVisible();
});

it('확정 프로필 사진 제거는 진입 때 남긴 아바타를 복원하지 않고 이전 공유를 취소한다', async () => {
  const photo = { id: 'photo-a', uri: 'file:///photo-a.png', width: 96, height: 96 };
  const source: ProfileSource = {
    readProfile: async userId => ({ userId, name: 'A', bio: '', photo }),
    saveProfile: async ({ userId, fields }) => ({ userId, ...fields }),
  };
  let profileStore: ProfileStore | null = null;
  function ProfileProbe() {
    const { store } = useProfile();
    useEffect(() => { profileStore = store; }, [store]);
    return null;
  }
  const sharing = adapter();
  const pending = deferred<void>();
  jest.mocked(sharing.copy).mockImplementationOnce(() => pending.promise);
  await render(<SafeAreaProvider><AuthProvider initialUser={mockUserA}>
    <ProfileProvider userId={mockUserA.id} sessionRevision={0} source={source}>
      <ProfileProbe /><SharingProvider adapter={sharing}>
        <ShareSheet target={{ ...target, avatar: { uri: photo.uri } }} onClose={() => {}} />
      </SharingProvider>
    </ProfileProvider>
  </AuthProvider></SafeAreaProvider>);
  expect(screen.getByLabelText('공유 카드 작성자 사진')).toBeVisible();
  await fireEvent.press(button('Copy link'));
  const signal = jest.mocked(sharing.copy).mock.calls[0]?.[1];
  const current = profileStore as ProfileStore | null;
  if (!current) throw new Error('missing profile store');
  await act(async () => { await current.save({ name: 'A', bio: '', photo: null }); });
  expect(screen.queryByLabelText('공유 카드 작성자 사진')).toBeNull();
  expect(signal?.aborted).toBe(true);
  await act(async () => pending.resolve());
  expect(screen.queryByText('Link copied')).toBeNull();
});
