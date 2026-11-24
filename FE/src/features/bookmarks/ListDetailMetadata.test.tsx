import { act, render, screen } from '@testing-library/react-native';
import { ListDetailMetadata, listRelativeTime } from './ListDetailMetadata';

it('독립 원본 조건의 상대 시간·글 개수와 빈 상세를 구분하고 시간 경과를 반영한다', async () => {
  jest.useFakeTimers();
  jest.setSystemTime(100000);
  try {
    const view = await render(<ListDetailMetadata updatedAt={86000} count={0} isPrivate={false} />);
    expect(screen.getByText('14 seconds ago')).toBeVisible();
    expect(screen.queryByText('No stories')).toBeNull();
    await view.rerender(<ListDetailMetadata updatedAt={94000} count={4} isPrivate={false} />);
    expect(screen.getByText('6 seconds ago · 4 stories')).toBeVisible();
    await view.rerender(<ListDetailMetadata updatedAt={99000} count={4} isPrivate />);
    expect(screen.getByText('1 second ago · 4 stories')).toBeVisible();
    expect(screen.getByLabelText('Private')).toBeVisible();
    await act(async () => { jest.advanceTimersByTime(59000); });
    expect(screen.getByText('1 minute ago · 4 stories')).toBeVisible();
    await view.rerender(<ListDetailMetadata count={4} isPrivate={false} />);
    expect(screen.getByText('4 stories')).toBeVisible();
    expect(listRelativeTime(200000, 100000)).toBeNull();
    expect(listRelativeTime(Number.NaN, 100000)).toBeNull();
  } finally { jest.useRealTimers(); }
});
