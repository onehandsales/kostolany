import { idleListening, type ListeningSnapshot, type ListeningSource, type ListeningStory } from './types';

export function createListeningStore(
  source: ListeningSource,
  now: () => number = Date.now,
  scope = 'standalone',
) {
  let snapshot: ListeningSnapshot = idleListening;
  const listeners = new Set<() => void>();
  let active = false;
  let foreground = true;
  let revision = 0;
  let request: AbortController | null = null;
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
      Math.max(snapshot.positionSeconds, startedAtSeconds + Math.max(0, now() - startedAtMs) / 1000),
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
    revision++;
    request?.abort();
    request = null;
    stopTimer();
    publish(idleListening);
  }
  async function prepare(story: ListeningStory) {
    request?.abort();
    stopTimer();
    const id = ++revision;
    const controller = new AbortController();
    request = controller;
    publish({
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
  return {
    scope,
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
    seek(positionSeconds: number) {
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
