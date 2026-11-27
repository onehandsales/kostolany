import { fireEvent, screen, userEvent, waitFor } from '@testing-library/react-native';
import { renderWithLikes as render } from '../../../test/renderWithLikes';
import { ReferenceArticleView } from './ReferenceArticleView';
import { articleFixtures } from './data/fixtures';
import { AuthProvider } from '../auth/AuthProvider';
import { mockUserA } from '../auth/data/mockUsers';
import { RecommendationProvider } from '../recommendations/RecommendationProvider';
import type { RecommendationSource } from '../recommendations/types';

// 설명 조회와 읽기 도구 이벤트의 타이머를 제어해 테스트 밖에서 응답이 완료되지 않게 한다.
beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

const article = articleFixtures.find((item) => item.id === 'medium-brain')!;
it('첫 추천이 제외되어도 다음 기사에 이전 기사의 발행일과 반응 영역을 옮기지 않는다', async () => {
  const source: RecommendationSource = {
    read: async userId => ({ userId, version: 1, hiddenArticleIds: ['medium-prompt-bible'] }),
    execute: async () => { throw new Error('unused'); },
  };
  await render(<AuthProvider initialUser={mockUserA}><RecommendationProvider source={source}>
    <ReferenceArticleView article={article} onBack={() => {}} backLabel="Back" />
  </RecommendationProvider></AuthProvider>);
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Behold...The Prompt Bible is Here' })).toBeNull());
  expect(screen.getByRole('button', { name: 'ChatGPT Users...Should You Make the Switch to Gemini?' })).toBeVisible();
  expect(screen.queryByText('May 24', { exact: true })).toBeNull();
  expect(screen.queryByRole('button', { name: 'Responses, ChatGPT Users...Should You Make the Switch to Gemini?' })).toBeNull();
});
it('발행일이 없는 Goodbye Notion에는 구분자를 남기지 않고 날짜를 추정하지 않는다', async () => {
  const goodbye = articleFixtures.find((item) => item.id === 'medium-goodbye-notion')!;
  const view = await render(<ReferenceArticleView article={goodbye} onBack={() => {}} backLabel="Back" />);
  expect(screen.getByText('2 min read', { exact: true })).toBeVisible();
  expect(screen.queryByText(/2 min read\s+·/)).toBeNull();
  await view.rerender(<ReferenceArticleView article={article} onBack={() => {}} backLabel="Back" />);
  expect(screen.getByText('5 min read  ·  Apr 30, 2025', { exact: true })).toBeVisible();
});

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
