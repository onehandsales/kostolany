import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { createMockDraftSource } from './draftSource';
import { emptyEditor } from './editorModel';
import { createMockEditorImageSource } from './imageSource';
import { emptyPublishOptions, type PublishedStory } from './publishing';
import { useStoryList, WrittenStoriesProvider } from './WrittenStoriesProvider';
import { deferred } from '../feed/tests/helpers';

const story = (userId: string, unlisted = false): PublishedStory => ({
  id: `${userId}-story`, draftId: `${userId}-draft`, userId, authorName: '작성자',
  document: { ...emptyEditor().document, title: '발행한 글', body: '본문' },
  publishing: { ...emptyPublishOptions(), unlisted }, publishedAt: '2026-11-20T00:00:00Z',
});

function setupSource() {
  const source = createMockDraftSource({ delayMs: 0 });
  const images = createMockEditorImageSource();
  const wrapper = ({ children }: { children: ReactNode }) => <WrittenStoriesProvider value={{ source, images, sessionRevision: 1 }}>{children}</WrittenStoriesProvider>;
  return { source, wrapper };
}

it('상세로 이동해 목록 구독을 쉬어도 기존 행을 유지하고 복귀 후 변경을 다시 조회한다', async () => {
  const { source, wrapper } = setupSource();
  let revision = 7;
  jest.spyOn(source, 'getRevision').mockImplementation(() => revision);
  const request = jest.spyOn(source, 'stories').mockResolvedValue([story('A')]);
  const { result, rerender } = await renderHook(({ active }: { active: boolean }) => useStoryList('A', 1, 'public', active), { initialProps: { active: true }, wrapper });
  await waitFor(() => expect(result.current.status).toBe('ready'));
  await rerender({ active: false });
  expect(result.current.items).toEqual([story('A')]);
  expect(request).toHaveBeenCalledTimes(1);
  revision += 1;
  request.mockResolvedValue([]);
  await rerender({ active: true });
  await waitFor(() => expect(result.current.status).toBe('ready'));
  expect(result.current.items).toEqual([]);
  expect(request).toHaveBeenCalledTimes(2);
});

it('동기 조회 실패도 재시도할 수 있고 다른 사용자와 공개 범위가 섞인 응답은 거부한다', async () => {
  const { source, wrapper } = setupSource();
  const request = jest.spyOn(source, 'stories').mockImplementationOnce(() => { throw new Error('sync-read'); }).mockResolvedValueOnce([story('B')]).mockResolvedValueOnce([story('A', true)]).mockResolvedValue([story('A')]);
  const { result } = await renderHook(() => useStoryList('A', 1, 'public', true), { wrapper });
  await waitFor(() => expect(result.current.status).toBe('error'));
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await act(async () => result.current.retry());
    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.items).toEqual([]);
  }
  await act(async () => result.current.retry());
  await waitFor(() => expect(result.current.items).toEqual([story('A')]));
  expect(request).toHaveBeenCalledTimes(4);
});

it('A 조회 중 B와 새 A 세션으로 전환하면 늦은 이전 A 성공과 실패가 현재 목록을 덮지 않는다', async () => {
  const { source, wrapper } = setupSource();
  const oldA = deferred<PublishedStory[]>(); const oldB = deferred<PublishedStory[]>();
  jest.spyOn(source, 'stories').mockReturnValueOnce(oldA.promise).mockReturnValueOnce(oldB.promise).mockResolvedValue([story('A', true)]);
  const { result, rerender } = await renderHook(({ userId, revision, visibility }: { userId: string; revision: number; visibility: 'public' | 'unlisted' }) => useStoryList(userId, revision, visibility, true),
    { wrapper, initialProps: { userId: 'A', revision: 1, visibility: 'public' } });
  await rerender({ userId: 'B', revision: 2, visibility: 'public' });
  await rerender({ userId: 'A', revision: 3, visibility: 'unlisted' });
  await waitFor(() => expect(result.current.status).toBe('ready'));
  await act(async () => { oldA.resolve([story('A')]); oldB.reject(new Error('old-session')); });
  expect(result.current.items).toEqual([story('A', true)]);
});
