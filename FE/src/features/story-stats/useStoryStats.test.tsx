import { act, renderHook, waitFor } from '@testing-library/react-native';
import { createMockDraftSource } from '../editor/draftSource';
import { emptyEditor } from '../editor/editorModel';
import { emptyPublishOptions } from '../editor/publishing';
import { deferred } from '../feed/tests/helpers';
import { createMockStoryStatsSource } from './createMockStoryStatsSource';
import { useStoryStats } from './useStoryStats';
import type { LifetimeStats, MonthlyStats, StatsSort, StoryStatsSource } from './types';

const makeSource = () => createMockStoryStatsSource(createMockDraftSource({ delayMs: 0 }), { now: () => new Date('2024-03-02T00:00:00Z') });
const initial = { month: '2024-02', userId: 'A', revision: 1, active: true, sort: 'latest' as StatsSort };

it.each(['success', 'failure'] as const)('월 A→B→A에서 첫 A의 늦은 %s는 마지막 A 선택과 결과를 덮지 않는다', async outcome => {
  const base = makeSource(); const pending = deferred<MonthlyStats>(); let first = true;
  const source: StoryStatsSource = { ...base, readMonthly: (userId, month, signal) => {
    if (first) { first = false; return pending.promise; } return base.readMonthly(userId, month, signal);
  } };
  const view = await renderHook((props: typeof initial) => useStoryStats(source, props.userId, props.revision, props.month, props.sort, props.active), { initialProps: initial });
  await view.rerender({ ...initial, month: '2024-03' });
  await waitFor(() => expect(view.result.current.monthly.data?.month).toBe('2024-03'));
  await view.rerender(initial);
  await waitFor(() => expect(view.result.current.monthly.data?.month).toBe('2024-02'));
  await act(async () => {
    if (outcome === 'failure') pending.reject(new Error('old'));
    else pending.resolve({ ...await base.readMonthly('A', '2024-02', new AbortController().signal), views: 999 });
  });
  expect(view.result.current.monthly.status).toBe('ready'); expect(view.result.current.monthly.data?.views).toBe(0);
});

it('동기 조회 실패는 선택을 유지하고 중복 재시도 없이 해당 영역만 복구한다', async () => {
  const base = makeSource(); let failed = false;
  const readMonthly = jest.fn((userId: string, month: string, signal: AbortSignal) => {
    if (!failed) { failed = true; throw new Error('sync failure'); } return base.readMonthly(userId, month, signal);
  });
  const source = { ...base, readMonthly };
  const view = await renderHook(() => useStoryStats(source, 'A', 1, '2024-02', 'reads', true));
  await waitFor(() => expect(view.result.current.monthly.status).toBe('error'));
  expect(view.result.current.lifetime.data?.sort).toBe('reads');
  await act(async () => { view.result.current.monthly.retry(); view.result.current.monthly.retry(); });
  await waitFor(() => expect(view.result.current.monthly.status).toBe('ready'));
  expect(readMonthly).toHaveBeenCalledTimes(2);
});

it('발행 revision 변경·source 교체·같은 계정 새 세션·이탈은 이전 응답의 반영 권한을 끝낸다', async () => {
  const base = makeSource(); const pending = deferred<MonthlyStats>(); let revision = 0; let notify = () => {};
  const source: StoryStatsSource = { ...base, readMonthly: () => pending.promise, getRevision: () => revision,
    subscribe: listener => { notify = listener; return () => {}; } };
  const next = makeSource();
  const view = await renderHook((props: { source: StoryStatsSource; session: number; active: boolean }) => useStoryStats(props.source, 'A', props.session, '2024-02', 'latest', props.active), {
    initialProps: { source, session: 1, active: true },
  });
  await act(async () => { revision++; notify(); });
  await view.rerender({ source: next, session: 2, active: true });
  await waitFor(() => expect(view.result.current.monthly.status).toBe('ready'));
  await act(async () => pending.reject(new Error('old source')));
  expect(view.result.current.monthly.status).toBe('ready');
  await view.rerender({ source: next, session: 2, active: false });
  expect(view.result.current.monthly.data?.month).toBe('2024-02');
  await view.unmount();
});

it('정렬 변경과 새 발행 revision 뒤 늦은 목록은 최신 정렬·글 목록을 덮지 않는다', async () => {
  const drafts = createMockDraftSource({ delayMs: 0 });
  const base = createMockStoryStatsSource(drafts);
  const oldLatest = await base.readLifetime('A', 'latest', new AbortController().signal);
  const oldViews = await base.readLifetime('A', 'views', new AbortController().signal);
  const latestRequest = deferred<LifetimeStats>();
  const viewsRequest = deferred<LifetimeStats>();
  let requests = 0;
  const source: StoryStatsSource = { ...base,
    readLifetime: (userId, sort, signal) => {
      requests++;
      if (requests === 1) return latestRequest.promise;
      if (requests === 2) return viewsRequest.promise;
      return base.readLifetime(userId, sort, signal);
    },
  };
  const view = await renderHook((sort: StatsSort) => useStoryStats(source, 'A', 1, base.getCurrentMonth(), sort, true), { initialProps: 'latest' as StatsSort });
  await view.rerender('views');
  await waitFor(() => expect(requests).toBe(2));
  const draftId = drafts.newId('A');
  const document = { ...emptyEditor().document, title: '조회 도중 발행한 글', body: '늦은 빈 목록이 지우면 안 되는 본문' };
  const publishing = emptyPublishOptions();
  await act(async () => {
    await drafts.save({ userId: 'A', draftId, document, publishing, operationId: 'save-during-query' }, new AbortController().signal);
    await drafts.publish({ userId: 'A', draftId, document, publishing, authorName: '작성자', operationId: 'publish-during-query' }, new AbortController().signal);
  });
  await waitFor(() => expect(view.result.current.lifetime.status).toBe('ready'));
  expect(view.result.current.lifetime.data?.stories).toHaveLength(1);
  await act(async () => { viewsRequest.resolve(oldViews); latestRequest.resolve(oldLatest); });
  expect(view.result.current.lifetime.data?.sort).toBe('views');
  expect(view.result.current.lifetime.data?.stories.map(story => story.title)).toEqual(['조회 도중 발행한 글']);
});
