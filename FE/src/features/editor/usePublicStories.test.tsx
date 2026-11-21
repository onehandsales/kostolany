import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { createMockDraftSource } from './draftSource';
import { emptyEditor } from './editorModel';
import { createMockEditorImageSource } from './imageSource';
import { emptyPublishOptions, type PublishedStory } from './publishing';
import { WrittenStoriesProvider } from './WrittenStoriesProvider';
import { deferred } from '../feed/tests/helpers';
import { usePublicStories } from './usePublicStories';

const story = (id: string, unlisted = false): PublishedStory => ({
  id, userId: 'example-reader', draftId: `draft-${id}`, authorName: '작성자',
  document: { ...emptyEditor().document, title: id, body: '공개 본문' },
  publishing: { ...emptyPublishOptions(), unlisted }, publishedAt: '2026-11-21T00:00:00Z',
});
function setup() {
  const source = createMockDraftSource({ delayMs: 0 });
  const images = createMockEditorImageSource();
  const wrapper = ({ children }: { children: ReactNode }) =>
    <WrittenStoriesProvider value={{ source, images, sessionRevision: 0 }}>{children}</WrittenStoriesProvider>;
  return { source, wrapper };
}

it('새 발행 revision의 결과를 이전 공개 목록 성공·실패가 덮지 않으며 이탈 시 요청을 취소한다', async () => {
  const { source, wrapper } = setup();
  const old = deferred<PublishedStory[]>(); const abandoned = deferred<PublishedStory[]>();
  let revision = 0;
  jest.spyOn(source, 'getRevision').mockImplementation(() => revision);
  const read = jest.spyOn(source, 'publicStories').mockReturnValueOnce(old.promise)
    .mockResolvedValueOnce([story('new')]).mockReturnValueOnce(abandoned.promise);
  const hook = await renderHook(({ active }: { active: boolean }) => usePublicStories(active), { wrapper, initialProps: { active: true } });
  await waitFor(() => expect(read).toHaveBeenCalledTimes(1));
  revision += 1; await hook.rerender({ active: true });
  await waitFor(() => expect(hook.result.current.items).toEqual([story('new')]));
  await act(async () => old.resolve([story('old')])); expect(hook.result.current.items).toEqual([story('new')]);
  revision += 1; await hook.rerender({ active: true }); await waitFor(() => expect(read).toHaveBeenCalledTimes(3));
  await hook.rerender({ active: false }); expect(read.mock.calls[2]?.[0].aborted).toBe(true);
  await act(async () => abandoned.reject(new Error('late'))); expect(hook.result.current.status).toBe('loading');
});

it('공개 검색에서 Unlisted 응답과 동기 실패를 빈 결과로 숨기지 않고 같은 검색에서 재시도한다', async () => {
  const { source, wrapper } = setup();
  const read = jest.spyOn(source, 'publicStories').mockImplementationOnce(() => { throw new Error('read'); })
    .mockResolvedValueOnce([story('hidden', true)]).mockResolvedValue([story('public')]);
  const hook = await renderHook(() => usePublicStories(true), { wrapper });
  await waitFor(() => expect(hook.result.current.status).toBe('error'));
  await act(async () => hook.result.current.retry()); await waitFor(() => expect(read).toHaveBeenCalledTimes(2));
  expect(hook.result.current.items).toEqual([]); expect(hook.result.current.status).toBe('error');
  await act(async () => hook.result.current.retry()); await waitFor(() => expect(hook.result.current.items).toEqual([story('public')]));
});
