import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './AppNavigator';
import { createMockAuthSource } from '../../features/auth/data/createMockAuthSource';
import { createMockEmailAuthSource, emailFixtures } from '../../features/auth/emailAuthSource';
import { mockUserA } from '../../features/auth/data/mockUsers';
import type { AuthSource } from '../../features/auth/types';

beforeEach(() => jest.useFakeTimers()); afterEach(() => jest.useRealTimers());
const button = (name: string) => screen.getByRole('button', { name });
const flush = () => act(async () => { await jest.advanceTimersByTimeAsync(1200); });
async function setup(source: AuthSource = { ...createMockAuthSource({ delayMs: 0 }), email: createMockEmailAuthSource({ delayMs: 0 }) }) {
  const tree = (next = source) => <SafeAreaProvider><AppNavigator authSource={next} /></SafeAreaProvider>;
  const view = await render(tree()); const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  await user.press(button('Write a story')); return { user, replace: (next: AuthSource) => view.rerender(tree(next)) };
}
it('이메일 가입의 예시 이름·이메일·코드 오류·재전송·검증을 연결하고 원래 홈에서 개인 행동을 다시 실행한다', async () => {
  const { user } = await setup(); await user.press(button('Create account')); await user.press(button('Sign up with Email'));
  expect(button('이메일 모의 가입')).toBeDisabled(); await user.press(button('예시 독자 A 이메일 예시 사용')); await user.press(button('이메일 모의 가입'));
  await screen.findByText('모의 코드: 123456 · 5분 동안 유효'); await fireEvent.changeText(screen.getByLabelText('모의 인증 코드 6자리'), '12345'); expect(button('모의 코드 검증')).toBeDisabled();
  await fireEvent.changeText(screen.getByLabelText('모의 인증 코드 6자리'), '000000'); await user.press(button('모의 코드 검증')); await screen.findByText('모의 코드가 일치하지 않아요. 입력을 확인해 주세요.'); expect(screen.getByLabelText('모의 인증 코드 6자리')).toHaveDisplayValue('000000');
  await user.press(button('모의 코드 재전송')); await screen.findByText('모의 코드: 123457 · 5분 동안 유효'); await fireEvent.changeText(screen.getByLabelText('모의 인증 코드 6자리'), '123456'); await user.press(button('모의 코드 검증')); await screen.findByText('모의 코드가 일치하지 않아요. 입력을 확인해 주세요.');
  await fireEvent.changeText(screen.getByLabelText('모의 인증 코드 6자리'), '123457'); await user.press(button('모의 코드 검증')); expect(screen.queryByLabelText('글 제목')).toBeNull(); await user.press(button('Write a story')); expect(screen.getByLabelText('글 제목')).toBeVisible();
  await user.press(button('편집기 닫기')); await user.press(screen.getByRole('tab', { name: '프로필' })); await user.press(button('로그아웃')); await user.press(button('로그아웃 취소')); expect(await screen.findByText(`${mockUserA.name} · 로그인됨`)).toBeVisible();
  await user.press(button('로그아웃')); await user.press(button('로그아웃 확인')); await screen.findByRole('button', { name: 'Sign in' }); expect(button('Sign up with Email')).toBeVisible(); expect(screen.queryByRole('button', { name: 'Sign up with X' })).toBeNull();
  await user.press(button('Sign in')); await user.press(button('Sign in with Email')); expect(screen.getByLabelText('모의 이메일')).toHaveDisplayValue('');
}, 30000);
it('제공자 네 경로는 공통 세션으로 인증하고 로그아웃 intro와 원래 공개 화면을 유지한다', async () => {
  const auth = createMockAuthSource({ delayMs: 0 }); const signIn = jest.fn(auth.signIn); const { user } = await setup({ ...auth, signIn });
  for (const provider of ['Google', 'Facebook', 'Apple', 'X'] as const) {
    await user.press(button(provider === 'Google' ? 'Google로 로그인 (모의)' : `Sign in with ${provider}`)); expect(signIn).toHaveBeenLastCalledWith(expect.objectContaining({ userId: mockUserA.id, provider }));
    expect(screen.queryByLabelText('글 제목')).toBeNull(); await user.press(screen.getByRole('tab', { name: '프로필' })); await flush();
    await user.press(button('로그아웃')); await user.press(button('로그아웃 확인')); await user.press(await screen.findByRole('button', { name: 'Sign in' }));
  }
  await user.press(button('로그인 닫기')); expect(await screen.findByText('로그인하지 않은 상태예요.')).toBeVisible();
}, 30000);
it('검증 중 뒤로와 공급부 교체는 늦은 인증을 막고 이메일·코드·오류를 새 화면에 노출하지 않는다', async () => {
  let resolve!: (id: string) => void; const email = createMockEmailAuthSource({ delayMs: 0 });
  const { user, replace } = await setup({ ...createMockAuthSource({ delayMs: 0 }), email: { ...email, verify: () => new Promise(done => { resolve = done; }) } });
  await user.press(button('Sign in with Email')); await fireEvent.changeText(screen.getByLabelText('모의 이메일'), emailFixtures[0].email); await user.press(button('이메일 모의 로그인 계속'));
  await fireEvent.changeText(await screen.findByLabelText('모의 인증 코드 6자리'), '123456'); await user.press(button('모의 코드 검증')); await fireEvent(screen.getByLabelText('모의 로그인'), 'requestClose');
  await act(async () => resolve(mockUserA.id)); expect(screen.getByLabelText('모의 이메일')).toHaveDisplayValue(emailFixtures[0].email); expect(screen.queryByLabelText('글 제목')).toBeNull();
  await replace(createMockAuthSource({ delayMs: 0 })); expect(screen.queryByLabelText('모의 이메일')).toBeNull(); await user.press(button('Write a story')); await user.press(button('Sign in with Email')); expect(screen.getByLabelText('모의 이메일')).toHaveDisplayValue('');
}, 30000);
it('인증 공급부 교체 후 이전 제공자의 성공은 로그인하지 않고 새 공급부의 실패·재시도만 확정한다', async () => {
  let resolve!: (value: Awaited<ReturnType<AuthSource['signIn']>>) => void;
  const { user, replace } = await setup({ ...createMockAuthSource({ delayMs: 0 }), signIn: () => new Promise(done => { resolve = done; }) });
  await user.press(button('Sign in with Facebook')); await replace(createMockAuthSource({ delayMs: 0 }));
  await act(async () => resolve({ status: 'success', user: mockUserA })); await user.press(button('Write a story'));
  expect(screen.queryByLabelText('글 제목')).toBeNull(); await user.press(button('모의 동작 선택 열기')); await user.press(screen.getByRole('radio', { name: '모의 결과: 실패' })); await user.press(button('Sign in with Apple'));
  await user.press(await screen.findByRole('button', { name: '로그인 다시 시도' })); await user.press(button('Write a story')); expect(screen.getByLabelText('글 제목')).toBeVisible();
}, 30000);
