import { fireEvent, screen, userEvent } from '@testing-library/react-native';
import { renderWithLikes as render } from '../../../test/renderWithLikes';
import { ReferenceArticleView } from './ReferenceArticleView';
import { articleFixtures } from './data/fixtures';

// 설명 조회와 읽기 도구 이벤트의 타이머를 제어해 테스트 밖에서 응답이 완료되지 않게 한다.
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

const article = articleFixtures.find((item) => item.id === 'medium-brain')!;
it('접은 읽기 도구의 임시 선택은 유지하고 새 인증 범위에서는 개인 UI를 닫는다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const view = await render(
    <ReferenceArticleView
      article={article}
      onBack={jest.fn()}
      backLabel="Back"
      preference={{ scopeKey: 'A:1', status: 'ready', level: 'adult' }}
    />,
  );
  expect(screen.queryByRole('radio', { name: '초등학생' })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: 'Reading tools' }));
  await user.press(screen.getByRole('radio', { name: '초등학생' }));
  await user.press(screen.getByRole('button', { name: 'Reading tools' }));
  await user.press(screen.getByRole('button', { name: 'Reading tools' }));
  expect(screen.getByRole('radio', { name: '초등학생', checked: true })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Story options' }));
  expect(screen.getByRole('button', { name: '기사 표시 설정' })).toBeVisible();
  await view.rerender(
    <ReferenceArticleView
      article={article}
      onBack={jest.fn()}
      backLabel="Back"
      preference={{ scopeKey: 'B:2', status: 'ready', level: 'adult' }}
    />,
  );
  expect(screen.queryByRole('button', { name: '기사 표시 설정' })).not.toBeOnTheScreen();
  expect(screen.queryByRole('radio', { name: '초등학생' })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: 'Reading tools' }));
  expect(screen.getByRole('radio', { name: '성인', checked: true })).toBeVisible();
});

it('차단 설정 조회 동안 본문만 가리고 뒤로 가기와 기존 임시 수준의 화면 수명을 유지한다', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const back = jest.fn();
  const props = {
    article,
    onBack: back,
    backLabel: 'Back',
    preference: { scopeKey: 'A:1', status: 'ready' as const, level: 'adult' as const },
  };
  const view = await render(<ReferenceArticleView {...props} />);
  await user.press(screen.getByRole('button', { name: 'Reading tools' }));
  await user.press(screen.getByRole('radio', { name: '초등학생' }));
  await view.rerender(<ReferenceArticleView {...props} access="loading" active={false} />);
  expect(screen.queryByRole('heading', { name: article.title })).toBeNull();
  await user.press(screen.getByRole('button', { name: 'Back' }));
  expect(back).toHaveBeenCalledTimes(1);
  await view.rerender(<ReferenceArticleView {...props} />);
  expect(screen.getByRole('radio', { name: '초등학생', checked: true })).toBeVisible();
});

it('스크롤로 접힌 상단과 반응 막대는 접근성에서 숨기고 위로 스크롤하면 다시 조작할 수 있다', async () => {
  const back = jest.fn();
  await render(
    <ReferenceArticleView
      article={article}
      onBack={back}
      backLabel="Back"
      preference={{ scopeKey: 'A:1', status: 'ready', level: 'adult' }}
    />,
  );
  await fireEvent.scroll(screen.getByLabelText('기사 본문'), { nativeEvent: { contentOffset: { y: 200 } } });
  expect(screen.queryByRole('button', { name: 'Back' })).toBeNull();
  expect(screen.queryByRole('button', { name: 'Share story' })).toBeNull();
  await fireEvent.scroll(screen.getByLabelText('기사 본문'), { nativeEvent: { contentOffset: { y: 160 } } });
  await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).press(screen.getByRole('button', { name: 'Back' }));
  expect(back).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: 'Share story' })).toBeVisible();
});
