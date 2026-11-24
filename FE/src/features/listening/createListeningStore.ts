import { idleListening, type ListeningSnapshot, type ListeningSource, type ListeningStory } from './types';
import {
  createMockListeningOptionsSource,
  isListeningOptions,
  type ListeningOptions,
  type ListeningOptionsSource,
} from './listeningOptions';

export function createListeningStore(
  source: ListeningSource,
  now: () => number = Date.now,
  scope = 'standalone',
  optionsSource: ListeningOptionsSource = createMockListeningOptionsSource(),
) {
  let snapshot: ListeningSnapshot = idleListening;
  const listeners = new Set<() => void>();
  let active = false;
  let foreground = true;
  let revision = 0;
  let request: AbortController | null = null;
  let optionsRequest: AbortController | null = null;
  let timer: ReturnType<typeof setInterval> | undefined;
  let startedAtMs = 0;
  let startedAtSeconds = 0;
  const publish = (next: ListeningSnapshot) => {
    snapshot = next;
    listeners.forEach((listener) => listener());
  };
  function stopTimer() {
    clearInterval(timer);
    timer = undefined;
  }
  function updatePosition() {
    if (snapshot.status !== 'playing') return;
    const positionSeconds = Math.min(
      snapshot.durationSeconds,
      Math.max(
        snapshot.positionSeconds,
        startedAtSeconds + (Math.max(0, now() - startedAtMs) / 1000) * snapshot.options.speed,
      ),
    );
    if (positionSeconds === snapshot.durationSeconds) stopTimer();
    publish({
      ...snapshot,
      positionSeconds,
      status: positionSeconds === snapshot.durationSeconds ? 'ended' : 'playing',
    });
  }
  function startTimer() {
    stopTimer();
    startedAtMs = now();
    startedAtSeconds = snapshot.positionSeconds;
    timer = setInterval(updatePosition, 250);
  }
  function close() {
    cancelOptions();
    revision++;
    request?.abort();
    request = null;
    stopTimer();
    publish(idleListening);
  }
  async function prepare(story: ListeningStory) {
    cancelOptions();
    request?.abort();
    stopTimer();
    const id = ++revision;
    const controller = new AbortController();
    request = controller;
    publish({
      ...snapshot,
      status: 'loading',
      story,
      expanded: snapshot.expanded,
      positionSeconds: 0,
      durationSeconds: 0,
    });
    try {
      const recording = await source(story, controller.signal);
      if (!active || controller.signal.aborted || id !== revision) return;
      if (
        recording.articleId !== story.articleId ||
        recording.mode !== 'silent-mock' ||
        !Number.isFinite(recording.durationSeconds) ||
        recording.durationSeconds <= 0
      )
        throw new Error('Invalid recording');
      publish({
        ...snapshot,
        status: foreground ? 'playing' : 'paused',
        story,
        expanded: snapshot.expanded,
        positionSeconds: 0,
        durationSeconds: recording.durationSeconds,
      });
      if (foreground) startTimer();
    } catch {
      if (active && !controller.signal.aborted && id === revision)
        publish({
          ...snapshot,
          status: 'error',
          story,
          expanded: snapshot.expanded,
          positionSeconds: 0,
          durationSeconds: 0,
        });
    } finally {
      if (request === controller) request = null;
    }
  }
  function setPlaying(playing: boolean) {
    if (!active || ['idle', 'loading', 'error'].includes(snapshot.status)) return;
    updatePosition();
    stopTimer();
    const positionSeconds =
      playing && snapshot.positionSeconds >= snapshot.durationSeconds ? 0 : snapshot.positionSeconds;
    if (snapshot.story && snapshot.durationSeconds > 0) {
      publish({ ...snapshot, positionSeconds, status: playing && foreground ? 'playing' : 'paused' });
      if (playing && foreground) startTimer();
    }
  }
  function cancelOptions() {
    optionsRequest?.abort();
    optionsRequest = null;
    if (snapshot.optionsStatus !== 'idle') publish({ ...snapshot, optionsStatus: 'idle' });
  }
  function seek(positionSeconds: number) {
    if (!active || !Number.isFinite(positionSeconds) || !snapshot.story || snapshot.durationSeconds <= 0)
      return;
    const nextPosition = Math.max(0, Math.min(snapshot.durationSeconds, positionSeconds));
    const wasPlaying = snapshot.status === 'playing';
    stopTimer();
    publish({
      ...snapshot,
      positionSeconds: nextPosition,
      status: nextPosition === snapshot.durationSeconds ? 'ended' : wasPlaying ? 'playing' : 'paused',
    });
    if (snapshot.status === 'playing') startTimer();
  }
  async function setOptions(options: ListeningOptions): Promise<boolean> {
    if (!active || !snapshot.story || snapshot.durationSeconds <= 0) return false;
    cancelOptions();
    const controller = new AbortController();
    optionsRequest = controller;
    const articleId = snapshot.story.articleId;
    const requested = { ...options };
    publish({ ...snapshot, optionsStatus: 'saving' });
    try {
      if (!isListeningOptions(requested)) throw new Error('Invalid options');
      const confirmed = await optionsSource.apply(articleId, requested, controller.signal);
      if (
        !active ||
        controller.signal.aborted ||
        optionsRequest !== controller ||
        snapshot.story?.articleId !== articleId
      )
        return false;
      if (
        !isListeningOptions(confirmed) ||
        confirmed.speed !== requested.speed ||
        confirmed.voiceId !== requested.voiceId
      )
        throw new Error('Mismatched options');
      updatePosition();
      publish({ ...snapshot, options: { ...confirmed }, optionsStatus: 'idle' });
      if (snapshot.status === 'playing') startTimer();
      return true;
    } catch {
      if (active && !controller.signal.aborted && optionsRequest === controller)
        publish({ ...snapshot, optionsStatus: 'error' });
      return false;
    } finally {
      if (optionsRequest === controller) optionsRequest = null;
    }
  }
  return {
    scope,
    searchVoices: (query: string, signal: AbortSignal) => optionsSource.searchVoices(query, signal),
    setOptions,
    cancelOptions,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: () => snapshot,
    activate() {
      active = true;
      return () => {
        active = false;
        close();
      };
    },
    listen(story: ListeningStory) {
      if (!active || !story.articleId.trim()) return;
      if (snapshot.story?.articleId === story.articleId) {
        if (snapshot.status === 'loading') return;
        if (snapshot.status !== 'error') {
          setPlaying(snapshot.status !== 'playing');
          return;
        }
      }
      void prepare(story);
    },
    retry() {
      if (active && snapshot.status === 'error') void prepare(snapshot.story);
    },
    setPlaying,
    // 연속 입력은 화면에 남은 이전 상태 대신 현재 저장소 상태에 적용한다.
    togglePlaying() {
      setPlaying(snapshot.status !== 'playing');
    },
    seek,
    skip(offsetSeconds: number) {
      if (!active || !Number.isFinite(offsetSeconds)) return;
      // 마지막 화면 갱신 이후 흐른 시간도 반영한 뒤 상대 이동을 누적한다.
      updatePosition();
      seek(snapshot.positionSeconds + offsetSeconds);
    },
    setExpanded(expanded: boolean) {
      if (active && snapshot.story) publish({ ...snapshot, expanded });
    },
    setForeground(value: boolean) {
      foreground = value;
      // 이 mock은 background에서 진행하지 않으며 복귀 후 사용자가 직접 재개한다.
      if (!value && snapshot.status === 'playing') setPlaying(false);
    },
    close,
  };
}
export type ListeningStore = ReturnType<typeof createListeningStore>;
