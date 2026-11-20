import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { validateLifetimeStats, validateMonthlyStats } from './statsValidation';
import type { StatsSort, StoryStatsSource } from './types';

type StatsResult<T> = { status: 'loading' | 'ready' | 'error'; data: T | null };
const subscribeNothing = () => () => {};

export function useStoryStats(source: StoryStatsSource, userId: string, sessionRevision: number,
  month: string, sort: StatsSort, active: boolean) {
  const revision = useSyncExternalStore(active ? source.subscribe : subscribeNothing, source.getRevision, source.getRevision);
  const scope = JSON.stringify([userId, sessionRevision, revision]);
  const readMonthly = useCallback((signal: AbortSignal) => source.readMonthly(userId, month, signal)
    .then(value => validateMonthlyStats(value, userId, month)), [source, userId, month]);
  const readLifetime = useCallback((signal: AbortSignal) => source.readLifetime(userId, sort, signal)
    .then(value => validateLifetimeStats(value, userId, sort)), [source, userId, sort]);
  const monthly = useStatsQuery(source, `${scope}:${month}`, readMonthly, active);
  const lifetime = useStatsQuery(source, `${scope}:${sort}`, readLifetime, active);
  return { monthly, lifetime };
}

function useStatsQuery<T>(source: StoryStatsSource, identity: string,
  read: (signal: AbortSignal) => Promise<T>, active: boolean): StatsResult<T> & { retry: () => void } {
  const [attempt, setAttempt] = useState(0);
  const key = `${identity}:${attempt}`;
  const [result, setResult] = useState<(StatsResult<T> & { source: StoryStatsSource; key: string }) | null>(null);
  const pending = useRef(false);
  useEffect(() => {
    if (!active || result?.source === source && result.key === key) return;
    const controller = new AbortController();
    pending.current = true;
    // 동기 예외도 같은 실패 경계에서 다루고 취소를 무시하는 공급부의 늦은 응답을 차단한다.
    void Promise.resolve().then(() => read(controller.signal)).then(data => {
      if (!controller.signal.aborted) setResult({ source, key, status: 'ready', data });
    }).catch(() => {
      if (!controller.signal.aborted) setResult({ source, key, status: 'error', data: null });
    }).finally(() => { if (!controller.signal.aborted) pending.current = false; });
    return () => { controller.abort(); pending.current = false; };
  }, [source, key, read, active, result]);
  const current = result?.source === source && result.key === key ? result : null;
  return {
    status: current?.status ?? 'loading', data: current?.data ?? null,
    retry: () => {
      if (!active || pending.current) return;
      pending.current = true;
      setAttempt(value => value + 1);
    },
  };
}
