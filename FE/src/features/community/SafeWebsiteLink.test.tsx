import { act, render, screen, userEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';

import { SafeWebsiteLink } from './SafeWebsiteLink';

afterEach(() => jest.restoreAllMocks());

it('웹사이트 열기 실패 뒤 재시도에 성공하면 원래 주소를 다시 표시한다', async () => {
  const open = jest.spyOn(Linking, 'openURL').mockRejectedValueOnce(new Error('unavailable'))
    .mockResolvedValue(undefined);
  const user = userEvent.setup();
  await render(<SafeWebsiteLink url="https://example.test" />);
  await user.press(screen.getByRole('link', { name: 'Author website' }));
  expect(screen.getByText('Couldn’t open this website. Retry')).toBeVisible();
  await user.press(screen.getByRole('link', { name: 'Author website' }));
  expect(screen.getByText('https://example.test')).toBeVisible();
  expect(open).toHaveBeenCalledTimes(2);
});

it('늦은 실패가 최신 성공이나 주소를 바꾼 화면의 오류로 돌아오지 않는다', async () => {
  let rejectOld: (error: Error) => void = () => { throw new Error('request-not-started'); };
  const open = jest.spyOn(Linking, 'openURL').mockImplementationOnce(() => new Promise<void>((_resolve, reject) => {
    rejectOld = reject;
  })).mockResolvedValue(undefined);
  const user = userEvent.setup();
  const view = await render(<SafeWebsiteLink url="https://example.test/first" />);
  await user.press(screen.getByRole('link', { name: 'Author website' }));
  await user.press(screen.getByRole('link', { name: 'Author website' }));
  await act(async () => { rejectOld(new Error('late-failure')); });
  expect(screen.queryByText('Couldn’t open this website. Retry')).toBeNull();
  open.mockImplementationOnce(() => new Promise<void>((_resolve, reject) => { rejectOld = reject; }));
  await user.press(screen.getByRole('link', { name: 'Author website' }));
  await view.rerender(<SafeWebsiteLink url="https://example.test/second" />);
  await act(async () => { rejectOld(new Error('previous-url-failure')); });
  expect(screen.getByText('https://example.test/second')).toBeVisible();
  expect(screen.queryByText('Couldn’t open this website. Retry')).toBeNull();
});
