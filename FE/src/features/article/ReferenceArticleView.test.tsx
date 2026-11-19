import { screen, userEvent } from '@testing-library/react-native';
import { renderWithLikes as render } from '../../../test/renderWithLikes';
import { ReferenceArticleView } from './ReferenceArticleView';
import { articleFixtures } from './data/fixtures';

const article = articleFixtures.find(item => item.id === 'medium-brain')!;
it('접은 읽기 도구의 임시 선택은 유지하고 새 인증 범위에서는 개인 UI를 닫는다', async () => {
  const user = userEvent.setup();
  const view = await render(<ReferenceArticleView article={article} onBack={jest.fn()} backLabel="Back" preference={{ scopeKey: 'A:1', status: 'ready', level: 'adult' }} />);
  expect(screen.queryByRole('radio', { name: '초등학생' })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: 'Reading tools' }));
  await user.press(screen.getByRole('radio', { name: '초등학생' }));
  await user.press(screen.getByRole('button', { name: 'Reading tools' }));
  await user.press(screen.getByRole('button', { name: 'Reading tools' }));
  expect(screen.getByRole('radio', { name: '초등학생', checked: true })).toBeVisible();
  await user.press(screen.getByRole('button', { name: 'Story options' }));
  await view.rerender(<ReferenceArticleView article={article} onBack={jest.fn()} backLabel="Back" preference={{ scopeKey: 'B:2', status: 'ready', level: 'adult' }} />);
  expect(screen.queryByRole('button', { name: 'Open reading tools' })).not.toBeOnTheScreen();
  expect(screen.queryByRole('radio', { name: '초등학생' })).not.toBeOnTheScreen();
  await user.press(screen.getByRole('button', { name: 'Reading tools' }));
  expect(screen.getByRole('radio', { name: '성인', checked: true })).toBeVisible();
});
